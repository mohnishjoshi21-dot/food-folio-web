import slugify from "slugify";

export const generateSlug =  (title: string) => {

  let slug = slugify(title, {
    lower: true,
    strict: true,
    trim:true
  });

  return slug;
};