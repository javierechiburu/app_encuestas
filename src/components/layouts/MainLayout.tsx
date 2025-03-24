"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#04b8d3] to-primary-400 overflow-hidden">
        <div className="grid md:grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] w-full">
          <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-5xl 2xl:max-w-7xl w-full">
            {children}
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
};
