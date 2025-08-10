import type { Level } from '../types/types';

export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const STEP_LEVELS: Record<1 | 2 | 3, Level[]> = {
  1: ['A1', 'A2'],
  2: ['B1', 'B2'],
  3: ['C1', 'C2'],
};

// Scoring thresholds per spec
export function evaluateStep1(scorePct: number): {
  level: 'fail' | 'A1' | 'A2';
  proceed: boolean;
} {
  if (scorePct < 25) return { level: 'fail', proceed: false };
  if (scorePct < 50) return { level: 'A1', proceed: false };
  if (scorePct < 75) return { level: 'A2', proceed: false };
  return { level: 'A2', proceed: true };
}

export function evaluateStep2(scorePct: number): {
  level: 'A2' | 'B1' | 'B2';
  proceed: boolean;
} {
  if (scorePct < 25) return { level: 'A2', proceed: false };
  if (scorePct < 50) return { level: 'B1', proceed: false };
  if (scorePct < 75) return { level: 'B2', proceed: false };
  return { level: 'B2', proceed: true };
}

export function evaluateStep3(scorePct: number): {
  level: 'B2' | 'C1' | 'C2';
  proceed: boolean;
} {
  if (scorePct < 25) return { level: 'B2', proceed: false };
  if (scorePct < 50) return { level: 'C1', proceed: false };
  return { level: 'C2', proceed: false };
}
