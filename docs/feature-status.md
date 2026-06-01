# Pastel Trails Feature Status

This file is the quick reference for what is currently in the game, what is actively planned next, and what is intentionally not in scope yet.

## Current Features

### Core Runtime

- Browser-only local play from `index.html`
- No backend or server required
- Local bundled content workflow through `src/local-content.js`
- Optional `Load Project Folder` workflow for live file-based content loading
- Local save system with multiple save slots
- Save data persists player state, location, party, settings, and arena progress

### New Game Flow

- Title screen with `New Game`, `Continue`, and Dev Tools access
- Choose starter monster
- Choose starting town
- Choose avatar
- Set player name and save name

### World / Exploration

- Render authored maps from `assets/Maps/...`
- Free movement with keyboard controls
- Collision support from collision layers
- Map transitions between towns and routes
- Real-time clock in the top header
- Overworld UI shell with top header and bottom menu
- Map zoom setting in game view

### Wild Monsters

- Visible wild monsters on the map
- Wild monsters render as monster sprites
- Overworld wild monster labels show:
  - level
  - monster name
  - variant
- Wild encounters trigger on contact
- Spawn points support:
  - spawn chance
  - weighted monster options
  - specific variants
  - respawn timers
- Encounter preview in header with modes:
  - available
  - current
  - available and current

### Battle System

- Popup turn-based battles
- Speed-based turn order
- Player actions:
  - attack
  - item
  - swap
  - catch
  - run
- Trainer/arena battles disable catch and run
- Wild monster capture supports party overflow into bank
- Defeat returns player to the last visited town

### Player Systems

- Party
- Bank
- Registry
- Money
- Saveable settings
- Character panel placeholder

### Settings Available In Game

- Theme
- Map zoom
- Party size
- Share experience
- Show map details
- Encounter preview on/off
- Encounter preview mode
- Arena leader min level
- Arena leader max level
- Arena leader party size

### Interaction System

- Interaction zones on maps
- In-game `E` interaction prompt
- Supported interaction types:
  - sign
  - healing-center
  - shop placeholder
  - arena
  - door placeholder

### Healing Centers

- Dedicated healing-center interaction flow
- Confirmation modal
- Fully restores party HP
- Updates return town checkpoint

### Arenas

- Arena interaction zones can be linked to arena records
- Separate arena data file via `data/arenas.json`
- Arena Dev Tools tab
- Arena records support:
  - arena id
  - name
  - leader name
  - leader title
  - crest id
  - crest name
  - recommended level
  - party size
  - reward money
  - reward notes
  - linked map
  - description
  - leader team
  - fallback pool
- Arena battles can be started from arena interactions
- Arena reward flow supports:
  - money
  - XP
  - crest unlock tracking
- Arena rematches are structurally supported through arena progress and trainer battle flow
- Overflow pool support:
  - authored team used first
  - extra monsters can be pulled from fallback pool
  - repeated pool picks are allowed if needed

### Dev Tools

- Main Dev Tools hub separate from gameplay
- Top-level Dev Tools sections:
  - Maps
  - Towns
  - Arenas
  - Monsters

### Maps Dev Tools

- View all loaded maps
- Preview maps with zoom controls
- Transition editor
- Wild spawn editor
- Interaction editor
- Map settings:
  - display name
  - map type
  - safezone
- Transition target map preview
- Click placement and drag-resize support for transitions and interactions
- Export per-map metadata JSON

### Towns Dev Tools

- Separate towns tab
- Town list
- Town map preview
- Spawn marker placement
- Town settings:
  - town id
  - town name
  - spawn x/y
  - include in starter selection
- Export `towns.json`

### Monsters Dev Tools

- Species editor
- Skills editor
- Variant editing
- Monster sprite preview
- Variant preview selector
- Export `monsters.json`
- Export `skills.json`

## In The Pipeline / To Do

### Arena Expansion

- Improve arena clear/rematch presentation in the arena modal
- Make rematch reward messaging clearer
- Validate overflow pool behavior in live gameplay with more authored data

### Shops And Economy

- Real shop data
- Shop inventory definitions
- Buy flow
- Item descriptions and better inventory presentation
- Give money a stronger gameplay loop

### Trainer / Arena Progression Depth

- Richer trainer records beyond arena leaders
- Arena-specific intros/outros
- Crest-driven progression hooks

### World Interaction Depth

- Expand interaction behavior for:
  - shops
  - doors/interiors
  - NPCs
  - more structured signs/boards

### Character / Progression

- Real character progression
- Character support skills
- More meaningful use of character panel

### Inventory / Monsters / Registry UI Polish

- Better party management
- Better bank management
- Richer registry details
- More readable item info

### Save / UX Improvements

- Clearer source-of-truth messaging between bundled content and project-folder mode
- More visible unsaved/export workflow guidance in Dev Tools

## Explicitly Deferred / Not In Scope Yet

- Quest system
- Befriending system
- Real-time battles
- Overworld battle mode
- Personality bonus system
- Advanced trainer AI
- Shops with deep economy simulation
- Full NPC conversation framework
- Interior map/door system with full building loop
- Multiplayer or online features
- Backend services

## Notes

- This file is a practical status summary, not the full implementation spec.
- The deeper product and schema reference remains in [v1-technical-spec.md](/Users/heathersetliff/Documents/Version3/docs/v1-technical-spec.md).
