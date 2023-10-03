
import { revalidatePath } from "next/cache";
import { TodoItem } from "../components/TodoItem"
import { NewTask } from "../components/NewTask";
import { deleteTodo } from "../components/DeleteTodo";
import { prisma } from "../db";
import { toggleTodo } from "../components/ToggleTodo";
import { fetchTodo } from "../components/FetchTodos";
import { experimental_useOptimistic as useOptimistic } from "react";

export default async function Home() {

  const todos = await prisma.post.findMany()
  async function toggleTodo(id: string, done: boolean) {
    "use server"

    await prisma.post.update({ where: { id }, data: { done } })
    revalidatePath("/")
  }
  const emptyState = (
    <h2>Nothing here</h2>
  );


  return (
  <div className="flex flex-col w-full m-8 ">
    <h1 className="text-3xl text-[#005eff] mb-4 underline ">Todos</h1>
    <div className="mt-10">
    <NewTask/>
    </div>
    <ul className="space-y-5 my-10">
      {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
          ))}
    </ul>
    {todos.length === 0 ? emptyState : null}
    </div>
  )
}
