import { Button } from "@nextui-org/button";
import { Icon } from "./Icons";

type EmptyToDoTableProps = {
  onCreateTask?: () => void;
};

function EmptyToDoTable({ onCreateTask }: EmptyToDoTableProps) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <div className="w-32 h-32 mb-4">
          {/* <img src="/assets/illustration/empty.svg" alt="Empty" /> */}
          <Icon
            name="tabler/frame"
            className="w-32 mx-auto text-gray-200 dark:text-gray-700 h-32"
            size="xl"
          />
        </div>
        <h2 className="text-2xl font-semibold">No task found</h2>
        <p>
          You don&apos;t have any task yet. Click the button below to create a
          new one
        </p>
        <Button
          color="primary"
          onClick={onCreateTask}
          startContent={<Icon name="tabler/plus-outline" />}
        >
          Create Task
        </Button>
      </div>
    </div>
  );
}

export default EmptyToDoTable;
