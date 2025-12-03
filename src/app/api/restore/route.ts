import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { historyId } = await request.json();

    if (!historyId) {
      return NextResponse.json({ error: 'History ID is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: historyItem, error } = await supabase
      .from('refinement_history')
      .select('output_text')
      .eq('id', historyId)
      .eq('user_id', user.id)
      .single();

    if (error || !historyItem) {
      return NextResponse.json({ error: 'History item not found' }, { status: 404 });
    }

    return NextResponse.json({ text: historyItem.output_text });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
