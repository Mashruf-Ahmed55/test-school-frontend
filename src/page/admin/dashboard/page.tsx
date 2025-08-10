'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { axiosInstance } from '@/store/services/api';
import { FileText, GraduationCap, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalAssessments: number;
  passedAssessments: number;
  passRate: number;
  totalCertificates: number;
  totalQuestions: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    async function load() {
      try {
        const res = await axiosInstance.get('/api/v1/admin/get-system-stats', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'accessToken'
            )}`,
          },
        });
        if (!res.status) throw new Error('Forbidden');
        setStats(res.data.data);
      } catch (e: any) {
        setErr(e.message ?? 'Failed to load');
      }
    }
    load();
  }, []);

  if (err) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Alert variant="destructive">
          <AlertTitle>{'Unauthorized'}</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-5 md:grid-cols-3">
        <Card className="shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">
                {'Total Users'}
              </div>
              <div className="text-2xl font-semibold">
                {stats?.totalUsers ?? '—'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <FileText className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">{'Questions'}</div>
              <div className="text-2xl font-semibold">
                {stats?.totalQuestions ?? '—'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">
                {'Active Users'}
              </div>
              <div className="text-2xl font-semibold">
                {stats?.activeUsers ?? '—'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">
                {'Total Assessments'}
              </div>
              <div className="text-2xl font-semibold">
                {stats?.totalAssessments ?? '—'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">
                {'Total Passed Assessments'}
              </div>
              <div className="text-2xl font-semibold">
                {stats?.passedAssessments ?? '—'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">{'Pass Rate'}</div>
              <div className="text-2xl font-semibold">
                {stats?.passRate ?? '—'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">
                {'Total Certificates'}
              </div>
              <div className="text-2xl font-semibold">
                {stats?.totalCertificates ?? '—'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link to="/admin/users">{'Manage Users'}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/admin/questions">{'View Questions'}</Link>
        </Button>
      </div>
    </main>
  );
}
