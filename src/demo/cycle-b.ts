import { fnC } from "./cycle-c.js";

export function fnB(): string {
  return `b(${fnC()})`;
}
