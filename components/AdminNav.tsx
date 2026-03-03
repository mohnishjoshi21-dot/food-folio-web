import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminNav() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token"); // your JWT cookie name

  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Blogs", href: "/admin/blogs" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        
        <h1 className="text-lg font-semibold">
          Admin Panel
        </h1>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 👇 Only show if logged in */}
        {token && <LogoutButton />}
      </div>
    </div>
  );
}