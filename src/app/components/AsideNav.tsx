"use client";
import workspaceService from "@/app/(main)/actions/workspace.local.action";
import useGetWorkspaces from "@/app/(main)/hooks/useGetWorkspace";
import { DEFAULT_WORKSPACE_ID } from "@/app/(main)/todo/constant";
import { Icon, IconName } from "@/app/components/Icons";
import NewWorkspace from "@/app/components/NewWorkspace";
import { Workspace } from "@models/workspace";
import { Avatar } from "@nextui-org/avatar";
import {
  Button,
  cn,
  Input,
  Kbd,
  Listbox,
  ListboxItem,
  ListboxSection,
  Select,
  SelectItem,
  SharedSelection,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

type AsideNavProps = React.HTMLAttributes<HTMLElement> & {
  workspaceId?: string;
};
type MenuItem = {
  key?: string;
  label: string;
  icon: IconName;
  href: string;
  items?: MenuItem[];
};
const MENU_ITEMS: MenuItem[] = [
  {
    icon: "tabler/grid-4x4-outline",
    label: "Task",
    href: "/",
  },
  {
    icon: "tabler/trash-outline",
    label: "Trash",
    href: "/trash",
  },
  {
    icon: "tabler/settings-2-outline",
    label: "Settings",
    href: "/settings",
  },
];
function AsideNav({ className, workspaceId, ...props }: AsideNavProps) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<Workspace>();
  const [isShrink, _] = React.useState(false);
  const [isAddWorkspace, setIsAddWorkspace] = React.useState(false);

  const { data, isLoading } = useGetWorkspaces();
  const path = usePathname();

  const onSelectionChanges = (e: SharedSelection) => {
    const workspace = data?.find((w) => w.id === e.anchorKey);
    if (!workspace || workspace.id === "added") return;
    console.log({ workspace });
    setSelectedWorkspace(workspace);
    workspaceService.selectWorkspace(workspace.id);
  };
  const activeItem =
    MENU_ITEMS.find((item) => item.href === path) || MENU_ITEMS[0];
  const renderItem = (item: MenuItem) => (
    <Button
      key={item.href}
      href={item.href}
      disableRipple
      startContent={<Icon name={item.icon} />}
      color={activeItem.href === item.href ? "primary" : "default"}
      variant={activeItem.href === item.href ? "flat" : "light"}
      data-selected={activeItem.href === item.href}
      isIconOnly={isShrink}
    >
      <span className={cn(isShrink ? "hidden" : "block", "w-full text-start")}>
        {item.label}
      </span>
    </Button>
  );
  return (
    <aside
      className={cn(" space-y-8", isShrink ? "w-16" : "w-64", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        {!isShrink && (
          <div className="flex-1 flex items-center">
            <Select
              items={data}
              defaultSelectedKeys={[workspaceId ?? DEFAULT_WORKSPACE_ID]}
              selectedKeys={[selectedWorkspace?.id ?? DEFAULT_WORKSPACE_ID]}
              onSelectionChange={onSelectionChanges}
              placeholder="Select Workspace"
              size="sm"
              variant="underlined"
              isLoading={isLoading}
              isRequired
              className="[&_button]:border-none border-transparent [&_button]:after:content-none max-w-[200px]"
            >
              {
                data?.map((workspace) => (
                  <SelectItem key={workspace.id} textValue={workspace.name}>
                    <span className="text-small">{workspace.name}</span>
                  </SelectItem>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                )) as any
              }
              <SelectItem
                key={"added"}
                textValue={"New Workspace"}
                onClick={() => {
                  setIsAddWorkspace(true);
                }}
              >
                <div className="flex items-start gap-2">
                  <Icon name="tabler/circle-dashed-plus-outline" size="sm" />
                  <span className="text-small">New Workspace</span>
                </div>
              </SelectItem>
            </Select>
          </div>
        )}
        <Avatar className="aspect-square" src="" name="John Doe" size="sm" />
      </div>
      <NewWorkspace isOpen={isAddWorkspace} onOpenChange={setIsAddWorkspace} />
      <Input
        endContent={
          <Kbd className="text-xs" keys={["command"]}>
            K
          </Kbd>
        }
        placeholder="Search"
        size="sm"
      />
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-default-500">Main</h4>
        {MENU_ITEMS.map((item) => renderItem(item))}
      </div>
    </aside>
  );
}

export default AsideNav;
