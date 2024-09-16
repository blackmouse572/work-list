import workspaceService from '@/app/(main)/actions/workspace.local.action';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '@nextui-org/modal';
type NewWorkspaceProps = Omit<ModalProps, 'children'>;
function NewWorkspace(props: NewWorkspaceProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const workspaceId = form.workspaceId.value;
    const isValid = form.checkValidity();

    if (!isValid) {
      return;
    }
    const isWorkspaceExist = workspaceService.checkWorkspace(workspaceId);
    if (isWorkspaceExist) {
      console.error('Workspace already exist');
      return;
    }
    workspaceService.createWorkspace({ name: workspaceId });
  };
  return (
    <Modal
      {...props}
      className="w-[400px]"
      aria-label="Create new workspace"
      aria-modal="true"
      role="dialog"
      size="sm"
      variant="card"
    >
      <ModalContent>
        <ModalHeader>Create new workspace</ModalHeader>
        <ModalBody>
          <form id="new-workspace" method="post" onSubmit={onSubmit}>
            <Input name="workspaceId" required isRequired placeholder="Workspace name" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="light">Cancel</Button>
          <Button type="submit" form="new-workspace" color="primary">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewWorkspace;
