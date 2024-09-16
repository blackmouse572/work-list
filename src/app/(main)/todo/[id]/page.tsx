import TodoDetails from '@/app/(main)/todo/[id]/TodoDetails';
import { DEFAULT_WORKSPACE_NAME } from '@/app/(main)/todo/constant';
import { cookies } from 'next/headers';

type ToDoPageProps = {
  params: {
    id: string;
  };
};

export default function ToDoPage({ params: { id } }: ToDoPageProps) {
  const cookieStore = cookies();
  const workspaceId = cookieStore.get('workspaceId')?.value || DEFAULT_WORKSPACE_NAME;

  return <TodoDetails id={id} workspaceId={workspaceId} />;
}
