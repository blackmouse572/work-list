import { ButtonProps, cn } from "@nextui-org/react";
import { type SVGProps } from "react";
import { IconName } from "../../../types/name";
export type { IconName };
const href = "/icons/sprite.svg";

export { href };

const sizeClassName = {
  font: "w-[1em] h-[1em]",
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
} as const;

type Size = keyof typeof sizeClassName;

const childrenSizeClassName = {
  font: "gap-1.5",
  xs: "gap-1.5",
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2",
  xl: "gap-3",
} satisfies Record<Size, string>;

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 *
 * Pass `title` prop to the `Icon` component to get `<title>` element rendered
 * in the SVG container, providing this way for accessibility.
 */
export function Icon({
  name,
  size = "font",
  className,
  title,
  color,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: Size;
  color?: ButtonProps["color"];
  title?: string;
}) {
  if (children) {
    return (
      <span
        className={`inline-flex items-center ${childrenSizeClassName[size]} text-${color}`}
      >
        <Icon
          name={name}
          size={size}
          className={className}
          title={title}
          {...props}
        />
        {children}
      </span>
    );
  }
  return (
    <svg
      {...props}
      className={cn(
        sizeClassName[size],
        "inline self-center",
        `text-${color}`,
        className
      )}
    >
      {title ? <title>{title}</title> : null}
      <use href={`${href}#${name}`} />
    </svg>
  );
}
