import ViewBlogPage from "@/components/publicPageComponents/ListBlogPage";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
}

const limit = 9;

export default async function PublicBlogsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const sort = params.sort || "newest";

  console.log("Fetching page:", page);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/blogs?page=${page}&limit=${limit}&sort=${sort}`,
    { cache: "no-store" },
  );

  const data = await res.json();

  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.pagination?.totalPages || 0;

  return (
    <ViewBlogPage
      blogs={blogs}
      page={page}
      sort={sort}
      totalPages={totalPages}
    />
  );
}
