'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useListQuestionsQuery } from '@/store/services/api';
import { ArrowLeftIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function AdminQuestionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [levelFilter, setLevelFilter] = useState<string | undefined>('');

  const { data, isFetching, refetch } = useListQuestionsQuery({
    page,
    pageSize,
    levels: levelFilter ? [levelFilter] : undefined,
  });

  console.log(data);
  const columns = useMemo(
    () => [
      { key: 'competency', header: 'Competency' },
      { key: 'level', header: 'Level' },
      { key: 'text', header: 'Question' },
    ],
    []
  );
  const back = () => {
    window.history.back();
  };
  return (
    <main className="container mx-auto px-4 py-10">
      <Button
        onClick={back}
        className="mb-4 bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
      >
        <ArrowLeftIcon />
        Back
      </Button>
      <Card className="shadow-none">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{'Questions'}</CardTitle>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">{'Level'}</Label>
            <Select
              value={levelFilter}
              onValueChange={(v) => setLevelFilter(v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'all'}>{'All'}</SelectItem>
                {levels.map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            loading={isFetching}
            columns={columns as any}
            data={(data?.items ?? []).map((q: any) => ({
              competency: q.competency,
              level: q.level,
              text: q.text,
            }))}
            total={data?.total ?? 0}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onRefresh={() => refetch()}
          />
        </CardContent>
      </Card>
    </main>
  );
}
