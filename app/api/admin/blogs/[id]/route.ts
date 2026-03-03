import blogModel from "@/app/models/blog.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { formatZodError } from "@/lib/formateZodError";
import { updateBlogSchema } from "@/lib/validations/blog.schema";
import { LOADIPHLPAPI } from "dns";
import mongoose from "mongoose";


// ================= GET BLOG =================
export async function GET(
  request: Request,
    { params }: { params: Promise<{ id: string }> }

) {

  await connectDB();

  try {

   const { id:slug} = await params;

   console.log(slug);
   

   

    const blog = await blogModel.findOne({slug}).lean();

    if (!blog) {
      return apiResponse(false,"Blog not found",404);
    }

    return apiResponse(true,"Blog fetched",200,blog);

  } catch (error) {

    return apiResponse(false,"Failed to fetch blog",500);

  }
}



// ================= DELETE BLOG =================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();

  try {

   const { id: blogId } = await params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return apiResponse(false,"Invalid Blog ID",400);
    }

    const blog = await blogModel.findByIdAndDelete(blogId);

    if (!blog) {
      return apiResponse(false,"Blog not found",404);
    }

    return apiResponse(true,"Blog Deleted",200,blog);

  } catch (error) {

    return apiResponse(false,"Failed to delete blog",500);

  }
}



// ================= UPDATE BLOG =================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();
  
  try {
    
    const { id: blogId } = await params;

    console.log("hello");
    
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return apiResponse(false,"Invalid Blog ID",400);
    }
    
    let body;
    
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    console.log("hello1",body);
    
    // Zod Validation
    const validation = updateBlogSchema.safeParse(body);

    
    if (!validation.success) {
      return apiResponse(
        false,
        formatZodError(validation.error),
        400
      );
    }
    console.log("hello8");

    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      { $set: validation.data },
      { new: true }
    );

    if (!blog) {
      return apiResponse(false,"Blog not found",404);
    }

    return apiResponse(true,"Blog Updated",200,blog);

  } catch (error) {
    console.log(error);
    
    return apiResponse(false,"Failed to update blog",500);

  }
}