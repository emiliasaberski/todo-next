"use client"

type TodoItemProps = {
  id: string
  title: string
  content: string
  done: boolean
}

export function TodoItem({ id, title, content, done }: TodoItemProps) {
  return (
    <>
    <li className="flex gap-3 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={done}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-lg peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      <p className="text-sm">{content}</p>
      </label>
    </li>
    </>
  )
}