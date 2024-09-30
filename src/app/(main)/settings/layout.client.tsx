"use client";

import Breadcumbs from "@/app/components/Breadcumbs";
import TabNavigation from "./components/TabNavigation";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const navigationItems = {
  "/settings": { label: "General", href: "/settings" },
  "/settings/account": { label: "Account", href: "/settings/account" },
  "/settings/preferences": {
    label: "Preferences",
    href: "/settings/preferences",
  },
};
function SettingLayoutClient({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isSetting = pathName === "/settings";
  const breadcumbsItems = useMemo(() => {
    const items = [
      {
        label: "Home",
        href: "",
        disabled: true,
      },
      {
        label: "Setting",
        href: "/settings",
      },
    ];
    if (!isSetting) {
      items.push(navigationItems[pathName as keyof typeof navigationItems]);
    }
    return items;
  }, [isSetting, pathName]);
  return (
    <>
      <Breadcumbs className="px-4" items={breadcumbsItems} />
      <div className="px-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <TabNavigation
          variant="light"
          items={[
            { label: "General", href: "/settings" },
            { label: "Account", href: "/settings/account" },
            { label: "Preferences", href: "/settings/preferences" },
          ]}
        />
      </div>
      {children}
    </>
  );
}

export default SettingLayoutClient;
