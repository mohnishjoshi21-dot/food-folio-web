import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminNav() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Blogs", href: "/admin/blogs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Branding */}
        <Link href="/admin" className="text-lg font-semibold text-gray-800">
          FoodFolio Admin
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-sm text-gray-500 hover:text-black"
          >
            View Site
          </Link>

          {token && <LogoutButton />}
        </div>
      </div>
    </header>
  );
}