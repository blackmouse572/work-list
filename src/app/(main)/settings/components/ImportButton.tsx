"use client";
import { useCallback } from "react";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import { Icon } from "@/app/components/Icons";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useState } from "react";
import { cn } from "@nextui-org/theme";
import useAddMultipleTodo from "../../hooks/useAddMultipleTodo";
function ImportButton(props: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { mutate: add } = useAddMultipleTodo(props.workspaceId);

  const onUpload = useCallback(() => {
    if (!file || file == null) return;
    //set data to local storage
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as string;
      const json = JSON.parse(data);

      add(json);
    };

    reader.readAsText(file);
  }, [add, file]);
  const onDrop = useCallback(
    (accept: File, _: FileRejection[], __: DropEvent) => {
      setFile(accept);
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles[0], [], {} as DropEvent),
    autoFocus: true,
    maxFiles: 1,
    accept: {
      "application/json": [".json"],
    },
  });
  return (
    <>
      <Button
        endContent={<Icon name="tabler/upload-outline" />}
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Import
      </Button>
      <Modal isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <ModalContent>
          <ModalHeader>Import your data</ModalHeader>
          <ModalBody>
            <p>
              Restore your data from a backup. All your data will be replaced.
            </p>
            <div {...getRootProps()} className="space-y-4">
              <input {...getInputProps()} />
              <div
                className={cn(
                  "w-full h-32 flex items-center justify-center border-2 border-dashed border-divider rounded-lg",
                  isDragActive && "border-primary-500"
                )}
              >
                <Icon name="tabler/upload-outline" className="size-32" />
              </div>
            </div>
            {file && (
              <div className="bg-content3 text-content3-foreground p-2 rounded-lg flex items-center gap-3 group relative">
                <span
                  className="aspect-square h-12 flex items-center justify-center bg-content2 rounded-full opacity-70 hover:opacity-100 transition-opacity relative"
                  onClick={() => setFile(null)}
                >
                  <Icon
                    name="tabler/file-filled"
                    className="w-5 h-5 text-content2-foreground transition-all group-hover:size-0 group-hover:opacity-0 "
                  />
                  <Icon
                    name="tabler/circle-x-filled"
                    className="w-5 h-5 text-content2-foreground transition-all scale-0 group-hover:scale-100 group-hover:opacity-100 opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                  />
                </span>
                <span>{file.name}</span>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              color="success"
              onClick={() => {
                onUpload();
                setIsOpen(false);
              }}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImportButton;
