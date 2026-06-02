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
  const PLAYER_SPRITE_SHEET = "assets/Characters/Boardwalk girl sprite/boardwalk girlcheckbackground_transparent.png";
  const PLAYER_SPRITE_COLUMNS = 4;
  const PLAYER_SPRITE_ROWS = 4;
  const PLAYER_WALK_FRAME_MS = 140;
  const CHARACTER_SHEET_OPTIONS = [
    {
      id: "boardwalk-girl-check",
      label: "Boardwalk Girl Check",
      path: "assets/Characters/Boardwalk girl sprite/boardwalk girlcheckbackground_transparent.png",
      columns: 4,
      rows: 4,
    },
    {
      id: "boardwalk-girl-original",
      label: "Boardwalk Girl Original",
      path: "assets/Characters/Boardwalk girl sprite/4x4walk sprite.png",
      columns: 4,
      rows: 4,
    },
  ];

  function prettifyCharacterSheetLabel(pathValue) {
    const baseName = String(pathValue || "")
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .trim();
    return baseName
      .split(/\s+/)
      .filter(Boolean)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }
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
        encounterPreview: false,
        encounterPreviewMode: "available",
        arenaLeaderMinLevel: 1,
        arenaLeaderMaxLevel: 10,
        arenaLeaderPartySize: 3,
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
    characterSheets: {
      sheets: CHARACTER_SHEET_OPTIONS.map(function (entry) {
        return {
          id: entry.id,
          label: entry.label,
          playerLabel: entry.label,
          playerSelectable: true,
          path: entry.path,
          columns: entry.columns,
          rows: entry.rows,
          offsetX: 0,
          offsetY: 0,
          rowOffsets: Array.from({ length: entry.rows }, function () {
            return { x: 0, y: 0 };
          }),
          frameOffsets: Array.from({ length: entry.rows }, function () {
            return Array.from({ length: entry.columns }, function () {
              return { x: 0, y: 0, width: 0, height: 0 };
            });
          }),
        };
      }),
    },
    arenas: { arenas: [] },
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

    const sourceSheets = rawContent.characterSheets?.sheets?.length
      ? rawContent.characterSheets.sheets
      : CHARACTER_SHEET_OPTIONS;
    const characterSheets = {
      sheets: sourceSheets.map(function (option) {
        const saved = (rawContent.characterSheets?.sheets || []).find(function (entry) {
          return entry.id === option.id;
        }) || {};
        const rows = Math.max(1, Number(saved.rows || option.rows || 4));
        const columns = Math.max(1, Number(saved.columns || option.columns || 4));
        const rowOffsets = Array.from({ length: rows }, function (_, rowIndex) {
          const entry = saved.rowOffsets?.[rowIndex] || {};
          return {
            x: Number(entry.x || 0),
            y: Number(entry.y || 0),
          };
        });
        const frameOffsets = Array.from({ length: rows }, function (_, rowIndex) {
          return Array.from({ length: columns }, function (_, columnIndex) {
            const entry = saved.frameOffsets?.[rowIndex]?.[columnIndex] || {};
            return {
              x: Number(entry.x || 0),
              y: Number(entry.y || 0),
              width: Number(entry.width || 0),
              height: Number(entry.height || 0),
            };
          });
        });

        return {
          id: option.id,
          label: saved.label || option.label || prettifyCharacterSheetLabel(option.path || option.id),
          playerLabel: saved.playerLabel || option.playerLabel || saved.label || option.label || prettifyCharacterSheetLabel(option.path || option.id),
          playerSelectable: saved.playerSelectable ?? option.playerSelectable ?? true,
          path: saved.path || option.path,
          columns,
          rows,
          offsetX: Number(saved.offsetX || 0),
          offsetY: Number(saved.offsetY || 0),
          rowOffsets,
          frameOffsets,
        };
      }),
    };

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
      characterSheets,
      arenas: rawContent.arenas || JSON.parse(JSON.stringify(fallbackContent.arenas)),
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

  async function loadCharacterSheetsFromDirectory(rootHandle) {
    const discoveredSheets = [];

    try {
      const assetsHandle = await rootHandle.getDirectoryHandle("assets");
      const charactersHandle = await assetsHandle.getDirectoryHandle("Characters");
      const spriteFolderHandle = await charactersHandle.getDirectoryHandle("Boardwalk girl sprite");

      for await (const [name, handle] of spriteFolderHandle.entries()) {
        if (handle.kind !== "file" || !name.toLowerCase().endsWith(".png")) {
          continue;
        }

        const path = ["assets", "Characters", "Boardwalk girl sprite", name].join("/");
        const existing = CHARACTER_SHEET_OPTIONS.find(function (entry) {
          return entry.path === path;
        });
        const baseId = name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

        discoveredSheets.push({
          id: existing?.id || baseId,
          label: existing?.label || prettifyCharacterSheetLabel(name),
          path,
          columns: existing?.columns || 4,
          rows: existing?.rows || 4,
        });
      }
    } catch {
      return JSON.parse(JSON.stringify(fallbackContent.characterSheets));
    }

    return {
      sheets: discoveredSheets.length ? discoveredSheets : JSON.parse(JSON.stringify(fallbackContent.characterSheets.sheets)),
    };
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
    const arenas = await tryReadJsonFromHandle(rootHandle, ["data", "arenas.json"]) || JSON.parse(JSON.stringify(fallbackContent.arenas));
    const trainers = await readJsonFromHandle(rootHandle, ["data", "trainers.json"]);
    const discoveredCharacterSheets = await loadCharacterSheetsFromDirectory(rootHandle);
    const characterSheetsData = await tryReadJsonFromHandle(rootHandle, ["data", "character-sheets.json"]);
    const characterSheets = {
      sheets: discoveredCharacterSheets.sheets.map(function (discovered) {
        const saved = (characterSheetsData?.sheets || []).find(function (entry) {
          return entry.id === discovered.id || entry.path === discovered.path;
        }) || {};
        return Object.assign({}, discovered, saved, {
          id: saved.id || discovered.id,
          label: saved.label || discovered.label,
          playerLabel: saved.playerLabel || discovered.playerLabel || discovered.label,
          playerSelectable: saved.playerSelectable ?? discovered.playerSelectable ?? true,
          path: discovered.path,
        });
      }),
    };

    const maps = await loadAuthoredMapsFromAssets(rootHandle);
    const mapMetadata = {};
    for (const mapId of Object.keys(maps)) {
      mapMetadata[mapId] = await tryReadJsonFromHandle(rootHandle, ["data", "map-metadata", mapId + ".meta.json"]) || {};
    }

    return normalizeContent({ settings, themes, items, skills, monsters, towns, arenas, trainers, characterSheets, maps, mapMetadata }, "directory");
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
      const uniqueCaught = Array.from(new Set(save.registry?.caught || []));
      const earnedCrests = Array.from(new Set(save.arenaProgress?.earnedCrests || []));
      return {
        slotId: save.slotId,
        saveName: save.saveName,
        updatedAt: save.updatedAt,
        playerName: save.player?.name || "Player",
        avatarId: save.player?.avatarId || "",
        currentMapId: save.world?.currentMapId || "",
        money: save.player.money,
        caughtCount: uniqueCaught.length,
        crestCount: earnedCrests.length,
        party: (save.party || []).map(function (monster) {
          return {
            speciesId: monster.speciesId,
            variantId: monster.variantId || "default",
            level: Number(monster.level || 1),
          };
        }),
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

  function formatMonsterVariantLabel(variantId) {
    const raw = String(variantId || "default").trim() || "default";
    return raw
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function buildEncounterPreviewEntry(content, speciesId, variantId) {
    const species = getSpecies(content, speciesId);
    if (!species) {
      return null;
    }

    const resolvedVariant = getSpeciesVariant(species, variantId);
    return {
      speciesId: species.id,
      variantId: resolvedVariant?.id || "default",
      species,
      variant: resolvedVariant,
    };
  }

  function dedupeEncounterPreviewEntries(entries) {
    const seen = new Set();

    return entries.filter(function (entry) {
      if (!entry?.speciesId) {
        return false;
      }

      const key = entry.speciesId + "::" + (entry.variantId || "default");
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  function buildRegistryEntries(content) {
    const mapMetadata = content.mapMetadata || {};

    return (content.monsters?.species || []).map(function (species) {
      const speciesLocations = new Set();
      const variantLocationMap = new Map();

      (species.variants || []).forEach(function (variant) {
        variantLocationMap.set(variant.id || "default", new Set());
      });

      Object.keys(mapMetadata).forEach(function (mapId) {
        const mapMeta = mapMetadata[mapId];
        const mapName = mapMeta?.displayName || mapId;

        (mapMeta?.spawnZones || []).forEach(function (zone) {
          (zone.visibleSpawns || []).forEach(function (spawn) {
            const options = ensureSpawnOptions(spawn, content).length
              ? ensureSpawnOptions(spawn, content)
              : [{ speciesId: spawn.speciesId, variantId: spawn.variantId || "default" }];

            options.forEach(function (option) {
              if (option.speciesId !== species.id) {
                return;
              }

              const resolvedVariant = getSpeciesVariant(species, option.variantId || "default");
              const variantKey = resolvedVariant?.id || "default";
              speciesLocations.add(mapName);
              if (!variantLocationMap.has(variantKey)) {
                variantLocationMap.set(variantKey, new Set());
              }
              variantLocationMap.get(variantKey).add(mapName);
            });
          });
        });
      });

      return {
        species,
        locations: Array.from(speciesLocations),
        variants: (species.variants || []).map(function (variant) {
          return {
            variant,
            locations: Array.from(variantLocationMap.get(variant.id || "default") || []),
          };
        }),
      };
    });
  }

  function getAvailableEncounterPreviewEntries(state, content) {
    const mapMeta = content.mapMetadata[state.world.currentMapId];
    const entries = [];

    (mapMeta?.spawnZones || []).forEach(function (zone) {
      (zone.visibleSpawns || []).forEach(function (spawn) {
        const options = Array.isArray(spawn.monsterOptions) && spawn.monsterOptions.length
          ? spawn.monsterOptions
          : [{ speciesId: spawn.speciesId, variantId: spawn.variantId || "" }];

        options.forEach(function (option) {
          const entry = buildEncounterPreviewEntry(content, option.speciesId || spawn.speciesId, option.variantId || spawn.variantId || "");
          if (entry) {
            entries.push(entry);
          }
        });
      });

      (zone.spawnTable || []).forEach(function (option) {
        const entry = buildEncounterPreviewEntry(content, option.speciesId, option.variantId || "");
        if (entry) {
          entries.push(entry);
        }
      });
    });

    return dedupeEncounterPreviewEntries(entries);
  }

  function getCurrentEncounterPreviewEntries(state, content) {
    const entries = state.world.wildMonsters.filter(function (monster) {
      return monster.active;
    }).map(function (monster) {
      return buildEncounterPreviewEntry(content, monster.speciesId, monster.variantId || "");
    });

    return dedupeEncounterPreviewEntries(entries);
  }

  function getEncounterPreviewEntries(state, content) {
    if (!state.settings.encounterPreview) {
      return [];
    }

    if (state.settings.encounterPreviewMode === "available-current") {
      const availableEntries = getAvailableEncounterPreviewEntries(state, content);
      const currentKeys = new Set(getCurrentEncounterPreviewEntries(state, content).map(function (entry) {
        return entry.speciesId + "::" + entry.variantId;
      }));

      return availableEntries.map(function (entry) {
        return Object.assign({}, entry, {
          isCurrent: currentKeys.has(entry.speciesId + "::" + entry.variantId),
        });
      });
    }

    if (state.settings.encounterPreviewMode === "current") {
      return getCurrentEncounterPreviewEntries(state, content).map(function (entry) {
        return Object.assign({}, entry, { isCurrent: true });
      });
    }

    return getAvailableEncounterPreviewEntries(state, content).map(function (entry) {
      return Object.assign({}, entry, { isCurrent: false });
    });
  }

  function renderEncounterPreviewIcons(state, content) {
    const entries = getEncounterPreviewEntries(state, content);
    if (!entries.length) {
      return "";
    }

    return (
      '<div class="encounter-preview-strip">' +
      entries.map(function (entry) {
        const sprite = entry.variant?.sprite || "";
        const variantLabel = entry.variant?.id || "Default";
        const normalizedVariantLabel = String(variantLabel).trim() || "Default";
        const label = entry.species.name + " - " + normalizedVariantLabel;
        const nowBadge = entry.isCurrent
          ? '<span class="encounter-preview-badge">Now</span>'
          : "";
        const previewVisual = sprite
          ? '<img class="encounter-preview-icon" src="' + escapeHtml(sprite) + '" alt="' + escapeHtml(label) + '" title="' + escapeHtml(label) + '" />'
          : '<span class="encounter-preview-fallback" title="' + escapeHtml(label) + '">' + escapeHtml(entry.species.name.slice(0, 1)) + "</span>";

        return (
          '<div class="encounter-preview-card" title="' + escapeHtml(label) + '">' +
          '<div class="encounter-preview-visual">' + previewVisual + nowBadge + "</div>" +
          '<span class="encounter-preview-label">' + escapeHtml(label) + "</span>" +
          "</div>"
        );
      }).join("") +
      "</div>"
    );
  }

  function getWorldUiSignature(state, content) {
    const activeInteraction = getActiveInteraction(state, content);
    const encounterPreviewKey = getEncounterPreviewEntries(state, content).map(function (entry) {
      return entry.speciesId + "::" + entry.variantId + "::" + (entry.isCurrent === false ? "inactive" : "active");
    }).join("|");

    return [
      state.world.currentMapId,
      Math.round(state.world.position.x),
      Math.round(state.world.position.y),
      state.player.money,
      state.message,
      state.settings.encounterPreview ? "preview-on" : "preview-off",
      state.settings.encounterPreviewMode || "available",
      activeInteraction?.id || "",
      encounterPreviewKey,
    ].join("~");
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

  function getTownEntryForCurrentMap(content, mapId) {
    return content.towns.towns.find(function (entry) {
      return entry.mapId === mapId;
    }) || null;
  }

  function ensureArenaCatalog(content) {
    if (!content.arenas || !Array.isArray(content.arenas.arenas)) {
      content.arenas = JSON.parse(JSON.stringify(fallbackContent.arenas));
    }

    return content.arenas.arenas;
  }

  function createEmptyArena(index) {
    return {
      id: "arena-" + index,
      name: "New Arena",
      leaderName: "Leader Name",
      leaderTitle: "Leader",
      crestId: "crest-" + index,
      crestName: "New Crest",
      recommendedLevel: 5,
      partySize: 1,
      rewardMoney: 50,
      rewardText: "",
      description: "",
      mapId: "",
      team: [],
      pool: [],
    };
  }

  function createEmptyArenaTeamMember(content, arena) {
    const species = content.monsters?.species?.[0];
    const variant = species?.variants?.[0];
    return {
      speciesId: species?.id || "",
      variantId: variant?.id || "default",
      level: Math.max(1, Number(arena?.recommendedLevel || 5)),
    };
  }

  function createEmptyArenaPoolMember(content) {
    const species = content.monsters?.species?.[0];
    const variant = species?.variants?.[0];
    return {
      speciesId: species?.id || "",
      variantId: variant?.id || "default",
    };
  }

  function ensureArenaPools(content) {
    ensureArenaCatalog(content).forEach(function (arena) {
      if (!Array.isArray(arena.team)) {
        arena.team = [];
      }
      if (!Array.isArray(arena.pool)) {
        arena.pool = [];
      }
    });
  }

  function normalizeArenaLeaderLevelRange(settings) {
    const min = Math.max(1, Number(settings?.arenaLeaderMinLevel || 1));
    const max = Math.max(1, Number(settings?.arenaLeaderMaxLevel || 100));
    return min <= max ? { min, max } : { min: max, max: min };
  }

  function rollArenaLeaderLevel(settings, fallbackLevel) {
    const range = normalizeArenaLeaderLevelRange(settings);
    if (range.min === range.max) {
      return range.min;
    }

    return range.min + Math.floor(Math.random() * (range.max - range.min + 1));
  }

  function buildArenaBattleRoster(state, content, arena) {
    ensureArenaPools(content);
    const authoredTeam = (arena?.team || []).map(function (member) {
      return Object.assign({}, member);
    }).filter(function (member) {
      return Boolean(getSpecies(content, member.speciesId));
    });
    const fallbackPool = (arena?.pool || []).map(function (member) {
      return Object.assign({}, member);
    }).filter(function (member) {
      return Boolean(getSpecies(content, member.speciesId));
    });
    const requestedSize = Math.max(1, Number(state.settings?.arenaLeaderPartySize || authoredTeam.length || 1));
    const roster = authoredTeam.slice(0, requestedSize);

    while (roster.length < requestedSize && fallbackPool.length) {
      const picked = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
      roster.push({
        speciesId: picked.speciesId,
        variantId: picked.variantId || "default",
        level: rollArenaLeaderLevel(state.settings, arena?.recommendedLevel || 5),
      });
    }

    return roster.map(function (member) {
      const nextMember = Object.assign({}, member);
      nextMember.level = rollArenaLeaderLevel(state.settings, member.level || arena?.recommendedLevel || 5);
      return nextMember;
    });
  }

  function syncArenaDevSelection(content, devToolsState) {
    const arenas = ensureArenaCatalog(content);
    if (!arenas.find(function (entry) { return entry.id === devToolsState.selectedArenaId; })) {
      devToolsState.selectedArenaId = arenas[0]?.id || "";
    }
  }

  function getArena(content, arenaId) {
    return ensureArenaCatalog(content).find(function (arena) {
      return arena.id === arenaId;
    }) || null;
  }

  function ensureArenaProgress(state) {
    if (!state.arenaProgress) {
      state.arenaProgress = {
        clearedArenaIds: [],
        earnedCrests: [],
      };
    }

    if (!Array.isArray(state.arenaProgress.clearedArenaIds)) {
      state.arenaProgress.clearedArenaIds = [];
    }

    if (!Array.isArray(state.arenaProgress.earnedCrests)) {
      state.arenaProgress.earnedCrests = [];
    }

    return state.arenaProgress;
  }

  function buildArenaViewModel(state, content, interaction) {
    const arenaId = interaction.data?.arenaId || "";
    const arena = arenaId ? getArena(content, arenaId) : null;
    const crestId = arena?.crestId || interaction.data?.crestId || "";
    const progress = ensureArenaProgress(state);
    const isCleared = (arenaId && progress.clearedArenaIds.includes(arenaId)) || (crestId && progress.earnedCrests.includes(crestId));

    return {
      arenaId,
      arena,
      crestId,
      isCleared,
      title: arena?.name || interaction.label || interaction.id || "Arena",
      leaderName: arena?.leaderName || "Arena Leader",
      leaderTitle: arena?.leaderTitle || "Leader",
      crestName: arena?.crestName || crestId || "Unassigned Crest",
      recommendedLevel: arena?.recommendedLevel ?? "TBD",
      leaderPartySize: arena?.partySize ?? "TBD",
      rewardText: arena?.rewardText || "Defeat the arena leader to earn this crest once trainer battles are connected.",
      introText: interaction.text || arena?.description || "This arena is ready for leader metadata and crest progression.",
      arenaStatus: isCleared
        ? "Crest earned"
        : "Arena framework ready. Trainer battle integration will connect here next.",
    };
  }

  function buildArenaInteractionState(state, content, interaction) {
    const view = buildArenaViewModel(state, content, interaction);
    state.message = view.isCleared
      ? "You checked back in at " + view.title + "."
      : "You reviewed the challenge at " + view.title + ".";

    state.interaction = {
      id: interaction.id,
      type: interaction.type,
      title: view.title,
      arena: view,
    };
  }

  function performHealingCenterService(state, content, interaction) {
    state.party.forEach(function (monster) {
      monster.currentHp = monster.stats.hp;
    });

    const currentTown = getTownEntryForCurrentMap(content, state.world.currentMapId);
    if (currentTown) {
      state.player.lastTownId = currentTown.id;
      state.world.lastTownId = currentTown.id;
    }

    const label = interaction.label || interaction.id || "Healing Center";
    state.message = "Your party was healed at " + label + ".";
    state.interaction = {
      id: interaction.id,
      type: interaction.type,
      title: label,
      phase: "complete",
      text: interaction.data?.completeText || interaction.text || "Your party was fully restored.",
      confirmText: "",
      actionLabel: "Close",
    };
  }

  function openInteraction(state, content, interaction) {
    const label = interaction.label || interaction.id || "Interaction";
    let text = interaction.text || "";

    if (interaction.type === "healing-center") {
      state.interaction = {
        id: interaction.id,
        type: interaction.type,
        title: label,
        phase: "confirm",
        text: interaction.data?.introText || "Welcome to " + label + ".",
        confirmText: interaction.data?.confirmText || "Would you like to rest your party and set this town as your return point?",
        actionLabel: "Restore Party",
      };
      return;
    } else if (interaction.type === "arena") {
      buildArenaInteractionState(state, content, interaction);
      return;
    } else if (interaction.type === "shop") {
      text = text || "The shop interface is not built yet, but this is where it will open.";
      state.message = "Visited " + label + ".";
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
    const avatarOptions = getPlayerAvatarOptions(content);
    return {
      screen: "new-game",
      starterSpeciesId: content.monsters.species[0].id,
      townId: starterTowns[0].id,
      avatarId: avatarOptions[0]?.id || "",
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
      playerVisual: {
        facing: "down",
        isMoving: false,
        frameIndex: 0,
        frameTime: 0,
      },
    };

    world.wildMonsters = createWildMonstersForMap(content, world.currentMapId, world.position);
    const initialCameraTarget = {
      screen: "world",
      settings: Object.assign({}, content.settings.defaults),
      world,
    };
    world.camera = getCamera(initialCameraTarget, content);

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
      arenaProgress: {
        clearedArenaIds: [],
        earnedCrests: [],
      },
      battle: null,
      interaction: null,
      message: content.mapMetadata[starterTown.mapId]?.safezone
        ? "Welcome to " + starterTown.name + ". Leave town through a transition to find wild monsters."
        : "Welcome to " + starterTown.name + ". Walk into a visible wild monster to start a battle.",
    };
  }

  function hydrateStateFromSave(save, content) {
    const avatarOptions = getPlayerAvatarOptions(content);
    const fallbackAvatarId = avatarOptions[0]?.id || "";
    const state = {
      screen: "world",
      currentSaveSlotId: save.slotId,
      currentSaveName: save.saveName,
      settings: Object.assign({}, content.settings.defaults, save.settings),
      player: Object.assign({ avatarId: fallbackAvatarId }, save.player || {}),
      world: Object.assign({}, save.world),
      party: save.party,
      bank: save.bank || [],
      registry: save.registry || { seen: [], caught: [] },
      inventory: save.inventory || [],
      ui: {
        activePanel: "",
      },
      arenaProgress: save.arenaProgress || {
        clearedArenaIds: [],
        earnedCrests: [],
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

    ensurePlayerVisualState(state);
    ensureWorldCameraState(state, content);
    ensureArenaProgress(state);

    return state;
  }

  function serializeState(state) {
    const world = Object.assign({}, state.world);
    delete world.camera;
    delete world.playerVisual;

    return {
      slotId: state.currentSaveSlotId || "slot-1",
      saveName: state.currentSaveName || "Pastel Trails Adventure",
      updatedAt: new Date().toISOString(),
      player: state.player,
      world,
      settings: state.settings,
      arenaProgress: ensureArenaProgress(state),
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

  function ensurePlayerVisualState(state) {
    if (!state.world) {
      return {
        facing: "down",
        isMoving: false,
        frameIndex: 0,
        frameTime: 0,
      };
    }

    if (!state.world.playerVisual) {
      state.world.playerVisual = {
        facing: "down",
        isMoving: false,
        frameIndex: 0,
        frameTime: 0,
      };
    }

    if (!["down", "left", "right", "up"].includes(state.world.playerVisual.facing)) {
      state.world.playerVisual.facing = "down";
    }

    if (typeof state.world.playerVisual.isMoving !== "boolean") {
      state.world.playerVisual.isMoving = false;
    }

    if (typeof state.world.playerVisual.frameIndex !== "number") {
      state.world.playerVisual.frameIndex = 0;
    }

    if (typeof state.world.playerVisual.frameTime !== "number") {
      state.world.playerVisual.frameTime = 0;
    }

    return state.world.playerVisual;
  }

  function updatePlayerVisualState(state, deltaMs, dx, dy, moved) {
    const visual = ensurePlayerVisualState(state);

    if (dx < 0) {
      visual.facing = "left";
    } else if (dx > 0) {
      visual.facing = "right";
    } else if (dy < 0) {
      visual.facing = "up";
    } else if (dy > 0) {
      visual.facing = "down";
    }

    visual.isMoving = Boolean(moved);

    if (!visual.isMoving) {
      visual.frameIndex = 0;
      visual.frameTime = 0;
      return visual;
    }

    visual.frameTime += deltaMs;
    while (visual.frameTime >= PLAYER_WALK_FRAME_MS) {
      visual.frameTime -= PLAYER_WALK_FRAME_MS;
      visual.frameIndex = (visual.frameIndex + 1) % PLAYER_SPRITE_COLUMNS;
    }

    return visual;
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
    const mapLabel = content.mapMetadata[state.world.currentMapId]?.displayName || state.world.currentMapId;
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
      log: ["A wild " + species.name + " approached in " + mapLabel + "."],
      menu: "root",
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

  function createBattleEnemyFromArenaTeamMember(content, member) {
    const species = getSpecies(content, member.speciesId);
    if (!species) {
      return null;
    }

    const level = Math.max(1, Number(member.level || 1));
    const variant = getSpeciesVariant(species, member.variantId || "");
    return {
      speciesId: species.id,
      variantId: variant?.id || "default",
      name: species.name,
      level,
      stats: Object.assign({}, species.baseStats),
      currentHp: species.baseStats.hp,
      maxHp: species.baseStats.hp,
    };
  }

  function startArenaBattle(state, content, arena, interaction) {
    const roster = buildArenaBattleRoster(state, content, arena);
    const team = roster.map(function (member) {
      return createBattleEnemyFromArenaTeamMember(content, member);
    }).filter(Boolean);

    if (!team.length) {
      state.message = "This arena does not have a leader team configured yet.";
      return;
    }

    state.interaction = null;
    state.battle = {
      type: "trainer",
      opponentName: arena.leaderName || "Arena Leader",
      opponentTitle: arena.leaderTitle || "Leader",
      arenaId: arena.id,
      crestId: arena.crestId || interaction.data?.crestId || "",
      crestName: arena.crestName || "Arena Crest",
      rewardMoney: Number(arena.rewardMoney || 0),
      rewardText: arena.rewardText || "",
      enemyQueue: team,
      enemyIndex: 0,
      enemy: team[0],
      playerIndex: 0,
      log: [(arena.leaderTitle || "Leader") + " " + (arena.leaderName || "Arena Leader") + " challenges you to a battle."],
      menu: "root",
      outcome: null,
    };
    state.message = "Arena battle started at " + (arena.name || interaction.label || "the arena") + ".";
  }

  function rewardArenaVictory(state, battle) {
    const progress = ensureArenaProgress(state);
    const activeMonster = state.party[0];
    activeMonster.xp += 10;
    state.player.money += Number(battle.rewardMoney || 0);

    if (battle.arenaId && !progress.clearedArenaIds.includes(battle.arenaId)) {
      progress.clearedArenaIds.push(battle.arenaId);
    }

    if (battle.crestId && !progress.earnedCrests.includes(battle.crestId)) {
      progress.earnedCrests.push(battle.crestId);
    }
  }

  function returnToTown(state, content) {
    const town = content.towns.towns.find(function (entry) {
      return entry.id === state.player.lastTownId;
    }) || content.towns.towns[0];

    state.world.currentMapId = town.mapId;
    state.world.position = { x: town.spawn.x, y: town.spawn.y };
    syncCameraToPlayer(state, content);
  }

  function resolveBattleAttack(state, content) {
    if (!state.battle || state.battle.outcome) {
      return;
    }

    const playerMonster = state.party[state.battle.playerIndex];
    let skipEnemyTurn = false;
    const playerFirst = playerMonster.stats.speed >= state.battle.enemy.stats.speed;
    const steps = playerFirst ? ["player", "enemy"] : ["enemy", "player"];

    steps.forEach(function (step) {
      if (state.battle.outcome || (step === "enemy" && skipEnemyTurn)) {
        return;
      }

      const enemy = state.battle.enemy;
      const enemySpecies = getSpecies(content, enemy.speciesId);
      const enemyInstance = {
        stats: enemy.stats,
        currentHp: enemy.currentHp,
      };

      if (step === "player") {
        const damage = calculateDamage(playerMonster, enemyInstance);
        enemy.currentHp = Math.max(0, enemy.currentHp - damage);
        state.battle.log.unshift(getSpecies(content, playerMonster.speciesId).name + " dealt " + damage + " damage.");

        if (enemy.currentHp <= 0) {
          state.battle.log.unshift(enemySpecies.name + " fainted.");
          skipEnemyTurn = true;

          if (state.battle.type === "trainer") {
            const nextEnemyIndex = Number(state.battle.enemyIndex || 0) + 1;
            const nextEnemy = state.battle.enemyQueue?.[nextEnemyIndex];
            if (nextEnemy) {
              state.battle.enemyIndex = nextEnemyIndex;
              state.battle.enemy = nextEnemy;
              state.battle.log.unshift((state.battle.opponentTitle || "Leader") + " " + (state.battle.opponentName || "Trainer") + " sent out " + nextEnemy.name + ".");
            } else {
              state.battle.outcome = "victory";
              rewardArenaVictory(state, state.battle);
              const rewardParts = [];
              if (state.battle.crestName) {
                rewardParts.push("the " + state.battle.crestName);
              }
              if (Number(state.battle.rewardMoney || 0) > 0) {
                rewardParts.push("$" + Number(state.battle.rewardMoney || 0));
              }
              state.message = rewardParts.length
                ? "Victory. You earned " + rewardParts.join(" and ") + "."
                : "Victory. You cleared the arena challenge.";
            }
          } else {
            state.battle.outcome = "victory";
            markWildMonsterDefeated(state, enemy.wildMonsterId);
            grantVictoryRewards(state);
            state.message = "Victory. Your party earned 5 XP and $12.";
          }
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

  function useBattleSkill(state, content, skillId) {
    if (!state.battle || state.battle.outcome) {
      return;
    }

    const skill = ensureSkillCatalog(content).find(function (entry) {
      return entry.id === skillId;
    });

    if (skill) {
      const activeMonster = state.party[state.battle.playerIndex];
      const species = getSpecies(content, activeMonster.speciesId);
      state.battle.log.unshift((species?.name || "Your monster") + " used " + skill.name + ".");
    }

    resolveBattleAttack(state, content);
  }

  function resolveCatch(state, content) {
    if (!state.battle || state.battle.outcome || state.battle.type === "trainer") {
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

  function resolveBefriend(state, content) {
    if (!state.battle || state.battle.outcome || state.battle.type === "trainer") {
      return;
    }

    const enemy = state.battle.enemy;
    const species = getSpecies(content, enemy.speciesId);
    const item = state.inventory.find(function (entry) {
      return entry.itemId === "basic-orb" && entry.quantity > 0;
    });

    if (!item) {
      state.battle.log.unshift("You have no Basic Orbs left to support a befriending attempt.");
      return;
    }

    item.quantity -= 1;
    const hpRatio = enemy.currentHp / enemy.maxHp;
    const befriendChance = Math.max(0.25, 0.95 - hpRatio * 0.7);

    if (Math.random() <= befriendChance) {
      const befriended = createMonsterInstance(species, enemy.level);
      befriended.variantId = enemy.variantId || befriended.variantId;
      state.registry.seen = Array.from(new Set(state.registry.seen.concat(species.id)));
      state.registry.caught = Array.from(new Set(state.registry.caught.concat(species.id)));

      if (state.party.length < state.settings.partySize) {
        state.party.push(befriended);
        state.message = species.name + " joined your party as a new friend.";
      } else {
        state.bank.push(befriended);
        state.message = species.name + " was sent to the bank because your party is full.";
      }

      markWildMonsterDefeated(state, enemy.wildMonsterId);
      state.battle.outcome = "caught";
      state.battle.log.unshift("Success. You befriended " + species.name + ".");
      return;
    }

    state.battle.log.unshift(species.name + " was not ready to befriend you yet.");
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
    if (!state.battle || state.battle.outcome || state.battle.type === "trainer") {
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
    syncCameraToPlayer(state, content);

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
      updatePlayerVisualState(state, deltaMs, 0, 0, false);
      return;
    }

    let dx = 0;
    let dy = 0;

    if (keysDown.has("ArrowUp") || keysDown.has("w")) dy -= 1;
    if (keysDown.has("ArrowDown") || keysDown.has("s")) dy += 1;
    if (keysDown.has("ArrowLeft") || keysDown.has("a")) dx -= 1;
    if (keysDown.has("ArrowRight") || keysDown.has("d")) dx += 1;

    if (!dx && !dy) {
      updatePlayerVisualState(state, deltaMs, 0, 0, false);
      return;
    }

    const length = Math.hypot(dx, dy) || 1;
    const speed = 260;
    const map = content.maps[state.world.currentMapId];
    const previousX = state.world.position.x;
    const previousY = state.world.position.y;
    const nextX = state.world.position.x + (dx / length) * speed * (deltaMs / 1000);
    const nextY = state.world.position.y + (dy / length) * speed * (deltaMs / 1000);
    const resolved = tryMoveAlongAxis(map, state.world.position.x, state.world.position.y, nextX, nextY);

    state.world.position.x = resolved.x;
    state.world.position.y = resolved.y;
    clampPlayerToMap(state, content);
    updatePlayerVisualState(
      state,
      deltaMs,
      dx,
      dy,
      Math.abs(state.world.position.x - previousX) > 0.01 || Math.abs(state.world.position.y - previousY) > 0.01
    );

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

  function ensureWorldCameraState(state, content) {
    if (!state.world.camera || typeof state.world.camera.x !== "number" || typeof state.world.camera.y !== "number") {
      const target = getCamera(state, content);
      state.world.camera = {
        x: target.x,
        y: target.y,
      };
    }

    return state.world.camera;
  }

  function syncCameraToPlayer(state, content) {
    const target = getCamera(state, content);
    state.world.camera = {
      x: target.x,
      y: target.y,
    };
    return state.world.camera;
  }

  function updateCamera(state, content, deltaMs) {
    if (state.screen !== "world") {
      return;
    }

    const target = getCamera(state, content);
    const camera = ensureWorldCameraState(state, content);
    const followRate = 1 - Math.pow(1 - 0.08, deltaMs / (1000 / 60));

    camera.x += (target.x - camera.x) * followRate;
    camera.y += (target.y - camera.y) * followRate;

    if (Math.abs(target.x - camera.x) < 0.01) {
      camera.x = target.x;
    }

    if (Math.abs(target.y - camera.y) < 0.01) {
      camera.y = target.y;
    }
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

  const WORLD_LAYER_CHUNK_HEIGHT = 2048;

  function getCachedWorldLayerChunks(map, phase) {
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
      return cached;
    }

    const columns = Math.floor(image.naturalWidth / tileSize);
    const renderLayers = (map.layers || []).filter(function (layer) {
      return !/^collision\b/i.test(layer.name || "") &&
        (phase === "foreground" ? isFrontOfPlayerLayer(layer.name) : !isFrontOfPlayerLayer(layer.name));
    });

    const chunks = [];
    const chunkCount = Math.max(1, Math.ceil(worldHeight / WORLD_LAYER_CHUNK_HEIGHT));

    for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex += 1) {
      const chunkY = chunkIndex * WORLD_LAYER_CHUNK_HEIGHT;
      const chunkHeight = Math.min(WORLD_LAYER_CHUNK_HEIGHT, worldHeight - chunkY);
      const chunkCanvas = createScratchCanvas(worldWidth, chunkHeight);
      const chunkCtx = chunkCanvas.getContext("2d");
      chunkCtx.imageSmoothingEnabled = false;
      chunks.push({
        canvas: chunkCanvas,
        ctx: chunkCtx,
        y: chunkY,
        height: chunkHeight,
      });
    }

    renderLayers.forEach(function (layer) {
      layer.positions.forEach(function (tile) {
        const worldX = tile.x * tileSize;
        const worldY = tile.y * tileSize;
        const sx = (tile.id % columns) * tileSize;
        const sy = Math.floor(tile.id / columns) * tileSize;
        const chunkIndex = Math.max(0, Math.min(chunks.length - 1, Math.floor(worldY / WORLD_LAYER_CHUNK_HEIGHT)));
        const chunk = chunks[chunkIndex];
        chunk.ctx.drawImage(image, sx, sy, tileSize, tileSize, worldX, worldY - chunk.y, tileSize, tileSize);
      });
    });

    map[cacheKey] = {
      chunks: chunks.map(function (chunk) {
        return {
          canvas: chunk.canvas,
          y: chunk.y,
          height: chunk.height,
        };
      }),
      width: worldWidth,
      height: worldHeight,
      imageWidth: image.naturalWidth,
      imageHeight: image.naturalHeight,
    };

    return map[cacheKey];
  }

  function drawMap(ctx, map, camera, phase) {
    const zoomScale = Math.max(0.1, Number(ACTIVE_APP?.state?.settings?.zoom || 100) / 100);
    const useSmoothSampling = Math.abs(zoomScale - 1) > 0.001;
    ctx.imageSmoothingEnabled = useSmoothSampling;
    if (useSmoothSampling) {
      ctx.imageSmoothingQuality = "high";
    }

    if (phase === "base") {
      ctx.fillStyle = "#9fd6da";
      ctx.fillRect(0, 0, VIEWPORT.width, VIEWPORT.height);
    }

    const layerCache = getCachedWorldLayerChunks(map, phase);
    const worldWidth = map.mapWidth * map.tileSize;
    const worldHeight = map.mapHeight * map.tileSize;
    const visibleWorldWidth = Math.min(worldWidth, VIEWPORT.width / zoomScale);
    const visibleWorldHeight = Math.min(worldHeight, VIEWPORT.height / zoomScale);
    const sourceX = Math.max(0, Math.min(worldWidth - visibleWorldWidth, camera.x));
    const sourceY = Math.max(0, Math.min(worldHeight - visibleWorldHeight, camera.y));

    if (layerCache?.chunks?.length) {
      layerCache.chunks.forEach(function (chunk) {
        const chunkTop = chunk.y;
        const chunkBottom = chunk.y + chunk.height;
        const sourceBottom = sourceY + visibleWorldHeight;

        if (chunkBottom <= sourceY || chunkTop >= sourceBottom) {
          return;
        }

        const overlapTop = Math.max(sourceY, chunkTop);
        const overlapBottom = Math.min(sourceBottom, chunkBottom);
        const overlapHeight = overlapBottom - overlapTop;

        if (overlapHeight <= 0) {
          return;
        }

        const chunkSourceY = overlapTop - chunkTop;
        const destY = ((overlapTop - sourceY) / visibleWorldHeight) * VIEWPORT.height;
        const destHeight = (overlapHeight / visibleWorldHeight) * VIEWPORT.height;

        ctx.drawImage(
          chunk.canvas,
          sourceX,
          chunkSourceY,
          visibleWorldWidth,
          overlapHeight,
          0,
          destY,
          VIEWPORT.width,
          destHeight
        );
      });
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
    const useSmoothSampling = Math.abs(zoomScale - 1) > 0.001;
    const screenX = Math.round((monster.x - camera.x) * zoomScale);
    const screenY = Math.round((monster.y - camera.y) * zoomScale);
    const map = content.maps[ACTIVE_APP?.state?.world?.currentMapId || ""];
    const spriteSize = (map?.tileSize || 128) * zoomScale;
    const drawX = Math.round(screenX - spriteSize / 2);
    const drawY = Math.round(screenY - spriteSize / 2);
    const label = "Lv " + Number(monster.level || 1) + " " + (species?.name || monster.speciesId) + " (" + formatMonsterVariantLabel(variant?.id || monster.variantId || "default") + ")";

    const drawWildMonsterLabel = function () {
      ctx.save();
      const fontSize = Math.max(13, Math.round(15 * zoomScale));
      ctx.font = "600 " + fontSize + "px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const paddingX = 10;
      const paddingY = 6;
      const textWidth = ctx.measureText(label).width;
      const pillWidth = textWidth + paddingX * 2;
      const pillHeight = fontSize + paddingY * 2;
      const pillX = Math.round(screenX - pillWidth / 2);
      const pillY = Math.round(drawY - pillHeight - 8);
      ctx.fillStyle = "rgba(23, 31, 40, 0.88)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 10);
      } else {
        ctx.rect(pillX, pillY, pillWidth, pillHeight);
      }
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, screenX, pillY + pillHeight / 2 + 0.5);
      ctx.restore();
    };

    if (spritePath) {
      const image = getImage(spritePath);
      if (image.complete && image.naturalWidth) {
        ctx.save();
        ctx.imageSmoothingEnabled = useSmoothSampling;
        if (useSmoothSampling) {
          ctx.imageSmoothingQuality = "high";
        }
        ctx.drawImage(image, drawX, drawY, spriteSize, spriteSize);
        ctx.restore();
        drawWildMonsterLabel();
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
    drawWildMonsterLabel();
  }

  function drawPlayerSprite(ctx, state, content, camera) {
    const activeAvatarId = state.player?.avatarId || ACTIVE_APP?.devTools?.selectedCharacterSheetId || CHARACTER_SHEET_OPTIONS[0]?.id || "";
    const persistedSheet = getCharacterSheetConfig(content, activeAvatarId);
    const runtimeCharacterConfig = ACTIVE_APP?.state?.screen === "dev-tools" && ACTIVE_APP?.devTools?.section === "characters"
      ? ACTIVE_APP.devTools
      : {
          selectedCharacterSheetId: persistedSheet?.id || CHARACTER_SHEET_OPTIONS[0]?.id || "",
          characterSheetColumns: persistedSheet?.columns || PLAYER_SPRITE_COLUMNS,
          characterSheetRows: persistedSheet?.rows || PLAYER_SPRITE_ROWS,
          characterSheetOffsetX: persistedSheet?.offsetX || 0,
          characterSheetOffsetY: persistedSheet?.offsetY || 0,
          characterSheetRowOffsets: JSON.parse(JSON.stringify(persistedSheet?.rowOffsets || Array.from({ length: PLAYER_SPRITE_ROWS }, function () {
            return { x: 0, y: 0 };
          }))),
          characterSheetFrameOffsets: JSON.parse(JSON.stringify(persistedSheet?.frameOffsets || Array.from({ length: PLAYER_SPRITE_ROWS }, function () {
            return Array.from({ length: PLAYER_SPRITE_COLUMNS }, function () {
              return { x: 0, y: 0, width: 0, height: 0 };
            });
          }))),
        };
    ensureCharacterDevSelection(runtimeCharacterConfig, content);
    const selectedSheet = getSelectedCharacterSheet(runtimeCharacterConfig, content);
    const image = getImage(selectedSheet?.path || PLAYER_SPRITE_SHEET);
    const map = content.maps[state.world.currentMapId];
    const zoomScale = Math.max(0.1, Number(state.settings.zoom || 100) / 100);
    const playerX = (state.world.position.x - camera.x) * zoomScale;
    const playerY = (state.world.position.y - camera.y) * zoomScale;
    const spriteSize = (map?.tileSize || 128) * zoomScale;
    const drawX = Math.round(playerX - spriteSize / 2);
    const drawY = Math.round(playerY - spriteSize / 2);
    const visual = ensurePlayerVisualState(state);
    const rowByFacing = {
      down: 0,
      left: 1,
      right: 2,
      up: 3,
    };

    if (image.complete && image.naturalWidth) {
      const rowIndex = rowByFacing[visual.facing] ?? 0;
      const frameIndex = Math.max(0, Math.min((runtimeCharacterConfig.characterSheetColumns || PLAYER_SPRITE_COLUMNS) - 1, visual.frameIndex || 0));
      const sourceRect = getCharacterFrameSourceRect(runtimeCharacterConfig, image, rowIndex, frameIndex);
      const useSmoothSampling = Math.abs(zoomScale - 1) > 0.001;

      ctx.save();
      ctx.imageSmoothingEnabled = useSmoothSampling;
      if (useSmoothSampling) {
        ctx.imageSmoothingQuality = "high";
      }
      ctx.drawImage(
        image,
        sourceRect.sx,
        sourceRect.sy,
        sourceRect.sw,
        sourceRect.sh,
        drawX,
        drawY,
        spriteSize,
        spriteSize
      );
      ctx.restore();
      return;
    }

    ctx.beginPath();
    ctx.fillStyle = "#1b4f75";
    ctx.arc(playerX, playerY, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.arc(playerX, playerY, PLAYER_RADIUS + 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawWorld(canvas, state, content, devToolsState) {
    const ctx = canvas.getContext("2d");
    const map = content.maps[state.world.currentMapId];
    const camera = ensureWorldCameraState(state, content);

    drawMap(ctx, map, camera, "base");
    drawTransitionOverlay(ctx, state, content, camera, devToolsState);

    state.world.wildMonsters.forEach(function (monster) {
      if (!monster.active) {
        return;
      }

      drawWildMonsterSprite(ctx, monster, content, camera);
    });

    drawPlayerSprite(ctx, state, content, camera);

    drawMap(ctx, map, camera, "foreground");
  }

  function formatTimeUntil(timestamp) {
    if (!timestamp) {
      return "Active";
    }

    const remaining = Math.max(0, Math.ceil((timestamp - Date.now()) / 1000));
    return remaining + "s";
  }

  function getInventoryQuantity(state, itemId) {
    return Number(state.inventory.find(function (entry) {
      return entry.itemId === itemId;
    })?.quantity || 0);
  }

  function renderBattleMonsterHud(content, monster, options) {
    const species = getSpecies(content, monster.speciesId);
    const variant = getSpeciesVariant(species, monster.variantId || "default");
    const variantLabel = formatMonsterVariantLabel(variant?.id || monster.variantId || "default");
    const sprite = variant?.sprite || "";
    const maxHp = Number(options.maxHp || monster.maxHp || monster.stats?.hp || 1);
    const currentHp = Number(options.currentHp || monster.currentHp || 0);
    const hpPercent = Math.max(0, Math.min(100, (currentHp / Math.max(1, maxHp)) * 100));
    const visual = sprite
      ? '<img class="battle-hud-sprite" src="' + escapeHtml(sprite) + '" alt="' + escapeHtml((species?.name || monster.speciesId) + " " + variantLabel) + '" />'
      : '<div class="battle-hud-fallback">' + escapeHtml((species?.name || monster.speciesId || "?").slice(0, 1)) + "</div>";
    const badgeSideClass = options.badgeSide === "right"
      ? " battle-hud-level-badge-right"
      : " battle-hud-level-badge-left";

    return [
      '<article class="battle-hud">',
      '<div class="battle-hud-icon">' + visual + '<span class="battle-hud-level-badge' + badgeSideClass + '">Lv ' + Number(monster.level || 1) + "</span></div>",
      '<div class="battle-hud-body">',
      '<h3 class="battle-hud-name">' + escapeHtml(species?.name || monster.speciesId) + " (" + escapeHtml(variantLabel) + ")" + "</h3>",
      '<div class="battle-hp-bar battle-hp-bar-hud"><span style="width:' + hpPercent + '%"></span></div>',
      '<div class="battle-hp-row"><span>' + currentHp + "/" + maxHp + ' HP</span></div>',
      "</div>",
      "</article>",
    ].join("");
  }

  function renderBattlePartySlot(content, monster, options) {
    if (!monster) {
      return '<div class="battle-party-slot battle-party-slot-empty"></div>';
    }

    const species = getSpecies(content, monster.speciesId);
    const variant = getSpeciesVariant(species, monster.variantId || "default");
    const sprite = variant?.sprite || "";
    const maxHp = Number(options.maxHp || monster.maxHp || monster.stats?.hp || 1);
    const currentHp = Number(options.currentHp || monster.currentHp || 0);
    const hpPercent = Math.max(0, Math.min(100, (currentHp / Math.max(1, maxHp)) * 100));
    const activeClass = options.active ? " battle-party-slot-active" : "";
    const visual = sprite
      ? '<img class="battle-party-slot-sprite" src="' + escapeHtml(sprite) + '" alt="' + escapeHtml(species?.name || monster.speciesId) + '" />'
      : '<div class="battle-party-slot-fallback">' + escapeHtml((species?.name || monster.speciesId || "?").slice(0, 1)) + "</div>";

    return [
      '<div class="battle-party-slot' + activeClass + '">',
      '<div class="battle-party-slot-top battle-party-slot-top-' + escapeHtml(options.side || "left") + '">',
      '<div class="battle-party-slot-visual">' + visual + '<span class="battle-party-slot-level-badge">Lv ' + Number(monster.level || 1) + '</span></div>',
      '</div>',
      '<div class="battle-party-slot-meta">',
      '<strong>' + escapeHtml(species?.name || monster.speciesId) + '</strong>',
      '</div>',
      '<div class="battle-hp-bar battle-party-slot-hp"><span style="width:' + hpPercent + '%"></span></div>',
      '</div>',
    ].join("");
  }

  function renderBattleBattler(content, monster, className) {
    const species = getSpecies(content, monster.speciesId);
    const variant = getSpeciesVariant(species, monster.variantId || "default");
    const sprite = variant?.sprite || "";
    const visual = sprite
      ? '<img class="battle-battler-sprite" src="' + escapeHtml(sprite) + '" alt="' + escapeHtml(species?.name || monster.speciesId) + '" />'
      : '<div class="battle-battler-fallback">' + escapeHtml((species?.name || monster.speciesId || "?").slice(0, 1)) + "</div>";

    return [
      '<div class="battle-battler ' + className + '">',
      '<div class="battle-battler-shadow"></div>',
      visual,
      '</div>',
    ].join("");
  }

  function renderTitleScreen(root, content, saveSlots, selectedSlotId, onAction, notice) {
    const effectiveSelectedSlotId = selectedSlotId || saveSlots[0]?.slotId || "";
    const totalAvailableMonsters = content.monsters?.species?.length || 0;
    const totalAvailableCrests = new Set(ensureArenaCatalog(content).map(function (arena) {
      return arena.crestId;
    }).filter(Boolean)).size;
    const loadButton = saveSlots.length
      ? '<button class="primary-button" type="button" data-action="continue">Continue Selected</button>'
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
            const selected = slot.slotId === effectiveSelectedSlotId ? " save-list-selected" : "";
            const locationName = content.mapMetadata?.[slot.currentMapId]?.displayName || slot.currentMapId || "Unknown";
            const avatarSheet = getCharacterSheetConfig(content, slot.avatarId || "");
            const avatarMarkup = renderAvatarPreviewMarkup(avatarSheet, "save-avatar-sprite");
            const partyMarkup = (slot.party || []).map(function (monster) {
              const species = getSpecies(content, monster.speciesId);
              const variant = getSpeciesVariant(species, monster.variantId || "default");
              const label = (species?.name || monster.speciesId || "Unknown") + " (" + formatMonsterVariantLabel(variant?.id || monster.variantId || "default") + ")";
              const sprite = variant?.sprite || "";
              const visual = sprite
                ? '<img class="save-party-icon" src="' + escapeHtml(sprite) + '" alt="' + escapeHtml(label) + '" />'
                : '<span class="save-party-fallback">' + escapeHtml((species?.name || "?").slice(0, 1)) + "</span>";

              return '<div class="save-party-member">' +
                visual +
                '<span class="save-party-label">Lv ' + Number(monster.level || 1) + "</span>" +
                '<span class="save-party-label">' + escapeHtml(species?.name || monster.speciesId || "Unknown") + "</span>" +
                '<span class="save-party-label">' + escapeHtml(formatMonsterVariantLabel(variant?.id || monster.variantId || "default")) + "</span>" +
                "</div>";
            }).join("");
            return '<li class="' + selected.trim() + '">' +
              '<button class="link-button save-slot-button" type="button" data-action="select-save-slot" data-slot-id="' + escapeHtml(slot.slotId) + '">' +
              avatarMarkup +
              '<div class="save-slot-content">' +
              '<strong>' + escapeHtml((slot.playerName || "Player") + " - " + locationName) + '</strong>' +
              '<span>$' + Number(slot.money || 0) + " · " + Number(slot.caughtCount || 0) + " / " + totalAvailableMonsters + " caught · " + Number(slot.crestCount || 0) + " / " + totalAvailableCrests + " crests</span>" +
              (partyMarkup ? '<div class="save-party-strip">' + partyMarkup + "</div>" : "") +
              "</div>" +
              "</button>" +
              '<button class="secondary-button" type="button" data-action="load-save-slot" data-slot-id="' + escapeHtml(slot.slotId) + '">Load</button>' +
              "</li>";
          }).join("") + "</ul>"
        : "<p>No saves yet. Start a new game to create one.</p>"),
      "</section>",
      "</section>",
      "</main>",
    ].join("");

    drawAvatarPreviewCanvases(root, content);

    root.querySelector('[data-action="new-game"]')?.addEventListener("click", function () {
      onAction("new-game");
    });
    root.querySelector('[data-action="continue"]')?.addEventListener("click", function () {
      onAction("continue");
    });
    root.querySelectorAll('[data-action="select-save-slot"]').forEach(function (button) {
      button.addEventListener("click", function () {
        onAction("select-save-slot", button.getAttribute("data-slot-id"));
      });
    });
    root.querySelectorAll('[data-action="load-save-slot"]').forEach(function (button) {
      button.addEventListener("click", function () {
        onAction("load-save-slot", button.getAttribute("data-slot-id"));
      });
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

    const avatars = getPlayerAvatarOptions(content);

    const avatarCards = avatars.map(function (avatar) {
      const selected = setup.avatarId === avatar.id ? " avatar-card-selected" : "";
      const visual = renderAvatarPreviewMarkup(avatar);
      return (
        '<button class="avatar-card' + selected + '" type="button" data-select-avatar="' + avatar.id + '">' +
        visual +
        "<strong>" + escapeHtml(avatar.playerLabel || avatar.label || avatar.id) + "</strong>" +
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

    drawAvatarPreviewCanvases(root, content);

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
    const enemy = state.battle.enemy;
    const isTrainerBattle = state.battle.type === "trainer";
    const enemySpecies = getSpecies(content, enemy.speciesId);
    const fightType = isTrainerBattle ? (state.battle.opponentTitle || "Arena Leader") : "Wild";
    const locationLabel = content.mapMetadata[state.world.currentMapId]?.displayName || state.world.currentMapId;
    const tonicCount = getInventoryQuantity(state, "small-tonic");
    const orbCount = getInventoryQuantity(state, "basic-orb");
    const hasBench = state.party.length > 1;
    const enemyRoster = isTrainerBattle && Array.isArray(state.battle.enemyQueue) && state.battle.enemyQueue.length
      ? state.battle.enemyQueue
      : [enemy];
    const enemyActiveIndex = isTrainerBattle ? Number(state.battle.enemyIndex || 0) : 0;
    const activeSkills = (activeMonster.skills || []).map(function (skillId) {
      return ensureSkillCatalog(content).find(function (entry) {
        return entry.id === skillId;
      });
    }).filter(Boolean);
    const enemyPartySlots = enemyRoster.map(function (monster, index) {
      return renderBattlePartySlot(content, monster, {
        active: index === enemyActiveIndex,
        currentHp: monster.currentHp,
        maxHp: monster.maxHp || monster.stats?.hp,
        side: "left",
      });
    }).join("");
    const playerPartySlots = state.party.map(function (monster, index) {
      return renderBattlePartySlot(content, monster, {
        active: index === state.battle.playerIndex,
        currentHp: monster.currentHp,
        maxHp: monster.stats?.hp,
        side: "right",
      });
    }).join("");
    const partyRoster = state.party.map(function (monster, index) {
      const species = getSpecies(content, monster.speciesId);
      const variant = getSpeciesVariant(species, monster.variantId || "default");
      const disabled = index === state.battle.playerIndex || monster.currentHp <= 0 || state.battle.outcome;
      return [
        '<button class="battle-party-chip' + (index === state.battle.playerIndex ? " battle-party-chip-active" : "") + '" type="button" data-battle-swap-to="' + index + '"' + (disabled ? " disabled" : "") + '>',
        '<strong>' + escapeHtml(species?.name || monster.speciesId) + "</strong>",
        '<span>Lv ' + Number(monster.level || 1) + " · " + escapeHtml(formatMonsterVariantLabel(variant?.id || monster.variantId || "default")) + "</span>",
        '<span>HP ' + Number(monster.currentHp || 0) + "/" + Number(monster.stats?.hp || 0) + "</span>",
        "</button>",
      ].join("");
    }).join("");

    const outcomeButton = state.battle.outcome
      ? '<button class="primary-button" type="button" data-battle-action="close-battle">Return</button>'
      : "";
    const menu = state.battle.menu || "root";
    const isRootMenu = !state.battle.outcome && menu === "root";
    let commandCopy = "Choose Fight, Switch, Item, Befriend, or Run.";
    let actionPanel = "";
    let rootActionPanel = "";

    if (state.battle.outcome) {
      actionPanel = '<div class="battle-action-grid battle-action-grid-single">' + outcomeButton + "</div>";
    } else if (menu === "fight") {
      commandCopy = "Choose a skill to use.";
      actionPanel = '<div class="battle-action-grid">' +
        activeSkills.map(function (skill) {
          return '<button type="button" class="battle-action-card" data-battle-skill="' + escapeHtml(skill.id) + '"><strong>' + escapeHtml(skill.name) + '</strong><span>' + escapeHtml(skill.kind || "skill") + " · Power " + Number(skill.power || 0) + "</span></button>";
        }).join("") +
        '<button type="button" class="battle-action-card battle-action-card-secondary" data-battle-action="back-menu"><strong>Back</strong><span>Return to commands</span></button>' +
      "</div>";
    } else if (menu === "switch") {
      commandCopy = "Choose a party monster to switch into battle.";
      actionPanel = '<div class="battle-action-grid battle-action-grid-single">' +
        partyRoster +
        '<button type="button" class="battle-action-card battle-action-card-secondary" data-battle-action="back-menu"><strong>Back</strong><span>Return to commands</span></button>' +
      "</div>";
    } else if (menu === "item") {
      commandCopy = "Choose an item to use.";
      actionPanel = '<div class="battle-action-grid">' +
        '<button type="button" class="battle-action-card" data-battle-action="use-tonic"' + (tonicCount <= 0 ? " disabled" : "") + '><strong>Small Tonic</strong><span>x' + tonicCount + " · Recover 20 HP</span></button>" +
        '<button type="button" class="battle-action-card battle-action-card-secondary" data-battle-action="back-menu"><strong>Back</strong><span>Return to commands</span></button>' +
      "</div>";
    } else {
      actionPanel = '<div class="battle-action-grid battle-action-grid-single"><div class="battle-suboption-placeholder">Choose a command to continue.</div></div>';
    }

    if (!state.battle.outcome) {
      rootActionPanel = '<div class="battle-action-grid battle-action-grid-root">' +
        '<button type="button" class="battle-action-card battle-action-card-root' + (menu === "fight" ? " battle-action-card-selected" : "") + '" data-battle-action="open-fight-menu"><strong>Fight</strong><span>Skills</span></button>' +
        '<button type="button" class="battle-action-card battle-action-card-root' + (menu === "switch" ? " battle-action-card-selected" : "") + '" data-battle-action="open-switch-menu"' + (!hasBench ? " disabled" : "") + '><strong>Switch</strong><span>Party</span></button>' +
        '<button type="button" class="battle-action-card battle-action-card-root' + (menu === "item" ? " battle-action-card-selected" : "") + '" data-battle-action="open-item-menu"><strong>Item</strong><span>Support</span></button>' +
        '<button type="button" class="battle-action-card battle-action-card-root' + (menu === "befriend" ? " battle-action-card-selected" : "") + '" data-battle-action="befriend"' + (isTrainerBattle || orbCount <= 0 ? " disabled" : "") + '><strong>Befriend</strong><span>Attempt</span></button>' +
        '<button type="button" class="battle-action-card battle-action-card-root' + (menu === "run" ? " battle-action-card-selected" : "") + '" data-battle-action="run"' + (isTrainerBattle ? " disabled" : "") + '><strong>Run</strong><span>Leave</span></button>' +
      "</div>";
    }

    return [
      '<div class="battle-overlay">',
      '<section class="battle-modal">',
      '<section class="battle-topbar">',
      renderBattleMonsterHud(content, enemy, {
        currentHp: enemy.currentHp,
        maxHp: enemy.maxHp,
        badgeSide: "left",
      }) +
      '<div class="battle-fight-pill"><strong>' + escapeHtml(fightType) + '</strong><span>' + escapeHtml(locationLabel) + '</span></div>' +
      renderBattleMonsterHud(content, activeMonster, {
        currentHp: activeMonster.currentHp,
        maxHp: activeMonster.stats.hp,
        badgeSide: "right",
      }) +
      '</section>',
      '<section class="battle-stage">' +
        '<aside class="battle-party-rail battle-party-rail-opponent">' + enemyPartySlots + '</aside>' +
        '<div class="battle-field">' +
          renderBattleBattler(content, enemy, "battle-battler-enemy") +
          renderBattleBattler(content, activeMonster, "battle-battler-player") +
        '</div>' +
        '<aside class="battle-party-rail battle-party-rail-player">' + playerPartySlots + '</aside>' +
      '</section>',
      '<section class="battle-command-shell">' +
        '<div class="battle-log battle-log-command"><p>' + escapeHtml(commandCopy) + '</p>' + state.battle.log.slice(0, 4).map(function (entry) {
          return "<p>" + entry + "</p>";
        }).join("") + "</div>" +
        '<div class="battle-command-panel' + (isRootMenu ? " battle-command-panel-root" : "") + '">' +
          rootActionPanel +
          '<div class="battle-suboptions-shell">' + actionPanel + '</div>' +
        '</div>' +
      "</section>",
      "</section>",
      "</div>",
    ].join("");
  }

  function renderInteractionModal(state) {
    if (!state.interaction) {
      return "";
    }

    if (state.interaction.type === "healing-center") {
      const confirmBody = state.interaction.phase === "confirm"
        ? '<div class="battle-log"><p>' + escapeHtml(state.interaction.text) + '</p><p>' + escapeHtml(state.interaction.confirmText || "") + "</p></div>"
        : '<div class="battle-log"><p>' + escapeHtml(state.interaction.text) + "</p></div>";
      const confirmActions = state.interaction.phase === "confirm"
        ? '<div class="battle-actions"><button class="primary-button" type="button" data-action="confirm-healing-center">Restore Party</button><button class="secondary-button" type="button" data-action="close-interaction">Not Now</button></div>'
        : '<div class="battle-actions"><button class="primary-button" type="button" data-action="close-interaction">Close</button></div>';

      return [
        '<div class="battle-overlay">',
        '<section class="battle-modal">',
        '<div class="battle-headings">',
        '<div><span class="eyebrow">Healing Center</span><h2>' + escapeHtml(state.interaction.title) + "</h2><p>Restore your party</p></div>",
        "</div>",
        confirmBody,
        confirmActions,
        "</section>",
        "</div>",
      ].join("");
    }

    if (state.interaction.type === "arena") {
      const arena = state.interaction.arena || {
        leaderName: "Arena Leader",
        leaderTitle: "Leader",
        crestName: "Unassigned Crest",
        recommendedLevel: "TBD",
        leaderPartySize: "TBD",
        rewardText: "Trainer battle rewards will be configured here.",
        introText: "Arena framework ready.",
        arenaStatus: "Arena framework ready.",
      };
      const hasTeam = Array.isArray(arena.arena?.team) && arena.arena.team.length > 0;
      const actionRow = arena.isCleared
        ? '<div class="battle-actions"><button class="primary-button" type="button" data-action="close-interaction">Close</button></div>'
        : hasTeam
          ? '<div class="battle-actions"><button class="primary-button" type="button" data-action="start-arena-battle">Start Arena Battle</button><button class="secondary-button" type="button" data-action="close-interaction">Not Now</button></div>'
          : '<div class="battle-actions"><button class="primary-button" type="button" data-action="close-interaction">Close</button></div>';

      return [
        '<div class="battle-overlay">',
        '<section class="battle-modal world-panel-modal">',
        '<div class="battle-headings">',
        '<div><span class="eyebrow">Arena</span><h2>' + escapeHtml(state.interaction.title) + "</h2><p>" + escapeHtml(arena.leaderTitle + " " + arena.leaderName) + "</p></div>",
        "</div>",
        '<div class="world-panel-body">' +
          '<div class="battle-log"><p>' + escapeHtml(arena.introText) + '</p><p>' + escapeHtml(arena.arenaStatus) + "</p></div>" +
          '<div class="panel-block">' +
            "<p><strong>Leader:</strong> " + escapeHtml(arena.leaderName) + "</p>" +
            "<p><strong>Title:</strong> " + escapeHtml(arena.leaderTitle) + "</p>" +
            "<p><strong>Crest Reward:</strong> " + escapeHtml(arena.crestName) + "</p>" +
            "<p><strong>Recommended Level:</strong> " + escapeHtml(String(arena.recommendedLevel)) + "</p>" +
            "<p><strong>Leader Party Size:</strong> " + escapeHtml(String(arena.leaderPartySize)) + "</p>" +
            "<p><strong>Configured Team:</strong> " + escapeHtml(String(arena.arena?.team?.length || 0)) + "</p>" +
            "<p><strong>Reward Notes:</strong> " + escapeHtml(arena.rewardText) + "</p>" +
          "</div>" +
        "</div>" +
        actionRow,
        "</section>",
        "</div>",
      ].join("");
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
      const arenaProgress = ensureArenaProgress(state);
      const currentAvatar = getCharacterSheetConfig(content, state.player.avatarId || "");
      panelBody = [
        "<p>Name: <strong>" + escapeHtml(state.player.name) + "</strong></p>",
        "<p>Avatar: " + escapeHtml(currentAvatar?.playerLabel || currentAvatar?.label || state.player.avatarId || "Unknown") + "</p>",
        "<p>Money: $" + state.player.money + "</p>",
        "<p>Experience: " + Number(state.player.experience || 0) + "</p>",
        "<p>Last Town: " + escapeHtml(state.player.lastTownId || "Unknown") + "</p>",
        "<p>Crests Earned: " + arenaProgress.earnedCrests.length + "</p>",
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
      const earnedCrests = ensureArenaProgress(state).earnedCrests.map(function (crestId) {
        const arena = ensureArenaCatalog(content).find(function (entry) {
          return entry.crestId === crestId;
        });
        const label = arena?.crestName || crestId;
        return "<li><span>" + escapeHtml(label) + "</span><strong>Crest</strong></li>";
      }).join("");
      const registryEntries = buildRegistryEntries(content).map(function (entry) {
        const isCaught = state.registry.caught.includes(entry.species.id);
        const stats = entry.species.baseStats || {};
        const locationText = entry.locations.length ? entry.locations.join(", ") : "No spawn locations assigned yet";
        const variantMarkup = entry.variants.map(function (variantEntry) {
          const variantLabel = formatMonsterVariantLabel(variantEntry.variant.id || "default");
          const variantLocationText = variantEntry.locations.length ? variantEntry.locations.join(", ") : "No available spawn locations assigned yet";
          const spriteMarkup = variantEntry.variant.sprite
            ? '<img class="registry-variant-sprite" src="' + escapeHtml(variantEntry.variant.sprite) + '" alt="' + escapeHtml(entry.species.name + " " + variantLabel) + '" />'
            : '<span class="registry-variant-fallback">' + escapeHtml(entry.species.name.slice(0, 1)) + "</span>";

          return [
            '<li class="registry-variant-row">',
            '<div class="registry-variant-identity">' + spriteMarkup + '<div><strong>' + escapeHtml(variantLabel) + '</strong><span>' + escapeHtml(variantLocationText) + "</span></div></div>",
            "</li>",
          ].join("");
        }).join("");

        return [
          '<article class="registry-card">',
          '<div class="registry-card-header"><div><h3>' + escapeHtml(entry.species.name) + '</h3><p>' + escapeHtml(entry.species.id) + '</p></div><span class="registry-status ' + (isCaught ? "registry-status-caught" : "registry-status-missing") + '">' + (isCaught ? "Caught" : "Not Caught") + "</span></div>",
          '<p class="registry-spawn-line"><strong>Available Spawn Locations:</strong> ' + escapeHtml(locationText) + "</p>",
          '<p class="registry-stats">HP ' + Number(stats.hp || 0) + " · ATK " + Number(stats.attack || 0) + " · DEF " + Number(stats.defense || 0) + " · SPD " + Number(stats.speed || 0) + "</p>",
          '<div class="registry-variants"><h4>Variants</h4><ul class="compact-list">' + variantMarkup + "</ul></div>",
          "</article>",
        ].join("");
      }).join("");
      panelBody = [
        "<p>Total monsters: " + (content.monsters?.species?.length || 0) + "</p>",
        "<p>Caught: " + state.registry.caught.length + "</p>",
        '<div class="registry-section-scroll"><div class="registry-grid">' + (registryEntries || "<p>No monsters configured yet.</p>") + "</div></div>",
        "<h3>Crests</h3>",
        '<ul class="compact-list">' + (earnedCrests || "<li><span>No crests earned yet.</span></li>") + "</ul>",
      ].join("");
    } else if (panel === "quests") {
      panelBody = "<p>Quest tracking is still planned work. This panel is ready for that system when you want it.</p>";
    } else if (panel === "settings") {
      const avatarOptions = getPlayerAvatarOptions(content).map(function (sheet) {
        const selected = state.player.avatarId === sheet.id ? " selected" : "";
        return '<option value="' + escapeHtml(sheet.id) + '"' + selected + '>' + escapeHtml(sheet.playerLabel || sheet.label || sheet.id) + "</option>";
      }).join("");
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
        '<label class="input-group"><span>Sprite Avatar</span><select data-world-player-field="avatarId">' + avatarOptions + "</select></label>",
        '<label class="input-group"><span>Map Zoom</span><select data-world-setting="zoom">' + zoomOptions + "</select></label>",
        '<label class="input-group"><span>Party Size</span><input type="number" min="1" max="12" data-world-setting="partySize" value="' + Number(state.settings.partySize) + '" /></label>',
        '<label class="input-group"><span>Arena Leader Min Level</span><input type="number" min="1" max="999" data-world-setting="arenaLeaderMinLevel" value="' + Number(state.settings.arenaLeaderMinLevel || 1) + '" /></label>',
        '<label class="input-group"><span>Arena Leader Max Level</span><input type="number" min="1" max="999" data-world-setting="arenaLeaderMaxLevel" value="' + Number(state.settings.arenaLeaderMaxLevel || 100) + '" /></label>',
        '<label class="input-group"><span>Arena Leader Party Size</span><input type="number" min="1" max="12" data-world-setting="arenaLeaderPartySize" value="' + Number(state.settings.arenaLeaderPartySize || 6) + '" /></label>',
        '<label class="input-group"><span>Share Experience</span><select data-world-setting="shareExperience"><option value="true"' + (state.settings.shareExperience ? " selected" : "") + '>Yes</option><option value="false"' + (!state.settings.shareExperience ? " selected" : "") + '>No</option></select></label>',
        '<label class="input-group"><span>Show Map Details</span><select data-world-setting="mapDetails"><option value="true"' + (state.settings.mapDetails ? " selected" : "") + '>Yes</option><option value="false"' + (!state.settings.mapDetails ? " selected" : "") + '>No</option></select></label>',
        '<label class="input-group"><span>Encounter Preview</span><select data-world-setting="encounterPreview"><option value="true"' + (state.settings.encounterPreview ? " selected" : "") + '>Yes</option><option value="false"' + (!state.settings.encounterPreview ? " selected" : "") + '>No</option></select></label>',
        '<label class="input-group"><span>Encounter Preview Mode</span><select data-world-setting="encounterPreviewMode"><option value="available"' + (state.settings.encounterPreviewMode === "available" || !state.settings.encounterPreviewMode ? " selected" : "") + '>Show Available</option><option value="current"' + (state.settings.encounterPreviewMode === "current" ? " selected" : "") + '>Show Current Encounters</option><option value="available-current"' + (state.settings.encounterPreviewMode === "available-current" ? " selected" : "") + '>Show Available And Current</option></select></label>',
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
    const arenaOptions = ['<option value="">Unlinked</option>'].concat(
      ensureArenaCatalog(content).map(function (arena) {
        const selected = selectedInteraction?.data?.arenaId === arena.id ? " selected" : "";
        return '<option value="' + escapeHtml(arena.id) + '"' + selected + ">" + escapeHtml(arena.name || arena.id) + " · " + escapeHtml(arena.id) + "</option>";
      })
    ).join("");
    const linkedArena = selectedInteraction?.data?.arenaId
      ? getArena(content, selectedInteraction.data.arenaId)
      : null;
    const arenaLinkStatus = selectedInteraction?.type === "arena"
      ? (
          !selectedInteraction.data?.arenaId
            ? '<p class="dev-helper-text dev-helper-text-warning">This arena interaction is not linked yet. Pick an Arena ID from the Arenas tab.</p>'
            : linkedArena
              ? '<p class="dev-helper-text dev-helper-text-success">Linked to arena: <strong>' + escapeHtml(linkedArena.name || linkedArena.id) + "</strong>.</p>"
              : '<p class="dev-helper-text dev-helper-text-warning">Arena ID <strong>' + escapeHtml(selectedInteraction.data.arenaId) + "</strong> does not match any arena record yet.</p>"
        )
      : "";

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
          '<label class="input-group"><span>Linked Arena ID</span><select data-dev-interaction-field="data.arenaId">' + arenaOptions + '</select></label>',
          '<label class="input-group"><span>Crest ID</span><input data-dev-interaction-field="data.crestId" value="' + escapeHtml(selectedInteraction.data?.crestId || "") + '" /></label>',
          "</div>",
          arenaLinkStatus,
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
      "<p>Editing <strong>" + escapeHtml(mapMeta?.displayName || mapId) + "</strong>. Changes are in-memory until you export the metadata JSON. Click the map preview to place the selected item. For transitions and interactions, drag the right, bottom, or corner handles to resize. Target Spawn X/Y are where the player arrives on the target map.</p>",
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
    const drawResizeHandles = function (rect) {
      getResizeHandleRects(rect, { offsetX, offsetY, scale }).forEach(function (handle) {
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "rgba(30,35,42,0.85)";
        ctx.lineWidth = 2;
        ctx.fillRect(handle.x, handle.y, handle.width, handle.height);
        ctx.strokeRect(handle.x, handle.y, handle.width, handle.height);
      });
    };

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
        drawResizeHandles(transition);
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

      if (interaction.type === "arena") {
        const badgeX = x + width / 2;
        const badgeY = y + height / 2;
        const isLinked = Boolean(interaction.data?.arenaId && getArena(content, interaction.data.arenaId));
        ctx.beginPath();
        ctx.fillStyle = isLinked ? "rgba(185, 120, 0, 0.95)" : "rgba(220, 89, 64, 0.95)";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.arc(badgeX, badgeY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("A", badgeX, badgeY + 1);
        ctx.textAlign = "start";
        ctx.textBaseline = "alphabetic";
      }

      if (isSelected && (devToolsState.editorMode || "transitions") === "interactions") {
        drawResizeHandles(interaction);
      }
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

  function getResizeHandleRects(rect, metrics) {
    const x = metrics.offsetX + rect.x * metrics.scale;
    const y = metrics.offsetY + rect.y * metrics.scale;
    const width = rect.width * metrics.scale;
    const height = rect.height * metrics.scale;
    const handleSize = 18;

    return [
      { type: "right", x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2, width: handleSize, height: handleSize },
      { type: "bottom", x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2, width: handleSize, height: handleSize },
      { type: "corner", x: x + width - handleSize / 2, y: y + height - handleSize / 2, width: handleSize, height: handleSize },
    ];
  }

  function getRectResizeHandleHit(rect, point, metrics) {
    const handles = getResizeHandleRects(rect, metrics);

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
    pushSelector("data-dev-character-field");
    pushSelector("data-dev-arena-field");
    pushSelector("data-dev-arena-team-field");
    pushSelector("data-dev-arena-pool-field");

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

  function ensureCharacterDevSelection(devToolsState, content) {
    const availableSheets = getAvailableCharacterSheets(content);
    if (!availableSheets.find(function (entry) { return entry.id === devToolsState.selectedCharacterSheetId; })) {
      devToolsState.selectedCharacterSheetId = availableSheets[0]?.id || "";
    }

    const sheet = availableSheets.find(function (entry) {
      return entry.id === devToolsState.selectedCharacterSheetId;
    }) || availableSheets[0] || null;

    if (typeof devToolsState.characterSheetColumns !== "number" || devToolsState.characterSheetColumns < 1) {
      devToolsState.characterSheetColumns = sheet?.columns || 4;
    }
    if (typeof devToolsState.characterSheetRows !== "number" || devToolsState.characterSheetRows < 1) {
      devToolsState.characterSheetRows = sheet?.rows || 4;
    }
    if (typeof devToolsState.characterSheetOffsetX !== "number") {
      devToolsState.characterSheetOffsetX = 0;
    }
    if (typeof devToolsState.characterSheetOffsetY !== "number") {
      devToolsState.characterSheetOffsetY = 0;
    }
    if (typeof devToolsState.characterSheetSelectedRow !== "number" || devToolsState.characterSheetSelectedRow < 0) {
      devToolsState.characterSheetSelectedRow = 0;
    }
    if (typeof devToolsState.characterSheetPreviewScale !== "number" || devToolsState.characterSheetPreviewScale <= 0) {
      devToolsState.characterSheetPreviewScale = 1.5;
    }
    if (typeof devToolsState.characterSheetSelectedFrame !== "number" || devToolsState.characterSheetSelectedFrame < 0) {
      devToolsState.characterSheetSelectedFrame = 0;
    }
    if (typeof devToolsState.characterSheetPlayerLabel !== "string") {
      devToolsState.characterSheetPlayerLabel = sheet?.playerLabel || sheet?.label || "";
    }
    if (typeof devToolsState.characterSheetPlayerSelectable !== "boolean") {
      devToolsState.characterSheetPlayerSelectable = !!sheet?.playerSelectable;
    }
    if (typeof devToolsState.characterSheetCompareRow !== "number" || devToolsState.characterSheetCompareRow < 0) {
      devToolsState.characterSheetCompareRow = Math.min(1, Math.max(0, (sheet?.rows || devToolsState.characterSheetRows || 1) - 1));
    }
    if (!devToolsState.characterSheetAnimation) {
      devToolsState.characterSheetAnimation = {
        frameIndex: 0,
        frameTime: 0,
      };
    }
    if (!Array.isArray(devToolsState.characterSheetRowOffsets)) {
      devToolsState.characterSheetRowOffsets = [];
    }
    if (!Array.isArray(devToolsState.characterSheetFrameOffsets)) {
      devToolsState.characterSheetFrameOffsets = [];
    }

    while (devToolsState.characterSheetRowOffsets.length < devToolsState.characterSheetRows) {
      devToolsState.characterSheetRowOffsets.push({ x: 0, y: 0 });
    }
    devToolsState.characterSheetRowOffsets = devToolsState.characterSheetRowOffsets.slice(0, devToolsState.characterSheetRows).map(function (entry) {
      return {
        x: Number(entry?.x || 0),
        y: Number(entry?.y || 0),
      };
    });

    while (devToolsState.characterSheetFrameOffsets.length < devToolsState.characterSheetRows) {
      devToolsState.characterSheetFrameOffsets.push([]);
    }
    devToolsState.characterSheetFrameOffsets = devToolsState.characterSheetFrameOffsets.slice(0, devToolsState.characterSheetRows).map(function (row) {
      const normalizedRow = Array.isArray(row) ? row.slice(0, devToolsState.characterSheetColumns) : [];
      while (normalizedRow.length < devToolsState.characterSheetColumns) {
        normalizedRow.push({ x: 0, y: 0, width: 0, height: 0 });
      }
      return normalizedRow.map(function (entry) {
        return {
          x: Number(entry?.x || 0),
          y: Number(entry?.y || 0),
          width: Number(entry?.width || 0),
          height: Number(entry?.height || 0),
        };
      });
    });

    devToolsState.characterSheetSelectedRow = Math.max(0, Math.min(devToolsState.characterSheetRows - 1, devToolsState.characterSheetSelectedRow));
    devToolsState.characterSheetSelectedFrame = Math.max(0, Math.min(devToolsState.characterSheetColumns - 1, devToolsState.characterSheetSelectedFrame));
    devToolsState.characterSheetCompareRow = Math.max(0, Math.min(devToolsState.characterSheetRows - 1, devToolsState.characterSheetCompareRow));
    return sheet;
  }

  function ensureCharacterSheetCatalog(content) {
    if (!content.characterSheets || !Array.isArray(content.characterSheets.sheets)) {
      content.characterSheets = JSON.parse(JSON.stringify(fallbackContent.characterSheets));
    }

    return content.characterSheets.sheets;
  }

  function getAvailableCharacterSheets(content) {
    return (content && ensureCharacterSheetCatalog(content).length
      ? ensureCharacterSheetCatalog(content)
      : CHARACTER_SHEET_OPTIONS);
  }

  function getPlayerAvatarOptions(content) {
    const selectable = getAvailableCharacterSheets(content).filter(function (entry) {
      return entry.playerSelectable;
    });
    return selectable.length ? selectable : getAvailableCharacterSheets(content).slice(0, 1);
  }

  function renderAvatarPreviewMarkup(sheet, className) {
    if (!sheet?.path) {
      return '<span class="avatar-swatch"></span>';
    }

    return '<canvas class="' + escapeHtml(className || "avatar-preview-sprite") + '" data-avatar-preview-sheet="' + escapeHtml(sheet.id || "") + '"></canvas>';
  }

  function getCharacterSheetConfig(content, sheetId) {
    return getAvailableCharacterSheets(content).find(function (entry) {
      return entry.id === sheetId;
    }) || getAvailableCharacterSheets(content)[0] || null;
  }

  function applyCharacterSheetToDevTools(content, devToolsState, sheetId) {
    const config = getCharacterSheetConfig(content, sheetId) || CHARACTER_SHEET_OPTIONS[0] || null;
    devToolsState.selectedCharacterSheetId = config?.id || CHARACTER_SHEET_OPTIONS[0]?.id || "";
    devToolsState.characterSheetColumns = Math.max(1, Number(config?.columns || 4));
    devToolsState.characterSheetRows = Math.max(1, Number(config?.rows || 4));
    devToolsState.characterSheetOffsetX = Number(config?.offsetX || 0);
    devToolsState.characterSheetOffsetY = Number(config?.offsetY || 0);
    devToolsState.characterSheetPlayerLabel = config?.playerLabel || config?.label || "";
    devToolsState.characterSheetPlayerSelectable = !!config?.playerSelectable;
    devToolsState.characterSheetRowOffsets = JSON.parse(JSON.stringify(config?.rowOffsets || []));
    devToolsState.characterSheetFrameOffsets = JSON.parse(JSON.stringify(config?.frameOffsets || []));
    devToolsState.characterSheetSelectedRow = 0;
    devToolsState.characterSheetSelectedFrame = 0;
    devToolsState.characterSheetCompareRow = Math.min(1, Math.max(0, devToolsState.characterSheetRows - 1));
    if (!devToolsState.characterSheetAnimation) {
      devToolsState.characterSheetAnimation = { frameIndex: 0, frameTime: 0 };
    } else {
      devToolsState.characterSheetAnimation.frameIndex = 0;
      devToolsState.characterSheetAnimation.frameTime = 0;
    }
    ensureCharacterDevSelection(devToolsState, content);
  }

  function syncDevToolsCharacterSheet(content, devToolsState) {
    const sheet = getCharacterSheetConfig(content, devToolsState.selectedCharacterSheetId);
    if (!sheet) {
      return;
    }

    sheet.columns = Math.max(1, Number(devToolsState.characterSheetColumns || sheet.columns || 4));
    sheet.rows = Math.max(1, Number(devToolsState.characterSheetRows || sheet.rows || 4));
    sheet.offsetX = Number(devToolsState.characterSheetOffsetX || 0);
    sheet.offsetY = Number(devToolsState.characterSheetOffsetY || 0);
    sheet.playerLabel = String(devToolsState.characterSheetPlayerLabel || sheet.playerLabel || sheet.label || "");
    sheet.playerSelectable = !!devToolsState.characterSheetPlayerSelectable;
    sheet.rowOffsets = JSON.parse(JSON.stringify(devToolsState.characterSheetRowOffsets || []));
    sheet.frameOffsets = JSON.parse(JSON.stringify(devToolsState.characterSheetFrameOffsets || []));
  }

  function getCharacterRowOffset(characterConfig, rowIndex) {
    return characterConfig.characterSheetRowOffsets?.[rowIndex] || { x: 0, y: 0 };
  }

  function getCharacterFrameOffset(characterConfig, rowIndex, frameIndex) {
    return characterConfig.characterSheetFrameOffsets?.[rowIndex]?.[frameIndex] || { x: 0, y: 0, width: 0, height: 0 };
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
      '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "arenas" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-arenas">Arenas</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="' + (devToolsState.section === "characters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-characters">Characters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
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
        '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "secondary-button" : "primary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "arenas" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-arenas">Arenas</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="' + (devToolsState.section === "characters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-characters">Characters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
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

  function renderArenaDevToolsScreen(root, content, devToolsState) {
    const arenas = ensureArenaCatalog(content);
    syncArenaDevSelection(content, devToolsState);

    const selectedArena = arenas.find(function (entry) {
      return entry.id === devToolsState.selectedArenaId;
    }) || arenas[0] || null;

    const arenaItems = arenas.map(function (entry) {
      const selected = entry.id === devToolsState.selectedArenaId ? " compact-list-selected" : "";
      return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-arena="' + entry.id + '"><strong>' + escapeHtml(entry.name || entry.id) + '</strong><span>' + escapeHtml(entry.id) + ' · ' + escapeHtml(entry.leaderTitle || "Leader") + " " + escapeHtml(entry.leaderName || "TBD") + "</span></button></li>";
    }).join("");

    const linkedMapOptions = ['<option value="">Unlinked</option>'].concat(
      Object.keys(content.maps).map(function (mapId) {
        const selected = selectedArena?.mapId === mapId ? " selected" : "";
        const label = content.mapMetadata[mapId]?.displayName || mapId;
        return '<option value="' + escapeHtml(mapId) + '"' + selected + ">" + escapeHtml(label) + "</option>";
      })
    ).join("");
    const poolEditor = selectedArena
      ? (selectedArena.pool || []).map(function (member, poolIndex) {
          const memberSpecies = getSpecies(content, member.speciesId);
          const speciesOptions = content.monsters.species.map(function (species) {
            const selected = member.speciesId === species.id ? " selected" : "";
            return '<option value="' + escapeHtml(species.id) + '"' + selected + ">" + escapeHtml(species.name) + "</option>";
          }).join("");
          const variantOptions = (memberSpecies?.variants || []).map(function (variant) {
            const selected = (member.variantId || "default") === variant.id ? " selected" : "";
            return '<option value="' + escapeHtml(variant.id) + '"' + selected + ">" + escapeHtml(variant.id) + "</option>";
          }).join("");

          return [
            "<li>",
            '<div class="form-grid">',
            '<label class="input-group"><span>Species</span><select data-pool-index="' + poolIndex + '" data-dev-arena-pool-field="speciesId">' + speciesOptions + "</select></label>",
            '<label class="input-group"><span>Variant</span><select data-pool-index="' + poolIndex + '" data-dev-arena-pool-field="variantId">' + variantOptions + "</select></label>",
            '<div class="title-actions"><button class="secondary-button" type="button" data-action="delete-arena-pool-member" data-pool-index="' + poolIndex + '">Delete</button></div>',
            "</div>",
            "</li>",
          ].join("");
        }).join("")
      : "";
    const teamEditor = selectedArena
      ? (selectedArena.team || []).map(function (member, teamIndex) {
          const memberSpecies = getSpecies(content, member.speciesId);
          const speciesOptions = content.monsters.species.map(function (species) {
            const selected = member.speciesId === species.id ? " selected" : "";
            return '<option value="' + escapeHtml(species.id) + '"' + selected + ">" + escapeHtml(species.name) + "</option>";
          }).join("");
          const variantOptions = (memberSpecies?.variants || []).map(function (variant) {
            const selected = (member.variantId || "default") === variant.id ? " selected" : "";
            return '<option value="' + escapeHtml(variant.id) + '"' + selected + ">" + escapeHtml(variant.id) + "</option>";
          }).join("");

          return [
            "<li>",
            '<div class="form-grid">',
            '<label class="input-group"><span>Species</span><select data-team-index="' + teamIndex + '" data-dev-arena-team-field="speciesId">' + speciesOptions + "</select></label>",
            '<label class="input-group"><span>Variant</span><select data-team-index="' + teamIndex + '" data-dev-arena-team-field="variantId">' + variantOptions + "</select></label>",
            '<label class="input-group"><span>Level</span><input type="number" min="1" step="1" data-team-index="' + teamIndex + '" data-dev-arena-team-field="level" value="' + Number(member.level || 1) + '" /></label>',
            '<div class="title-actions"><button class="secondary-button" type="button" data-action="delete-arena-team-member" data-team-index="' + teamIndex + '">Delete</button></div>',
            "</div>",
            "</li>",
          ].join("");
        }).join("")
      : "";
    const teamPreview = selectedArena
      ? (selectedArena.team || []).map(function (member) {
          const species = getSpecies(content, member.speciesId);
          const variant = getSpeciesVariant(species, member.variantId || "default");
          return "<li><span>" + escapeHtml(species?.name || member.speciesId || "Unassigned") + " - " + escapeHtml(variant?.id || member.variantId || "default") + "</span><strong>Lv " + Number(member.level || 1) + "</strong></li>";
        }).join("")
      : "";

    const arenaEditor = selectedArena
      ? [
          '<section class="panel-block dev-editor-panel">',
          '<div class="section-heading"><h2>Arena Settings</h2><div class="topbar-stats"><button class="secondary-button" type="button" data-action="duplicate-arena">Duplicate</button><button class="secondary-button" type="button" data-action="delete-arena">Delete</button></div></div>',
          '<div class="form-grid">',
          '<label class="input-group"><span>Arena ID</span><input data-dev-arena-field="id" value="' + escapeHtml(selectedArena.id || "") + '" /></label>',
          '<label class="input-group"><span>Arena Name</span><input data-dev-arena-field="name" value="' + escapeHtml(selectedArena.name || "") + '" /></label>',
          '<label class="input-group"><span>Leader Name</span><input data-dev-arena-field="leaderName" value="' + escapeHtml(selectedArena.leaderName || "") + '" /></label>',
          '<label class="input-group"><span>Leader Title</span><input data-dev-arena-field="leaderTitle" value="' + escapeHtml(selectedArena.leaderTitle || "") + '" /></label>',
          '<label class="input-group"><span>Crest ID</span><input data-dev-arena-field="crestId" value="' + escapeHtml(selectedArena.crestId || "") + '" /></label>',
          '<label class="input-group"><span>Crest Name</span><input data-dev-arena-field="crestName" value="' + escapeHtml(selectedArena.crestName || "") + '" /></label>',
          '<label class="input-group"><span>Recommended Level</span><input type="number" step="1" min="1" data-dev-arena-field="recommendedLevel" value="' + Number(selectedArena.recommendedLevel || 1) + '" /></label>',
          '<label class="input-group"><span>Leader Party Size</span><input type="number" step="1" min="1" data-dev-arena-field="partySize" value="' + Number(selectedArena.partySize || 1) + '" /></label>',
          '<label class="input-group"><span>Reward Money</span><input type="number" step="1" min="0" data-dev-arena-field="rewardMoney" value="' + Number(selectedArena.rewardMoney || 0) + '" /></label>',
          '<label class="input-group"><span>Linked Map</span><select data-dev-arena-field="mapId">' + linkedMapOptions + '</select></label>',
          '<label class="input-group dev-input-group-wide"><span>Description</span><textarea rows="4" data-dev-arena-field="description">' + escapeHtml(selectedArena.description || "") + '</textarea></label>',
          '<label class="input-group dev-input-group-wide"><span>Reward Notes</span><textarea rows="4" data-dev-arena-field="rewardText">' + escapeHtml(selectedArena.rewardText || "") + '</textarea></label>',
          '</div>',
          '</section>',
          '<section class="panel-block dev-editor-panel"><div class="section-heading"><h2>Leader Team</h2><div class="topbar-stats"><button class="secondary-button" type="button" data-action="add-arena-team-member">Add Team Member</button></div></div>' +
            ((selectedArena.team || []).length
              ? '<ul class="compact-list">' + teamEditor + "</ul>"
              : '<p>Add at least one team member to make this arena battleable.</p>') +
          "</section>",
          '<section class="panel-block dev-editor-panel"><div class="section-heading"><h2>Fallback Pool</h2><div class="topbar-stats"><button class="secondary-button" type="button" data-action="add-arena-pool-member">Add Pool Monster</button></div></div><p class="dev-helper-text">When the player sets a larger arena leader party size than the authored team, extra slots are filled randomly from this pool.</p>' +
            ((selectedArena.pool || []).length
              ? '<ul class="compact-list">' + poolEditor + "</ul>"
              : '<p>No fallback pool monsters configured yet.</p>') +
          "</section>",
          '<section class="panel-block"><div class="section-heading"><h2>Preview</h2></div><p><strong>' + escapeHtml(selectedArena.name || selectedArena.id) + '</strong></p><p>' + escapeHtml((selectedArena.leaderTitle || "Leader") + " " + (selectedArena.leaderName || "TBD")) + '</p><p>Crest: ' + escapeHtml(selectedArena.crestName || selectedArena.crestId || "Unassigned") + '</p><p>Recommended Level: ' + escapeHtml(String(selectedArena.recommendedLevel || "TBD")) + ' · Party Size: ' + escapeHtml(String(selectedArena.partySize || "TBD")) + '</p><p>Reward Money: $' + escapeHtml(String(Number(selectedArena.rewardMoney || 0))) + '</p><p>' + escapeHtml(selectedArena.description || "No arena description yet.") + '</p><h3>Configured Team</h3><ul class="compact-list">' + (teamPreview || "<li><span>No team members configured yet.</span></li>") + "</ul><h3>Fallback Pool</h3><ul class=\"compact-list\">" + ((selectedArena.pool || []).map(function (member) { const species = getSpecies(content, member.speciesId); const variant = getSpeciesVariant(species, member.variantId || "default"); return "<li><span>" + escapeHtml(species?.name || member.speciesId || "Unassigned") + " - " + escapeHtml(variant?.id || member.variantId || "default") + "</span><strong>Pool</strong></li>"; }).join("") || "<li><span>No pool monsters configured yet.</span></li>") + "</ul></section>",
        ].join("")
      : '<section class="panel-block dev-editor-panel"><h2>No Arena Selected</h2><p>Add a new arena to begin editing.</p></section>';

    root.innerHTML = [
      '<main class="dev-screen">',
      '<header class="game-topbar">',
      '<div><span class="eyebrow">Dev Tools</span><strong>Arena Editor</strong></div>',
      '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "secondary-button" : "primary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "arenas" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-arenas">Arenas</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="' + (devToolsState.section === "characters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-characters">Characters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
      '</header>',
      '<section class="dev-screen-layout">',
      '<aside class="dev-sidebar panel-block"><div class="section-heading"><h2>Arenas</h2><button class="secondary-button" type="button" data-action="add-arena">Add Arena</button></div><ul class="compact-list dev-map-list">' + (arenaItems || "<li>No arenas yet.</li>") + '</ul></aside>',
      '<section class="dev-main">',
      '<section class="panel-block dev-preview-controls"><div class="section-heading"><h2>Arena Tools</h2></div><p>Edit arena leader and crest metadata in-memory, then export <code>arenas.json</code> into <code>data/</code> and rebuild local content before reloading the game.</p><div class="title-actions"><button class="secondary-button" type="button" data-action="export-arenas-json">Export arenas.json</button></div></section>',
      arenaEditor,
      '</section>',
      '</section>',
      '</main>',
    ].join("");

    return null;
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
      '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "secondary-button" : "primary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "arenas" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-arenas">Arenas</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="' + (devToolsState.section === "characters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-characters">Characters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
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

  function renderCharacterDevToolsScreen(root, content, devToolsState) {
    const sheet = ensureCharacterDevSelection(devToolsState, content);
    const selectedRow = devToolsState.characterSheetSelectedRow || 0;
    const selectedFrame = devToolsState.characterSheetSelectedFrame || 0;
    const compareRow = typeof devToolsState.characterSheetCompareRow === "number" ? devToolsState.characterSheetCompareRow : Math.min(1, Math.max(1, (devToolsState.characterSheetRows || 1) - 1));
    const directionLabels = ["Down", "Left", "Right", "Up"];
    const sidebarItems = getAvailableCharacterSheets(content).map(function (entry) {
      const selected = entry.id === devToolsState.selectedCharacterSheetId ? " compact-list-selected" : "";
      return '<li class="' + selected.trim() + '"><button type="button" class="link-button" data-dev-select-character-sheet="' + escapeHtml(entry.id) + '"><strong>' + escapeHtml(entry.label) + '</strong><span>' + escapeHtml(entry.path) + "</span></button></li>";
    }).join("");
    const rowOptions = Array.from({ length: Math.max(1, devToolsState.characterSheetRows || 1) }).map(function (_, index) {
      const selected = index === selectedRow ? " selected" : "";
      const label = directionLabels[index] || ("Row " + (index + 1));
      return '<option value="' + index + '"' + selected + ">" + escapeHtml(label) + "</option>";
    }).join("");
    const compareRowOptions = Array.from({ length: Math.max(1, devToolsState.characterSheetRows || 1) }).map(function (_, index) {
      const selected = index === compareRow ? " selected" : "";
      const label = directionLabels[index] || ("Row " + (index + 1));
      return '<option value="' + index + '"' + selected + ">" + escapeHtml(label) + "</option>";
    }).join("");
    const frameOptions = Array.from({ length: Math.max(1, devToolsState.characterSheetColumns || 1) }).map(function (_, index) {
      const selected = index === selectedFrame ? " selected" : "";
      return '<option value="' + index + '"' + selected + ">Frame " + (index + 1) + "</option>";
    }).join("");
    const selectedRowOffset = getCharacterRowOffset(devToolsState, selectedRow);
    const selectedFrameOffset = getCharacterFrameOffset(devToolsState, selectedRow, selectedFrame);

    root.innerHTML = [
      '<main class="dev-screen">',
      '<header class="game-topbar">',
      '<div><span class="eyebrow">Dev Tools</span><strong>Character Sprite Checker</strong></div>',
      '<div class="topbar-stats"><button class="' + (devToolsState.section === "maps" ? "secondary-button" : "primary-button") + '" type="button" data-action="dev-section-maps">Maps</button><button class="' + (devToolsState.section === "towns" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-towns">Towns</button><button class="' + (devToolsState.section === "arenas" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-arenas">Arenas</button><button class="' + (devToolsState.section === "monsters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-monsters">Monsters</button><button class="' + (devToolsState.section === "characters" ? "primary-button" : "secondary-button") + '" type="button" data-action="dev-section-characters">Characters</button><button class="secondary-button" type="button" data-action="back-to-title">Back</button><button class="secondary-button" type="button" data-action="load-folder">Load Project Folder</button></div>',
      '</header>',
      '<section class="dev-screen-layout">',
      '<aside class="dev-sidebar panel-block"><div class="section-heading"><h2>Sprite Sheets</h2></div><ul class="compact-list dev-map-list">' + sidebarItems + '</ul></aside>',
      '<section class="dev-main">',
      '<section class="panel-block dev-editor-panel">',
      '<div class="section-heading"><h2>Sheet Settings</h2></div>',
      '<div class="form-grid">',
      '<label class="input-group"><span>Columns</span><input type="number" min="1" step="1" data-dev-character-field="columns" value="' + Number(devToolsState.characterSheetColumns || sheet?.columns || 4) + '" /></label>',
      '<label class="input-group"><span>Rows</span><input type="number" min="1" step="1" data-dev-character-field="rows" value="' + Number(devToolsState.characterSheetRows || sheet?.rows || 4) + '" /></label>',
      '<label class="input-group"><span>Offset X</span><input type="number" step="1" data-dev-character-field="offsetX" value="' + Number(devToolsState.characterSheetOffsetX || 0) + '" /></label>',
      '<label class="input-group"><span>Offset Y</span><input type="number" step="1" data-dev-character-field="offsetY" value="' + Number(devToolsState.characterSheetOffsetY || 0) + '" /></label>',
      '<label class="input-group"><span>Preview Scale</span><input type="number" min="0.5" max="6" step="0.25" data-dev-character-field="previewScale" value="' + Number(devToolsState.characterSheetPreviewScale || 1.5) + '" /></label>',
      '<label class="input-group"><span>Player Avatar Label</span><input type="text" data-dev-character-field="playerLabel" value="' + escapeHtml(devToolsState.characterSheetPlayerLabel || sheet?.label || "") + '" /></label>',
      '<label class="input-group"><span>Available To Player</span><select data-dev-character-field="playerSelectable"><option value="true"' + (devToolsState.characterSheetPlayerSelectable ? " selected" : "") + '>Yes</option><option value="false"' + (!devToolsState.characterSheetPlayerSelectable ? " selected" : "") + '>No</option></select></label>',
      '<label class="input-group"><span>Active Row</span><select data-dev-character-field="selectedRow">' + rowOptions + '</select></label>',
      '<label class="input-group"><span>Compare Row</span><select data-dev-character-field="compareRow">' + compareRowOptions + '</select></label>',
      '<label class="input-group"><span>Active Frame</span><select data-dev-character-field="selectedFrame">' + frameOptions + '</select></label>',
      '<label class="input-group"><span>Row Shift X (all frames)</span><input type="number" step="1" data-dev-character-field="rowOffsetX" value="' + Number(selectedRowOffset.x || 0) + '" /></label>',
      '<label class="input-group"><span>Row Shift Y (all frames)</span><input type="number" step="1" data-dev-character-field="rowOffsetY" value="' + Number(selectedRowOffset.y || 0) + '" /></label>',
      '<label class="input-group"><span>Frame Cut X</span><input type="number" step="1" data-dev-character-field="frameOffsetX" value="' + Number(selectedFrameOffset.x || 0) + '" /></label>',
      '<label class="input-group"><span>Frame Cut Y</span><input type="number" step="1" data-dev-character-field="frameOffsetY" value="' + Number(selectedFrameOffset.y || 0) + '" /></label>',
      '<label class="input-group"><span>Frame Cut Width</span><input type="number" step="1" data-dev-character-field="frameWidthAdjust" value="' + Number(selectedFrameOffset.width || 0) + '" /></label>',
      '<label class="input-group"><span>Frame Cut Height</span><input type="number" step="1" data-dev-character-field="frameHeightAdjust" value="' + Number(selectedFrameOffset.height || 0) + '" /></label>',
      '</div>',
      '<p class="dev-helper-text">Use global offsets for the whole sheet, row offsets for one direction row, and frame cut values for individual cells. Frame cut X/Y/Width/Height only affects the selected frame, so you can fix one drifted frame without moving its neighbors.</p>',
      '<div class="title-actions"><button class="secondary-button" type="button" data-action="export-character-sheets-json">Export character-sheets.json</button></div>',
      '</section>',
      '<section class="dev-preview-grid dev-character-preview-grid">',
      '<section class="map-panel dev-map-panel"><div class="section-heading"><h2>Full Sheet</h2><span>' + escapeHtml(sheet?.label || "Sheet") + '</span></div><div class="dev-canvas-scroll" data-preview-role="character-sheet"><canvas class="dev-character-sheet-canvas" width="720" height="520"></canvas></div><div class="map-caption">Grid overlay shows how the current columns, rows, and offsets will be cut.</div></section>',
      '<section class="map-panel dev-map-panel"><div class="section-heading"><h2>Selected Row Frames</h2><span>' + escapeHtml(directionLabels[selectedRow] || ("Row " + (selectedRow + 1))) + '</span></div><div class="dev-canvas-scroll" data-preview-role="character-row"><canvas class="dev-character-row-canvas" width="720" height="220"></canvas></div><div class="map-caption">Frames from the selected row are stacked with transparency so you can compare centering and drift.</div></section>',
      '</section>',
      '<section class="panel-block dev-editor-panel">' +
      '<div class="section-heading"><h2>Walk Comparison</h2><span>' + escapeHtml((directionLabels[selectedRow] || ("Row " + (selectedRow + 1))) + " vs " + (directionLabels[compareRow] || ("Row " + (compareRow + 1)))) + '</span></div>' +
      '<div class="dev-character-compare-strip">' +
      '<div class="dev-character-compare-item"><div class="dev-character-compare-label">' + escapeHtml(directionLabels[selectedRow] || ("Row " + (selectedRow + 1))) + '</div><div class="dev-character-animation-wrap dev-canvas-scroll" data-preview-role="character-animation-primary"><canvas class="dev-character-animation-canvas" width="720" height="180"></canvas></div></div>' +
      '<div class="dev-character-compare-item"><div class="dev-character-compare-label">' + escapeHtml(directionLabels[compareRow] || ("Row " + (compareRow + 1))) + '</div><div class="dev-character-animation-wrap dev-canvas-scroll" data-preview-role="character-animation-compare"><canvas class="dev-character-animation-compare-canvas" width="720" height="180"></canvas></div></div>' +
      '</div>' +
      '<div class="map-caption">Animated loops for the active row and comparison row, shown side by side in one shared preview area.</div>' +
      '</section>',
      '</section>',
      '</section>',
      '</main>',
    ].join("");

    return null;
  }

  function getSelectedCharacterSheet(devToolsState, content) {
    return getAvailableCharacterSheets(content).find(function (entry) {
      return entry.id === devToolsState.selectedCharacterSheetId;
    }) || getAvailableCharacterSheets(content)[0] || null;
  }

  function getCharacterSheetMetrics(devToolsState, image) {
    const columns = Math.max(1, Number(devToolsState.characterSheetColumns || 4));
    const rows = Math.max(1, Number(devToolsState.characterSheetRows || 4));
    const offsetX = Number(devToolsState.characterSheetOffsetX || 0);
    const offsetY = Number(devToolsState.characterSheetOffsetY || 0);
    const frameWidth = Math.floor((image.naturalWidth - offsetX) / columns);
    const frameHeight = Math.floor((image.naturalHeight - offsetY) / rows);
    return {
      columns,
      rows,
      offsetX,
      offsetY,
      frameWidth,
      frameHeight,
    };
  }

  function getCharacterFrameSourceRect(characterConfig, image, rowIndex, frameIndex) {
    const metrics = getCharacterSheetMetrics(characterConfig, image);
    const rowOffset = getCharacterRowOffset(characterConfig, rowIndex);
    const frameOffset = getCharacterFrameOffset(characterConfig, rowIndex, frameIndex);
    const baseX = metrics.offsetX + frameIndex * metrics.frameWidth + rowOffset.x;
    const baseY = metrics.offsetY + rowIndex * metrics.frameHeight + rowOffset.y;
    return {
      sx: baseX + Number(frameOffset.x || 0),
      sy: baseY + Number(frameOffset.y || 0),
      sw: Math.max(1, metrics.frameWidth + frameOffset.width),
      sh: Math.max(1, metrics.frameHeight + frameOffset.height),
      metrics,
    };
  }

  function buildCharacterSheetRenderConfig(sheet) {
    return {
      characterSheetColumns: Math.max(1, Number(sheet?.columns || 4)),
      characterSheetRows: Math.max(1, Number(sheet?.rows || 4)),
      characterSheetOffsetX: Number(sheet?.offsetX || 0),
      characterSheetOffsetY: Number(sheet?.offsetY || 0),
      characterSheetRowOffsets: sheet?.rowOffsets || [],
      characterSheetFrameOffsets: sheet?.frameOffsets || [],
    };
  }

  function drawAvatarPreviewCanvas(canvas, content, sheetId) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const sheet = getCharacterSheetConfig(content, sheetId);
    const ctx = canvas.getContext("2d");
    const cssWidth = Math.max(1, Math.round(canvas.clientWidth || Number(canvas.width) || 96));
    const cssHeight = Math.max(1, Math.round(canvas.clientHeight || Number(canvas.height) || 96));
    const pixelRatio = window.devicePixelRatio || 1;
    const nextWidth = Math.max(1, Math.round(cssWidth * pixelRatio));
    const nextHeight = Math.max(1, Math.round(cssHeight * pixelRatio));

    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    }

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = "rgba(214, 237, 246, 0.45)";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    if (!sheet?.path) {
      return;
    }

    const image = getImage(sheet.path);
    if (!image.complete || !image.naturalWidth) {
      ctx.fillStyle = "#6a5044";
      ctx.font = "600 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Loading...", cssWidth / 2, cssHeight / 2);
      return;
    }

    const renderConfig = buildCharacterSheetRenderConfig(sheet);
    const sourceRect = getCharacterFrameSourceRect(renderConfig, image, 0, 0);
    const padding = Math.max(6, Math.round(Math.min(cssWidth, cssHeight) * 0.08));
    const scale = Math.min(
      (cssWidth - padding * 2) / sourceRect.sw,
      (cssHeight - padding * 2) / sourceRect.sh
    );
    const drawWidth = sourceRect.sw * scale;
    const drawHeight = sourceRect.sh * scale;
    const drawX = Math.round((cssWidth - drawWidth) / 2);
    const drawY = Math.round((cssHeight - drawHeight) / 2);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      sourceRect.sx,
      sourceRect.sy,
      sourceRect.sw,
      sourceRect.sh,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );
  }

  function drawAvatarPreviewCanvases(root, content) {
    root.querySelectorAll("[data-avatar-preview-sheet]").forEach(function (canvas) {
      drawAvatarPreviewCanvas(canvas, content, canvas.getAttribute("data-avatar-preview-sheet") || "");
    });
  }

  function drawCharacterSheetGrid(canvas, devToolsState) {
    const sheet = getSelectedCharacterSheet(devToolsState, ACTIVE_APP?.content);
    const ctx = canvas.getContext("2d");
    const image = getImage(sheet?.path || "");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4efe8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!image.complete || !image.naturalWidth) {
      ctx.fillStyle = "#6a5044";
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading sprite sheet...", 36, 48);
      return;
    }

    const scale = Math.min((canvas.width - 32) / image.naturalWidth, (canvas.height - 32) / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const drawX = Math.round((canvas.width - drawWidth) / 2);
    const drawY = Math.round((canvas.height - drawHeight) / 2);
    const metrics = getCharacterSheetMetrics(devToolsState, image);
    const selectedRow = Math.max(0, Math.min(metrics.rows - 1, Number(devToolsState.characterSheetSelectedRow || 0)));

    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

    ctx.save();
    ctx.strokeStyle = "rgba(47, 121, 147, 0.35)";
    ctx.lineWidth = 1;
    for (let column = 0; column <= metrics.columns; column += 1) {
      const x = drawX + (metrics.offsetX + metrics.frameWidth * column) * scale;
      ctx.beginPath();
      ctx.moveTo(x, drawY + metrics.offsetY * scale);
      ctx.lineTo(x, drawY + (metrics.offsetY + metrics.frameHeight * metrics.rows) * scale);
      ctx.stroke();
    }
    for (let row = 0; row <= metrics.rows; row += 1) {
      const y = drawY + (metrics.offsetY + metrics.frameHeight * row) * scale;
      ctx.beginPath();
      ctx.moveTo(drawX + metrics.offsetX * scale, y);
      ctx.lineTo(drawX + (metrics.offsetX + metrics.frameWidth * metrics.columns) * scale, y);
      ctx.stroke();
    }

    for (let column = 0; column < metrics.columns; column += 1) {
      const sourceRect = getCharacterFrameSourceRect(devToolsState, image, selectedRow, column);
      const isSelectedFrame = column === Number(devToolsState.characterSheetSelectedFrame || 0);
      ctx.fillStyle = isSelectedFrame ? "rgba(246, 151, 178, 0.24)" : "rgba(47, 121, 147, 0.12)";
      ctx.strokeStyle = isSelectedFrame ? "rgba(214, 92, 136, 0.95)" : "rgba(47, 121, 147, 0.85)";
      ctx.lineWidth = isSelectedFrame ? 3 : 2;
      ctx.fillRect(drawX + sourceRect.sx * scale, drawY + sourceRect.sy * scale, sourceRect.sw * scale, sourceRect.sh * scale);
      ctx.strokeRect(drawX + sourceRect.sx * scale, drawY + sourceRect.sy * scale, sourceRect.sw * scale, sourceRect.sh * scale);
    }
    ctx.restore();
  }

  function drawCharacterRowFrames(canvas, devToolsState) {
    const sheet = getSelectedCharacterSheet(devToolsState, ACTIVE_APP?.content);
    const ctx = canvas.getContext("2d");
    const image = getImage(sheet?.path || "");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4efe8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!image.complete || !image.naturalWidth) {
      ctx.fillStyle = "#6a5044";
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading row preview...", 36, 48);
      return;
    }

    const metrics = getCharacterSheetMetrics(devToolsState, image);
    const selectedRow = Math.max(0, Math.min(metrics.rows - 1, Number(devToolsState.characterSheetSelectedRow || 0)));
    const frameRects = Array.from({ length: metrics.columns }, function (_, column) {
      return getCharacterFrameSourceRect(devToolsState, image, selectedRow, column);
    });
    const maxFrameWidth = Math.max.apply(null, frameRects.map(function (rect) { return rect.sw; }));
    const maxFrameHeight = Math.max.apply(null, frameRects.map(function (rect) { return rect.sh; }));
    const requestedScale = Math.max(0.5, Number(devToolsState.characterSheetPreviewScale || 1.5));
    const maxPreviewWidth = canvas.width - 80;
    const maxPreviewHeight = canvas.height - 78;
    const fitScale = Math.min(maxPreviewWidth / maxFrameWidth, maxPreviewHeight / maxFrameHeight);
    const previewScale = Math.max(0.35, Math.min(requestedScale, fitScale));
    const centerX = Math.round(canvas.width / 2);
    const centerY = Math.round((canvas.height - 26) / 2);
    const colors = ["#f08b6e", "#7da8d8", "#9ac47a", "#c38dd9", "#d9b16f", "#5eb7ab"];
    const selectedFrame = Math.max(0, Math.min(metrics.columns - 1, Number(devToolsState.characterSheetSelectedFrame || 0)));

    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
    ctx.strokeStyle = "rgba(57, 79, 91, 0.14)";
    ctx.lineWidth = 1.5;
    ctx.fillRect(
      Math.round(centerX - (maxFrameWidth * previewScale) / 2) - 10,
      Math.round(centerY - (maxFrameHeight * previewScale) / 2) - 10,
      Math.round(maxFrameWidth * previewScale) + 20,
      Math.round(maxFrameHeight * previewScale) + 20
    );
    ctx.strokeRect(
      Math.round(centerX - (maxFrameWidth * previewScale) / 2) - 10,
      Math.round(centerY - (maxFrameHeight * previewScale) / 2) - 10,
      Math.round(maxFrameWidth * previewScale) + 20,
      Math.round(maxFrameHeight * previewScale) + 20
    );
    ctx.restore();

    frameRects.forEach(function (sourceRect, column) {
      const color = colors[column % colors.length];
      const drawWidth = sourceRect.sw * previewScale;
      const drawHeight = sourceRect.sh * previewScale;
      const dx = Math.round(centerX - drawWidth / 2);
      const dy = Math.round(centerY - drawHeight / 2);
      const isSelected = column === selectedFrame;

      ctx.save();
      ctx.globalAlpha = isSelected ? 0.92 : 0.26;
      ctx.drawImage(
        image,
        sourceRect.sx,
        sourceRect.sy,
        sourceRect.sw,
        sourceRect.sh,
        dx,
        dy,
        drawWidth,
        drawHeight
      );
      ctx.globalAlpha = 1;
      ctx.strokeStyle = color;
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeRect(dx, dy, drawWidth, drawHeight);
      ctx.restore();
    });

    frameRects.forEach(function (_, column) {
      const color = colors[column % colors.length];
      const legendX = 18 + column * 172;
      const legendY = canvas.height - 28;
      const isSelected = column === selectedFrame;
      ctx.fillStyle = color;
      ctx.globalAlpha = isSelected ? 1 : 0.45;
      ctx.fillRect(legendX, legendY - 10, 14, 14);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#6a5044";
      ctx.font = (isSelected ? "700 " : "500 ") + '13px sans-serif';
      ctx.fillText("Frame " + (column + 1), legendX + 22, legendY + 1);
    });
  }

  function drawCharacterAnimationPreview(canvas, devToolsState, rowOverride) {
    const sheet = getSelectedCharacterSheet(devToolsState, ACTIVE_APP?.content);
    const ctx = canvas.getContext("2d");
    const image = getImage(sheet?.path || "");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4efe8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!image.complete || !image.naturalWidth) {
      ctx.fillStyle = "#6a5044";
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading animation preview...", 36, 48);
      return;
    }

    const metrics = getCharacterSheetMetrics(devToolsState, image);
    const selectedRow = Math.max(0, Math.min(metrics.rows - 1, Number(typeof rowOverride === "number" ? rowOverride : (devToolsState.characterSheetSelectedRow || 0))));
    const animation = devToolsState.characterSheetAnimation || { frameIndex: 0 };
    const sourceRect = getCharacterFrameSourceRect(devToolsState, image, selectedRow, Math.max(0, Math.min(metrics.columns - 1, animation.frameIndex || 0)));
    const requestedScale = Math.max(0.5, Number(devToolsState.characterSheetPreviewScale || 1.5));
    const maxPreviewWidth = canvas.width - 72;
    const maxPreviewHeight = canvas.height - 52;
    const fitScale = Math.min(maxPreviewWidth / sourceRect.sw, maxPreviewHeight / sourceRect.sh);
    const previewScale = Math.max(0.4, Math.min(requestedScale, fitScale));
    const dx = Math.round((canvas.width - sourceRect.sw * previewScale) / 2);
    const dy = Math.round((canvas.height - sourceRect.sh * previewScale) / 2) - 2;

    ctx.fillStyle = "rgba(167, 205, 145, 0.28)";
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, dy + sourceRect.sh * previewScale - 4, 36, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(
      image,
      sourceRect.sx,
      sourceRect.sy,
      sourceRect.sw,
      sourceRect.sh,
      dx,
      dy,
      sourceRect.sw * previewScale,
      sourceRect.sh * previewScale
    );
  }

  function drawCharacterDevCanvases(root, devToolsState) {
    const sheetCanvas = root.querySelector(".dev-character-sheet-canvas");
    const rowCanvas = root.querySelector(".dev-character-row-canvas");
    const animationCanvas = root.querySelector(".dev-character-animation-canvas");
    const compareAnimationCanvas = root.querySelector(".dev-character-animation-compare-canvas");
    if (sheetCanvas) {
      drawCharacterSheetGrid(sheetCanvas, devToolsState);
    }
    if (rowCanvas) {
      drawCharacterRowFrames(rowCanvas, devToolsState);
    }
    if (animationCanvas) {
      drawCharacterAnimationPreview(animationCanvas, devToolsState, devToolsState.characterSheetSelectedRow || 0);
    }
    if (compareAnimationCanvas) {
      drawCharacterAnimationPreview(compareAnimationCanvas, devToolsState, devToolsState.characterSheetCompareRow || 0);
    }
  }

  function renderDevToolsScreen(root, content, devToolsState) {
    if (devToolsState.section === "characters") {
      return renderCharacterDevToolsScreen(root, content, devToolsState);
    }

    if (devToolsState.section === "towns") {
      return renderTownDevToolsScreen(root, content, devToolsState);
    }

    if (devToolsState.section === "arenas") {
      return renderArenaDevToolsScreen(root, content, devToolsState);
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
    const currentTime = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date());
    const encounterPreviewIcons = renderEncounterPreviewIcons(state, content);

    root.innerHTML = [
      '<main class="game-shell">',
      '<header class="game-topbar">',
      '<div class="world-location-header"><span class="eyebrow">Location</span><div class="world-location-line"><strong>' + mapName + "</strong>" + encounterPreviewIcons + "</div></div>",
      '<div class="topbar-stats"><span class="world-clock">' + currentTime + "</span><span>$" + state.player.money + '</span><button class="secondary-button" type="button" data-action="open-settings">Settings</button><button class="secondary-button" type="button" data-action="save">Save</button><button class="secondary-button" type="button" data-action="title">Title</button></div>',
      "</header>",
      '<section class="play-area">',
      '<div class="map-panel"><canvas class="world-canvas" width="' + VIEWPORT.width + '" height="' + VIEWPORT.height + '"></canvas><div class="map-caption">Move with arrow keys or WASD. Touch a pink marker to battle.' + (activeInteraction ? " " + escapeHtml(buildInteractionPrompt(activeInteraction)) + "." : "") + '</div></div>',
      '<aside class="status-panel">',
      '<section class="panel-block"><h2>Now Playing</h2><p>' + state.message + "</p></section>",
      '<section class="panel-block"><h2>Party Lead</h2><p>' + activeSpecies.name + " Lv " + activeMonster.level + "</p><p>HP " + activeMonster.currentHp + "/" + activeMonster.stats.hp + "</p></section>",
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

  function updateLiveWorldUi(root) {
    const clock = root.querySelector(".world-clock");
    if (!clock) {
      return;
    }

    const currentTime = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date());
    if (clock.textContent !== currentTime) {
      clock.textContent = currentTime;
    }
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
    root.querySelector('[data-action="confirm-healing-center"]')?.addEventListener("click", function () {
      app.confirmHealingCenter();
    });
    root.querySelector('[data-action="start-arena-battle"]')?.addEventListener("click", function () {
      app.startArenaBattleFromInteraction();
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
    root.querySelectorAll("[data-world-player-field]").forEach(function (field) {
      field.addEventListener("change", function () {
        app.updateWorldPlayerField(field.getAttribute("data-world-player-field"), field.value);
      });
    });

    root.querySelectorAll("[data-battle-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.handleBattleAction(button.getAttribute("data-battle-action"));
      });
    });
    root.querySelectorAll("[data-battle-skill]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.useBattleSkill(button.getAttribute("data-battle-skill"));
      });
    });
    root.querySelectorAll("[data-battle-swap-to]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.swapBattleMonsterTo(Number(button.getAttribute("data-battle-swap-to")));
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
    root.querySelector('[data-action="dev-section-arenas"]')?.addEventListener("click", function () {
      app.setDevSection("arenas");
    });
    root.querySelector('[data-action="dev-section-monsters"]')?.addEventListener("click", function () {
      app.setDevSection("monsters");
    });
    root.querySelector('[data-action="dev-section-characters"]')?.addEventListener("click", function () {
      app.setDevSection("characters");
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
    root.querySelector('[data-action="add-arena"]')?.addEventListener("click", function () {
      app.addArena();
    });
    root.querySelector('[data-action="duplicate-arena"]')?.addEventListener("click", function () {
      app.duplicateArena();
    });
    root.querySelector('[data-action="delete-arena"]')?.addEventListener("click", function () {
      app.deleteArena();
    });
    root.querySelector('[data-action="export-arenas-json"]')?.addEventListener("click", function () {
      app.exportArenasJson();
    });
    root.querySelector('[data-action="add-arena-team-member"]')?.addEventListener("click", function () {
      app.addArenaTeamMember();
    });
    root.querySelector('[data-action="add-arena-pool-member"]')?.addEventListener("click", function () {
      app.addArenaPoolMember();
    });
    root.querySelectorAll('[data-action="delete-arena-team-member"]').forEach(function (button) {
      button.addEventListener("click", function () {
        app.deleteArenaTeamMember(Number(button.getAttribute("data-team-index")));
      });
    });
    root.querySelectorAll('[data-action="delete-arena-pool-member"]').forEach(function (button) {
      button.addEventListener("click", function () {
        app.deleteArenaPoolMember(Number(button.getAttribute("data-pool-index")));
      });
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
    root.querySelector('[data-action="export-character-sheets-json"]')?.addEventListener("click", function () {
      app.exportCharacterSheetsJson();
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
    root.querySelectorAll("[data-dev-select-arena]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectArena(button.getAttribute("data-dev-select-arena"));
      });
    });
    root.querySelectorAll("[data-dev-select-character-sheet]").forEach(function (button) {
      button.addEventListener("click", function () {
        app.selectCharacterSheet(button.getAttribute("data-dev-select-character-sheet"));
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
    root.querySelectorAll("[data-dev-arena-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateArenaField(field.getAttribute("data-dev-arena-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateArenaField(field.getAttribute("data-dev-arena-field"), field.value);
        });
      }
    });
    root.querySelectorAll("[data-dev-arena-team-field]").forEach(function (field) {
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateArenaTeamMember(
          Number(field.getAttribute("data-team-index")),
          field.getAttribute("data-dev-arena-team-field"),
          field.value,
          field.tagName === "SELECT"
        );
      });
      if (field.tagName !== "SELECT") {
        field.addEventListener("change", function () {
          app.updateArenaTeamMember(
            Number(field.getAttribute("data-team-index")),
            field.getAttribute("data-dev-arena-team-field"),
            field.value
          );
        });
      }
    });
    root.querySelectorAll("[data-dev-arena-pool-field]").forEach(function (field) {
      field.addEventListener("change", function () {
        app.updateArenaPoolMember(
          Number(field.getAttribute("data-pool-index")),
          field.getAttribute("data-dev-arena-pool-field"),
          field.value
        );
      });
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
    root.querySelectorAll("[data-dev-character-field]").forEach(function (field) {
      const useDeferredRender = isDeferredDevTextField(field);
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        app.updateCharacterSheetField(field.getAttribute("data-dev-character-field"), field.value, !useDeferredRender);
        if (useDeferredRender) {
          app.clearDeferredRender();
        }
      });
      if (useDeferredRender) {
        field.addEventListener("change", function () {
          app.updateCharacterSheetField(field.getAttribute("data-dev-character-field"), field.value);
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
          if (action === "dev-section-arenas") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevSection("arenas");
            return;
          }
          if (action === "dev-section-monsters") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevSection("monsters");
            return;
          }
          if (action === "dev-section-characters") {
            event.preventDefault();
            event.stopPropagation();
            app.setDevSection("characters");
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

        const arenaEl = target.closest("[data-dev-select-arena]");
        if (arenaEl instanceof HTMLElement) {
          app.selectArena(arenaEl.getAttribute("data-dev-select-arena"));
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
          return;
        }

        const characterSheetEl = target.closest("[data-dev-select-character-sheet]");
        if (characterSheetEl instanceof HTMLElement) {
          event.preventDefault();
          event.stopPropagation();
          app.selectCharacterSheet(characterSheetEl.getAttribute("data-dev-select-character-sheet"));
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

      if (target.matches("[data-dev-character-field]")) {
        event.stopPropagation();
        app.updateCharacterSheetField(target.getAttribute("data-dev-character-field"), target.value);
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
        selectedArenaId: ensureArenaCatalog(content)[0]?.id || "",
        selectedTransitionId: "",
        selectedSpawnId: "",
        selectedInteractionId: "",
        editorMode: "transitions",
        monsterSubMode: "species",
        selectedSpeciesId: content.monsters?.species?.[0]?.id || "",
        selectedSkillId: ensureSkillCatalog(content)[0]?.id || "",
        selectedPreviewVariantId: content.monsters?.species?.[0]?.variants?.[0]?.id || "",
        selectedCharacterSheetId: getCharacterSheetConfig(content, CHARACTER_SHEET_OPTIONS[0]?.id || "")?.id || CHARACTER_SHEET_OPTIONS[0]?.id || "",
        characterSheetColumns: getCharacterSheetConfig(content, CHARACTER_SHEET_OPTIONS[0]?.id || "")?.columns || CHARACTER_SHEET_OPTIONS[0]?.columns || 4,
        characterSheetRows: getCharacterSheetConfig(content, CHARACTER_SHEET_OPTIONS[0]?.id || "")?.rows || CHARACTER_SHEET_OPTIONS[0]?.rows || 4,
        characterSheetOffsetX: 0,
        characterSheetOffsetY: 0,
        characterSheetSelectedRow: 0,
        characterSheetCompareRow: 1,
        characterSheetPreviewScale: 1.5,
        characterSheetAnimation: {
          frameIndex: 0,
          frameTime: 0,
        },
        previewZoom: 100,
        previewScroll: {
          source: { left: 0, top: 0 },
          target: { left: 0, top: 0 },
          "character-sheet": { left: 0, top: 0 },
          "character-row": { left: 0, top: 0 },
          "character-animation": { left: 0, top: 0 },
        },
        drag: null,
      },
      lastFrameAt: null,
      deferredRenderTimer: null,
      selectedTitleSaveSlotId: saveManager.listSaves()[0]?.slotId || "",
      showTitle: function (notice) {
        const slots = this.saveManager.listSaves();
        this.titleNotice = notice || "";
        if (!slots.find((slot) => slot.slotId === this.selectedTitleSaveSlotId)) {
          this.selectedTitleSaveSlotId = slots[0]?.slotId || "";
        }
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
        syncArenaDevSelection(this.content, this.devTools);
        ensureCharacterDevSelection(this.devTools, this.content);
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
      continueGame: function (slotId) {
        const slots = this.saveManager.listSaves();
        if (!slots.length) {
          this.startNewGame();
          return;
        }

        const resolvedSlotId = slotId || this.selectedTitleSaveSlotId || slots[0].slotId;
        const save = this.saveManager.readSave(resolvedSlotId);
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

        if (key === "zoom" || key === "partySize" || key === "arenaLeaderMinLevel" || key === "arenaLeaderMaxLevel" || key === "arenaLeaderPartySize") {
          this.state.settings[key] = Number(rawValue || 0);
        } else if (key === "shareExperience" || key === "mapDetails" || key === "encounterPreview") {
          this.state.settings[key] = rawValue === "true";
        } else {
          this.state.settings[key] = rawValue;
        }

        this.render();
      },
      updateWorldPlayerField: function (key, rawValue) {
        if (this.state.screen !== "world") {
          return;
        }

        if (key === "avatarId") {
          this.state.player.avatarId = rawValue;
        } else {
          this.state.player[key] = rawValue;
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
      confirmHealingCenter: function () {
        if (this.state.screen !== "world" || !this.state.interaction || this.state.interaction.type !== "healing-center") {
          return;
        }

        const interaction = getActiveInteraction(this.state, this.content) || this.content.mapMetadata[this.state.world.currentMapId]?.interactions?.find((entry) => entry.id === this.state.interaction.id);
        if (!interaction) {
          this.state.interaction = null;
          this.render();
          return;
        }

        performHealingCenterService(this.state, this.content, interaction);
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

        if (action === "open-fight-menu") {
          this.state.battle.menu = "fight";
        } else if (action === "open-switch-menu") {
          this.state.battle.menu = "switch";
        } else if (action === "open-item-menu") {
          this.state.battle.menu = "item";
        } else if (action === "back-menu") {
          this.state.battle.menu = "root";
        } else if (action === "attack") {
          resolveBattleAttack(this.state, this.content);
        } else if (action === "item" || action === "use-tonic") {
          useTonic(this.state, this.content);
          this.state.battle.menu = "root";
        } else if (action === "swap") {
          swapMonster(this.state, this.content);
          this.state.battle.menu = "root";
        } else if (action === "catch") {
          if (this.state.battle.type === "trainer") {
            return;
          }
          resolveCatch(this.state, this.content);
          this.state.battle.menu = "root";
        } else if (action === "befriend") {
          if (this.state.battle.type === "trainer") {
            return;
          }
          resolveBefriend(this.state, this.content);
          this.state.battle.menu = "root";
        } else if (action === "run") {
          if (this.state.battle.type === "trainer") {
            return;
          }
          attemptRun(this.state, this.content);
          this.state.battle.menu = "root";
        } else if (action === "close-battle") {
          this.state.battle = null;
        }

        this.render();
      },
      useBattleSkill: function (skillId) {
        if (!this.state.battle || this.state.battle.outcome) {
          return;
        }

        useBattleSkill(this.state, this.content, skillId);
        if (this.state.battle) {
          this.state.battle.menu = "root";
        }
        this.render();
      },
      swapBattleMonsterTo: function (partyIndex) {
        if (!this.state.battle || this.state.battle.outcome) {
          return;
        }

        if (partyIndex === this.state.battle.playerIndex) {
          return;
        }

        const targetMonster = this.state.party[partyIndex];
        if (!targetMonster || targetMonster.currentHp <= 0) {
          return;
        }

        this.state.battle.playerIndex = partyIndex;
        this.state.battle.log.unshift("You swapped to another monster.");
        resolveEnemyCounter(this.state, this.content);
        this.state.battle.menu = "root";
        this.render();
      },
      startArenaBattleFromInteraction: function () {
        if (this.state.screen !== "world" || !this.state.interaction || this.state.interaction.type !== "arena") {
          return;
        }

        const interaction = getActiveInteraction(this.state, this.content)
          || this.content.mapMetadata[this.state.world.currentMapId]?.interactions?.find((entry) => entry.id === this.state.interaction.id);
        if (!interaction) {
          this.state.interaction = null;
          this.render();
          return;
        }

        const arenaId = interaction.data?.arenaId || this.state.interaction.arena?.arenaId || "";
        const arena = arenaId ? getArena(this.content, arenaId) : null;
        if (!arena) {
          this.state.message = "This arena interaction is not linked to a valid arena record yet.";
          this.render();
          return;
        }

        startArenaBattle(this.state, this.content, arena, interaction);
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
          syncArenaDevSelection(this.content, this.devTools);
          this.devTools.selectedMapId = Object.keys(nextContent.maps)[0] || "";
          this.devTools.selectedTownMapId = Object.keys(nextContent.maps).find((mapId) => nextContent.mapMetadata[mapId]?.isTown) || "";
          this.devTools.selectedArenaId = ensureArenaCatalog(nextContent)[0]?.id || "";
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
      selectArena: function (arenaId) {
        this.devTools.selectedArenaId = arenaId;
        this.render();
      },
      setDevSection: function (section) {
        this.devTools.section = section;
        if (section === "towns" && !this.devTools.selectedTownMapId) {
          this.devTools.selectedTownMapId = Object.keys(this.content.maps).find((mapId) => this.content.mapMetadata[mapId]?.isTown) || "";
        }
        if (section === "arenas") {
          syncArenaDevSelection(this.content, this.devTools);
        }
        syncMonsterDevSelection(this.content, this.devTools);
        applyCharacterSheetToDevTools(this.content, this.devTools, this.devTools.selectedCharacterSheetId);
        this.render();
      },
      selectCharacterSheet: function (sheetId) {
        applyCharacterSheetToDevTools(this.content, this.devTools, sheetId);
        this.render();
      },
      updateCharacterSheetField: function (field, rawValue, shouldRender) {
        if (field === "columns") {
          this.devTools.characterSheetColumns = Math.max(1, Number(rawValue || 1));
        } else if (field === "rows") {
          this.devTools.characterSheetRows = Math.max(1, Number(rawValue || 1));
        } else if (field === "offsetX") {
          this.devTools.characterSheetOffsetX = Number(rawValue || 0);
        } else if (field === "offsetY") {
          this.devTools.characterSheetOffsetY = Number(rawValue || 0);
        } else if (field === "playerLabel") {
          this.devTools.characterSheetPlayerLabel = String(rawValue || "");
        } else if (field === "playerSelectable") {
          this.devTools.characterSheetPlayerSelectable = rawValue === "true";
        } else if (field === "selectedRow") {
          this.devTools.characterSheetSelectedRow = Math.max(0, Number(rawValue || 0));
          this.devTools.characterSheetAnimation.frameIndex = 0;
          this.devTools.characterSheetAnimation.frameTime = 0;
        } else if (field === "compareRow") {
          this.devTools.characterSheetCompareRow = Math.max(0, Number(rawValue || 0));
        } else if (field === "selectedFrame") {
          this.devTools.characterSheetSelectedFrame = Math.max(0, Number(rawValue || 0));
        } else if (field === "rowOffsetX") {
          ensureCharacterDevSelection(this.devTools, this.content);
          this.devTools.characterSheetRowOffsets[this.devTools.characterSheetSelectedRow].x = Number(rawValue || 0);
        } else if (field === "rowOffsetY") {
          ensureCharacterDevSelection(this.devTools, this.content);
          this.devTools.characterSheetRowOffsets[this.devTools.characterSheetSelectedRow].y = Number(rawValue || 0);
        } else if (field === "frameOffsetX") {
          ensureCharacterDevSelection(this.devTools, this.content);
          this.devTools.characterSheetFrameOffsets[this.devTools.characterSheetSelectedRow][this.devTools.characterSheetSelectedFrame].x = Number(rawValue || 0);
        } else if (field === "frameOffsetY") {
          ensureCharacterDevSelection(this.devTools, this.content);
          this.devTools.characterSheetFrameOffsets[this.devTools.characterSheetSelectedRow][this.devTools.characterSheetSelectedFrame].y = Number(rawValue || 0);
        } else if (field === "frameWidthAdjust") {
          ensureCharacterDevSelection(this.devTools, this.content);
          this.devTools.characterSheetFrameOffsets[this.devTools.characterSheetSelectedRow][this.devTools.characterSheetSelectedFrame].width = Number(rawValue || 0);
        } else if (field === "frameHeightAdjust") {
          ensureCharacterDevSelection(this.devTools, this.content);
          this.devTools.characterSheetFrameOffsets[this.devTools.characterSheetSelectedRow][this.devTools.characterSheetSelectedFrame].height = Number(rawValue || 0);
        } else if (field === "previewScale") {
          this.devTools.characterSheetPreviewScale = Math.max(0.5, Number(rawValue || 0.5));
        }

        ensureCharacterDevSelection(this.devTools, this.content);
        syncDevToolsCharacterSheet(this.content, this.devTools);
        if (shouldRender !== false) {
          this.render();
        }
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
        root.querySelectorAll("[data-preview-role]").forEach((scroller) => {
          const role = scroller.getAttribute("data-preview-role");
          if (!role) {
            return;
          }
          this.devTools.previewScroll[role] = {
            left: scroller.scrollLeft,
            top: scroller.scrollTop,
          };
        });
      },
      restoreDevPreviewScroll: function () {
        if (this.state.screen !== "dev-tools") {
          return;
        }
        root.querySelectorAll("[data-preview-role]").forEach((scroller) => {
          const role = scroller.getAttribute("data-preview-role");
          if (!role) {
            return;
          }
          scroller.scrollLeft = this.devTools.previewScroll[role]?.left || 0;
          scroller.scrollTop = this.devTools.previewScroll[role]?.top || 0;
        });
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
      updateArenaField: function (path, rawValue, shouldRender) {
        const arena = ensureArenaCatalog(this.content).find((entry) => entry.id === this.devTools.selectedArenaId);
        if (!arena) {
          return;
        }

        const numericFields = new Set(["recommendedLevel", "partySize", "rewardMoney"]);
        const value = numericFields.has(path) ? Number(rawValue || 0) : rawValue;
        arena[path] = value;
        if (path === "id") {
          this.devTools.selectedArenaId = rawValue;
        }

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
      exportCharacterSheetsJson: function () {
        syncDevToolsCharacterSheet(this.content, this.devTools);
        const payload = {
          sheets: ensureCharacterSheetCatalog(this.content),
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "character-sheets.json";
        anchor.click();
        URL.revokeObjectURL(url);
        this.state.message = "Exported character-sheets.json.";
        if (this.state.screen === "world") {
          this.render();
        }
      },
      addArenaTeamMember: function () {
        const arena = ensureArenaCatalog(this.content).find((entry) => entry.id === this.devTools.selectedArenaId);
        if (!arena) {
          return;
        }

        if (!Array.isArray(arena.team)) {
          arena.team = [];
        }

        arena.team.push(createEmptyArenaTeamMember(this.content, arena));
        arena.partySize = Math.max(Number(arena.partySize || 1), arena.team.length);
        this.render();
      },
      addArenaPoolMember: function () {
        const arena = ensureArenaCatalog(this.content).find((entry) => entry.id === this.devTools.selectedArenaId);
        if (!arena) {
          return;
        }

        if (!Array.isArray(arena.pool)) {
          arena.pool = [];
        }

        arena.pool.push(createEmptyArenaPoolMember(this.content));
        this.render();
      },
      deleteArenaTeamMember: function (teamIndex) {
        const arena = ensureArenaCatalog(this.content).find((entry) => entry.id === this.devTools.selectedArenaId);
        if (!arena || !Array.isArray(arena.team) || !arena.team[teamIndex]) {
          return;
        }

        arena.team.splice(teamIndex, 1);
        arena.partySize = Math.max(1, Math.min(Number(arena.partySize || 1), arena.team.length || 1));
        this.render();
      },
      deleteArenaPoolMember: function (poolIndex) {
        const arena = ensureArenaCatalog(this.content).find((entry) => entry.id === this.devTools.selectedArenaId);
        if (!arena || !Array.isArray(arena.pool) || !arena.pool[poolIndex]) {
          return;
        }

        arena.pool.splice(poolIndex, 1);
        this.render();
      },
      updateArenaTeamMember: function (teamIndex, field, rawValue, shouldRender) {
        const arena = ensureArenaCatalog(this.content).find((entry) => entry.id === this.devTools.selectedArenaId);
        const member = arena?.team?.[teamIndex];
        if (!member) {
          return;
        }

        member[field] = field === "level" ? Math.max(1, Number(rawValue || 1)) : rawValue;
        if (field === "speciesId") {
          const species = getSpecies(this.content, rawValue);
          member.variantId = getSpeciesVariant(species, member.variantId || "default")?.id || species?.variants?.[0]?.id || "default";
        }

        if (shouldRender !== false) {
          this.render();
        }
      },
      updateArenaPoolMember: function (poolIndex, field, rawValue) {
        const arena = ensureArenaCatalog(this.content).find((entry) => entry.id === this.devTools.selectedArenaId);
        const member = arena?.pool?.[poolIndex];
        if (!member) {
          return;
        }

        member[field] = rawValue;
        if (field === "speciesId") {
          const species = getSpecies(this.content, rawValue);
          member.variantId = getSpeciesVariant(species, member.variantId || "default")?.id || species?.variants?.[0]?.id || "default";
        }
        this.render();
      },
      addArena: function () {
        const arenas = ensureArenaCatalog(this.content);
        const next = createEmptyArena(arenas.length + 1);
        arenas.push(next);
        this.devTools.selectedArenaId = next.id;
        this.devTools.section = "arenas";
        this.render();
      },
      duplicateArena: function () {
        const arenas = ensureArenaCatalog(this.content);
        const current = arenas.find((entry) => entry.id === this.devTools.selectedArenaId);
        if (!current) {
          return;
        }

        const duplicate = JSON.parse(JSON.stringify(current));
        duplicate.id = current.id + "-copy";
        duplicate.name = current.name + " Copy";
        duplicate.crestId = (current.crestId || current.id + "-crest") + "-copy";
        duplicate.crestName = current.crestName ? current.crestName + " Copy" : "Copied Crest";
        arenas.push(duplicate);
        this.devTools.selectedArenaId = duplicate.id;
        this.render();
      },
      deleteArena: function () {
        this.content.arenas.arenas = ensureArenaCatalog(this.content).filter((entry) => entry.id !== this.devTools.selectedArenaId);
        syncArenaDevSelection(this.content, this.devTools);
        this.render();
      },
      exportArenasJson: function () {
        const payload = {
          arenas: ensureArenaCatalog(this.content),
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "arenas.json";
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
        if (this.state.screen !== "dev-tools" || !["transitions", "interactions"].includes(this.devTools.editorMode)) {
          return;
        }

        const mapId = this.devTools.selectedMapId;
        const map = this.content.maps[mapId];
        const mapMeta = this.content.mapMetadata[mapId];
        const isInteractionMode = this.devTools.editorMode === "interactions";
        const targetRect = isInteractionMode
          ? getEditableInteractions(mapMeta).find((entry) => entry.id === this.devTools.selectedInteractionId)
          : mapMeta.transitions.find((entry) => entry.id === this.devTools.selectedTransitionId);
        if (!targetRect) {
          return;
        }

        const canvas = event.currentTarget;
        const point = getCanvasPointFromEvent(event, canvas, map, this.devTools.previewZoom);
        const handle = getRectResizeHandleHit(targetRect, point, point);
        if (!handle) {
          return;
        }

        event.preventDefault();
        this.devTools.drag = {
          entityType: isInteractionMode ? "interaction" : "transition",
          type: handle.type,
          entityId: targetRect.id,
          startWorldX: point.worldX,
          startWorldY: point.worldY,
          startWidth: targetRect.width,
          startHeight: targetRect.height,
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
        const targetRect = this.devTools.drag.entityType === "interaction"
          ? getEditableInteractions(mapMeta).find((entry) => entry.id === this.devTools.drag.entityId)
          : mapMeta.transitions.find((entry) => entry.id === this.devTools.drag.entityId);
        if (!targetRect) {
          return;
        }

        const canvas = event.currentTarget;
        const point = getCanvasPointFromEvent(event, canvas, map, this.devTools.previewZoom);
        const tileSize = map.tileSize;
        const deltaX = Math.round((point.worldX - this.devTools.drag.startWorldX) / tileSize) * tileSize;
        const deltaY = Math.round((point.worldY - this.devTools.drag.startWorldY) / tileSize) * tileSize;

        if (this.devTools.drag.type === "right" || this.devTools.drag.type === "corner") {
          targetRect.width = Math.max(tileSize, this.devTools.drag.startWidth + deltaX);
        }

        if (this.devTools.drag.type === "bottom" || this.devTools.drag.type === "corner") {
          targetRect.height = Math.max(tileSize, this.devTools.drag.startHeight + deltaY);
        }

        this.devTools.drag.didDrag = true;
        this.render();
      },
      endDevCanvasInteraction: function () {
        if (!this.devTools.drag) {
          return;
        }

        const drag = this.devTools.drag;
        const didDrag = this.devTools.drag.didDrag;
        this.devTools.drag = null;

        if (didDrag) {
          this.state.message = "Resized " + (drag.entityType === "interaction" ? "interaction " + drag.entityId : "transition " + drag.entityId) + ".";
          this.render();
        }
      },
      update: function (deltaMs) {
        if (this.state.screen === "dev-tools" && this.devTools.section === "characters") {
          ensureCharacterDevSelection(this.devTools, this.content);
          this.devTools.characterSheetAnimation.frameTime += deltaMs;
          while (this.devTools.characterSheetAnimation.frameTime >= PLAYER_WALK_FRAME_MS) {
            this.devTools.characterSheetAnimation.frameTime -= PLAYER_WALK_FRAME_MS;
            this.devTools.characterSheetAnimation.frameIndex = (this.devTools.characterSheetAnimation.frameIndex + 1) % Math.max(1, this.devTools.characterSheetColumns || 4);
          }
          drawCharacterDevCanvases(root, this.devTools);
          return;
        }

        if (this.state.screen !== "world") {
          return;
        }

        if (this.devTools.open) {
          return;
        }

        if (ensureWorldUiState(this.state).activePanel) {
          return;
        }

        const previousUiSignature = getWorldUiSignature(this.state, this.content);
        const hadBattle = Boolean(this.state.battle);
        updateRespawns(this.state, this.content);
        movePlayer(this.state, this.content, deltaMs);
        updateCamera(this.state, this.content, deltaMs);
        const nextUiSignature = getWorldUiSignature(this.state, this.content);

        if (!hadBattle && this.state.battle) {
          this.render();
          return;
        }

        if (previousUiSignature !== nextUiSignature) {
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
          renderTitleScreen(root, this.content, this.saveManager.listSaves(), this.selectedTitleSaveSlotId, (action, value) => {
            if (action === "new-game") this.showNewGameSetup();
            if (action === "continue") this.continueGame();
            if (action === "select-save-slot") {
              this.selectedTitleSaveSlotId = value;
              this.render();
            }
            if (action === "load-save-slot") this.continueGame(value);
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
          if (this.devTools.section === "characters") {
            drawCharacterDevCanvases(root, this.devTools);
          }
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
          updateLiveWorldUi(root);
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
