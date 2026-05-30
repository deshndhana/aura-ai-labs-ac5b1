import { NextResponse } from 'next/server';
import { deleteProject } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: any }) {
  try {
    const resolvedParams = await params;
    const success = await deleteProject(resolvedParams.id);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
