import { useTableControl } from '@/app/components/useTableControl';
import { Counter } from '@/app/components/Counter';
import { AnimatePresence, motion, Variant } from 'framer-motion';
import { useMemo } from 'react';
const variants: Record<string, Variant> = {
  initial: { opacity: 0, y: 100, filter: 'blur(5px)' },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -100, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }, filter: 'blur(5px)' },
};
function TableActionToast() {
  const { selectedKeys } = useTableControl();
  const suffix = useMemo(() => {
    if (selectedKeys === 'all') return null;

    return selectedKeys.size > 1 ? 'items' : 'item';
  }, [selectedKeys]);
  return (
    <AnimatePresence initial={false} mode="popLayout">
      {selectedKeys === 'all' ? (
        <motion.span
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="all-item"
          className="text-sm"
        >
          All items
        </motion.span>
      ) : (
        <motion.span
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="counter"
          className="text-sm"
        >
          <Counter
            key="counter"
            value={selectedKeys.size}
            suffix={
              <span key="suffix" className="text-sm">
                {suffix}
              </span>
            }
          />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default TableActionToast;
