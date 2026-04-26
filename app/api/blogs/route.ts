import { connectDB } from "@/db/connectDB";
import { SortOrder } from "mongoose";
import blogModel from "../../models/blog.model";
import { apiResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const sort = searchParams.get("sort") || "newest";

    const skip = (page - 1) * limit;

  
    // Sorting
    let sortOption: any = { createdAt: -1 };

switch (sort) {

  case "oldest":
    sortOption = { createdAt: 1 };
    break;

  case "title-asc":
    sortOption = { title: 1 };
    break;

  case "title-desc":
    sortOption = { title: -1 };
    break;

  case "views-desc": 
    sortOption = { views: -1 };
    break;

  case "views-asc": 
    sortOption = { views: 1 };
    break;

  default:
    sortOption = { createdAt: -1 }; // newest
}
    const blogs = await blogModel
      .find({published:true})
      .select("title slug image published createdAt views")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalBlogs = await blogModel.countDocuments({published:true});

    return apiResponse(true, "Blogs fetched", 200, {
      blogs,
      pagination: {
        page,
        limit,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
      },
    });
  } catch (error) {
    return apiResponse(false, "Failed to fetch blogs", 500);
  }
}
