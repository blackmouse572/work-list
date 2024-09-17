export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  subTasks: Pick<Todo, 'id' | 'title' | 'status' | 'priority'>[];
  createdAt: Date;
  dueDate?: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tags: string[];
}
