
import todoService from '@/app/(main)/actions/todo.local.action';
import { FilterTodoTableSchema } from '@/app/components/FilterTable';
import { useQuery } from '@tanstack/react-query';

export default function useGetDeleteTodo(workspaceId: string, filter?: FilterTodoTableSchema) {
    const data = useQuery({
        queryKey: ['delete-todos', workspaceId, filter],
        queryFn: () => todoService.getDeletedTodos(workspaceId),
    });

    return data;
}
