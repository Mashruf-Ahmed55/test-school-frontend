import type React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/store/services/api';
import { setTokens, setUser } from '@/store/slices/auth-slice';
import { useAppDispatch } from '@/store/store';
import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email, password }).unwrap();
      console.log();
      dispatch(setTokens({ accessToken: res.accessToken }));
      dispatch(setUser(res.data));
      router('/exam/start');
    } catch (err: any) {
      setError(err?.data?.message ?? 'Login failed');
    }
  }

  return (
    <main className="container mx-auto max-w-md px-4 py-10">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            {'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{'Email'}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
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
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
            <div className="flex items-center justify-between text-sm">
              <Link
                to="/auth/forgot"
                className="underline text-muted-foreground"
              >
                {'Forgot password?'}
              </Link>
              <Link to="/auth/register" className="underline">
                {'Create account'}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
