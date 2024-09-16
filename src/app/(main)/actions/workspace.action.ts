'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function saveWorkspaceId(workspaceId: string) {
  cookies().set('workspaceId', workspaceId, { path: '/' });
  revalidatePath('/');
  return workspaceId;
}

export async function getWorkspaceId() {
  const cookieStore = cookies();
  const workspaceId = cookieStore.get('workspaceId')?.value;

  return workspaceId;
}
