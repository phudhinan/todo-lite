"use client";

import { useState } from "react";
import type { TodoFilter } from "@/types/todo";
import { useTodos } from "@/hooks/use-todos";
import {
  addTodo,
  clearCompleted,
  countTodos,
  deleteTodo,
  filterTodos,
  toggleTodo,
  updateTodoTitle,
} from "@/lib/todo-utils";
import { TodoForm } from "./todo-form";
import { TodoSummary } from "./todo-summary";
import { TodoFilters } from "./todo-filters";
import { TodoItem } from "./todo-item";

export function TodoApp() {
  const [todos, setTodos] = useTodos();
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [query, setQuery] = useState("");

  const isLoaded = todos !== null;
  const list = todos ?? [];
  const counts = countTodos(list);
  const visible = filterTodos(list, filter, query);

  let emptyMessage = "";
  if (list.length === 0) {
    emptyMessage = "No tasks yet. Add your first task!";
  } else if (visible.length === 0) {
    emptyMessage = query.trim() ? "No tasks match your search." : `No ${filter} tasks.`;
  }

  return (
    <div className="flex flex-col gap-6">
      <TodoForm onAdd={(title) => setTodos((t) => addTodo(t, title))} />

      <TodoSummary {...counts} />

      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        query={query}
        onQueryChange={setQuery}
      />

      <section aria-label="Tasks" className="flex flex-col gap-3">
        {!isLoaded ? (
          <p className="py-8 text-center text-slate-500">Loading tasks...</p>
        ) : emptyMessage ? (
          <p
            role="status"
            className="rounded-lg border border-dashed border-slate-300 bg-white py-8 text-center text-slate-500"
          >
            {emptyMessage}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {visible.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(id) => setTodos((t) => toggleTodo(t, id))}
                onUpdate={(id, title) => setTodos((t) => updateTodoTitle(t, id, title))}
                onDelete={(id) => setTodos((t) => deleteTodo(t, id))}
              />
            ))}
          </ul>
        )}

        <footer className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm text-slate-500">
          <span>
            {counts.active} {counts.active === 1 ? "task" : "tasks"} left
          </span>
          <button
            type="button"
            onClick={() => setTodos(clearCompleted)}
            disabled={counts.completed === 0}
            className="rounded-md px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent"
          >
            Clear Completed
          </button>
        </footer>
      </section>
    </div>
  );
}
