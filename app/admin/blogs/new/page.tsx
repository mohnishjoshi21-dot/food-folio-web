"use client";

import Tiptap from "@/components/tiptap-text-editor/Tiptap";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Controller, useForm } from "react-hook-form";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createBlogSchema } from "@/lib/validations/blog.schema";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorHandler";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const CreateBlog = () => {
  // Translation loading state
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  // React Hook Form setup
  const form = useForm<z.infer<typeof createBlogSchema>>({
    resolver: zodResolver(createBlogSchema),

    defaultValues: {
      title: "",
      image: "",
      content: "",
      published: true,
      translations: [], // AI translations
    },
  });

  // Submit blog data
  const onSubmit = async (data: z.infer<typeof createBlogSchema>) => {
    setIsPosting(true);
    try {
      const res = await axios.post("/api/admin/blogs", data);
      if (res.data.success) {
        toast.success("Your Blog Posted Successfully");
        router.replace('/admin/blogs')
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

    try {
      const response = await axios.post("/api/admin/blog-translation", {
        title,
        content,
      });

      const data = response.data;

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
          <CardTitle className="text-3xl">Create Blog</CardTitle>

          <CardDescription>Write and publish a new blog</CardDescription>
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

              {/* Main Blog Content */}

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Content</FieldLabel>

                    <Tiptap content={field.value} onChange={field.onChange} />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Translation Section */}

              <h2>Translation</h2>

              <Button
                type="button"
                onClick={handleTranslate}
                disabled={isTranslating}
              >
                {isTranslating ? "Translating..." : "Translate Blog"}
              </Button>

              <div>
                {/* Translation Spinner */}

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

                {/* Translated Editors */}

                {form.watch("translations")?.map((item, index) => (
                  <div key={item.language} className="space-y-3 mb-5">
                    <h3 className="font-bold uppercase">{item.language}</h3>

                    {/* Translation Title */}

                    <Controller
                      name={`translations.${index}.title`}
                      control={form.control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Title" />
                      )}
                    />

                    {/* Translation Content */}

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
                    ? "Publishing..."
                    : "Saving Draft..."
                  : isPublished
                    ? "🚀 Publish Blog"
                    : "📝 Save Draft"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlog;
