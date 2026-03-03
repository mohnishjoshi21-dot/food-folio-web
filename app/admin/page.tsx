"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  FileText,
  PlusCircle,
  Settings,
  LayoutDashboard,
  LinkIcon,
  Pencil,
  Globe,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>

          <p className="text-muted-foreground text-sm">
            Manage your blogs and website content
          </p>
        </div>

      <div className="flex gap-3 justify-center items-center">

        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Globe size={16} />
            Visit Website
          </Button>
        </Link>
      </div>
      </div>

      <Separator />

      {/* Quick Actions */}

      <div className="space-y-5">
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Blog */}

          <Card
            onClick={() => router.push("/admin/blogs/new")}
            className="
            cursor-pointer
            transition-all
            hover:shadow-lg
            hover:-translate-y-1
            group
            "
          >
            <CardHeader className="pb-2">
              <PlusCircle className="h-6 w-6 text-primary group-hover:scale-110 transition" />
            </CardHeader>

            <CardContent className="space-y-1">
              <CardTitle className="text-lg">Create Blog</CardTitle>

              <p className="text-sm text-muted-foreground">
                Write and publish a new blog post
              </p>
            </CardContent>
          </Card>

          {/* Manage Blogs */}

          <Card
            onClick={() => router.push("/admin/blogs")}
            className="
            cursor-pointer
            transition-all
            hover:shadow-lg
            hover:-translate-y-1
            group
            "
          >
            <CardHeader className="pb-2">
              <FileText className="h-6 w-6 text-primary group-hover:scale-110 transition" />
            </CardHeader>

            <CardContent className="space-y-1">
              <CardTitle className="text-lg">Manage Blogs</CardTitle>

              <p className="text-sm text-muted-foreground">
                View, edit and delete blogs
              </p>
            </CardContent>
          </Card>

          {/* Settings */}

          <Card
            onClick={() => router.push("/admin/setting")}
            className="
            cursor-pointer
            transition-all
            hover:shadow-lg
            hover:-translate-y-1
            group
            "
          >
            <CardHeader className="pb-2">
              <Settings className="h-6 w-6 text-primary group-hover:scale-110 transition" />
            </CardHeader>

            <CardContent className="space-y-1">
              <CardTitle className="text-lg">Settings</CardTitle>

              <p className="text-sm text-muted-foreground">
                Manage admin account settings
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
