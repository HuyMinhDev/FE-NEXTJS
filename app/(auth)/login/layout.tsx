"use client";
import React from "react";
interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLaout({ children }: LoginLayoutProps) {
  return (
    <div className="" id="layout-login">
      {children}
    </div>
  );
}
