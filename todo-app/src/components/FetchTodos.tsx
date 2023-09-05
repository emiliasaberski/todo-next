"use server"

import { prisma } from "../db";

export async function fetchTodo() {
const todos = await prisma.post.findMany()
return todos
}