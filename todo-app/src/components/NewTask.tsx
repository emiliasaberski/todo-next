"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "../db";


export async function newTask(data: FormData) {

    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
      throw new Error("Invalid Title")
    }
  
    await prisma.post.create({ data: { title, done: false } })
    revalidatePath("/")

  }