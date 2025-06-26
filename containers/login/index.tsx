"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { loginAuthApi } from "../../apis/auth";
import { useRouter } from "next/navigation";

import { LoginInput, LoginResponse } from "@/interfaces/users";
import { AppDispatch } from "@/redux/store";
import { loginSuccess } from "@/redux/authSlice";
import Link from "next/link";
import { ROLE } from "@/constants/role";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  interface ErrorResponse {
    message: string;
  }

  const { handleSubmit, register } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser } = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginInput
  >({
    mutationFn: loginAuthApi,
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data));
      }
      dispatch(loginSuccess(data));
      toast.success(data.message);

      if (data.user.role === ROLE.ADMIN || data.user.role === ROLE.USER) {
        router.push("/");
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ?? "Đăng nhập thất bại";
      toast.error(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
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
              type="button"
              className="w-full bg-transparent border-black border-1 text-black py-2 rounded-xl hover:bg-gray-200 transition cursor-pointer"
            >
              <div className="flex justify-center gap-3 items-center">
                <img src="/images/logo/logoGoogle.svg" alt="logoGoogle.svg" />
                <p>Sign in with Google</p>
              </div>
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-red-600 hover:underline">
              Sign up for free!
            </Link>
          </p>
        </div>

        <div className="w-full lg:w-1/2 hidden lg:block">
          <img
            src="/images/slider/Right-Side.png"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
