'use strict';

/* getdates.js – populate copyright year + last-modified */

(() => {
  const yearEl = document.getElementById('currentyear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const modEl = document.getElementById('lastModified');
  if (!modEl) return;

  const modDate  = new Date(document.lastModified);
  const formatted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',  // e.g. 24 May 2025
    timeStyle: 'short'    // 17:36
  }).format(modDate);

  modEl.textContent = `⏰ Last Modification: ${formatted}`;
})();
