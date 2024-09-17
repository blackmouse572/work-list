import todoService from '@/app/(main)/actions/todo.local.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteTodos(workspaceId: string) {
  const queryClient = useQueryClient();

  const data = useMutation<string[], Error, string[]>({
    mutationFn: (data) => todoService.deleteTodoByIds(workspaceId, data),
    mutationKey: ['todos', 'delete-todos', workspaceId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', 'delete-todos', workspaceId],
      });
    },
  });
  return data;
}
