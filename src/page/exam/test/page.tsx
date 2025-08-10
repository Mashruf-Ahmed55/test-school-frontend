'use client';

import { QuestionCard } from '@/components/exam/question-card';
import { CountdownTimer } from '@/components/exam/timer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useSubmitExamMutation } from '@/store/services/api';
import type { AnswerPayload } from '@/types/types';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function TestPage() {
  const router = useNavigate();
  const [sp] = useSearchParams();
  const sessionId = sp.get('sessionId') ?? '';
  const step = Number(sp.get('step') ?? '1') as 1 | 2 | 3;

  const [duration, setDuration] = useState<number>(0);
  const [questions, setQuestions] = useState<
    { id: string; text: string; options: string[] }[]
  >([]);
  const [index, setIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [integrity, setIntegrity] = useState<{
    blurs: number;
    rightClicks: number;
    keyBlocks: number;
  }>({
    blurs: 0,
    rightClicks: 0,
    keyBlocks: 0,
  });
  const [error, setError] = useState<string>('');
  const [submitExam, { isLoading }] = useSubmitExamMutation();
  const videoRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Fetch session details
  useEffect(() => {
    const cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          `/api/exam/start?sessionId=${encodeURIComponent(sessionId)}`
        );
        if (!res.ok) throw new Error('Session not found');
        const data = await res.json();
        if (!cancelled) {
          setDuration(data.durationSeconds);
          setQuestions(data.questions);

          if (data.proctoring) {
            // Start recording
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false,
            });
            const rec = new MediaRecorder(stream);
            videoRef.current = rec;
            chunksRef.current = [];
            rec.ondataavailable = (e) => {
              if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            rec.start(1000);
          }
          // Request fullscreen
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
          }
        }
      } catch (e: any) {
        setError(e.message ?? 'Failed to load session');
      }
    }
    if (sessionId) load();
    return () => {
      if (videoRef.current && videoRef.current.state !== 'inactive') {
        videoRef.current.stop();
      }
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [sessionId]);

  // Integrity controls
  useEffect(() => {
    function onContext(e: MouseEvent) {
      e.preventDefault();
      setIntegrity((s) => ({ ...s, rightClicks: s.rightClicks + 1 }));
    }
    function onKey(e: KeyboardEvent) {
      const keys = ['c', 'v', 'x', 'a', 'Tab'];
      if ((e.ctrlKey || e.metaKey) && keys.includes(e.key)) {
        e.preventDefault();
        setIntegrity((s) => ({ ...s, keyBlocks: s.keyBlocks + 1 }));
      }
      // Block F12, PrintScreen
      if (e.key === 'F12') {
        e.preventDefault();
        setIntegrity((s) => ({ ...s, keyBlocks: s.keyBlocks + 1 }));
      }
    }
    function onBlur() {
      setIntegrity((s) => ({ ...s, blurs: s.blurs + 1 }));
    }
    window.addEventListener('contextmenu', onContext);
    window.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
    return () => {
      window.removeEventListener('contextmenu', onContext);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    const answered = Object.keys(answers).length;
    return Math.round((answered / questions.length) * 100);
  }, [answers, questions.length]);

  function setAnswer(qid: string, idx: number) {
    setAnswers((a) => ({ ...a, [qid]: idx }));
  }

  async function finishExam(reason: 'manual' | 'timeout') {
    try {
      if (videoRef.current && videoRef.current.state !== 'inactive') {
        videoRef.current.stop();
      }
    } catch {}
    try {
      const payload: AnswerPayload = {
        sessionId,
        answers,
        integrity: {
          blurs: integrity.blurs,
          rightClicks: integrity.rightClicks,
          keyBlocks: integrity.keyBlocks,
        },
        reason,
      };
      const res = await submitExam(payload).unwrap();
      router(
        `/exam/result?level=${encodeURIComponent(res.level)}&score=${
          res.score
        }&next=${res.nextAllowed ? '1' : '0'}`,
        { replace: true }
      );
    } catch (e: any) {
      setError(e?.data?.message ?? 'Failed to submit');
    }
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>{'Assessment'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <Alert variant="destructive">
              <AlertTitle>{'Error'}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">{`Step ${step} • ${questions.length} questions`}</div>
            <CountdownTimer
              totalSeconds={duration}
              onExpire={() => finishExam('timeout')}
            />
          </div>

          <Progress value={progress} className="h-2" />

          {questions.length > 0 ? (
            <div className="space-y-4">
              <QuestionCard
                key={questions[index].id}
                question={questions[index]}
                selected={answers[questions[index].id] ?? -1}
                onSelect={(optIdx) => setAnswer(questions[index].id, optIdx)}
              />
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                >
                  {'Previous'}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setIndex((i) => Math.min(questions.length - 1, i + 1))
                    }
                    disabled={index >= questions.length - 1}
                  >
                    {'Next'}
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => finishExam('manual')}
                    disabled={isLoading}
                  >
                    {'Submit'}
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {`Integrity signals: blurs=${integrity.blurs}, context=${integrity.rightClicks}, key blocks=${integrity.keyBlocks}`}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {'Loading questions...'}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
