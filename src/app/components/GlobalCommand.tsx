import React, { useCallback, useMemo } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./Command";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import useGetWorkspaces from "../(main)/hooks/useGetWorkspace";
import { Icon } from "./Icons";
import { useRouter } from "next/navigation";
import { saveWorkspaceId } from "../(main)/actions/workspace.action";
import { toast } from "sonner";

function GlobalCommand({ workspaceId }: { workspaceId: string }) {
  const [open, setOpen] = React.useState(false);
  const { data: workspaces, isLoading: isLoadingWorkspaces } =
    useGetWorkspaces();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ctrl + K
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const handleShortcuts = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      if (e.ctrlKey && e.key === "a") {
        router.push("/about");
      }
      if (e.ctrlKey && e.key === "s") {
        router.push("/settings");
      }
      if (e.ctrlKey && e.key === "h") {
        router.push("/");
      }
    };
    document.addEventListener("keydown", handleShortcuts);

    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [open, router]);
  const onSelect = useCallback(
    async (e: Record<string, A>) => {
      console.log("e", e);
      if (e.href) {
        router.push(e.href);
        setOpen(false);
      } else if (e.workspaceId) {
        await saveWorkspaceId(e.workspaceId);
        setOpen(false);
        toast.success(`Workspace changed to ${e.name}`);
      }
    },
    [router]
  );

  const renderBody = useMemo(() => {
    if (isLoadingWorkspaces) {
      return <CommandEmpty>Loading...</CommandEmpty>;
    }

    if (!workspaces) {
      return <CommandEmpty>No workspace found</CommandEmpty>;
    }

    return (
      <CommandGroup heading={"Workspaces"}>
        {workspaces.map((workspace) => {
          return (
            <CommandItem
              key={workspace.id}
              value={workspace.name}
              onSelect={() =>
                onSelect({ workspaceId: workspace.id, name: workspace.name })
              }
              endContent={
                workspace.id === workspaceId ? (
                  <Icon name="tabler/star-filled" color="secondary" />
                ) : undefined
              }
            >
              {workspace.name}
            </CommandItem>
          );
        })}
      </CommandGroup>
    );
  }, [isLoadingWorkspaces, onSelect, workspaceId, workspaces]);

  const commandItems = useMemo(
    () => [
      {
        href: "/about",
        startContent: <Icon name="tabler/help-circle-filled" />,
        endContent: <CommandShortcut keys={["command"]}>A</CommandShortcut>,
        children: "Help",
      },
      {
        href: "/settings",
        startContent: <Icon name={"tabler/settings-filled"} />,
        endContent: <CommandShortcut keys={["command"]}>S</CommandShortcut>,
        children: "Settings",
      },
      {
        href: "/trash",
        startContent: <Icon name={"tabler/trash-filled"} />,
        children: "Trash",
      },
      {
        href: "/",
        startContent: <Icon name={"tabler/layout-grid-filled"} />,
        endContent: <CommandShortcut keys={["command"]}>H</CommandShortcut>,
        children: "Tasks",
      },
    ],
    []
  );
  const renderCommand = useMemo(() => {
    return (
      <CommandGroup heading={"Commands"}>
        {commandItems.map((item) => {
          return (
            <CommandItem
              key={item.children}
              value={item.children}
              href={item.href}
              startContent={item.startContent}
              endContent={item.endContent}
              onSelect={() => onSelect(item)}
            >
              {item.children}
            </CommandItem>
          );
        })}
      </CommandGroup>
    );
  }, [commandItems, onSelect]);
  return (
    <>
      <Input
        ref={inputRef}
        endContent={
          <Kbd className="text-xs" keys={["command"]}>
            K
          </Kbd>
        }
        onClick={() => setOpen(true)}
        onFocus={() => {
          inputRef.current?.blur();
        }}
        placeholder="Search"
        size="sm"
        classNames={{
          mainWrapper: "cursor-pointer",
        }}
        className="cursor-pointer"
      />
      <CommandDialog isOpen={open} onOpenChange={setOpen} onSelect={onSelect}>
        <CommandInput autoFocus placeholder="Type a command or search..." />
        <CommandList>
          {renderBody}
          <CommandSeparator />
          {renderCommand}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default GlobalCommand;
