import { useTheme } from "next-themes";
import { Toaster } from "sonner";
type ToasterProps = React.ComponentProps<typeof Toaster>;

function Toast(props: ToasterProps) {
  const { theme = "system" } = useTheme();
  return (
    <Toaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      duration={3000}
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-default-100 group-[.toaster]:text-foreground group-[.toaster]:border-default group-[.toaster]:shadow-lg group-[.toaster]:rounded-medium",
          description: "group-[.toast]:text-content2-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-content2 group-[.toast]:text-content2-foreground",
          closeButton:
            "group-[.toast]:text-content2-foreground group-[.toast]:hover:text-content2-foreground group-[.toast]:hover:bg-content2 group-[.toast]:hover:border-default-500 transition-all duration-200 group-[.toast]:bg-content2 group-[.toast]:border-default ",
        },
      }}
      {...props}
    />
  );
}

export default Toast;
