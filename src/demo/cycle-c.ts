import { fnA } from "./cycle-a.js";

export function fnC(): string {
  return `c(${fnA()})`;
}
