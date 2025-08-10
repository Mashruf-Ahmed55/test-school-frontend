'use client';

import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useListUsersQuery } from '@/store/services/api';
import { ArrowLeftIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function AdminUsersPage() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data, isFetching, error, refetch } = useListUsersQuery({
    page,
    pageSize,
  });
  console.log(data);

  const columns = useMemo(
    () => [
      { key: 'email', header: 'Email' },
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
      { key: 'assessmentAttempts', header: 'Assessment Attempts' },
      { key: 'certificationLevel', header: 'Certification Level' },
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
      <Card className=" shadow-none">
        <CardHeader>
          <CardTitle>{'Users'}</CardTitle>
        </CardHeader>
        <CardContent className="shadow-none">
          {error ? (
            <Alert variant="destructive">
              <AlertTitle>{'Error'}</AlertTitle>
              <AlertDescription>{'Failed to load users.'}</AlertDescription>
            </Alert>
          ) : null}
          <DataTable
            loading={isFetching}
            columns={columns}
            data={data?.items ?? []}
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
