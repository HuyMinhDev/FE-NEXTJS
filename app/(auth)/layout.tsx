"use client";
import React from "react";
interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="" id="layout-auth">
      {children}
    </div>
  );
}
