"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorHandler";

type Props = {
  blogId: string;
};

export default function DeleteBlogButton({ blogId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteBlog = async () => {
    try {
      setLoading(true);

      const res = await axios.delete(`/api/admin/blogs/${blogId}`);

      if (res.data.success) {
        toast.success("Blog Deleted");
        router.refresh(); // refresh blog list
      }
    } catch (error) {
      toast(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"  className="gap-2">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={deleteBlog} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
