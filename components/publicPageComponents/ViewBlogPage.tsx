'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Eye } from "lucide-react";

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
  views?:number;
};

interface Props {
  blog: Blog;
  isAdmin: boolean;
}

const ViewBlogPage = ({ blog, isAdmin }: Props) => {
  const { title, content, image, createdAt, published, slug, translations ,views} = blog;

  console.log(blog);
  

  const [language, setLanguage] = useState("english");
  const router = useRouter();

  const selectedTranslation = translations.find(
    (t) => t.language === language
  );

  const blogTitle = selectedTranslation?.title || title;
  const blogContent = selectedTranslation?.content || content;

  // 🔥 Share Function
const handleShare = async () => {
  const publicUrl = `${window.location.origin}/blogs/${slug}`;

  if (navigator.share) {
    await navigator.share({
      title: blogTitle,
      text: "Check out this blog!",
      url: publicUrl,
    });
  } else {
    navigator.clipboard.writeText(publicUrl);
    alert("Link copied!");
  }
};

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

      {/* ✅ CLEAN LAYOUT (NO CARD) */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Top Section */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2 justify-between w-full">
            <Button variant="outline" onClick={() => router.push("/blogs")}>
              ← Back
            </Button>

            <Button variant="outline" onClick={handleShare}>
              Share
            </Button>
          </div>

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
     <div className="flex justify-between items-center flex-wrap gap-3">
  
  {/* Left: Date + Views */}
  <div className="flex items-center gap-3 text-muted-foreground text-sm">
    <span>
      {createdAt && new Date(createdAt).toDateString()}
    </span>

    <span className="flex items-center gap-1">
      <Eye size={14} className="opacity-70" />
      {views || 0}
    </span>
  </div>

  {/* Right: Language */}
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

        {/* Image */}
        <img
          src={image}
          alt={blogTitle}
          className="rounded-xl w-full object-cover"
        />

        <Separator />

        {/* Content */}
     <div
  className="
    prose prose-invert prose-zinc lg:prose-lg max-w-none

    prose-p:my-5 leading-7
    prose-headings:mt-10 prose-headings:mb-4
    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl

    prose-li:my-1
    prose-ul:my-4 prose-ol:my-4

    prose-a:text-blue-400 hover:prose-a:text-blue-300
    prose-strong:text-white

    prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 
    prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6

    prose-code:text-blue-300

    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
    prose-blockquote:pl-4 prose-blockquote:text-zinc-300 prose-blockquote:my-6

    prose-img:rounded-xl prose-img:my-6 prose-img:shadow-md
  "
  dangerouslySetInnerHTML={{
    __html: blogContent,
  }}
/>
      </div>
    </>
  );
};

export default ViewBlogPage;