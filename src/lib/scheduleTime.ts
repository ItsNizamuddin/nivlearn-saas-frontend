/*
 * Schedule times arrive as wall-clock strings ("2026-10-05T10:00") in the batch's own
 * timezone. These helpers turn them into real instants and format them for a viewer.
 */

const WALL_TIME = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/;

/** Offset (ms) of `zone` from UTC at `date`. */
function zoneOffset(zone: string, date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return asUtc - date.getTime();
}

/** True when Intl accepts the zone (an unknown zone makes formatting throw). */
export function isValidTimeZone(zone?: string): zone is string {
  if (!zone) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: zone });
    return true;
  } catch {
    return false;
  }
}

/** The instant a wall time in `zone` refers to. Strings with an explicit offset are used as is. */
export function wallTimeToDate(wall: string | undefined, zone?: string): Date | null {
  if (!wall) return null;
  if (/[zZ]|[+-]\d{2}:?\d{2}$/.test(wall)) {
    const date = new Date(wall);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const m = WALL_TIME.exec(wall);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0));
  if (!isValidTimeZone(zone)) return new Date(guess);
  // Two passes settle the offset across DST changes.
  let ts = guess - zoneOffset(zone, new Date(guess));
  ts = guess - zoneOffset(zone, new Date(ts));
  return new Date(ts);
}

/** Viewer's zone: the geo-detected one when valid, else the browser's. */
export function viewerTimeZone(preferred?: string) {
  if (isValidTimeZone(preferred)) return preferred;
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const fmt = (date: Date, zone: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: zone, ...options }).format(date);

export const formatDay = (date: Date, zone: string) => fmt(date, zone, { day: '2-digit', month: 'short', year: 'numeric' });

export const formatShortDay = (date: Date, zone: string) => fmt(date, zone, { day: '2-digit', month: 'short' });

export const formatTime = (date: Date, zone: string) => fmt(date, zone, { hour: 'numeric', minute: '2-digit' });

export function zoneAbbreviation(date: Date, zone: string) {
  return (
    new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'short' })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')?.value ?? zone
  );
}

export function hourIn(date: Date, zone: string) {
  return Number(fmt(date, zone, { hour: 'numeric', hourCycle: 'h23' }));
}

export type DayPeriod = 'early-morning' | 'morning' | 'afternoon' | 'evening';

export function dayPeriod(hour: number): DayPeriod {
  if (hour < 9) return 'early-morning';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

interface TimedSchedule {
  startsAt?: string;
  endsAt?: string;
  timeZone?: string;
  sessionMinutes?: number;
}

/**
 * First / last day and the daily class window of a batch.
 * `endsAt` holds the last day *and* the daily end time, so the session end is that
 * time on the first day (or start + session length when there is no end).
 */
export function scheduleWindow(schedule: TimedSchedule) {
  const start = wallTimeToDate(schedule.startsAt, schedule.timeZone);
  if (!start) return null;
  const lastDay = wallTimeToDate(schedule.endsAt, schedule.timeZone);
  const endClock = schedule.endsAt?.split('T')[1];
  const startDay = schedule.startsAt?.split('T')[0];
  let sessionEnd = endClock && startDay ? wallTimeToDate(`${startDay}T${endClock}`, schedule.timeZone) : null;
  if ((!sessionEnd || sessionEnd <= start) && schedule.sessionMinutes) {
    sessionEnd = new Date(start.getTime() + schedule.sessionMinutes * 60_000);
  }
  return { start, lastDay: lastDay ?? start, sessionEnd: sessionEnd && sessionEnd > start ? sessionEnd : null };
}
