import { STATUSES, statusClass } from "../utils/meta";

export default function StatsBar({ todos }) {
  const total = todos.length;
  const counts = STATUSES.map((s) => ({
    status: s,
    count: todos.filter((t) => t.status === s).length,
  }));
  const done = counts.find((c) => c.status === "done").count;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="stats" aria-label="Ringkasan tugas">
      <div className="stats-head">
        <span>
          <strong>{done}</strong> dari <strong>{total}</strong> tugas selesai
        </span>
        <span className="stats-percent">{percent}%</span>
      </div>
      <div className="stats-track">
        {counts.map((c) => (
          <span
            key={c.status}
            className={`stats-seg ${statusClass[c.status]}`}
            style={{ flexGrow: c.count }}
            title={`${c.status}: ${c.count}`}
          />
        ))}
      </div>
      <ul className="stats-legend">
        {counts.map((c) => (
          <li key={c.status} className={statusClass[c.status]}>
            <span className="dot" />
            {c.status}
            <b>{c.count}</b>
          </li>
        ))}
      </ul>
    </section>
  );
}
