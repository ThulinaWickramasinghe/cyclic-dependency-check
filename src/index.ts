/**
 * Demo entry: importing the sample modules pulls them into the dependency graph.
 */
import { fnA } from "./demo/cycle-a.js";

export function runDemo(): string {
  return fnA();
}
