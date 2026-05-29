"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardPage() {
  const router = useRouter();

  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
      setReady(false);
      return;
    }

    setReady(true);
  }, [router]);

  if (ready === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!ready) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8 md:p-10">
        <div className="max-w-5xl">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome to AI Second Brain
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Your private AI knowledge operating system. This is the foundation
            for document upload, semantic search, and RAG chat.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-400">Documents</p>
              <p className="mt-2 text-3xl font-semibold">0</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-400">Chats</p>
              <p className="mt-2 text-3xl font-semibold">0</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-400">Collections</p>
              <p className="mt-2 text-3xl font-semibold">0</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 p-8">
            <h2 className="text-xl font-medium">Next phase</h2>

            <p className="mt-2 text-zinc-400">
              Add document upload, text extraction, embeddings, and AI chat.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}