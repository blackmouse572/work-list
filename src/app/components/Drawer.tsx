'use client';

import { cn, tv, VariantProps } from '@nextui-org/react';
import { useMediaQuery } from '@uidotdev/usehooks';
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
  const isMobile = useMediaQuery('only screen and (max-width : 768px)');
  return (
    <DrawerPrimitive.Root
      direction={isMobile ? 'bottom' : 'right'}
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
};
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-overlay/50 backdrop-opacity-disabled', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
const DrawerContentVariant = tv({
  base: 'fixed inset-y-0 sm:inset-y-2 w-full right-0 sm:right-2 z-50 flex h-auto flex-col bg-content1 focus:outline-none after:!bg-transparent top-12 sm:top-2',
  variants: {
    size: {
      xs: 'max-w-none sm:max-w-xs',
      sm: 'max-w-none sm:max-w-sm',
      md: 'max-w-none sm:max-w-md',
      lg: 'max-w-none sm:max-w-lg',
      xl: 'max-w-none sm:max-w-xl',
      '2xl': 'max-w-none sm:max-w-2xl',
      '3xl': 'max-w-none sm:max-w-3xl',
      '4xl': 'max-w-none sm:max-w-4xl',
      '5xl': 'max-w-none sm:max-w-5xl',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-small',
      md: 'rounded-medium',
      lg: 'rounded-large',
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'md',
  },
});
type DrawerContentVariants = VariantProps<typeof DrawerContentVariant>;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & DrawerContentVariants
>(({ className, children, size, ...props }, ref) => {
  const vr = DrawerContentVariant({ size });
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content ref={ref} className={cn(vr, className)} {...props}>
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-divider" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left border-b border-divider', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg text-content1-foreground font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn('text-sm text-content2-foreground', className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
