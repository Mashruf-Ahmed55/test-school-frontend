'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function QuestionCard({
  question = { id: '', text: '', options: [] },
  selected = -1,
  onSelect = () => {},
}: {
  question?: { id: string; text: string; options: string[] };
  selected?: number;
  onSelect?: (index: number) => void;
}) {
  return (
    <Card className="border">
      <CardContent className="space-y-4 p-4">
        <div className="font-medium">{question.text}</div>
        <RadioGroup
          value={selected.toString()}
          onValueChange={(v) => onSelect(Number(v))}
          className="grid gap-2"
        >
          {question.options.map((opt, idx) => (
            <div
              key={`${question.id}-${idx}`}
              onClick={() => onSelect(idx)}
              className={`flex items-center rounded-lg border p-3 transition-colors ${
                selected === idx ? 'bg-emerald-50 border-emerald-200' : ''
              }`}
              data-state={selected === idx ? 'selected' : 'unselected'}
            >
              <RadioGroupItem
                value={idx.toString()}
                id={`${question.id}-${idx}`}
                className="sr-only"
              />
              <Label
                htmlFor={`${question.id}-${idx}`}
                className="w-full cursor-pointer"
              >
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
