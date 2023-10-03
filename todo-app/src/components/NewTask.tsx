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
  
    export async function NewTask(req: NextApiRequest) {
      let errorMessage = ""; // Initialize error message as an empty string
    
      if (req.method === "POST") {
        const formData = new FormData(req.body);
        try {
          await createTodo(formData);
        } catch (error) {
          if (error instanceof Error) {
            errorMessage = error.message; // Set the error message if there was an error
          }
        }
      }
          
    return (
      <>
        <form action={createTodo} className="flex flex-col w-3/4 lg:w-1/2">
        <div className="flex gap-1 justify-end">
          <button
             type="submit"
             >
              <PlusCircle 
               className="text-black hover:text-grey"/>
             </button>
            </div>
          <input
            type="text"
            name="title"
            placeholder="New todo"
            className="border-b-2 border-black bg-transparent outline-none focus-within:border-slate-100"
          />  
        </form>
        {errorMessage && <p className="text-red-500">Invalid title</p>}
      </>
    )
  }