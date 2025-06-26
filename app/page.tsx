"use client";

import dynamic from "next/dynamic";
import React from "react";

// 🧠 Dùng dynamic import và tắt SSR cho ListUsers
const ListUsers = dynamic(() => import("@/components"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <ListUsers />
    </div>
  );
}
