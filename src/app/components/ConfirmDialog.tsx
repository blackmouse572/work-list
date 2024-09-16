import { Button, ButtonProps } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React, { createContext, useCallback, useContext, useRef } from 'react';
import { useImmer } from 'use-immer';
type ConfirmOptions = {
  title: string;
  description?: string;
  confirmButton: ButtonProps;
  cancelButton: ButtonProps;
};
type ConfirmDialogState = {
  confirm: (option: ConfirmOptions) => Promise<boolean>;
};

const ConfirmDialog = createContext<ConfirmDialogState>({
  confirm: ({}) => Promise.resolve(false),
});

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useImmer<
    ConfirmOptions & {
      isOpen: boolean;
    }
  >({
    cancelButton: { children: 'Cancel' },
    confirmButton: { children: 'Confirm' },
    description: '',
    title: '',
    isOpen: false,
  });
  const fn = useRef<(choice: boolean) => void>(() => {});

  const confirm = useCallback(
    (data: ConfirmOptions) => {
      return new Promise<boolean>((resolve) => {
        setState({ ...data, isOpen: true });
        fn.current = (choice) => {
          resolve(choice);
          setState((prev) => {
            prev.isOpen = false;
          });
        };
      });
    },
    [setState]
  );
  return (
    <ConfirmDialog.Provider value={{ confirm }}>
      {children}
      <Modal isOpen={state.isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{state.title}</ModalHeader>
              <ModalBody>
                <p>{state.description}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  {...state.cancelButton}
                  onClick={(e) => {
                    fn.current(false);
                    onClose();
                    state.cancelButton.onClick?.(e);
                  }}
                />
                <Button
                  {...state.confirmButton}
                  onClick={(e) => {
                    fn.current(true);
                    onClose();
                    state.confirmButton.onClick?.(e);
                  }}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ConfirmDialog.Provider>
  );
}

export default function useConfirm() {
  return useContext(ConfirmDialog);
}
