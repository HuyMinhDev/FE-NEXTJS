"use client";

import { ToastContainer } from "react-toastify";
import Header from "@/components/layouts/home-layout/Header";
import { Providers } from "../redux/providers";
import LoadUserFromStorage from "@/components/LoadUserFromStorage";

interface ClientLayoutProps {
  readonly children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Providers>
      <Header />
      {children}
      <LoadUserFromStorage />
      <ToastContainer />
    </Providers>
  );
}
