export const dynamic = "force-dynamic";

import ListBlogPageAdmin from "@/components/AdminBlogComponents/ListBlogPageAdmin";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    status?:string;
  }>;
}

const limit = 9;

export default async function PublicBlogsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const sort = params.sort || "newest";
  const filter = params.status || "total";



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/blogs?page=${page}&limit=${limit}&sort=${sort}&status=${filter}`,
    { cache: "no-store" },
  );

  const data = await res.json();


  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.pagination?.totalPages || 0;
  const stats = data?.data?.counts || 0;
  
  return (
    <ListBlogPageAdmin
      blogs={blogs}
      page={page}
      sort={sort}
      filter={filter}
      totalPages={totalPages}
      stats={stats}
    />
  );
}
