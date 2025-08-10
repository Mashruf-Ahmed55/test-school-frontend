'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { TimerIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function CountdownTimer({
  totalSeconds = 60,
  onExpire,
}: {
  totalSeconds?: number;
  onExpire?: () => void;
}) {
  const [left, setLeft] = useState<number>(totalSeconds);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    setLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    tickRef.current = window.setInterval(() => {
      setLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, []);

  useEffect(() => {
    if (left === 0 && onExpire) {
      onExpire();
    }
  }, [left, onExpire]);

  const mins = Math.floor(left / 60);
  const secs = left % 60;

  return (
    <div className="flex items-center gap-2">
      <TimerIcon className="h-4 w-4 text-emerald-600" />
      <div className="text-sm">{`${mins}:${secs
        .toString()
        .padStart(2, '0')}`}</div>
      {left <= 15 ? (
        <Alert className="ml-3 py-1 px-2 text-xs">
          <AlertDescription>
            {'Hurry up! Time is running out.'}
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
