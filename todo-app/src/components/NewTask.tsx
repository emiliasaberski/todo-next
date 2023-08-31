import { prisma } from "../db";
import Link from "next/link";

async function createTodo(data: FormData) {
    "use server"
  
    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
      throw new Error("Invalid Title")
    }
  
    await prisma.post.create({ data: { title, done: false } })
  }
  
  export function NewTask() {
    return (
      <>
        <form action={createTodo} className="flex gap-2 flex-col w-full lg:w-1/2">
          <label>New</label>
          <input
            type="text"
            name="title"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <div className="flex gap-1 justify-end">
            <Link
              href=".."
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </>
    )
  }