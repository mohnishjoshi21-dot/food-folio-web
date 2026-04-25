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



function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

// 🔥 ADD THIS (MOST IMPORTANT)
export async function generateMetadata({ params }: PageProps) {

  const {slug} = await params

  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const blog: Blog = data?.data;

 if (!blog) {
    return {
      title: "Blog not found",
      description: "No blog available",
    };
  }

  const description = stripHtml(blog.content || "").slice(0, 150);

  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
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

