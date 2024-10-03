'use client';

import LoadingTable from '@/app/components/LoadingTable';
import { useTableControl } from '@/app/components/useTableControl';
import { getDueDateColor, getDueDateLabel } from '@/misc/table.mixin';
import { priorityColorMap, priorityIconMap, statusColorMap } from '@/misc/user.mixin';
import { Todo } from '@models/todo';
import {
  Chip,
  cn,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableColumnProps,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import React from 'react';
import EmptyToDoTable from './EmptyTodoTable';
import { Icon } from './Icons';

type ToDoTableProps = {
  workspaceId: string;
  onCreateTask?: () => void;
  items?: Todo[];
  isLoading: boolean;
  className?: string;
};
function TodoTable({ isLoading, items, className, onCreateTask }: ToDoTableProps) {
  const { sortDescriptor, addToSelection, selectedKeys, setSortDescriptor, setSelectedKeys } = useTableControl();
  const sortedItems = React.useMemo(() => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Todo];
      const second = b[sortDescriptor.column as keyof Todo];
      if (!first || !second) return 0;
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
        return (
          <>
            <Icon name={priorityIconMap[item.priority]} color={priorityColorMap[item.priority]} />
            <span className="text-default-300 ml-2">[{item.id.toUpperCase()}]</span>
          </>
        );
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
        return <span className={`text-${getDueDateColor(item)} font-medium`}>{getDueDateLabel(item)} </span>;
      case 'subTasks':
        return <span> {item.subTasks?.length} </span>;
      case 'tags':
        // fist 3 tags
        return (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
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
            {item.tags.length > 2 && (
              <Tooltip
                content={
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(2, item.tags.length).map((tag) => (
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
                  </div>
                }
              >
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color="primary"
                  size="sm"
                  variant="faded"
                  radius="sm"
                >
                  +{item.tags.length - 2}
                </Chip>
              </Tooltip>
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
      base: cn(['max-h-screen', 'max-w-[100vw]'], className),
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
    [className]
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
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
          <TableColumn key={uid} allowsSorting={column.sortable} allowsResizing {...column}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={<EmptyToDoTable onCreateTask={onCreateTask} />}
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
            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Todo)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TodoTable;
