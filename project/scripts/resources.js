(function () {
  const els = {
    search: document.querySelector("#search"),
    week: document.querySelector("#week"),
    type: document.querySelector("#type"),
    grid: document.querySelector("#grid"),
    count: document.querySelector("[data-result-count]"),
  };

  const loadState = () => {
    const raw = localStorage.getItem("wdd131GuideState");
    const parsed = raw ? JSON.parse(raw) : { completedIds: [], favorites: [] };

    return {
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
    };
  };

  const saveState = (state) => {
    localStorage.setItem("wdd131GuideState", JSON.stringify(state));
  };

  const normalize = (value) => `${value}`.trim().toLowerCase();

  const applyFilters = (items) => {
    const q = normalize(els.search?.value ?? "");
    const w = normalize(els.week?.value ?? "all");
    const t = normalize(els.type?.value ?? "all");

    return items
      .filter((r) => (w === "all" ? true : `${r.week}` === w))
      .filter((r) => (t === "all" ? true : normalize(r.type) === t))
      .filter((r) => {
        if (!q) return true;
        const hay = normalize(`${r.title} ${r.type} ${r.level} ${r.tags.join(" ")}`);
        return hay.includes(q);
      })
      .sort((a, b) => a.week - b.week || a.title.localeCompare(b.title));
  };

  const renderResources = () => {
    const state = loadState();
    const items = applyFilters(RESOURCES);

    if (els.count) els.count.textContent = `${items.length}`;

    if (!els.grid) return;

    if (items.length === 0) {
      els.grid.innerHTML = `
        <div class="card">
          <h4>No results</h4>
          <p class="muted">Try removing filters or using a shorter search.</p>
        </div>
      `;
      return;
    }

    els.grid.innerHTML = items
      .map((r) => {
        const isFav = state.favorites.includes(r.id);
        const isDone = state.completedIds.includes(r.id);

        const favLabel = isFav ? "Unfavorite" : "Favorite";
        const doneLabel = isDone ? "Mark as not done" : "Mark as done";

        const levelPill = r.level === "Core"
          ? `<span class="pill ok">Core</span>`
          : `<span class="pill warn">Stretch</span>`;

        const statusPill = isDone
          ? `<span class="pill ok">Completed</span>`
          : `<span class="pill">Not completed</span>`;

        const favPill = isFav
          ? `<span class="pill ok">★ Favorite</span>`
          : `<span class="pill">☆</span>`;

        return `
          <article class="card" data-id="${r.id}">
            <h4>W${r.week}: ${r.title}</h4>
            <p>${r.type} • Tags: ${r.tags.join(", ")}</p>

            <div class="meta">
              ${levelPill}
              ${statusPill}
              ${favPill}
            </div>

            <div class="actions">
              <button class="primary" data-action="toggle-done" type="button">${doneLabel}</button>
              <button class="ghost" data-action="toggle-fav" type="button">${favLabel}</button>
            </div>
          </article>
        `;
      })
      .join("");
  };

  const handleGridClick = (ev) => {
    const btn = ev.target.closest("button[data-action]");
    if (!btn) return;

    const card = btn.closest("[data-id]");
    if (!card) return;

    const id = card.getAttribute("data-id");
    const action = btn.getAttribute("data-action");
    const state = loadState();

    if (action === "toggle-done") {
      const exists = state.completedIds.includes(id);
      state.completedIds = exists
        ? state.completedIds.filter((x) => x !== id)
        : [...state.completedIds, id];
      saveState(state);
      renderResources();
      return;
    }

    if (action === "toggle-fav") {
      const exists = state.favorites.includes(id);
      state.favorites = exists
        ? state.favorites.filter((x) => x !== id)
        : [...state.favorites, id];
      saveState(state);
      renderResources();
    }
  };

  const initFilters = () => {
    const weeks = [...new Set(RESOURCES.map((r) => r.week))].sort((a, b) => a - b);
    const types = [...new Set(RESOURCES.map((r) => r.type))].sort();

    if (els.week) {
      els.week.innerHTML = `
        <option value="all">All weeks</option>
        ${weeks.map((w) => `<option value="${w}">Week ${w}</option>`).join("")}
      `;
    }

    if (els.type) {
      els.type.innerHTML = `
        <option value="all">All types</option>
        ${types.map((t) => `<option value="${t}">${t}</option>`).join("")}
      `;
    }
  };

  const wire = () => {
    [els.search, els.week, els.type].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", renderResources);
      el.addEventListener("change", renderResources);
    });

    if (els.grid) els.grid.addEventListener("click", handleGridClick);
  };

  // Boot
  initFilters();
  wire();
  renderResources();
})();
