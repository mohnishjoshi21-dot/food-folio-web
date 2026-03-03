export const dynamic = "force-dynamic";

import ListBlogPageAdmin from "@/components/AdminBlogComponents/ListBlogPageAdmin";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    filter?:string;
  }>;
}

const limit = 2;

export default async function PublicBlogsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const sort = params.sort || "newest";
  const filter = params.filter || "total";


  console.log("Fetching page:", page);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/blogs?page=${page}&limit=${limit}&sort=${sort}&status=${filter}`,
    { cache: "no-store" },
  );

  const data = await res.json();

console.log(data.data);


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
