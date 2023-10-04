"use client"

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { PlusCircle } from 'lucide-react';
import { createTodo } from "./CreateTodo";
import { error } from "console";
import { NextApiRequest } from "next";
import { useRef } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { deleteTodo } from "./DeleteTodo";
import { toggleTodo } from "./ToggleTodo";
 
type Todos = {
  id: number
  title: string
}

type TodosProps = {
  todos: Todos[]
}

export function NewTask({
  todos
}: TodosProps) {
  const ref = useRef<HTMLFormElement>(null)
  const [optimistTodos, addOptimisticTodo] =
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
            id: Math.random(),
            title: "",
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
      {optimistTodos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
          ))}
    </ul>
      </>
    )
  }