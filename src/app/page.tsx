"use client";

import Card from "@/components/ui/cards";
import chartData from "@/mock/chat_data";
import { todos } from "@/mock/todos";
import Chart from "./../components/ui/charts/index";

export default function Page() {
  return (
    <main className="flex flex-row g  -8 overflow-hidden pt-4 min-h-0  h-full">
      <div className="h-96 w-1/2">
        <Chart.BarActive data={chartData} className="h-full w-full p-6" />
      </div>
      <div className="h-96 w-1/2">
        <Card.TodoList className="h-full w-full" todos={todos} />
      </div>
    </main>
  );
}
