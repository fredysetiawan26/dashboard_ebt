import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateMonth(date, newFormat) {
  const fm = newFormat || 'dd MMM';

  return date ? format(new Date(date), fm) : '';
}

export function fDateConversion(date, newFormat) {
  const fm = newFormat || 'yyyy-MM-dd';

  return date ? format(new Date(date), String(fm)) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimeHour(date, newFormat) {
  const fm = newFormat || 'HH:mm';

  return date ? format(new Date(date), fm) : '';
}

export function fHour(date, newFormat) {
  const fm = newFormat || 'HH';

  return date ? format(new Date(date), fm) : '';
}

export function fUTCToLocalTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date).toLocaleString(), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
