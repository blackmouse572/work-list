import todoService from '@/app/(main)/actions/todo.local.action';
import { useQuery } from '@tanstack/react-query';

export default function useGetTodoById(workspaceId: string, todoId: string) {
  const data = useQuery({
    queryKey: ['todos', workspaceId, todoId],
    queryFn: () => todoService.getTodoById(workspaceId, todoId),
  });

  return data;
}
