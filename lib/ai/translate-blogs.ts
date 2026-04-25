import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const languages = ["hindi", "french", "spanish","Italian"];

export async function translateBlog(
  title: string,
  content: string
) {

const systemPrompt = `
You are a professional multilingual blog translator.

Translate the blog accurately.

Target languages:
${languages.join(", ")}

Rules:

1. Preserve meaning exactly.
2. Use natural language.
3. Do not shorten content.
4. Do not add explanations.
5. Return ONLY valid JSON.
6. Do not include markdown.
7. Language names must match exactly.
8. Keep the same order.
9. Response must start with [ and end with ].

Output format:

${JSON.stringify(
languages.map(lang => ({
 language: lang,
 title: "",
 content: ""
})),
null,
2
)}
`;

const prompt = `
Translate this blog into:

${languages.join(", ")}

Title:
${title}

Content:
${content}

Return ONLY the JSON array.
`;


const { text } = await generateText({

 model: google("gemini-2.5-flash"),

 system: systemPrompt,

 prompt

});


/*
 Clean Gemini Response
*/
const cleaned = text
 .replace(/```json/g,"")
 .replace(/```/g,"")
 .trim();


try {

 return JSON.parse(cleaned);

} catch (error) {

 console.log("Translation Parse Error:", cleaned);

 throw new Error("Invalid translation format");

}

}