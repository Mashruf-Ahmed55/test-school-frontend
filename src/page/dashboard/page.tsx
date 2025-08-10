'use client';

import { CertificateCard } from '@/components/certificate-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { axiosInstance } from '@/store/services/api';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

type Summary = {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  certificationLevel?: string;
  lastAssessmentDate?: string | null;
  assessmentAttempts?: number;
  accessToken: string;
};

export default function DashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const token =
    useAppSelector((s) => s.auth.accessToken) ||
    window.localStorage.getItem('accessToken');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    async function load() {
      try {
        const res = await axiosInstance.get('/api/v1/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.status) throw new Error('Unauthorized');
        const data = res.data;
        setSummary(data);
      } catch (e: any) {
        setErr(e.message ?? 'Failed to load');
      }
    }
    load();
  }, []);

  if (!user) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Alert variant="destructive">
          <AlertTitle>{'Not authenticated'}</AlertTitle>
          <AlertDescription className="flex items-center">
            <span>{'You are not logged in. Please login to continue.'}</span>
            <Link to="/auth/login" className=" underline">
              {'Login'}
            </Link>
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardContent className="space-y-3 p-6">
            <div className="text-sm text-muted-foreground">{`Welcome, ${
              user.name || user.email
            }`}</div>
            <div className="text-2xl font-semibold">{'Your Status'}</div>
            {summary ? (
              <>
                <div className="text-sm text-muted-foreground">
                  {'Highest Level: '}
                  <span className="font-medium">
                    {summary.certificationLevel ?? '—'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {'Step 1 Locked: '}
                  <span className="font-medium">
                    {summary.lastAssessmentDate ? 'Yes' : 'No'}
                  </span>
                </div>
              </>
            ) : err ? (
              <Alert variant="destructive">
                <AlertTitle>{'Error'}</AlertTitle>
                <AlertDescription>{err}</AlertDescription>
              </Alert>
            ) : (
              <div className="text-sm text-muted-foreground">
                {'Loading summary...'}
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link to="/exam/start">{'Start/Continue Exam'}</Link>
              </Button>
              {user.role !== 'student' ? (
                <Button variant="outline" asChild>
                  <Link to="/admin/dashboard">{'Admin'}</Link>
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
        <CertificateCard
          name={user.name || user.email}
          level={(user.certificationLevel as any) || 'A1'}
        />
      </div>
    </main>
  );
}
