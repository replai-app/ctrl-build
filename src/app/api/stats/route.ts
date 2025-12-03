import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: activity, error: activityError } = await supabase
      .from('user_activity')
      .select('activity_date, word_count, refinement_count')
      .eq('user_id', user.id)
      .gte('activity_date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('activity_date', { ascending: true });

    if (statsError && statsError.code !== 'PGRST116') {
      return NextResponse.json({ error: statsError.message }, { status: 500 });
    }

    if (activityError) {
      return NextResponse.json({ error: activityError.message }, { status: 500 });
    }

    const totalWords = stats?.total_words_refined || 0;
    const totalRefinements = stats?.total_refinements || 0;
    const avgVariance = stats?.average_variance || 94.0;
    
    const estimatedHours = totalWords > 0 ? (totalWords / 1000 * 0.3).toFixed(1) : '0.0';

    return NextResponse.json({
      quota: totalWords,
      savedTime: estimatedHours,
      avgVariance: avgVariance,
      activity: activity || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}