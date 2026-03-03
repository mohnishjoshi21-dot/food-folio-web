import mongoose, { Schema, Document } from "mongoose";

export interface Translation {
  language: string; // "hi", "fr", "es"
  title: string;
  content: string;
}

export interface Blog extends Document {
  slug: string;
  title: string; // English (default)
  content: string; // English (default)
  image?: string;
  translations: Translation[];
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const translationSchema = new Schema<Translation>(
  {
    language: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const blogSchema = new Schema<Blog>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    translations: [translationSchema],
    published: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Prevent duplicate language inside translations
blogSchema.index(
  { slug: 1, "translations.language": 1 },
  { unique: true, sparse: true },
);

export default mongoose.models.Blog || mongoose.model<Blog>("Blog", blogSchema);





