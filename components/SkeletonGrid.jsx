"use client";
import { Skeleton } from "./ui/skeleton";

const SkeletonGrid = () => {
  return (
    <div
      className="w-full grid grid-cols-1 xl:grid-cols-4
    gap-[30px] mb-32"
    >
      <div className="flex flex-col space-y-3">
        <Skeleton className={"h-[225px] rounded-xl "} />
        <div className="space-y-2">
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonGrid;
