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

Character-part filenames may begin with any numeric render priority. Lower numbers are
drawn first and higher numbers are drawn on top, regardless of the part folder. Inside
`assets/Characters/Base/Tops/`, files below priority `100` are listed as Undershirts;
files at `100` or above are listed as Tops. For example:

```text
90_Polo.png          # Undershirt picker; below 100_ pants or skirts
120_Polo.png         # Top picker; above 100_ pants or skirts
```

Files without a numeric prefix use the default slot order. Numeric values between the
existing conventions are supported, so `95_`, `105_`, or `115_` can be used when a
piece needs to sit between neighboring layers.

Character parts may be organized in nested collection folders. The nearest recognized
part folder still determines the slot, while deeper folders become visual-picker
collection headings:

```text
assets/Characters/Base/Bottoms/A-line Skirt/
  100_Aline_skirt_blue.png
  100_Aline_skirt_cream.png
  100_Aline_skirt_short_blue.png
  100_Aline_skirt_short_yellow.png
```

The final color or pattern words in a filename become visual variants of the same
style. In this example the picker shows standard and short A-line skirt styles, with
their available colors beneath each style. Generated part IDs are based on the
filename rather than the collection folder, so reorganizing folders does not change
the saved selection.

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

The numeric prefix controls placement and is omitted from the UI label. A file named `Spritesheet.png` inside a character-part folder is treated as a drawing reference and is not added to the picker.

## Current Scaffold

- `index.html`: app entrypoint
- `src/main.js`: bootstrap and startup flow
- `src/core/contentLoader.js`: JSON loading and basic validation
- `src/core/saveManager.js`: local save index and save writes
- `src/core/createGameState.js`: initial runtime state
- `src/ui/renderApp.js`: prototype UI shell
- `data/`: game content files
- `docs/v1-technical-spec.md`: source-of-truth product spec
