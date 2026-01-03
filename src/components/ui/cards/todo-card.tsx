'use client'

import { Checkbox } from '@/components/shadcn-ui/checkbox'
import { Input } from '@/components/shadcn-ui/input'
import Todo from '@/domain/dtos/todo.dto'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'
import Card from '.'

interface TodoListProps extends React.ComponentProps<'div'> {
  todos?: Todo[]
}

function TodoList({ className, todos, ...props }: TodoListProps) {
  return (
    <Card.HandDraw
      className={cn('h-full min-h-0 w-full p-10', className)}
      curvature={1.2}
      scribble={2}
      {...props}
    >
      <div className="flex h-full w-full flex-col justify-center">
        <div className="flex h-1/12 flex-col justify-center">
          <h2>Todos</h2>
          <div className="h-px w-full bg-white" />
        </div>
        <section className="h-6/8 overflow-y-auto">
          {todos?.map((item, i) => (
            <div
              key={`${i}-${item.creation.toISOString()}`}
              className="border-b border-black/10 pb-1"
            >
              <TodoCard todo={item} />
            </div>
          ))}
        </section>
        <div className="flex w-full flex-1 items-center p-4">
          <div className="relative w-full">
            <Input className="w-full pr-10" />
            <HiPencil
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>
    </Card.HandDraw>
  )
}

interface TodoProps {
  todo: Todo
}

const TodoCard = ({ todo }: TodoProps) => {
  const [mark, setMark] = useState<boolean>(todo.finished)
  const toggleMark = () => {
    setMark(!mark)
  }
  return (
    <li className="flex justify-between gap-2 px-4 transition-colors duration-1000">
      <div className="flex items-center gap-2">
        <Checkbox className="bg-black" checked={mark} onClick={toggleMark} />
        <span
          className={`flex gap-2 ${mark && 'strikethrough-animate text-red-300'}`}
        >
          {todo.title}
        </span>
      </div>
      <FaEdit
        className="cursor-pointer text-gray-400 duration-300 hover:scale-125"
        size={20}
      />
    </li>
  )
}

export default TodoList
