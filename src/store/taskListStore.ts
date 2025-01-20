import { TaskProps } from "@/types";
import { create } from "zustand";

type Store = {
  taskId: number;
  taskList: TaskProps[] | [];
  addTask: (newTask: TaskProps) => void;
  removeTask: (taskId: number) => void;
  updateTask: (updatedTask: Partial<TaskProps>, taskId: number) => void;
  toggleDone: (taskId: number) => void;
};

export const useTaskListStore = create<Store>()((set) => ({
  taskId: 1,
  taskList: [
    {
      id: 0,
      task: "Task",
      description:
        "Lorem ipsum dol  or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      isDone: false,
      cardColor: "bg-[#FFFFE5]",
    },
  ],
  addTask: (newTask) =>
    set((state) => ({
      taskList: [...state.taskList, newTask],
      taskId: state.taskId + 1,
    })),

  removeTask: (taskId) =>
    set((state) => ({
      taskList: state.taskList.filter((task) => task.id !== taskId),
    })),
  updateTask: (updatedTask, taskId) =>
    set((state) => ({
      taskList: state.taskList.map((task) =>
        taskId === task.id ? { ...task, ...updatedTask } : task,
      ),
    })),
  toggleDone: (taskId) =>
    set((state) => ({
      taskList: state.taskList.map((task) =>
        taskId === task.id ? { ...task, isDone: !task.isDone } : task,
      ),
    })),
}));
