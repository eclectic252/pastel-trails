const SAVE_INDEX_KEY = "pastel-trails.save-index";
const SAVE_PREFIX = "pastel-trails.save.";

function safeParse(value, fallback) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function createPreview(save) {
  return {
    slotId: save.slotId,
    saveName: save.saveName,
    updatedAt: save.updatedAt,
    mapId: save.world.currentMapId,
    money: save.player.money,
    partyCount: save.party.length,
  };
}

export function createSaveManager(storage) {
  function listSaves() {
    const index = safeParse(storage.getItem(SAVE_INDEX_KEY), []);
    return index.map((slotId) => {
      const save = safeParse(storage.getItem(`${SAVE_PREFIX}${slotId}`), null);
      return save ? createPreview(save) : null;
    }).filter(Boolean);
  }

  function writeSave(save) {
    const serialized = JSON.stringify(save, null, 2);
    storage.setItem(`${SAVE_PREFIX}${save.slotId}`, serialized);

    const existingIndex = safeParse(storage.getItem(SAVE_INDEX_KEY), []);
    const nextIndex = existingIndex.includes(save.slotId)
      ? existingIndex
      : [...existingIndex, save.slotId];

    storage.setItem(SAVE_INDEX_KEY, JSON.stringify(nextIndex));
    return createPreview(save);
  }

  function createSaveFromState({ slotId, saveName, state }) {
    const save = {
      slotId,
      saveName,
      updatedAt: new Date().toISOString(),
      player: state.player,
      world: state.world,
      settings: state.settings,
      party: state.party,
      bank: state.bank,
      registry: state.registry,
      inventory: state.inventory,
    };

    return writeSave(save);
  }

  function readSave(slotId) {
    return safeParse(storage.getItem(`${SAVE_PREFIX}${slotId}`), null);
  }

  return {
    listSaves,
    readSave,
    writeSave,
    createSaveFromState,
  };
}
