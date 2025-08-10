import type React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useResetPasswordMutation,
  useSendOtpMutation,
} from '@/store/services/api';
import { useState } from 'react';

export default function ForgotPage() {
  const [sendOtp, { isLoading: sending }] = useSendOtpMutation();
  const [reset, { isLoading: resetting }] = useResetPasswordMutation();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [msg, setMsg] = useState<string>('');
  const [err, setErr] = useState<string>('');

  async function onRequest(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setMsg('');
    try {
      await sendOtp({ email }).unwrap();
      setMsg('OTP sent. Check your email.');
      setStep('reset');
    } catch (error: any) {
      setErr(error?.data?.message ?? 'Failed to send OTP');
    }
  }
  async function onReset(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setMsg('');
    try {
      await reset({ email, otp, password }).unwrap();
      setMsg('Password reset successfully. You can now login.');
    } catch (error: any) {
      setErr(error?.data?.message ?? 'Reset failed');
    }
  }

  return (
    <main className="container mx-auto max-w-md px-4 py-10">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>{'Password recovery'}</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'request' ? (
            <form onSubmit={onRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{'Email'}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {err ? (
                <Alert variant="destructive">
                  <AlertTitle>{'Error'}</AlertTitle>
                  <AlertDescription>{err}</AlertDescription>
                </Alert>
              ) : null}
              {msg ? (
                <Alert>
                  <AlertTitle>{'Info'}</AlertTitle>
                  <AlertDescription>{msg}</AlertDescription>
                </Alert>
              ) : null}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={onReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">{'OTP'}</Label>
                <Input
                  id="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{'New Password'}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {err ? (
                <Alert variant="destructive">
                  <AlertTitle>{'Error'}</AlertTitle>
                  <AlertDescription>{err}</AlertDescription>
                </Alert>
              ) : null}
              {msg ? (
                <Alert>
                  <AlertTitle>{'Info'}</AlertTitle>
                  <AlertDescription>{msg}</AlertDescription>
                </Alert>
              ) : null}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={resetting}
              >
                {resetting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
