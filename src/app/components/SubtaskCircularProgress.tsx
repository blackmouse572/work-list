import { Todo } from '@models/todo';
import { CircularProgress } from '@nextui-org/progress';

function SubtaskCircularProgress({ item }: { item: Pick<Todo, 'subTasks'> }) {
  if (item.subTasks.length < 1) return <CircularProgress size="sm" showValueLabel value={100} color="success" />;
  const progressSubTasks = item.subTasks.filter((subTask) => subTask.status === 'done').length;
  return (
    <CircularProgress
      size="sm"
      showValueLabel
      value={(progressSubTasks / item.subTasks.length) * 100}
      color={progressSubTasks === item.subTasks.length ? 'success' : 'primary'}
    />
  );
}

export default SubtaskCircularProgress;
