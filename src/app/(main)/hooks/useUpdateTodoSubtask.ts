import todoService from '@/app/(main)/actions/todo.local.action';
import { Todo } from '@models/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateTodoSubTask(workspaceId: string, todoId: string) {
    const queryClient = useQueryClient();
    const data = useMutation<void, Error, Todo['subTasks']>({
        mutationFn: (data) =>
            todoService.updateTodoSubTasks(workspaceId, todoId, data),
        mutationKey: ['todos', workspaceId, todoId],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos', workspaceId, todoId],
            });
        },
    });
    return data;
}
