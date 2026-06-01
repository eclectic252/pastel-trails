export const embeddedContent = {
  settings: {
    defaults: {
      theme: "classic",
      zoom: 100,
      partySize: 6,
      shareExperience: true,
      mapDetails: true,
      devMode: false,
    },
    allowedZoomLevels: [100, 90, 80, 70, 60, 50],
    maxSaveSlots: 5,
  },
  themes: {
    themes: [{ id: "classic", label: "Classic" }],
  },
  items: {
    items: [
      {
        id: "basic-orb",
        name: "Basic Orb",
        type: "catch",
        effect: { catchModifier: 1 },
      },
      {
        id: "small-tonic",
        name: "Small Tonic",
        type: "heal",
        effect: { healAmount: 20 },
      },
    ],
  },
  monsters: {
    species: [
      {
        id: "emberfox",
        name: "Emberfox",
        baseStats: {
          hp: 20,
          attack: 8,
          defense: 6,
          speed: 9,
        },
        growth: "medium",
        skills: ["basic-attack"],
        variants: [{ id: "default", sprite: "assets/monsters/emberfox.png" }],
      },
      {
        id: "mossmite",
        name: "Mossmite",
        baseStats: {
          hp: 18,
          attack: 7,
          defense: 7,
          speed: 6,
        },
        growth: "fast",
        skills: ["basic-attack"],
        variants: [{ id: "default", sprite: "assets/monsters/mossmite.png" }],
      },
    ],
  },
  towns: {
    towns: [
      {
        id: "lily-harbor",
        name: "Lily Harbor",
        mapId: "lily-harbor",
        spawn: { x: 512, y: 384 },
      },
    ],
  },
  trainers: {
    trainers: [],
  },
  maps: {
    "lily-harbor": {
      id: "lily-harbor",
      name: "Lily Harbor",
      kind: "town",
      safezone: true,
      tileSize: 128,
      mapWidth: 30,
      mapHeight: 19,
      image: "assets/Maps/Lily Harbor.png",
      layers: [{ name: "Ground Layer", positions: [] }],
    },
  },
  mapMetadata: {
    "lily-harbor": {
      mapId: "lily-harbor",
      displayName: "Lily Harbor",
      isTown: true,
      safezone: true,
      collisionGrid: 64,
      transitions: [],
      interactions: [],
      spawnZones: [],
      trainers: [],
      mapMonstersPanel: [],
    },
  },
};
