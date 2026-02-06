'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, GripVertical } from 'lucide-react';
import { Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import Card from '.';

type NoteItem = {
  id: string;
  content: string;
};

const initialData: NoteItem[] = [
  {
    id: '1',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: '2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse adipisci, dolores necessitatibus laudantium corrupti aliquam perferendis dolorum accusamus cupiditate fugiat sequi provident quia? Repellat, rem culpa? Vero similique a laborum?',
  },
  {
    id: '3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse adipisci, dolores necessitatibus laudantium corrupti aliquam perferendis dolorum accusamus cupiditate fugiat sequi provident quia? Repellat, rem culpa? Vero similique a laborum?',
  },
];

interface ItemVisualProps {
  item: NoteItem;
  style?: React.CSSProperties;
  listeners?: Record<string, unknown>;
  attributes?: React.HTMLAttributes<HTMLElement>;
  isDragging?: boolean;
  isOverlay?: boolean;
}

function ItemVisual({
  item,
  style,
  listeners,
  attributes,
  isDragging,
  isOverlay,
}: ItemVisualProps) {
  const getDeterministicRandom = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs((hash % 10) / 10);
  };

  const [scr] = useState(() => getDeterministicRandom(item.id));

  return (
    <div style={style} className="">
      <Card.HandDraw
        padding={4}
        curvature={2}
        scribble={scr + 0.5}
        className={cn(
          'p-2',
          (isDragging || isOverlay) && 'shadow-lg',
          isOverlay && 'cursor-grabbing'
        )}
      >
        <div className="flex h-full flex-row items-center gap-2">
          <div className="cursor flex h-full touch-manipulation flex-col items-stretch gap-8 rounded-md p-1 text-slate-400">
            <button
              type="button"
              onClick={() => console.log('delete')}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Trash className="h-4 w-4 transition-colors hover:text-red-500" />
            </button>
            <div
              className={cn(
                'cursor-grab active:cursor-grabbing',
                isOverlay && 'cursor-grabbing'
              )}
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 transition-colors hover:cursor-grab hover:text-white active:cursor-grabbing" />
            </div>
            <button
              type="button"
              onClick={() => console.log('edit')}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Edit className="h-4 w-4 transition-colors hover:text-blue-500" />
            </button>
          </div>
          <div className="text-white">{item.content}</div>
        </div>
      </Card.HandDraw>
    </div>
  );
}

function SortableCard({ item }: { item: NoteItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef}>
      <ItemVisual
        item={item}
        style={style}
        attributes={attributes}
        listeners={listeners}
        isDragging={isDragging}
      />
    </div>
  );
}

export default function MuralBoard() {
  const [items, setItems] = useState<NoteItem[]>(initialData);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const activeItem = items.find((x) => x.id === activeId);

  return (
    <Card.HandDraw
      className="h-full w-full p-6"
      padding={4}
      curvature={2}
      scribble={1}
    >
      <h1 className="mb-6 text-2xl font-bold text-slate-200">My notes</h1>

      <DndContext
        id="mural"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <SortableCard key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeItem ? (
            <ItemVisual item={activeItem} isOverlay={true} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Card.HandDraw>
  );
}
