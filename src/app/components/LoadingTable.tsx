import { Skeleton } from '@nextui-org/skeleton';

function LoadingTable() {
  return (
    <div className="w-full h-full space-y-2 mt-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="flex gap-2">
          <Skeleton className="w-full h-6 rounded-small" />
          <Skeleton className="w-full h-6 rounded-small" />
          <Skeleton className="w-full h-6 rounded-small" />
          <Skeleton className="w-full h-6 rounded-small" />
        </div>
      ))}
    </div>
  );
}

export default LoadingTable;
