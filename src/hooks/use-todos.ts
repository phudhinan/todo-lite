"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Todo } from "@/types/todo";
import { STORAGE_KEY, parseStoredTodos } from "@/lib/todo-utils";

// A tiny client-side store backed by localStorage. useSyncExternalStore lets the
// server render a "loading" snapshot (null) and the client read storage after
// hydration, which avoids hydration mismatches.

let todos: Todo[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): Todo[] {
  try {
    return parseStoredTodos(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // localStorage may be unavailable (e.g. blocked by privacy settings).
    return [];
  }
}

function writeStorage(next: Todo[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore write failures; the app keeps working in memory.
  }
}

function getSnapshot(): Todo[] {
  if (todos === null) todos = readStorage();
  return todos;
}

function getServerSnapshot(): Todo[] | null {
  return null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setTodos(update: (current: Todo[]) => Todo[]) {
  const next = update(getSnapshot());
  if (next === todos) return;
  todos = next;
  writeStorage(next);
  listeners.forEach((listener) => listener());
}

/** Returns the current todos (null until loaded on the client) and an updater. */
export function useTodos() {
  const current = useSyncExternalStore<Todo[] | null>(subscribe, getSnapshot, getServerSnapshot);
  const update = useCallback((fn: (current: Todo[]) => Todo[]) => setTodos(fn), []);
  return [current, update] as const;
}
