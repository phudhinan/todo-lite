"use client";

import { useState, type KeyboardEvent } from "react";
import type { Todo } from "@/types/todo";

const secondaryButton =
  "rounded-md border border-slate-300 px-2.5 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";

export function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const canSave = draft.trim() !== "";
  const checkboxId = `todo-${todo.id}`;
  const editId = `edit-${todo.id}`;

  function startEditing() {
    setDraft(todo.title);
    setIsEditing(true);
  }

  function save() {
    if (!canSave) return;
    onUpdate(todo.id, draft);
    setIsEditing(false);
  }

  function cancel() {
    setDraft(todo.title);
    setIsEditing(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      save();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  }

  if (isEditing) {
    return (
      <li className="flex flex-col gap-2 rounded-lg border border-indigo-300 bg-white p-3 sm:flex-row sm:items-center">
        <label htmlFor={editId} className="sr-only">
          Edit task title
        </label>
        <input
          id={editId}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={200}
          autoFocus
          aria-invalid={canSave ? undefined : true}
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={save}
            disabled={!canSave}
            className="rounded-md bg-indigo-600 px-2.5 py-1 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
          <button type="button" onClick={cancel} className={secondaryButton}>
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 hover:border-slate-300">
      <input
        id={checkboxId}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
      />
      <label
        htmlFor={checkboxId}
        className={`min-w-0 flex-1 cursor-pointer break-words ${
          todo.completed ? "text-slate-400 line-through" : "text-slate-900"
        }`}
      >
        {todo.title}
        {todo.completed && <span className="sr-only"> (completed)</span>}
      </label>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={startEditing}
          aria-label={`Edit task: ${todo.title}`}
          className={secondaryButton}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete task: ${todo.title}`}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-sm font-medium text-red-600 hover:border-red-300 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
