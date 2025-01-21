"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TaskProps } from "@/types";
import { useTaskListStore } from "@/store/taskListStore";

export default function Card({
  id,
  task,
  description,
  isDone,
  cardColor,
}: TaskProps) {
  const { toggleDone, updateTask } = useTaskListStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const handleIsDone = () => {
    toggleDone(id);
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    const handleSaveChanges = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const task = formData.get("task") as string;
      const description = formData.get("description") as string;
      updateTask({ task: task, description: description }, id);
      setIsEditing(false);
    };
    return (
      <form
        className={`flex flex-col rounded-3xl bg-secondary p-4 shadow`}
        onSubmit={handleSaveChanges}
      >
        <div>
          <textarea
            name="task"
            className="w-full text-2xl"
            placeholder="Task"
            rows={2}
            defaultValue={task}
          />
          <textarea
            name="description"
            placeholder="note (optional)"
            rows={4}
            defaultValue={description}
            className="w-full"
          />
        </div>
        <footer className="flex items-center justify-end gap-2">
          <Button type="button" onClick={handleIsEditing} variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="filled">
            Save
          </Button>
        </footer>
      </form>
    );
  } else {
    return (
      <div
        className={`flex flex-col gap-1 rounded-3xl p-4 shadow ${isDone ? "bg-secondary-disabled" : cardColor} `}
      >
        <div>
          <h2 className={`text-2xl ${isDone ? "line-through" : ""}`}>{task}</h2>
          <p
            className={`${isDone ? "line-through" : ""} ${isExpand ? "" : "line-clamp-2"} cursor-pointer`}
            onClick={() => setIsExpand(!isExpand)}
          >
            {description}
          </p>
        </div>
        <footer className="flex items-center justify-between">
          <MoreButtonCard id={id} onIsEditing={handleIsEditing} />
          <Button onClick={handleIsDone} variant="outline">
            {isDone ? "Undone" : "Mark as Done"}
          </Button>
        </footer>
      </div>
    );
  }
}

function MoreButtonCard({
  id,
  onIsEditing,
}: {
  id: number;
  onIsEditing: () => void;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  const { removeTask } = useTaskListStore();

  const handleRemoveTask = () => {
    setIsActive(!isActive);
    removeTask(id);
  };

  return (
    <div className="relative" ref={popoverRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="6C757D"
        className="cursor-pointer hover:fill-primary-subdued"
        onClick={() => setIsActive(!isActive)}
      >
        <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
      </svg>
      {isActive ? (
        <ul className="absolute top-full z-10 cursor-pointer rounded bg-secondary shadow-md">
          <li className="px-3 py-2 hover:bg-secondary-subdued" onClick={onIsEditing}>
            Edit
          </li>
          <li
            className="px-3 py-2 hover:bg-secondary-subdued"
            onClick={handleRemoveTask}
          >
            Remove
          </li>
        </ul>
      ) : null}
    </div>
  );
}
