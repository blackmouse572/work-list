import { Button, ButtonProps } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { cn } from '@nextui-org/theme';
import { AnimatePresence, motion, Variant } from 'framer-motion';
type ActionToastProps = React.HTMLAttributes<HTMLElement> & {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  message: React.ReactNode;
  actions: (Omit<ButtonProps, 'onClick'> & { onClick?: () => void })[];
  size?: 'sm' | 'md' | 'lg';
};
const variables: Record<string, Variant> = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
};

function ActionToast({ isOpen, message, size, actions }: ActionToastProps) {
  return (
    <div className="absolute inset-x-0 bottom-0">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variables}
            layout="position"
            initial="initial"
            key="toast"
            animate="animate"
            exit="exit"
            className={cn(
              'fixed overflow-hidden bottom-4 z-[10] text-default-900 rounded-full px-4 py-2 shadow-md inset-x-0 max-w-sm mx-auto bg-default-100 bg-opacity-50 border border-default-200 backdrop-blur-sm',
              size === 'sm' && 'max-w-sm',
              size === 'md' && 'max-w-md',
              size === 'lg' && 'max-w-lg'
            )}
          >
            <div className="flex items-center justify-between">
              {message}
              <div className="gap-2 hidden sm:flex">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    size="sm"
                    {...action}
                    onClick={() => {
                      action.onClick?.();
                    }}
                  />
                ))}
              </div>
              <div className="block sm:hidden">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" size="sm">
                      Open Menu
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onAction={(k) => {
                      const action = actions[k as A];
                      action.onClick?.();
                    }}
                  >
                    {actions.map((action, index) => (
                      <DropdownItem
                        key={index}
                        endContent={action.endContent}
                        startContent={action.startContent}
                        className={action.className}
                        color={action.color}
                      >
                        {action.children}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActionToast;
