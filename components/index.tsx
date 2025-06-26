"use client";
import React, { useEffect, useState, ChangeEvent } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserCard from "./UserCard";
import { removeVietnameseTones } from "../utils/util";
import { User } from "../interfaces/users";
import fetcher from "@/apis/fetcher";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
const ITEMS_PER_PAGE = 12;

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //áp dụng CSRF
  // const [csrfToken, setCsrfToken] = useState("");

  const user = useSelector((state: RootState) => state.auth?.user);

  useEffect(() => {
    const init = async () => {
      setLoading(true); //
      try {
        await getCsrfToken();
        await fetchUsers();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const getCsrfToken = async () => {
    try {
      const res = await fetcher.get("/csrf-token");
      const token = res.data.csrfToken;

      localStorage.setItem("csrfToken", token);
      // setCsrfToken(token);
    } catch (err) {
      console.error("❌ Không lấy được CSRF token:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem("verifyToken");
      // console.log(">> Token gửi đi:", token);

      const res = await fetcher.get("/auth/listUser", {
        withCredentials: true,
      });
      console.log(">>>>Check quyền get listUser: ", res);

      const sortedUsers = res.data.users.sort(
        (a: User, b: User) => Number(b.id) - Number(a.id)
      );
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
      setCurrentPage(1);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchTerm(input);
    const keyword = removeVietnameseTones(input.toLowerCase());

    const filtered = users.filter((user) =>
      removeVietnameseTones(user.name.toLowerCase()).includes(keyword)
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };
  const handleDelete = async (userId: number) => {
    console.log(">>>>>Check id delete: ", userId);
    try {
      const confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xoá người dùng này?"
      );
      if (!confirmDelete) return;

      const res = await fetcher.delete(`/auth/delete/${userId}`);
      toast.success(res.data.message);

      setUsers((prev) => prev.filter((user) => Number(user.id) !== userId));
      setFilteredUsers((prev) =>
        prev.filter((user) => Number(user.id) !== userId)
      );
    } catch (error) {
      console.error("❌ Lỗi khi xoá user:", error);
    }
  };
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded shadow">
          <p className="text-xl font-semibold text-red-500">
            ⚠️ Vui lòng đăng nhập để xem danh sách người dùng.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <ClipLoader size={50} color="#3b82f6" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header + Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-700">
                📋 Danh sách người dùng
              </h1>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <input
                  type="text"
                  placeholder="Tìm theo tên..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button
                  onClick={fetchUsers}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                >
                  Tải lại
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUsers.map((user) => (
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded hover:bg-blue-500 hover:text-white disabled:opacity-50 cursor-pointer"
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 border rounded cursor-pointer ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded hover:bg-blue-500 hover:text-white disabled:opacity-50 cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
