import { getWorkspaceId, saveWorkspaceId } from '@/app/(main)/actions/workspace.action';
import { DEFAULT_WORKSPACE_ID, DEFAULT_WORKSPACE_NAME } from '@/app/(main)/todo/constant';
import { Workspace } from '@models/workspace';

class WorkspaceService {
  constructor() {}

  getAllWorkspaces() {
    const WorkspaceKey = this.getTodosWorkspaceKey();
    const workspaces = localStorage.getItem(WorkspaceKey);
    if (!workspaces) {
      console.debug('No workspace found, creating default workspace');
      const defaultWorkspace = {
        id: DEFAULT_WORKSPACE_ID,
        name: DEFAULT_WORKSPACE_NAME,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.saveWorkspaces([defaultWorkspace]);
      return [defaultWorkspace];
    }
    const parsedWorkspaces = JSON.parse(workspaces) as Workspace[];
    if (parsedWorkspaces && parsedWorkspaces.length > 0) {
      return parsedWorkspaces;
    }
    return [];
    // If there is no workspace, create a default workspace
  }
  async getCurrentWorkspace() {
    const currentWorkspaceKey = await getWorkspaceId();
    if (!currentWorkspaceKey) {
      return DEFAULT_WORKSPACE_NAME;
    }
    return currentWorkspaceKey;
  }
  checkWorkspace(workspaceId: string) {
    const workspaces = this.getAllWorkspaces();
    return workspaces.some((workspace) => workspace.id === workspaceId);
  }
  saveWorkspaces(workspaces: Workspace[]) {
    const WorkspaceKey = this.getTodosWorkspaceKey();
    localStorage.setItem(WorkspaceKey, JSON.stringify(workspaces));
  }
  createWorkspace(workspace: Pick<Workspace, 'name'>) {
    const workspaces = this.getAllWorkspaces();
    workspaces.push({
      id: workspace.name,
      name: workspace.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.debug('Creating workspace', workspace);
    this.saveWorkspaces(workspaces);
  }
  editWorkspace(workspace: Pick<Workspace, 'name' | 'id'>) {
    const workspaces = this.getAllWorkspaces();
    const index = workspaces.findIndex((w) => w.id === workspace.id);
    workspaces[index] = {
      ...workspaces[index],
      ...workspace,
      updatedAt: new Date(),
    };
    this.saveWorkspaces(workspaces);
  }

  selectWorkspace(workspaceId: string) {
    // check if workspace exists
    if (!this.checkWorkspace(workspaceId)) {
      console.error('Workspace does not exist');
      return;
    }

    // set workspace id
    return saveWorkspaceId(workspaceId);
  }

  private getTodosWorkspaceKey() {
    return `workspace`;
  }
}
const workspaceService = new WorkspaceService();
export default workspaceService;
