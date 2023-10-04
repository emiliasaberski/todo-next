"use client"

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { PlusCircle } from 'lucide-react';
import { createTodo } from "./CreateTodo";
import { error } from "console";
import { NextApiRequest } from "next";
import { useRef } from "react";
  
export function NewTask() {
  const ref = useRef<HTMLFormElement>(null)
    return (
      <>
        <form 
        ref={ref}
        action={async formData => {
          ref.current?.reset()
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
      </>
    )
  }