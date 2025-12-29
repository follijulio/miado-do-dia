"use client";

import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Input } from "@/components/shadcn-ui/input";
import Todo from "@/domain/dtos/todo.dto";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import Card from ".";

interface TodoListProps extends React.ComponentProps<"div"> {
  todos?: Todo[];
}

function TodoList({ className, todos, ...props }: TodoListProps) {
  return (
    <Card.HandDraw
      className={cn(
        "flex h-full min-h-0 w-full flex-col p-6 justify-center",
        className
      )}
      padding={10}
      curvature={1.2}
      scribble={2}
      {...props}
    >
      <div className="h-1/12 flex flex-col justify-center ">
        <h2>Todos</h2>
        <div className="h-px w-full bg-white" />
      </div>
      <section className="h-6/8 overflow-y-auto">
        {todos?.map((item, i) => (
          <div
            key={`${i}-${item.creation.toISOString()}`}
            className="border-b border-black/10 pb-1 "
          >
            <TodoCard todo={item} />
          </div>
        ))}
      </section>
      <div className="flex-1 w-full p-4 flex items-center">
        <div className="relative w-full">
          <Input className="w-full pr-10" />
          <HiPencil
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </Card.HandDraw>
  );
}

interface TodoProps {
  todo: Todo;
}

const TodoCard = ({ todo }: TodoProps) => {
  const [mark, setMark] = useState<boolean>(todo.finished);
  const toggleMark = () => {
    setMark(!mark);
  };
  return (
    <li className="flex gap-2 transition-colors duration-1000 justify-between px-4">
      <div className="flex gap-2 items-center">
        <Checkbox className="bg-black" checked={mark} onClick={toggleMark} />
        <span className={`flex gap-2 ${mark && "strikethrough-animate text-red-300"}`}>
          {todo.title}
        </span>
      </div>
      <FaEdit
        className="hover:scale-125 duration-300 cursor-pointer  text-gray-400"
        size={20}
      />
    </li>
  );
};

export default TodoList;
