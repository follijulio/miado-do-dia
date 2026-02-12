'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { CardContent, CardHeader } from '@/components/shadcn-ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/shadcn-ui/chart';
import { cn } from '@/lib/utils';
import { HandDrawCard } from '../cards/hand-drawn-card';
import Chart from './index';

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  task: {
    label: 'Tarefa',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

interface ChartBarActiveProps extends React.ComponentProps<'div'> {
  data: { date: string; task: number }[];
  title?: string;
}

export function ChartBarActive({
  className,
  data,
  title,
  ...props
}: ChartBarActiveProps) {
  const activeChart: keyof typeof chartConfig = 'task';

  return (
    <HandDrawCard
      padding={4}
      curvature={2}
      scribble={1}
      className={cn('flex flex-col overflow-hidden', className)}
      {...props}
    >
      <CardHeader className="p-6 pb-2">
        <h3 className="text-xl font-semibold">{title ?? 'My Activities'}</h3>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-80 w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={16}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                });
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="w-[150px] rounded-lg border-none bg-slate-900 text-white"
                  nameKey="task"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    });
                  }}
                />
              }
            />

            <Bar
              dataKey={activeChart}
              shape={<Chart.RoughBar />}
              fill="currentColor"
              className="fill-primary"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </HandDrawCard>
  );
}
