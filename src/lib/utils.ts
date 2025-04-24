import { clsx, type ClassValue } from "clsx";
import { formatInTimeZone } from "date-fns-tz";
import { sub } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import lodash from "lodash";

import { Dates } from "~/types/sales";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDate(date: Date) {
  return formatInTimeZone(date, "America/Sao_Paulo", "yyyy-MM-dd", {
    locale: ptBR,
  });
}

export const getPercentage = (x: number, y: number) => {
  if (!x) return -100;
  return Number(((100 * (y - x)) / x).toFixed(2));
};

export const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

export const isArray = (obj: unknown): boolean => Array.isArray(obj);

export const isArrayEmpty = (obj: unknown) =>
  isArray(obj) && (obj as unknown[]).length === 0;

export const sumBy = <T>(obj: Array<T> | undefined, prop: keyof T): number => {
  if (!obj || isArrayEmpty(obj)) return 0;
  return lodash.sumBy(obj, (item) => Number(item[prop]));
};

export const generateBetweenDates = (date: Dates): string[] => {
  let dateInitial = toDate(new Date());
  const dateFinal = toDate(new Date());

  if (date === Dates.Week) dateInitial = toDate(sub(new Date(), { weeks: 1 }));
  else if (date === Dates.Month)
    dateInitial = toDate(sub(new Date(), { months: 1 }));

  return [dateInitial, dateFinal];
};
