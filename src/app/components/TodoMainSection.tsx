'use client';
import TableActionToast from '@/app/(main)/components/TableActionToast';
import useAddTodo from '@/app/(main)/hooks/useAddTodo';
import useDeleteTodo from '@/app/(main)/hooks/useDeleteTodo';
import useGetTodo from '@/app/(main)/hooks/useGetTodo';
import ActionToast from '@/app/components/ActionToast';
import AddTodoPanel from '@/app/components/AddTodo';
import Breadcumbs from '@/app/components/Breadcumbs';
import useConfirm from '@/app/components/ConfirmDialog';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/app/components/ContextMenu';
import { Icon } from '@/app/components/Icons';
import TodoTable from '@/app/components/TodoTable';
import { useTableControl } from '@/app/components/useTableControl';
import { Input, Selection } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

type TodoMainSectionProps = {
  workspaceId: string;
};
function TodoMainSection({ workspaceId }: TodoMainSectionProps) {
  const { filterValue, selectedKeys, setFilterValue, setSelectedKeys } = useTableControl();
  const { confirm } = useConfirm();
  const router = useRouter();
  const isActionToastOpen = useMemo(() => {
    const isAll = selectedKeys === 'all';
    if (isAll) return true;

    return selectedKeys.size > 0;
  }, [selectedKeys]);

  const { mutate: addTodo } = useAddTodo(workspaceId);
  const { mutateAsync: deleteTodo } = useDeleteTodo(workspaceId);
  const { refetch, data } = useGetTodo(workspaceId);

  const [open, setOpen] = React.useState(false);
  const onDeleteTodos = async (selection: Selection) => {
    const isActionConfirmed = await confirm({
      title: 'Delete Todo',
      description: 'Are you sure you want to delete the selected todo?',
      confirmButton: { children: 'Delete', color: 'danger' },
      cancelButton: { children: 'Cancel' },
    });
    if (!isActionConfirmed) return;
    if (selection === 'all') {
      return;
    } else {
      const ids = Array.from(selection);
      const promies = ids.map((id) => deleteTodo(id.toString()));
      Promise.all(promies);
    }
  };
  const editTodo = useMemo(() => {
    if (selectedKeys === 'all' || selectedKeys.size !== 1) return undefined;
    const id = Array.from(selectedKeys)[0];
    return data?.find((todo) => todo.id === id);
  }, [selectedKeys]);
  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };
  return (
    <div className="pt-2 max-h-screen min-w-[300px] overflow-auto space-y-4 relative">
      <Breadcumbs
        className="px-4"
        items={[
          {
            label: 'Home',
            href: '',
            disabled: true,
          },
          {
            label: 'Todo',
            href: '/',
          },
        ]}
      />
      <nav className="sticky top-0 z-[9] px-4 space-y-3">
        <div className="flex flex-col gap-4 bg-default-100 bg-opacity-50 border border-default-200 rounded-medium p-1 backdrop-blur-lg">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              classNames={{
                base: 'w-1/4 sm:max-w-[44%]',
                inputWrapper: 'border-1',
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={<Icon name="tabler/search-outline" className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => onSearchChange('')}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <AddTodoPanel onSubmit={addTodo} open={open} setOpen={setOpen} defaultValues={editTodo} />
            </div>
          </div>
        </div>
      </nav>
      <ContextMenu>
        <ContextMenuTrigger>
          <TodoTable workspaceId={workspaceId} />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => refetch()}>Refresh Data</ContextMenuItem>
          <ContextMenuItem onClick={() => setOpen(true)} endContent={<Icon name="tabler/pencil-outline" size="sm" />}>
            Edit
          </ContextMenuItem>
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
        actions={[
          selectedKeys !== 'all' && selectedKeys.size > 1
            ? {
                children: 'De-select',
                variant: 'faded',
                onClick: () => setSelectedKeys(new Set()),
                color: 'secondary',
                startContent: <Icon name="tabler/circle-x-filled" />,
              }
            : {
                children: 'Edit',
                variant: 'faded',
                onClick: () => setOpen(true),
                color: 'primary',
                startContent: <Icon name="tabler/pencil-outline" />,
              },
          {
            children: 'Delete',
            variant: 'faded',
            onClick: () => onDeleteTodos(selectedKeys),
            color: 'danger',
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
