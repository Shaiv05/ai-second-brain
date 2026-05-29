"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href;
    return `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      active
        ? "bg-zinc-900 text-zinc-100"
        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
    }`;
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950 px-5 py-6 text-white">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">AI Second Brain</h1>
        <p className="mt-1 text-sm text-zinc-400">Your private knowledge OS</p>
      </div>

      <nav className="mt-10 space-y-2 text-sm">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>

        <Link href="/dashboard/documents" className={linkClass("/dashboard/documents")}>
          <FileText className="h-4 w-4" />
          Documents
        </Link>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
        >
          <MessageSquare className="h-4 w-4" />
          Chats
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
        >
          <Settings className="h-4 w-4" />
          Settings
        </a>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}