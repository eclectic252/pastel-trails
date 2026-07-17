# Pastel Trails Prototype

This is a browser-first scaffold for the V1 prototype.

## Run Locally

Open `index.html` directly in the browser.

### Direct-open mode

- `index.html` works from `file://`
- the app loads bundled local project content from `src/local-content.js`
- authored map layouts come from `assets/Maps/`
- monster species come from `data/monsters.json`
- skill data comes from `data/skills.json`
- editable metadata overlays come from `data/map-metadata/`
- after editing your maps, monsters, skills, or metadata, rebuild the bundled content with:

```bash
node scripts/build-local-content.mjs
```

- or use either of these shortcuts:

```bash
npm run build:local-content
```

- or double-click [rebuild-local-content.command](/Users/heathersetliff/Documents/Version3/rebuild-local-content.command)

- after running that command, reload `index.html` and the latest project data will be used in any browser without needing `Load Project Folder`
- `Load Project Folder` is still available as an optional live-dev workflow in browsers that support folder access

### Optional HTTP mode

If you ever do want normal `fetch`-based loading later, a static server still works, but it is not required for this scaffold.

### Layered character foreground pieces

Face and eye sheets belong in `assets/Characters/Base/Face/`. They are discovered as
selectable eye layers and render directly above the base spritesheet, while remaining
below clothing, foreground arms, front hair, and accessories:

```text
81_Eyes_Brown.png
81_Eyes_Gray.png
81_Eyes_Teal.png
```

Eye sheets must use the same canvas size and frame layout as the base spritesheet.

Clothing in `assets/Characters/Base/` can include a companion sheet that renders in front of the character's foreground arms. Give the companion the same filename as the main clothing sheet with `_foreground` appended before `.png`:

```text
120_shirt_coldshoulderWhite.png
120_shirt_coldshoulderWhite_foreground.png
```

Both sheets must use the same canvas size and frame layout. The content rebuild pairs them automatically, keeps only the main item in the character clothing picker, and composites the companion after the foreground arms.

Hair can use a two-sheet back/front pair. Put both files in the standalone `assets/Characters/Base/Hair/` folder and give them the same descriptive name after these numeric prefixes:

```text
30_Long_Wavy_Brown.png
190_Long_Wavy_Brown.png
```

The `30_` sheet renders below every other character layer, while the matching `190_` sheet renders above every other character layer. The pair appears as one selectable hairstyle in the Hair control.

Accessories belong in `assets/Characters/Base/Accessories/`. Prefix selectable accessory sheets with a numeric layer greater than the hair foreground layer when they must appear above it:

```text
191_Earrings_GoldHeart.png
```

The numeric prefix controls topmost placement and is omitted from the UI label. A file named `Spritesheet.png` inside a character-part folder is treated as a drawing reference and is not added to the picker.

## Current Scaffold

- `index.html`: app entrypoint
- `src/main.js`: bootstrap and startup flow
- `src/core/contentLoader.js`: JSON loading and basic validation
- `src/core/saveManager.js`: local save index and save writes
- `src/core/createGameState.js`: initial runtime state
- `src/ui/renderApp.js`: prototype UI shell
- `data/`: game content files
- `docs/v1-technical-spec.md`: source-of-truth product spec
