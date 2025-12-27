import { Checkbox } from "@/components/shadcn-ui/checkbox";
import Todo from "@/domain/dtos/todo.dto";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Card from ".";

interface TodoListProps extends React.ComponentProps<"div"> {
  todos?: Todo[];
}

function TodoList({ className, todos, ...props }: TodoListProps) {
  return (
    <Card.HandDraw
      className={cn("flex h-full min-h-0 w-full flex-col p-5", className)}
      padding={10}
      curvature={1.2}
      scribble={2}
      {...props}
    >
      <div className="h-full overflow-y-auto">
        {todos?.map((item, i) => (
          <ul
            key={`${i}-${item.creation.toISOString()}`}
            className="border-b border-black/10 pb-1 "
          >
            <TodoCard todo={item} />
          </ul>
        ))}
      </div>
    </Card.HandDraw>
  );
}

interface TodoProps {
  todo: Todo;
}

const TodoCard = ({ todo }: TodoProps) => {
  const [mark, setMark] = useState<boolean>(todo.finished);
  const toMark = () => {
    setMark(!mark);
  };
  return (
    <li className="flex gap-2 transition-colors duration-1000">
      <Checkbox className="bg-black" checked={mark} onClick={toMark} />
      <span className={`flex gap-2 ${mark && "strikethrough-animate"}`}>
        {todo.title}
      </span>
    </li>
  );
};

export default TodoList;
