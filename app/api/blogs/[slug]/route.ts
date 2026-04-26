import blogModel from "@/app/models/blog.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";

export async function GET(
  request: Request,
    { params }: { params: Promise<{ slug: string }> }

) {

  await connectDB();

  try {
      
      const { slug } = await params;
      
      
    const blog = await blogModel.findOneAndUpdate(
                            { slug, published: true },
                            { $inc: { views: 1 } }, // ✅ correct
                            { new: true }
                          ).lean();

    if (!blog) {
      return apiResponse(false,"Blog not found",404);
    }

    return apiResponse(true,"Blog fetched",200,blog);

  } catch (error) {

    return apiResponse(false,"Failed to fetch blog",500);

  }
}
