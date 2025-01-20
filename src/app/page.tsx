"use client";

import AddTask from "@/components/AddTask";
import CardList from "@/components/CardList";

export default function Home() {
  return (
    <main className="my-4 max-w-[720px] mx-auto px-4">
      <CardList />
      <AddTask />
    </main>
  );
}
