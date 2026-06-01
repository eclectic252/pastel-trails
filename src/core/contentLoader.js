import { embeddedContent } from "./embeddedContent.js";

const CONTENT_FILES = {
  settings: "/data/settings.json",
  themes: "/data/themes.json",
  items: "/data/items.json",
  monsters: "/data/monsters.json",
  towns: "/data/towns.json",
  trainers: "/data/trainers.json",
};

const DIRECTORY_CONTENT_FILES = {
  settings: ["data", "settings.json"],
  themes: ["data", "themes.json"],
  items: ["data", "items.json"],
  monsters: ["data", "monsters.json"],
  towns: ["data", "towns.json"],
  trainers: ["data", "trainers.json"],
};

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load ${path} (${response.status}).`);
  }

  return response.json();
}

function validateUniqueIds(collection, key, label) {
  const seen = new Set();

  for (const entry of collection) {
    const value = entry?.[key];

    if (!value) {
      throw new Error(`${label} entry is missing '${key}'.`);
    }

    if (seen.has(value)) {
      throw new Error(`Duplicate ${label} id '${value}' found.`);
    }

    seen.add(value);
  }
}

async function readJsonFromHandle(directoryHandle, pathParts) {
  let currentHandle = directoryHandle;

  for (const segment of pathParts.slice(0, -1)) {
    currentHandle = await currentHandle.getDirectoryHandle(segment);
  }

  const fileHandle = await currentHandle.getFileHandle(pathParts[pathParts.length - 1]);
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

async function collectJsonFilesRecursive(directoryHandle) {
  const files = [];

  for await (const [name, handle] of directoryHandle.entries()) {
    if (handle.kind === "file" && name.toLowerCase().endsWith(".json")) {
      files.push({
        name,
        data: JSON.parse(await (await handle.getFile()).text()),
      });
    } else if (handle.kind === "directory") {
      const nested = await collectJsonFilesRecursive(handle);
      files.push(...nested);
    }
  }

  return files;
}

function slugify(value) {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function loadMapBundleFromAssetsDirectory(rootHandle) {
  const assetsHandle = await rootHandle.getDirectoryHandle("assets");
  const mapsHandle = await assetsHandle.getDirectoryHandle("Maps");
  const jsonFiles = await collectJsonFilesRecursive(mapsHandle);
  const maps = {};
  const metadata = {};

  for (const file of jsonFiles) {
    const rawName = file.data.Map?.Name || file.name.replace(/\.json$/i, "");
    const mapId = slugify(file.data.Map?.ID || rawName);
    maps[mapId] = file.data;
    metadata[mapId] = await tryReadJsonFromHandle(rootHandle, ["data", "map-metadata", `${mapId}.meta.json`]) || {};
  }

  return { maps, metadata };
}

function validateContent(content) {
  validateUniqueIds(content.monsters.species, "id", "monster species");
  validateUniqueIds(content.items.items, "id", "item");
  validateUniqueIds(content.towns.towns, "id", "town");
  validateUniqueIds(content.themes.themes, "id", "theme");

  for (const town of content.towns.towns) {
    if (!content.maps[town.mapId]) {
      throw new Error(`Town '${town.id}' references missing map '${town.mapId}'.`);
    }
  }
}

function withMeta(content, source) {
  return {
    ...content,
    runtime: {
      source,
      protocol: window.location.protocol,
    },
  };
}

export async function loadGameContent() {
  if (window.location.protocol === "file:") {
    validateContent(embeddedContent);
    return withMeta(embeddedContent, "embedded");
  }

  const baseContentEntries = await Promise.all(
    Object.entries(CONTENT_FILES).map(async ([key, path]) => [key, await fetchJson(path)]),
  );

  const baseContent = Object.fromEntries(baseContentEntries);
  return withMeta({
    ...baseContent,
    maps: {},
    mapMetadata: {},
  }, "fetch");
}

export async function loadGameContentFromDirectory(rootHandle) {
  const baseContentEntries = await Promise.all(
    Object.entries(DIRECTORY_CONTENT_FILES).map(async ([key, pathParts]) => [
      key,
      await readJsonFromHandle(rootHandle, pathParts),
    ]),
  );

  const baseContent = Object.fromEntries(baseContentEntries);
  const mapBundle = await loadMapBundleFromAssetsDirectory(rootHandle);
  const content = {
    ...baseContent,
    maps: mapBundle.maps,
    mapMetadata: mapBundle.metadata,
  };

  validateContent(content);

  return withMeta(content, "directory");
}
