'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStartExamMutation } from '@/store/services/api';
import { useAppSelector } from '@/store/store';
import { Ban, Camera, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function StartExamPage() {
  const router = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const [startExam, { isLoading }] = useStartExamMutation();
  const [error, setError] = useState<string>('');
  const [proctoring, setProctoring] = useState<boolean>(true);
  const [mediaOk, setMediaOk] = useState<boolean>(false);

  useEffect(() => {
    // Attempt to preflight webcam if proctoring on
    async function ask() {
      if (!proctoring) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        stream.getTracks().forEach((t) => t.stop());
        setMediaOk(true);
      } catch {
        setMediaOk(false);
      }
    }
    ask();
  }, [proctoring]);

  async function handleStart(step: 1 | 2 | 3) {
    setError('');
    try {
      const res = await startExam({ step, perQuestionSeconds: 60 }).unwrap();
      console.log(res);
      // Navigate to test page with session id
      router(
        `/exam/test?sessionId=${encodeURIComponent(
          res.assessmentId
        )}&step=${step}`
      );
    } catch (e: any) {
      setError(e?.data?.message ?? 'Failed to start exam');
    }
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            {'Exam Integrity & Start'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!user ? (
            <Alert variant="destructive">
              <AlertTitle>{'Not authenticated'}</AlertTitle>
              <AlertDescription>{'Please login first.'}</AlertDescription>
            </Alert>
          ) : null}
          <div className="space-y-2">
            <div className="font-medium">{'Secure environment checklist'}</div>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>{'Timer auto-submits when time expires.'}</li>
              <li>
                {
                  'Navigation, copy/paste, right-click are restricted during the test.'
                }
              </li>
              <li>{'Optional webcam monitoring for integrity.'}</li>
              <li>{'Large screen recommended. Close other tabs/apps.'}</li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={proctoring ? 'default' : 'outline'}
              className={
                proctoring ? 'bg-emerald-600 hover:bg-emerald-700' : ''
              }
              onClick={() => setProctoring((p) => !p)}
            >
              {proctoring ? (
                <Camera className="mr-2 h-4 w-4" />
              ) : (
                <Ban className="mr-2 h-4 w-4" />
              )}
              {proctoring ? 'Proctoring enabled' : 'Proctoring disabled'}
            </Button>
            {proctoring ? (
              <span className="text-xs text-muted-foreground">
                {mediaOk ? 'Webcam ready' : 'Webcam permission not granted yet'}
              </span>
            ) : null}
          </div>

          {error ? (
            <Alert variant="destructive">
              <AlertTitle>{'Error'}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!user || isLoading}
              onClick={() => handleStart(1)}
            >
              {'Start Step 1 (A1 & A2)'}
            </Button>
            <Button
              variant="outline"
              disabled={!user || isLoading}
              onClick={() => handleStart(2)}
            >
              {'Start Step 2 (B1 & B2)'}
            </Button>
            <Button
              variant="outline"
              disabled={!user || isLoading}
              onClick={() => handleStart(3)}
            >
              {'Start Step 3 (C1 & C2)'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
