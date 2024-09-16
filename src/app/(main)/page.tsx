import { DEFAULT_WORKSPACE_ID } from '@/app/(main)/todo/constant';
import TodoMainSection from '@/app/components/TodoMainSection';
import { cookies } from 'next/headers';

export default function Home() {
  const cookieStore = cookies();
  const workspaceId = cookieStore.get('workspaceId')?.value || DEFAULT_WORKSPACE_ID;
  return (
    <div className="">
      <TodoMainSection workspaceId={workspaceId} />
    </div>
  );
}
