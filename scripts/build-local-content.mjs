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

async function loadCharacterSheets() {
  const saved = await readOptionalJson("data/character-sheets.json", { sheets: [] });
  const spriteRoot = path.join(projectRoot, "assets", "Characters", "Boardwalk girl sprite");
  let discovered = [];

  try {
    const pngFiles = await collectPngFiles(spriteRoot);
    discovered = pngFiles.map((absolutePath) => {
      const relativePath = path.relative(projectRoot, absolutePath).split(path.sep).join("/");
      const savedEntry = (saved.sheets || []).find((entry) => entry.path === relativePath);
      const baseId = path.basename(relativePath, path.extname(relativePath))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      return {
        id: savedEntry?.id || baseId,
        label: savedEntry?.label || prettifyCharacterSheetLabel(relativePath),
        playerLabel: savedEntry?.playerLabel || savedEntry?.label || prettifyCharacterSheetLabel(relativePath),
        playerSelectable: savedEntry?.playerSelectable ?? true,
        path: relativePath,
        columns: savedEntry?.columns || 4,
        rows: savedEntry?.rows || 4,
        offsetX: savedEntry?.offsetX || 0,
        offsetY: savedEntry?.offsetY || 0,
        rowOffsets: savedEntry?.rowOffsets || [],
        frameOffsets: savedEntry?.frameOffsets || [],
      };
    });
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
      mapMonstersPanel: rawMeta.mapMonstersPanel || [],
    };
  }

  return metadata;
}

async function buildLocalContent() {
  const [settings, themes, items, skills, monsters, towns, arenas, trainers, characterSheets, maps] = await Promise.all([
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
    readJson("data/trainers.json"),
    loadCharacterSheets(),
    loadMaps(),
  ]);

  const mapMetadata = await loadMapMetadata(Object.keys(maps), maps);

  return {
    settings,
    themes,
    items,
    skills,
    monsters,
    towns,
    arenas,
    trainers,
    characterSheets,
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
