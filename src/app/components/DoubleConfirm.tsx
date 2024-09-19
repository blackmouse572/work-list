import SliderConfirm from '@/app/components/SliderConfirm';
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';
import React from 'react';

type DoubleConfirmProps = Omit<ModalProps, 'children'> & {
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  header: React.ReactNode;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
};
function DoubleConfirm({
  onConfirm,
  onCancel,
  cancelButtonProps,
  confirmButtonProps,
  header,
  ...props
}: DoubleConfirmProps) {
  const [isConfirm, setIsConfirm] = React.useState(false);
  const onHandleConfirm = (event?: A) => {
    setIsConfirm(true);
    onConfirm();
    event && confirmButtonProps?.onClick?.(event);
  };

  const onConfirmCancel = (event?: A) => {
    setIsConfirm(false);
    onCancel();
    event && cancelButtonProps?.onClick?.(event);
    props.onOpenChange?.(false);
  };

  const onHandleSwipe = (v: boolean) => {
    setIsConfirm(v);
  };

  return (
    <Modal backdrop="blur" open={isConfirm} {...props} onClose={onConfirmCancel}>
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody className="overflow-hidden">
          {props.children}
          <div className="w-3/5 mx-auto">
            <SliderConfirm className="" onValueChange={onHandleSwipe} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" variant="light" {...cancelButtonProps} onClick={onConfirmCancel}>
            Cancel
          </Button>
          <Button size="sm" color="danger" {...confirmButtonProps} onClick={onHandleConfirm} isDisabled={!isConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DoubleConfirm;
