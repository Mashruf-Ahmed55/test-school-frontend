'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMemo } from 'react';

type Column = { key: string; header: string };

export function DataTable({
  columns = [],
  data = [],
  total = 0,
  page = 1,
  pageSize = 10,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  loading = false,
  onRefresh = () => {},
}: {
  columns?: Column[];
  data?: any[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (p: number) => void;
  onPageSizeChange?: (s: number) => void;
  loading?: boolean;
  onRefresh?: () => void;
}) {
  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  );
  return (
    <Card className="p-2 shadow-none">
      <div className="flex items-center justify-between p-2">
        <div className="text-sm text-muted-foreground">{`Total: ${total}`}</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? '…' : 'Refresh'}
          </Button>
          <Input
            type="number"
            min={5}
            max={100}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 w-20"
          />
        </div>
      </div>
      <Table>
        <TableCaption>{loading ? 'Loading...' : ''}</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key}>{c.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((c) => (
                <TableCell key={c.key}>{String(row[c.key] ?? '')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          {'Prev'}
        </Button>
        <div className="text-sm">{`Page ${page} of ${pageCount}`}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          disabled={page >= pageCount}
        >
          {'Next'}
        </Button>
      </div>
    </Card>
  );
}
