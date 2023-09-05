"use client"

import { XSquare } from "lucide-react"


type TodoItemProps = {
  id: string
  title: string
  done: boolean
  toggleTodo: (id: string, done: boolean) => void
  deleteTodo: (id: string) => void;
}

export function TodoItem({ id, title, done, toggleTodo, deleteTodo }: TodoItemProps) {
  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  

  return (
    <>
    <li className="flex gap-3 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={done}
        onChange={e => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-lg peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label>
      <XSquare 
      className="cursor-pointer text-[black] w-4 hover:text-[red] "
      onClick={handleDeleteClick}/>
    </li>
    </>
  )
}