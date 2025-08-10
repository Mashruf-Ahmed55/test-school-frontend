'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function CertificateCard({
  level = 'A1',
}: {
  name?: string;
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{'Certificate'}</div>
          <div className="text-xl font-semibold">{`Level ${level}`}</div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          {'Download PDF'}
        </Button>
      </CardContent>
    </Card>
  );
}
