'use client';
import workspaceService from '@/app/(main)/actions/workspace.local.action';
import useGetWorkspaces from '@/app/(main)/hooks/useGetWorkspace';
import { Icon, IconName } from '@/app/components/Icons';
import NewWorkspace from '@/app/components/NewWorkspace';
import { Workspace } from '@models/workspace';
import { Avatar } from '@nextui-org/avatar';
import { Button, cn, Select, SelectItem, SharedSelection } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import GlobalCommand from './global-command/GlobalCommand';

type AsideNavProps = React.HTMLAttributes<HTMLElement> & {
  workspaceId?: string;
};
export type MenuItem = {
  key?: string;
  label: string;
  icon: IconName;
  href: string;
  items?: MenuItem[];
};
export const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'tabler/layout-grid-outline',
    label: 'Task',
    href: '/',
  },
  {
    icon: 'tabler/trash-outline',
    label: 'Trash',
    href: '/trash',
  },
  {
    icon: 'tabler/settings-2-outline',
    label: 'Settings',
    href: '/settings',
  },
];
export const AUTHOR_MENU_ITEMS: MenuItem[] = [
  {
    icon: 'tabler/chevron-right-outline',
    label: 'Contact',
    href: 'https://portfolio-five-theta-76.vercel.app/',
  },
  {
    icon: 'tabler/users-outline',
    label: 'About',
    href: '/about',
  },
];
function AsideNav({ className, workspaceId, ...props }: AsideNavProps) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<Workspace>();
  const [isShrink, _] = React.useState(false);
  const [isAddWorkspace, setIsAddWorkspace] = React.useState(false);

  const { data, isLoading } = useGetWorkspaces();
  const path = usePathname();
  const activeItem =
    [...MENU_ITEMS, ...AUTHOR_MENU_ITEMS].find((item) => {
      // Create a regular expression that matches the exact path or any subpath
      const reg = new RegExp(`^${item.href}(/.*)?$`, 'g');
      return reg.test(path);
    }) || MENU_ITEMS[0];

  const onSelectionChanges = (e: SharedSelection) => {
    const workspace = data?.find((w) => w.id === e.anchorKey);
    if (!workspace || workspace.id === 'added') return;
    setSelectedWorkspace(workspace);
    workspaceService.selectWorkspace(workspace.id);
  };
  const renderItem = (item: MenuItem) => (
    <Link key={item.href} href={item.href} className="w-full">
      <Button
        href={item.href}
        disableRipple
        startContent={<Icon name={item.icon} />}
        color={activeItem.href === item.href ? 'primary' : 'default'}
        variant={activeItem.href === item.href ? 'flat' : 'light'}
        data-selected={activeItem.href === item.href}
        isIconOnly={isShrink}
        className="w-full"
      >
        <span className={cn(isShrink ? 'hidden' : 'block', 'w-full text-start')}>{item.label}</span>
      </Button>
    </Link>
  );

  useEffect(() => {
    setSelectedWorkspace(data?.find((w) => w.id === workspaceId));
  }, [data, workspaceId]);
  return (
    <aside className={cn('space-y-8', className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        {!isShrink && (
          <div className="flex-1 flex items-center">
            <Select
              items={data}
              defaultSelectedKeys={[workspaceId!]}
              selectedKeys={selectedWorkspace && [selectedWorkspace?.id]}
              onSelectionChange={onSelectionChanges}
              placeholder="Select Workspace"
              size="sm"
              variant="underlined"
              isLoading={isLoading}
              isRequired
              className="[&_button]:border-none border-transparent [&_button]:after:content-none max-w-[200px]"
            >
              {
                data?.map((workspace) => (
                  <SelectItem key={workspace.id} textValue={workspace.name}>
                    <span className="text-small">{workspace.name}</span>
                  </SelectItem>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                )) as any
              }
              <SelectItem
                key={'added'}
                textValue={'New Workspace'}
                onClick={() => {
                  setIsAddWorkspace(true);
                }}
              >
                <div className="flex items-start gap-2">
                  <Icon name="tabler/circle-dashed-plus-outline" size="sm" />
                  <span className="text-small">New Workspace</span>
                </div>
              </SelectItem>
            </Select>
          </div>
        )}
        <Avatar className="aspect-square" src="/avatars/extension_icon_solid.png" name="John Doe" size="sm" />
      </div>
      <NewWorkspace isOpen={isAddWorkspace} onOpenChange={setIsAddWorkspace} />
      <GlobalCommand workspaceId={workspaceId!} />

      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-default-500">Main</h4>
        {MENU_ITEMS.map((item) => renderItem(item))}
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-default-500">Author</h4>
        {AUTHOR_MENU_ITEMS.map((item) => renderItem(item))}
      </div>
    </aside>
  );
}

export default AsideNav;
