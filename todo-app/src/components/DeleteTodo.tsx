"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "../db";


export async function deleteTodo(id: string) {
  
    await prisma.post.delete({
      where: { id }
    })
    revalidatePath("/")
  }