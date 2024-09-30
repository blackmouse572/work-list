"use client";
import { Icon } from "@/app/components/Icons";
import { Tab, Tabs } from "@nextui-org/tabs";
const items = [
  {
    key: "light",
    icon: "tabler/sun-outline",
    color: "warning",
  },
  {
    key: "system",
    icon: "tabler/users-outline",
    color: "default",
  },
  {
    key: "dark",
    icon: "tabler/moon-outline",
    color: "secondary",
  },
];
function ThemeSwitcher() {
  return (
    <Tabs items={items} size="sm" radius="full">
      {(item) => (
        <Tab
          key={item.key}
          title={
            <Icon
              className="w-4 h-4"
              name={item.icon as A}
              color={item.color as A}
            />
          }
        ></Tab>
      )}
    </Tabs>
  );
}

export default ThemeSwitcher;
