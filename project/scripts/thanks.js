(function () {
  const box = document.querySelector("#summary");
  const counter = document.querySelector("#feedbackCount");

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") ?? "Anonymous";
  const topic = params.get("topic") ?? "General";
  const message = params.get("message") ?? "";

  const raw = localStorage.getItem("wdd131FeedbackCount");
  const current = raw ? Number(raw) : 0;
  const next = Number.isFinite(current) ? current + 1 : 1;

  localStorage.setItem("wdd131FeedbackCount", `${next}`);

  if (counter) counter.textContent = `${next}`;

  if (box) {
    box.innerHTML = `
      <div class="card">
        <h4>Submission received</h4>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong> ${message ? message : "—"}</p>
      </div>
    `;
  }
})();
