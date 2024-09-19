import { Icon } from "@/app/components/Icons";
import {
  priorityIconMap,
  priorityColorMap,
  priorityLabelMap,
  statusColorMap,
} from "@/misc/user.mixin";
import { SubTask, Todo } from "@models/todo";
import { Chip } from "@nextui-org/chip";
import { Select, SelectItem } from "@nextui-org/select";

type SubTaskListProps = {
  data: SubTask[];
  onUpdateSubTaskStatus: (subTaskId: string, status: Todo["status"]) => void;
  onUpdateSubTaskPriority: (
    subTaskId: string,
    priority: Todo["priority"]
  ) => void;
};
function SubTaskList({
  data: subTasks,
  onUpdateSubTaskPriority,
  onUpdateSubTaskStatus,
}: SubTaskListProps) {
  return (
    <div className="space-y-8">
      {subTasks.length === 0 ? (
        <p className="h-32 flex items-center justify-center opacity-20">
          No sub tasks yet
        </p>
      ) : (
        subTasks.map((subTask) => (
          <div
            key={subTask.id}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <Select
                className="w-fit"
                size="sm"
                classNames={{
                  trigger: "border-none",
                  popoverContent: "w-[200px]",
                  mainWrapper: "w-[85px]",
                }}
                startContent={
                  <Icon
                    className="flex-shrink-0"
                    name="tabler/chevron-down-outline"
                  />
                }
                selectionMode="single"
                selectorIcon={<></>}
                onSelectionChange={(e) =>
                  onUpdateSubTaskPriority(
                    subTask.id,
                    e.anchorKey as Todo["priority"]
                  )
                }
                defaultSelectedKeys={[subTask.priority]}
                variant="bordered"
                renderValue={(item) => {
                  if (!item[0]) return <span></span>;
                  return (
                    <Icon
                      className="flex-shrink-0"
                      name={priorityIconMap[item[0].key as Todo["priority"]]}
                      color={priorityColorMap[item[0].key as Todo["priority"]]}
                    />
                  );
                }}
              >
                {["low", "medium", "high"].map((priority) => (
                  <SelectItem
                    key={priority}
                    textValue={priorityLabelMap[priority as Todo["priority"]]}
                  >
                    <Icon
                      color={priorityColorMap[priority as Todo["priority"]]}
                      name={priorityIconMap[priority as Todo["priority"]]}
                      className="mr-2"
                    />
                    {priorityLabelMap[priority as Todo["priority"]]}
                  </SelectItem>
                ))}
                {/* <SelectItem key="low" textValue="To do">
                            <Icon name={priorityIconMap['low']}>
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
                          </SelectItem> */}
              </Select>
              <span className="ml-2 text-sm">{subTask.title}</span>
            </div>
            <Select
              size="sm"
              // selectedKeys={[field.value]}
              onSelectionChange={(e) =>
                onUpdateSubTaskStatus(subTask.id, e.anchorKey as Todo["status"])
              }
              placeholder="Select status"
              className="w-[150px]"
              defaultSelectedKeys={[subTask.status]}
              labelPlacement="outside-left"
              renderValue={(value) =>
                value.map((v) => (
                  <Chip
                    key={v.key}
                    className="capitalize border-none gap-1 text-default-600"
                    color={
                      statusColorMap[v.key as "todo" | "in-progress" | "done"]
                    }
                    variant="dot"
                  >
                    {v.textValue}
                  </Chip>
                ))
              }
              variant="bordered"
            >
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
          </div>
        ))
      )}
    </div>
  );
}

export default SubTaskList;
