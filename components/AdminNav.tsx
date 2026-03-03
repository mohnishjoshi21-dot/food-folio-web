"use client";

import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AdminNav() {
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

      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          
          {/* Left */}
          <h1 className="text-lg font-semibold">
            Admin Panel
          </h1>

          {/* Center Navigation */}
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right */}
          <LogoutButton />
        </div>
      </div>
  );
}