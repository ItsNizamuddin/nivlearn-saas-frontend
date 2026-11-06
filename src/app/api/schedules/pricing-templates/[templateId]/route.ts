import { NextResponse } from 'next/server';
import { getPricingTemplate } from '@/services/schedule.service';

/** Plans of a multi-plan batch, for the plan picker. */
export async function GET(_request: Request, { params }: RouteContext<'/api/schedules/pricing-templates/[templateId]'>) {
  const template = await getPricingTemplate((await params).templateId);
  if (!template) return NextResponse.json({ error: 'Pricing plans not found' }, { status: 404 });
  return NextResponse.json(template, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
  });
}
