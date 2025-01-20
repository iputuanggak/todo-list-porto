"use client";

import AddTask from "@/components/AddTask";
import CardList from "@/components/CardList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto my-4 max-w-[720px] px-4">
      <Link
        href="https://github.com/iputuanggak/todo-list-porto"
        className="mb-2 flex gap-1"
      >
        <img src="/img/github-mark.png" alt="" className="size-4 self-center" />
        <p className="text-sm underline md:text-base">
          https://github.com/iputuanggak/todo-list-porto
        </p>
      </Link>
      <CardList />
      <AddTask />
    </main>
  );
}
