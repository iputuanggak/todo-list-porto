"use client";

import { FormEvent, useState } from "react";
import Button from "./Button";
import { useTaskListStore } from "@/store/taskListStore";

export default function AddTask() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { addTask, taskId } = useTaskListStore();

  // function formDataToObject(formData: FormData) {
  //   const obj: { [key: string]: string } = {};

  //   formData.forEach((value, key) => {
  //     obj[key] = value.toString();
  //   });

  //   return obj;
  // }

  function getRandomElement(arr: string[]) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  const colorOptions = [
    "bg-[#FFE5E5]",
    "bg-[#E5F2FF]",
    "bg-[#E5E5FF]",
    "bg-[#E5FFE5]",
    "bg-[#E5FFF2]",
    "bg-[#E5FFFF]",
    "bg-[#F2E5FF]",
    "bg-[#F2FFE5]",
    "bg-[#FFE5F2]",
    "bg-[#FFE5FF]",
    "bg-[#FFF2E5]",
    "bg-[#FFFFE5]",
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const formObject = formDataToObject(formData);
    const task = formData.get("task") as string;
    const description = formData.get("description") as string;
    const cardColor = getRandomElement(colorOptions);

    addTask({
      id: taskId,
      task: task ? task : "untitled",
      description: description,
      isDone: false,
      cardColor: cardColor,
    });
    setIsActive(false);
  };

  const rotation = isActive ? "rotate-[315deg]" : "";

  return (
    <div className="fixed bottom-4 left-0 right-0 z-30 flex flex-col gap-5 px-4">
      {isActive ? (
        <form
          className="m-auto flex w-full max-w-[720px] flex-col gap-2 rounded-3xl bg-secondary p-4 shadow-xl"
          onSubmit={handleSubmit}
        >
          <textarea
            name="task"
            className="text-2xl"
            placeholder="Task"
            rows={2}
          />
          <textarea name="description" placeholder="note (optional)" rows={4} />
          <Button variant="filled" customClassName="w-fit self-end">
            Save
          </Button>
        </form>
      ) : null}

      <button
        className={`self-center rounded-full bg-primary p-2 shadow-xl`}
        onClick={() => setIsActive(!isActive)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="white"
          className={`transition-all ${rotation}`}
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
    </div>
  );
}
