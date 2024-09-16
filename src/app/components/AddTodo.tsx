import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/Drawer';
import { Form, FormField, FormItem } from '@/app/components/Form';
import { Icon } from '@/app/components/Icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseDate } from '@internationalized/date';
import { Button } from '@nextui-org/button';
import { DateInput, Input, Snippet, Textarea } from '@nextui-org/react';
import { formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const AddTodoSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  tag: z.string(),
});
export type AddTodoSchema = z.infer<typeof AddTodoSchema>;

type AddTodoPanelProps = {
  onSubmit: (data: z.infer<typeof AddTodoSchema>) => void;
  defaultValues?: Partial<z.infer<typeof AddTodoSchema>>;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

function AddTodoPanel({ onSubmit, defaultValues, open, setOpen }: AddTodoPanelProps) {
  const form = useForm<z.infer<typeof AddTodoSchema>>({
    resolver: zodResolver(AddTodoSchema),
    defaultValues,
  });
  console.log({ defaultValues });

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
                size: 'sm',
              }}
              classNames={{
                base: 'border-none',
                copyButton: 'min-w-5 h-5 w-5',
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
    <Drawer open={open} onClose={() => setOpen?.(false)} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button endContent={<Icon name="tabler/plus-outline" />} size="sm">
          Add New
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {renderHeaderByEdit()}
        <Form {...form}>
          <form
            id="todo"
            onSubmit={form.handleSubmit(handleSubmit, (errors) => console.error(errors))}
            className="px-4 space-y-4 mt-6"
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
                const date = value && parseDate(formatDate(value, 'yyyy-MM-dd'));
                console.log(date);
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
                        defaultValues?.dueDate && parseDate(formatDate(defaultValues.dueDate, 'yyyy-MM-dd'))
                      }
                      onChange={(date) =>
                        date && field.onChange(new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0))
                      }
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="tag"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Input
                    isRequired
                    isInvalid={!!fieldState.error}
                    required
                    size="sm"
                    labelPlacement="outside"
                    label="Tag"
                    errorMessage={fieldState.error?.message}
                    {...field}
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DrawerFooter className="justify-end">
          <Button form="todo" type="submit" color="primary">
            {isEdit ? 'Save' : 'Add'}
          </Button>
          <DrawerClose asChild>
            <Button variant="bordered">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddTodoPanel;
