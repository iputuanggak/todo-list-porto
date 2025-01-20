"use client";

import { useTaskListStore } from "@/store/taskListStore";
import Card from "./Card";

export default function CardList() {
  const { taskList } = useTaskListStore();

  return (
    <article className="flex flex-col gap-4">
      {taskList.map((todo, index) => (
        <Card
          id={todo.id}
          task={todo.task}
          description={todo.description}
          isDone={todo.isDone}
          cardColor={todo.cardColor}
          key={index}
        />
      ))}
    </article>
  );
}
