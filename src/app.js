(function () {
  const SAVE_INDEX_KEY = "pastel-trails.save-index";
  const SAVE_PREFIX = "pastel-trails.save.";
  const IMAGE_CACHE = new Map();
  let ACTIVE_APP = null;
  const keysDown = new Set();
  const TOUCH_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  const VIEWPORT = { width: 960, height: 640 };
  const PLAYER_RADIUS = 16;
  const PLAYER_HITBOX = { width: 28, height: 28 };
  const WILD_RADIUS = 18;
  const WILD_RESPAWN_MS = 120000;
  const TRANSITION_COOLDOWN_MS = 600;

  const fallbackContent = {
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
    themes: { themes: [{ id: "classic", label: "Classic" }] },
    items: { items: [{ id: "basic-orb", name: "Basic Orb", type: "catch", effect: { catchModifier: 1 } }] },
    skills: {
      skills: [
        {
          id: "basic-attack",
          name: "Basic Attack",
          kind: "attack",
          power: 8,
          description: "A simple physical strike.",
        },
      ],
    },
    monsters: {
      species: [
        {
          id: "emberfox",
          name: "Emberfox",
          baseStats: { hp: 20, attack: 8, defense: 6, speed: 9 },
          growth: "medium",
          skills: ["basic-attack"],
          variants: [{ id: "default", sprite: "assets/monsters/emberfox.png" }],
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
          includeInStarterSelection: true,
        },
      ],
    },
    trainers: { trainers: [] },
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

  function getEmbeddedContent() {
    return window.PASTEL_TRAILS_LOCAL_CONTENT || fallbackContent;
  }

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

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugify(value) {
    return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function getCollisionProfile(layerName, tileSize) {
    const value = String(layerName || "").toLowerCase();
    const half = tileSize / 2;

    if (value.includes("top half")) {
      return { type: "top-half", width: tileSize, height: half, offsetX: 0, offsetY: 0 };
    }

    if (value.includes("bottom half")) {
      return { type: "bottom-half", width: tileSize, height: half, offsetX: 0, offsetY: half };
    }

    if (value.includes("left half")) {
      return { type: "left-half", width: half, height: tileSize, offsetX: 0, offsetY: 0 };
    }

    if (value.includes("right half")) {
      return { type: "right-half", width: half, height: tileSize, offsetX: half, offsetY: 0 };
    }

    return { type: "full", width: tileSize, height: tileSize, offsetX: 0, offsetY: 0 };
  }

  function normalizeMap(mapId, mapData) {
    if (mapData.layers && mapData.mapWidth) {
      const visualLayers = (mapData.layers || []).filter(function (layer) {
        return !/^collision\b/i.test(layer.name || "");
      });
      const collisionLayers = (mapData.collisionLayers || mapData.layers || []).filter(function (layer) {
        return /^collision\b/i.test(layer.name || "");
      }).map(function (layer) {
        return Object.assign({}, layer, { collision: layer.collision || getCollisionProfile(layer.name, mapData.tileSize) });
      });

      return Object.assign({}, mapData, {
        layers: visualLayers,
        collisionLayers,
      });
    }

    const name = mapData.Map?.Name || mapId;
    const normalizedId = slugify(mapData.Map?.ID || mapId);

    const allLayers = mapData.layers || [];
    const visualLayers = allLayers.filter(function (layer) {
      return !/^collision\b/i.test(layer.name || "");
    });
    const collisionLayers = allLayers.filter(function (layer) {
      return /^collision\b/i.test(layer.name || "");
    }).map(function (layer) {
      return Object.assign({}, layer, { collision: getCollisionProfile(layer.name, mapData.tile_size) });
    });

    return {
      id: normalizedId,
      name,
      kind: String(mapData.Map?.Kind || "Town").toLowerCase(),
      safezone: String(mapData.Map?.Safezone || "False").toLowerCase() === "true",
      tileSize: mapData.tile_size,
      mapWidth: mapData.map_width,
      mapHeight: mapData.map_height,
      image: mapData.__imagePath || ("assets/Maps/" + name + ".png"),
      layers: visualLayers,
      collisionLayers,
      transitions: mapData.Transitions || [],
      interactions: mapData.Interactions || [],
      wildSpawns: mapData["Wild Spawns"] || [],
    };
  }

  function normalizeContent(rawContent, source) {
    const maps = {};
    const metadata = {};

    Object.entries(rawContent.maps || {}).forEach(function ([mapId, mapData]) {
      const normalizedMap = normalizeMap(mapId, mapData);
      maps[normalizedMap.id] = normalizedMap;

      const rawMeta = rawContent.mapMetadata?.[mapId] || rawContent.mapMetadata?.[normalizedMap.id] || {};
      metadata[normalizedMap.id] = {
        mapId: normalizedMap.id,
        displayName: rawMeta.displayName || normalizedMap.name,
        isTown: rawMeta.isTown ?? (normalizedMap.kind === "town"),
        safezone: rawMeta.safezone ?? normalizedMap.safezone,
        collisionGrid: rawMeta.collisionGrid || 64,
        transitions: rawMeta.transitions || normalizedMap.transitions || [],
        interactions: rawMeta.interactions || normalizedMap.interactions || [],
        spawnZones: rawMeta.spawnZones || [],
        trainers: rawMeta.trainers || [],
        mapMonstersPanel: rawMeta.mapMonstersPanel || [],
      };
    });

    return {
      settings: rawContent.settings,
      themes: rawContent.themes,
      items: rawContent.items,
      skills: rawContent.skills || JSON.parse(JSON.stringify(fallbackContent.skills)),
      monsters: rawContent.monsters,
      towns: {
        towns: rawContent.towns.towns.map(function (town) {
          return {
            id: slugify(town.id || town.name),
            name: town.name,
            mapId: slugify(town.mapId || town.name),
            spawn: town.spawn,
            includeInStarterSelection: town.includeInStarterSelection ?? true,
          };
        }),
      },
      trainers: rawContent.trainers,
      maps,
      mapMetadata: metadata,
      runtime: {
        source,
        protocol: window.location.protocol,
      },
    };
  }

  function validateContent(content) {
    if (!content.monsters?.species?.length) {
      throw new Error("No monsters are available.");
    }

    if (!content.towns?.towns?.length) {
      throw new Error("No towns are available.");
    }

    content.towns.towns.forEach(function (town) {
      if (!content.maps[town.mapId]) {
        throw new Error("Town '" + town.name + "' references missing map '" + town.mapId + "'.");
      }
    });
  }

  async function readJsonFromHandle(directoryHandle, pathParts) {
    let current = directoryHandle;

    for (const part of pathParts.slice(0, -1)) {
      current = await current.getDirectoryHandle(part);
    }

    const fileHandle = await current.getFileHandle(pathParts[pathParts.length - 1]);
    const file = await fileHandle.getFile();
    return JSON.parse(await file.text());
  }

  async function tryReadJsonFromHandle(directoryHandle, pathParts) {
    try {
      return await readJsonFromHandle(directoryHandle, pathParts);
    } catch {
      return null;
    }
  }

  async function collectJsonFilesRecursive(directoryHandle, prefixParts) {
    const files = [];

    for await (const [name, handle] of directoryHandle.entries()) {
      if (handle.kind === "file" && name.toLowerCase().endsWith(".json")) {
        files.push({
          name,
          pathParts: [...prefixParts, name],
          data: JSON.parse(await (await handle.getFile()).text()),
        });
      } else if (handle.kind === "directory") {
        const nested = await collectJsonFilesRecursive(handle, [...prefixParts, name]);
        files.push(...nested);
      }
    }

    return files;
  }

  async function loadAuthoredMapsFromAssets(rootHandle) {
    const assetsHandle = await rootHandle.getDirectoryHandle("assets");
    const mapsHandle = await assetsHandle.getDirectoryHandle("Maps");
    const jsonFiles = await collectJsonFilesRecursive(mapsHandle, ["assets", "Maps"]);
    const maps = {};

    jsonFiles.forEach(function (file) {
      const rawName = file.data.Map?.Name || file.name.replace(/\.json$/i, "");
      const mapId = slugify(file.data.Map?.ID || rawName);
      const imagePathParts = [...file.pathParts];
      imagePathParts[imagePathParts.length - 1] = file.name.replace(/\.json$/i, ".png");
      maps[mapId] = Object.assign({}, file.data, {
        __imagePath: imagePathParts.join("/"),
      });
    });

    return maps;
  }

  async function loadContentFromDirectory(rootHandle) {
    const settings = await readJsonFromHandle(rootHandle, ["data", "settings.json"]);
    const themes = await readJsonFromHandle(rootHandle, ["data", "themes.json"]);
    const items = await readJsonFromHandle(rootHandle, ["data", "items.json"]);
    const skills = await tryReadJsonFromHandle(rootHandle, ["data", "skills.json"]) || JSON.parse(JSON.stringify(fallbackContent.skills));
    const monsters = await readJsonFromHandle(rootHandle, ["data", "monsters.json"]);
    const towns = await readJsonFromHandle(rootHandle, ["data", "towns.json"]);
    const trainers = await readJsonFromHandle(rootHandle, ["data", "trainers.json"]);

    const maps = await loadAuthoredMapsFromAssets(rootHandle);
    const mapMetadata = {};
    for (const mapId of Object.keys(maps)) {
      mapMetadata[mapId] = await tryReadJsonFromHandle(rootHandle, ["data", "map-metadata", mapId + ".meta.json"]) || {};
    }

    return normalizeContent({ settings, themes, items, skills, monsters, towns, trainers, maps, mapMetadata }, "directory");
  }

  function loadEmbeddedContent() {
    return normalizeContent(getEmbeddedContent(), "embedded");
  }

  function getImage(src) {
    if (IMAGE_CACHE.has(src)) {
      return IMAGE_CACHE.get(src);
    }

    const image = new Image();
    image.addEventListener("load", function () {
      if (!ACTIVE_APP) {
        return;
      }

      window.requestAnimationFrame(function () {
        if (!ACTIVE_APP) {
          return;
        }

        if (ACTIVE_APP.state.screen === "world") {
          const canvas = document.querySelector(".world-canvas");
          if (canvas) {
            drawWorld(canvas, ACTIVE_APP.state, ACTIVE_APP.content, ACTIVE_APP.devTools);
          }
          return;
        }

        ACTIVE_APP.render();
      });
    });
    image.src = src;
    IMAGE_CACHE.set(src, image);
    return image;
  }

  function createSaveManager(storage) {
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

    return {
      listSaves: function () {
        const index = safeParse(storage.getItem(SAVE_INDEX_KEY), []);
        return index.map(function (slotId) {
          const save = safeParse(storage.getItem(SAVE_PREFIX + slotId), null);
          return save ? createPreview(save) : null;
        }).filter(Boolean);
      },
      readSave: function (slotId) {
        return safeParse(storage.getItem(SAVE_PREFIX + slotId), null);
      },
      writeSave: function (save) {
        storage.setItem(SAVE_PREFIX + save.slotId, JSON.stringify(save, null, 2));
        const index = safeParse(storage.getItem(SAVE_INDEX_KEY), []);
        if (!index.includes(save.slotId)) {
          index.push(save.slotId);
          storage.setItem(SAVE_INDEX_KEY, JSON.stringify(index));
        }
      },
    };
  }

  function getSpecies(content, speciesId) {
    return content.monsters.species.find(function (species) {
      return species.id === speciesId;
    });
  }

  function ensureSkillCatalog(content) {
    if (!content.skills || !Array.isArray(content.skills.skills)) {
      content.skills = JSON.parse(JSON.stringify(fallbackContent.skills));
    }

    return content.skills.skills;
  }

  function getSkill(content, skillId) {
    return ensureSkillCatalog(content).find(function (skill) {
      return skill.id === skillId;
    });
  }

  function createMonsterInstance(species, level) {
    return {
      instanceId: window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now() + Math.random()),
      speciesId: species.id,
      variantId: species.variants?.[0]?.id || "default",
      level,
      xp: 0,
      stats: Object.assign({}, species.baseStats),
      currentHp: species.baseStats.hp,
      skills: (species.skills || []).slice(),
    };
  }

  function getSpeciesVariant(species, variantId) {
    return species?.variants?.find(function (variant) {
      return variant.id === variantId;
    }) || species?.variants?.[0] || null;
  }

  function ensureSpawnZone(mapMeta) {
    if (!Array.isArray(mapMeta.spawnZones)) {
      mapMeta.spawnZones = [];
    }

    if (!mapMeta.spawnZones.length) {
      mapMeta.spawnZones.push({
        id: "default-zone",
        label: "Default Zone",
        bounds: { x: 0, y: 0, width: 0, height: 0 },
        visibleSpawns: [],
        spawnTable: [],
      });
    }

    if (!Array.isArray(mapMeta.spawnZones[0].visibleSpawns)) {
      mapMeta.spawnZones[0].visibleSpawns = [];
    }

    return mapMeta.spawnZones[0];
  }

  function ensureSpawnOptions(spawn, content) {
    if (!Array.isArray(spawn.monsterOptions)) {
      spawn.monsterOptions = [];
    }

    if (!spawn.monsterOptions.length) {
      const fallbackSpeciesId = spawn.speciesId || content?.monsters?.species?.[0]?.id || "unknown";
      spawn.monsterOptions.push({
        speciesId: fallbackSpeciesId,
        variantId: "",
        weight: 100,
      });
    }

    return spawn.monsterOptions;
  }

  function getSpawnDisplaySpeciesId(spawn, content) {
    return ensureSpawnOptions(spawn, content)[0]?.speciesId || spawn.speciesId || content.monsters.species[0]?.id || "unknown";
  }

  function getSpawnOptionVariantId(species, option) {
    if (!species) {
      return "";
    }

    const requestedVariantId = option?.variantId || "";
    if (!requestedVariantId) {
      return "";
    }

    return getSpeciesVariant(species, requestedVariantId)?.id || "";
  }

  function pickWeightedSpeciesId(options) {
    const normalized = (options || []).map(function (entry) {
      return {
        speciesId: entry.speciesId,
        variantId: entry.variantId || "",
        weight: Math.max(0, Number(entry.weight || 0)),
      };
    }).filter(function (entry) {
      return entry.speciesId && entry.weight > 0;
    });

    if (!normalized.length) {
      return null;
    }

    const totalWeight = normalized.reduce(function (sum, entry) {
      return sum + entry.weight;
    }, 0);

    let roll = Math.random() * totalWeight;
    for (const entry of normalized) {
      roll -= entry.weight;
      if (roll <= 0) {
        return entry;
      }
    }

    return normalized[normalized.length - 1];
  }

  function rollSpawnLevel(spawn) {
    const minLevel = Math.max(1, Number(spawn.levelMin || spawn.level || 1));
    const maxLevel = Math.max(minLevel, Number(spawn.levelMax || minLevel));
    return minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1));
  }

  function createWildMonsterFromSpawn(content, spawn, index) {
    const spawnChance = Math.max(0, Math.min(100, Number(spawn.spawnChance ?? 100)));
    if (Math.random() * 100 > spawnChance) {
      return null;
    }

    const pickedOption = pickWeightedSpeciesId(ensureSpawnOptions(spawn, content));
    if (!pickedOption?.speciesId) {
      return null;
    }

    const species = getSpecies(content, pickedOption.speciesId) || content.monsters.species[0];
    const variantId = getSpawnOptionVariantId(species, pickedOption) || getSpeciesVariant(species, "")?.id || "default";
    const sourceSpawnId = spawn.id || ("spawn-" + (index + 1));

    return {
      id: sourceSpawnId,
      speciesId: species.id,
      variantId,
      level: rollSpawnLevel(spawn),
      x: Number(spawn.x || 0),
      y: Number(spawn.y || 0),
      active: true,
      respawnsAt: null,
      label: "Wild " + species.name,
      sourceSpawnId,
      respawnSeconds: Number(spawn.respawnSeconds || 120),
      spawnConfig: JSON.parse(JSON.stringify(spawn)),
    };
  }

  function getEditableVisibleSpawns(mapMeta) {
    return ensureSpawnZone(mapMeta).visibleSpawns;
  }

  function getEditableInteractions(mapMeta) {
    if (!Array.isArray(mapMeta.interactions)) {
      mapMeta.interactions = [];
    }

    return mapMeta.interactions;
  }

  function createDefaultInteraction(index) {
    return {
      id: "interaction-" + index,
      type: "sign",
      x: 0,
      y: 0,
      width: 128,
      height: 128,
      label: "New Interaction",
      text: "Add interaction text here.",
      data: {
        shopId: "",
        arenaId: "",
        crestId: "",
      },
    };
  }

  function buildInteractionPrompt(interaction) {
    switch (interaction.type) {
      case "healing-center":
        return "Press E to heal your party";
      case "shop":
        return "Press E to enter the shop";
      case "arena":
        return "Press E to approach the arena";
      case "door":
        return "Press E to use the door";
      default:
        return "Press E to interact";
    }
  }

  function getActiveInteraction(state, content) {
    if (state.screen !== "world" || state.battle || state.interaction) {
      return null;
    }

    const interactions = getEditableInteractions(content.mapMetadata[state.world.currentMapId] || {});
    return interactions.find(function (interaction) {
      return pointInRect(state.world.position.x, state.world.position.y, interaction);
    }) || null;
  }

  function openInteraction(state, content, interaction) {
    const label = interaction.label || interaction.id || "Interaction";
    let text = interaction.text || "";

    if (interaction.type === "healing-center") {
      state.party.forEach(function (monster) {
        monster.currentHp = monster.stats.hp;
      });
      text = text || "Your party was fully restored.";
      state.message = "Your party was healed at " + label + ".";
    } else if (interaction.type === "shop") {
      text = text || "The shop interface is not built yet, but this is where it will open.";
      state.message = "Visited " + label + ".";
    } else if (interaction.type === "arena") {
      text = text || "The arena challenge flow is not built yet, but this is where it will start.";
      state.message = "Checked in at " + label + ".";
    } else if (interaction.type === "door") {
      text = text || "This door does not lead anywhere yet.";
      state.message = "Examined " + label + ".";
    } else {
      text = text || "There is nothing more to do here yet.";
      state.message = "Read " + label + ".";
    }

    state.interaction = {
      id: interaction.id,
      type: interaction.type,
      title: label,
      text,
    };
  }

  function createWildMonstersForMap(content, mapId, position) {
    const mapMeta = content.mapMetadata[mapId];
    if (mapMeta?.safezone) {
      return [];
    }

    const visibleSpawns = getEditableVisibleSpawns(mapMeta);
    if (visibleSpawns.length) {
      return visibleSpawns.map(function (spawn, index) {
        return createWildMonsterFromSpawn(content, spawn, index);
      }).filter(Boolean);
    }

    const playerSpawn = position;
    const speciesPool = content.monsters.species;
    const emberfox = speciesPool[0];
    const secondSpecies = speciesPool[1] || speciesPool[0];

    return [
      {
        id: "wild-1",
        speciesId: emberfox.id,
        level: 3,
        x: playerSpawn.x + 160,
        y: playerSpawn.y + 48,
        active: true,
        respawnsAt: null,
        label: "Curious wild " + emberfox.name,
        sourceSpawnId: "wild-1",
      },
      {
        id: "wild-2",
        speciesId: secondSpecies.id,
        level: 4,
        x: playerSpawn.x + 320,
        y: playerSpawn.y + 200,
        active: true,
        respawnsAt: null,
        label: "Prototype wild " + secondSpecies.name,
        sourceSpawnId: "wild-2",
      },
    ];
  }

  function buildNewGameSetup(content) {
    const starterTowns = getStarterTownOptions(content);
    return {
      screen: "new-game",
      starterSpeciesId: content.monsters.species[0].id,
      townId: starterTowns[0].id,
      avatarId: "avatar-1",
      playerName: "Player",
      saveName: "",
      message: "Choose your starter, town, and avatar before beginning.",
    };
  }

  function getNextSaveSlotId(saveManager, maxSlots) {
    const used = new Set(saveManager.listSaves().map(function (slot) {
      return slot.slotId;
    }));

    for (let index = 1; index <= maxSlots; index += 1) {
      const candidate = "slot-" + index;
      if (!used.has(candidate)) {
        return candidate;
      }
    }

    return "slot-1";
  }

  function createNewGameState(content, options, saveManager) {
    const slotId = getNextSaveSlotId(saveManager, content.settings.maxSaveSlots || 5);
    const starterTowns = getStarterTownOptions(content);
    const starterTown = starterTowns.find(function (town) {
      return town.id === options.townId;
    }) || starterTowns[0];
    const starterSpecies = getSpecies(content, options.starterSpeciesId) || content.monsters.species[0];
    const party = [createMonsterInstance(starterSpecies, 5)];
    const world = {
      currentMapId: starterTown.mapId,
      position: { x: starterTown.spawn.x, y: starterTown.spawn.y },
      lastTownId: starterTown.id,
      transitionCooldownUntil: 0,
      wildMonsters: [],
    };

    world.wildMonsters = createWildMonstersForMap(content, world.currentMapId, world.position);

    return {
      screen: "world",
      currentSaveSlotId: slotId,
      currentSaveName: options.saveName,
      settings: Object.assign({}, content.settings.defaults),
      player: {
        name: options.playerName,
        avatarId: options.avatarId,
        money: 250,
        experience: 0,
        skills: [],
        lastTownId: starterTown.id,
      },
      world,
      party,
      bank: [],
      registry: { seen: [starterSpecies.id], caught: [starterSpecies.id] },
      inventory: [
        { itemId: "basic-orb", quantity: 5 },
        { itemId: "small-tonic", quantity: 2 },
      ],
      ui: {
        activePanel: "",
      },
      battle: null,
      interaction: null,
      message: content.mapMetadata[starterTown.mapId]?.safezone
        ? "Welcome to " + starterTown.name + ". Leave town through a transition to find wild monsters."
        : "Welcome to " + starterTown.name + ". Walk into a visible wild monster to start a battle.",
    };
  }

  function hydrateStateFromSave(save, content) {
    const state = {
      screen: "world",
      currentSaveSlotId: save.slotId,
      currentSaveName: save.saveName,
      settings: Object.assign({}, content.settings.defaults, save.settings),
      player: save.player,
      world: Object.assign({}, save.world),
      party: save.party,
      bank: save.bank || [],
      registry: save.registry || { seen: [], caught: [] },
      inventory: save.inventory || [],
      ui: {
        activePanel: "",
      },
      battle: null,
      interaction: null,
      message: "Loaded " + save.saveName + ".",
    };

    if (!Array.isArray(state.world.wildMonsters) || !state.world.wildMonsters.length) {
      state.world.wildMonsters = createWildMonstersForMap(content, state.world.currentMapId, state.world.position);
    }

    if (typeof state.world.transitionCooldownUntil !== "number") {
      state.world.transitionCooldownUntil = 0;
    }

    return state;
  }

  function serializeState(state) {
    return {
      slotId: state.currentSaveSlotId || "slot-1",
      saveName: state.currentSaveName || "Pastel Trails Adventure",
      updatedAt: new Date().toISOString(),
      player: state.player,
      world: state.world,
      settings: state.settings,
      party: state.party,
      bank: state.bank,
      registry: state.registry,
      inventory: state.inventory,
    };
  }

  function ensureWorldUiState(state) {
    if (!state.ui) {
      state.ui = { activePanel: "" };
    }

    if (typeof state.ui.activePanel !== "string") {
      state.ui.activePanel = "";
    }

    return state.ui;
  }

  function calculateDamage(attacker, defender) {
    const base = attacker.stats.attack - Math.floor(defender.stats.defense / 2);
    return Math.max(1, base + Math.floor(Math.random() * 3));
  }

  function startBattle(state, content, wildMonsterId) {
    const wildMonster = state.world.wildMonsters.find(function (monster) {
      return monster.id === wildMonsterId;
    });

    if (!wildMonster || !wildMonster.active) {
      return;
    }

    const species = getSpecies(content, wildMonster.speciesId);
    const enemy = {
      wildMonsterId: wildMonster.id,
      speciesId: wildMonster.speciesId,
      variantId: wildMonster.variantId || "default",
      name: species.name,
      level: wildMonster.level,
      stats: Object.assign({}, species.baseStats),
      currentHp: species.baseStats.hp,
      maxHp: species.baseStats.hp,
    };

    state.battle = {
      enemy,
      playerIndex: 0,
      log: ["A wild " + species.name + " approached in Lily Harbor."],
      outcome: null,
    };
  }

  function markWildMonsterDefeated(state, wildMonsterId) {
    const wildMonster = state.world.wildMonsters.find(function (monster) {
      return monster.id === wildMonsterId;
    });

    if (!wildMonster) {
      return;
    }

    wildMonster.active = false;
    wildMonster.respawnsAt = Date.now() + ((Number(wildMonster.respawnSeconds || 120) * 1000) || WILD_RESPAWN_MS);
  }

  function grantVictoryRewards(state) {
    const activeMonster = state.party[0];
    activeMonster.xp += 5;
    state.player.money += 12;
  }

  function returnToTown(state, content) {
    const town = content.towns.towns.find(function (entry) {
      return entry.id === state.player.lastTownId;
    }) || content.towns.towns[0];

    state.world.currentMapId = town.mapId;
    state.world.position = { x: town.spawn.x, y: town.spawn.y };
  }

  function resolveBattleAttack(state, content) {
    if (!state.battle || state.battle.outcome) {
      return;
    }

    const playerMonster = state.party[state.battle.playerIndex];
    const enemy = state.battle.enemy;
    const enemySpecies = getSpecies(content, enemy.speciesId);
    const enemyInstance = {
      stats: enemy.stats,
      currentHp: enemy.currentHp,
    };

    const playerFirst = playerMonster.stats.speed >= enemy.stats.speed;
    const steps = playerFirst ? ["player", "enemy"] : ["enemy", "player"];

    steps.forEach(function (step) {
      if (state.battle.outcome) {
        return;
      }

      if (step === "player") {
        const damage = calculateDamage(playerMonster, enemyInstance);
        enemy.currentHp = Math.max(0, enemy.currentHp - damage);
        state.battle.log.unshift(getSpecies(content, playerMonster.speciesId).name + " dealt " + damage + " damage.");

        if (enemy.currentHp <= 0) {
          state.battle.outcome = "victory";
          state.battle.log.unshift(enemySpecies.name + " fainted.");
          markWildMonsterDefeated(state, enemy.wildMonsterId);
          grantVictoryRewards(state);
          state.message = "Victory. Your party earned 5 XP and $12.";
        }
      } else {
        const damage = calculateDamage({ stats: enemy.stats }, playerMonster);
        playerMonster.currentHp = Math.max(0, playerMonster.currentHp - damage);
        state.battle.log.unshift(enemySpecies.name + " dealt " + damage + " damage.");

        if (playerMonster.currentHp <= 0) {
          state.battle.outcome = "defeat";
          state.battle.log.unshift("Your " + getSpecies(content, playerMonster.speciesId).name + " fainted.");
          playerMonster.currentHp = playerMonster.stats.hp;
          returnToTown(state, content);
          state.message = "You blacked out and returned to " + content.mapMetadata[state.world.currentMapId].displayName + ".";
        }
      }
    });
  }

  function resolveCatch(state, content) {
    if (!state.battle || state.battle.outcome) {
      return;
    }

    const enemy = state.battle.enemy;
    const species = getSpecies(content, enemy.speciesId);
    const item = state.inventory.find(function (entry) {
      return entry.itemId === "basic-orb" && entry.quantity > 0;
    });

    if (!item) {
      state.battle.log.unshift("You have no Basic Orbs left.");
      return;
    }

    item.quantity -= 1;
    const hpRatio = enemy.currentHp / enemy.maxHp;
    const catchChance = Math.max(0.25, 0.95 - hpRatio * 0.7);

    if (Math.random() <= catchChance) {
      const captured = createMonsterInstance(species, enemy.level);
      captured.variantId = enemy.variantId || captured.variantId;
      state.registry.seen = Array.from(new Set(state.registry.seen.concat(species.id)));
      state.registry.caught = Array.from(new Set(state.registry.caught.concat(species.id)));

      if (state.party.length < state.settings.partySize) {
        state.party.push(captured);
        state.message = species.name + " joined your party.";
      } else {
        state.bank.push(captured);
        state.message = species.name + " was sent to the bank because your party is full.";
      }

      markWildMonsterDefeated(state, enemy.wildMonsterId);
      state.battle.outcome = "caught";
      state.battle.log.unshift("Success. You caught " + species.name + ".");
      return;
    }

    state.battle.log.unshift(species.name + " broke free.");
    resolveEnemyCounter(state, content);
  }

  function resolveEnemyCounter(state, content) {
    if (!state.battle || state.battle.outcome) {
      return;
    }

    const playerMonster = state.party[state.battle.playerIndex];
    const enemy = state.battle.enemy;
    const enemySpecies = getSpecies(content, enemy.speciesId);
    const damage = calculateDamage({ stats: enemy.stats }, playerMonster);
    playerMonster.currentHp = Math.max(0, playerMonster.currentHp - damage);
    state.battle.log.unshift(enemySpecies.name + " hit back for " + damage + " damage.");

    if (playerMonster.currentHp <= 0) {
      state.battle.outcome = "defeat";
      playerMonster.currentHp = playerMonster.stats.hp;
      returnToTown(state, content);
      state.message = "You blacked out and returned to " + content.mapMetadata[state.world.currentMapId].displayName + ".";
    }
  }

  function attemptRun(state, content) {
    if (!state.battle || state.battle.outcome) {
      return;
    }

    if (Math.random() < 0.9) {
      state.battle.outcome = "fled";
      state.message = "You got away safely.";
      state.battle.log.unshift("You ran away.");
      return;
    }

    state.battle.log.unshift("Couldn't escape.");
    resolveEnemyCounter(state, content);
  }

  function swapMonster(state, content) {
    if (!state.battle || state.party.length < 2 || state.battle.outcome) {
      return;
    }

    const nextIndex = (state.battle.playerIndex + 1) % state.party.length;
    state.battle.playerIndex = nextIndex;
    state.battle.log.unshift("You swapped to another monster.");
    resolveEnemyCounter(state, content);
  }

  function useTonic(state, content) {
    if (!state.battle || state.battle.outcome) {
      return;
    }

    const tonic = state.inventory.find(function (entry) {
      return entry.itemId === "small-tonic" && entry.quantity > 0;
    });

    if (!tonic) {
      state.battle.log.unshift("You are out of Small Tonics.");
      return;
    }

    const active = state.party[state.battle.playerIndex];
    tonic.quantity -= 1;
    active.currentHp = Math.min(active.stats.hp, active.currentHp + 20);
    state.battle.log.unshift("Your active monster recovered 20 HP.");
    resolveEnemyCounter(state, content);
  }

  function updateRespawns(state, content) {
    const now = Date.now();

    state.world.wildMonsters.forEach(function (monster) {
      if (!monster.active && monster.respawnsAt && monster.respawnsAt <= now) {
        const rerolled = createWildMonsterFromSpawn(content, monster.spawnConfig || {
          id: monster.sourceSpawnId,
          speciesId: monster.speciesId,
          x: monster.x,
          y: monster.y,
          levelMin: monster.level,
          levelMax: monster.level,
          respawnSeconds: monster.respawnSeconds || 120,
        }, 0);

        if (rerolled) {
          monster.speciesId = rerolled.speciesId;
          monster.level = rerolled.level;
          monster.x = rerolled.x;
          monster.y = rerolled.y;
          monster.active = true;
          monster.respawnsAt = null;
          monster.label = rerolled.label;
          monster.respawnSeconds = rerolled.respawnSeconds;
          monster.spawnConfig = rerolled.spawnConfig;
        } else {
          monster.active = false;
          monster.respawnsAt = now + ((Number(monster.respawnSeconds || 120) * 1000) || WILD_RESPAWN_MS);
          monster.label = "Wild spawn recharging";
        }
      }
    });
  }

  function clampPlayerToMap(state, content) {
    const map = content.maps[state.world.currentMapId];
    const maxX = map.mapWidth * map.tileSize - PLAYER_RADIUS;
    const maxY = map.mapHeight * map.tileSize - PLAYER_RADIUS;

    state.world.position.x = Math.max(PLAYER_RADIUS, Math.min(maxX, state.world.position.x));
    state.world.position.y = Math.max(PLAYER_RADIUS, Math.min(maxY, state.world.position.y));
  }

  function pointInRect(x, y, rect) {
    return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
  }

  function findTriggeredTransition(state, content) {
    const now = Date.now();
    if (state.world.transitionCooldownUntil > now) {
      return null;
    }

    const mapMeta = content.mapMetadata[state.world.currentMapId];
    const transitions = mapMeta?.transitions || [];

    return transitions.find(function (transition) {
      return pointInRect(state.world.position.x, state.world.position.y, transition);
    }) || null;
  }

  function applyTransition(state, content, transition) {
    const targetMapId = transition.targetMapId;
    const targetMeta = content.mapMetadata[targetMapId];

    state.world.currentMapId = targetMapId;
    state.world.position = {
      x: transition.targetSpawn.x,
      y: transition.targetSpawn.y,
    };
    state.world.transitionCooldownUntil = Date.now() + TRANSITION_COOLDOWN_MS;
    state.world.wildMonsters = createWildMonstersForMap(content, targetMapId, state.world.position);

    if (targetMeta?.isTown) {
      const town = content.towns.towns.find(function (entry) {
        return entry.mapId === targetMapId;
      });
      if (town) {
        state.player.lastTownId = town.id;
        state.world.lastTownId = town.id;
      }
    }

    state.message = "Entered " + (targetMeta?.displayName || targetMapId) + ".";
  }

  function getCollisionRectangles(map) {
    if (map._collisionRects) {
      return map._collisionRects;
    }

    const tileSize = map.tileSize;
    const rectangles = [];

    (map.collisionLayers || []).forEach(function (layer) {
      const profile = layer.collision || getCollisionProfile(layer.name, tileSize);

      (layer.positions || []).forEach(function (tile) {
        rectangles.push({
          x: tile.x * tileSize + profile.offsetX,
          y: tile.y * tileSize + profile.offsetY,
          width: profile.width,
          height: profile.height,
          type: profile.type,
        });
      });
    });

    map._collisionRects = rectangles;
    return rectangles;
  }

  function getPlayerHitboxAt(x, y) {
    return {
      x: x - PLAYER_HITBOX.width / 2,
      y: y - PLAYER_HITBOX.height / 2,
      width: PLAYER_HITBOX.width,
      height: PLAYER_HITBOX.height,
    };
  }

  function rectsIntersect(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  function positionHitsCollision(map, x, y) {
    const collisionRects = getCollisionRectangles(map);
    const playerHitbox = getPlayerHitboxAt(x, y);

    for (const rect of collisionRects) {
      if (rectsIntersect(playerHitbox, rect)) {
        return true;
      }
    }

    return false;
  }

  function tryMoveAlongAxis(map, currentX, currentY, nextX, nextY) {
    let resolvedX = currentX;
    let resolvedY = currentY;

    if (!positionHitsCollision(map, nextX, currentY)) {
      resolvedX = nextX;
    }

    if (!positionHitsCollision(map, resolvedX, nextY)) {
      resolvedY = nextY;
    }

    return { x: resolvedX, y: resolvedY };
  }

  function movePlayer(state, content, deltaMs) {
    if (state.screen !== "world" || state.battle || state.interaction) {
      return;
    }

    let dx = 0;
    let dy = 0;

    if (keysDown.has("ArrowUp") || keysDown.has("w")) dy -= 1;
    if (keysDown.has("ArrowDown") || keysDown.has("s")) dy += 1;
    if (keysDown.has("ArrowLeft") || keysDown.has("a")) dx -= 1;
    if (keysDown.has("ArrowRight") || keysDown.has("d")) dx += 1;

    if (!dx && !dy) {
      return;
    }

    const length = Math.hypot(dx, dy) || 1;
    const speed = 260;
    const map = content.maps[state.world.currentMapId];
    const nextX = state.world.position.x + (dx / length) * speed * (deltaMs / 1000);
    const nextY = state.world.position.y + (dy / length) * speed * (deltaMs / 1000);
    const resolved = tryMoveAlongAxis(map, state.world.position.x, state.world.position.y, nextX, nextY);

    state.world.position.x = resolved.x;
    state.world.position.y = resolved.y;
    clampPlayerToMap(state, content);

    const encountered = state.world.wildMonsters.find(function (monster) {
      return monster.active && Math.hypot(monster.x - state.world.position.x, monster.y - state.world.position.y) < 40;
    });

    if (encountered) {
      startBattle(state, content, encountered.id);
      return;
    }

    const transition = findTriggeredTransition(state, content);
    if (transition) {
      applyTransition(state, content, transition);
    }
  }

  function getCamera(state, content) {
    const map = content.maps[state.world.currentMapId];
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const zoomScale = Math.max(0.1, Number(state.settings.zoom || 100) / 100);
    const visibleWorldWidth = VIEWPORT.width / zoomScale;
    const visibleWorldHeight = VIEWPORT.height / zoomScale;

    const x = Math.max(0, Math.min(worldWidth - visibleWorldWidth, state.world.position.x - visibleWorldWidth / 2));
    const y = Math.max(0, Math.min(worldHeight - visibleWorldHeight, state.world.position.y - visibleWorldHeight / 2));

    return { x, y };
  }

  function snapCamera(camera) {
    return {
      x: Math.round(camera.x),
      y: Math.round(camera.y),
    };
  }

  function isFrontOfPlayerLayer(layerName) {
    return String(layerName || "").trim().toLowerCase() === "higher decor in front of player";
  }

  function createScratchCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    return canvas;
  }

  function getCachedWorldLayerCanvas(map, phase) {
    const tileSize = map.tileSize;
    const image = getImage(map.image);

    if (!image.complete || !image.naturalWidth) {
      return null;
    }

    const cacheKey = phase === "foreground" ? "_foregroundWorldLayerCanvas" : "_baseWorldLayerCanvas";
    const worldWidth = map.mapWidth * tileSize;
    const worldHeight = map.mapHeight * tileSize;
    const cached = map[cacheKey];

    if (
      cached &&
      cached.width === worldWidth &&
      cached.height === worldHeight &&
      cached.imageWidth === image.naturalWidth &&
      cached.imageHeight === image.naturalHeight
    ) {
      return cached.canvas;
    }

    const columns = Math.floor(image.naturalWidth / tileSize);
    const renderLayers = (map.layers || []).filter(function (layer) {
      return !/^collision\b/i.test(layer.name || "") &&
        (phase === "foreground" ? isFrontOfPlayerLayer(layer.name) : !isFrontOfPlayerLayer(layer.name));
    });

    const layerCanvas = createScratchCanvas(worldWidth, worldHeight);
    const layerCtx = layerCanvas.getContext("2d");
    layerCtx.imageSmoothingEnabled = false;

    renderLayers.forEach(function (layer) {
      layer.positions.forEach(function (tile) {
        const worldX = tile.x * tileSize;
        const worldY = tile.y * tileSize;
        const sx = (tile.id % columns) * tileSize;
        const sy = Math.floor(tile.id / columns) * tileSize;
        layerCtx.drawImage(image, sx, sy, tileSize, tileSize, worldX, worldY, tileSize, tileSize);
      });
    });

    map[cacheKey] = {
      canvas: layerCanvas,
      width: worldWidth,
      height: worldHeight,
      imageWidth: image.naturalWidth,
      imageHeight: image.naturalHeight,
    };

    return layerCanvas;
  }

  function drawMap(ctx, map, camera, phase) {
    ctx.imageSmoothingEnabled = false;
    const zoomScale = Math.max(0.1, Number(ACTIVE_APP?.state?.settings?.zoom || 100) / 100);

    if (phase === "base") {
      ctx.fillStyle = "#9fd6da";
      ctx.fillRect(0, 0, VIEWPORT.width, VIEWPORT.height);
    }

    const layerCanvas = getCachedWorldLayerCanvas(map, phase);
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const visibleWorldWidth = Math.min(worldWidth, VIEWPORT.width / zoomScale);
    const visibleWorldHeight = Math.min(worldHeight, VIEWPORT.height / zoomScale);
    const sourceX = Math.max(0, Math.min(worldWidth - visibleWorldWidth, camera.x));
    const sourceY = Math.max(0, Math.min(worldHeight - visibleWorldHeight, camera.y));

    if (layerCanvas) {
      ctx.drawImage(
        layerCanvas,
        sourceX,
        sourceY,
        visibleWorldWidth,
        visibleWorldHeight,
        0,
        0,
        VIEWPORT.width,
        VIEWPORT.height
      );
      return;
    }

    if (phase === "base") {
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading Lily Harbor...", 40, 60);
    }
  }

  function drawTransitionOverlay(ctx, state, content, camera, devToolsState) {
    if (!devToolsState?.open) {
      return;
    }

    const transitions = content.mapMetadata[state.world.currentMapId]?.transitions || [];
    const selectedId = devToolsState.selectedTransitionId;
    const zoomScale = Math.max(0.1, Number(state.settings.zoom || 100) / 100);

    transitions.forEach(function (transition) {
      const x = Math.round((transition.x - camera.x) * zoomScale);
      const y = Math.round((transition.y - camera.y) * zoomScale);
      const isSelected = transition.id === selectedId;

      ctx.save();
      ctx.fillStyle = isSelected ? "rgba(240, 139, 110, 0.30)" : "rgba(35, 110, 143, 0.22)";
      ctx.strokeStyle = isSelected ? "rgba(240, 139, 110, 0.95)" : "rgba(35, 110, 143, 0.95)";
      ctx.lineWidth = isSelected ? 4 : 2;
      ctx.fillRect(x, y, transition.width * zoomScale, transition.height * zoomScale);
      ctx.strokeRect(x, y, transition.width * zoomScale, transition.height * zoomScale);

      ctx.fillStyle = "rgba(30, 35, 42, 0.9)";
      const label = transition.id + " -> " + transition.targetMapId;
      const metrics = ctx.measureText(label);
      const labelWidth = metrics.width + 16;
      const labelY = Math.max(6, y - 30);
      ctx.fillRect(x, labelY, labelWidth, 24);
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.fillText(label, x + 8, labelY + 16);
      ctx.restore();
    });

    const playerX = Math.round((state.world.position.x - camera.x) * zoomScale);
    const playerY = Math.round((state.world.position.y - camera.y) * zoomScale);
    const coords = "Player " + Math.round(state.world.position.x) + ", " + Math.round(state.world.position.y);
    ctx.save();
    ctx.fillStyle = "rgba(30, 35, 42, 0.85)";
    ctx.fillRect(14, 14, ctx.measureText(coords).width + 20, 26);
    ctx.fillStyle = "#fff";
    ctx.font = "12px sans-serif";
    ctx.fillText(coords, 24, 31);
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.strokeRect(playerX - 14, playerY - 14, 28, 28);
    ctx.restore();
  }

  function drawWildMonsterSprite(ctx, monster, content, camera) {
    const species = getSpecies(content, monster.speciesId);
    const variant = getSpeciesVariant(species, monster.variantId);
    const spritePath = variant?.sprite || "";
    const zoomScale = Math.max(0.1, Number(ACTIVE_APP?.state?.settings?.zoom || 100) / 100);
    const screenX = Math.round((monster.x - camera.x) * zoomScale);
    const screenY = Math.round((monster.y - camera.y) * zoomScale);
    const map = content.maps[ACTIVE_APP?.state?.world?.currentMapId || ""];
    const spriteSize = (map?.tileSize || 128) * zoomScale;

    if (spritePath) {
      const image = getImage(spritePath);
      if (image.complete && image.naturalWidth) {
        const drawX = Math.round(screenX - spriteSize / 2);
        const drawY = Math.round(screenY - spriteSize / 2);
        ctx.drawImage(image, drawX, drawY, spriteSize, spriteSize);
        return;
      }
    }

    ctx.beginPath();
    ctx.fillStyle = "#f45f78";
    ctx.arc(screenX, screenY, WILD_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff7f8";
    ctx.font = "14px sans-serif";
    ctx.fillText("!", screenX - 4, screenY + 5);
  }

  function drawWorld(canvas, state, content, devToolsState) {
    const ctx = canvas.getContext("2d");
    const map = content.maps[state.world.currentMapId];
    const camera = snapCamera(getCamera(state, content));
    const zoomScale = Math.max(0.1, Number(state.settings.zoom || 100) / 100);

    drawMap(ctx, map, camera, "base");
    drawTransitionOverlay(ctx, state, content, camera, devToolsState);

    state.world.wildMonsters.forEach(function (monster) {
      if (!monster.active) {
        return;
      }

      drawWildMonsterSprite(ctx, monster, content, camera);
    });

    const playerX = (state.world.position.x - camera.x) * zoomScale;
    const playerY = (state.world.position.y - camera.y) * zoomScale;
    ctx.beginPath();
    ctx.fillStyle = "#1b4f75";
    ctx.arc(playerX, playerY, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.arc(playerX, playerY, PLAYER_RADIUS + 6, 0, Math.PI * 2);
    ctx.stroke();

    drawMap(ctx, map, camera, "foreground");
  }

  function formatTimeUntil(timestamp) {
    if (!timestamp) {
      return "Active";
    }

    const remaining = Math.max(0, Math.ceil((timestamp - Date.now()) / 1000));
    return remaining + "s";
  }

  function renderTitleScreen(root, saveSlots, onAction, notice) {
    const loadButton = saveSlots.length
      ? '<button class="primary-button" type="button" data-action="continue">Continue</button>'
      : "";

    root.innerHTML = [
      '<main class="title-screen">',
      '<section class="title-card">',
      '<div class="eyebrow">Pastel Trails Prototype</div>',
      "<h1>Pastel Trails</h1>",
      "<p>Start a new save, choose your first monster, pick your opening town, and then step into the first playable world slice.</p>",
      '<div class="title-actions">',
      '<button class="primary-button" type="button" data-action="new-game">New Game</button>',
      loadButton,
      '<button class="secondary-button" type="button" data-action="open-dev-tools">Dev Tools</button>',
      '<button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button>',
      "</div>",
      '<section class="save-preview">',
      (notice ? '<p class="title-notice">' + notice + "</p>" : ""),
      "<h2>Save Slots</h2>",
      (saveSlots.length
        ? '<ul class="save-list">' + saveSlots.map(function (slot) {
            return "<li><strong>" + slot.saveName + "</strong><span>" + slot.mapId + " · $" + slot.money + " · " + slot.partyCount + " monsters</span></li>";
          }).join("") + "</ul>"
        : "<p>No saves yet. Start a new game to create one.</p>"),
      "</section>",
      "</section>",
      "</main>",
    ].join("");

    root.querySelector('[data-action="new-game"]')?.addEventListener("click", function () {
      onAction("new-game");
    });
    root.querySelector('[data-action="continue"]')?.addEventListener("click", function () {
      onAction("continue");
    });
    root.querySelector('[data-action="load-folder"]')?.addEventListener("click", function () {
      onAction("load-folder");
    });
    root.querySelector('[data-action="open-dev-tools"]')?.addEventListener("click", function () {
      onAction("open-dev-tools");
    });
  }

  function renderNewGameScreen(root, content, setup, onAction) {
    const starterTowns = getStarterTownOptions(content);
    const speciesCards = content.monsters.species.map(function (species) {
      const selected = setup.starterSpeciesId === species.id ? " option-card-selected" : "";
      return (
        '<button class="option-card' + selected + '" type="button" data-select-starter="' + species.id + '">' +
        "<strong>" + species.name + "</strong>" +
        "<span>HP " + species.baseStats.hp + " · ATK " + species.baseStats.attack + " · DEF " + species.baseStats.defense + " · SPD " + species.baseStats.speed + "</span>" +
        "</button>"
      );
    }).join("");

    const townCards = starterTowns.map(function (town) {
      const selected = setup.townId === town.id ? " option-card-selected" : "";
      return (
        '<button class="option-card' + selected + '" type="button" data-select-town="' + town.id + '">' +
        "<strong>" + town.name + "</strong>" +
        "<span>Starter map: " + town.mapId + "</span>" +
        "</button>"
      );
    }).join("");

    const avatars = [
      { id: "avatar-1", label: "Navigator", accent: "#236e8f" },
      { id: "avatar-2", label: "Scout", accent: "#f08b6e" },
      { id: "avatar-3", label: "Caretaker", accent: "#60a36f" },
    ];

    const avatarCards = avatars.map(function (avatar) {
      const selected = setup.avatarId === avatar.id ? " avatar-card-selected" : "";
      return (
        '<button class="avatar-card' + selected + '" type="button" data-select-avatar="' + avatar.id + '">' +
        '<span class="avatar-swatch" style="background:' + avatar.accent + '"></span>' +
        "<strong>" + avatar.label + "</strong>" +
        "</button>"
      );
    }).join("");

    root.innerHTML = [
      '<main class="title-screen">',
      '<section class="title-card title-card-wide">',
      '<div class="eyebrow">New Game Setup</div>',
      "<h1>Build Your Start</h1>",
      "<p>" + setup.message + "</p>",
      '<section class="setup-section">',
      "<h2>Player</h2>",
      '<div class="form-grid">',
      '<label class="input-group"><span>Name</span><input type="text" maxlength="18" data-field="player-name" value="' + setup.playerName.replace(/"/g, "&quot;") + '" /></label>',
      '<label class="input-group"><span>Save Name</span><input type="text" maxlength="28" data-field="save-name" value="' + setup.saveName.replace(/"/g, "&quot;") + '" placeholder="Optional custom save name" /></label>',
      "</div>",
      "</section>",
      '<section class="setup-section"><div class="section-heading"><h2>Starter Monster</h2><button class="secondary-button" type="button" data-action="random-starter">Random</button></div><div class="option-grid">' + speciesCards + "</div></section>",
      '<section class="setup-section"><div class="section-heading"><h2>Starting Town</h2><button class="secondary-button" type="button" data-action="random-town">Random</button></div><div class="option-grid">' + townCards + "</div><p class=\"dev-helper-text\">Only towns marked for starter selection appear here.</p></section>",
      '<section class="setup-section"><h2>Avatar</h2><div class="avatar-grid">' + avatarCards + "</div></section>",
      '<section class="setup-summary"><p data-setup-preview><strong>Preview:</strong> ' + buildNewGamePreviewText(content, setup) + "</p></section>",
      '<div class="title-actions">',
      '<button class="secondary-button" type="button" data-action="back-to-title">Back</button>',
      '<button class="primary-button" type="button" data-action="begin-adventure">Begin Adventure</button>',
      "</div>",
      "</section>",
      "</main>",
    ].join("");

    root.querySelectorAll("[data-select-starter]").forEach(function (button) {
      button.addEventListener("click", function () {
        onAction("select-starter", button.getAttribute("data-select-starter"));
      });
    });

    root.querySelectorAll("[data-select-town]").forEach(function (button) {
      button.addEventListener("click", function () {
        onAction("select-town", button.getAttribute("data-select-town"));
      });
    });

    root.querySelectorAll("[data-select-avatar]").forEach(function (button) {
      button.addEventListener("click", function () {
        onAction("select-avatar", button.getAttribute("data-select-avatar"));
      });
    });

    root.querySelector('[data-action="random-starter"]')?.addEventListener("click", function () {
      onAction("random-starter");
    });
    root.querySelector('[data-action="random-town"]')?.addEventListener("click", function () {
      onAction("random-town");
    });
    root.querySelector('[data-action="back-to-title"]')?.addEventListener("click", function () {
      onAction("back-to-title");
    });
    root.querySelector('[data-action="begin-adventure"]')?.addEventListener("click", function () {
      onAction("begin-adventure");
    });

    const preview = root.querySelector("[data-setup-preview]");
    const refreshPreview = function () {
      if (!preview) {
        return;
      }

      preview.innerHTML = "<strong>Preview:</strong> " + escapeHtml(buildNewGamePreviewText(content, setup));
    };

    root.querySelector('[data-field="player-name"]')?.addEventListener("input", function (event) {
      onAction("set-player-name", event.target.value);
      refreshPreview();
    });
    root.querySelector('[data-field="save-name"]')?.addEventListener("input", function (event) {
      onAction("set-save-name", event.target.value);
    });
  }

  function renderBattleModal(state, content) {
    if (!state.battle) {
      return "";
    }

    const activeMonster = state.party[state.battle.playerIndex];
    const activeSpecies = getSpecies(content, activeMonster.speciesId);
    const enemy = state.battle.enemy;

    const outcomeButton = state.battle.outcome
      ? '<button class="primary-button" type="button" data-battle-action="close-battle">Return</button>'
      : "";

    return [
      '<div class="battle-overlay">',
      '<section class="battle-modal">',
      '<div class="battle-headings">',
      '<div><span class="eyebrow">Wild</span><h2>' + enemy.name + " Lv " + enemy.level + "</h2><p>HP " + enemy.currentHp + "/" + enemy.maxHp + "</p></div>",
      '<div><span class="eyebrow">Your Monster</span><h2>' + activeSpecies.name + " Lv " + activeMonster.level + "</h2><p>HP " + activeMonster.currentHp + "/" + activeMonster.stats.hp + "</p></div>",
      "</div>",
      '<div class="battle-log">' + state.battle.log.slice(0, 6).map(function (entry) {
        return "<p>" + entry + "</p>";
      }).join("") + "</div>",
      '<div class="battle-actions">',
      '<button type="button" data-battle-action="attack">Attack</button>',
      '<button type="button" data-battle-action="item">Item</button>',
      '<button type="button" data-battle-action="swap">Swap</button>',
      '<button type="button" data-battle-action="catch">Catch</button>',
      '<button type="button" data-battle-action="run">Run</button>',
      outcomeButton,
      "</div>",
      "</section>",
      "</div>",
    ].join("");
  }

  function renderInteractionModal(state) {
    if (!state.interaction) {
      return "";
    }

    return [
      '<div class="battle-overlay">',
      '<section class="battle-modal">',
      '<div class="battle-headings">',
      '<div><span class="eyebrow">Interaction</span><h2>' + escapeHtml(state.interaction.title) + "</h2><p>" + escapeHtml(state.interaction.type) + "</p></div>",
      "</div>",
      '<div class="battle-log"><p>' + escapeHtml(state.interaction.text) + "</p></div>",
      '<div class="battle-actions"><button class="primary-button" type="button" data-action="close-interaction">Close</button></div>',
      "</section>",
      "</div>",
    ].join("");
  }

  function renderWorldPanelModal(state, content) {
    const ui = ensureWorldUiState(state);
    const panel = ui.activePanel;
    if (!panel) {
      return "";
    }

    const mapMeta = content.mapMetadata[state.world.currentMapId];
    const panelTitle = {
      map: "Map",
      character: "Character",
      inventory: "Inventory",
      monsters: "Monsters",
      registry: "Registry",
      quests: "Quests",
      settings: "Settings",
    }[panel] || "Panel";

    let panelBody = "";

    if (panel === "map") {
      const availableMonsters = state.settings.mapDetails
        ? (mapMeta.mapMonstersPanel || []).map(function (monsterId) {
            const species = getSpecies(content, monsterId);
            return "<li><span>" + escapeHtml(species?.name || monsterId) + "</span><strong>" + escapeHtml(monsterId) + "</strong></li>";
          }).join("")
        : '<li><span>Map details are hidden in Settings.</span></li>';

      panelBody = [
        "<p>Current area: <strong>" + escapeHtml(mapMeta.displayName) + "</strong></p>",
        "<p>Coordinates: " + Math.round(state.world.position.x) + ", " + Math.round(state.world.position.y) + "</p>",
        "<p>Safezone: " + (mapMeta.safezone ? "Yes" : "No") + "</p>",
        '<h3>Available Monsters</h3>',
        '<ul class="compact-list">' + (availableMonsters || "<li><span>No monsters listed for this map yet.</span></li>") + "</ul>",
      ].join("");
    } else if (panel === "character") {
      panelBody = [
        "<p>Name: <strong>" + escapeHtml(state.player.name) + "</strong></p>",
        "<p>Avatar: " + escapeHtml(state.player.avatarId || "avatar-1") + "</p>",
        "<p>Money: $" + state.player.money + "</p>",
        "<p>Experience: " + Number(state.player.experience || 0) + "</p>",
        "<p>Last Town: " + escapeHtml(state.player.lastTownId || "Unknown") + "</p>",
        "<p>Support skills are still a placeholder, but this is where they will appear.</p>",
      ].join("");
    } else if (panel === "inventory") {
      panelBody = '<ul class="compact-list">' + state.inventory.map(function (item) {
        return "<li><span>" + escapeHtml(item.itemId) + "</span><strong>x" + Number(item.quantity) + "</strong></li>";
      }).join("") + "</ul>";
    } else if (panel === "monsters") {
      const partyList = state.party.map(function (monster) {
        const species = getSpecies(content, monster.speciesId);
        return "<li><span>" + escapeHtml(species?.name || monster.speciesId) + " Lv " + monster.level + "</span><strong>" + monster.currentHp + "/" + monster.stats.hp + " HP</strong></li>";
      }).join("");
      const bankList = state.bank.length
        ? state.bank.map(function (monster) {
            const species = getSpecies(content, monster.speciesId);
            return "<li><span>" + escapeHtml(species?.name || monster.speciesId) + " Lv " + monster.level + "</span><strong>Banked</strong></li>";
          }).join("")
        : "<li><span>No monsters in the bank yet.</span></li>";

      panelBody = [
        "<p>Party size setting: " + Number(state.settings.partySize) + "</p>",
        "<h3>Party</h3>",
        '<ul class="compact-list">' + partyList + "</ul>",
        "<h3>Bank</h3>",
        '<ul class="compact-list">' + bankList + "</ul>",
      ].join("");
    } else if (panel === "registry") {
      const seenList = state.registry.seen.map(function (monsterId) {
        const species = getSpecies(content, monsterId);
        const caught = state.registry.caught.includes(monsterId) ? "Caught" : "Seen";
        return "<li><span>" + escapeHtml(species?.name || monsterId) + "</span><strong>" + caught + "</strong></li>";
      }).join("");
      panelBody = [
        "<p>Seen: " + state.registry.seen.length + "</p>",
        "<p>Caught: " + state.registry.caught.length + "</p>",
        '<ul class="compact-list">' + (seenList || "<li><span>No monsters logged yet.</span></li>") + "</ul>",
      ].join("");
    } else if (panel === "quests") {
      panelBody = "<p>Quest tracking is still planned work. This panel is ready for that system when you want it.</p>";
    } else if (panel === "settings") {
      const themeOptions = (content.themes.themes || []).map(function (theme) {
        const selected = state.settings.theme === theme.id ? " selected" : "";
        return '<option value="' + escapeHtml(theme.id) + '"' + selected + ">" + escapeHtml(theme.label) + "</option>";
      }).join("");
      const zoomOptions = (content.settings.allowedZoomLevels || [100, 90, 80, 70, 60, 50]).map(function (zoom) {
        const selected = Number(state.settings.zoom) === Number(zoom) ? " selected" : "";
        return '<option value="' + zoom + '"' + selected + ">" + zoom + "%</option>";
      }).join("");

      panelBody = [
        '<div class="form-grid">',
        '<label class="input-group"><span>Theme</span><select data-world-setting="theme">' + themeOptions + "</select></label>",
        '<label class="input-group"><span>Map Zoom</span><select data-world-setting="zoom">' + zoomOptions + "</select></label>",
        '<label class="input-group"><span>Party Size</span><input type="number" min="1" max="12" data-world-setting="partySize" value="' + Number(state.settings.partySize) + '" /></label>',
        '<label class="input-group"><span>Share Experience</span><select data-world-setting="shareExperience"><option value="true"' + (state.settings.shareExperience ? " selected" : "") + '>Yes</option><option value="false"' + (!state.settings.shareExperience ? " selected" : "") + '>No</option></select></label>',
        '<label class="input-group"><span>Show Map Details</span><select data-world-setting="mapDetails"><option value="true"' + (state.settings.mapDetails ? " selected" : "") + '>Yes</option><option value="false"' + (!state.settings.mapDetails ? " selected" : "") + '>No</option></select></label>',
        '</div>',
        '<div class="title-actions"><button class="secondary-button" type="button" data-action="save">Save Game</button><button class="secondary-button" type="button" data-action="title">Return To Title</button></div>',
      ].join("");
    }

    return [
      '<div class="battle-overlay">',
      '<section class="battle-modal world-panel-modal">',
      '<div class="section-heading"><h2>' + panelTitle + '</h2><button class="secondary-button" type="button" data-action="close-world-panel">Close</button></div>',
      '<div class="world-panel-body">' + panelBody + "</div>",
      "</section>",
      "</div>",
    ].join("");
  }

  function renderDevToolsEditor(content, mapId, devToolsState) {
    const mapMeta = content.mapMetadata[mapId];
    const mapType = mapMeta?.isTown ? "town" : "route";
    const transitions = mapMeta?.transitions || [];
    const visibleSpawns = getEditableVisibleSpawns(mapMeta);
    const interactions = getEditableInteractions(mapMeta);
    const editorMode = devToolsState.editorMode || "transitions";
    const selectedTransitionId = devToolsState.selectedTransitionId || transitions[0]?.id || "";
    const selectedTransition = transitions.find(function (transition) {
      return transition.id === selectedTransitionId;
    }) || transitions[0] || null;
    const selectedSpawnId = devToolsState.selectedSpawnId || visibleSpawns[0]?.id || "";
    const selectedSpawn = visibleSpawns.find(function (spawn) {
      return spawn.id === selectedSpawnId;
    }) || visibleSpawns[0] || null;
    const selectedInteractionId = devToolsState.selectedInteractionId || interactions[0]?.id || "";
    const selectedInteraction = interactions.find(function (interaction) {
      return interaction.id === selectedInteractionId;
    }) || interactions[0] || null;

    const mapOptions = Object.keys(content.maps).map(function (candidateId) {
      const selected = selectedTransition?.targetMapId === candidateId ? " selected" : "";
      return '<option value="' + candidateId + '"' + selected + ">" + escapeHtml(content.mapMetadata[candidateId]?.displayName || candidateId) + "</option>";
    }).join("");
    const transitionItems = transitions.length
      ? transitions.map(function (transition) {
          const selected = transition.id === selectedTransitionId ? " compact-list-selected" : "";
          return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-transition="' + transition.id + '">' +
            "<strong>" + escapeHtml(transition.id) + "</strong><span>" + transition.targetMapId + " @ " + transition.x + "," + transition.y + "</span></button></li>";
        }).join("")
      : "<li>No transitions defined yet.</li>";

    const transitionEditor = selectedTransition
      ? [
          '<section class="dev-editor">',
          "<h3>Edit Transition</h3>",
          '<div class="form-grid">',
          '<label class="input-group"><span>ID</span><input data-dev-field="id" value="' + escapeHtml(selectedTransition.id) + '" /></label>',
          '<label class="input-group"><span>Target Map</span><select data-dev-field="targetMapId">' + mapOptions + "</select></label>",
          '<label class="input-group"><span>X</span><input type="number" step="1" data-dev-field="x" value="' + selectedTransition.x + '" /></label>',
          '<label class="input-group"><span>Y</span><input type="number" step="1" data-dev-field="y" value="' + selectedTransition.y + '" /></label>',
          '<label class="input-group"><span>Width</span><input type="number" step="1" data-dev-field="width" value="' + selectedTransition.width + '" /></label>',
          '<label class="input-group"><span>Height</span><input type="number" step="1" data-dev-field="height" value="' + selectedTransition.height + '" /></label>',
          '<label class="input-group"><span>Target Spawn X</span><input type="number" step="1" data-dev-field="targetSpawn.x" value="' + selectedTransition.targetSpawn.x + '" /></label>',
          '<label class="input-group"><span>Target Spawn Y</span><input type="number" step="1" data-dev-field="targetSpawn.y" value="' + selectedTransition.targetSpawn.y + '" /></label>',
          "</div>",
          '<div class="title-actions">',
          '<button class="secondary-button" type="button" data-action="duplicate-transition">Duplicate</button>',
          '<button class="secondary-button" type="button" data-action="delete-transition">Delete</button>',
          "</div>",
          "</section>",
        ].join("")
      : '<section class="dev-editor"><h3>No Transition Selected</h3><p>Add a new transition to begin editing.</p></section>';

    const spawnItems = visibleSpawns.length
      ? visibleSpawns.map(function (spawn) {
          const selected = spawn.id === selectedSpawnId ? " compact-list-selected" : "";
          const optionCount = ensureSpawnOptions(spawn, content).length;
          return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-spawn="' + spawn.id + '">' +
            "<strong>" + escapeHtml(spawn.id) + "</strong><span>" + Number(spawn.spawnChance ?? 100) + "% spawn · " + optionCount + " monster option" + (optionCount === 1 ? "" : "s") + " @ " + spawn.x + "," + spawn.y + "</span></button></li>";
        }).join("")
      : "<li>No spawn points defined yet.</li>";

    const spawnEditor = selectedSpawn
      ? [
          (function () {
            const optionRows = ensureSpawnOptions(selectedSpawn, content).map(function (option, index) {
              const optionSpecies = getSpecies(content, option.speciesId) || getSpecies(content, getSpawnDisplaySpeciesId(selectedSpawn, content)) || content.monsters.species[0];
              const rowSpeciesOptions = content.monsters.species.map(function (species) {
                const selected = option.speciesId === species.id ? " selected" : "";
                return '<option value="' + species.id + '"' + selected + ">" + escapeHtml(species.name) + "</option>";
              }).join("");
              const rowVariantOptions = ['<option value="">Default / First Variant</option>'].concat((optionSpecies?.variants || []).map(function (variant) {
                const selected = getSpawnOptionVariantId(optionSpecies, option) === variant.id ? " selected" : "";
                return '<option value="' + variant.id + '"' + selected + ">" + escapeHtml(variant.id) + "</option>";
              })).join("");

              return [
                '<div class="dev-subcard">',
                '<div class="section-heading"><h3>Monster Option ' + (index + 1) + '</h3><div class="topbar-stats"><button class="secondary-button" type="button" data-action="delete-spawn-option" data-option-index="' + index + '">Delete</button></div></div>',
                '<div class="form-grid">',
                '<label class="input-group"><span>Monster</span><select data-dev-spawn-option-field="speciesId" data-option-index="' + index + '">' + rowSpeciesOptions + '</select></label>',
                '<label class="input-group"><span>Variant</span><select data-dev-spawn-option-field="variantId" data-option-index="' + index + '">' + rowVariantOptions + '</select></label>',
                '<label class="input-group"><span>Weight</span><input type="number" step="1" min="0" data-dev-spawn-option-field="weight" data-option-index="' + index + '" value="' + Number(option.weight || 0) + '" /></label>',
                '</div>',
                '</div>',
              ].join("");
            }).join("");

            return [
              '<section class="panel-block">',
              '<div class="section-heading"><h3>Spawnable Monsters</h3><button class="secondary-button" type="button" data-action="add-spawn-option">Add Option</button></div>',
              '<p class="dev-helper-text">Spawn Chance decides whether anything appears at this location. If a monster does appear, the table below is used as a weighted roll.</p>',
              optionRows,
              '</section>',
            ].join("");
          })(),
          '<section class="dev-editor">',
          "<h3>Edit Wild Spawn</h3>",
          '<div class="form-grid">',
          '<label class="input-group"><span>ID</span><input data-dev-spawn-field="id" value="' + escapeHtml(selectedSpawn.id) + '" /></label>',
          '<label class="input-group"><span>Spawn Chance %</span><input type="number" step="1" min="0" max="100" data-dev-spawn-field="spawnChance" value="' + Number(selectedSpawn.spawnChance ?? 100) + '" /></label>',
          '<label class="input-group"><span>X</span><input type="number" step="1" data-dev-spawn-field="x" value="' + selectedSpawn.x + '" /></label>',
          '<label class="input-group"><span>Y</span><input type="number" step="1" data-dev-spawn-field="y" value="' + selectedSpawn.y + '" /></label>',
          '<label class="input-group"><span>Min Level</span><input type="number" step="1" data-dev-spawn-field="levelMin" value="' + (selectedSpawn.levelMin || 1) + '" /></label>',
          '<label class="input-group"><span>Max Level</span><input type="number" step="1" data-dev-spawn-field="levelMax" value="' + (selectedSpawn.levelMax || selectedSpawn.levelMin || 1) + '" /></label>',
          '<label class="input-group"><span>Respawn Seconds</span><input type="number" step="1" data-dev-spawn-field="respawnSeconds" value="' + (selectedSpawn.respawnSeconds || 120) + '" /></label>',
          "</div>",
          '<div class="title-actions">',
          '<button class="secondary-button" type="button" data-action="duplicate-spawn">Duplicate</button>',
          '<button class="secondary-button" type="button" data-action="delete-spawn">Delete</button>',
          "</div>",
          "</section>",
        ].join("")
      : '<section class="dev-editor"><h3>No Spawn Selected</h3><p>Add a new visible spawn to begin editing.</p></section>';

    const interactionTypeOptions = ["sign", "healing-center", "shop", "arena", "door"].map(function (type) {
      const selected = selectedInteraction?.type === type ? " selected" : "";
      return '<option value="' + type + '"' + selected + ">" + escapeHtml(type) + "</option>";
    }).join("");

    const interactionItems = interactions.length
      ? interactions.map(function (interaction) {
          const selected = interaction.id === selectedInteractionId ? " compact-list-selected" : "";
          return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-interaction="' + interaction.id + '">' +
            "<strong>" + escapeHtml(interaction.label || interaction.id) + "</strong><span>" + escapeHtml(interaction.type) + " @ " + interaction.x + "," + interaction.y + "</span></button></li>";
        }).join("")
      : "<li>No interactions defined yet.</li>";

    const interactionEditor = selectedInteraction
      ? [
          '<section class="dev-editor">',
          "<h3>Edit Interaction</h3>",
          '<div class="form-grid">',
          '<label class="input-group"><span>ID</span><input data-dev-interaction-field="id" value="' + escapeHtml(selectedInteraction.id) + '" /></label>',
          '<label class="input-group"><span>Type</span><select data-dev-interaction-field="type">' + interactionTypeOptions + "</select></label>",
          '<label class="input-group"><span>Label</span><input data-dev-interaction-field="label" value="' + escapeHtml(selectedInteraction.label || "") + '" /></label>',
          '<label class="input-group"><span>X</span><input type="number" step="1" data-dev-interaction-field="x" value="' + Number(selectedInteraction.x || 0) + '" /></label>',
          '<label class="input-group"><span>Y</span><input type="number" step="1" data-dev-interaction-field="y" value="' + Number(selectedInteraction.y || 0) + '" /></label>',
          '<label class="input-group"><span>Width</span><input type="number" step="1" data-dev-interaction-field="width" value="' + Number(selectedInteraction.width || 128) + '" /></label>',
          '<label class="input-group"><span>Height</span><input type="number" step="1" data-dev-interaction-field="height" value="' + Number(selectedInteraction.height || 128) + '" /></label>',
          '<label class="input-group dev-input-group-wide"><span>Text</span><textarea rows="4" data-dev-interaction-field="text">' + escapeHtml(selectedInteraction.text || "") + '</textarea></label>',
          '<label class="input-group"><span>Shop ID</span><input data-dev-interaction-field="data.shopId" value="' + escapeHtml(selectedInteraction.data?.shopId || "") + '" /></label>',
          '<label class="input-group"><span>Arena ID</span><input data-dev-interaction-field="data.arenaId" value="' + escapeHtml(selectedInteraction.data?.arenaId || "") + '" /></label>',
          '<label class="input-group"><span>Crest ID</span><input data-dev-interaction-field="data.crestId" value="' + escapeHtml(selectedInteraction.data?.crestId || "") + '" /></label>',
          "</div>",
          '<div class="title-actions">',
          '<button class="secondary-button" type="button" data-action="duplicate-interaction">Duplicate</button>',
          '<button class="secondary-button" type="button" data-action="delete-interaction">Delete</button>',
          "</div>",
          "</section>",
        ].join("")
      : '<section class="dev-editor"><h3>No Interaction Selected</h3><p>Add a new interaction to begin editing.</p></section>';

    const mapSettings = [
      '<section class="panel-block map-settings-panel">',
      '<div class="section-heading"><h3>Map Settings</h3></div>',
      '<p>Set the game-facing map name and classify the map as a town or a route. These values are saved in the map metadata export.</p>',
      '<div class="form-grid">',
      '<label class="input-group"><span>Map ID</span><input value="' + escapeHtml(mapId) + '" disabled /></label>',
      '<label class="input-group"><span>Display Name</span><input data-dev-map-field="displayName" value="' + escapeHtml(mapMeta?.displayName || mapId) + '" /></label>',
      '<label class="input-group"><span>Map Type</span><select data-dev-map-field="mapType"><option value="town"' + (mapType === "town" ? " selected" : "") + '>Town</option><option value="route"' + (mapType === "route" ? " selected" : "") + '>Route</option></select></label>',
      '<label class="input-group"><span>Safezone</span><select data-dev-map-field="safezone"><option value="true"' + (mapMeta?.safezone ? " selected" : "") + '>Yes</option><option value="false"' + (!mapMeta?.safezone ? " selected" : "") + '>No</option></select></label>',
      '</div>',
      '</section>',
    ].join("");

    return [
      "<p>Editing <strong>" + escapeHtml(mapMeta?.displayName || mapId) + "</strong>. Changes are in-memory until you export the metadata JSON. Click the map preview to place the selected item. For transitions, drag the right, bottom, or corner handles to resize. Target Spawn X/Y are where the player arrives on the target map.</p>",
      mapSettings,
      '<div class="editor-mode-toggle"><button class="' + (editorMode === "transitions" ? "primary-button" : "secondary-button") + '" type="button" data-action="mode-transitions">Transition Zones</button><button class="' + (editorMode === "spawns" ? "primary-button" : "secondary-button") + '" type="button" data-action="mode-spawns">Wild Spawns</button><button class="' + (editorMode === "interactions" ? "primary-button" : "secondary-button") + '" type="button" data-action="mode-interactions">Interactions</button></div>',
      '<div class="dev-tools-layout">',
      (
        editorMode === "transitions"
          ? '<section class="panel-block"><div class="section-heading"><h3>Transitions</h3><button class="secondary-button" type="button" data-action="add-transition">Add</button></div><ul class="compact-list dev-list">' + transitionItems + "</ul></section>" + transitionEditor
          : editorMode === "spawns"
            ? '<section class="panel-block"><div class="section-heading"><h3>Wild Spawns</h3><button class="secondary-button" type="button" data-action="add-spawn">Add</button></div><ul class="compact-list dev-list">' + spawnItems + "</ul></section>" + spawnEditor
            : '<section class="panel-block"><div class="section-heading"><h3>Interactions</h3><button class="secondary-button" type="button" data-action="add-interaction">Add</button></div><ul class="compact-list dev-list">' + interactionItems + "</ul></section>" + interactionEditor
      ),
      "</div>",
      '<div class="title-actions">',
      '<button class="secondary-button" type="button" data-action="export-map-metadata">Export Map Metadata JSON</button>',
      "</div>",
    ].join("");
  }

  function drawDevMap(canvas, content, devToolsState) {
    const mapId = devToolsState.selectedMapId;
    const map = content.maps[mapId];
    const ctx = canvas.getContext("2d");
    const image = getImage(map.image);
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const scale = Math.max(0.1, Number(devToolsState.previewZoom || 100) / 100);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#9fd6da";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;

    if (!image.complete || !image.naturalWidth) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading map preview...", 40, 60);
      return null;
    }

    const offsetX = Math.round((canvas.width - worldWidth * scale) / 2);
    const offsetY = Math.round((canvas.height - worldHeight * scale) / 2);
    const columns = Math.floor(image.naturalWidth / map.tileSize);

    (map.layers || []).forEach(function (layer) {
      (layer.positions || []).forEach(function (tile) {
        const sx = (tile.id % columns) * map.tileSize;
        const sy = Math.floor(tile.id / columns) * map.tileSize;
        const dx = offsetX + tile.x * map.tileSize * scale;
        const dy = offsetY + tile.y * map.tileSize * scale;
        const size = map.tileSize * scale;
        ctx.drawImage(image, sx, sy, map.tileSize, map.tileSize, dx, dy, size, size);
      });
    });

    const transitions = content.mapMetadata[mapId]?.transitions || [];
    const visibleSpawns = getEditableVisibleSpawns(content.mapMetadata[mapId]);
    transitions.forEach(function (transition) {
      const isSelected = transition.id === devToolsState.selectedTransitionId;
      const x = offsetX + transition.x * scale;
      const y = offsetY + transition.y * scale;
      const width = transition.width * scale;
      const height = transition.height * scale;

      ctx.save();
      ctx.fillStyle = isSelected ? "rgba(240, 139, 110, 0.30)" : "rgba(35, 110, 143, 0.22)";
      ctx.strokeStyle = isSelected ? "rgba(240, 139, 110, 0.95)" : "rgba(35, 110, 143, 0.95)";
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);

      if (isSelected && (devToolsState.editorMode || "transitions") === "transitions") {
        const handleSize = 12;
        const handles = [
          { x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 },
          { x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 },
          { x: x + width - handleSize / 2, y: y + height - handleSize / 2 },
        ];

        handles.forEach(function (handle) {
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "rgba(30,35,42,0.85)";
          ctx.lineWidth = 2;
          ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
          ctx.strokeRect(handle.x, handle.y, handleSize, handleSize);
        });
      }
      ctx.restore();
    });

    visibleSpawns.forEach(function (spawn) {
      const isSelected = spawn.id === devToolsState.selectedSpawnId;
      const x = offsetX + spawn.x * scale;
      const y = offsetY + spawn.y * scale;

      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = isSelected ? "rgba(96, 163, 111, 0.9)" : "rgba(39, 120, 73, 0.82)";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = isSelected ? 4 : 2;
      ctx.arc(x, y, isSelected ? 12 : 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(30, 35, 42, 0.9)";
      const label = spawn.id + " · " + spawn.speciesId;
      const metrics = ctx.measureText(label);
      ctx.fillRect(x + 12, y - 10, metrics.width + 14, 22);
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.fillText(label, x + 19, y + 5);
      ctx.restore();
    });

    getEditableInteractions(content.mapMetadata[mapId]).forEach(function (interaction) {
      const isSelected = interaction.id === devToolsState.selectedInteractionId;
      const x = offsetX + interaction.x * scale;
      const y = offsetY + interaction.y * scale;
      const width = interaction.width * scale;
      const height = interaction.height * scale;

      ctx.save();
      ctx.fillStyle = isSelected ? "rgba(255, 210, 92, 0.34)" : "rgba(255, 210, 92, 0.18)";
      ctx.strokeStyle = isSelected ? "rgba(185, 120, 0, 0.98)" : "rgba(185, 120, 0, 0.78)";
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "rgba(30, 35, 42, 0.9)";
      const label = (interaction.label || interaction.id) + " · " + interaction.type;
      const metrics = ctx.measureText(label);
      ctx.fillRect(x, Math.max(6, y - 28), metrics.width + 16, 22);
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.fillText(label, x + 8, Math.max(20, y - 12));
      ctx.restore();
    });

    return { scale, offsetX, offsetY, worldWidth, worldHeight };
  }

  function drawTargetSpawnPreview(canvas, content, devToolsState) {
    const sourceMapId = devToolsState.selectedMapId;
    const transition = (content.mapMetadata[sourceMapId]?.transitions || []).find(function (entry) {
      return entry.id === devToolsState.selectedTransitionId;
    }) || null;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#9fd6da";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;

    if (!transition) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("Select a transition to preview the target map.", 40, 60);
      return null;
    }

    const targetMapId = transition.targetMapId;
    const map = content.maps[targetMapId];
    const image = getImage(map.image);
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const scale = Math.max(0.1, Number(devToolsState.previewZoom || 100) / 100);

    if (!image.complete || !image.naturalWidth) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading target map preview...", 40, 60);
      return null;
    }

    const offsetX = Math.round((canvas.width - worldWidth * scale) / 2);
    const offsetY = Math.round((canvas.height - worldHeight * scale) / 2);
    const columns = Math.floor(image.naturalWidth / map.tileSize);

    (map.layers || []).forEach(function (layer) {
      (layer.positions || []).forEach(function (tile) {
        const sx = (tile.id % columns) * map.tileSize;
        const sy = Math.floor(tile.id / columns) * map.tileSize;
        const dx = offsetX + tile.x * map.tileSize * scale;
        const dy = offsetY + tile.y * map.tileSize * scale;
        const size = map.tileSize * scale;
        ctx.drawImage(image, sx, sy, map.tileSize, map.tileSize, dx, dy, size, size);
      });
    });

    const markerX = offsetX + transition.targetSpawn.x * scale;
    const markerY = offsetY + transition.targetSpawn.y * scale;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "rgba(240, 139, 110, 0.92)";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.arc(markerX, markerY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(30, 35, 42, 0.9)";
    const label = "Arrival " + Math.round(transition.targetSpawn.x) + ", " + Math.round(transition.targetSpawn.y);
    const metrics = ctx.measureText(label);
    ctx.fillRect(markerX + 12, markerY - 10, metrics.width + 14, 22);
    ctx.fillStyle = "#fff";
    ctx.font = "12px sans-serif";
    ctx.fillText(label, markerX + 19, markerY + 5);
    ctx.restore();

    return { scale, offsetX, offsetY, worldWidth, worldHeight, targetMapId };
  }

  function getDevCanvasMetrics(canvas, map, zoomPercent) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const scale = Math.max(0.1, Number(zoomPercent || 100) / 100);
    const offsetX = Math.round((canvas.width - worldWidth * scale) / 2);
    const offsetY = Math.round((canvas.height - worldHeight * scale) / 2);

    return { rect, scaleX, scaleY, scale, offsetX, offsetY, worldWidth, worldHeight };
  }

  function getCanvasPointFromEvent(event, canvas, map, zoomPercent) {
    const metrics = getDevCanvasMetrics(canvas, map, zoomPercent);
    const canvasX = (event.clientX - metrics.rect.left) * metrics.scaleX;
    const canvasY = (event.clientY - metrics.rect.top) * metrics.scaleY;
    const worldX = (canvasX - metrics.offsetX) / metrics.scale;
    const worldY = (canvasY - metrics.offsetY) / metrics.scale;

    return {
      canvasX,
      canvasY,
      worldX,
      worldY,
      ...metrics,
    };
  }

  function getTransitionHandleHit(transition, point, metrics) {
    const x = metrics.offsetX + transition.x * metrics.scale;
    const y = metrics.offsetY + transition.y * metrics.scale;
    const width = transition.width * metrics.scale;
    const height = transition.height * metrics.scale;
    const handleSize = 18;

    const handles = [
      { type: "right", x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2, width: handleSize, height: handleSize },
      { type: "bottom", x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2, width: handleSize, height: handleSize },
      { type: "corner", x: x + width - handleSize / 2, y: y + height - handleSize / 2, width: handleSize, height: handleSize },
    ];

    return handles.find(function (handle) {
      return point.canvasX >= handle.x && point.canvasX <= handle.x + handle.width &&
        point.canvasY >= handle.y && point.canvasY <= handle.y + handle.height;
    }) || null;
  }

  function captureFocusableState(root) {
    const active = document.activeElement;
    if (!active || !root.contains(active)) {
      return null;
    }

    const selectorParts = [];
    const pushSelector = function (attributeName) {
      if (!active.hasAttribute(attributeName)) {
        return;
      }

      let selector = "[" + attributeName + '="' + active.getAttribute(attributeName) + '"]';
      if (active.hasAttribute("data-variant-index")) {
        selector += '[data-variant-index="' + active.getAttribute("data-variant-index") + '"]';
      }
      if (active.hasAttribute("data-option-index")) {
        selector += '[data-option-index="' + active.getAttribute("data-option-index") + '"]';
      }
      selectorParts.push(selector);
    };

    pushSelector("data-field");
    pushSelector("data-dev-field");
    pushSelector("data-dev-spawn-field");
    pushSelector("data-dev-map-field");
    pushSelector("data-dev-species-field");
    pushSelector("data-dev-skill-field");
    pushSelector("data-dev-variant-field");
    pushSelector("data-dev-town-field");
    pushSelector("data-dev-spawn-option-field");
    pushSelector("data-dev-interaction-field");

    if (!selectorParts.length) {
      return null;
    }

    return {
      selector: selectorParts[0],
      selectionStart: typeof active.selectionStart === "number" ? active.selectionStart : null,
      selectionEnd: typeof active.selectionEnd === "number" ? active.selectionEnd : null,
    };
  }

  function restoreFocusableState(root, focusState) {
    if (!focusState?.selector) {
      return;
    }

    const next = root.querySelector(focusState.selector);
    if (!next) {
      return;
    }

    next.focus();
    if (typeof focusState.selectionStart === "number" && typeof next.setSelectionRange === "function") {
      next.setSelectionRange(focusState.selectionStart, focusState.selectionEnd ?? focusState.selectionStart);
    }
  }

  function isEditableTarget(target) {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    const tagName = target.tagName;
    return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || target.isContentEditable;
  }

  function isDeferredDevTextField(field) {
    if (!(field instanceof HTMLElement)) {
      return false;
    }

    if (field.tagName === "TEXTAREA") {
      return true;
    }

    if (field.tagName !== "INPUT") {
      return false;
    }

    const type = (field.getAttribute("type") || "text").toLowerCase();
    return type !== "number" && type !== "range" && type !== "checkbox" && type !== "radio";
  }

  function buildNewGamePreviewText(content, setup) {
    const starterTowns = getStarterTownOptions(content);
    const townName = starterTowns.find(function (town) {
      return town.id === setup.townId;
    })?.name || starterTowns[0].name;
    const starterName = getSpecies(content, setup.starterSpeciesId)?.name || content.monsters.species[0].name;
    const playerName = setup.playerName || "Player";

    return playerName + " starts in " + townName + " with " + starterName + ".";
  }

  function getStarterTownOptions(content) {
    const enabledTowns = content.towns.towns.filter(function (town) {
      return town.includeInStarterSelection !== false;
    });

    return enabledTowns.length ? enabledTowns : content.towns.towns;
  }

  function getTownEntryForMap(content, mapId) {
    return content.towns.towns.find(function (town) {
      return town.mapId === mapId;
    }) || null;
  }

  function ensureTownEntryForMap(content, mapId) {
    let town = getTownEntryForMap(content, mapId);
    if (town) {
      return town;
    }

    town = {
      id: slugify(content.mapMetadata[mapId]?.displayName || mapId),
      name: content.mapMetadata[mapId]?.displayName || mapId,
      mapId,
      spawn: { x: 128, y: 128 },
      includeInStarterSelection: true,
    };
    content.towns.towns.push(town);
    return town;
  }

  function createEmptySkill(index) {
    return {
      id: "skill-" + index,
      name: "New Skill",
      kind: "attack",
      power: 0,
      description: "",
    };
  }

  function createEmptySpecies(content, index) {
    const starterSkill = ensureSkillCatalog(content)[0]?.id || "basic-attack";
    return {
      id: "monster-" + index,
      name: "New Monster",
      baseStats: {
        hp: 10,
        attack: 5,
        defense: 5,
        speed: 5,
      },
      growth: "medium",
      skills: starterSkill ? [starterSkill] : [],
      variants: [
        {
          id: "default",
          sprite: "assets/monsters/new-monster.png",
        },
      ],
    };
  }

  function ensureMonsterEditorContent(content) {
    if (!content.monsters || !Array.isArray(content.monsters.species)) {
      content.monsters = { species: [] };
    }

    ensureSkillCatalog(content);
  }

  function syncMonsterDevSelection(content, devToolsState) {
    ensureMonsterEditorContent(content);

    const species = content.monsters.species;
    const skills = ensureSkillCatalog(content);

    if (!species.find(function (entry) { return entry.id === devToolsState.selectedSpeciesId; })) {
      devToolsState.selectedSpeciesId = species[0]?.id || "";
    }

    if (!skills.find(function (entry) { return entry.id === devToolsState.selectedSkillId; })) {
      devToolsState.selectedSkillId = skills[0]?.id || "";
    }

    const selectedSpecies = species.find(function (entry) {
      return entry.id === devToolsState.selectedSpeciesId;
    }) || species[0] || null;
    const selectedVariant = getSpeciesVariant(selectedSpecies, devToolsState.selectedPreviewVariantId);
    devToolsState.selectedPreviewVariantId = selectedVariant?.id || "";
  }

  function validateMonsterEditorContent(content) {
    ensureMonsterEditorContent(content);

    const species = content.monsters.species;
    const skills = ensureSkillCatalog(content);
    const skillIds = new Set(skills.map(function (entry) { return entry.id; }).filter(Boolean));
    const validation = {
      messages: [],
      speciesErrors: {},
      skillErrors: {},
    };

    const pushSpeciesError = function (speciesId, message) {
      if (!validation.speciesErrors[speciesId]) {
        validation.speciesErrors[speciesId] = [];
      }
      validation.speciesErrors[speciesId].push(message);
      validation.messages.push(message);
    };

    const pushSkillError = function (skillId, message) {
      if (!validation.skillErrors[skillId]) {
        validation.skillErrors[skillId] = [];
      }
      validation.skillErrors[skillId].push(message);
      validation.messages.push(message);
    };

    const speciesIdCounts = {};
    species.forEach(function (entry) {
      speciesIdCounts[entry.id] = (speciesIdCounts[entry.id] || 0) + 1;
    });

    const skillIdCounts = {};
    skills.forEach(function (entry) {
      skillIdCounts[entry.id] = (skillIdCounts[entry.id] || 0) + 1;
    });

    skills.forEach(function (skill, index) {
      const skillKey = skill.id || ("skill-index-" + index);
      if (!skill.id?.trim()) {
        pushSkillError(skillKey, "Each skill needs an id.");
      }
      if ((skillIdCounts[skill.id] || 0) > 1) {
        pushSkillError(skillKey, "Skill ids must be unique. Duplicate: " + skill.id);
      }
      if (!skill.name?.trim()) {
        pushSkillError(skillKey, "Skill '" + (skill.id || ("#" + (index + 1))) + "' needs a name.");
      }
      if (!Number.isFinite(Number(skill.power)) || Number(skill.power) < 0) {
        pushSkillError(skillKey, "Skill '" + (skill.id || ("#" + (index + 1))) + "' needs a non-negative power value.");
      }
    });

    species.forEach(function (entry, index) {
      const speciesKey = entry.id || ("species-index-" + index);
      if (!entry.id?.trim()) {
        pushSpeciesError(speciesKey, "Each monster species needs an id.");
      }
      if ((speciesIdCounts[entry.id] || 0) > 1) {
        pushSpeciesError(speciesKey, "Species ids must be unique. Duplicate: " + entry.id);
      }
      if (!entry.name?.trim()) {
        pushSpeciesError(speciesKey, "Species '" + (entry.id || ("#" + (index + 1))) + "' needs a name.");
      }

      ["hp", "attack", "defense", "speed"].forEach(function (statKey) {
        const value = Number(entry.baseStats?.[statKey]);
        if (!Number.isFinite(value) || value < 0) {
          pushSpeciesError(speciesKey, "Species '" + (entry.id || ("#" + (index + 1))) + "' needs a valid non-negative " + statKey + " stat.");
        }
      });

      if (!Array.isArray(entry.variants) || !entry.variants.length) {
        pushSpeciesError(speciesKey, "Species '" + (entry.id || ("#" + (index + 1))) + "' needs at least one variant.");
      } else {
        entry.variants.forEach(function (variant, variantIndex) {
          if (!variant.id?.trim()) {
            pushSpeciesError(speciesKey, "Species '" + (entry.id || ("#" + (index + 1))) + "' variant #" + (variantIndex + 1) + " needs an id.");
          }
          if (!variant.sprite?.trim()) {
            pushSpeciesError(speciesKey, "Species '" + (entry.id || ("#" + (index + 1))) + "' variant '" + (variant.id || ("#" + (variantIndex + 1))) + "' needs a sprite path.");
          }
        });
      }

      (entry.skills || []).forEach(function (skillId) {
        if (!skillIds.has(skillId)) {
          pushSpeciesError(speciesKey, "Species '" + (entry.id || ("#" + (index + 1))) + "' references missing skill '" + skillId + "'.");
        }
      });
    });

    validation.messages = Array.from(new Set(validation.messages));
    return validation;
  }

  function getDevPreviewCanvasSize(map, zoomPercent) {
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const scale = Math.max(0.1, Number(zoomPercent || 100) / 100);

    return {
      width: Math.max(1, Math.round(worldWidth * scale)),
      height: Math.max(1, Math.round(worldHeight * scale)),
    };
  }

  function renderMapDevToolsScreen(root, content, devToolsState) {
    const mapIds = Object.keys(content.maps);
    const selectedMapId = devToolsState.selectedMapId || mapIds[0];
    const mapMeta = content.mapMetadata[selectedMapId];
    const selectedMap = content.maps[selectedMapId];
    const previewZoom = devToolsState.previewZoom || 100;
    const sourcePreviewSize = getDevPreviewCanvasSize(selectedMap, previewZoom);
    const selectedTransition = (content.mapMetadata[selectedMapId]?.transitions || []).find(function (entry) {
      return entry.id === devToolsState.selectedTransitionId;
    }) || null;
    const targetMapName = selectedTransition ? (content.mapMetadata[selectedTransition.targetMapId]?.displayName || selectedTransition.targetMapId) : "";
    const targetMap = selectedTransition ? content.maps[selectedTransition.targetMapId] : null;
    const targetPreviewSize = targetMap ? getDevPreviewCanvasSize(targetMap, previewZoom) : null;
    const mapList = mapIds.map(function (mapId) {
      const selected = mapId === selectedMapId ? " dev-map-item-selected" : "";
      return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-map="' + mapId + '">' +
        "<strong>" + escapeHtml(mapMeta && mapId === selectedMapId ? mapMeta.displayName : (content.mapMetadata[mapId]?.displayName || mapId)) + "</strong>" +
        "<span>" + escapeHtml(content.mapMetadata[mapId]?.isTown ? "Town" : "Route") + " · " + escapeHtml(mapId) + "</span></button></li>";
    }).join("");

    root.innerHTML = [
      '<main class="dev-screen">',
      '<header class="game-topbar">',
      '<div><span class="eyebrow">Dev Tools</span><strong>Map Editor</strong></div>',
      '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
      "</header>",
      '<section class="dev-screen-layout">',
      '<aside class="dev-sidebar panel-block"><div class="section-heading"><h2>Maps</h2></div><ul class="compact-list dev-map-list">' + mapList + "</ul></aside>",
      '<section class="dev-main">',
      '<section class="panel-block dev-preview-controls"><div class="section-heading"><h2>Preview Zoom</h2><span>' + previewZoom + '%</span></div><div class="title-actions"><button class="' + (previewZoom === 100 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="100">100%</button><button class="' + (previewZoom === 80 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="80">80%</button><button class="' + (previewZoom === 60 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="60">60%</button><button class="' + (previewZoom === 30 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="30">30%</button><button class="' + (previewZoom === 10 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="10">10%</button></div></section>',
      '<section class="dev-preview-grid">',
      '<section class="map-panel dev-map-panel"><div class="dev-canvas-scroll" data-preview-role="source"><canvas class="dev-map-canvas" width="' + sourcePreviewSize.width + '" height="' + sourcePreviewSize.height + '"></canvas></div><div class="map-caption">Source map preview. Click to place the selected ' + (devToolsState.editorMode === "spawns" ? "wild spawn point." : devToolsState.editorMode === "interactions" ? "interaction zone." : "transition rectangle.") + "</div></section>",
      (
        devToolsState.editorMode === "transitions"
          ? '<section class="map-panel dev-map-panel"><div class="section-heading"><h2>Target Map</h2><span>' + escapeHtml(targetMapName) + '</span></div><div class="dev-canvas-scroll" data-preview-role="target"><canvas class="dev-target-canvas" width="' + (targetPreviewSize?.width || 960) + '" height="' + (targetPreviewSize?.height || 640) + '"></canvas></div><div class="map-caption">Click to place the player arrival point on the target map.</div></section>'
          : ""
      ),
      '</section>',
      '<section class="panel-block dev-editor-panel"><div class="section-heading"><h2>' + escapeHtml(content.mapMetadata[selectedMapId]?.displayName || selectedMapId) + '</h2></div>' + renderDevToolsEditor(content, selectedMapId, devToolsState) + "</section>",
      "</section>",
      "</section>",
      "</main>",
    ].join("");

    const preview = drawDevMap(root.querySelector(".dev-map-canvas"), content, devToolsState);
    const targetPreviewCanvas = root.querySelector(".dev-target-canvas");
    const targetPreview = targetPreviewCanvas ? drawTargetSpawnPreview(targetPreviewCanvas, content, devToolsState) : null;
    return { preview, targetPreview };
  }

  function renderMonsterDevToolsEditor(content, devToolsState) {
    ensureMonsterEditorContent(content);
    syncMonsterDevSelection(content, devToolsState);

    const species = content.monsters.species;
    const skills = ensureSkillCatalog(content);
    const validation = validateMonsterEditorContent(content);
    const selectedSpecies = species.find(function (entry) {
      return entry.id === devToolsState.selectedSpeciesId;
    }) || null;
    const selectedSkill = skills.find(function (entry) {
      return entry.id === devToolsState.selectedSkillId;
    }) || null;
    const selectedSpeciesKey = selectedSpecies ? (selectedSpecies.id || ("species-index-" + species.indexOf(selectedSpecies))) : "";
    const selectedSkillKey = selectedSkill ? (selectedSkill.id || ("skill-index-" + skills.indexOf(selectedSkill))) : "";
    const selectedSpeciesErrors = selectedSpecies ? (validation.speciesErrors[selectedSpeciesKey] || []) : [];
    const selectedSkillErrors = selectedSkill ? (validation.skillErrors[selectedSkillKey] || []) : [];

    const renderValidationBanner = function () {
      if (!validation.messages.length) {
        return '<div class="dev-status-banner dev-status-banner-ok"><strong>Ready to export.</strong><span>No validation issues found.</span></div>';
      }

      return '<div class="dev-status-banner dev-status-banner-error"><strong>Fix these before export.</strong><ul class="compact-list">' +
        validation.messages.map(function (message) {
          return "<li><span>" + escapeHtml(message) + "</span></li>";
        }).join("") +
        "</ul></div>";
    };

    const renderSpeciesEditor = function () {
      if (!selectedSpecies) {
        return '<section class="dev-editor"><h3>No Monster Selected</h3><p>Add a species to begin editing.</p></section>';
      }

      const variantRows = (selectedSpecies.variants || []).map(function (variant, index) {
        return [
          '<div class="dev-subcard">',
          '<div class="section-heading"><h3>Variant ' + (index + 1) + '</h3><div class="topbar-stats"><button class="secondary-button" type="button" data-action="duplicate-variant" data-variant-index="' + index + '">Duplicate</button><button class="secondary-button" type="button" data-action="delete-variant" data-variant-index="' + index + '">Delete</button></div></div>',
          '<div class="form-grid">',
          '<label class="input-group"><span>Variant ID</span><input data-dev-variant-field="id" data-variant-index="' + index + '" value="' + escapeHtml(variant.id || "") + '" /></label>',
          '<label class="input-group"><span>Sprite Path</span><input data-dev-variant-field="sprite" data-variant-index="' + index + '" value="' + escapeHtml(variant.sprite || "") + '" /></label>',
          '</div>',
          '</div>',
        ].join("");
      }).join("");

      const skillAssignment = skills.length
        ? skills.map(function (skill) {
            const checked = (selectedSpecies.skills || []).includes(skill.id) ? " checked" : "";
            return '<label class="dev-check-row"><input type="checkbox" data-action="toggle-species-skill" data-skill-id="' + escapeHtml(skill.id) + '"' + checked + ' />' +
              '<span><strong>' + escapeHtml(skill.name) + '</strong><em>' + escapeHtml(skill.id) + ' · ' + escapeHtml(skill.kind) + ' · Power ' + Number(skill.power || 0) + "</em></span></label>";
          }).join("")
        : "<p>No skills available yet. Add skills in the Skills tab.</p>";

      const previewVariant = getSpeciesVariant(selectedSpecies, devToolsState.selectedPreviewVariantId);
      const previewVariantOptions = (selectedSpecies.variants || []).map(function (variant) {
        const selected = previewVariant?.id === variant.id ? " selected" : "";
        return '<option value="' + escapeHtml(variant.id) + '"' + selected + ">" + escapeHtml(variant.id) + "</option>";
      }).join("");
      const previewImage = previewVariant?.sprite
        ? '<img class="monster-preview-image" src="' + escapeHtml(previewVariant.sprite) + '" alt="' + escapeHtml(selectedSpecies.name) + ' preview" />'
        : '<div class="monster-preview-image monster-preview-fallback">No preview path</div>';

      return [
        '<section class="dev-editor">',
        '<div class="section-heading"><h3>Edit Monster Species</h3><div class="topbar-stats"><button class="secondary-button" type="button" data-action="duplicate-species">Duplicate</button><button class="secondary-button" type="button" data-action="delete-species">Delete</button></div></div>',
        (selectedSpeciesErrors.length ? '<div class="dev-inline-errors">' + selectedSpeciesErrors.map(function (message) { return "<p>" + escapeHtml(message) + "</p>"; }).join("") + "</div>" : ""),
        '<div class="form-grid">',
        '<label class="input-group"><span>ID</span><input data-dev-species-field="id" value="' + escapeHtml(selectedSpecies.id || "") + '" /></label>',
        '<label class="input-group"><span>Name</span><input data-dev-species-field="name" value="' + escapeHtml(selectedSpecies.name || "") + '" /></label>',
        '<label class="input-group"><span>Growth</span><input data-dev-species-field="growth" value="' + escapeHtml(selectedSpecies.growth || "") + '" /></label>',
        '<label class="input-group"><span>HP</span><input type="number" step="1" data-dev-species-field="baseStats.hp" value="' + Number(selectedSpecies.baseStats?.hp || 0) + '" /></label>',
        '<label class="input-group"><span>Attack</span><input type="number" step="1" data-dev-species-field="baseStats.attack" value="' + Number(selectedSpecies.baseStats?.attack || 0) + '" /></label>',
        '<label class="input-group"><span>Defense</span><input type="number" step="1" data-dev-species-field="baseStats.defense" value="' + Number(selectedSpecies.baseStats?.defense || 0) + '" /></label>',
        '<label class="input-group"><span>Speed</span><input type="number" step="1" data-dev-species-field="baseStats.speed" value="' + Number(selectedSpecies.baseStats?.speed || 0) + '" /></label>',
        '</div>',
        '</section>',
        '<section class="dev-tools-layout">',
        '<section class="panel-block"><div class="section-heading"><h3>Assigned Skills</h3></div><div class="dev-checklist">' + skillAssignment + '</div></section>',
        '<section class="panel-block"><div class="section-heading"><h3>Species Preview</h3></div><div class="monster-preview-card">' + previewImage + '<div><p><strong>' + escapeHtml(selectedSpecies.name) + '</strong></p><p>ID: ' + escapeHtml(selectedSpecies.id) + '</p><p>Growth: ' + escapeHtml(selectedSpecies.growth || "medium") + '</p><label class="input-group"><span>Preview Variant</span><select data-action="select-preview-variant">' + previewVariantOptions + '</select></label><p>Sprite: ' + escapeHtml(previewVariant?.sprite || "None") + '</p></div></div></section>',
        '</section>',
        '<section class="panel-block"><div class="section-heading"><h3>Variants</h3><button class="secondary-button" type="button" data-action="add-variant">Add Variant</button></div>' + variantRows + '</section>',
      ].join("");
    };

    const renderSkillsEditor = function () {
      if (!selectedSkill) {
        return '<section class="dev-editor"><h3>No Skill Selected</h3><p>Add a skill to begin editing.</p></section>';
      }

      return [
        '<section class="dev-editor">',
        '<div class="section-heading"><h3>Edit Skill</h3><div class="topbar-stats"><button class="secondary-button" type="button" data-action="duplicate-skill">Duplicate</button><button class="secondary-button" type="button" data-action="delete-skill">Delete</button></div></div>',
        (selectedSkillErrors.length ? '<div class="dev-inline-errors">' + selectedSkillErrors.map(function (message) { return "<p>" + escapeHtml(message) + "</p>"; }).join("") + "</div>" : ""),
        '<div class="form-grid">',
        '<label class="input-group"><span>ID</span><input data-dev-skill-field="id" value="' + escapeHtml(selectedSkill.id || "") + '" /></label>',
        '<label class="input-group"><span>Name</span><input data-dev-skill-field="name" value="' + escapeHtml(selectedSkill.name || "") + '" /></label>',
        '<label class="input-group"><span>Kind</span><input data-dev-skill-field="kind" value="' + escapeHtml(selectedSkill.kind || "") + '" /></label>',
        '<label class="input-group"><span>Power</span><input type="number" step="1" data-dev-skill-field="power" value="' + Number(selectedSkill.power || 0) + '" /></label>',
        '<label class="input-group dev-input-group-wide"><span>Description</span><textarea rows="5" data-dev-skill-field="description">' + escapeHtml(selectedSkill.description || "") + '</textarea></label>',
        '</div>',
        '</section>',
      ].join("");
    };

    const monsterSubMode = devToolsState.monsterSubMode || "species";
    const sidebarItems = monsterSubMode === "species"
      ? species.map(function (entry) {
          const selected = entry.id === devToolsState.selectedSpeciesId ? " compact-list-selected" : "";
          return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-species="' + entry.id + '"><strong>' + escapeHtml(entry.name || entry.id) + '</strong><span>' + escapeHtml(entry.id) + ' · HP ' + Number(entry.baseStats?.hp || 0) + ' · ATK ' + Number(entry.baseStats?.attack || 0) + ' · DEF ' + Number(entry.baseStats?.defense || 0) + ' · SPD ' + Number(entry.baseStats?.speed || 0) + "</span></button></li>";
        }).join("")
      : skills.map(function (entry) {
          const selected = entry.id === devToolsState.selectedSkillId ? " compact-list-selected" : "";
          return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-skill="' + entry.id + '"><strong>' + escapeHtml(entry.name || entry.id) + '</strong><span>' + escapeHtml(entry.id) + ' · ' + escapeHtml(entry.kind || "attack") + ' · Power ' + Number(entry.power || 0) + "</span></button></li>";
        }).join("");

    const addAction = monsterSubMode === "species" ? "add-species" : "add-skill";
    const addLabel = monsterSubMode === "species" ? "Add Species" : "Add Skill";

    return {
      validation,
      html: [
        '<main class="dev-screen">',
        '<header class="game-topbar">',
        '<div><span class="eyebrow">Dev Tools</span><strong>Monster Editor</strong></div>',
        '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "secondary-button" : "primary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
        '</header>',
        '<section class="dev-screen-layout">',
        '<aside class="dev-sidebar panel-block"><div class="section-heading"><h2>' + (monsterSubMode === "species" ? "Monster Species" : "Skills") + '</h2><button class="secondary-button" type="button" data-action="' + addAction + '">' + addLabel + '</button></div><ul class="compact-list dev-map-list">' + (sidebarItems || "<li>No entries yet.</li>") + '</ul></aside>',
        '<section class="dev-main">',
        '<section class="panel-block dev-preview-controls"><div class="section-heading"><h2>Monster Tools</h2></div><p>Edit monsters and skills in-memory, then export JSON into <code>data/</code> and rebuild local content before reloading the game.</p><div class="editor-mode-toggle"><button class="' + (monsterSubMode === "species" ? "primary-button" : "secondary-button") + '" type="button" data-action="monster-mode-species">Species</button><button class="' + (monsterSubMode === "skills" ? "primary-button" : "secondary-button") + '" type="button" data-action="monster-mode-skills">Skills</button></div>' + renderValidationBanner() + '<div class="title-actions"><button class="secondary-button" type="button" data-action="export-monsters-json">Export monsters.json</button><button class="secondary-button" type="button" data-action="export-skills-json">Export skills.json</button></div></section>',
        '<section class="panel-block dev-editor-panel">' + (monsterSubMode === "species" ? renderSpeciesEditor() : renderSkillsEditor()) + '</section>',
        '</section>',
        '</section>',
        '</main>',
      ].join(""),
    };
  }

  function renderMonsterDevToolsScreen(root, content, devToolsState) {
    const rendered = renderMonsterDevToolsEditor(content, devToolsState);
    root.innerHTML = rendered.html;
    return rendered.validation;
  }

  function drawTownDevPreview(canvas, content, devToolsState) {
    const mapId = devToolsState.selectedTownMapId;
    const map = content.maps[mapId];
    if (!map) {
      return null;
    }

    const ctx = canvas.getContext("2d");
    const image = getImage(map.image);
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const scale = Math.max(0.1, Number(devToolsState.previewZoom || 100) / 100);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#9fd6da";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;

    if (!image.complete || !image.naturalWidth) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading town preview...", 40, 60);
      return null;
    }

    const offsetX = Math.round((canvas.width - worldWidth * scale) / 2);
    const offsetY = Math.round((canvas.height - worldHeight * scale) / 2);
    const columns = Math.floor(image.naturalWidth / map.tileSize);

    (map.layers || []).forEach(function (layer) {
      (layer.positions || []).forEach(function (tile) {
        const sx = (tile.id % columns) * map.tileSize;
        const sy = Math.floor(tile.id / columns) * map.tileSize;
        const dx = offsetX + tile.x * map.tileSize * scale;
        const dy = offsetY + tile.y * map.tileSize * scale;
        const size = map.tileSize * scale;
        ctx.drawImage(image, sx, sy, map.tileSize, map.tileSize, dx, dy, size, size);
      });
    });

    const town = ensureTownEntryForMap(content, mapId);
    const markerX = offsetX + town.spawn.x * scale;
    const markerY = offsetY + town.spawn.y * scale;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "rgba(240, 139, 110, 0.92)";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.arc(markerX, markerY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(30, 35, 42, 0.9)";
    const label = "Town Spawn " + Math.round(town.spawn.x) + ", " + Math.round(town.spawn.y);
    const metrics = ctx.measureText(label);
    ctx.fillRect(markerX + 12, markerY - 10, metrics.width + 14, 22);
    ctx.fillStyle = "#fff";
    ctx.font = "12px sans-serif";
    ctx.fillText(label, markerX + 19, markerY + 5);
    ctx.restore();

    return { scale, offsetX, offsetY, worldWidth, worldHeight };
  }

  function renderTownDevToolsScreen(root, content, devToolsState) {
    const townMapIds = Object.keys(content.maps).filter(function (mapId) {
      return content.mapMetadata[mapId]?.isTown;
    });
    const selectedTownMapId = devToolsState.selectedTownMapId || townMapIds[0] || "";
    const mapMeta = content.mapMetadata[selectedTownMapId];
    const map = content.maps[selectedTownMapId];
    const previewZoom = devToolsState.previewZoom || 100;
    const previewSize = map ? getDevPreviewCanvasSize(map, previewZoom) : { width: 960, height: 640 };
    const town = selectedTownMapId ? ensureTownEntryForMap(content, selectedTownMapId) : null;

    const townList = townMapIds.map(function (mapId) {
      const selected = mapId === selectedTownMapId ? " dev-map-item-selected" : "";
      const entry = getTownEntryForMap(content, mapId);
      return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-town-map="' + mapId + '">' +
        "<strong>" + escapeHtml(content.mapMetadata[mapId]?.displayName || mapId) + "</strong>" +
        "<span>" + escapeHtml(entry?.id || slugify(content.mapMetadata[mapId]?.displayName || mapId)) + " · Spawn " + Number(entry?.spawn?.x || 128) + "," + Number(entry?.spawn?.y || 128) + " · " + ((entry?.includeInStarterSelection ?? true) ? "Starter Enabled" : "Starter Hidden") + "</span></button></li>";
    }).join("");

    root.innerHTML = [
      '<main class="dev-screen">',
      '<header class="game-topbar">',
      '<div><span class="eyebrow">Dev Tools</span><strong>Town Editor</strong></div>',
      '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "secondary-button" : "primary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
      "</header>",
      '<section class="dev-screen-layout">',
      '<aside class="dev-sidebar panel-block"><div class="section-heading"><h2>Towns</h2></div><ul class="compact-list dev-map-list">' + (townList || "<li>No town maps available.</li>") + "</ul></aside>",
      '<section class="dev-main">',
      '<section class="panel-block dev-preview-controls"><div class="section-heading"><h2>Preview Zoom</h2><span>' + previewZoom + '%</span></div><p>Click the town map preview to place the starting spawn icon for this town.</p><div class="title-actions"><button class="' + (previewZoom === 100 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="100">100%</button><button class="' + (previewZoom === 80 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="80">80%</button><button class="' + (previewZoom === 60 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="60">60%</button><button class="' + (previewZoom === 30 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="30">30%</button><button class="' + (previewZoom === 10 ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-zoom" data-zoom="10">10%</button></div></section>',
      '<section class="map-panel dev-map-panel"><div class="section-heading"><h2>' + escapeHtml(mapMeta?.displayName || selectedTownMapId || "Town Preview") + '</h2><span>' + escapeHtml(town?.id || "") + '</span></div><div class="dev-canvas-scroll" data-preview-role="source"><canvas class="dev-town-canvas" width="' + previewSize.width + '" height="' + previewSize.height + '"></canvas></div><div class="map-caption">Visible marker shows the New Game / town arrival spawn.</div></section>',
      '<section class="panel-block dev-editor-panel"><div class="section-heading"><h2>Town Settings</h2></div><div class="form-grid">' +
        '<label class="input-group"><span>Town ID</span><input data-dev-town-field="id" value="' + escapeHtml(town?.id || slugify(mapMeta?.displayName || selectedTownMapId)) + '" /></label>' +
        '<label class="input-group"><span>Town Name</span><input data-dev-town-field="name" value="' + escapeHtml(town?.name || mapMeta?.displayName || selectedTownMapId) + '" /></label>' +
        '<label class="input-group"><span>Map ID</span><input value="' + escapeHtml(selectedTownMapId) + '" disabled /></label>' +
        '<label class="input-group"><span>Include In Starter Options</span><select data-dev-town-field="includeInStarterSelection"><option value="true"' + ((town?.includeInStarterSelection ?? true) ? " selected" : "") + '>Yes</option><option value="false"' + ((town?.includeInStarterSelection ?? true) ? "" : " selected") + '>No</option></select></label>' +
        '<label class="input-group"><span>Spawn X</span><input type="number" step="1" data-dev-town-field="spawn.x" value="' + Number(town?.spawn?.x || 128) + '" /></label>' +
        '<label class="input-group"><span>Spawn Y</span><input type="number" step="1" data-dev-town-field="spawn.y" value="' + Number(town?.spawn?.y || 128) + '" /></label>' +
      '</div><p class="dev-helper-text">Set whether this town appears in New Game starter zone choices. If every town is disabled, the game falls back to showing all towns so setup never breaks.</p><div class="title-actions"><button class="secondary-button" type="button" data-action="export-towns-json">Export towns.json</button></div></section>',
      '</section>',
      '</section>',
      '</main>',
    ].join("");

    drawTownDevPreview(root.querySelector(".dev-town-canvas"), content, devToolsState);
    return null;
  }

  function renderDevToolsScreen(root, content, devToolsState) {
    if (devToolsState.section === "towns") {
      return renderTownDevToolsScreen(root, content, devToolsState);
    }

    if (devToolsState.section === "monsters") {
      return renderMonsterDevToolsScreen(root, content, devToolsState);
    }

    return renderMapDevToolsScreen(root, content, devToolsState);
  }

  function renderWorld(root, state, content, saveManager, devToolsState) {
    ensureWorldUiState(state);
    const mapName = content.mapMetadata[state.world.currentMapId].displayName;
    const saveSlots = saveManager.listSaves();
    const activeMonster = state.party[0];
    const activeSpecies = getSpecies(content, activeMonster.speciesId);
    const activeInteraction = getActiveInteraction(state, content);

    root.innerHTML = [
      '<main class="game-shell">',
      '<header class="game-topbar">',
      '<div><span class="eyebrow">Location</span><strong>' + mapName + "</strong></div>",
      '<div class="topbar-stats"><span>' + new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date()) + "</span><span>$" + state.player.money + '</span><button class="secondary-button" type="button" data-action="open-settings">Settings</button><button class="secondary-button" type="button" data-action="save">Save</button><button class="secondary-button" type="button" data-action="title">Title</button></div>',
      "</header>",
      '<section class="play-area">',
      '<div class="map-panel"><canvas class="world-canvas" width="' + VIEWPORT.width + '" height="' + VIEWPORT.height + '"></canvas><div class="map-caption">Move with arrow keys or WASD. Touch a pink marker to battle.' + (activeInteraction ? " " + escapeHtml(buildInteractionPrompt(activeInteraction)) + "." : "") + '</div></div>',
      '<aside class="status-panel">',
      '<section class="panel-block"><h2>Now Playing</h2><p>' + state.message + "</p></section>",
      '<section class="panel-block"><h2>Party Lead</h2><p>' + activeSpecies.name + " Lv " + activeMonster.level + "</p><p>HP " + activeMonster.currentHp + "/" + activeMonster.stats.hp + "</p></section>",
      '<section class="panel-block"><h2>Wild Monsters</h2><ul class="compact-list">' + state.world.wildMonsters.map(function (monster) {
        return "<li><span>" + monster.label + "</span><strong>" + (monster.active ? "Nearby" : "Respawn " + formatTimeUntil(monster.respawnsAt)) + "</strong></li>";
      }).join("") + "</ul></section>",
      '<section class="panel-block"><h2>Inventory</h2><ul class="compact-list">' + state.inventory.map(function (item) {
        return "<li><span>" + item.itemId + "</span><strong>x" + item.quantity + "</strong></li>";
      }).join("") + "</ul></section>",
      '<section class="panel-block"><h2>Save Slots</h2><p>' + saveSlots.length + " stored locally in this browser.</p></section>",
      '<section class="touch-controls"><button data-touch="ArrowUp">Up</button><div><button data-touch="ArrowLeft">Left</button><button data-touch="ArrowDown">Down</button><button data-touch="ArrowRight">Right</button></div></section>',
      "</aside>",
      "</section>",
      '<nav class="world-menu-bar"><button class="secondary-button" type="button" data-open-panel="map">Map</button><button class="secondary-button" type="button" data-open-panel="character">Character</button><button class="secondary-button" type="button" data-open-panel="inventory">Inventory</button><button class="secondary-button" type="button" data-open-panel="monsters">Monsters</button><button class="secondary-button" type="button" data-open-panel="registry">Registry</button><button class="secondary-button" type="button" data-open-panel="quests">Quests</button></nav>',
      renderWorldPanelModal(state, content),
      renderInteractionModal(state),
      renderBattleModal(state, content),
      "</main>",
    ].join("");

    drawWorld(root.querySelector(".world-canvas"), state, content, devToolsState);
  }

  function attachInputHandlers(root, app) {
    root.querySelector('[data-action="save"]')?.addEventListener("click", function () {
      app.saveCurrentGame();
    });
    root.querySelector('[data-action="open-settings"]')?.addEventListener("click", function () {
      app.openWorldPanel("settings");
    });
    root.querySelector('[data-action="close-world-panel"]')?.addEventListener("click", function () {
      app.closeWorldPanel();
    });

    root.querySelector('[data-action="title"]')?.addEventListener("click", function () {
      app.showTitle();
    });
    root.querySelector('[data-action="close-interaction"]')?.addEventListener("click", function () {
      app.closeInteraction();
    });

    root.querySelectorAll("[data-open-panel]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.openWorldPanel(button.getAttribute("data-open-panel"));
      });
    });

    root.querySelectorAll("[data-world-setting]").forEach(function (field) {
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateWorldSetting(field.getAttribute("data-world-setting"), field.value);
      });
    });

    root.querySelectorAll("[data-battle-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.handleBattleAction(button.getAttribute("data-battle-action"));
      });
    });

    root.querySelectorAll("[data-touch]").forEach(function (button) {
      const key = button.getAttribute("data-touch");
      const press = function (event) {
        event.preventDefault();
        keysDown.add(key);
      };
      const release = function (event) {
        event.preventDefault();
        keysDown.delete(key);
      };

      button.addEventListener("pointerdown", press);
      button.addEventListener("pointerup", release);
      button.addEventListener("pointerleave", release);
      button.addEventListener("pointercancel", release);
    });
  }

  function attachDevToolsHandlers(root, app) {
    root.querySelector('[data-action="back-to-title"]')?.addEventListener("click", function () {
      app.showTitle();
    });

    root.querySelector('[data-action="dev-section-maps"]')?.addEventListener("click", function () {
      app.setDevSection("maps");
    });
    root.querySelector('[data-action="dev-section-towns"]')?.addEventListener("click", function () {
      app.setDevSection("towns");
    });
    root.querySelector('[data-action="dev-section-monsters"]')?.addEventListener("click", function () {
      app.setDevSection("monsters");
    });
    root.querySelector('[data-action="load-folder"]')?.addEventListener("click", function () {
      app.loadProjectFolder(true);
    });

    root.querySelector('[data-action="monster-mode-species"]')?.addEventListener("click", function () {
      app.setMonsterEditorMode("species");
    });
    root.querySelector('[data-action="monster-mode-skills"]')?.addEventListener("click", function () {
      app.setMonsterEditorMode("skills");
    });
    root.querySelector('[data-action="select-preview-variant"]')?.addEventListener("change", function (event) {
      app.selectPreviewVariant(event.target.value);
    });
    root.querySelector('[data-action="add-species"]')?.addEventListener("click", function () {
      app.addSpecies();
    });
    root.querySelector('[data-action="duplicate-species"]')?.addEventListener("click", function () {
      app.duplicateSpecies();
    });
    root.querySelector('[data-action="delete-species"]')?.addEventListener("click", function () {
      app.deleteSpecies();
    });
    root.querySelector('[data-action="add-skill"]')?.addEventListener("click", function () {
      app.addSkill();
    });
    root.querySelector('[data-action="duplicate-skill"]')?.addEventListener("click", function () {
      app.duplicateSkill();
    });
    root.querySelector('[data-action="delete-skill"]')?.addEventListener("click", function () {
      app.deleteSkill();
    });
    root.querySelector('[data-action="add-variant"]')?.addEventListener("click", function () {
      app.addVariant();
    });
    root.querySelectorAll('[data-action="duplicate-variant"]').forEach(function (button) {
      button.addEventListener("click", function () {
        app.duplicateVariant(Number(button.getAttribute("data-variant-index")));
      });
    });
    root.querySelectorAll('[data-action="delete-variant"]').forEach(function (button) {
      button.addEventListener("click", function () {
        app.deleteVariant(Number(button.getAttribute("data-variant-index")));
      });
    });
    root.querySelector('[data-action="export-monsters-json"]')?.addEventListener("click", function () {
      app.exportMonstersJson();
    });
    root.querySelector('[data-action="export-skills-json"]')?.addEventListener("click", function () {
      app.exportSkillsJson();
    });

    root.querySelector('[data-action="add-transition"]')?.addEventListener("click", function () {
      app.addTransition();
    });
    root.querySelector('[data-action="add-spawn"]')?.addEventListener("click", function () {
      app.addSpawn();
    });
    root.querySelector('[data-action="duplicate-spawn"]')?.addEventListener("click", function () {
      app.duplicateSpawn();
    });
    root.querySelector('[data-action="delete-spawn"]')?.addEventListener("click", function () {
      app.deleteSpawn();
    });
    root.querySelector('[data-action="add-spawn-option"]')?.addEventListener("click", function () {
      app.addSpawnOption();
    });
    root.querySelectorAll('[data-action="delete-spawn-option"]').forEach(function (button) {
      button.addEventListener("click", function () {
        app.deleteSpawnOption(Number(button.getAttribute("data-option-index")));
      });
    });
    root.querySelector('[data-action="mode-transitions"]')?.addEventListener("click", function () {
      app.setDevEditorMode("transitions");
    });
    root.querySelector('[data-action="mode-spawns"]')?.addEventListener("click", function () {
      app.setDevEditorMode("spawns");
    });
    root.querySelector('[data-action="mode-interactions"]')?.addEventListener("click", function () {
      app.setDevEditorMode("interactions");
    });
    root.querySelectorAll('[data-action="dev-zoom"]').forEach(function (button) {
      button.addEventListener("click", function () {
        app.setDevPreviewZoom(Number(button.getAttribute("data-zoom")));
      });
    });

    root.querySelector('[data-action="duplicate-transition"]')?.addEventListener("click", function () {
      app.duplicateTransition();
    });

    root.querySelector('[data-action="delete-transition"]')?.addEventListener("click", function () {
      app.deleteTransition();
    });
    root.querySelector('[data-action="add-interaction"]')?.addEventListener("click", function () {
      app.addInteraction();
    });
    root.querySelector('[data-action="duplicate-interaction"]')?.addEventListener("click", function () {
      app.duplicateInteraction();
    });
    root.querySelector('[data-action="delete-interaction"]')?.addEventListener("click", function () {
      app.deleteInteraction();
    });

    root.querySelector('[data-action="export-map-metadata"]')?.addEventListener("click", function () {
      app.exportCurrentMapMetadata();
    });
    root.querySelector('[data-action="export-towns-json"]')?.addEventListener("click", function () {
      app.exportTownsJson();
    });

    root.querySelectorAll("[data-dev-select-map]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectDevMap(button.getAttribute("data-dev-select-map"));
      });
    });
    root.querySelectorAll("[data-dev-select-town-map]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectTownMap(button.getAttribute("data-dev-select-town-map"));
      });
    });

    root.querySelectorAll("[data-dev-select-transition]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectTransition(button.getAttribute("data-dev-select-transition"));
      });
    });
    root.querySelectorAll("[data-dev-select-spawn]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectSpawn(button.getAttribute("data-dev-select-spawn"));
      });
    });
    root.querySelectorAll("[data-dev-select-interaction]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectInteraction(button.getAttribute("data-dev-select-interaction"));
      });
    });
    root.querySelectorAll("[data-dev-select-species]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectSpecies(button.getAttribute("data-dev-select-species"));
      });
    });
    root.querySelectorAll("[data-dev-select-skill]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectSkill(button.getAttribute("data-dev-select-skill"));
      });
    });

    root.querySelectorAll("[data-dev-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateTransitionField(field.getAttribute("data-dev-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateTransitionField(field.getAttribute("data-dev-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-spawn-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateSpawnField(field.getAttribute("data-dev-spawn-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateSpawnField(field.getAttribute("data-dev-spawn-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-spawn-option-field]").forEach(function (field) {
      const isWeightField = field.getAttribute("data-dev-spawn-option-field") === "weight";
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateSpawnOptionField(
          Number(field.getAttribute("data-option-index")),
          field.getAttribute("data-dev-spawn-option-field"),
          field.value,
          !isWeightField
        );
      });
      if (isWeightField) {
        field.addEventListener("change", function () {
          app.updateSpawnOptionField(
            Number(field.getAttribute("data-option-index")),
            field.getAttribute("data-dev-spawn-option-field"),
            field.value
          );
        });
      }
    });
    root.querySelectorAll("[data-dev-map-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateMapField(field.getAttribute("data-dev-map-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateMapField(field.getAttribute("data-dev-map-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-town-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateTownField(field.getAttribute("data-dev-town-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateTownField(field.getAttribute("data-dev-town-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-species-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateSpeciesField(field.getAttribute("data-dev-species-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateSpeciesField(field.getAttribute("data-dev-species-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-skill-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateSkillField(field.getAttribute("data-dev-skill-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateSkillField(field.getAttribute("data-dev-skill-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-variant-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateVariantField(Number(field.getAttribute("data-variant-index")), field.getAttribute("data-dev-variant-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateVariantField(Number(field.getAttribute("data-variant-index")), field.getAttribute("data-dev-variant-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-interaction-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateInteractionField(field.getAttribute("data-dev-interaction-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateInteractionField(field.getAttribute("data-dev-interaction-field"), field.value);
        });
      }
    });
    root.querySelectorAll('[data-action="toggle-species-skill"]').forEach(function (field) {
      field.addEventListener("change", function () {
        app.toggleSpeciesSkill(field.getAttribute("data-skill-id"), field.checked);
      });
    });

    const devCanvas = root.querySelector(".dev-map-canvas");
    devCanvas?.addEventListener("click", function (event) {
      app.placeSelectedEditorItemFromDevCanvas(event);
    });
    devCanvas?.addEventListener("pointerdown", function (event) {
      app.beginDevCanvasInteraction(event);
    });
    devCanvas?.addEventListener("pointermove", function (event) {
      app.updateDevCanvasInteraction(event);
    });
    devCanvas?.addEventListener("pointerup", function (event) {
      app.endDevCanvasInteraction(event);
    });
    devCanvas?.addEventListener("pointerleave", function (event) {
      app.endDevCanvasInteraction(event);
    });
    devCanvas?.addEventListener("pointercancel", function (event) {
      app.endDevCanvasInteraction(event);
    });

    root.querySelector(".dev-target-canvas")?.addEventListener("click", function (event) {
      app.placeTargetSpawnFromDevCanvas(event);
    });
    root.querySelector(".dev-town-canvas")?.addEventListener("click", function (event) {
      app.placeTownSpawnFromDevCanvas(event);
    });
  }

  function attachPersistentRootHandlers(root, app) {
    root.addEventListener("click", function (event) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) {
        return;
      }

      if (app.state.screen === "dev-tools") {
        const actionEl = target.closest("[data-action]");
        if (actionEl instanceof HTMLElement) {
          const action = actionEl.getAttribute("data-action");
          if (action === "back-to-title") {
            event.preventDefault();
            event.stopPropagation();
            app.showTitle();
            return;
          }
          if (action === "load-folder") {
            event.preventDefault();
            event.stopPropagation();
            app.loadProjectFolder(true);
            return;
          }
          if (action === "dev-section-maps") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevSection("maps");
            return;
          }
          if (action === "dev-section-towns") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevSection("towns");
            return;
          }
          if (action === "dev-section-monsters") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevSection("monsters");
            return;
          }
          if (action === "mode-transitions") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevEditorMode("transitions");
            return;
          }
          if (action === "mode-spawns") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevEditorMode("spawns");
            return;
          }
          if (action === "mode-interactions") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevEditorMode("interactions");
            return;
          }
          if (action === "add-transition") {
            event.preventDefault();
            event.stopPropagation();
            app.addTransition();
            return;
          }
          if (action === "duplicate-transition") {
            event.preventDefault();
            event.stopPropagation();
            app.duplicateTransition();
            return;
          }
          if (action === "delete-transition") {
            event.preventDefault();
            event.stopPropagation();
            app.deleteTransition();
            return;
          }
          if (action === "dev-zoom") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevPreviewZoom(Number(actionEl.getAttribute("data-zoom")));
            return;
          }
        }

        const mapEl = target.closest("[data-dev-select-map]");
        if (mapEl instanceof HTMLElement) {
          app.selectDevMap(mapEl.getAttribute("data-dev-select-map"));
          return;
        }

        const townEl = target.closest("[data-dev-select-town-map]");
        if (townEl instanceof HTMLElement) {
          app.selectTownMap(townEl.getAttribute("data-dev-select-town-map"));
          return;
        }

        const transitionEl = target.closest("[data-dev-select-transition]");
        if (transitionEl instanceof HTMLElement) {
          app.selectTransition(transitionEl.getAttribute("data-dev-select-transition"));
          return;
        }

        const spawnEl = target.closest("[data-dev-select-spawn]");
        if (spawnEl instanceof HTMLElement) {
          app.selectSpawn(spawnEl.getAttribute("data-dev-select-spawn"));
          return;
        }

        const interactionEl = target.closest("[data-dev-select-interaction]");
        if (interactionEl instanceof HTMLElement) {
          app.selectInteraction(interactionEl.getAttribute("data-dev-select-interaction"));
          return;
        }

        const speciesEl = target.closest("[data-dev-select-species]");
        if (speciesEl instanceof HTMLElement) {
          app.selectSpecies(speciesEl.getAttribute("data-dev-select-species"));
          return;
        }

        const skillEl = target.closest("[data-dev-select-skill]");
        if (skillEl instanceof HTMLElement) {
          event.preventDefault();
          event.stopPropagation();
          app.selectSkill(skillEl.getAttribute("data-dev-select-skill"));
        }
      }
    }, true);

    root.addEventListener("change", function (event) {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (!target || app.state.screen !== "dev-tools") {
        return;
      }

      if (target.matches("[data-dev-field]")) {
        event.stopPropagation();
        app.updateTransitionField(target.getAttribute("data-dev-field"), target.value);
        return;
      }

      if (target.matches("[data-action='select-preview-variant']")) {
        event.stopPropagation();
        app.selectPreviewVariant(target.value);
        return;
      }
    }, true);
  }

  function createApp(root, content, saveManager) {
    const app = {
      content,
      saveManager,
      state: { screen: "title" },
      titleNotice: "",
      devTools: {
        open: false,
        section: "maps",
        selectedMapId: Object.keys(content.maps)[0] || "",
        selectedTownMapId: Object.keys(content.maps).find(function (mapId) {
          return content.mapMetadata[mapId]?.isTown;
        }) || "",
        selectedTransitionId: "",
        selectedSpawnId: "",
        selectedInteractionId: "",
        editorMode: "transitions",
        monsterSubMode: "species",
        selectedSpeciesId: content.monsters?.species?.[0]?.id || "",
        selectedSkillId: ensureSkillCatalog(content)[0]?.id || "",
        selectedPreviewVariantId: content.monsters?.species?.[0]?.variants?.[0]?.id || "",
        previewZoom: 100,
        previewScroll: {
          source: { left: 0, top: 0 },
          target: { left: 0, top: 0 },
        },
        drag: null,
      },
      lastFrameAt: null,
      deferredRenderTimer: null,
      showTitle: function (notice) {
        this.titleNotice = notice || "";
        this.state = { screen: "title" };
        this.render();
      },
      scheduleDeferredRender: function () {
        if (this.deferredRenderTimer) {
          window.clearTimeout(this.deferredRenderTimer);
        }

        this.deferredRenderTimer = window.setTimeout(() => {
          this.deferredRenderTimer = null;
          this.render();
        }, 120);
      },
      clearDeferredRender: function () {
        if (!this.deferredRenderTimer) {
          return;
        }

        window.clearTimeout(this.deferredRenderTimer);
        this.deferredRenderTimer = null;
      },
      showDevTools: function (mapId) {
        this.devTools.open = true;
        this.devTools.selectedMapId = mapId || this.devTools.selectedMapId || Object.keys(this.content.maps)[0] || "";
        const transitions = this.content.mapMetadata[this.devTools.selectedMapId]?.transitions || [];
        this.devTools.selectedTransitionId = transitions[0]?.id || "";
        const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[this.devTools.selectedMapId]);
        this.devTools.selectedSpawnId = visibleSpawns[0]?.id || "";
        const interactions = getEditableInteractions(this.content.mapMetadata[this.devTools.selectedMapId]);
        this.devTools.selectedInteractionId = interactions[0]?.id || "";
        syncMonsterDevSelection(this.content, this.devTools);
        this.state = { screen: "dev-tools" };
        this.render();
      },
      showNewGameSetup: function () {
        this.state = buildNewGameSetup(this.content);
        this.render();
      },
      startNewGame: function () {
        if (this.state.screen !== "new-game") {
          this.showNewGameSetup();
          return;
        }

        const starterTowns = getStarterTownOptions(this.content);
        const selectedTown = starterTowns.find((town) => town.id === this.state.townId) || starterTowns[0];
        const selectedSpecies = getSpecies(this.content, this.state.starterSpeciesId) || this.content.monsters.species[0];
        const playerName = (this.state.playerName || "Player").trim() || "Player";
        const saveName = (this.state.saveName || "").trim() || (playerName + " - " + selectedTown.name + " - " + selectedSpecies.name);

        this.state = createNewGameState(this.content, {
          playerName,
          avatarId: this.state.avatarId,
          townId: selectedTown.id,
          starterSpeciesId: selectedSpecies.id,
          saveName,
        }, this.saveManager);
        this.devTools.open = false;
        this.saveCurrentGame();
        this.render();
      },
      continueGame: function () {
        const slots = this.saveManager.listSaves();
        if (!slots.length) {
          this.startNewGame();
          return;
        }

        const save = this.saveManager.readSave(slots[0].slotId);
        if (!save) {
          this.startNewGame();
          return;
        }

        this.state = hydrateStateFromSave(save, this.content);
        this.devTools.open = false;
        this.render();
      },
      saveCurrentGame: function () {
        if (this.state.screen !== "world") {
          return;
        }

        const save = serializeState(this.state);
        this.saveManager.writeSave(save);
        this.state.message = "Game saved locally in this browser.";
        this.render();
      },
      openWorldPanel: function (panel) {
        if (this.state.screen !== "world") {
          return;
        }

        ensureWorldUiState(this.state).activePanel = panel;
        this.render();
      },
      closeWorldPanel: function () {
        if (this.state.screen !== "world") {
          return;
        }

        ensureWorldUiState(this.state).activePanel = "";
        this.render();
      },
      updateWorldSetting: function (key, rawValue) {
        if (this.state.screen !== "world") {
          return;
        }

        if (key === "zoom" || key === "partySize") {
          this.state.settings[key] = Number(rawValue || 0);
        } else if (key === "shareExperience" || key === "mapDetails") {
          this.state.settings[key] = rawValue === "true";
        } else {
          this.state.settings[key] = rawValue;
        }

        this.render();
      },
      closeInteraction: function () {
        if (this.state.screen !== "world") {
          return;
        }

        this.state.interaction = null;
        this.render();
      },
      tryInteract: function () {
        if (this.state.screen !== "world" || this.state.battle) {
          return;
        }

        if (this.state.interaction) {
          this.closeInteraction();
          return;
        }

        const interaction = getActiveInteraction(this.state, this.content);
        if (!interaction) {
          this.state.message = "There is nothing to interact with here.";
          this.render();
          return;
        }

        openInteraction(this.state, this.content, interaction);
        this.render();
      },
      updateNewGameSetup: function (action, value) {
        if (this.state.screen !== "new-game") {
          return;
        }

        if (action === "select-starter") {
          this.state.starterSpeciesId = value;
        } else if (action === "select-town") {
          this.state.townId = value;
        } else if (action === "select-avatar") {
          this.state.avatarId = value;
        } else if (action === "set-player-name") {
          this.state.playerName = value;
          return;
        } else if (action === "set-save-name") {
          this.state.saveName = value;
          return;
        } else if (action === "random-starter") {
          const pool = this.content.monsters.species;
          this.state.starterSpeciesId = pool[Math.floor(Math.random() * pool.length)].id;
        } else if (action === "random-town") {
          const pool = getStarterTownOptions(this.content);
          this.state.townId = pool[Math.floor(Math.random() * pool.length)].id;
        }

        this.render();
      },
      handleBattleAction: function (action) {
        if (!this.state.battle) {
          return;
        }

        if (action === "attack") {
          resolveBattleAttack(this.state, this.content);
        } else if (action === "item") {
          useTonic(this.state, this.content);
        } else if (action === "swap") {
          swapMonster(this.state, this.content);
        } else if (action === "catch") {
          resolveCatch(this.state, this.content);
        } else if (action === "run") {
          attemptRun(this.state, this.content);
        } else if (action === "close-battle") {
          this.state.battle = null;
        }

        this.render();
      },
      loadProjectFolder: async function (keepDevTools) {
        if (!("showDirectoryPicker" in window)) {
          window.alert("Folder access is not supported in this browser.");
          return;
        }

        try {
          const rootHandle = await window.showDirectoryPicker();
          const nextContent = await loadContentFromDirectory(rootHandle);
          validateContent(nextContent);
          this.content = nextContent;
          syncMonsterDevSelection(this.content, this.devTools);
          this.devTools.selectedMapId = Object.keys(nextContent.maps)[0] || "";
          this.devTools.selectedTownMapId = Object.keys(nextContent.maps).find((mapId) => nextContent.mapMetadata[mapId]?.isTown) || "";
          this.devTools.selectedTransitionId = nextContent.mapMetadata[this.devTools.selectedMapId]?.transitions?.[0]?.id || "";
          this.devTools.selectedSpawnId = getEditableVisibleSpawns(nextContent.mapMetadata[this.devTools.selectedMapId])[0]?.id || "";
          this.devTools.selectedInteractionId = getEditableInteractions(nextContent.mapMetadata[this.devTools.selectedMapId])[0]?.id || "";
          if (keepDevTools || this.state.screen === "dev-tools") {
            this.showDevTools(this.devTools.selectedMapId);
          } else {
            this.showTitle("Project folder loaded. Start a new game or continue an existing save.");
          }
        } catch (error) {
          if (error?.name !== "AbortError") {
            window.alert(error instanceof Error ? error.message : "Could not load the project folder.");
          }
        }
      },
      selectDevMap: function (mapId) {
        this.devTools.selectedMapId = mapId;
        const transitions = this.content.mapMetadata[mapId]?.transitions || [];
        this.devTools.selectedTransitionId = transitions[0]?.id || "";
        const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[mapId]);
        this.devTools.selectedSpawnId = visibleSpawns[0]?.id || "";
        const interactions = getEditableInteractions(this.content.mapMetadata[mapId]);
        this.devTools.selectedInteractionId = interactions[0]?.id || "";
        this.render();
      },
      selectTownMap: function (mapId) {
        this.devTools.selectedTownMapId = mapId;
        ensureTownEntryForMap(this.content, mapId);
        this.render();
      },
      setDevSection: function (section) {
        this.devTools.section = section;
        if (section === "towns" && !this.devTools.selectedTownMapId) {
          this.devTools.selectedTownMapId = Object.keys(this.content.maps).find((mapId) => this.content.mapMetadata[mapId]?.isTown) || "";
        }
        syncMonsterDevSelection(this.content, this.devTools);
        this.render();
      },
      setDevEditorMode: function (mode) {
        this.devTools.editorMode = mode;
        this.render();
      },
      setMonsterEditorMode: function (mode) {
        this.devTools.monsterSubMode = mode;
        syncMonsterDevSelection(this.content, this.devTools);
        this.render();
      },
      setDevPreviewZoom: function (zoom) {
        if (![100, 80, 60, 30, 10].includes(zoom)) {
          return;
        }

        this.devTools.previewZoom = zoom;
        this.render();
      },
      captureDevPreviewScroll: function () {
        if (this.state.screen !== "dev-tools") {
          return;
        }

        const sourceScroller = root.querySelector('[data-preview-role="source"]');
        const targetScroller = root.querySelector('[data-preview-role="target"]');

        if (sourceScroller) {
          this.devTools.previewScroll.source = {
            left: sourceScroller.scrollLeft,
            top: sourceScroller.scrollTop,
          };
        }

        if (targetScroller) {
          this.devTools.previewScroll.target = {
            left: targetScroller.scrollLeft,
            top: targetScroller.scrollTop,
          };
        }
      },
      restoreDevPreviewScroll: function () {
        if (this.state.screen !== "dev-tools") {
          return;
        }

        const sourceScroller = root.querySelector('[data-preview-role="source"]');
        const targetScroller = root.querySelector('[data-preview-role="target"]');

        if (sourceScroller) {
          sourceScroller.scrollLeft = this.devTools.previewScroll.source?.left || 0;
          sourceScroller.scrollTop = this.devTools.previewScroll.source?.top || 0;
        }

        if (targetScroller) {
          targetScroller.scrollLeft = this.devTools.previewScroll.target?.left || 0;
          targetScroller.scrollTop = this.devTools.previewScroll.target?.top || 0;
        }
      },
      selectTransition: function (transitionId) {
        this.devTools.selectedTransitionId = transitionId;
        this.devTools.editorMode = "transitions";
        this.render();
      },
      selectSpawn: function (spawnId) {
        this.devTools.selectedSpawnId = spawnId;
        this.devTools.editorMode = "spawns";
        this.render();
      },
      selectInteraction: function (interactionId) {
        this.devTools.selectedInteractionId = interactionId;
        this.devTools.editorMode = "interactions";
        this.render();
      },
      selectSpecies: function (speciesId) {
        this.devTools.selectedSpeciesId = speciesId;
        this.devTools.monsterSubMode = "species";
        const species = this.content.monsters.species.find((entry) => entry.id === speciesId);
        this.devTools.selectedPreviewVariantId = species?.variants?.[0]?.id || "";
        this.render();
      },
      selectPreviewVariant: function (variantId) {
        this.devTools.selectedPreviewVariantId = variantId;
        this.render();
      },
      selectSkill: function (skillId) {
        this.devTools.selectedSkillId = skillId;
        this.devTools.monsterSubMode = "skills";
        this.render();
      },
      addSpecies: function () {
        ensureMonsterEditorContent(this.content);
        const species = this.content.monsters.species;
        const next = createEmptySpecies(this.content, species.length + 1);
        species.push(next);
        this.devTools.selectedSpeciesId = next.id;
        this.devTools.section = "monsters";
        this.devTools.monsterSubMode = "species";
        this.render();
      },
      duplicateSpecies: function () {
        ensureMonsterEditorContent(this.content);
        const current = this.content.monsters.species.find((entry) => entry.id === this.devTools.selectedSpeciesId);
        if (!current) {
          return;
        }

        const duplicate = JSON.parse(JSON.stringify(current));
        duplicate.id = current.id + "-copy";
        duplicate.name = current.name + " Copy";
        this.content.monsters.species.push(duplicate);
        this.devTools.selectedSpeciesId = duplicate.id;
        this.render();
      },
      deleteSpecies: function () {
        ensureMonsterEditorContent(this.content);
        this.content.monsters.species = this.content.monsters.species.filter((entry) => entry.id !== this.devTools.selectedSpeciesId);
        syncMonsterDevSelection(this.content, this.devTools);
        this.render();
      },
      addSkill: function () {
        const skills = ensureSkillCatalog(this.content);
        const next = createEmptySkill(skills.length + 1);
        skills.push(next);
        this.devTools.selectedSkillId = next.id;
        this.devTools.section = "monsters";
        this.devTools.monsterSubMode = "skills";
        this.render();
      },
      duplicateSkill: function () {
        const skills = ensureSkillCatalog(this.content);
        const current = skills.find((entry) => entry.id === this.devTools.selectedSkillId);
        if (!current) {
          return;
        }

        const duplicate = JSON.parse(JSON.stringify(current));
        duplicate.id = current.id + "-copy";
        duplicate.name = current.name + " Copy";
        skills.push(duplicate);
        this.devTools.selectedSkillId = duplicate.id;
        this.render();
      },
      deleteSkill: function () {
        const skills = ensureSkillCatalog(this.content).filter((entry) => entry.id !== this.devTools.selectedSkillId);
        this.content.skills.skills = skills;
        syncMonsterDevSelection(this.content, this.devTools);
        this.render();
      },
      addVariant: function () {
        const species = this.content.monsters.species.find((entry) => entry.id === this.devTools.selectedSpeciesId);
        if (!species) {
          return;
        }

        species.variants = species.variants || [];
        species.variants.push({
          id: "variant-" + (species.variants.length + 1),
          sprite: species.variants[0]?.sprite || "assets/monsters/new-monster.png",
        });
        this.devTools.selectedPreviewVariantId = species.variants[species.variants.length - 1]?.id || this.devTools.selectedPreviewVariantId;
        this.render();
      },
      duplicateVariant: function (variantIndex) {
        const species = this.content.monsters.species.find((entry) => entry.id === this.devTools.selectedSpeciesId);
        const current = species?.variants?.[variantIndex];
        if (!current) {
          return;
        }

        const duplicate = JSON.parse(JSON.stringify(current));
        duplicate.id = current.id + "-copy";
        species.variants.splice(variantIndex + 1, 0, duplicate);
        this.devTools.selectedPreviewVariantId = duplicate.id;
        this.render();
      },
      deleteVariant: function (variantIndex) {
        const species = this.content.monsters.species.find((entry) => entry.id === this.devTools.selectedSpeciesId);
        if (!species?.variants?.[variantIndex]) {
          return;
        }

        species.variants.splice(variantIndex, 1);
        this.devTools.selectedPreviewVariantId = getSpeciesVariant(species, this.devTools.selectedPreviewVariantId)?.id || species.variants?.[0]?.id || "";
        this.render();
      },
      addTransition: function () {
        const mapId = this.devTools.selectedMapId;
        const mapMeta = this.content.mapMetadata[mapId];
        const nextId = "transition-" + (mapMeta.transitions.length + 1);
        const targetMapId = Object.keys(this.content.maps).find(function (candidate) {
          return candidate !== mapId;
        }) || mapId;
        const transition = {
          id: nextId,
          x: 0,
          y: 0,
          width: 128,
          height: 128,
          targetMapId,
          targetSpawn: { x: 128, y: 128 },
        };

        mapMeta.transitions.push(transition);
        this.devTools.selectedTransitionId = transition.id;
        this.devTools.open = true;
        this.render();
      },
      addSpawn: function () {
        const mapMeta = this.content.mapMetadata[this.devTools.selectedMapId];
        const visibleSpawns = getEditableVisibleSpawns(mapMeta);
        const speciesId = this.content.monsters.species[0]?.id || "unknown";
        const spawn = {
          id: "spawn-" + (visibleSpawns.length + 1),
          speciesId,
          spawnChance: 100,
          x: 128,
          y: 128,
          levelMin: 2,
          levelMax: 4,
          respawnSeconds: 120,
          monsterOptions: [
            {
              speciesId,
              weight: 100,
            },
          ],
        };
        visibleSpawns.push(spawn);
        this.devTools.selectedSpawnId = spawn.id;
        this.devTools.editorMode = "spawns";
        this.render();
      },
      addInteraction: function () {
        const interactions = getEditableInteractions(this.content.mapMetadata[this.devTools.selectedMapId]);
        const next = createDefaultInteraction(interactions.length + 1);
        interactions.push(next);
        this.devTools.selectedInteractionId = next.id;
        this.devTools.editorMode = "interactions";
        this.render();
      },
      duplicateTransition: function () {
        const mapMeta = this.content.mapMetadata[this.devTools.selectedMapId];
        const current = mapMeta.transitions.find((entry) => entry.id === this.devTools.selectedTransitionId);
        if (!current) {
          return;
        }

        const duplicate = JSON.parse(JSON.stringify(current));
        duplicate.id = current.id + "-copy";
        duplicate.x += 32;
        duplicate.y += 32;
        mapMeta.transitions.push(duplicate);
        this.devTools.selectedTransitionId = duplicate.id;
        this.render();
      },
      duplicateSpawn: function () {
        const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[this.devTools.selectedMapId]);
        const current = visibleSpawns.find((entry) => entry.id === this.devTools.selectedSpawnId);
        if (!current) {
          return;
        }

        const duplicate = JSON.parse(JSON.stringify(current));
        duplicate.id = current.id + "-copy";
        duplicate.x += 64;
        duplicate.y += 64;
        visibleSpawns.push(duplicate);
        this.devTools.selectedSpawnId = duplicate.id;
        this.render();
      },
      duplicateInteraction: function () {
        const interactions = getEditableInteractions(this.content.mapMetadata[this.devTools.selectedMapId]);
        const current = interactions.find((entry) => entry.id === this.devTools.selectedInteractionId);
        if (!current) {
          return;
        }

        const duplicate = JSON.parse(JSON.stringify(current));
        duplicate.id = current.id + "-copy";
        duplicate.label = (current.label || current.id) + " Copy";
        duplicate.x += 64;
        duplicate.y += 64;
        interactions.push(duplicate);
        this.devTools.selectedInteractionId = duplicate.id;
        this.render();
      },
      deleteTransition: function () {
        const mapMeta = this.content.mapMetadata[this.devTools.selectedMapId];
        mapMeta.transitions = mapMeta.transitions.filter((entry) => entry.id !== this.devTools.selectedTransitionId);
        this.devTools.selectedTransitionId = mapMeta.transitions[0]?.id || "";
        this.render();
      },
      deleteSpawn: function () {
        const mapMeta = this.content.mapMetadata[this.devTools.selectedMapId];
        const nextSpawns = getEditableVisibleSpawns(mapMeta).filter((entry) => entry.id !== this.devTools.selectedSpawnId);
        ensureSpawnZone(mapMeta).visibleSpawns = nextSpawns;
        this.devTools.selectedSpawnId = nextSpawns[0]?.id || "";
        this.render();
      },
      deleteInteraction: function () {
        const mapMeta = this.content.mapMetadata[this.devTools.selectedMapId];
        const nextInteractions = getEditableInteractions(mapMeta).filter((entry) => entry.id !== this.devTools.selectedInteractionId);
        mapMeta.interactions = nextInteractions;
        this.devTools.selectedInteractionId = nextInteractions[0]?.id || "";
        this.render();
      },
      addSpawnOption: function () {
        const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[this.devTools.selectedMapId]);
        const spawn = visibleSpawns.find((entry) => entry.id === this.devTools.selectedSpawnId);
        if (!spawn) {
          return;
        }

        const speciesId = this.content.monsters.species[0]?.id || "unknown";
        ensureSpawnOptions(spawn, this.content).push({
          speciesId,
          weight: 100,
        });
        spawn.speciesId = getSpawnDisplaySpeciesId(spawn, this.content);
        this.render();
      },
      deleteSpawnOption: function (optionIndex) {
        const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[this.devTools.selectedMapId]);
        const spawn = visibleSpawns.find((entry) => entry.id === this.devTools.selectedSpawnId);
        if (!spawn) {
          return;
        }

        const options = ensureSpawnOptions(spawn, this.content);
        if (!options[optionIndex]) {
          return;
        }

        options.splice(optionIndex, 1);
        ensureSpawnOptions(spawn, this.content);
        spawn.speciesId = getSpawnDisplaySpeciesId(spawn, this.content);
        this.render();
      },
      updateTransitionField: function (path, rawValue, shouldRender) {
        const mapMeta = this.content.mapMetadata[this.devTools.selectedMapId];
        const transition = mapMeta.transitions.find((entry) => entry.id === this.devTools.selectedTransitionId);
        if (!transition) {
          return;
        }

        const value = path === "id" || path === "targetMapId" ? rawValue : Number(rawValue || 0);

        if (path.includes(".")) {
          const parts = path.split(".");
          let current = transition;
          for (let index = 0; index < parts.length - 1; index += 1) {
            current = current[parts[index]];
          }
          current[parts[parts.length - 1]] = value;
        } else {
          transition[path] = value;
          if (path === "id") {
            this.devTools.selectedTransitionId = rawValue;
          }
        }

        if (shouldRender !== false) {
          this.render();
        }
      },
      updateSpawnField: function (path, rawValue, shouldRender) {
        const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[this.devTools.selectedMapId]);
        const spawn = visibleSpawns.find((entry) => entry.id === this.devTools.selectedSpawnId);
        if (!spawn) {
          return;
        }

        const value = path === "id" ? rawValue : Number(rawValue || 0);
        spawn[path] = value;
        if (path === "id") {
          this.devTools.selectedSpawnId = rawValue;
        }
        if (shouldRender !== false) {
          this.render();
        }
      },
      updateSpawnOptionField: function (optionIndex, field, rawValue, shouldRender) {
        const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[this.devTools.selectedMapId]);
        const spawn = visibleSpawns.find((entry) => entry.id === this.devTools.selectedSpawnId);
        if (!spawn) {
          return;
        }

        const option = ensureSpawnOptions(spawn, this.content)[optionIndex];
        if (!option) {
          return;
        }

        option[field] = field === "weight" ? Number(rawValue || 0) : rawValue;
        if (field === "speciesId") {
          const species = getSpecies(this.content, rawValue);
          option.variantId = getSpeciesVariant(species, option.variantId)?.id || "";
        }
        spawn.speciesId = getSpawnDisplaySpeciesId(spawn, this.content);
        if (shouldRender !== false) {
          this.render();
        }
      },
      updateInteractionField: function (path, rawValue, shouldRender) {
        const interactions = getEditableInteractions(this.content.mapMetadata[this.devTools.selectedMapId]);
        const interaction = interactions.find((entry) => entry.id === this.devTools.selectedInteractionId);
        if (!interaction) {
          return;
        }

        const value = ["id", "type", "label", "text", "data.shopId", "data.arenaId", "data.crestId"].includes(path)
          ? rawValue
          : Number(rawValue || 0);

        if (path.includes(".")) {
          const parts = path.split(".");
          let current = interaction;
          for (let index = 0; index < parts.length - 1; index += 1) {
            current = current[parts[index]];
          }
          current[parts[parts.length - 1]] = value;
        } else {
          interaction[path] = value;
          if (path === "id") {
            this.devTools.selectedInteractionId = rawValue;
          }
        }

        if (shouldRender !== false) {
          this.render();
        }
      },
      updateMapField: function (path, rawValue, shouldRender) {
        const mapId = this.devTools.selectedMapId;
        const mapMeta = this.content.mapMetadata[mapId];
        if (!mapMeta) {
          return;
        }

        if (path === "displayName") {
          mapMeta.displayName = rawValue;
        } else if (path === "mapType") {
          const isTown = rawValue === "town";
          mapMeta.isTown = isTown;
          mapMeta.safezone = isTown;
          if (isTown) {
            this.devTools.selectedTownMapId = mapId;
            ensureTownEntryForMap(this.content, mapId);
          } else {
            if (this.devTools.selectedTownMapId === mapId) {
              this.devTools.selectedTownMapId = Object.keys(this.content.maps).find((candidateId) => candidateId !== mapId && this.content.mapMetadata[candidateId]?.isTown) || "";
            }
          }
        } else if (path === "safezone") {
          mapMeta.safezone = rawValue === "true";
        }

        if (shouldRender !== false) {
          this.render();
        }
      },
      updateTownField: function (path, rawValue, shouldRender) {
        const mapId = this.devTools.selectedTownMapId || this.devTools.selectedMapId;
        const town = ensureTownEntryForMap(this.content, mapId);

        const value = path.startsWith("spawn.")
          ? Number(rawValue || 0)
          : path === "includeInStarterSelection"
            ? rawValue === "true"
            : rawValue;

        if (path.includes(".")) {
          const parts = path.split(".");
          let current = town;
          for (let index = 0; index < parts.length - 1; index += 1) {
            current = current[parts[index]];
          }
          current[parts[parts.length - 1]] = value;
        } else {
          town[path] = value;
        }

        town.mapId = mapId;
        if (shouldRender !== false) {
          this.render();
        }
      },
      updateSpeciesField: function (path, rawValue, shouldRender) {
        const species = this.content.monsters.species.find((entry) => entry.id === this.devTools.selectedSpeciesId);
        if (!species) {
          return;
        }

        const numericFields = new Set(["baseStats.hp", "baseStats.attack", "baseStats.defense", "baseStats.speed"]);
        const value = numericFields.has(path) ? Number(rawValue || 0) : rawValue;

        if (path.includes(".")) {
          const parts = path.split(".");
          let current = species;
          for (let index = 0; index < parts.length - 1; index += 1) {
            current = current[parts[index]];
          }
          current[parts[parts.length - 1]] = value;
        } else {
          species[path] = value;
          if (path === "id") {
            this.devTools.selectedSpeciesId = rawValue;
          }
        }

        if (shouldRender !== false) {
          this.render();
        }
      },
      updateSkillField: function (path, rawValue, shouldRender) {
        const skill = ensureSkillCatalog(this.content).find((entry) => entry.id === this.devTools.selectedSkillId);
        if (!skill) {
          return;
        }

        const value = path === "power" ? Number(rawValue || 0) : rawValue;
        skill[path] = value;
        if (path === "id") {
          this.devTools.selectedSkillId = rawValue;
        }
        if (shouldRender !== false) {
          this.render();
        }
      },
      updateVariantField: function (variantIndex, field, rawValue, shouldRender) {
        const species = this.content.monsters.species.find((entry) => entry.id === this.devTools.selectedSpeciesId);
        const variant = species?.variants?.[variantIndex];
        if (!variant) {
          return;
        }

        variant[field] = rawValue;
        if (shouldRender !== false) {
          this.render();
        }
      },
      toggleSpeciesSkill: function (skillId, checked) {
        const species = this.content.monsters.species.find((entry) => entry.id === this.devTools.selectedSpeciesId);
        if (!species) {
          return;
        }

        const next = new Set(species.skills || []);
        if (checked) {
          next.add(skillId);
        } else {
          next.delete(skillId);
        }
        species.skills = Array.from(next);
        this.render();
      },
      exportCurrentMapMetadata: function () {
        const mapId = this.devTools.selectedMapId;
        const mapMeta = this.content.mapMetadata[mapId];
        const exportPayload = {
          mapId: mapMeta.mapId,
          displayName: mapMeta.displayName,
          isTown: mapMeta.isTown,
          safezone: mapMeta.safezone,
          collisionGrid: mapMeta.collisionGrid,
          transitions: mapMeta.transitions,
          interactions: mapMeta.interactions,
          spawnZones: mapMeta.spawnZones,
          trainers: mapMeta.trainers,
          mapMonstersPanel: mapMeta.mapMonstersPanel,
        };

        const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = mapId + ".meta.json";
        anchor.click();
        URL.revokeObjectURL(url);
        this.state.message = "Exported metadata for " + mapMeta.displayName + ".";
        if (this.state.screen === "world") {
          this.render();
        }
      },
      exportTownsJson: function () {
        const payload = {
          towns: this.content.towns.towns,
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "towns.json";
        anchor.click();
        URL.revokeObjectURL(url);
      },
      placeTownSpawnFromDevCanvas: function (event) {
        if (this.state.screen !== "dev-tools" || this.devTools.section !== "towns") {
          return;
        }

        const mapId = this.devTools.selectedTownMapId;
        const map = this.content.maps[mapId];
        if (!map) {
          return;
        }

        const town = ensureTownEntryForMap(this.content, mapId);
        const canvas = event.currentTarget;
        const point = getCanvasPointFromEvent(event, canvas, map, this.devTools.previewZoom);
        const tileSize = map.tileSize;
        town.spawn.x = Math.max(0, Math.round(point.worldX / tileSize) * tileSize + tileSize / 2);
        town.spawn.y = Math.max(0, Math.round(point.worldY / tileSize) * tileSize + tileSize / 2);
        this.state.message = "Moved town spawn for " + town.name + " to " + town.spawn.x + ", " + town.spawn.y + ".";
        this.render();
      },
      exportMonstersJson: function () {
        const validation = validateMonsterEditorContent(this.content);
        if (validation.messages.length) {
          window.alert("Fix monster validation errors before exporting monsters.json.");
          this.render();
          return;
        }

        const payload = {
          species: this.content.monsters.species,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "monsters.json";
        anchor.click();
        URL.revokeObjectURL(url);
      },
      exportSkillsJson: function () {
        const validation = validateMonsterEditorContent(this.content);
        if (validation.messages.length) {
          window.alert("Fix monster validation errors before exporting skills.json.");
          this.render();
          return;
        }

        const payload = {
          skills: ensureSkillCatalog(this.content),
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "skills.json";
        anchor.click();
        URL.revokeObjectURL(url);
      },
      placeTargetSpawnFromDevCanvas: function (event) {
        if (this.state.screen !== "dev-tools" || this.devTools.editorMode !== "transitions") {
          return;
        }

        const sourceMapId = this.devTools.selectedMapId;
        const transition = (this.content.mapMetadata[sourceMapId]?.transitions || []).find((entry) => entry.id === this.devTools.selectedTransitionId);
        if (!transition) {
          return;
        }

        const targetMapId = transition.targetMapId;
        const map = this.content.maps[targetMapId];
        if (!map) {
          return;
        }

        const canvas = event.currentTarget;
        const point = getCanvasPointFromEvent(event, canvas, map, this.devTools.previewZoom);
        const tileSize = map.tileSize;
        transition.targetSpawn.x = Math.max(0, Math.round(point.worldX / tileSize) * tileSize + tileSize / 2);
        transition.targetSpawn.y = Math.max(0, Math.round(point.worldY / tileSize) * tileSize + tileSize / 2);
        this.state.message = "Moved target spawn for " + transition.id + " to " + transition.targetSpawn.x + ", " + transition.targetSpawn.y + ".";
        this.render();
      },
      placeSelectedEditorItemFromDevCanvas: function (event) {
        if (this.devTools.drag?.didDrag) {
          return;
        }

        if (this.state.screen !== "dev-tools") {
          return;
        }

        const mapId = this.devTools.selectedMapId;
        const canvas = event.currentTarget;
        const map = this.content.maps[mapId];
        const point = getCanvasPointFromEvent(event, canvas, map, this.devTools.previewZoom);
        const tileSize = map.tileSize;
        if (this.devTools.editorMode === "spawns") {
          const visibleSpawns = getEditableVisibleSpawns(this.content.mapMetadata[mapId]);
          const spawn = visibleSpawns.find((entry) => entry.id === this.devTools.selectedSpawnId);
          if (!spawn) {
            return;
          }
          spawn.x = Math.max(0, Math.round(point.worldX / tileSize) * tileSize + tileSize / 2);
          spawn.y = Math.max(0, Math.round(point.worldY / tileSize) * tileSize + tileSize / 2);
          this.state.message = "Moved spawn " + spawn.id + " to " + spawn.x + ", " + spawn.y + ".";
        } else if (this.devTools.editorMode === "interactions") {
          const interactions = getEditableInteractions(this.content.mapMetadata[mapId]);
          const interaction = interactions.find((entry) => entry.id === this.devTools.selectedInteractionId);
          if (!interaction) {
            return;
          }
          interaction.x = Math.max(0, Math.round(point.worldX / tileSize) * tileSize);
          interaction.y = Math.max(0, Math.round(point.worldY / tileSize) * tileSize);
          this.state.message = "Moved interaction " + interaction.id + " to " + interaction.x + ", " + interaction.y + ".";
        } else {
          const mapMeta = this.content.mapMetadata[mapId];
          const transition = mapMeta.transitions.find((entry) => entry.id === this.devTools.selectedTransitionId);
          if (!transition) {
            return;
          }
          transition.x = Math.max(0, Math.round(point.worldX / tileSize) * tileSize);
          transition.y = Math.max(0, Math.round(point.worldY / tileSize) * tileSize);
          this.state.message = "Moved transition " + transition.id + " to " + transition.x + ", " + transition.y + ".";
        }
        this.render();
      },
      beginDevCanvasInteraction: function (event) {
        if (this.state.screen !== "dev-tools" || this.devTools.editorMode !== "transitions") {
          return;
        }

        const mapId = this.devTools.selectedMapId;
        const map = this.content.maps[mapId];
        const mapMeta = this.content.mapMetadata[mapId];
        const transition = mapMeta.transitions.find((entry) => entry.id === this.devTools.selectedTransitionId);
        if (!transition) {
          return;
        }

        const canvas = event.currentTarget;
        const point = getCanvasPointFromEvent(event, canvas, map, this.devTools.previewZoom);
        const handle = getTransitionHandleHit(transition, point, point);
        if (!handle) {
          return;
        }

        event.preventDefault();
        this.devTools.drag = {
          type: handle.type,
          transitionId: transition.id,
          startWorldX: point.worldX,
          startWorldY: point.worldY,
          startWidth: transition.width,
          startHeight: transition.height,
          didDrag: false,
        };
      },
      updateDevCanvasInteraction: function (event) {
        if (this.state.screen !== "dev-tools" || !this.devTools.drag) {
          return;
        }

        const mapId = this.devTools.selectedMapId;
        const map = this.content.maps[mapId];
        const mapMeta = this.content.mapMetadata[mapId];
        const transition = mapMeta.transitions.find((entry) => entry.id === this.devTools.drag.transitionId);
        if (!transition) {
          return;
        }

        const canvas = event.currentTarget;
        const point = getCanvasPointFromEvent(event, canvas, map, this.devTools.previewZoom);
        const tileSize = map.tileSize;
        const deltaX = Math.round((point.worldX - this.devTools.drag.startWorldX) / tileSize) * tileSize;
        const deltaY = Math.round((point.worldY - this.devTools.drag.startWorldY) / tileSize) * tileSize;

        if (this.devTools.drag.type === "right" || this.devTools.drag.type === "corner") {
          transition.width = Math.max(tileSize, this.devTools.drag.startWidth + deltaX);
        }

        if (this.devTools.drag.type === "bottom" || this.devTools.drag.type === "corner") {
          transition.height = Math.max(tileSize, this.devTools.drag.startHeight + deltaY);
        }

        this.devTools.drag.didDrag = true;
        this.render();
      },
      endDevCanvasInteraction: function () {
        if (!this.devTools.drag) {
          return;
        }

        const didDrag = this.devTools.drag.didDrag;
        this.devTools.drag = null;

        if (didDrag) {
          this.state.message = "Resized transition " + this.devTools.selectedTransitionId + ".";
          this.render();
        }
      },
      update: function (deltaMs) {
        if (this.state.screen !== "world") {
          return;
        }

        if (this.devTools.open) {
          return;
        }

        if (ensureWorldUiState(this.state).activePanel) {
          return;
        }

        const hadBattle = Boolean(this.state.battle);
        updateRespawns(this.state, this.content);
        movePlayer(this.state, this.content, deltaMs);

        if (!hadBattle && this.state.battle) {
          this.render();
        }
      },
      render: function () {
        if (this.state.screen === "world") {
          document.body.setAttribute("data-theme", this.state.settings.theme || "classic");
        } else {
          document.body.setAttribute("data-theme", "classic");
        }

        const shouldPreserveDevScroll = this.state.screen === "dev-tools";
        const focusState = captureFocusableState(root);
        if (shouldPreserveDevScroll) {
          this.captureDevPreviewScroll();
        }

        if (this.state.screen === "title") {
          renderTitleScreen(root, this.saveManager.listSaves(), (action) => {
            if (action === "new-game") this.showNewGameSetup();
            if (action === "continue") this.continueGame();
            if (action === "open-dev-tools") this.showDevTools();
            if (action === "load-folder") this.loadProjectFolder();
          }, this.titleNotice);
          restoreFocusableState(root, focusState);
          return;
        }

        if (this.state.screen === "new-game") {
          renderNewGameScreen(root, this.content, this.state, (action, value) => {
            if (action === "back-to-title") this.showTitle();
            else if (action === "begin-adventure") this.startNewGame();
            else this.updateNewGameSetup(action, value);
          });
          restoreFocusableState(root, focusState);
          return;
        }

        if (this.state.screen === "dev-tools") {
          renderDevToolsScreen(root, this.content, this.devTools);
          attachDevToolsHandlers(root, this);
          this.restoreDevPreviewScroll();
          restoreFocusableState(root, focusState);
          return;
        }

        renderWorld(root, this.state, this.content, this.saveManager, this.devTools);
        attachInputHandlers(root, this);
        restoreFocusableState(root, focusState);
      },
    };

    return app;
  }

  function registerKeyboard() {
    window.addEventListener("keydown", function (event) {
      if (isEditableTarget(event.target)) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === "e") {
        event.preventDefault();
        ACTIVE_APP?.tryInteract();
        return;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        keysDown.add(key);
      }
    });

    window.addEventListener("keyup", function (event) {
      if (isEditableTarget(event.target)) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      keysDown.delete(key);
    });

    window.addEventListener("blur", function () {
      keysDown.clear();
    });
  }

  function bootstrap() {
    const root = document.getElementById("app");
    if (!root) {
      return;
    }

    try {
      const content = loadEmbeddedContent();
      validateContent(content);
      const saveManager = createSaveManager(window.localStorage);
      const app = createApp(root, content, saveManager);
      ACTIVE_APP = app;

      registerKeyboard();
      attachPersistentRootHandlers(root, app);
      app.render();

      function frame(timestamp) {
        if (app.lastFrameAt == null) {
          app.lastFrameAt = timestamp;
        }

        const delta = timestamp - app.lastFrameAt;
        app.lastFrameAt = timestamp;
        app.update(delta);

        if (app.state.screen === "world") {
          const canvas = root.querySelector(".world-canvas");
          if (canvas) {
            drawWorld(canvas, app.state, app.content, app.devTools);
          }
        }

        requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    } catch (error) {
      root.innerHTML = '<section class="error-state"><h1>Pastel Trails failed to load</h1><p>' +
        (error instanceof Error ? error.message : "Unknown error.") +
        "</p></section>";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
