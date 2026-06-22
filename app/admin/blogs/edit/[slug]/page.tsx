"use client";

import Tiptap from "@/components/tiptap-text-editor/Tiptap";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Controller, useForm } from "react-hook-form";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createBlogSchema,
  updateBlogSchema,
} from "@/lib/validations/blog.schema";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorHandler";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,Empty } from "@/components/ui/empty";

type Translation = {
  language: string;
  title: string;
  content: string;
};

type Blog = {
  slug: string;
  title: string;
  content: string;
  image: string;
  published: boolean;
  translations: Translation[];
  createdAt?: string;
};

const EditBlog = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("english");
  const [blogID, setBlogID] = useState(null);

  // Translation loading state
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // React Hook Form setup
  const form = useForm<z.infer<typeof updateBlogSchema>>({
    resolver: zodResolver(updateBlogSchema),

    defaultValues: {
      title: "",
      image: "",
      content: "",
      published: true,
      translations: [], // AI translations
    },
  });

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/api/admin/blogs/${slug}`);
      if (res.data.success) {
        const blog = res.data.data;
      
      
        setBlogID(blog._id);
        form.reset({
          title: blog.title,
          image: blog.image,
          content: blog.content,
          published: blog.published,
          translations: blog.translations || [],
        });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Submit blog data
  const onSubmit = async (data: z.infer<typeof updateBlogSchema>) => {
    setIsPosting(true);
    try {

      const res = await axios.patch(`/api/admin/blogs/${blogID}`, data);
      if (res.data.success) {
        toast.success("Your Blog Posted Successfully");
      }
    } catch (error) {
      const er = getErrorMessage(error);
      toast.error(er);
    } finally {
      setIsPosting(false);
    }
  };


    // Call translation API
  const handleTranslate = async () => {
    setIsTranslating(true);

    const title = form.getValues("title");
    const content = form.getValues("content");
console.log("before :::::::::");

    console.log("Title:", form.getValues("title"));
console.log("Content:", form.getValues("content"));


  
    

    try {
      const response = await axios.post("/api/admin/blog-translation", {
        title,
        content,
      });

      const data = response.data;

      console.log("after :::::::::");

      console.log(data.data);
      
      if (data.success) {
        toast.success("Successfully Translated");

        // Set translations in form
        form.setValue("translations", data.data, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    } catch (error: any) {
      const erMsg = getErrorMessage(error);
      toast.error(erMsg);
    } finally {
      setIsTranslating(false);
    }
  };

  const isPublished = form.watch("published");
    

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-20">
      <Card className="shadow-sm">
        <Button
          className="w-fit mx-3"
          variant="outline"
          onClick={() => router.back()}
        >
          ← Back to Blogs
        </Button>
        <CardHeader className="text-center">
         <CardTitle className="text-3xl">Edit Blog</CardTitle>

<CardDescription>
  Update and manage your blog
</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              {/* Blog Title */}

              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title</FieldLabel>

                    <Input {...field} placeholder="Enter blog title" />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Blog Image */}

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Image URL</FieldLabel>

                    <Input {...field} placeholder="https://image-url.com" />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
               Translation Section 

              {/* <h2>Blog Content</h2>
              <div>
                  <h2>Translation</h2>

              <Button
                type="button"
                onClick={handleTranslate}
                disabled={isTranslating}
              >
                {isTranslating ? "Translating..." : "Translate Blog"}
              </Button>

               {isTranslating && (
                  <Empty className="w-full border rounded-lg p-6">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Spinner />
                      </EmptyMedia>

                      <EmptyTitle>Translating Blog...</EmptyTitle>

                      <EmptyDescription>
                        Please wait while we translate your blog.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}

                {form.watch("translations")?.map((item, index) => (
                  <div key={item.language} className="space-y-3 mb-5">
                    <h3 className="font-bold uppercase">{item.language}</h3>


                    <Controller
                      name={`translations.${index}.title`}
                      control={form.control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Title" />
                      )}
                    />


                    <Controller
                      name={`translations.${index}.content`}
                      control={form.control}
                      render={({ field }) => (
                        <Tiptap
                          content={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
         */}

         {/* Blog Content */}

<div className="space-y-4">
  <h2 className="text-xl font-semibold">Blog Content</h2>

  <Controller
    name="content"
    control={form.control}
    render={({ field, fieldState }) => (
      
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel>Content</FieldLabel>

      

      <Tiptap
  key={form.watch("content")}
  content={field.value || ""}
  onChange={field.onChange}
/>

        {fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        )}
      </Field>
    )}
  />
</div>

{/* Translation Section */}

<div className="space-y-5">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <h2 className="text-xl font-semibold">Translations</h2>
      <p className="text-sm text-muted-foreground">
        Regenerate translations using the latest title and content.
      </p>
    </div>

    <Button
      type="button"
      variant="default"
      onClick={handleTranslate}
      disabled={isTranslating}
    >
      {isTranslating
        ? "Re-Translating..."
        : "🔄 Re-Translate Blog"}
    </Button>
  </div>

  {isTranslating && (
    <Empty className="w-full border rounded-lg p-6">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>

        <EmptyTitle>Re-Translating Blog...</EmptyTitle>

        <EmptyDescription>
          Please wait while translations are being generated.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )}

  {form.watch("translations")?.map((item, index) => (
    <Card key={item.language} className="border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg uppercase">
          {item.language}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Controller
          name={`translations.${index}.title`}
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Translated title"
            />
          )}
        />

        <Controller
          name={`translations.${index}.content`}
          control={form.control}
          render={({ field }) => (
            <Tiptap
              content={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
      </CardContent>
    </Card>
  ))}
</div>


            </FieldGroup>

            {/* Submit Button */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t">
              {/* Draft Toggle Section */}
              <Controller
                name="published"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center gap-3 bg-muted/40 px-4 py-3 rounded-xl border">
                    <Checkbox
                      checked={!field.value}
                      onCheckedChange={(checked) => field.onChange(!checked)}
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {field.value ? "Publish Immediately" : "Save as Draft"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {field.value
                          ? "This blog will be visible to everyone."
                          : "This blog will be saved privately as draft."}
                      </p>
                    </div>
                  </div>
                )}
              />

              {/* Publish Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isPosting}
                className={`sm:w-56 w-full text-base font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] ${
                  isPublished
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {isPosting
                  ? isPublished
                    ? "Saving..."
                    : "Saving Draft..."
                  : isPublished
                    ? "🚀 Save Blog"
                    : "📝 Save Draft"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
