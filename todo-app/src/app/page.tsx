import { TodoItem } from "../components/TodoItem"
import { prisma } from "../db"

export default async function Home() {

  const todos = await prisma.post.findMany()
  return (
  <>
    <h1 className="text-xl">Todos</h1>
    <ul>
      {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
          ))}
    </ul>
  </>
  )
}
