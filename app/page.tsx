import PortfolioPageComponent from "@/components/publicPageComponents/PortfolioPage";
import { education, experiences, fallbackUser } from "./data/userData";

export default async function Home() {
  let user = fallbackUser;
  let latestBlogs = [];

  try {
    const [adminRes, blogRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/auth/admin-details`,
        { cache: "no-store" }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/blogs?page=1&limit=3&sort=newest&status=published`,
        { cache: "no-store" }
      ),
    ]);

    const adminData = await adminRes.json();
    const blogData = await blogRes.json();

    if (adminData?.data) {
      user = adminData.data;
    }

    latestBlogs = blogData?.data?.blogs || [];

  } catch (error) {
    console.log("Using fallback data");
  }


 
  

  return (
    <PortfolioPageComponent
      education={education}
      experiences={experiences}
      latestBlogs={latestBlogs}
      user={user}
    />
  );
}