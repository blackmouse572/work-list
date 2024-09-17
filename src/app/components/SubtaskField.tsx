import { Todo } from "@models/todo";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { motion } from "framer-motion";
import { Variant } from "framer-motion";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

type SubTaskForm = {
  subTasks: Todo["subTasks"];
};
const variants: Record<string, Variant> = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  exit: { opacity: 0, filter: "blur(4px)" },
};
function SubTaskField() {
  const { control } = useFormContext<SubTaskForm>();
  const subtasks = useWatch({ control, name: "subTasks" });
  const [value, setValue] = React.useState<string>("");
  const { append, remove } = useFieldArray<SubTaskForm>({
    control,
    name: "subTasks",
  });

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim() !== "") {
        append({
          id: Math.random().toString(36).substring(7),
          title: value,
          status: "todo",
          priority: "low",
        });
        setValue("");
      }
    }
  };

  return (
    <div className="space-y-2 my-6">
      <ScrollShadow className="max-h-72">
        <motion.div layout="size" className="flex flex-col gap-1 w-full h-fit">
          {subtasks?.reverse().map((field, index) => (
            <motion.div
              key={field.id}
              layoutId={field.id}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Chip
                onClose={() => remove(index)}
                className="cursor-pointer border-none w-full max-w-full"
                variant="bordered"
              >
                {field.title}
              </Chip>
            </motion.div>
          ))}
        </motion.div>
      </ScrollShadow>
      <Input
        onKeyDown={onEnter}
        placeholder="Add a subtask"
        value={value}
        size="sm"
        onValueChange={(e) => setValue(e)}
      />
    </div>
  );
}

export default SubTaskField;
