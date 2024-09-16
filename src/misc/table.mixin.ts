import { faker } from '@faker-js/faker';
import { Todo } from '@models/todo';
import { format, formatDistanceToNowStrict, isPast } from 'date-fns';

export function getDueDateLabel(item: Pick<Todo, 'dueDate' | 'createdAt'>) {
  if (!item.dueDate) {
    return 'No Due Date';
  }

  // if due date is in 1 week, 1 day, 2 day, show "Due in 1 week", "Due in 1 day", "Due in 2 days"
  // if due date is in past, show "Overdue by 1 week", "Overdue by 1 day", "Overdue by 2 days"
  // else show in format "dd MMM"
  if (isPast(item.dueDate)) {
    return `Overdue by ${formatDistanceToNowStrict(item.dueDate)}`;
  }

  return format(item.createdAt, 'dd MMM') + ' - ' + format(item.dueDate, 'dd MMM');
}
export function randomTodo(): Todo {
  return {
    title: faker.lorem.words(4),
    status: Array.from(['todo', 'in-progress', 'done'])[Math.floor(Math.random() * 3)] as Todo['status'],
    subTasks: [],
    tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    dueDate: faker.date.future(),
    description: '',
    createdAt: faker.date.past(),
    id: faker.database.mongodbObjectId(),
    updatedAt: faker.date.recent(),
  };
}

export function getPlaceValue(num: number): number {
  let place = 1;
  if (num < 10) {
    return place;
  }
  while (num / place >= 10) {
    place *= 10;
  }
  return place;
}
