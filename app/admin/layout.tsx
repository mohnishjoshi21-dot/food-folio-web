"use client";

import AdminFooter from "@/components/AdminFooter";
import AdminNav from "@/components/AdminNav";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Blogs", href: "/admin/blogs" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <AdminNav/>
      <div className="max-w-7xl mx-auto p-8">{children}</div>
      <AdminFooter/>
    </div>
  );
}