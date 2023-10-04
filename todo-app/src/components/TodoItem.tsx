"use client"

import { XSquare } from "lucide-react"
import { CreatedAt } from "./CreatedAt";


type TodoItemProps = {
  id: string
  title: string
  done: boolean
  createdAt: Date
  toggleTodo: (id: string, done: boolean) => void
  deleteTodo: (id: string) => void;
}

export function TodoItem({ id, title, done, createdAt, toggleTodo, deleteTodo }: TodoItemProps) {
  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  return (
    <div className="w-full lg:w-1/2">
    <li className="grid grid-cols-3 items-center">
      <div className="">
      <input
        id={id}
        type="checkbox"
        className="mr-4 cursor-pointer peer"
        defaultChecked={done}
        onChange={e => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-lg peer-checked:line-through peer-checked:text-[green] "
      >
        {title}
      </label>
      </div>
      <div className="justify-start ">
      <CreatedAt createdAt={createdAt} />
      </div>
      <XSquare 
      className="cursor-pointer text-[black] w-4 hover:text-[red] "
      onClick={handleDeleteClick}/>
    </li>
    </div>
  )
}