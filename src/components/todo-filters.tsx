"use client";

import type { TodoFilter } from "@/types/todo";

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function TodoFilters({
  filter,
  onFilterChange,
  query,
  onQueryChange,
}: {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <label htmlFor="search-tasks" className="sr-only">
          Search tasks
        </label>
        <input
          id="search-tasks"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>
      <div
        role="group"
        aria-label="Filter tasks by status"
        className="flex rounded-lg border border-slate-300 bg-white p-1"
      >
        {FILTERS.map(({ value, label }) => {
          const selected = filter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onFilterChange(value)}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:flex-none ${
                selected ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
