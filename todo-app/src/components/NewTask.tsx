import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { PlusCircle } from 'lucide-react';
import { error } from "console";
import { NextApiRequest } from "next";

async function createTodo(data: FormData) {
  "use server"

    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
      throw new Error("Invalid Title")
    }

    await prisma.post.create({ data: { title, done: false } })
    revalidatePath("/")
  }
  
    export async function NewTask() {

    return (
      <>
        <form action={createTodo} className="flex flex-col w-3/4 lg:w-1/2">
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