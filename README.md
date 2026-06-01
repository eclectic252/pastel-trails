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

## Current Scaffold

- `index.html`: app entrypoint
- `src/main.js`: bootstrap and startup flow
- `src/core/contentLoader.js`: JSON loading and basic validation
- `src/core/saveManager.js`: local save index and save writes
- `src/core/createGameState.js`: initial runtime state
- `src/ui/renderApp.js`: prototype UI shell
- `data/`: game content files
- `docs/v1-technical-spec.md`: source-of-truth product spec
