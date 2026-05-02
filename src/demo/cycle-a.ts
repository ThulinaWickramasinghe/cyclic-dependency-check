import { fnB } from "./cycle-b.js";

/** Part of an intentional A → B → C → A cycle for madge demos. */
export function fnA(): string {
  return `a(${fnB()})`;
}
