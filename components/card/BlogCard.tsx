"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteBlogButton from "../DeleteBlogBtn";
import { Eye } from "lucide-react";

export function BlogCard({ data, isAdmin }: { data: any; isAdmin?: boolean }) {
  const router = useRouter();

  const image = data.image || "/blog.png";

  const date = new Date(data.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const openBlog = () => {
    isAdmin
      ? router.push(`/admin/blogs/${data.slug}`)
      : router.push(`/blogs/${data.slug}`);
  };

  return (
    <Card
      onClick={openBlog}
      className="
      mx-auto
      w-full
      max-w-sm
      overflow-hidden
      p-0
      cursor-pointer
      hover:shadow-lg
      transition
      hover:-translate-y-1
      "
    >
      {/* Image */}

      <div className="relative">
        <img
          src={image}
          onError={(e) => {
            e.currentTarget.src = "/blog.png";
          }}
          alt="Blog cover"
          className="aspect-video w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        {/* Admin Badge */}

        {isAdmin && (
          <div className="absolute top-3 right-3">
            <Badge variant={data.published ? "default" : "secondary"}>
              {data.published ? "Published" : "Draft"}
            </Badge>
          </div>
        )}
      </div>

      {/* Text */}

      <CardHeader className="p-3 space-y-2">
        <CardTitle className="line-clamp-2 min-h-[3rem]">
          {data.title}
        </CardTitle>

        <CardDescription className="flex items-center justify-between text-xs">
  <span>{date}</span>

  <span className="flex items-center gap-1">
    <Eye size={14} className="opacity-70" />
    {data.views || 0}
  </span>
</CardDescription>

        {isAdmin && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="line-clamp-2 min-h-[2.5rem] break-all">
              Slug: {data.slug}
            </p>
            <p>ID: {data._id}</p>
          </div>
        )}
      </CardHeader>

      {/* Admin Actions */}

      {isAdmin && (
        <CardFooter
          onClick={(e) => e.stopPropagation()}
          className="flex gap-2 pb-4 justify-between"
        >
          <Button
            size="sm"
            className="flex-1"
            onClick={() => router.push(`/admin/blogs/edit/${data.slug}`)}
          >
            Edit
          </Button>

          <DeleteBlogButton blogId={data._id} />
        </CardFooter>
      )}
    </Card>
  );
}
