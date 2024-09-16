'use client';

import useGetTodo from '@/app/(main)/hooks/useGetTodo';
import LoadingTable from '@/app/components/LoadingTable';
import { useTableControl } from '@/app/components/useTableControl';
import { getDueDateLabel } from '@/misc/table.mixin';
import { Todo } from '@models/todo';
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableColumnProps,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React from 'react';

type ToDoTableProps = {
  workspaceId: string;
};
const statusColorMap: Record<Todo['status'], 'primary' | 'success' | 'warning' | 'danger'> = {
  done: 'success',
  'in-progress': 'warning',
  todo: 'primary',
};
function TodoTable({ workspaceId }: ToDoTableProps) {
  const { data: items, isLoading } = useGetTodo(workspaceId);
  const { sortDescriptor, addToSelection, selectedKeys, setSortDescriptor, setSelectedKeys } = useTableControl();
  const sortedItems = React.useMemo(() => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column!.toString()];
      const second = b[sortDescriptor.column!.toString()];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const headerColumns = React.useMemo<
    {
      uid: keyof Todo;
      name: string;
      sortable?: boolean;
      width?: TableColumnProps<Todo>['width'];
      minWidth?: TableColumnProps<Todo>['minWidth'];
      maxWidth?: TableColumnProps<Todo>['maxWidth'];
    }[]
  >(
    () => [
      { uid: 'id', name: '', sortable: false, width: 100 },
      { uid: 'title', name: 'Title', sortable: true },
      { uid: 'status', name: 'Status', sortable: true, width: 120 },
      { uid: 'dueDate', name: 'Due Date', sortable: true },
      { uid: 'subTasks', name: 'Sub Tasks', sortable: false },
      { uid: 'tags', name: 'Tags', sortable: false },
    ],
    []
  );
  const renderCell = React.useCallback((item: Todo, columnKey: keyof Todo) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'id': {
        return <span className="text-default-300">[{item.id.toUpperCase()}]</span>;
      }
      case 'title':
        return <span>{item.title}</span>;
      case 'status':
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[item.status]}
            size="sm"
            variant="dot"
          >
            {item.status}
          </Chip>
        );
      case 'dueDate':
        return <span> {getDueDateLabel(item)} </span>;
      case 'subTasks':
        return <span> {item.subTasks.length} </span>;
      case 'tags':
        // fist 3 tags
        const tags = item.tags.slice(0, 1);
        return (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Chip
                key={tag}
                className="capitalize border-none gap-1 text-default-600"
                color="primary"
                size="sm"
                variant="faded"
                radius="sm"
              >
                {tag}
              </Chip>
            ))}
            {item.tags.length > 1 && (
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="primary"
                size="sm"
                variant="faded"
                radius="sm"
              >
                +{item.tags.length - 1}
              </Chip>
            )}
          </div>
        );
      //   case "actions":
      //     return (
      //       <div className="relative flex justify-end items-center gap-2">
      //         <Dropdown className="bg-background border-1 border-default-200">
      //           <DropdownTrigger>
      //             <Button isIconOnly radius="full" size="sm" variant="light">
      //               <VerticalDotsIcon className="text-default-400" />
      //             </Button>
      //           </DropdownTrigger>
      //           <DropdownMenu>
      //             <DropdownItem>View</DropdownItem>
      //             <DropdownItem>Edit</DropdownItem>
      //             <DropdownItem>Delete</DropdownItem>
      //           </DropdownMenu>
      //         </Dropdown>
      //       </div>
      //     );
      default:
        return cellValue?.toString();
    }
  }, []);
  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
        'text-xs',
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      //   bottomContent={bot   tomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
      isVirtualized
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSelectionChange={(selectedKeys) => {
        setSelectedKeys(selectedKeys);
      }}
      onSortChange={(sortDescriptor) => {
        setSortDescriptor(sortDescriptor);
      }}
    >
      <TableHeader columns={headerColumns}>
        {({ uid, ...column }) => (
          <TableColumn key={uid} allowsSorting={column.sortable} {...column}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={'No users found'}
        items={sortedItems}
        isLoading={isLoading}
        loadingContent={<LoadingTable />}
      >
        {(item) => (
          <TableRow
            key={item.id}
            onMouseDown={(e) => {
              if (e.button === 2) {
                addToSelection(item.id);
              }
            }}
          >
            {(columnKey) => <TableCell>{renderCell(item, columnKey as any)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TodoTable;
