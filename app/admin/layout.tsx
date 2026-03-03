import AdminFooter from "@/components/AdminFooter";
import AdminNav from "@/components/AdminNav";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gray-50">
        <AdminNav/>
      <div className="max-w-7xl mx-auto p-8">{children}</div>
      <AdminFooter/>
    </div>
  );
}