"use client";

import Link from "next/link";
import { Globe, Settings, FileText } from "lucide-react";

export default function AdminFooter() {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left - Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-800">
                FoodFolio Admin
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                v1.0.0
              </span>
            </div>

            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} FoodFolio. All rights reserved.
            </p>
          </div>

          {/* Right - Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 hover:text-black transition-colors duration-200"
            >
              <Globe size={16} />
              Visit Website
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center gap-2 hover:text-black transition-colors duration-200"
            >
              <FileText size={16} />
              Manage Blogs
            </Link>

            <Link
              href="/admin/setting"
              className="flex items-center gap-2 hover:text-black transition-colors duration-200"
            >
              <Settings size={16} />
              Settings
            </Link>

          </nav>
        </div>

      </div>
    </footer>
  );
}