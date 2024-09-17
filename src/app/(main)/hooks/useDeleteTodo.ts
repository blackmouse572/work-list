import todoService from '@/app/(main)/actions/todo.local.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteTodo(workspaceId: string) {
  const queryClient = useQueryClient();

  const data = useMutation<string, Error, string>({
    mutationFn: (data) => todoService.deleteTodoById(workspaceId, data),
    mutationKey: ['todos', workspaceId, 'delete-todos'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', workspaceId, 'delete-todos'],
      });
    },
  });
  return data;
}
