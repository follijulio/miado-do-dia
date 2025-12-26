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
import { IoMdCheckbox } from "react-icons/io";
import { CustomRoughBar } from "./custom-rough-bar";
import { HandDrawCard } from "./hand-drawn-card";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", tarefas: 8 },
  { date: "2024-04-02", tarefas: 5 },
  { date: "2024-04-03", tarefas: 7 },
  { date: "2024-04-04", tarefas: 9 },
  { date: "2024-04-05", tarefas: 13 },
  { date: "2024-04-06", tarefas: 11 },
  { date: "2024-04-07", tarefas: 9 },
  { date: "2024-04-08", tarefas: 14 },
  { date: "2024-04-09", tarefas: 3 },
  { date: "2024-04-10", tarefas: 10 },
  { date: "2024-04-11", tarefas: 12 },
  { date: "2024-04-12", tarefas: 11 },
  { date: "2024-04-13", tarefas: 12 },
  { date: "2024-04-14", tarefas: 6 },
  { date: "2024-04-15", tarefas: 5 },
  { date: "2024-04-16", tarefas: 6 },
  { date: "2024-04-17", tarefas: 15 },
  { date: "2024-04-18", tarefas: 13 },
  { date: "2024-04-19", tarefas: 9 },
  { date: "2024-04-20", tarefas: 4 },
  { date: "2024-04-21", tarefas: 6 },
  { date: "2024-04-22", tarefas: 8 },
  { date: "2024-04-23", tarefas: 6 },
  { date: "2024-04-24", tarefas: 13 },
  { date: "2024-04-25", tarefas: 8 },
  { date: "2024-04-26", tarefas: 4 },
  { date: "2024-04-27", tarefas: 13 },
  { date: "2024-04-28", tarefas: 5 },
  { date: "2024-04-29", tarefas: 11 },
  { date: "2024-04-30", tarefas: 15 },
  { date: "2024-05-01", tarefas: 7 },
  { date: "2024-05-02", tarefas: 11 },
  { date: "2024-05-03", tarefas: 9 },
  { date: "2024-05-04", tarefas: 13 },
  { date: "2024-05-05", tarefas: 15 },
  { date: "2024-05-06", tarefas: 15 },
  { date: "2024-05-07", tarefas: 13 },
  { date: "2024-05-08", tarefas: 6 },
  { date: "2024-05-09", tarefas: 8 },
  { date: "2024-05-10", tarefas: 11 },
  { date: "2024-05-11", tarefas: 12 },
  { date: "2024-05-12", tarefas: 7 },
  { date: "2024-05-13", tarefas: 7 },
  { date: "2024-05-14", tarefas: 15 },
  { date: "2024-05-15", tarefas: 15 },
  { date: "2024-05-16", tarefas: 12 },
  { date: "2024-05-17", tarefas: 15 },
  { date: "2024-05-18", tarefas: 11 },
  { date: "2024-05-19", tarefas: 9 },
  { date: "2024-05-20", tarefas: 7 },
  { date: "2024-05-21", tarefas: 4 },
  { date: "2024-05-22", tarefas: 4 },
  { date: "2024-05-23", tarefas: 9 },
  { date: "2024-05-24", tarefas: 11 },
  { date: "2024-05-25", tarefas: 8 },
  { date: "2024-05-26", tarefas: 8 },
  { date: "2024-05-27", tarefas: 14 },
  { date: "2024-05-28", tarefas: 9 },
  { date: "2024-05-29", tarefas: 4 },
  { date: "2024-05-30", tarefas: 12 },
  { date: "2024-05-31", tarefas: 7 },
  { date: "2024-06-01", tarefas: 7 },
  { date: "2024-06-02", tarefas: 15 },
  { date: "2024-06-03", tarefas: 5 },
  { date: "2024-06-04", tarefas: 14 },
  { date: "2024-06-05", tarefas: 4 },
  { date: "2024-06-06", tarefas: 11 },
  { date: "2024-06-07", tarefas: 12 },
  { date: "2024-06-08", tarefas: 13 },
  { date: "2024-06-09", tarefas: 14 },
  { date: "2024-06-10", tarefas: 6 },
  { date: "2024-06-11", tarefas: 4 },
  { date: "2024-06-12", tarefas: 15 },
  { date: "2024-06-13", tarefas: 4 },
  { date: "2024-06-14", tarefas: 14 },
  { date: "2024-06-15", tarefas: 11 },
  { date: "2024-06-16", tarefas: 13 },
  { date: "2024-06-17", tarefas: 15 },
  { date: "2024-06-18", tarefas: 5 },
  { date: "2024-06-19", tarefas: 12 },
  { date: "2024-06-20", tarefas: 14 },
  { date: "2024-06-21", tarefas: 7 },
  { date: "2024-06-22", tarefas: 11 },
  { date: "2024-06-23", tarefas: 15 },
  { date: "2024-06-24", tarefas: 6 },
  { date: "2024-06-25", tarefas: 6 },
  { date: "2024-06-26", tarefas: 14 },
  { date: "2024-06-27", tarefas: 15 },
  { date: "2024-06-28", tarefas: 6 },
  { date: "2024-06-29", tarefas: 5 },
  { date: "2024-06-30", tarefas: 15 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  tarefas: {
    label: "tarefas",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarActive({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const activeChart: keyof typeof chartConfig = "tarefas";

  const N = chartData.length;
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
        Tarefas
        <IoMdCheckbox size={20} />
      </CardHeader>
      <CardContent className="px-2 sm:p-6 w-full overflow-x-auto">
        <ScrollArea style={{ width: width }} className={"overflow-x-hidden"}>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={chartData}>
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
                content={
                  <ChartTooltipContent
                    className="w-[150px] bg-black text-white rounded "
                    nameKey="tarefas"
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
                dataKey={activeChart}
                shape={<CustomRoughBar />}
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
