import todoService from '@/app/(main)/actions/todo.local.action';
import { FilterTodoTableSchema } from '@/app/components/FilterTable';
import { useQuery } from '@tanstack/react-query';

export default function useGetTodo(workspaceId: string, filter: FilterTodoTableSchema) {
  const data = useQuery({
    queryKey: ['todos', workspaceId, filter],
    queryFn: () => todoService.getTodos(workspaceId, filter),
  });

  return data;
}
