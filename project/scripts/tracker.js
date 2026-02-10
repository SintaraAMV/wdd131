(function () {
  const list = document.querySelector("#completedList");
  const favs = document.querySelector("#favoriteList");
  const stats = document.querySelector("#stats");

  const loadState = () => {
    const raw = localStorage.getItem("wdd131GuideState");
    const parsed = raw ? JSON.parse(raw) : { completedIds: [], favorites: [] };

    return {
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
    };
  };

  const pickByIds = (ids) => RESOURCES.filter((r) => ids.includes(r.id));

  const render = () => {
    const state = loadState();
    const completed = pickByIds(state.completedIds).sort((a, b) => a.week - b.week);
    const favorite = pickByIds(state.favorites).sort((a, b) => a.week - b.week);

    if (stats) {
      const coreCount = RESOURCES.filter((r) => r.level === "Core").length;
      const doneCount = completed.length;
      const pct = coreCount > 0
        ? Math.round((doneCount / coreCount) * 100)
        : 0;

      stats.innerHTML = `
        <div class="kpi">
          <div class="card"><strong>${doneCount}</strong><span>Completed</span></div>
          <div class="card"><strong>${favorite.length}</strong><span>Favorites</span></div>
          <div class="card"><strong>${pct}%</strong><span>Core progress</span></div>
          <div class="card"><strong>${RESOURCES.length}</strong><span>Total items</span></div>
        </div>
      `;
    }

    if (list) {
      list.innerHTML = completed.length
        ? completed.map((r) => `<li>W${r.week}: ${r.title}</li>`).join("")
        : `<li class="muted">No completed items yet.</li>`;
    }

    if (favs) {
      favs.innerHTML = favorite.length
        ? favorite.map((r) => `<li>W${r.week}: ${r.title}</li>`).join("")
        : `<li class="muted">No favorites yet.</li>`;
    }
  };

  render();
})();
