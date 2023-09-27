import { revalidatePath } from "next/cache";
import { useState } from "react";
import { prisma } from "../db";
import Link from "next/link";
import { data } from "autoprefixer";

async function createTodo(data: FormData) {
  "use server"

    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
      throw new Error("Invalid Title")
    }

    await prisma.post.create({ data: { title, done: false } })
    revalidatePath("/")
  }

  export function NewTask() {

    return (
      <>
        <form action={createTodo} className="flex gap-2 flex-col w-full lg:w-1/2">
          <input
            type="text"
            name="title"
            placeholder="New todo"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <div className="flex gap-1 justify-end">
            {/* <button
              type="submit"
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Cancel
            </button> */}
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