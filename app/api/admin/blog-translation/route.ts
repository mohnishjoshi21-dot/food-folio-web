import { connectDB } from "@/db/connectDB";
import { translateBlogGemini } from "@/lib/ai/translate-blogs-gemini";
import { translateBlogGroq } from "@/lib/ai/translate-blogs-groq";
import { isValidTranslation } from "@/lib/ai/ValidTranslation";
import { apiResponse } from "@/lib/apiResponse";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return apiResponse(false, "Title and content required", 400);
    }

    let translated;

    try {
      // ✅ PRIMARY (best for your use case)
      console.log("🚀 Gemini START");

      translated = await translateBlogGemini(title, content);
      if (!isValidTranslation(translated)) {
        throw new Error("Invalid translation format");
      }
      console.log("✅ Gemini end");
    } catch (err) {
      console.log("🚀 Groq START");
      console.warn("⚠️ Gemini failed, switching to Groq");

      // ✅ FALLBACK
      translated = await translateBlogGroq(title, content);
      console.log("⚡ Groq end");
    }

    return apiResponse(true, "Preview translation", 200, translated);
  } catch (error: any) {
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

      const retryInfo = realError?.data?.error?.details?.find(
        (d: any) => d["@type"] === "type.googleapis.com/google.rpc.RetryInfo",
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
    } else if (
      realError?.message?.includes("ECONNRESET") ||
      realError?.message?.includes("fetch")
    ) {
      message = "Network issue while contacting AI. Please try again.";
      statusCode = 500;
    } else if (!realError?.message) {
      message = "Unexpected AI error. Please try again.";
    }

    // ✅ fallback
    else if (realError?.message) {
      message = realError.message;
    } else {
      message = "Something went wrong. Please try again.";
    }

    return apiResponse(false, message, statusCode);
  }
}
