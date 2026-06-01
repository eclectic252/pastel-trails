function buildStarterMonster(species) {
  return {
    instanceId: crypto.randomUUID(),
    speciesId: species.id,
    variantId: species.variants[0]?.id ?? "default",
    level: 5,
    xp: 0,
    stats: { ...species.baseStats },
    currentHp: species.baseStats.hp,
    skills: [...species.skills],
  };
}

export function createInitialGameState({ content, saveManager }) {
  const settings = content.settings.defaults;
  const starterTown = content.towns.towns[0];
  const starterSpecies = content.monsters.species[0];
  const starterMonster = buildStarterMonster(starterSpecies);

  return {
    bootedAt: new Date().toISOString(),
    settings: { ...settings },
    currentSavePreview: saveManager.listSaves(),
    player: {
      name: "Player",
      avatarId: "avatar-1",
      money: 250,
      experience: 0,
      skills: [],
      lastTownId: starterTown.id,
    },
    world: {
      currentMapId: starterTown.mapId,
      position: { ...starterTown.spawn },
      activeRespawns: [],
    },
    party: [starterMonster],
    bank: [],
    registry: {
      seen: [starterSpecies.id],
      caught: [starterSpecies.id],
    },
    inventory: [
      { itemId: "basic-orb", quantity: 5 },
      { itemId: "small-tonic", quantity: 2 },
    ],
  };
}
