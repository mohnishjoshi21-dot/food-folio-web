import blogModel from "@/app/models/blog.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { formatZodError } from "@/lib/formateZodError";
import { generateSlug } from "@/lib/slugify";
import { createBlogSchema } from "@/lib/validations/blog.schema";

import { SortOrder } from "mongoose";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();

    const validationResult = createBlogSchema.safeParse(body);

    if (!validationResult.success) {
      return apiResponse(
        false,
        formatZodError(validationResult.error) || "Invalid blog format",
        400,
      );
    }

    const { title, content, image, translations, published } =
      validationResult.data;

    // Generate slug
    const slug = generateSlug(title);

    // Check duplicate slug
    const existingBlog = await blogModel.findOne({ slug });

    if (existingBlog) {
      return apiResponse(false, "Blog with this title already exists", 400);
    }

    /*
     Add English as default translation
    */
    const allTranslations = [
      {
        language: "english",
        title,
        content,
      },

      ...(translations || []),
    ];

    const newBlog = new blogModel({
      slug,

      title,

      content,

      image: image || "",

      translations: allTranslations,

      published: published ?? true,
    });

    await newBlog.save();

    return apiResponse(true, "Blog created successfully", 201, newBlog);
  } catch (error) {
    console.log("Error in Create Post :", error);

    return apiResponse(false, "Failed to create post", 500);
  }
}

export async function GET(request: Request) {

  await connectDB();

  try {

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const sort = searchParams.get("sort") || "newest";
    const status = searchParams.get("status") || "total";

    const skip = (page - 1) * limit;

    // Sorting
    let sortOption: any = { createdAt: -1 };

switch(sort){

 case "oldest":
  sortOption = { createdAt: 1 };
 break;

 case "title-asc":
  sortOption = { title: 1 };
 break;

 case "title-desc":
  sortOption = { title: -1 };
 break;

 default:
  sortOption = { createdAt: -1 };

}
    // Filter
    let filter: any = {};

    if (status === "published") filter.published = true;
    if (status === "draft") filter.published = false;
    
    console.log(filter);
    


    // Parallel Queries (Best)
    const [blogs, filteredTotal, stats] =
      await Promise.all([

        // Blogs
        blogModel
          .find(filter)
          .select("title slug image published createdAt")
          .sort(sortOption)
          .skip(skip)
          .limit(limit)
          .lean(),

        // Pagination count
        blogModel.countDocuments(filter),

        // Stats aggregation
        blogModel.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              published: {
                $sum: {
                  $cond: ["$published", 1, 0],
                },
              },
              draft: {
                $sum: {
                  $cond: ["$published", 0, 1],
                },
              },
            },
          },
        ]),
      ]);


    const counts = stats[0] || {
      total: 0,
      published: 0,
      draft: 0,
    };


    return apiResponse(
      true,
      "Blogs fetched",
      200,
      {
        blogs,

        counts,

        pagination: {
          page,
          limit,
          totalBlogs: filteredTotal,
          totalPages: Math.ceil(filteredTotal / limit),
        },
      }
    );

  } catch (error) {

    return apiResponse(
      false,
      "Failed to fetch blogs",
      500
    );

  }

}
