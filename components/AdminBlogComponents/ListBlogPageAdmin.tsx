'use client'
import { BlogCard } from "@/components/card/BlogCard";
import PaginationComponent from "@/components/pagination/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  blogs: any[];
  page: number;
  sort: string;
  totalPages: number;
  stats:{};
  filter:string;
}

const ListBlogPageAdmin = ({ blogs, page, sort,filter, totalPages,stats }: Props) => {
  const router = useRouter();

  const onPageChange = (pageNumber: number) => {
    router.push(`/admin/blogs?page=${pageNumber}&status=${filter}&sort=${sort}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Latest Blogs</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Discover tutorials, guides and multiple Topics.
        </p>
      </div>
      


      {/* filter */}
      <div className="flex justify-between">
         <div className="bg-amber-50">
          {Object.entries(stats)
          .filter(([key])=> key !== "_id")
          .map(([key, value]:any) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "outline"}
              className="mx-2"
              onClick={() =>
                router.push(`/admin/blogs?page=1&status=${key}&sort=${sort}`)
              }
            >
              {key} ({value})
            </Button>
          ))}
        </div>

        {/* sort */}
        <Select
          value={sort}
          onValueChange={(value) =>
            router.push(`/admin/blogs?page=1&sort=${value}`)
          }
        >
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Sort Blogs" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title-asc">Title A-Z</SelectItem>
              <SelectItem value="title-desc">Title Z-A</SelectItem>
              <SelectItem value="views-desc">Most Viewed</SelectItem>
              <SelectItem value="views-asc">Least Viewed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Blogs */}
      {blogs.length === 0 ? (
        <div className="text-center py-24 space-y-2">
          <h2 className="text-xl font-semibold">No blogs yet</h2>
          <p className="text-muted-foreground">
            New blogs will appear here soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="cursor-pointer hover:scale-[1.02] transition"
            >
              <BlogCard data={blog} isAdmin={true} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="pt-6">
        <PaginationComponent
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ListBlogPageAdmin;