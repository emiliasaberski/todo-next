"use client"

import { useEffect } from "react";
import { TodoItem } from "../components/TodoItem"
import { newTask } from "../components/NewTask";
import { deleteTodo } from "../components/DeleteTodo";
import { toggleTodo } from "../components/ToggleTodo";
import { fetchTodo } from "../components/FetchTodos";
import { experimental_useOptimistic as useOptimistic } from "react";

type TaskProp = {
  task: string
}

export default function Home( {tasks}: { tasks: TaskProp[] }) {
  const [optimisticTodo, addOptimisticTodo] = useOptimistic(
    tasks,
    (state: any, task: FormData) => {
      return [...state, newTask(task)]
    }
  )
    
  const addTask = async (tasks: FormData) => {
    addOptimisticTodo(tasks)
    await newTask(tasks)
  }

  useEffect(() => {
    const fetchData = async () => {
      const todos = await fetchTodo();
    };

    fetchData();
  }, []);
  
  return (
  <>
  <div className="m-8">
    <h1 className="text-3xl text-[#005eff] mb-4 underline ">Todos</h1>
    <ul className="flex-col space-y-5 my-10">
      {optimisticTodo.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
          ))}
    </ul>
    <div>
    <form action={addTask}
    className="flex gap-2 flex-col w-full lg:w-1/2">
          <input
            type="text"
            name="title"
            placeholder="New todo"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <div className="flex gap-1 justify-end">
            <button
              type="submit"
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Create
            </button>
          </div>
        </form>
        </div>
    </div>

  </>
  )
}
