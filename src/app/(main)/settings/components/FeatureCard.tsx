import { cn, colorVariants, tv, VariantProps } from "@nextui-org/theme";

const FeatureCardVariants = tv({
  slots: {
    base: ["flex flex-row w-full", "text-content2-foreground", "p-4"],
    header: ["flex flex-col gap-2 flex-1"],
  },
  variants: {
    variants: {
      default: {},
      danger: {
        base: [
          colorVariants.light.danger,
          "rounded-medium border bg-danger/20 border-danger",
        ],
      },
    },
  },
  defaultVariants: {
    variants: "default",
  },
});

type FeatureCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  containerClassName?: string;
} & VariantProps<typeof FeatureCardVariants>;

function FeatureCard(props: FeatureCardProps) {
  const { title, containerClassName, description, children, ...rest } = props;
  const { base, header } = FeatureCardVariants(rest);
  return (
    <div className={base()}>
      <div className={header()}>
        <h1 className="text-large font-bold">{title}</h1>
        <p className="text-default-500 text-sm max-w-[80%]">{description}</p>
      </div>
      <div
        className={cn(
          "max-w-[200px] flex justify-center items-center",
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default FeatureCard;
