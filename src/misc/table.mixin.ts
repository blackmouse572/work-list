import { Todo } from '@models/todo';
import { ButtonProps } from '@nextui-org/button';
import { format, intlFormatDistance, isAfter, isBefore, } from 'date-fns';
export function getDueDateColor(item: Pick<Todo, 'dueDate' | 'createdAt'>): ButtonProps['color'] {
  if (!item.dueDate) {
    return 'default';
  }
  if (isBefore(item.dueDate, new Date())) {
    return 'danger';
  }
  return 'success';
}
export function getDueDateLabel(item: Pick<Todo, 'dueDate' | 'createdAt'>) {
  if (!item.dueDate) {
    return 'No Due Date';
  }

  // if due date is in 1 week, 1 day, 2 day, show "Due in 1 week", "Due in 1 day", "Due in 2 days"
  // if due date is in past, show "Overdue by 1 week", "Overdue by 1 day", "Overdue by 2 days"
  // else show in format "dd MMM"
  const lastWeek = new Date().setDate(new Date().getDate() - 7);
  if (isAfter(item.dueDate, lastWeek)) {
    const diff = intlFormatDistance(item.dueDate, new Date(), {
      numeric: 'auto'
    });
    return `Overdue by ${diff}`;
  }

  return format(item.createdAt, 'dd MMM') + ' - ' + format(item.dueDate, 'dd MMM');
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
