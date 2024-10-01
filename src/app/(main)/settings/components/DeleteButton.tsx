"use client";
import { Button, ButtonProps } from "@nextui-org/button";
import useWipe from "../../hooks/useWipe";
import { useState } from "react";
import DoubleConfirm from "@/app/components/DoubleConfirm";
import { toast } from "sonner";
import { Icon } from "@/app/components/Icons";

type DeleteButtonProps = {
  workspaceId: string;
} & Partial<ButtonProps>;

function DeleteButton({ workspaceId, ...props }: DeleteButtonProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutateAsync } = useWipe(workspaceId);

  const onHandleConfirm = () => {
    mutateAsync().then(() => {
      setIsDeleteDialogOpen(false);
      toast.success("All data has been deleted");
    });
  };

  return (
    <>
      <DoubleConfirm
        isOpen={isDeleteDialogOpen}
        header={
          <div className="">
            <h2>Delete Todo</h2>
          </div>
        }
        onOpenChange={setIsDeleteDialogOpen}
        onCancel={() => {}}
        onConfirm={onHandleConfirm}
      >
        <p className="text-xs">
          This action will delete all your data. This action is irreversible.
          Make sure you have a backup of your data.
        </p>
      </DoubleConfirm>
      <Button
        color="danger"
        size="sm"
        endContent={<Icon name="tabler/trash-outline" />}
        {...props}
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        Delete
      </Button>
    </>
  );
}

export default DeleteButton;
