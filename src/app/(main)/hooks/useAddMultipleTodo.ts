
import todoService from '@/app/(main)/actions/todo.local.action';
import { Todo } from '@models/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAddMultipleTodo(workspaceId: string) {
    const queryClient = useQueryClient();
    const data = useMutation<Todo[], Error, Todo[]>({
        mutationFn: (data) =>
            todoService.addMultipleTodos(workspaceId, data),
        mutationKey: ['todos', workspaceId],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos', workspaceId],
            });
        },
    });
    return data;
}
