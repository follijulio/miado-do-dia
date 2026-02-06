'use client';

import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { HiPencil } from 'react-icons/hi';
import { MdDragIndicator } from 'react-icons/md';
import Card from '.';
import { TodoDTO } from './../../../domain/dtos/todo.dto';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoListProps extends React.ComponentProps<'div'> {
  todos?: TodoDTO[];
}

interface TodoItemVisualProps {
  todo: TodoDTO;
  isDragging?: boolean;
  isOverlay?: boolean;
  listeners?: Record<string, unknown>;
  attributes?: React.HTMLAttributes<HTMLElement>;
  style?: React.CSSProperties;
  onToggle?: (id: string) => void;
}

const TodoItemVisual = ({
  todo,
  isDragging,
  isOverlay,
  listeners,
  attributes,
  style,
  onToggle,
}: TodoItemVisualProps) => {
  const isChecked = !!todo.completedAt;

  return (
    <li
      style={style}
      className={cn(
        'flex items-center justify-between gap-2 rounded-sm px-2 py-3 transition-transform',
        isOverlay
          ? 'rotate-1 bg-white text-black shadow-xl ring-1 ring-black/10'
          : 'hover:bg-black/5',
        isDragging ? 'opacity-30' : 'opacity-100'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          {...listeners}
          {...attributes}
          className={cn(
            'cursor-grab p-1 text-gray-300 hover:text-gray-600 active:cursor-grabbing',
            isOverlay && 'cursor-grabbing text-gray-600'
          )}
        >
          <MdDragIndicator size={20} />
        </div>

        <div
          onPointerDown={(e) => e.stopPropagation()}
          className="flex items-center"
        >
          <Checkbox
            className={cn(isOverlay ? 'border-black' : '')}
            id={`todo-${todo.id}`}
            checked={isChecked}
            onCheckedChange={() => onToggle && onToggle(todo.id)}
          />
        </div>

        <label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            'cursor-pointer text-sm leading-none font-medium transition-all select-none',
            isChecked && 'strikethrough-animate text-red-400'
          )}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {todo.title}
        </label>
      </div>

      <div onPointerDown={(e) => e.stopPropagation()}>
        <FaEdit
          className="cursor-pointer text-gray-400 transition-all hover:scale-110 hover:text-black"
          size={18}
        />
      </div>
    </li>
  );
};

function SortableTodoItem({
  todo,
  onToggle,
}: {
  todo: TodoDTO;
  onToggle: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className="border-b border-black/5 last:border-0">
      <TodoItemVisual
        todo={todo}
        style={style}
        listeners={listeners}
        attributes={attributes}
        isDragging={isDragging}
        onToggle={onToggle}
      />
    </div>
  );
}

function TodoList({ className, todos = [], ...props }: TodoListProps) {
  const [items, setItems] = useState<TodoDTO[]>(todos);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggleTodo = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completedAt: item.completedAt ? undefined : new Date(),
          };
        }
        return item;
      })
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
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

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <Card.HandDraw
      className={cn('h-full w-full p-6', className)}
      padding={4}
      curvature={2}
      scribble={1}
      {...props}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 shrink-0">
          <h2 className="text-xl font-semibold">Todos</h2>
          <div className="mt-2 h-px w-full bg-black/20" />
        </div>

        <section className="custom-scrollbar flex-1 overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="flex flex-col">
                {items.map((item) => (
                  <SortableTodoItem
                    key={item.id}
                    todo={item}
                    onToggle={handleToggleTodo}
                  />
                ))}
              </ul>
            </SortableContext>

            <DragOverlay adjustScale={true}>
              {activeItem ? (
                <div className="border-none">
                  <TodoItemVisual todo={activeItem} isOverlay />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </section>

        <div className="mt-4 shrink-0 pt-2">
          <div className="relative w-full">
            <Input
              placeholder="Adicionar nova tarefa..."
              className="w-full pr-10 focus-visible:ring-black"
            />
            <HiPencil
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-black"
              size={20}
            />
          </div>
        </div>
      </div>
    </Card.HandDraw>
  );
}

export default TodoList;
