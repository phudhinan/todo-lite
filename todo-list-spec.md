# To-do List Mini App — Specification

## 1. Project Overview

**Project Name:** Todo Lite

**Objective:** Build a simple, responsive To-do List web application to practice using Claude Code, GitHub, and Vercel.

The application should be small, easy to understand, and quick to implement. Prioritize essential functionality over unnecessary features.

### Main Goals

* Practice building a web app with Next.js and TypeScript.
* Practice using Tailwind CSS for UI styling.
* Learn GitHub version control and Vercel deployment.
* Store tasks in the browser without requiring a backend or database.

## 2. Technology Stack

* **Frontend:** Next.js App Router
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Storage:** Browser localStorage
* **Code Quality:** ESLint
* **Hosting:** Vercel
* **Version Control:** GitHub

Do not add a backend, database, authentication, Prisma, Supabase, or unnecessary dependencies.

## 3. Core Features

### 3.1 Add Task

* Provide a text input and an Add button.
* Allow users to press Enter to add a task.
* Prevent adding empty tasks or whitespace-only titles.
* Clear the input after successfully adding a task.
* Assign each task a unique ID and creation timestamp.

### 3.2 Complete Task

* Each task must have a checkbox or equivalent accessible control.
* Users can toggle a task between active and completed.
* Completed tasks should have a strikethrough and muted text.
* Users must be able to mark completed tasks as active again.

### 3.3 Edit Task

* Provide an Edit button for each task.
* Allow users to update a task title.
* Provide Save and Cancel actions.
* Prevent saving an empty title.
* If inline editing is used, Enter saves and Escape cancels.

### 3.4 Delete Task

* Provide a Delete button for each task.
* Remove the selected task from the list.
* A confirmation dialog is optional; keep the interaction simple.

### 3.5 Filter Tasks

Provide three filters:

* All
* Active
* Completed

The task list must update immediately when the user changes the filter.

### 3.6 Search Tasks

* Provide a search input.
* Search task titles without case sensitivity.
* Search must work together with the selected status filter.
* Show an empty state when no tasks match.

### 3.7 Task Summary

Display:

* Total tasks
* Active tasks
* Completed tasks

Update all counts immediately whenever the task list changes.

### 3.8 Clear Completed Tasks

* Provide a Clear Completed button.
* Remove only completed tasks.
* Keep active tasks unchanged.
* Disable or hide the button when there are no completed tasks.

## 4. Data Model

Create a TypeScript interface:

```typescript
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}
```

Use ISO 8601 timestamps for createdAt.

Use React state as the source of truth while the application is running. Persist task data to localStorage.

## 5. localStorage Requirements

* Use the storage key `todo-lite:tasks`.
* Load saved tasks on the client side only.
* Save changes whenever the task list changes.
* Avoid Next.js hydration mismatch errors.
* Handle malformed JSON or invalid stored data without crashing.
* If localStorage is unavailable, handle the error gracefully where practical.
* Display saved tasks after the user refreshes the page.

Important limitations:

* Data is stored only in the current browser.
* Tasks are not synchronized between devices or browsers.
* No server-side backup is provided.

## 6. UI / UX Requirements

Create a clean, modern, minimal interface using Tailwind CSS.

### Page Layout

1. Header

   * App name: Todo Lite
   * Subtitle: A simple place to keep track of your day

2. Add Task Form

   * Task input
   * Add button

3. Task Summary

   * Total
   * Active
   * Completed

4. Search and Filters

   * Search input
   * All / Active / Completed filters

5. Task List

   * Checkbox
   * Task title
   * Edit button
   * Delete button

6. List Footer

   * Clear Completed button

### Visual Design

* Use a light background with white task cards.
* Use subtle borders and restrained accent colors.
* Apply consistent spacing, typography, and rounded corners.
* Provide hover and keyboard focus styles.
* Keep animations minimal or omit them.
* Avoid large UI component libraries.
* Avoid unnecessary charts, gradients, and decorative elements.
* Make the layout responsive on desktop and mobile.

### Empty States

Display appropriate messages:

* No tasks: "No tasks yet. Add your first task!"
* No search results: "No tasks match your search."
* No completed tasks: Clear Completed should be disabled or hidden.

### Accessibility

* Use semantic HTML.
* Every input must have an accessible label.
* Buttons must have meaningful accessible names.
* Ensure keyboard navigation works.
* Provide visible focus indicators.
* Do not communicate completion status using color alone.

## 7. Suggested Project Structure

Use the existing project structure if one is already present. Otherwise, follow a standard Next.js App Router structure.

```text
todo-lite/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── todo-form.tsx
│   │   ├── todo-item.tsx
│   │   ├── todo-filters.tsx
│   │   └── todo-summary.tsx
│   ├── hooks/
│   │   └── use-todos.ts
│   ├── lib/
│   │   └── todo-utils.ts
│   └── types/
│       └── todo.ts
├── README.md
├── package.json
└── ...
```

This structure is a suggestion, not a requirement. Keep the implementation simple. Combine small components where doing so improves maintainability.

## 8. Testing and Quality

Ensure the implementation correctly handles these scenarios:

1. Adding a task.
2. Rejecting an empty task.
3. Editing a task.
4. Completing and reactivating a task.
5. Deleting a task.
6. Filtering tasks.
7. Searching tasks with different letter cases.
8. Combining search and filters.
9. Clearing completed tasks without deleting active tasks.
10. Persisting tasks after a browser refresh.

If a test framework is already configured, use it.

Otherwise, keep the testing setup lightweight. Vitest may be added for testing pure utility functions if appropriate.

The following scripts should work with the actual installed dependencies:

* `npm run dev`
* `npm run lint`
* `npm run build`
* `npm run test` (only if a test script is configured)

Do not add scripts that reference missing tools.

## 9. GitHub and Vercel Deployment

Create a README.md containing:

### Local Development

* Required software.
* Dependency installation command.
* Command to run the development server.
* Commands to run lint, tests, and production build.

### GitHub

* How to create a repository.
* How to commit and push the project.

### Vercel

* How to import the GitHub repository into Vercel.
* How to deploy using the default Next.js settings.
* How to verify that the deployed application works.
* How to verify automatic deployment after pushing a new commit.

No environment variables should be required for the application.

## 10. Acceptance Criteria

The project is complete when:

* [ ] The application starts locally.
* [ ] Users can add tasks.
* [ ] Users can edit task titles.
* [ ] Users can delete tasks.
* [ ] Users can complete and reactivate tasks.
* [ ] All, Active, and Completed filters work.
* [ ] Search is case-insensitive.
* [ ] Search and filters work together.
* [ ] Summary counts update correctly.
* [ ] Clear Completed removes only completed tasks.
* [ ] Tasks persist after refreshing the page.
* [ ] Invalid localStorage data does not crash the app.
* [ ] Empty states display correctly.
* [ ] The layout works on desktop and mobile.
* [ ] Accessibility basics are implemented.
* [ ] Lint and production build succeed.
* [ ] README contains setup and deployment instructions.
* [ ] The application does not require a backend or database.

## 11. Instructions for Claude Code

Follow these instructions when implementing the project:

1. Inspect the existing repository before changing any files.
2. If the repository is empty, create a standard Next.js App Router project with TypeScript and Tailwind CSS.
3. Implement the features defined in this specification.
4. Keep dependencies minimal and avoid unnecessary abstractions.
5. Make localStorage access client-side only.
6. Prevent hydration mismatch errors.
7. Run lint and production build, and run tests if configured.
8. Fix implementation-related errors before finishing.
9. Do not run `npm run dev` or start a long-running development server.
10. Do not push commits, create remote repositories, or deploy on the user's behalf.
11. Do not implement features outside the defined scope unless required for correctness.
12. Do not claim that tests or builds passed unless they were actually executed successfully.

At the end, report:

* Files created or modified.
* Features implemented.
* Commands executed and their results.
* Any checks that could not be completed.
* Manual steps required to push to GitHub and deploy to Vercel.
