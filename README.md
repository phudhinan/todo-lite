# Todo Lite

A simple, responsive to-do list built with Next.js (App Router), TypeScript, and Tailwind CSS.
Tasks are stored in your browser's `localStorage` — there is no backend or database.

## Features

- Add tasks (Add button or Enter); empty / whitespace-only titles are rejected
- Mark tasks complete and back to active
- Edit task titles inline (Enter saves, Escape cancels; empty titles can't be saved)
- Delete tasks
- Filter by All / Active / Completed
- Case-insensitive search that combines with the status filter
- Summary of total, active, and completed tasks
- Clear Completed (disabled when there are no completed tasks)
- Tasks persist across page refreshes

### Storage limitations

- Data is stored under the key `todo-lite:tasks` in the current browser only.
- Tasks are not synced between devices or browsers, and there is no server-side backup.
- Malformed or invalid stored data is ignored instead of crashing the app.

## Local Development

### Requirements

- Node.js 20.19+ or 22.13+ (LTS recommended)
- npm (bundled with Node.js)
- Git

### Commands

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
npm run lint       # run ESLint
npm run test       # run unit tests (Vitest)
npm run build      # create a production build
npm run start      # serve the production build locally
```

### Project structure

```text
src/
├── app/            # layout, page, global styles
├── components/     # todo-app, todo-form, todo-item, todo-filters, todo-summary
├── hooks/          # use-todos (localStorage-backed store)
├── lib/            # pure todo helpers + tests
└── types/          # Todo type
```

## GitHub

1. Sign in to [GitHub](https://github.com) and click **New repository**.
2. Name it (e.g. `todo-lite`), leave it empty (no README, .gitignore, or license), and click **Create repository**.
3. From the project folder, commit and push:

   ```bash
   git init            # skip if the folder is already a Git repository
   git add .
   git commit -m "Initial commit: Todo Lite"
   git branch -M main
   git remote add origin https://github.com/<your-username>/todo-lite.git
   git push -u origin main
   ```

## Vercel

### Deploy

1. Sign in to [Vercel](https://vercel.com) with your GitHub account.
2. Click **Add New… → Project** and **Import** your `todo-lite` repository.
3. Vercel detects **Next.js** automatically. Keep the default build settings
   (build command `next build`, default output directory).
   - If the app lives in a subfolder of the repository, set **Root Directory** to that folder (e.g. `todo-lite`).
4. No environment variables are required. Click **Deploy**.

### Verify the deployment

1. Open the URL Vercel provides (e.g. `https://todo-lite-xxxx.vercel.app`).
2. Add a few tasks, complete one, edit one, delete one.
3. Try the All / Active / Completed filters and search with mixed letter case.
4. Click **Clear Completed** and confirm only completed tasks are removed.
5. Refresh the page and confirm the tasks are still there.

### Verify automatic deployments

1. Make a small change (e.g. edit the subtitle in `src/app/page.tsx`).
2. Commit and push:

   ```bash
   git add .
   git commit -m "Update subtitle"
   git push
   ```

3. In the Vercel dashboard, a new deployment starts automatically for the push to `main`.
4. When it finishes, open the production URL and confirm the change is live.
