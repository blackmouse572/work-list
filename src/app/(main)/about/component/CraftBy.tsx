'use client';
import { Avatar } from '@nextui-org/avatar';
import { motion, Variant } from 'framer-motion';
import Link from 'next/link';

const variables: Record<string, Variant> = {
  initial: {
    opacity: 0.25,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.5 },
    filter: 'blur(0px)',
  },
};
function CraftBy() {
  return (
    <div className="flex items-center justify-between w-fit ml-auto overflow-visible">
      Crafted by&nbsp;
      <motion.div
        variants={variables}
        layout="position"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="overflow-hidden z-[10] text-default-900 rounded-full px-2.5 py-1.5 inset-x-0 w-fit hover:bg-default-100 hover:bg-opacity-50 hover:outline outline-1 outline-default-200 backdrop-blur-sm transition-all duration-300 ease-in-out"
      >
        <Link
          href="https://portfolio-five-theta-76.vercel.app/"
          className="text-primary-500 flex items-center no-underline gap-2"
        >
          <Avatar src="/avatars/Avatar.png" size="sm" alt="avatar" classNames={{ img: 'object-cover' }} />
          Jaden Nguyen
        </Link>
      </motion.div>
    </div>
  );
}

export default CraftBy;
