"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { User } from "@/interfaces/users";

function Header() {
  const navigate = useRouter();
  const user: User | null = useSelector((state: RootState) => state.auth?.user);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="bg-black text-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate.push("/")}>
          <img
            src="/images/logo/logo.webp"
            alt="logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 font-semibold">
                <FaUser className="text-lg" />
                {user.name}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 px-4 rounded-md bg-red-600 hover:bg-white hover:text-red-600 transition cursor-pointer"
              >
                Đăng Xuất
              </button>
            </>
          ) : (
            <>
              <button
                className="p-2 px-4 rounded-md bg-white text-black hover:bg-red-600 hover:text-white transition cursor-pointer"
                onClick={() => navigate.push("/register")}
              >
                Đăng ký
              </button>
              <button
                className="p-2 px-4 rounded-md bg-red-600 text-white hover:bg-white hover:text-red-600 transition cursor-pointer"
                onClick={() => navigate.push("/login")}
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
          {user ? (
            <div className="pt-4 border-t border-white/30">
              <div className="flex items-center gap-2 mb-2 font-semibold">
                <FaUser />
                {user.name}
              </div>
              <button
                onClick={handleLogout}
                className="text-left py-2 bg-red-600 hover:bg-white hover:text-red-600 px-4 rounded cursor-pointer"
              >
                Đăng Xuất
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-4 border-t border-white/30">
              <button
                className="p-2 px-4 rounded-md bg-white text-black hover:bg-red-600 hover:text-white transition"
                onClick={() => {
                  navigate.push("/register");
                  closeMenu();
                }}
              >
                Đăng ký
              </button>
              <button
                className="p-2 px-4 rounded-md bg-red-600 text-white hover:bg-white hover:text-red-600 transition"
                onClick={() => {
                  navigate.push("/login");
                  closeMenu();
                }}
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
