import { describe, expect, it } from "vitest";
import type { Todo } from "@/types/todo";
import {
  addTodo,
  clearCompleted,
  countTodos,
  deleteTodo,
  filterTodos,
  parseStoredTodos,
  toggleTodo,
  updateTodoTitle,
} from "./todo-utils";

function todo(id: string, title: string, completed = false): Todo {
  return { id, title, completed, createdAt: "2026-01-01T00:00:00.000Z" };
}

const sample = [
  todo("1", "Buy Milk"),
  todo("2", "Walk the dog", true),
  todo("3", "buy bread", true),
  todo("4", "Read a book"),
];

describe("addTodo", () => {
  it("adds a trimmed task with id and ISO timestamp", () => {
    const [added] = addTodo([], "  Write report  ");
    expect(added.title).toBe("Write report");
    expect(added.completed).toBe(false);
    expect(added.id).toBeTruthy();
    expect(new Date(added.createdAt).toISOString()).toBe(added.createdAt);
  });

  it("gives each task a unique id", () => {
    const list = addTodo(addTodo([], "a"), "b");
    expect(list[0].id).not.toBe(list[1].id);
  });

  it("rejects empty and whitespace-only titles", () => {
    const list = [todo("1", "x")];
    expect(addTodo(list, "")).toBe(list);
    expect(addTodo(list, "   \t ")).toBe(list);
  });
});

describe("updateTodoTitle", () => {
  it("updates the title of the matching task", () => {
    const list = updateTodoTitle(sample, "1", " Buy oat milk ");
    expect(list[0].title).toBe("Buy oat milk");
    expect(list[1]).toBe(sample[1]);
  });

  it("refuses an empty title", () => {
    expect(updateTodoTitle(sample, "1", "  ")).toBe(sample);
  });
});

describe("toggleTodo", () => {
  it("completes and reactivates a task", () => {
    const completed = toggleTodo(sample, "1");
    expect(completed[0].completed).toBe(true);
    expect(toggleTodo(completed, "1")[0].completed).toBe(false);
  });
});

describe("deleteTodo", () => {
  it("removes only the selected task", () => {
    expect(deleteTodo(sample, "2").map((t) => t.id)).toEqual(["1", "3", "4"]);
  });
});

describe("filterTodos", () => {
  it("filters by status", () => {
    expect(filterTodos(sample, "all", "")).toHaveLength(4);
    expect(filterTodos(sample, "active", "").map((t) => t.id)).toEqual(["1", "4"]);
    expect(filterTodos(sample, "completed", "").map((t) => t.id)).toEqual(["2", "3"]);
  });

  it("searches case-insensitively", () => {
    expect(filterTodos(sample, "all", "BUY").map((t) => t.id)).toEqual(["1", "3"]);
    expect(filterTodos(sample, "all", "bUy MiLk").map((t) => t.id)).toEqual(["1"]);
  });

  it("combines search with status filter", () => {
    expect(filterTodos(sample, "active", "buy").map((t) => t.id)).toEqual(["1"]);
    expect(filterTodos(sample, "completed", "buy").map((t) => t.id)).toEqual(["3"]);
    expect(filterTodos(sample, "completed", "book")).toEqual([]);
  });
});

describe("clearCompleted", () => {
  it("removes completed tasks and keeps active ones unchanged", () => {
    const list = clearCompleted(sample);
    expect(list).toEqual([sample[0], sample[3]]);
  });
});

describe("countTodos", () => {
  it("counts total, active and completed", () => {
    expect(countTodos(sample)).toEqual({ total: 4, active: 2, completed: 2 });
  });
});

describe("parseStoredTodos", () => {
  it("round-trips valid data", () => {
    expect(parseStoredTodos(JSON.stringify(sample))).toEqual(sample);
  });

  it("handles missing, malformed and invalid data without throwing", () => {
    expect(parseStoredTodos(null)).toEqual([]);
    expect(parseStoredTodos("{not json")).toEqual([]);
    expect(parseStoredTodos('{"id":"1"}')).toEqual([]);
    expect(parseStoredTodos("null")).toEqual([]);
  });

  it("drops invalid entries but keeps valid ones", () => {
    const raw = JSON.stringify([sample[0], { id: 5, title: "bad" }, null, "x", sample[1]]);
    expect(parseStoredTodos(raw)).toEqual([sample[0], sample[1]]);
  });
});
