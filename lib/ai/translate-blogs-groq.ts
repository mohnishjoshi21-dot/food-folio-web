import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

const languages = ["hindi", "french", "spanish", "italian"];

export async function translateBlogGroq(title: string, content: string) {
  const results = [];

  for (const lang of languages) {
    const systemPrompt = `
You are a professional blog translator.

Translate the blog into ${lang}.

Rules:
1. Preserve meaning exactly.
2. Use natural language.
3. Do not shorten content.
4. Do not add explanations.
5. Return ONLY valid JSON.
6. No markdown.
7. Output must be a single object.

Format:
{
  "language": "${lang}",
  "title": "",
  "content": ""
}
`;

    const prompt = `
Translate this blog into ${lang}

Title:
${title}

Content:
${content}
`;

    try {
      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        system: systemPrompt,
        prompt,
      });

      // 🧹 Clean response
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      results.push(parsed);

      // ⏱️ Small delay (rate limit safe)
      await new Promise((r) => setTimeout(r, 500));
    } catch (error) {
      console.error(`Error in ${lang}:`, error);

      // ❗ fallback (important for production)
      results.push({
        language: lang,
        title: "",
        content: "",
        error: true,
      });
    }
  }

  return results;
}