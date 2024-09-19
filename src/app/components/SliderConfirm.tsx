import { Icon } from '@/app/components/Icons';
import { cn } from '@nextui-org/theme';
import { HTMLMotionProps, motion, PanInfo, useAnimate, useMotionValue, useTransform, useVelocity } from 'framer-motion';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

function SliderConfirm({
  className,
  onValueChange,
  ...props
}: HTMLMotionProps<'div'> & { onValueChange: (v: boolean) => void }) {
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const [itemScope, animateItem] = useAnimate();
  const [successScope, animateSuccess] = useAnimate();
  const [itemEndWidth, setItemEndWidth] = useState(0);
  const x = useMotionValue(0);
  const xVelocity = useVelocity(x);
  const blur = useTransform(x, [0, itemEndWidth], [0, 12], {
    clamp: false,
  });
  const filter = useTransform(blur, (value) => `blur(${value}px)`);
  const scaleY = useTransform(xVelocity, [-1000, 0, 1000], [0.875, 1, 0.875]);
  const scaleX = useTransform(xVelocity, [-1000, 0, 1000], [1.2, 1, 1.2]);
  const opacity = useTransform(x, [0, itemEndWidth], [1, 0.5]);

  useLayoutEffect(() => {
    if (!constraintsRef.current) return;
    const value = constraintsRef.current.offsetWidth - itemScope.current.offsetWidth - 16 * 0.75;
    setItemEndWidth(value);
  }, [itemScope]);

  useEffect(() => {
    const unsub = x.on('change', (v) => {
      console.log(v);
      if (v > itemEndWidth - (itemEndWidth / 5) * 1) {
        animateSuccess(successScope.current, {
          y: 0,
          transition: {
            ease: [0.32, 0.72, 0, 1],
            stiffness: 1000,
          },
        });
      } else {
        animateSuccess(successScope.current, {
          y: -100,
          transition: {
            ease: [0.32, 0.72, 0, 1],
          },
        });
      }
    });

    return () => {
      unsub();
    };
  }, [animateSuccess, itemEndWidth, successScope, x]);

  const onDragEnd = useCallback(
    (_: A, info: PanInfo) => {
      if (!itemScope.current || !constraintsRef.current) return;
      if (info.offset.x > 50) {
        onValueChange(true);
        return animateItem(itemScope.current, { x: itemEndWidth });
      } else if (info.offset.x < 90) {
      }

      onValueChange(false);
      return animateItem(itemScope.current, { x: 0 });
    },
    [animateItem, itemEndWidth, itemScope, onValueChange]
  );

  return (
    <motion.div
      className={cn('w-full relative p-1 rounded-medium h-12 overflow-hidden border border-divider', className)}
      ref={constraintsRef}
      data-content="Slide to confirm"
      {...props}
    >
      <motion.div
        ref={successScope}
        className="absolute inset-0 rounded-medium text-xs flex items-center justify-center font-medium text-success-500 -z-[9]"
        initial={{
          y: -100,
        }}
      >
        <Icon name="tabler/circle-check-filled" className="mr-2" size="md" />
        Confirmed
      </motion.div>
      <div className="absolute inset-0 bg-default rounded-medium text-xs flex items-center justify-center font-medium text-default-100 -z-10"></div>
      <motion.div
        className="absolute inset-0 bg-default rounded-medium text-xs flex items-center justify-center font-medium text-default-100 -z-10"
        style={{
          filter,
        }}
      >
        <motion.span style={{ opacity }}>Slide to confirm</motion.span>
      </motion.div>
      <motion.div
        drag="x"
        className="h-full aspect-square rounded-medium bg-default-400 flex justify-center items-center cursor-grab z-10 "
        dragConstraints={constraintsRef}
        dragElastic={0}
        whileDrag={{
          cursor: 'grabbing',
        }}
        style={{ x, cursor: 'grab', scaleY, scaleX }}
        dragSnapToOrigin
        dragMomentum={false}
        dragTransition={{ bounceDamping: 0, bounceStiffness: 100 }}
        onDragEnd={onDragEnd}
        ref={itemScope}
      >
        <Icon name="tabler/chevrons-right-outline" />
      </motion.div>
    </motion.div>
  );
}

export default SliderConfirm;
