"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "../db";


export async function toggleTodo(id: string, done: boolean) {
    "use server"
  
    await prisma.post.update({ where: { id }, data: { done } })
    revalidatePath("/")
  }