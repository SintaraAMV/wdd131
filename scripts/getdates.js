'use strict';
(() => {
  const y = document.getElementById('currentyear');
  if (y) y.textContent = new Date().getFullYear();

  const m = document.getElementById('lastModified');
  if (!m) return;

  const formatted = new Intl.DateTimeFormat('en-US',{
    dateStyle:'medium', timeStyle:'short'
  }).format(new Date(document.lastModified));

  m.textContent = `⏰ Last Modification: ${formatted}`;
})();
