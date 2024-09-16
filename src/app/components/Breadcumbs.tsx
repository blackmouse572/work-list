'use client';
import { BreadcrumbItem, Breadcrumbs, BreadcrumbsProps } from '@nextui-org/react';

type BreadcumbsProps = {
  items: {
    label: string;
    href: string;
    disabled?: boolean;
  }[];
} & BreadcrumbsProps;
function Breadcumbs({ items, className, ...props }: BreadcumbsProps) {
  return (
    <Breadcrumbs
      size="sm"
      separator="/"
      className={className}
      classNames={{
        separator: 'text-default-50',
      }}
      {...props}
    >
      {items.map((item, index) => (
        <BreadcrumbItem key={index} href={item.href} isDisabled={item.disabled}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

export default Breadcumbs;
