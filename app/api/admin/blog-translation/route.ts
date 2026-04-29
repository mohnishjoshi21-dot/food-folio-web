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

  console.log(translated);
  



  return apiResponse(
   true,
   "Preview translation",
   200,
   translated
  );

}catch(error:any){

 console.error("🔥 MAIN ERROR:");
 console.dir(error, { depth: null });

 const realError = error?.lastError || error;

 let message = "Translation failed";
 let statusCode = 500;

 // ✅ 429 handling
 if (realError?.statusCode === 429) {

   const isQuota = realError?.message?.includes("quota");

   if (isQuota) {
     message = "Daily API limit exceeded. Try again tomorrow.";
   } else {
     message = "Too many requests. Please try again later.";
   }

   // retry time extract
   const retryInfo = realError?.data?.error?.details?.find(
     (d: any) => d["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
   );

   if (retryInfo?.retryDelay) {
     message += ` (Retry after ${retryInfo.retryDelay})`;
   }

   statusCode = 429;
 }

 // ✅ parse error
 else if (realError?.message === "Invalid translation format") {
   message = "AI response error. Please retry.";
   statusCode = 400;
 }

 // ✅ fallback
 else if (realError?.message) {
   message = realError.message;
 }

 return apiResponse(false, message, statusCode);
}

}