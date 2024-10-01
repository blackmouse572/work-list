import { cn } from "@nextui-org/theme";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";
type ToasterProps = React.ComponentProps<typeof Toaster>;
// [data-rich-colors=true][data-sonner-toast][data-type=success], [data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]
function Toast(props: ToasterProps) {
  const { theme = "system" } = useTheme();
  return (
    <Toaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      duration={50000}
      richColors
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-default-100 group-[.toaster]:text-foreground group-[.toaster]:border-default group-[.toaster]:shadow-lg group-[.toaster]:rounded-small",
            "data-[type='success']:!bg-success-500/20 data-[type='success']:!border-success",
            "data-[type='error']:!bg-danger-500/20 data-[type='error']:!border-danger",
            "data-[type='warning']:!bg-warning-500/20 data-[type='warning']:!border-warning",
            "data-[type='info']:!bg-info-500/20 data-[type='info']:!border-info",
            "backdrop-blur-sm"
          ),
          description: "group-[.toast]:text-content2-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-content2 group-[.toast]:text-content2-foreground",
          closeButton: cn(
            "group-[.toast]:text-content2-foreground group-[.toast]:hover:text-content2-foreground group-[.toast]:hover:bg-content2 group-[.toast]:hover:border-default-500 transition-all duration-200 group-[.toast]:bg-content2 group-[.toast]:border-default ",
            "data-[type='success']:group-[.toast]:!bg-success-500/20 data-[type='success']:group-[.toast]:!border-success"
          ),
        },
      }}
      {...props}
    />
  );
}

export default Toast;
