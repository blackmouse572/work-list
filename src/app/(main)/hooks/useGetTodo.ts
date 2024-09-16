import todoService from '@/app/(main)/actions/todo.local.action';
import { useQuery } from '@tanstack/react-query';

export default function useGetTodo(workspaceId: string) {
  const data = useQuery({
    queryKey: ['todos', workspaceId],
    queryFn: () => todoService.getTodos(workspaceId),
  });

  return data;
}
