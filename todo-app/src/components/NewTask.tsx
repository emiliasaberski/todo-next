"use client"

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { PlusCircle, Square } from 'lucide-react';
import { createTodo } from "./CreateTodo";
import { error } from "console";
import { NextApiRequest } from "next";
import { useRef } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { deleteTodo } from "./DeleteTodo";
import { toggleTodo } from "./ToggleTodo";
import { CreatedAt } from "./CreatedAt";
import { XSquare } from "lucide-react"
 
type Todos = {
  id: string
  title: string
  done: boolean
  createdAt: Date
}

type TodosProps = {
  todos: Todos[]
}

export function NewTask({
  todos
}: TodosProps) {
  const ref = useRef<HTMLFormElement>(null)
  const [optimisticTodos, addOptimisticTodo] =
  useOptimistic(todos, (state, newTodo: Todos) => {
    return [...state, newTodo]
  })
    return (
      <>
        <form 
        ref={ref}
        action={async formData => {
          ref.current?.reset()
          addOptimisticTodo({
            id: "",
            title: "",
            done: false,
            createdAt: Date
          })
          await createTodo(formData)
        }} 
        className="flex flex-col w-3/4 lg:w-1/2">
        <div className="flex justify-end">
          <button type="submit">
              <PlusCircle 
               className="text-black hover:text-green-600"/>
             </button>
            </div>
          <input
            type="text"
            name="title"
            placeholder="New todo"
            className="border-b-2 border-black bg-transparent outline-none text-lg focus-within:border-slate-100"
          />  
        </form>
        <ul className="space-y-5 my-10">
      {optimisticTodos.map(todo => (
              <li className="grid grid-cols-3 items-center">
              <div className="">
              <input
                id={todo.id}
                type="checkbox"
                className="mr-4 cursor-pointer peer"
                defaultChecked={todo.done}
                onChange={e => toggleTodo(todo.id, e.target.checked)}
              />
              <label
                htmlFor={todo.id}
                className="cursor-pointer text-lg peer-checked:line-through peer-checked:text-[green] "
              >
                {todo.title}
              </label>
              </div>
              <div className="justify-start ">
              <CreatedAt createdAt={todo.createdAt} />
              </div>
              <XSquare 
              className="cursor-pointer text-[black] w-4 hover:text-[red] "
              onClick={e => deleteTodo(todo.id, e.target.delete)}/>
            </li>
          ))}
    </ul>
      </>
    )
  }