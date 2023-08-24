import { TodoItem } from "../components/TodoItem"
import { NewTask } from "../components/NewTask"
import { prisma } from "../db"

export default async function Home() {

  const todos = await prisma.post.findMany()
  return (
  <>
  <div className="m-8">
    <h1 className="text-2xl text-[red]">Todos</h1>
    <ul className="flex-col space-y-5">
      {todos.map(todo => (
          <TodoItem key={todo.id}  {...todo} />
          ))}
    </ul>
    <NewTask />
    </div>
  </>
  )
}
