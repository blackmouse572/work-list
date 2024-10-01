import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService from "../actions/todo.local.action";

export default function useWipe(workspaceId: string) {
    const queryClient = useQueryClient();

    const data = useMutation<void, Error, void>({
        mutationFn: () => todoService.deleteAllTodos(workspaceId),
        mutationKey: ['todos', 'delete-todos', workspaceId],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos', 'delete-todos', workspaceId],
            });
        },
    });
    return data;
}