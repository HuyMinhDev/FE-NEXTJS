"use client";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import ReactQueryProvider from "@/context/ReactQueryProvider";

export function Providers({ children }: { readonly children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}
