import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/Drawer";
import { Form, FormField, FormItem } from "@/app/components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import {
  DateInput,
  Input,
  Snippet,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { formatDate } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TagsField from "./TagField";
import { useEffect } from "react";
import { Icon } from "./Icons";
import { priorityColorMap, priorityIconMap } from "@/misc/user.mixin";
import SubTaskField from "./SubtaskField";

export const AddTodoSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  tags: z.array(z.string()),
  status: z.enum(["todo", "in-progress", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  subTasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      status: z.enum(["todo", "in-progress", "done"]).default("todo"),
      priority: z.enum(["low", "medium", "high"]).default("low"),
    })
  ),
});
export type AddTodoSchema = z.infer<typeof AddTodoSchema>;
const DEFAULT_TODO: AddTodoSchema = {
  title: "",
  description: "",
  dueDate: new Date(),
  tags: [],
  status: "todo",
  priority: "low",
  subTasks: [],
};

type AddTodoPanelProps = {
  onSubmit: (data: z.infer<typeof AddTodoSchema>) => void;
  defaultValues?: Partial<z.infer<typeof AddTodoSchema>>;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
};

function AddTodoPanel({
  onSubmit,
  defaultValues,
  open,
  setOpen,
  trigger,
}: AddTodoPanelProps) {
  const form = useForm<z.infer<typeof AddTodoSchema>>({
    resolver: zodResolver(AddTodoSchema),
    defaultValues,
  });

  useEffect(() => {
    console.log("defaultValues", defaultValues);
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const { control } = form;
  const handleSubmit = (data: AddTodoSchema) => {
    onSubmit(data);
    setOpen?.(false);
  };
  const isEdit = !!defaultValues?.id;
  const renderHeaderByEdit = () => {
    if (isEdit) {
      return (
        <DrawerHeader>
          <DrawerTitle>Edit Todo</DrawerTitle>
          <DrawerDescription className="relative">
            <Snippet
              size="sm"
              variant="bordered"
              symbol=""
              className="w-full"
              codeString={`/todo/${defaultValues.id}`}
              copyButtonProps={{
                size: "sm",
              }}
              classNames={{
                base: "border-none",
                copyButton: "min-w-5 h-5 w-5",
              }}
            >
              <span>ID: {defaultValues?.id}</span>
            </Snippet>
          </DrawerDescription>
        </DrawerHeader>
      );
    }
    return (
      <DrawerHeader>
        <DrawerTitle>Add New Todo</DrawerTitle>
        <DrawerDescription>Add a new todo to your list</DrawerDescription>
      </DrawerHeader>
    );
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        form.reset(DEFAULT_TODO);
      }}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="overflow-y-auto overflow-x-hidden">
        {renderHeaderByEdit()}
        <Form {...form}>
          <form
            id="todo"
            onSubmit={form.handleSubmit(handleSubmit, (errors) =>
              console.error(errors)
            )}
            className="px-4 space-y-6 mt-6 mb-4"
          >
            <FormField
              control={control}
              name="title"
              defaultValue={defaultValues?.title}
              render={({ field, fieldState }) => (
                <FormItem>
                  <Input
                    isRequired
                    size="sm"
                    isInvalid={!!fieldState.error}
                    labelPlacement="outside"
                    label="Title"
                    errorMessage={fieldState.error?.message}
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              defaultValue={defaultValues?.description}
              render={({ field, fieldState }) => (
                <FormItem>
                  <Textarea
                    size="sm"
                    labelPlacement="outside"
                    label="Description"
                    errorMessage={fieldState.error?.message}
                    isInvalid={!!fieldState.error}
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="dueDate"
              render={({ field: { value, ...field }, fieldState }) => {
                const date =
                  value && parseDate(formatDate(value, "yyyy-MM-dd"));
                return (
                  <FormItem>
                    <DateInput
                      size="sm"
                      labelPlacement="outside"
                      label="Due date"
                      value={date}
                      errorMessage={fieldState.error?.message}
                      {...field}
                      isInvalid={!!fieldState.error}
                      defaultValue={
                        defaultValues?.dueDate &&
                        parseDate(
                          formatDate(defaultValues.dueDate, "yyyy-MM-dd")
                        )
                      }
                      onChange={(date) =>
                        date &&
                        field.onChange(
                          new Date(
                            date.year,
                            date.month - 1,
                            date.day,
                            0,
                            0,
                            0,
                            0
                          )
                        )
                      }
                    />
                  </FormItem>
                );
              }}
            />
            <TagsField />
            <FormField
              control={control}
              name="status"
              render={({ field: { value, ...field } }) => {
                return (
                  <Tabs
                    color={
                      value === "todo"
                        ? "default"
                        : value === "in-progress"
                        ? "primary"
                        : "success"
                    }
                    size="sm"
                    classNames={{
                      base: "w-full",
                      tabList: "w-full",
                    }}
                    selectedKey={value}
                    onSelectionChange={(e) => field.onChange(e)}
                  >
                    <Tab key="todo" title="Todo" />
                    <Tab key="in-progress" title="In progress" />
                    <Tab key="done" title="Done" />
                  </Tabs>
                );
              }}
            />
            <FormField
              control={control}
              name="priority"
              render={({ field: { value, ...field } }) => {
                return (
                  <Tabs
                    size="sm"
                    classNames={{
                      base: "w-full",
                      tabList: "w-full",
                    }}
                    selectedKey={value}
                    onSelectionChange={(e) => field.onChange(e)}
                  >
                    <Tab
                      key="low"
                      title={
                        <div className="flex items-center space-x-1 gap-1">
                          <Icon
                            color={priorityColorMap["low"]}
                            name={priorityIconMap["low"]}
                          />
                          Low
                        </div>
                      }
                    />
                    <Tab
                      key="medium"
                      title={
                        <div className="flex items-center space-x-1 gap-1">
                          <Icon
                            color={priorityColorMap["medium"]}
                            name={priorityIconMap["medium"]}
                          />
                          Medium
                        </div>
                      }
                    />
                    <Tab
                      key="high"
                      title={
                        <div className="flex items-center space-x-1 gap-1">
                          <Icon
                            color={priorityColorMap["high"]}
                            name={priorityIconMap["high"]}
                          />
                          High
                        </div>
                      }
                    />
                  </Tabs>
                );
              }}
            />
            <SubTaskField />
          </form>
        </Form>
        <DrawerFooter className="justify-between sticky bottom-0 bg-content1 border-divider border-t">
          <div className="space-x-2">
            <DrawerClose asChild>
              <Button
                variant="bordered"
                type="reset"
                form="todo"
                onClick={() => {
                  form.reset(DEFAULT_TODO);
                }}
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button form="todo" type="submit" color="primary">
              {isEdit ? "Save" : "Add"}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddTodoPanel;
