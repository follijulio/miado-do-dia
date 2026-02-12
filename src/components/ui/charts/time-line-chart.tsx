'use client';
import { Calendar } from '@/components/shadcn-ui/calendar';
import { addDays } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

export function TimeLineChart() {
  return (
    <div>
      <div className="invert">
        <CalendarDemo />
      </div>
    </div>
  );
}

function CalendarDemo() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
    />
  );
}
