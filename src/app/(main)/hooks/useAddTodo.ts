import todoService from '@/app/(main)/actions/todo.local.action';
import { AddTodoSchema } from '@/app/components/AddTodo';
import { Todo } from '@models/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAddTodo(workspaceId: string) {
  const queryClient = useQueryClient();
  const data = useMutation<Todo, Error, AddTodoSchema>({
    mutationFn: (data) =>
      todoService.addTodo(workspaceId, {
        ...data,
        subTasks: [],
        tags: [],
        status: 'todo',
      }),
    mutationKey: ['todos', workspaceId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', workspaceId],
      });
    },
  });
  return data;
}
