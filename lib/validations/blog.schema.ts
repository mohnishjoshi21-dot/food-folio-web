import mongoose from "mongoose";
import { z } from "zod";

/*
 Translation Validation
*/
export const translationSchema = z.object({
  language: z.string().min(2),

  title: z.string().min(1),

  content: z.string().min(1),
});


/*
 Create Blog Validation
*/
export const createBlogSchema = z.object({

  title: z.string().min(1),

  content: z.string().min(1),

  image: z.string().optional(),

  translations: z
    .array(translationSchema)
    .optional(),

  published: z.boolean().optional(),

});


/*
 Update Blog Validation
*/
export const updateBlogSchema = z.object({

  title: z.string().min(3).optional(),

  content: z.string().min(10).optional(),

  image: z.string().optional(),

  translations: z.array(translationSchema).optional(),

  published: z.boolean().optional(),

})
.refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field is required to update"
  }
);