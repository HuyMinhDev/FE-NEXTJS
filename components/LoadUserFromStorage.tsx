"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { User } from "@/interfaces/users";
import { loginSuccess } from "@/redux/authSlice";

const LoadUserFromStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Only run on client-side to avoid SSR issues
    if (typeof window === "undefined") return;

    const timeout = setTimeout(() => {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as { user: User; token: string };
          dispatch(loginSuccess(parsed));
        } catch (err) {
          console.error("Lỗi đọc localStorage:", err);
        }
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return null; // QUAN TRỌNG: không render gì cả
};

export default LoadUserFromStorage;
