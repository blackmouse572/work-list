import { cn } from "@nextui-org/theme";

type FeatureCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  containerClassName?: string;
};
function FeatureCard(props: FeatureCardProps) {
  const { title, containerClassName, description, children } = props;
  return (
    <div className=" text-content2-foreground flex flex-row w-full">
      <div className="flex flex-col gap-2 flex-1">
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
