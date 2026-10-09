import type { Todo, TodoFilter } from "@/types/todo";

export const STORAGE_KEY = "todo-lite:tasks";

export function normalizeTitle(title: string): string {
  return title.trim();
}

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts where randomUUID is unavailable.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createTodo(title: string): Todo | null {
  const normalized = normalizeTitle(title);
  if (!normalized) return null;
  return {
    id: generateId(),
    title: normalized,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  const todo = createTodo(title);
  return todo ? [todo, ...todos] : todos;
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function updateTodoTitle(todos: Todo[], id: string, title: string): Todo[] {
  const normalized = normalizeTitle(title);
  if (!normalized) return todos;
  return todos.map((todo) => (todo.id === id ? { ...todo, title: normalized } : todo));
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos: Todo[], filter: TodoFilter, query: string): Todo[] {
  const search = query.trim().toLowerCase();
  return todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    return !search || todo.title.toLowerCase().includes(search);
  });
}

export function countTodos(todos: Todo[]) {
  const completed = todos.filter((todo) => todo.completed).length;
  return { total: todos.length, active: todos.length - completed, completed };
}

export function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    v.title.trim() !== "" &&
    typeof v.completed === "boolean" &&
    typeof v.createdAt === "string"
  );
}

/** Parses stored JSON, discarding anything that is not a valid Todo. Never throws. */
export function parseStoredTodos(raw: string | null): Todo[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isTodo) : [];
  } catch {
    return [];
  }
}
