'use client';
import TableActionToast from '@/app/(main)/components/TableActionToast';
import ActionToast from '@/app/components/ActionToast';
import Breadcumbs from '@/app/components/Breadcumbs';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/app/components/ContextMenu';
import DoubleConfirm from '@/app/components/DoubleConfirm';
import { Icon } from '@/app/components/Icons';
import TodoTable from '@/app/components/TodoTable';
import { useTableControl } from '@/app/components/useTableControl';
import { Input } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { toast } from 'sonner';
import useDeleteTodos from '../(main)/hooks/useDeleteTodos';
import useForceDeleteTodos from '../(main)/hooks/useForceDeleteTodos';
import useGetDeleteTodo from '../(main)/hooks/useGetDeleteTodo';
import useRestoreTodos from '../(main)/hooks/useRestoreTodo';
import FilterTable, { FilterTodoTableSchema } from './FilterTable';

type TodoMainSectionProps = {
  workspaceId: string;
};
function TrashMainSection({ workspaceId }: TodoMainSectionProps) {
  const { searchValue: filterValue, selectedKeys, setSelectedKeys } = useTableControl();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = useMemo(() => {
    const status = searchParams.get('status') ?? 'all';
    const priority = searchParams.get('priority') ?? 'all';
    const dueDateStart = searchParams.get('dueDateStart');
    const dueDateEnd = searchParams.get('dueDateEnd');
    const search = searchParams.get('search') ?? '';

    return FilterTodoTableSchema.parse({
      status,
      priority,
      search,
      dueDateStart: dueDateStart ? new Date(dueDateStart) : undefined,
      dueDateEnd: dueDateEnd ? new Date(dueDateEnd) : undefined,
    });
  }, [searchParams]);
  const isActionToastOpen = useMemo(() => {
    const isAll = selectedKeys === 'all';
    if (isAll) return true;

    return selectedKeys.size > 0;
  }, [selectedKeys]);

  const { refetch, data, isLoading } = useGetDeleteTodo(workspaceId, filter);

  const onRefetch = () => {
    toast.promise(refetch, {
      loading: 'Refreshing data...',
      success: 'Data refreshed successfully',
      error: 'Failed to refresh data',
    });
  };

  const { mutateAsync: restoreTodo } = useRestoreTodos(workspaceId);
  const { mutateAsync: deleteTodo } = useDeleteTodos(workspaceId);
  const { mutateAsync: forceDeleteTodo } = useForceDeleteTodos(workspaceId);

  const onDeleteTodos = async () => {
    // const isActionConfirmed = await confirm({
    //   title: "Delete Todo",
    //   description:
    //     "Are you sure you want to completely delete the selected todo? (This action cannot be undone)",
    //   confirmButton: { children: "Delete", color: "danger" },
    //   cancelButton: { children: "Cancel" },
    // });
    // if (!isActionConfirmed) return;
    // if (selection === "all") {
    //   return;
    // } else {
    //   const ids = Array.from(selection).map((id) => id.toString());
    //   const promise = forceDeleteTodo(ids);
    //   toast.promise(promise, {
    //     loading: "Deleting todo...",
    //     success: (v) => `Deleted ${v.length} todos successfully`,
    //     error: "Failed to delete todo",
    //   });
    // }
    setIsDeleteDialogOpen(true);
  };
  const editTodo = useMemo(() => {
    if (selectedKeys === 'all' || selectedKeys.size !== 1) return undefined;
    const id = Array.from(selectedKeys)[0];
    return data?.find((todo) => todo.id === id);
  }, [selectedKeys, data]);
  const restoreTodos = () => {
    if (selectedKeys === 'all') {
      const ids = data?.map((todo) => todo.id) ?? [];
      const promise = restoreTodo(ids);

      toast.promise(promise, {
        loading: 'Restoring todos...',
        success: 'Todos restored successfully',
        error: 'Failed to restore todos',
        action: {
          children: 'Undo',
          label: 'Undo',
          onClick: () => {
            const promise = deleteTodo(ids);
            toast.promise(promise, {
              loading: 'Deleting todos...',
              success: 'Todos deleted successfully',
              error: 'Failed to delete todos',
            });
          },
        },
      });
    } else {
      const ids = Array.from(selectedKeys).map((id) => id.toString());
      const promise = restoreTodo(ids);
      toast.promise(promise, {
        loading: 'Restoring todos...',
        success: 'Todos restored successfully',
        error: 'Failed to restore todos',
        action: {
          children: 'Undo',
          label: 'Undo',
          onClick: () => {
            const promise = deleteTodo(ids);
            toast.promise(promise, {
              loading: 'Deleting todos...',
              success: 'Todos deleted successfully',
              error: 'Failed to delete todos',
            });
          },
        },
      });
    }
    setSelectedKeys(new Set());
  };

  const onHandleConfirm = () => {
    if (selectedKeys === 'all') {
      return;
    } else {
      const ids = Array.from(selectedKeys).map((id) => id.toString());
      const promise = forceDeleteTodo(ids);
      toast.promise(promise, {
        loading: 'Deleting todo...',
        success: (v) => `Deleted ${v.length} todos successfully`,
        error: 'Failed to delete todo',
      });
      setSelectedKeys(new Set());
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="pt-2 h-screen min-w-[300px] overflow-auto space-y-4 relative">
      <Breadcumbs
        className="px-4"
        items={[
          {
            label: 'Home',
            href: '',
            disabled: true,
          },
          {
            label: 'Trash',
            href: '/trash',
          },
        ]}
      />
      <nav className="sticky top-0 z-[9] px-4 space-y-3">
        <div className="flex flex-col gap-4 bg-default-100 bg-opacity-50 border border-default-200 rounded-medium p-1 backdrop-blur-lg">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              classNames={{
                base: 'w-full sm:max-w-[44%] md:max-w-[25%]',
                inputWrapper: 'border-1',
              }}
              defaultValue={filter.search}
              placeholder="Search by name..."
              size="sm"
              startContent={<Icon name="tabler/search-outline" className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              // onClear={() => onSearchChange("")}
              // onValueChange={onSearchChange}
            />
            <div className="flex gap-3 flex-1 justify-end items-center">
              <FilterTable />
            </div>
          </div>
        </div>
      </nav>
      <DoubleConfirm
        isOpen={isDeleteDialogOpen}
        header={
          <div className="">
            <h2>Delete Todo</h2>
          </div>
        }
        onOpenChange={setIsDeleteDialogOpen}
        onCancel={() => {}}
        onConfirm={onHandleConfirm}
      >
        <p className="text-xs">
          Are you sure you want to completely delete the selected todo? (This action cannot be undone)
        </p>
      </DoubleConfirm>
      <ContextMenu>
        <ContextMenuTrigger>
          <TodoTable
            className="overflow-x-auto lg:overflow-visible"
            items={data}
            workspaceId={workspaceId}
            isLoading={isLoading}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => onRefetch()}>Refresh Data</ContextMenuItem>
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
      <ActionToast
        size="md"
        actions={[
          {
            children: 'De-select',
            variant: 'faded',
            onClick: () => setSelectedKeys(new Set()),
            color: 'secondary',
            startContent: <Icon name="tabler/circle-x-filled" />,
          },
          {
            children: 'Delete',
            variant: 'faded',
            onClick: () => onDeleteTodos(),
            color: 'danger',
            startContent: <Icon name="tabler/trash-outline" />,
          },
          {
            children: 'Restore',
            variant: 'faded',
            onClick: () => restoreTodos(),
            color: 'success',
            startContent: <Icon name="tabler/recycle" />,
          },
        ]}
        isOpen={isActionToastOpen}
        message={<TableActionToast />}
        onOpenChange={() => {}}
      />
    </div>
  );
}

export default TrashMainSection;
