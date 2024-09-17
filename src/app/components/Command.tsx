"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Modal, ModalContent, ModalProps } from "@nextui-org/modal";
import { Icon } from "./Icons";
import { cn } from "@nextui-org/theme";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Kbd, KbdProps } from "@nextui-org/kbd";
import Link from "next/link";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-medium bg-content1 text-content1-foreground",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends ModalProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Modal size="lg" backdrop="blur" {...props}>
      <ModalContent className="overflow-hidden p-0 shadow-lg border border-default-200">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-content2-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
          {children}
        </Command>
      </ModalContent>
    </Modal>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center border-b border-divider px-3"
    cmdk-input-wrapper=""
  >
    <Icon
      name="tabler/search-outline"
      className="mr-2 h-4 w-4 shrink-0 opacity-50"
    />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-medium bg-transparent py-3 text-sm outline-none placeholder:text-default-400 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} {...props}>
    <ScrollShadow
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className
      )}
    >
      {children}
    </ScrollShadow>
  </CommandPrimitive.List>
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-default-400 [&[_cmdk-group-items]]:space-y-2",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-divider my-2", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    href?: string;
  }
>(({ className, children, startContent, href, endContent, ...props }, ref) => {
  const content = (
    <>
      {startContent && (
        <span className="flex-shrink-0 mr-2">{startContent}</span>
      )}
      {children}
      {endContent && (
        <span className="flex-shrink-0 ml-auto">{endContent}</span>
      )}
    </>
  );
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-small px-2.5 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-default data-[selected=true]:text-default-foreground data-[disabled=true]:opacity-50 max-w-full",
        className
      )}
      asChild={!!href}
      {...props}
    >
      {href ? <Link href={href}>{content}</Link> : content}
    </CommandPrimitive.Item>
  );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: KbdProps) => {
  return (
    <Kbd
      classNames={{
        base: "text-xs",
      }}
      className={cn("text-xs ml-auto tracking-widest", className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
