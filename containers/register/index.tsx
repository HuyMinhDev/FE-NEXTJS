"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerAuthApi } from "@/apis/auth";
import { RegisterInput } from "@/interfaces/users";
import Link from "next/link";
import { AxiosError } from "axios";

function Register() {
  const router = useRouter();

  const { handleSubmit, register } = useForm<RegisterInput>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      avatar: "",
      password: "",
    },
  });

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: registerAuthApi,
    onSuccess: (data) => {
      console.log("Check đăng ký: ", data);
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error?.response?.data?.message ?? "Đăng ký thất bại!";
      toast.error(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full lg:w-1/2 hidden lg:block">
          <img
            src="/images/slider/Right-Side.png"
            alt="Register Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 p-6 lg:p-12">
          <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-4">
            Welcome! Let&apos;s begin
          </h2>
          <p className="text-sm lg:text-base text-center text-gray-500 mb-6">
            Let&apos;s get started! Please enter your details.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter your full name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

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
              <label className="block font-medium">Phone Number</label>
              <input
                type="text"
                {...register("phone")}
                placeholder="Enter your phone number"
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-medium">Gender</label>
              <select
                {...register("gender")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-red-500 cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Avatar URL</label>
              <input
                type="text"
                {...register("avatar")}
                placeholder="Enter your avatar image URL"
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-60 transition cursor-pointer"
            >
              {isPending ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href={"/login"} className="text-red-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
