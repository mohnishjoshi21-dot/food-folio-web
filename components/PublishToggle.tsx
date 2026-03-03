"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

type Props = {
  blogId: string;
  published: boolean;
};

export default function PublishToggle({ blogId, published }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(published);

  const togglePublish = async () => {
    try {
      setLoading(true);

      const res = await axios.patch(`/api/admin/blogs/${blogId}/publish`);

      setStatus(res.data.data.published);

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 justify-center w-fit">
      {/* Label */}

      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium"></Label>

        <span className="text-sm text-muted-foreground">
          {status ? "Published" : "Draft"}
        </span>
      </div>

      {/* Switch */}

      <div className="flex items-center gap-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}

        <Switch
          checked={status}
          onCheckedChange={togglePublish}
          disabled={loading}
        />
      </div>
    </div>
  );
}
