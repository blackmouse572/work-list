import useGlobalCommand from '@/app/components/global-command';
import { Button } from '@nextui-org/button';
import { cn } from '@nextui-org/theme';
import { HTMLMotionProps, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AUTHOR_MENU_ITEMS, MENU_ITEMS, MenuItem } from './AsideNav';
import { Drawer, DrawerContent, DrawerTrigger } from './Drawer';
import { Icon } from './Icons';

function MobileNav() {
  const path = usePathname();
  const activeItem = [...MENU_ITEMS, ...AUTHOR_MENU_ITEMS].find((item) => item.href === path) || MENU_ITEMS[0];
  const [open, setOpen] = React.useState(false);

  const renderItem = (item: MenuItem, { className, ...props }: HTMLMotionProps<'div'> = {}) => {
    const isActive = activeItem.href === item.href;
    if (item.href === '') {
      return (
        <motion.div
          key={item.href}
          {...props}
          className={cn(
            'bg-content2 text-content2-foreground px-4 py-2.5 rounded-small hover:bg-content3 transition-background ',
            isActive && 'shadow-inner shadow-background opacity-75 hover:opacity-80 hover:bg-content-2',
            className
          )}
        >
          {item.icon && <Icon name={item.icon} color={isActive ? 'primary' : 'default'} />}
          <h3>{item.label}</h3>
        </motion.div>
      );
    }
    return (
      <motion.div
        key={item.href}
        {...props}
        className={cn(
          'bg-content2 text-content2-foreground px-4 py-2.5 rounded-small hover:bg-content3 transition-background ',
          isActive && 'shadow-inner shadow-background opacity-75 hover:opacity-80 hover:bg-content-2',
          className
        )}
      >
        <Link href={item.href}>
          {item.icon && <Icon name={item.icon} color={isActive ? 'primary' : 'default'} />}
          <h3>{item.label}</h3>
        </Link>
      </motion.div>
    );
  };
  const toggle = useGlobalCommand((p) => p.toggle);
  return (
    <Drawer direction="bottom" shouldScaleBackground fixed open={open} onClose={() => setOpen(false)}>
      <DrawerTrigger asChild>
        <Button size="sm" isIconOnly variant="ghost" className="" onClick={() => setOpen(!open)}>
          <Icon name="tabler/layout-grid-filled" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full inset-y-0 top-auto inset-x-0 max-w-none px-8 space-y-4 pb-8">
        <div className="flex flex-col gap-2">
          <h4 className="text-sm text-default-500">Main</h4>
          <div className="grid grid-cols-2 gap-4">
            {MENU_ITEMS.map((item) => renderItem(item))}
            {renderItem(
              {
                label: 'Quick Links',
                icon: 'tabler/star-filled',
                href: '',
              },
              {
                onClick: () => {
                  setOpen(false);
                  toggle();
                },
              }
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm text-default-500">Authors</h4>
          <div className="grid grid-cols-2 gap-4">{AUTHOR_MENU_ITEMS.map((item) => renderItem(item))}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileNav;
