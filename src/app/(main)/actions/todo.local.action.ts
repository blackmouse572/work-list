import { FilterTodoTableSchema } from '@/app/components/FilterTable';
import { Todo } from '@models/todo';

class TodoService {
  constructor() { }
  getTodos(workspaceId: string, filter?: FilterTodoTableSchema) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todo = localStorage.getItem(storageKey);
    if (!todo) {
      console.debug('[DEBUG] TodoService.getTodos from workspaceId: ', workspaceId, ' todo: ', 0);
      return [];
    }
    console.debug('[DEBUG] TodoService.getTodos from workspaceId: ', workspaceId, ' todo: ', todo.length);
    const value = JSON.parse(todo) as Todo[];

    // Filter out deleted todos
    value.filter(t => { !t.deletedAt });

    if (!filter) {
      return value;
    }
    const { status, priority } = filter;
    return value.filter((t) => {
      if (status && status === 'all') {
        return true;
      } else if (status && t.status !== status) {
        return false;
      }

      if (priority && priority === 'all') {
        return true;
      } else if (priority && t.priority !== priority) {
        return false;
      }

      if (filter.dueDateStart && filter.dueDateEnd && t.dueDate) {
        if (t.dueDate < filter.dueDateStart || t.dueDate > filter.dueDateEnd) {
          return false;
        }
      }

      if (filter.includeNoDueDate && t.dueDate) {
        return true;
      }

      return true;
    });
  }

  getDeletedTodos(workspaceId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todo = localStorage.getItem(storageKey);
    if (!todo) {
      console.debug('[DEBUG] TodoService.getDeletedTodos from workspaceId: ', workspaceId, ' todo: ', 0);
      return [];
    }
    console.debug('[DEBUG] TodoService.getDeletedTodos from workspaceId: ', workspaceId, ' todo: ', todo.length);
    const value = JSON.parse(todo) as Todo[];

    // Filter out non-deleted todos
    value.filter(t => { t.deletedAt });

    return value;
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

  async updateTodo(workspaceId: string, todo: Partial<Todo>) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todo.id);
    todos[index] = { ...todos[index], ...todo, updatedAt: new Date() };
    localStorage.setItem(storageKey, JSON.stringify(todos));
    console.debug('[DEBUG] TodoService.updateTodo to workspaceId: ', workspaceId, ' todo: ', todo);
    return todos[index];
  }

  async forceDeleteTodoById(workspaceId: string, todoId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    todos.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(todos));

    console.debug('[DEBUG] TodoService.deleteTodoById from workspaceId: ', workspaceId, ' todoId: ', todoId);
    return todoId;
  }

  async deleteTodoById(workspaceId: string, todoId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    // change deletedAt to current time
    todos[index].deletedAt = new Date();
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
