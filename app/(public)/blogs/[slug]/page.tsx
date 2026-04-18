import ViewBlogPage from "@/components/publicPageComponents/ViewBlogPage";

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
  params: {
    slug: string;
  };
}

// 🔥 ADD THIS (MOST IMPORTANT)
export async function generateMetadata({ params }: PageProps) {

  const {slug} = await params

  console.log("slug : ",slug);
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const blog: Blog = data?.data;

  console.log(blog);
  

  console.log({
    title: blog?.title,
    description: blog?.content?.slice(0, 150),
    openGraph: {
      title: blog?.title,
      description: blog?.content?.slice(0, 150),
      images: [blog?.image],
    },
  });
  

  return {
    title: blog?.title,
    description: blog?.content?.slice(0, 150),
    openGraph: {
      title: blog?.title,
      description: blog?.content?.slice(0, 150),
      images: [blog?.image],
    },
  };
}

// 🔥 FIX THIS ALSO (Promise hatao)
export default async function ViewBlog({ params }: PageProps) {
const {slug} = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const blog: Blog = data?.data;

  return <ViewBlogPage isAdmin={false} blog={blog} />;
}