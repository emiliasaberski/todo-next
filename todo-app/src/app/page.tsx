import { TodoItem } from "../components/TodoItem"
import { NewTask } from "../components/NewTask"
import { prisma } from "../db"

export default async function Home() {

  const todos = await prisma.post.findMany()

  async function toggleTodo(id: string, done: boolean) {
    "use server"
  
    await prisma.post.update({ where: { id }, data: { done } })
  }

  async function deleteTodo(id: string) {
    "use server"
  
    await prisma.post.delete({
      where: { id }
    })
  }
  
  return (
  <>
  <div className="m-8">
    <h1 className="text-3xl text-[#005eff] mb-4 underline ">Todos</h1>
    <ul className="flex-col space-y-5 my-10">
      {todos.map(todo => (
          <TodoItem key={todo.id}  {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
          ))}
    </ul>
    <div className="mt-10">
    <NewTask/>
    </div>
    </div>
  </>
  )
}
