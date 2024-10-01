import { FilterTodoTableSchema } from '@/app/components/FilterTable';
import { Todo } from '@models/todo';

class TodoService {
  getTodos(workspaceId: string, filter?: FilterTodoTableSchema) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todo = localStorage.getItem(storageKey);
    if (!todo) {
      console.debug('[DEBUG] TodoService.getTodos from workspaceId: ', workspaceId, ' todo: ', 0);
      return [];
    }
    console.debug('[DEBUG] TodoService.getTodos from workspaceId: ', workspaceId, ' todo: ', todo.length);
    let value = JSON.parse(todo) as Todo[];

    if (!filter) {
      return value;
    }
    value = this.handleFilter(filter, value);
    return value;
  }

  private handleFilter(filter: FilterTodoTableSchema, todos: Todo[]) {
    let value = todos;
    value = value.filter((t) => this.handleFilterInternal(t, filter));

    // search
    if (filter.search) {
      value = value.filter((t) => {
        return t.title.toLowerCase().includes(filter.search!.toLowerCase()) || t.tags.join(' ').toLowerCase().includes(filter.search!.toLowerCase());
      });
    }

    return value;
  }

  private handleFilterInternal(t: Todo, filter: FilterTodoTableSchema) {
    const { status, priority } = filter;

    if (t.deletedAt) {
      return false;
    }

    if (!this.checkStatus(t, status)) {
      return false;
    }

    if (!this.checkPriority(t, priority)) {
      return false;
    }

    if (!this.checkDueDate(t, filter)) {
      return false;
    }

    return true;
  }

  private checkStatus(t: Todo, status: string | undefined) {
    if (status && status === 'all') {
      return true;
    } else if (status && t.status !== status) {
      return false;
    }

    return true;
  }

  private checkPriority(t: Todo, priority: string | undefined) {
    if (priority && priority === 'all') {
      return true;
    } else if (priority && t.priority !== priority) {
      return false;
    }

    return true;
  }

  private checkDueDate(t: Todo, filter: FilterTodoTableSchema) {
    const { dueDateStart, dueDateEnd, includeNoDueDate } = filter;

    if (dueDateStart && dueDateEnd && t.dueDate) {
      if (t.dueDate < dueDateStart || t.dueDate > dueDateEnd) {
        return false;
      }
    }

    if (includeNoDueDate && t.dueDate) {
      return true;
    }

    return true;
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


    return value.filter(t => !!t.deletedAt);;
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

  async restoreTodoById(workspaceId: string, todoId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    todos[index].deletedAt = undefined;
    localStorage.setItem(storageKey, JSON.stringify(todos));
    console.debug('[DEBUG] TodoService.restoreTodoById from workspaceId: ', workspaceId, ' todoId: ', todoId);
    return todos[index];
  }

  async restoreTodyByIds(workspaceId: string, todoIds: string[]) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    todoIds.forEach((todoId) => {
      const index = todos.findIndex((t) => t.id === todoId);
      todos[index].deletedAt = undefined;
    });
    localStorage.setItem(storageKey, JSON.stringify(todos));
    console.debug('[DEBUG] TodoService.restoreTodoById from workspaceId: ', workspaceId, ' todoId: ', todoIds);
    return todos;
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

  async forceDeleteTodoByIds(workspaceId: string, todoIds: string[]) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    todoIds.forEach((todoId) => {
      const index = todos.findIndex((t) => t.id === todoId);
      todos.splice(index, 1);
    });
    localStorage.setItem(storageKey, JSON.stringify(todos));
    console.debug('[DEBUG] TodoService.deleteTodoById from workspaceId: ', workspaceId, ' todoId: ', todoIds);
    return todoIds;
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
  async deleteTodoByIds(workspaceId: string, todoIds: string[]) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    todoIds.forEach((todoId) => {
      const index = todos.findIndex((t) => t.id === todoId);
      // change deletedAt to current time
      todos[index].deletedAt = new Date();
    });
    localStorage.setItem(storageKey, JSON.stringify(todos));
    console.debug('[DEBUG] TodoService.deleteTodoByIds from workspaceId: ', workspaceId, ' todoId: ', todoIds);
    return todoIds;
  }

  async deleteAllTodos(workspaceId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    localStorage.removeItem(storageKey);
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

  async updateTodoSubTasks(workspaceId: string, todoId: string, subTasks: Todo['subTasks']) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const todos = this.getTodos(workspaceId);
    const index = todos.findIndex((t) => t.id === todoId);
    todos[index].subTasks = subTasks;
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }

  private getTodosWorkspaceKey(workspaceId: string) {
    return `todos-${workspaceId}`;
  }

  async clearTodos(workspaceId: string) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    localStorage.removeItem(storageKey);
  }

  async addMultipleTodos(workspaceId: string, todos: Todo[]) {
    const storageKey = this.getTodosWorkspaceKey(workspaceId);
    const currentTodos = this.getTodos(workspaceId);
    const newTodos = todos.map((todo) => {
      return { ...todo, id: `T-${currentTodos.length + 1}`, createdAt: new Date(), updatedAt: new Date() };
    });
    localStorage.setItem(storageKey, JSON.stringify([...currentTodos, ...newTodos]));
    return newTodos;
  }
}
const todoService = new TodoService();
export default todoService;
