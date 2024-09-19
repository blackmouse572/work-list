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
import { format, formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";
import useUpdateTodoSubTask from "../../hooks/useUpdateTodoSubtask";
import { toast } from "sonner";
import { useMemo, useRef } from "react";
import {
  exportSubtaskPriorityToChart,
  exportSubtaskStatusToChart,
} from "./mixin";
import TodoPieChart from "./component/PieChart";
import RawData from "./component/RawData";
import SubTaskList from "./component/SubtaskList";

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
  const swapyContainerRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: update } = useUpdateTodoSubTask(workspaceId, id);

  const onUpdateSubTaskStatus = (subTaskId: string, status: Todo["status"]) => {
    const currentSubTasks = data?.subTasks || [];
    const updatedSubTasks = currentSubTasks.map((subTask) => {
      if (subTask.id === subTaskId) {
        return {
          ...subTask,
          status,
          doneAt: status === "done" ? new Date() : undefined,
        };
      }
      return subTask;
    });
    const promise = update(updatedSubTasks);

    promise.catch(() => {
      toast.error("Failed to update sub task");
    });
  };

  const onUpdateSubTaskPriority = (
    subTaskId: string,
    priority: Todo["priority"]
  ) => {
    const currentSubTasks = data?.subTasks || [];
    const updatedSubTasks = currentSubTasks.map((subTask) => {
      if (subTask.id === subTaskId) {
        return {
          ...subTask,
          priority,
        };
      }
      return subTask;
    });
    const promise = update(updatedSubTasks);
    promise.catch(() => {
      toast.error("Failed to update sub task");
    });
  };

  const statusChartData = useMemo(
    () => data && exportSubtaskStatusToChart(data),
    [data]
  );
  const priorityChartData = useMemo(
    () => data && exportSubtaskPriorityToChart(data),
    [data]
  );

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
        <Card radius="sm" className="border border-default-200 bg-default/20">
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
              {data?.deletedAt && (
                <div className="w-full px-4">
                  <Chip variant="dot" size="sm" color="danger">
                    Deleted {formatDistanceToNow(data.deletedAt)} ago
                  </Chip>
                </div>
              )}
            </div>
            <Divider className="my-8" />
            <div
              data-swapy-container
              id={"swapy-container"}
              ref={swapyContainerRef}
              className="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4 [&>span>div]:h-full"
            >
              <span data-swapy-slot="1">
                <Card
                  shadow="none"
                  className="border border-default-200"
                  data-swapy-item="a"
                >
                  <CardHeader className="text-content1-foreground font-medium">
                    Sub Tasks
                  </CardHeader>
                  <CardBody>
                    <SubTaskList
                      data={data.subTasks ?? []}
                      onUpdateSubTaskPriority={onUpdateSubTaskPriority}
                      onUpdateSubTaskStatus={onUpdateSubTaskStatus}
                    />
                  </CardBody>
                </Card>
              </span>
              <span data-swapy-slot="2">
                <Card
                  className="border border-default-200 bg-default/20"
                  data-swapy-item="b"
                >
                  <CardHeader className="text-content1-foreground font-medium">
                    Raw Data
                  </CardHeader>
                  <CardBody>
                    <RawData data={JSON.stringify(data, null, 2)} />
                  </CardBody>
                </Card>
              </span>

              <span data-swapy-slot="3">
                <Card
                  shadow="none"
                  className="border border-default-200"
                  data-swapy-item="c"
                >
                  <CardBody>
                    <div className="flex flex-row max-w-full">
                      {statusChartData && (
                        <TodoPieChart label="Status" data={statusChartData} />
                      )}
                      {priorityChartData && (
                        <TodoPieChart
                          label="Priority"
                          data={priorityChartData}
                        />
                      )}
                    </div>
                  </CardBody>
                </Card>
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default TodoDetails;
