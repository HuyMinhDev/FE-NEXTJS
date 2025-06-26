"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ROLE } from "../../../constants/role";
import { loginAuthApi } from "../../../apis/auth";
import { loginSuccess } from "../../../redux/authSlice";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser } = useMutation({
    mutationFn: loginAuthApi,
    onSuccess: (data) => {
      console.log(">>>>Check data login success: ", data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("verifyToken", data.token);
      dispatch(loginSuccess(data));
      toast.success(data.message);

      if (data.user.role === ROLE.ADMIN) {
        router.push("/");
      } else if (data.user.role === ROLE.USER) {
        router.push("/");
      }
    },
    onError: (error) => {
      console.log(">>>>Check data login error: ", error);
      const errorMessage =
        error?.response?.data?.message ?? "Đăng nhập thất bại";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full lg:w-1/2 p-6 lg:p-12">
          <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-4">
            Welcome back
          </h2>
          <p className="text-sm lg:text-base text-center text-gray-500 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="text"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                placeholder="************"
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-red-500 cursor-pointer"
                />
                Remember me
              </label>
              <Link
                href="/reset-password"
                className="text-black hover:underline"
              >
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition cursor-pointer"
            >
              Đăng nhập
            </button>
            <button
              type="submit"
              className="w-full bg-transparent border-black border-1 text-black py-2 rounded-xl hover:bg-gray-200 transition cursor-pointer"
            >
              <div className="flex justify-center gap-3 items-center">
                <img src="/images/logo/logoGoogle.svg" alt="" />
                <p>Sign in with Google</p>
              </div>
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="text-red-600 hover:underline">
              Sign up for free!
            </Link>
          </p>
        </div>

        <div className="w-full lg:w-1/2 hidden lg:block">
          <img
            src="/images/slider/Right-Side.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
