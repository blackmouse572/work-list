import { faker } from '@faker-js/faker';
import { IconName } from '@models/name';
import { Todo } from '@models/todo';
import type { User } from '@models/user';

export function generateUsers(amount: number = 10) {
  const users: User[] = [];

  for (let i = 0; i < amount; i++) {
    users.push({
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      email: faker.internet.email(),
      role: 'user',
      status: 'active',
      updatedAt: faker.date.recent(),
    });
  }

  return users;
}
export const statusColorMap: Record<
  Todo["status"] | "all",
  "primary" | "success" | "warning" | "danger" | "default"
> = {
  done: "success",
  "in-progress": "warning",
  todo: "default",
  all: "primary",
};

export const priorityColorMap: Record<
  Todo["priority"] | "all",
  "success" | "warning" | "danger" | "default"
> = {
  high: "danger",
  low: "success",
  medium: "warning",
  all: "default",
};

export const priorityIconMap: Record<Todo["priority"] | 'all', IconName> = {
  high: 'tabler/baseline-density-small',
  low: 'tabler/baseline-density-large',
  medium: 'tabler/baseline-density-medium',
  all: 'tabler/baseline-density-medium',
}