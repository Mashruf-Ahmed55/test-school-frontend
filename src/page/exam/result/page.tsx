'use client';

import { CertificateCard } from '@/components/certificate-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Link, useSearchParams } from 'react-router';

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const level = (searchParams.get('level') ?? 'A1') as
    | 'A1'
    | 'A2'
    | 'B1'
    | 'B2'
    | 'C1'
    | 'C2';
  const score = Number(searchParams.get('score') ?? 0);
  const nextAllowed = searchParams.get('next') === '1';

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>{'Your Result'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-muted-foreground">{`Score: ${score}%`}</div>
          <CertificateCard name="Candidate" level={level} />
          <div className="flex gap-3">
            {nextAllowed ? (
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/exam/start">{'Proceed to next step'}</Link>
              </Button>
            ) : null}
            <Button asChild variant="outline">
              <Link to="/">{'Back to Home'}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
