import { getPlaceValue } from '@/misc/table.mixin';
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useEffect } from 'react';

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export function Counter({
  value,
  suffix,
  prefix,
}: {
  value: number;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}) {
  const place = getPlaceValue(value);
  return (
    <motion.div
      style={{ fontSize }}
      className="flex items-center text-xs overflow-hidden px-2 leading-none"
      layout="position"
    >
      {prefix}
      {[...Array(place.toString().split('').length)].map((_, i) => {
        const placeValue = place === 1 ? 1 : Math.floor(place / Math.pow(10, i));
        return <Digit key={placeValue} place={placeValue} value={value} />;
      })}
      {suffix && (
        <motion.span layout="position" id="suffix" layoutId="suffix" className="flex items-center justify-center">
          &nbsp;
          {suffix}
        </motion.span>
      )}
    </motion.div>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[0.75ch]">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });
  return (
    <motion.span style={{ y }} className="absolute inset-0 flex items-center justify-center text-sm">
      {number}
    </motion.span>
  );
}
