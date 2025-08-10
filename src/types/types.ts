export type Role = 'admin' | 'student' | 'supervisor';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  certificationLevel?: string;
  lastAssessmentDate?: string | null;
  assessmentAttempts?: number;
}


export type Question = {
  id: string;
  competency: number; // 1..22
  level: Level;
  text: string;
  options: string[];
  correctIndex: number;
};

export type ExamSession = {
  id: string;
  userId: string;
  step: 1 | 2 | 3;
  questionIds: string[];
  durationSeconds: number;
  perQuestionSeconds: number;
  startedAt: number;
  expiresAt: number;
  proctoring: boolean;
};

export type AnswerPayload = {
  sessionId: string;
  answers: Record<string, number>;
  integrity: { blurs: number; rightClicks: number; keyBlocks: number };
  reason: 'manual' | 'timeout';
};
