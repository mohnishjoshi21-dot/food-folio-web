import blogModel from "@/app/models/blog.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { updateBlogSchema } from "@/lib/validations/blog.schema";
import mongoose from "mongoose";

// ================= UPDATE BLOG =================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();
  
  try {
    
    const { id: blogId } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return apiResponse(false,"Invalid Blog ID",400);
    }
    

    const blog = await blogModel.findById(blogId).select("title slug published")

    if (!blog) {
      return apiResponse(false,"Blog not found",404);
    }
    const res = blog.published

    blog.published = res ? false:true

    await blog.save()

    return apiResponse(true,"Blog publish status Updated",200,blog);

  } catch (error) {

    return apiResponse(false,"Failed to update blog publish status",500);

  }
}