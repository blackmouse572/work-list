import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Select,
  SelectItem,
  Divider,
  Chip,
  DateRangePicker,
  Checkbox,
} from "@nextui-org/react";
import { Icon } from "./Icons";
import { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Form, FormField } from "./Form";
import {
  priorityColorMap,
  priorityIconMap,
  statusColorMap,
} from "@/misc/user.mixin";
import { Todo } from "@models/todo";
import { parseDate } from "@internationalized/date";
import { format } from "date-fns";
export const FilterTodoTableSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "todo", "in-progress", "done"]).default("all"),
  priority: z.enum(["all", "low", "medium", "high"]).default("all"),
  dueDateStart: z.date().optional(),
  dueDateEnd: z.date().optional(),
  includeNoDueDate: z.boolean().optional(),
});
export type FilterTodoTableSchema = z.infer<typeof FilterTodoTableSchema>;
const DEFAULT_VALUES: FilterTodoTableSchema = {
  status: "all",
  priority: "all",
  dueDateStart: undefined,
  dueDateEnd: undefined,
  includeNoDueDate: false,
};
function FilterTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();
  const defaultValues = useMemo(() => {
    const status = searchParams.get("status") ?? "all";
    const priority = searchParams.get("priority") ?? "all";
    const dueDateStart = searchParams.get("dueDateStart");
    const dueDateEnd = searchParams.get("dueDateEnd");

    const v = {
      status,
      priority,
      dueDateStart: dueDateStart ? new Date(dueDateStart) : undefined,
      dueDateEnd: dueDateEnd ? new Date(dueDateEnd) : undefined,
    };

    return FilterTodoTableSchema.parse(v);
  }, [searchParams]);

  const onSubmit = (data: FilterTodoTableSchema) => {
    const params = new URLSearchParams();
    params.set("status", data.status);
    params.set("priority", data.priority);
    if (data.dueDateStart) {
      params.set("dueDateStart", data.dueDateStart.toISOString());
    }
    if (data.dueDateEnd) {
      params.set("dueDateEnd", data.dueDateEnd.toISOString());
    }
    router.push(pathname + "?" + params.toString());
  };

  const form = useForm<FilterTodoTableSchema>({
    resolver: zodResolver(FilterTodoTableSchema),
    defaultValues,
  });
  return (
    <Popover
      shadow="lg"
      backdrop="opaque"
      placement="bottom"
      triggerType="dialog"
      shouldCloseOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          size="sm"
          variant="light"
          endContent={<Icon name="tabler/filter-outline" />}
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 w-[250px]">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Dimensions
            </p>
            <Divider className="mb-8 mt-2" />
            <Form {...form}>
              <form
                id="filter"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      size="sm"
                      selectedKeys={[field.value]}
                      onSelectionChange={(e) => field.onChange(e.anchorKey)}
                      placeholder="Select status"
                      label="Status"
                      className="w-full"
                      labelPlacement="outside"
                      renderValue={(value) =>
                        value.map((v) => (
                          <Chip
                            key={v.key}
                            className="capitalize border-none gap-1 text-default-600"
                            color={
                              statusColorMap[
                                v.key as "all" | "todo" | "in-progress" | "done"
                              ]
                            }
                            variant="dot"
                          >
                            {v.textValue}
                          </Chip>
                        ))
                      }
                      variant="bordered"
                    >
                      <SelectItem key="all" textValue="All">
                        <Chip
                          className="capitalize border-none gap-1 text-default-600"
                          color={statusColorMap["all"]}
                          variant="dot"
                        >
                          All
                        </Chip>
                      </SelectItem>
                      <SelectItem key="todo" textValue="To do">
                        <Chip
                          className="capitalize border-none gap-1 text-default-600"
                          color={statusColorMap["todo"]}
                          variant="dot"
                        >
                          Todo
                        </Chip>
                      </SelectItem>
                      <SelectItem key="in-progress" textValue="In progress">
                        <Chip
                          className="capitalize border-none gap-1 text-default-600"
                          color={statusColorMap["in-progress"]}
                          variant="dot"
                        >
                          In progress
                        </Chip>
                      </SelectItem>
                      <SelectItem key="done" textValue="Done">
                        <Chip
                          className="capitalize border-none gap-1 text-default-600"
                          color={statusColorMap["done"]}
                          variant="dot"
                        >
                          Done
                        </Chip>
                      </SelectItem>
                    </Select>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <Select
                      size="sm"
                      placeholder="Select priority"
                      variant="bordered"
                      label="Priority"
                      labelPlacement="outside"
                      selectedKeys={[field.value]}
                      className="w-full"
                      onSelectionChange={(e) => field.onChange(e.anchorKey)}
                      renderValue={(value) =>
                        value.map((v) => (
                          <Chip
                            key={v.key}
                            className="capitalize border-none gap-1 text-default-600"
                            color={
                              priorityColorMap[
                                v.key as "all" | "low" | "medium" | "high"
                              ]
                            }
                            variant="dot"
                            startContent={
                              <Icon
                                color={
                                  priorityColorMap[
                                    v.key as "low" | "medium" | "high" | "all"
                                  ]
                                }
                                name={
                                  priorityIconMap[
                                    v.key as "low" | "medium" | "high" | "all"
                                  ]
                                }
                              />
                            }
                          >
                            {v.textValue}
                          </Chip>
                        ))
                      }
                    >
                      {["all", "low", "medium", "high"].map((key) => (
                        <SelectItem
                          key={key}
                          textValue={key}
                          startContent={
                            <Icon
                              color={priorityColorMap[key as Todo["priority"]]}
                              name={priorityIconMap[key as Todo["priority"]]}
                            />
                          }
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDateStart"
                  render={({ field: startField }) => (
                    <FormField
                      control={form.control}
                      name="dueDateEnd"
                      render={({ field: endField }) => (
                        <DateRangePicker
                          size="sm"
                          label="Due date"
                          labelPlacement="outside"
                          value={
                            startField.value && endField.value
                              ? {
                                  end: parseDate(
                                    format(endField.value, "yyyy-MM-dd")
                                  ),
                                  start: parseDate(
                                    format(startField.value, "yyyy-MM-dd")
                                  ),
                                }
                              : undefined
                          }
                          onChange={(value) => {
                            const startDate = value?.start?.toDate("UTC");
                            const endDate = value?.end?.toDate("UTC");
                            startField.onChange(startDate);
                            endField.onChange(endDate);
                          }}
                        />
                      )}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeNoDueDate"
                  render={({ field: { value, ...field } }) => (
                    <Checkbox size="sm" {...field} checked={value}>
                      <span className="text-sm">Include no due date</span>
                    </Checkbox>
                  )}
                />
                <div className="flex justify-between">
                  <Button
                    size="sm"
                    variant="light"
                    color="default"
                    onClick={() => form.reset(DEFAULT_VALUES)}
                  >
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    type="submit"
                    form="filter"
                    color="primary"
                  >
                    Apply
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default FilterTable;
