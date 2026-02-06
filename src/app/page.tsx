'use client';

import Card from '@/components/ui/cards';
import MainLayout from '@/components/ui/root/main-layout';
import chartData from '@/mock/chart_data';
import { todos } from '@/mock/todos';
import Chart from '@/components/ui/charts';
import SortableCard from '@/components/ui/cards/sortable-card';

export default function Page() {
  const data =
    new Date().toLocaleDateString('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    }) || new Date();

  return (
    <MainLayout>
      <main className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
        <section className="shrink-0">
          <Card.HandDraw
            className="h-12"
            padding={4}
            curvature={0.5}
            scribble={1}
          >
            <div className="flex h-full w-full items-center justify-between px-4">
              <div />
              <div className="">
                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.&quot;
              </div>
              <div className="text-white">{data.toString()}</div>
            </div>
          </Card.HandDraw>
        </section>

        <section className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex h-full w-3/4 flex-col gap-2">
            <div className="flex h-1/2 w-full gap-2">
              <Chart.BarActive data={chartData} className="h-full w-1/2" />
              <Card.TodoList className="h-full w-1/2" todos={todos} />
            </div>
          </div>

          <aside className="w-1/4">
            <SortableCard />
          </aside>
        </section>
      </main>
    </MainLayout>
  );
}
