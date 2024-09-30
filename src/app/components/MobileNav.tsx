import { Button } from "@nextui-org/button";
import { AUTHOR_MENU_ITEMS, MENU_ITEMS, MenuItem } from "./AsideNav";
import { Drawer, DrawerContent, DrawerTrigger } from "./Drawer";
import { Icon } from "./Icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@nextui-org/theme";

function MobileNav() {
  const path = usePathname();
  const activeItem =
    [...MENU_ITEMS, ...AUTHOR_MENU_ITEMS].find((item) => item.href === path) ||
    MENU_ITEMS[0];

  const renderItem = (item: MenuItem) => {
    const isActive = activeItem.href === item.href;
    return (
      <motion.div
        key={item.href}
        className={cn(
          "bg-content2 text-content2-foreground px-4 py-2.5 rounded-small hover:bg-content3 transition-background ",
          isActive &&
            "shadow-inner shadow-background opacity-75 hover:opacity-80 hover:bg-content-2"
        )}
      >
        <Link href={item.href}>
          {item.icon && (
            <Icon name={item.icon} color={isActive ? "primary" : "default"} />
          )}
          <h3>{item.label}</h3>
        </Link>
      </motion.div>
    );
  };
  return (
    <Drawer direction="bottom" shouldScaleBackground fixed>
      <DrawerTrigger asChild>
        <Button size="sm" isIconOnly variant="ghost" className="">
          <Icon name="tabler/layout-grid-filled" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full inset-y-0 top-auto inset-x-0 max-w-none px-8 space-y-4 pb-8">
        <div className="flex flex-col gap-2">
          <h4 className="text-sm text-default-500">Main</h4>
          <div className="grid grid-cols-2 gap-4">
            {MENU_ITEMS.map((item) => renderItem(item))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm text-default-500">Authors</h4>
          <div className="grid grid-cols-2 gap-4">
            {AUTHOR_MENU_ITEMS.map((item) => renderItem(item))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileNav;
