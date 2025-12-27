"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { CardContent, CardHeader } from "@/components/shadcn-ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/shadcn-ui/chart";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HandDrawCard } from "../cards/hand-drawn-card";
import Chart from "./index";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  task: {
    label: "task",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ChartBarActiveProps extends React.ComponentProps<"div"> {
  data: { date: string; task: number }[];
  title?: string;
}

export function ChartBarActive({
  className,
  data,
  title,
  ...props
}: ChartBarActiveProps) {
  const activeChart: keyof typeof chartConfig = "task";

  const N = data.length;
  const width = N * 30;
  return (
    <HandDrawCard
      padding={10}
      curvature={1}
      scribble={1}
      className={cn("", className)}
      {...props}
    >
      <CardHeader className="flex flex-col items-center border-b !p-0 sm:flex-row">
        {title ?? "Chart"}
      </CardHeader>
      <CardContent className="px-2 sm:p-6 w-full overflow-x-auto">
        <ScrollArea style={{ width: width }} className={"overflow-x-hidden"}>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={12}
                className="overflow-hidden"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  });
                }}
              />
              <YAxis tick />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    className="w-[150px] bg-black text-white rounded"
                    nameKey="task"
                    color="#ffffff"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      });
                    }}
                  />
                }
              />
              <Bar
                className="hover:bg-red-600"
                dataKey={activeChart}
                shape={<Chart.RoughBar />}
                fill="transparent"
                stroke="#ffffff"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </ScrollArea>
      </CardContent>
    </HandDrawCard>
  );
}
