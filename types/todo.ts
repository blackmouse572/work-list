export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  subTasks: Todo[];
  createdAt: Date;
  dueDate?: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tags: string[];
}
