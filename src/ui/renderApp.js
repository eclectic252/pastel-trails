function formatClock() {
  return new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

function renderContentSummary(content) {
  const sourceLabel =
    content.runtime.source === "directory"
      ? "Project folder"
      : content.runtime.source === "fetch"
        ? "HTTP fetch"
        : "Embedded fallback";

  return `
    <section class="panel">
      <h2>Loaded Content</h2>
      <p>Source: ${sourceLabel}</p>
      <ul class="summary-list">
        <li>Monsters: ${content.monsters.species.length}</li>
        <li>Items: ${content.items.items.length}</li>
        <li>Towns: ${content.towns.towns.length}</li>
        <li>Themes: ${content.themes.themes.length}</li>
        <li>Maps: ${Object.keys(content.maps).length}</li>
      </ul>
    </section>
  `;
}

function renderSaveSummary(state) {
  const previews = state.currentSavePreview;
  const previewMarkup = previews.length
    ? previews
        .map(
          (save) => `
            <li>
              <strong>${save.saveName}</strong>
              <span>${save.mapId} · $${save.money} · ${save.partyCount} monsters</span>
            </li>
          `,
        )
        .join("")
    : `<li>No saves created yet.</li>`;

  return `
    <section class="panel">
      <h2>Save Slots</h2>
      <ul class="summary-list">${previewMarkup}</ul>
    </section>
  `;
}

function renderParty(state, content) {
  const speciesById = Object.fromEntries(content.monsters.species.map((species) => [species.id, species]));
  const partyMarkup = state.party
    .map((monster) => {
      const species = speciesById[monster.speciesId];
      return `
        <li>
          <strong>${species.name}</strong>
          <span>Lv ${monster.level} · HP ${monster.currentHp}/${monster.stats.hp}</span>
        </li>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <h2>Starter Party</h2>
      <ul class="summary-list">${partyMarkup}</ul>
    </section>
  `;
}

function renderMapPanel(state, content) {
  const map = content.maps[state.world.currentMapId];
  const metadata = content.mapMetadata[state.world.currentMapId];

  return `
    <section class="panel panel-map">
      <h2>${metadata.displayName}</h2>
      <p>${map.kind} · ${map.mapWidth} x ${map.mapHeight} tiles · collision ${metadata.collisionGrid}px</p>
      <p>Player spawn: ${state.world.position.x}, ${state.world.position.y}</p>
      <p>Safezone: ${metadata.safezone ? "Yes" : "No"}</p>
    </section>
  `;
}

function renderLocalModeNotice(content) {
  if (content.runtime.protocol !== "file:") {
    return "";
  }

  const message =
    content.runtime.source === "directory"
      ? "Loaded from a local project folder. Reload the page and pick the folder again after editing files."
      : "Direct-open mode cannot fetch JSON files automatically. Use the button below to load your local project folder, or keep using the embedded sample content.";

  const button =
    "showDirectoryPicker" in window
      ? `<button class="ghost-button" type="button" data-action="select-project-folder">Load Project Folder</button>`
      : `<span class="inline-note">Folder access is not supported in this browser.</span>`;

  return `
    <section class="local-mode-banner">
      <div>
        <div class="eyebrow">Local File Mode</div>
        <p>${message}</p>
      </div>
      ${button}
    </section>
  `;
}

export function renderAppShell({ root, state, content, saveManager, onSelectProjectFolder }) {
  root.innerHTML = `
    <main class="app-shell" data-theme="${state.settings.theme}">
      ${renderLocalModeNotice(content)}

      <header class="top-bar">
        <div>
          <div class="eyebrow">Location</div>
          <div class="headline">${content.mapMetadata[state.world.currentMapId].displayName}</div>
        </div>
        <div class="top-bar-stats">
          <span>${formatClock()}</span>
          <span>$${state.player.money}</span>
          <button class="ghost-button" type="button" data-action="quick-save">Quick Save</button>
        </div>
      </header>

      <section class="hero-panel">
        <div>
          <div class="eyebrow">Prototype</div>
          <h1>Pastel Trails</h1>
          <p>
            Frontend scaffold loaded with content packs, save slots, and the initial world state.
          </p>
        </div>
        <div class="hero-note">
          <span>Dev Mode</span>
          <strong>${state.settings.devMode ? "Enabled" : "Disabled"}</strong>
        </div>
      </section>

      <section class="panel-grid">
        ${renderMapPanel(state, content)}
        ${renderContentSummary(content)}
        ${renderParty(state, content)}
        ${renderSaveSummary(state)}
      </section>

      <nav class="bottom-nav">
        <button type="button">Map</button>
        <button type="button">Character</button>
        <button type="button">Inventory</button>
        <button type="button">Monsters</button>
        <button type="button">Registry</button>
        <button type="button">Quests</button>
      </nav>
    </main>
  `;

  const quickSaveButton = root.querySelector('[data-action="quick-save"]');
  const selectProjectFolderButton = root.querySelector('[data-action="select-project-folder"]');

  quickSaveButton?.addEventListener("click", () => {
    const slotId = "slot-1";
    const saveName = "Prototype Save";
    saveManager.createSaveFromState({ slotId, saveName, state });
    state.currentSavePreview = saveManager.listSaves();
    renderAppShell({ root, state, content, saveManager, onSelectProjectFolder });
  });

  selectProjectFolderButton?.addEventListener("click", () => {
    onSelectProjectFolder?.();
  });
}
