import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function kmhToMps(kmh: number) {
  return kmh / 3.6;
}

export function mpsToKmh(mps: number) {
  return Math.round(mps * 3.6);
}