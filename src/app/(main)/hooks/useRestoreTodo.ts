
import todoService from '@/app/(main)/actions/todo.local.action';
import { Todo } from '@models/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useRestoreTodos(workspaceId: string) {
    const queryClient = useQueryClient();
    const data = useMutation<Todo[], Error, string[]>({
        mutationFn: (data) =>
            todoService.restoreTodyByIds(workspaceId, data),
        mutationKey: ['delete-todos', workspaceId],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['delete-todos', workspaceId],
            });
        },
    });
    return data;
}
