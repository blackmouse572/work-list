
import todoService from '@/app/(main)/actions/todo.local.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useForceDeleteTodos(workspaceId: string) {
    const queryClient = useQueryClient();

    const data = useMutation<string[], Error, string[]>({
        mutationFn: (data) => todoService.forceDeleteTodoByIds(workspaceId, data),
        mutationKey: ['delete-todos', workspaceId],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['delete-todos', workspaceId],
            });
        },
    });
    return data;
}
