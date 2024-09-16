import workspaceService from '@/app/(main)/actions/workspace.local.action';
import { useQuery } from '@tanstack/react-query';

export default function useGetWorkspaces() {
  const data = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => workspaceService.getAllWorkspaces(),
  });

  return data;
}
