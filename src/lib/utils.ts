import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  dayjs.extend(relativeTime);
  dayjs.locale('pt-BR');
  return dayjs(dateString).format('DD/MM/YYYY HH:mm');
}
