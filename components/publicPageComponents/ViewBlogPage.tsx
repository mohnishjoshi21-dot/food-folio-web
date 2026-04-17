'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Script from "next/script";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PublishToggle from "@/components/PublishToggle";
import { useRouter } from "next/navigation";
import DeleteBlogButton from "../DeleteBlogBtn";

type Translation = {
  language: string;
  title: string;
  content: string;
};

type Blog = {
  _id: string;
  slug: string;
  title: string;
  content: string;
  image: string;
  published: boolean;
  translations: Translation[];
  createdAt?: string;
};

interface Props {
  blog: Blog;
  isAdmin: boolean;
}

const ViewBlogPage = ({ blog, isAdmin }: Props) => {
  const { title, content, image, createdAt, published, slug, translations } = blog;

  const [language, setLanguage] = useState("english");
  const router = useRouter();

  const selectedTranslation = translations.find(
    (t) => t.language === language
  );

  const blogTitle = selectedTranslation?.title || title;
  const blogContent = selectedTranslation?.content || content;

  return (
    <>
      {/* 🔥 BLOG SCHEMA (SEO BOOST) */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blogTitle,
            image: image,
            datePublished: createdAt,
            author: {
              "@type": "Person",
              name: "Pranjal Pandya",
            },
          }),
        }}
      />

      <div className="px-4 py-10">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8 space-y-6">

            {/* Back + Admin Actions */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => router.push("/blogs")}>
                ← Back to Blogs
              </Button>

              {isAdmin && (
                <div className="flex items-center gap-5">
                  <PublishToggle blogId={blog._id} published={published} />
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/admin/blogs/edit/${slug}`)}
                  >
                    Edit
                  </Button>
                  <DeleteBlogButton blogId={blog._id} />
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight">
              {blogTitle}
            </h1>

            {/* Date + Language */}
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">
                {createdAt && new Date(createdAt).toDateString()}
              </p>

              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Image (SEO FIXED) */}
            <img
              src={image}
              alt={blogTitle}
              className="rounded-xl w-full object-cover"
            />

            <Separator />

            {/* Content */}
            <div
              className="prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: blogContent,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewBlogPage;