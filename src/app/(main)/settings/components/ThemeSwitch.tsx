"use client";
import { Icon, IconName } from "@/app/components/Icons";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useTheme } from "next-themes";
import { useState } from "react";
type Item = {
  key: string;
  icon: IconName;
  selectedIcon: IconName;
  color: string;
};
const items: Item[] = [
  {
    key: "light",
    icon: "tabler/sun-outline",
    selectedIcon: "tabler/sun-filled",
    color: "warning",
  },
  {
    key: "system",
    icon: "tabler/device-desktop-outline",
    selectedIcon: "tabler/device-desktop-filled",
    color: "default",
  },
  {
    key: "dark",
    icon: "tabler/moon-outline",
    selectedIcon: "tabler/moon-filled",
    color: "secondary",
  },
];
function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);
  const onChange = (key: string) => {
    console.log(key);
    setTheme(key);
    setCurrentTheme(key);
  };
  return (
    <Tabs
      items={items}
      size="sm"
      radius="full"
      defaultSelectedKey={theme}
      selectedKey={currentTheme}
      onSelectionChange={(k) => onChange(k.toString())}
    >
      {(item) => (
        <Tab
          key={item.key}
          title={
            <Icon
              className="w-4 h-4"
              name={currentTheme === item.key ? item.selectedIcon : item.icon}
              color={item.color as A}
            />
          }
        ></Tab>
      )}
    </Tabs>
  );
}

export default ThemeSwitcher;
