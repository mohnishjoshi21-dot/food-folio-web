import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://food-folio-web.vercel.app";

  // 🔥 Fetch blogs
  const res = await fetch(
    `${baseUrl}/api/blogs?page=1&limit=100&status=published`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  const blogs = data?.data?.blogs || [];

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.createdAt
      ? new Date(blog.createdAt)
      : new Date(),
  }));

  

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}