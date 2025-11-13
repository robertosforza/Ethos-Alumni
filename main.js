async function loadMembers() {
  const res = await fetch('members.json', { cache: 'no-store' });
  const data = await res.json();
  return data.members || [];
}

function renderCards(list) {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';

  list.forEach(m => {
    const el = document.createElement('div');
    el.className = 'card';

    // Gestiamo affiliazioni multiple:
    const allAffiliations = (m.affiliations && m.affiliations.length > 0)
      ? m.affiliations
      : (m.affiliation ? [m.affiliation] : []);

    const affiliationsText = allAffiliations.join(' • ');

    el.innerHTML = `
      <h3>${m.name}</h3>
      <p><strong>${m.role || ''}</strong>${affiliationsText ? ' • ' + affiliationsText : ''}</p>
      <p>${m.location || ''}</p>
      <div class="badges">
        ${(m.areas || []).map(a => `<span class="badge">${a}</span>`).join('')}
      </div>
      <p>
        ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
        ${m.email ? `${m.linkedin ? ' • ' : ''}<a href="mailto:${m.email}">Email</a>` : ''}
      </p>
    `;

    cards.appendChild(el);
  });
}


function applyFilters(members) {
  const q = document.getElementById('search').value.toLowerCase().trim();
  const area = document.getElementById('areaFilter').value;
  let filtered = members.filter(m => {
    const hay = [m.name, m.role, m.affiliation, ...(m.areas||[])].join(' ').toLowerCase();
    const okQ = !q || hay.includes(q);
    const okA = !area || (m.areas||[]).includes(area);
    return okQ && okA;
  });
  renderCards(filtered);
}

document.addEventListener('DOMContentLoaded', async () => {
  const members = await loadMembers();
  renderCards(members);

  document.getElementById('search').addEventListener('input', () => applyFilters(members));
  document.getElementById('areaFilter').addEventListener('change', () => applyFilters(members));
});
