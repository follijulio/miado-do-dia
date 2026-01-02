"use client";

import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/root/main-layout";
import chartData from "@/mock/chart_data";
import { todos } from "@/mock/todos";
import Chart from "./../components/ui/charts/index";

export default function Page() {
  return (
    <MainLayout>
      <main className="flex flex-row gap-4 overflow-hidden min-h-0 h-full">
        <div className="h-96 w-1/2">
          <Chart.BarActive data={chartData} className="h-full w-full p-6" />
        </div>
        <div className="h-96 w-1/2">
          <Card.TodoList className="h-full w-full" todos={todos} />
        </div>
      </main>
    </MainLayout>
  );
}
