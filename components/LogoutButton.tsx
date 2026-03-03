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

import { LogOut, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorHandler";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/admin/auth/logout");
      router.push("/admin/login");
      toast.success("You Are Logged Out")
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error))
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="gap-2 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout?</AlertDialogTitle>

          <AlertDialogDescription>
            You will be logged out of the admin panel.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={logout}
            disabled={loading}
            className="gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
