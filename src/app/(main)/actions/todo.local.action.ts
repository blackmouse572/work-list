import { Todo } from '@models/todo';

class TodoService {
  constructor() {}
  getTodos(workspaceId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todo = localStorage.getItem(storageKey);
    if (!todo) {
      return [];
    }
    console.debug('[DEBUG] TodoService.getTodos from workspaceId: ', workspaceId, ' todo: ', todo.length);
    return JSON.parse(todo) as Todo[];
  }

  getTodoById(workspaceId: string, todoId: string) {
    const todo = this.getTodos(workspaceId).find((t) => t.id === todoId);
    console.debug(
      '[DEBUG] TodoService.getTodoById from workspaceId: ',
      workspaceId,
      ' todoId: ',
      todoId,
      ' todo: ',
      todo
    );
    return todo;
  }

  async addTodo(workspaceId: string, todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    todos.push({ ...todo, id: `T-${todos.length + 1}`, createdAt: new Date(), updatedAt: new Date() });
    localStorage.setItem(storageKey, JSON.stringify(todos));
    console.debug('[DEBUG] TodoService.addTodo to workspaceId: ', workspaceId, ' todo: ', todo);
    return todos[todos.length - 1];
  }

  updateTodo(workspaceId: string, todo: Todo) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todo.id);
    todos[index] = todo;
    localStorage.setItem(storageKey, JSON.stringify(todos));
    console.debug('[DEBUG] TodoService.updateTodo to workspaceId: ', workspaceId, ' todo: ', todo);
    return todo;
  }

  async deleteTodoById(workspaceId: string, todoId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    todos.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(todos));

    console.debug('[DEBUG] TodoService.deleteTodoById from workspaceId: ', workspaceId, ' todoId: ', todoId);
    return todoId;
  }

  updateTodoStatus(workspaceId: string, todoId: string, status: Todo['status']) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    todos[index].status = status;
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }

  updateTodoTags(workspaceId: string, todoId: string, tags: string[]) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    todos[index].tags = tags;
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }

  updateTodoSubTasks(workspaceId: string, todoId: string, subTasks: Todo[]) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    todos[index].subTasks = subTasks;
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }

  private getTodosWorkspaceKey(workspaceId: string) {
    return `todos-${workspaceId}`;
  }
}
const todoService = new TodoService();
export default todoService;
