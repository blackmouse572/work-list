import { Icon } from "@/app/components/Icons";
import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

function RawData({ data }: { data: string }) {
  const [copied, setCopied] = useCopyToClipboard();
  return (
    <>
      <Button
        size="sm"
        onClick={() => setCopied(data)}
        variant="light"
        className="absolute right-0 bottom-0 mx-8 my-4 z-10 opacity-50 hover:opacity-100"
        startContent={
          <Icon
            size="md"
            color={copied ? "success" : "default"}
            name={
              copied
                ? "tabler/clipboard-check-outline"
                : "tabler/clipboard-copy-outline"
            }
          />
        }
        isIconOnly
      />
      <ScrollShadow className="max-h-[300px]">
        <pre className="text-xs">{data}</pre>
      </ScrollShadow>
    </>
  );
}

export default RawData;
