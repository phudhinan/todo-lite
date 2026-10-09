import { TodoApp } from "@/components/todo-app";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Todo Litexxx</h1>
        <p className="mt-1 text-slate-600">A simple place to keep track of your day</p>
      </header>
      <TodoApp />
    </main>
  );
}
