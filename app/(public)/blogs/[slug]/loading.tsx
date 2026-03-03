// app/blogs/[slug]/loading.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-4 py-10">
      <Card className="max-w-3xl mx-auto rounded-2xl">
        <CardContent className="p-8 space-y-6">

          {/* Back Button */}
          <Skeleton className="h-8 w-32" />

          {/* Title */}
          <Skeleton className="h-10 w-3/4" />

          {/* Date + Language */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-32" />
          </div>

          {/* Image */}
          <Skeleton className="h-64 w-full rounded-xl" />

          {/* Content */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

        </CardContent>
      </Card>
    </div>
  );
}