import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function readJson(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  const text = await fs.readFile(absolutePath, "utf8");
  return JSON.parse(text);
}

async function readOptionalJson(relativePath, fallback) {
  const absolutePath = path.join(projectRoot, relativePath);

  try {
    const text = await fs.readFile(absolutePath, "utf8");
    return JSON.parse(text);
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }

  return fallback;
}

async function collectJsonFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectJsonFiles(absolutePath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".json")) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function collectPngFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectPngFiles(absolutePath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function collectImageFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectImageFiles(absolutePath));
      continue;
    }

    if (entry.isFile() && /\.(png|webp|jpg|jpeg)$/i.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

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
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isLikelyMonsterSheetPath(relativePath) {
  const normalized = String(relativePath || "").toLowerCase();
  return normalized.includes("/monster spritesheets/")
    || normalized.includes("walksheet")
    || normalized.includes("spritesheet");
}

function isLayeredBaseSheetPath(relativePath) {
  const parts = String(relativePath || "").replace(/\\/g, "/").toLowerCase().split("/");
  const charactersIndex = parts.indexOf("characters");
  return charactersIndex >= 0
    && parts[charactersIndex + 1] === "base"
    && parts.length === charactersIndex + 3;
}

function isLayeredCharacterAssetPath(relativePath) {
  const parts = String(relativePath || "").replace(/\\/g, "/").toLowerCase().split("/");
  const charactersIndex = parts.indexOf("characters");
  return charactersIndex >= 0 && parts[charactersIndex + 1] === "base";
}

function isForegroundArmsSheetPath(pathValue) {
  const parts = String(pathValue || "").replace(/\\/g, "/").toLowerCase().split("/");
  const charactersIndex = parts.indexOf("characters");
  if (charactersIndex < 0 || parts[charactersIndex + 1] !== "base" || parts.length < charactersIndex + 4) {
    return false;
  }
  return String(parts[charactersIndex + 2] || "").replace(/[^a-z]/g, "") === "foregroundarms";
}

function getCharacterLayerAssociationKey(pathValue) {
  return String(pathValue || "")
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/(?:^|[_ -])(?:foreground[_ -]*arms|arms[_ -]*foreground)(?:$|[_ -])/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isForegroundCharacterPartSheetPath(pathValue) {
  const normalizedPath = String(pathValue || "").replace(/\\/g, "/").toLowerCase();
  const fileName = normalizedPath.split("/").pop() || "";
  return /(?:^|[_ -])foreground\.[^.]+$/.test(fileName)
    && !!getLayeredPartSlotFromPath(normalizedPath);
}

function getCharacterPartAssociationKey(pathValue) {
  const normalizedPath = String(pathValue || "")
    .replace(/\\/g, "/")
    .toLowerCase()
    .replace(/\.[^.]+$/, "");
  const pathParts = normalizedPath.split("/");
  const fileName = (pathParts.pop() || "")
    .replace(/^\d+[_ -]+/, "")
    .replace(/(?:[_ -]+foreground)$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return pathParts.concat(fileName).join("/");
}

function getCharacterPartNumericLayer(pathValue) {
  const fileName = String(pathValue || "").replace(/\\/g, "/").split("/").pop() || "";
  const match = fileName.replace(/\.[^.]+$/, "").match(/^(\d+)[_ -]+(.+)$/);
  return match ? Number(match[1]) : null;
}

function isCharacterPartReferenceSheetPath(pathValue) {
  const fileName = String(pathValue || "").replace(/\\/g, "/").split("/").pop() || "";
  return fileName.toLowerCase() === "spritesheet.png";
}

function findForegroundSheetForPart(partSheet, sheets) {
  const associationKey = getCharacterPartAssociationKey(partSheet?.path || partSheet?.id);
  return (sheets || []).find((sheet) => isForegroundCharacterPartSheetPath(sheet?.path)
    && getCharacterPartAssociationKey(sheet.path || sheet.id) === associationKey) || null;
}

function findForegroundArmsSheetForBase(baseSheet, sheets) {
  const baseKey = getCharacterLayerAssociationKey(baseSheet?.path || baseSheet?.id);
  if (!baseKey) {
    return null;
  }
  return (sheets || []).find((sheet) => isForegroundArmsSheetPath(sheet?.path)
    && getCharacterLayerAssociationKey(sheet.path || sheet.id) === baseKey) || null;
}

function getLayeredPartSlotFromPath(relativePath) {
  const parts = String(relativePath || "").replace(/\\/g, "/").toLowerCase().split("/");
  const charactersIndex = parts.indexOf("characters");
  if (charactersIndex < 0 || parts[charactersIndex + 1] !== "base" || parts.length < charactersIndex + 4) {
    return "";
  }
  const fileName = parts[parts.length - 1] || "";
  if (fileName.includes("undershirt")) {
    return "undershirt";
  }
  const slotAliases = {
    eye: "eyes",
    eyes: "eyes",
    face: "eyes",
    hair: "hair",
    hairs: "hair",
    hairstyles: "hair",
    hairstyle: "hair",
    top: "top",
    tops: "top",
    shirt: "top",
    shirts: "top",
    undershirt: "undershirt",
    undershirts: "undershirt",
    bottom: "bottom",
    bottoms: "bottom",
    pants: "bottom",
    shorts: "bottom",
    skirt: "bottom",
    skirts: "bottom",
    shoe: "shoes",
    shoes: "shoes",
    boot: "shoes",
    boots: "shoes",
    accessory: "accessory",
    accessories: "accessory",
  };
  const folder = parts.slice(charactersIndex + 2, -1).reverse().find((candidate) => slotAliases[candidate]);
  return slotAliases[folder] || "";
}

function inferCharacterPartLayerMode(pathValue, slot, existingMode) {
  if (existingMode === "under-bottom" || existingMode === "over-bottom") {
    return existingMode;
  }
  if (slot !== "top") {
    return "";
  }
  const normalizedPath = String(pathValue || "").replace(/\\/g, "/").toLowerCase();
  const pathParts = normalizedPath.split("/");
  const fileName = pathParts[pathParts.length - 1] || "";
  const isTucked = pathParts.includes("tucked") || /(^|[_ -])tucked([_. -]|$)/.test(fileName);
  return isTucked ? "under-bottom" : "over-bottom";
}

function inferCharacterBaseTags(pathValue) {
  const value = String(pathValue || "").toLowerCase();
  if (value.includes("female") || value.includes("girl") || value.includes("woman")) {
    return ["female"];
  }
  if (value.includes("male") || value.includes("boy") || value.includes("man")) {
    return ["male"];
  }
  return [];
}

function normalizeCharacterPartsCatalog(catalog) {
  return {
    layerOrder: Array.isArray(catalog?.layerOrder) ? catalog.layerOrder : [],
    slots: Array.isArray(catalog?.slots) ? catalog.slots : [],
    palettes: catalog?.palettes && typeof catalog.palettes === "object" ? catalog.palettes : {},
    bases: Array.isArray(catalog?.bases) ? catalog.bases : [],
    parts: Array.isArray(catalog?.parts) ? catalog.parts : [],
    presets: Array.isArray(catalog?.presets) ? catalog.presets : [],
  };
}

function mergeLayeredBaseSheets(characterParts, characterSheets) {
  const catalog = normalizeCharacterPartsCatalog(characterParts);
  const baseSheets = (characterSheets?.sheets || []).filter((sheet) => isLayeredBaseSheetPath(sheet.path));
  if (!baseSheets.length) {
    return catalog;
  }

  const existingByPath = new Map(catalog.bases.map((base) => [base.path, base]));
  const existingBySheetId = new Map(catalog.bases.map((base) => [base.sheetId, base]));
  const existingById = new Map(catalog.bases.map((base) => [base.id, base]));
  const previousBases = catalog.bases.slice();
  const previousById = new Map(previousBases.map((base) => [base.id, base]));
  const nextBases = baseSheets.map((sheet) => {
    const existing = existingByPath.get(sheet.path) || existingBySheetId.get(sheet.id) || existingById.get(sheet.id);
    const foregroundArmsSheet = findForegroundArmsSheetForBase(sheet, characterSheets?.sheets || []);
    const fallbackId = slugify((sheet.path || sheet.id || "character-base").replace(/\.[^.]+$/, ""));
    return {
      id: existing?.id || sheet.id || fallbackId,
      label: existing?.label || sheet.playerLabel || sheet.label || prettifyCharacterSheetLabel(sheet.path || sheet.id),
      sheetId: sheet.id,
      path: sheet.path || existing?.path || "",
      foregroundArmsSheetId: foregroundArmsSheet?.id || existing?.foregroundArmsSheetId || "",
      foregroundArmsPath: foregroundArmsSheet?.path || existing?.foregroundArmsPath || "",
      compatibleTags: Array.isArray(existing?.compatibleTags) && existing.compatibleTags.length
        ? existing.compatibleTags
        : inferCharacterBaseTags(sheet.path || sheet.label || sheet.id),
    };
  });
  const nextBaseIds = nextBases.map((base) => base.id);
  const findReplacementBaseId = (oldBaseIds) => {
    const oldTags = new Set(oldBaseIds
      .map((id) => previousById.get(id))
      .filter(Boolean)
      .flatMap((base) => base.compatibleTags || []));
    const taggedMatch = nextBases.find((base) => (base.compatibleTags || []).some((tag) => oldTags.has(tag)));
    return taggedMatch?.id || nextBases[0]?.id || "";
  };
  const remappedParts = catalog.parts.map((part) => {
    if (!Array.isArray(part.compatibleBaseIds) || !part.compatibleBaseIds.length) {
      return part;
    }
    const retained = part.compatibleBaseIds.filter((id) => nextBaseIds.includes(id));
    if (retained.length) {
      return { ...part, compatibleBaseIds: retained };
    }
    const replacementId = findReplacementBaseId(part.compatibleBaseIds);
    return {
      ...part,
      compatibleBaseIds: replacementId ? [replacementId] : [],
    };
  });
  const existingPartsByPath = new Map(remappedParts.map((part) => [part.path, part]));
  const existingPartsBySheetId = new Map(remappedParts.map((part) => [part.sheetId, part]));
  const allLayeredPartSheets = (characterSheets?.sheets || []).filter((sheet) => getLayeredPartSlotFromPath(sheet.path));
  const layeredPartSheets = allLayeredPartSheets.filter((sheet) => !isCharacterPartReferenceSheetPath(sheet.path));
  const numericLayerGroups = new Map();
  layeredPartSheets.forEach((sheet) => {
    const layerNumber = getCharacterPartNumericLayer(sheet.path);
    if (layerNumber !== 30 && layerNumber !== 190) {
      return;
    }
    const key = getCharacterPartAssociationKey(sheet.path || sheet.id);
    if (!numericLayerGroups.has(key)) {
      numericLayerGroups.set(key, new Map());
    }
    numericLayerGroups.get(key).set(layerNumber, sheet);
  });
  const pairedLayerGroups = Array.from(numericLayerGroups.entries()).filter(([, layers]) => layers.has(30) && layers.has(190));
  const pairedLayerPaths = new Set(pairedLayerGroups.flatMap(([, layers]) => [layers.get(30).path, layers.get(190).path]));
  const discoveredParts = layeredPartSheets
    .filter((sheet) => !isForegroundCharacterPartSheetPath(sheet.path) && !pairedLayerPaths.has(sheet.path))
    .map((sheet) => {
      const slot = getLayeredPartSlotFromPath(sheet.path);
      const existing = existingPartsByPath.get(sheet.path) || existingPartsBySheetId.get(sheet.id);
      const foregroundSheet = findForegroundSheetForPart(sheet, layeredPartSheets);
      const renderPriority = getCharacterPartNumericLayer(sheet.path);
      const labelPath = renderPriority === null
        ? sheet.path
        : String(sheet.path || sheet.id)
          .replace(/(^|\/)\d+[_ -]+/i, "$1")
          .replace(/([a-z])([A-Z])/g, "$1 $2");
      const nameKey = getCharacterPartAssociationKey(sheet.path || sheet.id).split("/").pop() || "";
      return {
        id: existing?.id || (slot === "accessory" && nameKey ? slugify(slot + "-" + nameKey) : sheet.id) || slugify((sheet.path || "character-part").replace(/\.[^.]+$/, "")),
        slot,
        label: existing?.label || (renderPriority === null ? (sheet.playerLabel || sheet.label) : "") || prettifyCharacterSheetLabel(labelPath || sheet.id),
        path: sheet.path || existing?.path || "",
        sheetId: sheet.id || existing?.sheetId || "",
        renderPriority: renderPriority ?? existing?.renderPriority ?? null,
        foregroundPath: foregroundSheet?.path || existing?.foregroundPath || "",
        foregroundSheetId: foregroundSheet?.id || existing?.foregroundSheetId || "",
        tintPalette: existing?.tintPalette || "",
        layerMode: inferCharacterPartLayerMode(sheet.path || existing?.path, slot, existing?.layerMode),
        compatibleBaseIds: Array.isArray(existing?.compatibleBaseIds) && existing.compatibleBaseIds.length
          ? existing.compatibleBaseIds
          : nextBaseIds.slice(),
      };
    })
    .concat(pairedLayerGroups.map(([associationKey, layers]) => {
      const belowSheet = layers.get(30);
      const aboveSheet = layers.get(190);
      const existing = remappedParts.find((part) => part.path === belowSheet.path
        || part.sheetId === belowSheet.id
        || part.abovePath === aboveSheet.path
        || part.aboveSheetId === aboveSheet.id);
      const labelPath = String(belowSheet.path || belowSheet.id).replace(/(^|\/)30[_ -]+/i, "$1");
      const slot = getLayeredPartSlotFromPath(belowSheet.path);
      const nameKey = associationKey.split("/").pop() || associationKey;
      return {
        id: existing?.id || slugify(slot + "-" + nameKey),
        slot,
        label: existing?.label || prettifyCharacterSheetLabel(labelPath),
        path: belowSheet.path,
        sheetId: belowSheet.id,
        layerPosition: "below-all",
        abovePath: aboveSheet.path,
        aboveSheetId: aboveSheet.id,
        tintPalette: existing?.tintPalette || "",
        layerMode: "",
        compatibleBaseIds: Array.isArray(existing?.compatibleBaseIds) && existing.compatibleBaseIds.length
          ? existing.compatibleBaseIds
          : nextBaseIds.slice(),
      };
    }));
  const discoveredPartKeys = new Set(allLayeredPartSheets.flatMap((sheet) => [sheet.path, sheet.id]).filter(Boolean));

  return {
    ...catalog,
    bases: nextBases,
    parts: remappedParts
      .filter((part) => !discoveredPartKeys.has(part.path)
        && !discoveredPartKeys.has(part.sheetId)
        && !discoveredPartKeys.has(part.abovePath)
        && !discoveredPartKeys.has(part.aboveSheetId))
      .concat(discoveredParts),
    presets: catalog.presets.map((preset) => {
      const appearance = { ...(preset.appearance || {}) };
      if (!nextBaseIds.includes(appearance.baseId)) {
        appearance.baseId = findReplacementBaseId([appearance.baseId]);
      }
      return {
        ...preset,
        appearance,
      };
    }),
  };
}

async function loadMonsterAssets() {
  const monsterRoot = path.join(projectRoot, "assets", "Monsters");

  try {
    const pngFiles = await collectPngFiles(monsterRoot);
    return {
      images: pngFiles.map((absolutePath) => path.relative(projectRoot, absolutePath).split(path.sep).join("/")).sort(),
    };
  } catch {
    return { images: [] };
  }
}

async function loadTownAssets() {
  const postersRoot = path.join(projectRoot, "assets", "posters");

  try {
    const pngFiles = await collectPngFiles(postersRoot);
    return {
      images: pngFiles.map((absolutePath) => path.relative(projectRoot, absolutePath).split(path.sep).join("/")).sort(),
    };
  } catch {
    return { images: [] };
  }
}

async function loadCrestAssets() {
  const crestRoot = path.join(projectRoot, "assets", "Crests");

  try {
    const pngFiles = await collectPngFiles(crestRoot);
    return {
      images: pngFiles.map((absolutePath) => path.relative(projectRoot, absolutePath).split(path.sep).join("/")).sort(),
    };
  } catch {
    return { images: [] };
  }
}

async function loadBattleBackgroundAssets() {
  const battleBackgroundRoot = path.join(projectRoot, "assets", "Battle Backgrounds");

  try {
    const imageFiles = await collectImageFiles(battleBackgroundRoot);
    return {
      images: imageFiles.map((absolutePath) => path.relative(projectRoot, absolutePath).split(path.sep).join("/")).sort(),
    };
  } catch {
    return { images: [] };
  }
}

async function loadBattleSceneAssets() {
  const battleScenesRoot = path.join(projectRoot, "assets", "Battle Scenes");
  const loadLayer = async (folderName) => {
    const directoryPath = path.join(battleScenesRoot, folderName);
    try {
      const imageFiles = await collectImageFiles(directoryPath);
      return imageFiles.map((absolutePath) => path.relative(projectRoot, absolutePath).split(path.sep).join("/")).sort();
    } catch {
      return [];
    }
  };

  return {
    backgrounds: await loadLayer("Backgrounds"),
    midgrounds: await loadLayer("Midgrounds"),
    foregrounds: await loadLayer("Foregrounds"),
    particles: await loadLayer("Particles"),
  };
}

async function loadCharacterSheets() {
  const saved = await readOptionalJson("data/character-sheets.json", { sheets: [] });
  const spriteRoots = [
    {
      directoryPath: path.join(projectRoot, "assets", "Characters"),
      kind: "character",
      defaultPlayerSelectable: true,
    },
    {
      directoryPath: path.join(projectRoot, "assets", "Monsters"),
      kind: "monster",
      defaultPlayerSelectable: false,
    },
  ];
  let discovered = [];

  try {
    const discoveredMap = new Map();

    for (const spriteRoot of spriteRoots) {
      let pngFiles = [];
      try {
        pngFiles = await collectPngFiles(spriteRoot.directoryPath);
      } catch {
        pngFiles = [];
      }

      pngFiles.forEach((absolutePath) => {
        const relativePath = path.relative(projectRoot, absolutePath).split(path.sep).join("/");
        if (spriteRoot.kind === "monster" && !isLikelyMonsterSheetPath(relativePath)) {
          return;
        }
        const savedEntry = (saved.sheets || []).find((entry) => entry.path === relativePath);
        const isLayeredAsset = isLayeredCharacterAssetPath(relativePath);
        const baseId = relativePath
          .replace(/\.[^.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

        discoveredMap.set(relativePath, {
          id: savedEntry?.id || baseId,
          label: savedEntry?.label || prettifyCharacterSheetLabel(relativePath),
          playerLabel: savedEntry?.playerLabel || savedEntry?.label || prettifyCharacterSheetLabel(relativePath),
          playerSelectable: savedEntry?.playerSelectable ?? (spriteRoot.defaultPlayerSelectable && !isLayeredAsset),
          kind: savedEntry?.kind || spriteRoot.kind,
          group: savedEntry?.group || relativePath.split("/").slice(1, -1).join(" / "),
          path: relativePath,
          columns: savedEntry?.columns || 4,
          rows: savedEntry?.rows || 4,
          frameHeight: savedEntry?.frameHeight || 313,
          offsetX: savedEntry?.offsetX || 0,
          offsetY: savedEntry?.offsetY || 0,
          renderWidth: savedEntry?.renderWidth ?? null,
          rowOffsets: savedEntry?.rowOffsets || [],
          frameOffsets: savedEntry?.frameOffsets || [],
        });
      });
    }

    discovered = Array.from(discoveredMap.values());
  } catch {
    discovered = saved.sheets || [];
  }

  return { sheets: discovered };
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

function normalizeAuthoredMap(rawMap, relativeJsonPath) {
  const mapName = rawMap.Map?.Name || path.basename(relativeJsonPath, ".json");
  const mapId = slugify(rawMap.Map?.ID || mapName);
  const tileSize = rawMap.tile_size;
  const allLayers = rawMap.layers || [];
  const imageRelativePath = relativeJsonPath.replace(/\.json$/i, ".png").split(path.sep).join("/");

  const visualLayers = allLayers.filter((layer) => !/^collision\b/i.test(layer.name || ""));
  const collisionLayers = allLayers
    .filter((layer) => /^collision\b/i.test(layer.name || ""))
    .map((layer) => ({
      ...layer,
      collision: getCollisionProfile(layer.name, tileSize),
    }));

  return {
    id: mapId,
    name: mapName,
    kind: String(rawMap.Map?.Kind || "Town").toLowerCase(),
    safezone: String(rawMap.Map?.Safezone || "False").toLowerCase() === "true",
    tileSize,
    mapWidth: rawMap.map_width,
    mapHeight: rawMap.map_height,
    image: imageRelativePath,
    layers: visualLayers,
    collisionLayers,
    transitions: rawMap.Transitions || [],
    interactions: rawMap.Interactions || [],
    wildSpawns: rawMap["Wild Spawns"] || [],
  };
}

async function loadMaps() {
  const mapsRoot = path.join(projectRoot, "assets", "Maps");
  const mapFiles = await collectJsonFiles(mapsRoot);
  const maps = {};

  for (const absoluteJsonPath of mapFiles) {
    const relativeJsonPath = path.relative(projectRoot, absoluteJsonPath);
    const rawMap = JSON.parse(await fs.readFile(absoluteJsonPath, "utf8"));
    const normalized = normalizeAuthoredMap(rawMap, relativeJsonPath);
    maps[normalized.id] = normalized;
  }

  return maps;
}

async function loadMapMetadata(mapIds, maps) {
  const metadata = {};

  for (const mapId of mapIds) {
    const metadataPath = path.join(projectRoot, "data", "map-metadata", `${mapId}.meta.json`);
    let rawMeta = {};

    try {
      rawMeta = JSON.parse(await fs.readFile(metadataPath, "utf8"));
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }

    const map = maps[mapId];
    metadata[mapId] = {
      mapId,
      displayName: rawMeta.displayName || map.name,
      isTown: rawMeta.isTown ?? (map.kind === "town"),
      safezone: rawMeta.safezone ?? map.safezone,
      collisionGrid: rawMeta.collisionGrid || 64,
      transitions: rawMeta.transitions || map.transitions || [],
      interactions: rawMeta.interactions || map.interactions || [],
      spawnZones: rawMeta.spawnZones || [],
      trainers: rawMeta.trainers || [],
      npcs: rawMeta.npcs || [],
      mapMonstersPanel: rawMeta.mapMonstersPanel || [],
      battleBackgroundMode: String(rawMeta.battleBackgroundMode || "static"),
      battleBackgroundImagePath: String(rawMeta.battleBackgroundImagePath || ""),
      battleBackgroundImagePaths: Array.isArray(rawMeta.battleBackgroundImagePaths)
        ? rawMeta.battleBackgroundImagePaths.map((entry) => String(entry || "")).filter(Boolean)
        : [],
      battleScenePresetId: String(rawMeta.battleScenePresetId || ""),
      battleVisualPool: Array.isArray(rawMeta.battleVisualPool)
        ? rawMeta.battleVisualPool.map((entry) => String(entry || "")).filter(Boolean)
        : [],
    };
  }

  return metadata;
}

async function buildLocalContent() {
  const [settings, themes, items, skills, monsters, towns, arenas, events, trainers, battleScenePresets, rawCharacterParts, characterSheets, monsterAssets, townAssets, crestAssets, battleBackgroundAssets, battleSceneAssets, maps] = await Promise.all([
    readJson("data/settings.json"),
    readJson("data/themes.json"),
    readJson("data/items.json"),
    readOptionalJson("data/skills.json", {
      skills: [
        {
          id: "basic-attack",
          name: "Basic Attack",
          kind: "attack",
          power: 8,
          description: "A simple physical strike.",
        },
      ],
    }),
    readJson("data/monsters.json"),
    readJson("data/towns.json"),
    readOptionalJson("data/arenas.json", { arenas: [] }),
    readOptionalJson("data/events.json", { events: [] }),
    readJson("data/trainers.json"),
    readOptionalJson("data/battle-scenes.json", { presets: [] }),
    readOptionalJson("data/character-parts.json", { layerOrder: [], slots: [], palettes: {}, bases: [], parts: [], presets: [] }),
    loadCharacterSheets(),
    loadMonsterAssets(),
    loadTownAssets(),
    loadCrestAssets(),
    loadBattleBackgroundAssets(),
    loadBattleSceneAssets(),
    loadMaps(),
  ]);

  const mapMetadata = await loadMapMetadata(Object.keys(maps), maps);
  const characterParts = mergeLayeredBaseSheets(rawCharacterParts, characterSheets);

  return {
    settings,
    themes,
    items,
    skills,
    monsters,
    towns,
    arenas,
    events,
    trainers,
    battleScenePresets,
    characterParts,
    characterSheets,
    monsterAssets,
    townAssets,
    crestAssets,
    battleBackgroundAssets,
    battleSceneAssets,
    maps,
    mapMetadata,
  };
}

async function main() {
  const outputPath = path.join(projectRoot, "src", "local-content.js");
  const localContent = await buildLocalContent();
  const output = `window.PASTEL_TRAILS_LOCAL_CONTENT = ${JSON.stringify(localContent, null, 2)};\n`;
  await fs.writeFile(outputPath, output, "utf8");
  process.stdout.write(`Wrote ${path.relative(projectRoot, outputPath)} from project data.\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
