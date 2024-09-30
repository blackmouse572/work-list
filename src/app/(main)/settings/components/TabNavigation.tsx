"use client";

import { Tab, Tabs, TabsProps } from "@nextui-org/tabs";
import { usePathname } from "next/navigation";

export type TabNavigationItem = {
  label: string;
  href: string;
};
type TabNavigationProps = {
  items: TabNavigationItem[];
} & TabsProps;
function TabNavigation(props: TabNavigationProps) {
  const { items, ...rest } = props;
  const pathName = usePathname();

  return (
    <Tabs
      variant="underlined"
      size="sm"
      {...rest}
      selectedKey={pathName}
      aria-label="Tab navigation"
    >
      {items.map((item) => (
        <Tab key={item.href} title={item.label} href={item.href} />
      ))}
    </Tabs>
  );
}

export default TabNavigation;
