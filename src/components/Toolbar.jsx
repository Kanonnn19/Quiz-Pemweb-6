import { Columns3, LayoutList, Search } from "lucide-react";
import { FILTERS } from "../utils/meta";

export default function Toolbar({
  query,
  onQuery,
  filter,
  onFilter,
  view,
  onView,
}) {
  return (
    <div className="toolbar">
      <label className="search">
        <Search size={16} />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Cari judul atau deskripsi"
        />
      </label>

      <div className="segmented" role="tablist" aria-label="Filter status">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            className={filter === f.value ? "active" : ""}
            onClick={() => onFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="segmented view-toggle" aria-label="Tampilan">
        <button
          type="button"
          aria-pressed={view === "table"}
          className={view === "table" ? "active" : ""}
          onClick={() => onView("table")}
        >
          <LayoutList size={16} />
          Tabel
        </button>
        <button
          type="button"
          aria-pressed={view === "board"}
          className={view === "board" ? "active" : ""}
          onClick={() => onView("board")}
        >
          <Columns3 size={16} />
          Board
        </button>
      </div>
    </div>
  );
}
