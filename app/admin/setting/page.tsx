"use client";

import AdminProfileEditor from "@/components/AdminBlogComponents/AdminProfileEditor";
import ChangePassword from "@/components/adminSetting/ChangePassword";
import { Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Setting() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Settings className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-sm text-gray-500">
                Manage your profile and account settings
              </p>
            </div>
          </div>

        </div>

        <Separator />

        {/* SECTIONS */}
        <div className="space-y-12">

          {/* PROFILE SECTION */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-700">
              Profile Settings
            </h2>
            <AdminProfileEditor />
          </div>

          {/* PASSWORD SECTION */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-700">
              Security
            </h2>
            <ChangePassword />
          </div>

        </div>

      </div>
    </div>
  );
}