import ViewBlogPageOnPublic from "@/components/publicPageComponents/ViewBlogPage";

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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ViewBlogAdmin = async ({ params }: PageProps) => {
  const { slug } = await params;


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/blogs/${slug}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  const blog: Blog = data?.data;

  return (
    <div>
      <ViewBlogPageOnPublic blog={blog} isAdmin/>
    </div>
  );
};

export default ViewBlogAdmin;

