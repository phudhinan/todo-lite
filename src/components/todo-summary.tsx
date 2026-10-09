export function TodoSummary({
  total,
  active,
  completed,
}: {
  total: number;
  active: number;
  completed: number;
}) {
  const items = [
    { label: "Total", value: total },
    { label: "Active", value: active },
    { label: "Completed", value: completed },
  ];

  return (
    <section aria-label="Task summary">
      <dl className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {item.label}
            </dt>
            <dd className="text-xl font-semibold text-slate-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
