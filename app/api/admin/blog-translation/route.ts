import { connectDB } from "@/db/connectDB";
import { translateBlog } from "@/lib/ai/translate-blogs";
import { apiResponse } from "@/lib/apiResponse";

export async function POST(request: Request) {

 await connectDB();

 try{

  const body = await request.json();

  const { title, content } = body;

  if(!title || !content){
   return apiResponse(false,"Title and content required",400);
  }

  const translated = await translateBlog(
   title,
   content
  );



  return apiResponse(
   true,
   "Preview translation",
   200,
   translated
  );

 }catch(error){

  console.error("Translation Error:", error);

  return apiResponse(
   false,
   "Translation failed",
   500
  );

 }

}