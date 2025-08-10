import type React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from '@/store/services/api';
import { MailCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function RegisterPage() {
  const router = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: sending }] = useSendOtpMutation();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      await registerUser({ email, password, name }).unwrap();
      setOtpSent(true);
      setInfo('OTP sent to your email. Check inbox or spam.');
    } catch (err: any) {
      setError(err?.data?.message ?? 'Registration failed');
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      await verifyOtp({ email, otp }).unwrap();
      setInfo('Email verified. You can now login.');
      setTimeout(() => router('/auth/login'), 1000);
    } catch (err: any) {
      setError(err?.data?.message ?? 'OTP verification failed');
    }
  }

  return (
    <main className="container mx-auto max-w-md px-4 py-10">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailCheck className="h-5 w-5 text-emerald-600" />
            {'Create account'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{'Full name'}</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="password">{'Password'}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error ? (
                <Alert variant="destructive">
                  <AlertTitle>{'Error'}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              {info ? (
                <Alert>
                  <AlertTitle>{'Info'}</AlertTitle>
                  <AlertDescription>{info}</AlertDescription>
                </Alert>
              ) : null}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading || sending}
              >
                {isLoading || sending ? 'Submitting...' : 'Register'}
              </Button>
              <div className="text-sm text-right">
                <Link to="/auth/login" className="underline">
                  {'Already have an account?'}
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={onVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">{'Enter OTP'}</Label>
                <Input
                  id="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              {error ? (
                <Alert variant="destructive">
                  <AlertTitle>{'Error'}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              {info ? (
                <Alert>
                  <AlertTitle>{'Info'}</AlertTitle>
                  <AlertDescription>{info}</AlertDescription>
                </Alert>
              ) : null}
              <div className="flex gap-2 flex-col">
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={verifying}
                >
                  {verifying ? 'Verifying...' : 'Verify OTP'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={async () => {
                    setError(null);
                    setInfo(null);
                    try {
                      await sendOtp({ email }).unwrap();
                      setInfo('OTP resent.');
                    } catch (err: any) {
                      setError(err?.data?.message ?? 'Failed to resend OTP');
                    }
                  }}
                >
                  {'Resend OTP'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
