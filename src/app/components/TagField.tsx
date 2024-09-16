import { Chip } from "@nextui-org/chip";
import { AnimatePresence, motion, Variant } from "framer-motion";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
type TagsForm = {
  tags: string[];
};
const variants: Record<string, Variant> = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, filter: "blur(0px)", x: 0 },
  exit: { opacity: 0, filter: "blur(4px)" },
};
function TagsField() {
  const { control } = useFormContext<TagsForm>();
  const tags = useWatch({ control, name: "tags" });
  const [value, setValue] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const { append, remove } = useFieldArray<TagsForm>({
    control,
    // @ts-expect-error - The name is required object instead of string
    name: "tags",
  });

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim() !== "") {
        const hasValue = new Set(tags).has(value);
        if (hasValue) {
          setError("Tag already exists");
          return;
        }
        // @ts-expect-error - The name is required object instead of string
        append(value);
        setValue("");
        setError(null);
      }
    }
  };

  return (
    <div className="space-y-2 my-6">
      <motion.div
        layout="position"
        className="flex flex-wrap gap-1 w-fit h-fit"
      >
        <AnimatePresence>
          {tags?.map((tag, index) => (
            <motion.span
              key={tag}
              layoutId={tag}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Chip
                onClose={() => remove(index)}
                className="capitalize"
                color="primary"
                size="sm"
                variant="faded"
                radius="sm"
              >
                {tag}
              </Chip>
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
      <Input
        placeholder="Add tags"
        onSubmit={onEnter}
        size={"sm"}
        onClear={() => {
          setValue("");
          setError(null);
        }}
        onKeyDown={onEnter}
        errorMessage={error}
        isClearable
        isInvalid={!!error}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default TagsField;
