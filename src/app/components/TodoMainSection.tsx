"use client";
import TableActionToast from "@/app/(main)/components/TableActionToast";
import useAddTodo from "@/app/(main)/hooks/useAddTodo";
import useDeleteTodo from "@/app/(main)/hooks/useDeleteTodo";
import useGetTodo from "@/app/(main)/hooks/useGetTodo";
import ActionToast from "@/app/components/ActionToast";
import AddTodoPanel, { AddTodoSchema } from "@/app/components/AddTodo";
import Breadcumbs from "@/app/components/Breadcumbs";
import useConfirm from "@/app/components/ConfirmDialog";
import { toast } from "sonner";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/components/ContextMenu";
import { Icon } from "@/app/components/Icons";
import TodoTable from "@/app/components/TodoTable";
import { useTableControl } from "@/app/components/useTableControl";
import { Button, Input, Selection } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import useUpdateTodo from "../(main)/hooks/useUpdateTodo";
import FilterTable, { FilterTodoTableSchema } from "./FilterTable";
import { debounce } from "lodash";

type TodoMainSectionProps = {
  workspaceId: string;
};
function TodoMainSection({ workspaceId }: TodoMainSectionProps) {
  const {
    selectedKeys,
    setSearchValue: setFilterValue,
    setSelectedKeys,
  } = useTableControl();
  const { confirm } = useConfirm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const filter = useMemo(() => {
    const status = searchParams.get("status") ?? "all";
    const search = searchParams.get("search") ?? "";
    const priority = searchParams.get("priority") ?? "all";
    const dueDateStart = searchParams.get("dueDateStart");
    const dueDateEnd = searchParams.get("dueDateEnd");

    return FilterTodoTableSchema.parse({
      search,
      status,
      priority,
      dueDateStart: dueDateStart ? new Date(dueDateStart) : undefined,
      dueDateEnd: dueDateEnd ? new Date(dueDateEnd) : undefined,
    });
  }, [searchParams]);

  const isActionToastOpen = useMemo(() => {
    const isAll = selectedKeys === "all";
    if (isAll) return true;

    return selectedKeys.size > 0;
  }, [selectedKeys]);

  const { mutate: addTodo } = useAddTodo(workspaceId);
  const { mutate: updateTodo } = useUpdateTodo(workspaceId);
  const { mutateAsync: deleteTodo } = useDeleteTodo(workspaceId);
  const { refetch, data, isLoading } = useGetTodo(workspaceId, filter);

  const onRefetch = () => {
    toast.promise(refetch, {
      loading: "Refreshing data...",
      success: "Data refreshed successfully",
      error: "Failed to refresh data",
    });
  };

  const onCreate = () => {
    setOpenCreate(true);
    setSelectedKeys(new Set());
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);

  const onDeleteTodos = async (selection: Selection) => {
    const isActionConfirmed = await confirm({
      title: "Delete Todo",
      description: "Are you sure you want to delete the selected todo?",
      confirmButton: { children: "Delete", color: "danger" },
      cancelButton: { children: "Cancel" },
    });
    if (!isActionConfirmed) return;
    if (selection === "all") {
      return;
    } else {
      const ids = Array.from(selection);
      const promises = ids.map((id) => deleteTodo(id.toString()));
      const promise = Promise.all(promises).then((v) => {
        setSelectedKeys(new Set());
        return v;
      });
      toast.promise(promise, {
        loading: "Deleting todo...",
        success: (v) => `Deleted ${v.length} todos successfully`,
        error: "Failed to delete todo",
      });
    }
  };

  const editTodo = useMemo(() => {
    if (selectedKeys === "all" || selectedKeys.size !== 1) return undefined;
    const id = Array.from(selectedKeys)[0];
    return data?.find((todo) => todo.id === id);
  }, [selectedKeys, data]);

  const setSearchToSearchParam = useCallback(
    (value: string) => {
      const search = value.trim();
      const url = new URLSearchParams(searchParams);
      if (search) {
        url.set("search", search);
      } else {
        url.delete("search");
      }
      router.push(pathName + "?" + url.toString());
    },
    [pathName, router, searchParams]
  );
  const debounceSetSearchToSearchParam = useMemo(
    () => debounce(setSearchToSearchParam, 500),
    [setSearchToSearchParam]
  );

  const onSearchChange = (value: string) => {
    setFilterValue(value);
    debounceSetSearchToSearchParam(value);
  };

  const onSubmitTodo = (todo: AddTodoSchema) => {
    if (editTodo) {
      updateTodo({
        ...todo,
        id: editTodo.id,
      });
    } else {
      addTodo(todo);
    }
  };

  return (
    <div className="pt-2 h-screen min-w-[300px] overflow-auto space-y-4 relative">
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
        ]}
      />
      <nav className="sticky top-0 z-[9] px-4 space-y-3">
        <div className="flex flex-col gap-4 bg-default-100 bg-opacity-50 border border-default-200 rounded-medium p-1 backdrop-blur-lg">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              classNames={{
                base: "w-1/4 sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={
                <Icon
                  name="tabler/search-outline"
                  className="text-default-300"
                />
              }
              variant="bordered"
              defaultValue={filter.search}
              onClear={() => onSearchChange("")}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3 flex-1 justify-end items-center">
              <FilterTable />
              <AddTodoPanel
                onSubmit={onSubmitTodo}
                open={openCreate}
                setOpen={setOpenCreate}
                trigger={
                  <Button
                    endContent={<Icon name="tabler/plus-outline" />}
                    className="min-w-max"
                    size="sm"
                    onClick={onCreate}
                  >
                    Add New
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </nav>
      <ContextMenu>
        <ContextMenuTrigger>
          <TodoTable
            items={data}
            workspaceId={workspaceId}
            isLoading={isLoading}
            onCreateTask={() => setOpenCreate(true)}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => onRefetch()}
            endContent={<Icon name="tabler/progress-outline" size="sm" />}
          >
            Refresh Data
          </ContextMenuItem>
          {editTodo && (
            <ContextMenuItem
              onClick={() => setOpenEdit(true)}
              endContent={<Icon name="tabler/pencil-outline" size="sm" />}
            >
              Edit
            </ContextMenuItem>
          )}
          {editTodo && (
            <ContextMenuItem
              onClick={() => {
                router.push(`/todo/${editTodo.id}`);
              }}
              endContent={<Icon name="tabler/tags-outline" size="sm" />}
            >
              Details
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {/* EDIT PANEL */}
      <AddTodoPanel
        onSubmit={onSubmitTodo}
        open={openEdit}
        setOpen={setOpenEdit}
        defaultValues={editTodo}
        trigger={<></>}
      />

      <ActionToast
        actions={[
          selectedKeys !== "all" && selectedKeys.size > 1
            ? {
                children: "De-select",
                variant: "faded",
                onClick: () => setSelectedKeys(new Set()),
                color: "secondary",
                startContent: <Icon name="tabler/circle-x-filled" />,
              }
            : {
                children: "Edit",
                variant: "faded",
                onClick: () => setOpenEdit(true),
                color: "primary",
                startContent: <Icon name="tabler/pencil-outline" />,
              },
          {
            children: "Delete",
            variant: "faded",
            onClick: () => onDeleteTodos(selectedKeys),
            color: "danger",
            startContent: <Icon name="tabler/trash-outline" />,
          },
        ]}
        isOpen={isActionToastOpen}
        message={<TableActionToast />}
        onOpenChange={() => {}}
      />
    </div>
  );
}

export default TodoMainSection;
