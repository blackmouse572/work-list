"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  BreadcrumbsProps,
} from "@nextui-org/react";
import MobileNav from "./MobileNav";

type BreadcumbsProps = {
  items: {
    label: string;
    href: string;
    disabled?: boolean;
  }[];
} & BreadcrumbsProps;
function Breadcumbs({ items, className, ...props }: BreadcumbsProps) {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumbs
        size="sm"
        separator="/"
        className={className}
        classNames={{
          separator: "text-default-50",
        }}
        {...props}
      >
        {items.map((item, index) => (
          <BreadcrumbItem
            key={index}
            href={item.href}
            isDisabled={item.disabled}
          >
            {item.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <div className="flex sm:hidden gap-2 px-4">
        <MobileNav />
      </div>
    </div>
  );
}

export default Breadcumbs;
