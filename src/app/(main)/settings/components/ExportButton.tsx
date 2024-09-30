"use client";
import { Icon } from "@/app/components/Icons";
import { Button } from "@nextui-org/button";
import useGetTodo from "../../hooks/useGetTodo";

type ExportButtonProps = {
  workspaceId: string;
};
function ExportButton({ workspaceId }: ExportButtonProps) {
  const { data } = useGetTodo(workspaceId);
  const handleExport = () => {
    const allData = JSON.stringify(data);
    const blob = new Blob([allData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
  };
  return (
    <Button
      endContent={<Icon name="tabler/download-outline" />}
      size="sm"
      onClick={handleExport}
    >
      Export
    </Button>
  );
}

export default ExportButton;
