"use client";
import useGetTodoById from "@/app/(main)/hooks/useGetTodoById";
import Breadcumbs from "@/app/components/Breadcumbs";
import { Icon } from "@/app/components/Icons";
import SubtaskCircularProgress from "@/app/components/SubtaskCircularProgress";
import { Todo } from "@models/todo";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Skeleton } from "@nextui-org/skeleton";
import { format } from "date-fns";
import { notFound } from "next/navigation";

const statusColorMap: Record<
  Todo["status"],
  "primary" | "success" | "warning" | "danger"
> = {
  done: "success",
  "in-progress": "warning",
  todo: "primary",
};
function TodoDetails({ id, workspaceId }: { id: string; workspaceId: string }) {
  const { data, isLoading } = useGetTodoById(workspaceId, id);
  if (isLoading)
    return (
      <div className="pt-2 max-h-screen min-w-[300px] overflow-auto space-y-4 relative">
        <div className="flex gap-2 px-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-32 h-6 rounded-small" />
          ))}
        </div>
        <div className="px-4 space-y-2">
          <Skeleton className="w-full h-24 rounded-small" />
          <div className="flex gap-4">
            <Skeleton className="w-full h-5 rounded-small" />
            <Skeleton className="w-full h-5 rounded-small" />
            <Skeleton className="w-full h-5 rounded-small" />
          </div>
        </div>
        <div className="px-4 space-y-2">
          <Skeleton className="w-full h-24 rounded-small" />
          <div className="flex gap-4">
            <Skeleton className="w-full h-5 rounded-small" />
            <Skeleton className="w-full h-5 rounded-small" />
            <Skeleton className="w-full h-5 rounded-small" />
          </div>
        </div>
        <div className="px-4 space-y-2">
          <Skeleton className="w-full h-24 rounded-small" />
          <div className="flex gap-4">
            <Skeleton className="w-full h-5 rounded-small" />
            <Skeleton className="w-full h-5 rounded-small" />
            <Skeleton className="w-full h-5 rounded-small" />
          </div>
        </div>
      </div>
    );
  if (!data) return notFound();
  return (
    <div className="pt-2 max-h-screen min-w-[300px] overflow-auto space-y-4 relative">
      <Breadcumbs
        className="px-4"
        items={[
          {
            label: "Home",
            href: "",
            disabled: true,
          },
          {
            label: "Todo",
            href: "/",
          },
          {
            label: data?.id || "Loading...",
            href: "/",
          },
        ]}
      />
      <div className="px-4 space-y-2">
        <Card
          isBlurred
          shadow="none"
          radius="sm"
          className="border border-default-200"
        >
          <CardHeader className="uppercase text-3xl text-content1-foreground font-bold tracking-widest">
            {data?.title}
          </CardHeader>
          <CardBody>
            <p className="text-content3-foreground">
              {data?.description || "No description"}
            </p>
            <Divider className="my-8" />
            <div className="flex gap-2 divide-x-2 divide-divider justify-evenly items-center text-sm">
              <div className="w-full px-4">
                Status:{" "}
                <Chip
                  color={statusColorMap[data?.status]}
                  className="capitalize border-none gap-1 text-default-600"
                  size="sm"
                  variant="faded"
                  radius="sm"
                >
                  {data?.status}
                </Chip>
              </div>
              <div className="w-full px-4">
                Due date:&nbsp;
                <span className="text-default-600">
                  <Icon name="tabler/clock-2-outline" />
                  &nbsp;
                  {data?.dueDate
                    ? format(data.dueDate, "dd MMM")
                    : "No due date"}
                </span>
              </div>
              <div className="w-full px-4 flex items-center">
                Sub tasks:&nbsp;
                <SubtaskCircularProgress item={data} />
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4">
          <Card
            isBlurred
            shadow="none"
            radius="sm"
            className="border border-default-200"
          >
            <CardHeader className="text-content1-foreground font-medium">
              Sub Tasks
            </CardHeader>
            <CardBody>
              {data?.subTasks.length === 0 ? (
                <p className="h-32 flex items-center justify-center opacity-20">
                  No sub tasks yet
                </p>
              ) : (
                data?.subTasks.map((subTask) => (
                  <div
                    key={subTask.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <Chip
                      color={statusColorMap[subTask.status]}
                      className="capitalize border-none gap-1 text-default-600"
                      size="sm"
                      variant="faded"
                      radius="sm"
                    >
                      {subTask.title}
                    </Chip>
                    <span className="text-default-600">
                      <Icon name="tabler/clock-2-outline" />
                      &nbsp;
                      {subTask.dueDate
                        ? format(subTask.dueDate, "dd MMM")
                        : "No due date"}
                    </span>
                  </div>
                ))
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TodoDetails;
