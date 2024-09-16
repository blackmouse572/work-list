import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const workspaceId = formData.get('workspaceId');

  if (!workspaceId) {
    return Response.json({ error: 'workspaceId is required' }, { status: 400 });
  }
  console.log('workspaceId', workspaceId);
  cookies().set('workspaceId', workspaceId.toString(), { path: '/' });

  return redirect(`/main/todo/${workspaceId}`);
}
