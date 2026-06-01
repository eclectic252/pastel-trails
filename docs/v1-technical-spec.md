# Pastel Trails V1 Technical Spec

## Goal

Build a browser-only, local-first monster RPG that runs entirely in the client with no backend or server calls.

V1 focuses on:

- free-walk overworld exploration
- visible wild monsters on the map
- popup turn-based battles
- save/load with local storage plus save export/import
- file-driven content and tuning through JSON
- in-browser developer tools for editing map metadata

## Product Boundaries

### In Scope for V1

- new game flow
- load existing save
- up to 5 dynamic save slots
- choose starter monster or random starter
- choose starting town or random town
- world map rendering from authored JSON + PNG assets
- free movement with collisions
- visible wild monster spawns
- popup turn-based battle system
- party, bank, and registry
- settings modal with saveable preferences
- developer mode toggle
- metadata editing and JSON export from dev tools

### Out of Scope for V1

- quests
- befriending
- overworld battle mode
- real-time battle mode
- personality bonuses
- shops and item economy depth
- arena leader scaling logic
- badge or crest progression logic
- advanced trainer AI

## Core Gameplay Loop

1. Player opens the game.
2. Player selects `New Game`, `Load Save`, or `Import Save`.
3. If starting a new game:
   - choose a starter monster or random starter
   - choose a starting town or random town
   - choose an avatar
4. Player spawns into the selected town.
5. Player explores the world with free movement.
6. Entering a route or non-town area reveals visible wild monsters.
7. Contact with a wild monster opens a popup battle.
8. Player chooses `Attack`, `Item`, `Swap`, `Catch`, or `Run`.
9. Battle resolves based on turn order from `Speed`.
10. On win, catch, or flee, return to the map.
11. On loss, player returns to the last visited town.
12. Player can save at any time supported by the UI flow.

## Architecture

The game should be organized into three layers:

### 1. Engine Layer

Responsible for:

- movement and input
- collision checks
- map transitions
- visible spawn lifecycle
- battle state machine
- save/load pipeline
- modal and UI state

### 2. Content Layer

Driven by editable JSON files:

- monsters
- items
- towns
- themes
- maps
- map metadata
- trainers
- default settings

### 3. Save Layer

Player-specific mutable state:

- slot metadata
- player profile
- location
- party
- bank
- registry
- inventory
- money
- settings overrides
- active world respawn timers

## Runtime Assumptions

- Reloading the browser is enough to pick up modified JSON files during development.
- No live file watcher is required in V1.
- Saves are local only.
- Save export/import uses JSON files handled fully in the browser.
- Real-world local time is used for UI display.

## Recommended Project Structure

```text
assets/
  Maps/
    Lily Harbor.json
    Lily Harbor.png
data/
  monsters.json
  items.json
  towns.json
  themes.json
  settings.json
  trainers.json
  maps/
  map-metadata/
docs/
  v1-technical-spec.md
```

## Data Strategy

### Short-Term Compatibility

Your current `assets/Maps/Lily Harbor.json` already mixes map definition and metadata:

- map identity
- safezone/town flags
- transitions
- interactions
- wild spawns
- tile size
- layer tile positions

This is acceptable for early development.

### Recommended V1 Direction

As the project grows, split map concerns into:

- renderable map content
- editable gameplay metadata

That allows the same map PNG and tile/layout data to remain stable while metadata changes often in dev tools.

Recommended split:

- `assets/Maps/...` for authored map layout JSON + PNG assets
- `data/map-metadata/<map-id>.meta.json` for editable gameplay metadata

## Content Schemas

The schemas below are design targets, not strict JSON Schema documents yet.

### Monsters

File: `data/monsters.json`

```json
{
  "species": [
    {
      "id": "emberfox",
      "name": "Emberfox",
      "baseStats": {
        "hp": 20,
        "attack": 8,
        "defense": 6,
        "speed": 9
      },
      "growth": "medium",
      "skills": ["basic-attack"],
      "variants": [
        {
          "id": "default",
          "sprite": "assets/monsters/emberfox.png"
        }
      ]
    }
  ]
}
```

Notes:

- `variants` are cosmetic only in V1.
- `skills` are freely usable with no PP or mana system.

### Items

File: `data/items.json`

```json
{
  "items": [
    {
      "id": "basic-orb",
      "name": "Basic Orb",
      "type": "catch",
      "effect": {
        "catchModifier": 1.0
      }
    },
    {
      "id": "small-tonic",
      "name": "Small Tonic",
      "type": "heal",
      "effect": {
        "healAmount": 20
      }
    }
  ]
}
```

### Towns

File: `data/towns.json`

```json
{
  "towns": [
    {
      "id": "lily-harbor",
      "name": "Lily Harbor",
      "mapId": "lily-harbor",
      "spawn": {
        "x": 512,
        "y": 384
      }
    }
  ]
}
```

### Themes

File: `data/themes.json`

```json
{
  "themes": [
    {
      "id": "classic",
      "label": "Classic"
    }
  ]
}
```

### Settings Defaults

File: `data/settings.json`

```json
{
  "defaults": {
    "theme": "classic",
    "zoom": 100,
    "partySize": 6,
    "shareExperience": true,
    "mapDetails": true,
    "devMode": false
  },
  "allowedZoomLevels": [100, 90, 80, 70, 60, 50],
  "maxSaveSlots": 5
}
```

## Map Schema

### Map Render Data

File: `assets/Maps/<map-name>.json`

```json
{
  "id": "lily-harbor",
  "name": "Lily Harbor",
  "kind": "town",
  "safezone": true,
  "tileSize": 128,
  "mapWidth": 30,
  "mapHeight": 19,
  "image": "assets/Maps/Lily Harbor.png",
  "layers": [
    {
      "name": "Ground Layer",
      "positions": [
        { "x": 0, "y": 0, "id": 0 }
      ]
    }
  ]
}
```

### Map Metadata

File: `data/map-metadata/<map-id>.meta.json`

```json
{
  "mapId": "lily-harbor",
  "displayName": "Lily Harbor",
  "isTown": true,
  "safezone": true,
  "collisionGrid": 64,
  "transitions": [
    {
      "id": "to-route-001",
      "x": 1280,
      "y": 1664,
      "width": 128,
      "height": 128,
      "targetMapId": "route-001",
      "targetSpawn": {
        "x": 256,
        "y": 256
      }
    }
  ],
  "interactions": [
    {
      "id": "sign-1",
      "x": 384,
      "y": 640,
      "width": 64,
      "height": 64,
      "type": "text",
      "text": "Welcome to Lily Harbor"
    }
  ],
  "spawnZones": [],
  "trainers": [],
  "mapMonstersPanel": []
}
```

### Route Spawn Example

```json
{
  "mapId": "route-001",
  "displayName": "Moss Route",
  "isTown": false,
  "safezone": false,
  "collisionGrid": 64,
  "transitions": [],
  "interactions": [],
  "spawnZones": [
    {
      "id": "north-field",
      "label": "North Field",
      "bounds": {
        "x": 256,
        "y": 256,
        "width": 1024,
        "height": 1024
      },
      "visibleSpawns": [
        {
          "id": "spawn-1",
          "speciesId": "emberfox",
          "levelMin": 2,
          "levelMax": 4,
          "x": 480,
          "y": 640,
          "respawnSeconds": 120
        }
      ],
      "spawnTable": [
        {
          "speciesId": "emberfox",
          "weight": 60
        },
        {
          "speciesId": "mossmite",
          "weight": 40
        }
      ]
    }
  ],
  "trainers": [],
  "mapMonstersPanel": ["emberfox", "mossmite"]
}
```

## Save Schema

Save data should be portable JSON.

```json
{
  "slotId": "slot-1",
  "saveName": "Lily Harbor Start",
  "updatedAt": "2026-05-31T10:15:00-04:00",
  "player": {
    "name": "Player",
    "avatarId": "avatar-1",
    "money": 250,
    "experience": 0,
    "skills": [],
    "lastTownId": "lily-harbor"
  },
  "world": {
    "currentMapId": "lily-harbor",
    "position": {
      "x": 512,
      "y": 384
    },
    "activeRespawns": [
      {
        "spawnId": "spawn-1",
        "availableAt": "2026-05-31T10:17:00-04:00"
      }
    ]
  },
  "settings": {
    "theme": "classic",
    "zoom": 100,
    "partySize": 6,
    "shareExperience": true,
    "mapDetails": true,
    "devMode": false
  },
  "party": [
    {
      "instanceId": "mon-001",
      "speciesId": "emberfox",
      "variantId": "default",
      "level": 5,
      "xp": 0,
      "stats": {
        "hp": 20,
        "attack": 8,
        "defense": 6,
        "speed": 9
      },
      "currentHp": 20,
      "skills": ["basic-attack"]
    }
  ],
  "bank": [],
  "registry": {
    "seen": ["emberfox"],
    "caught": ["emberfox"]
  },
  "inventory": [
    {
      "itemId": "basic-orb",
      "quantity": 5
    }
  ]
}
```

### Save Slot Rules

- maximum of `5` save slots
- dynamic slot naming
- each slot stores a save preview
- import may overwrite a selected slot or fill an empty one
- export outputs one save file at a time

## System Specifications

### Start and Save Flow

The start screen should support:

- `New Game`
- `Load Save`
- `Import Save`

`New Game` flow:

- choose starter monster or random
- choose town or random
- choose avatar
- create save

`Load Save` flow:

- show current dynamic slots
- show preview info:
  - save name
  - town or map name
  - money
  - party summary
  - last updated timestamp

### Movement and World Navigation

- keyboard movement on desktop
- free-walk movement, not tile-step
- collision checks use metadata-defined grid resolution
- transitions trigger when the player enters a transition rectangle
- current location should always be available in the top UI bar

### Wild Spawns

- wild monsters are visible on the map
- contact with a visible monster starts battle
- if defeated or caught, the visible spawn is removed
- each removed spawn returns after `120` seconds
- respawn timing is saved per save file

### Battle Rules

V1 battle format:

- popup battle only
- 1 active monster per side
- player can swap to another party monster
- if all player party monsters faint, battle is lost
- player returns to `lastTownId` on loss

Player actions:

- `Attack`
- `Item`
- `Swap`
- `Catch`
- `Run`

Battle logic:

- turn order based on `Speed`
- skills do not consume mana or charges
- catch rate based on current HP only
- `shareExperience` is a player setting and can be changed at any time
- if party is full on successful catch, send the monster to bank

### Party, Bank, and Registry

- default party size is `6`
- player can change party size in settings
- registry tracks at least `seen` and `caught`
- monsters modal supports viewing party and bank
- bank supports deposit and withdraw

### Character System

V1 character data includes:

- avatar
- money
- experience placeholder
- battle support skills placeholder
- last visited town

Character gameplay beyond this is intentionally deferred.

### UI Layout

Top bar:

- current location
- real-world local time
- money
- settings button

Bottom navigation:

- `Map`
- `Character`
- `Inventory`
- `Monsters`
- `Registry`
- `Quests`

UI behavior:

- desktop-friendly layout
- mobile-friendly layout
- modal-based panels
- mobile movement arrows shown by default in mobile view
- keyboard input still works if present

## Developer Tools

Dev tools are required in V1.

### Access Model

- controlled by `Dev Mode` setting
- hidden in normal play
- available as a modal or panel when enabled

### V1 Dev Tool Features

- edit map display name
- edit transitions
- edit interaction points
- edit monster spawn points
- edit spawn percentages and spawn tables
- edit available map monsters panel entries
- edit trainer placeholders
- inspect current save and location state
- export updated metadata JSON manually

### V1 Dev Tool Non-Goals

- auto-write files back to disk
- direct file system mutation
- full Tiled replacement
- complex collision painting tools

## UI Screen List

Required screens and modals:

- start screen
- new game modal flow
- load save modal
- import save flow
- main world view
- battle modal
- settings modal
- character modal
- inventory modal
- monsters modal
- registry modal
- map modal
- quests modal placeholder
- dev tools modal

## Validation Rules

The runtime should validate imported or loaded content before use.

Minimum validation:

- map ids must be unique
- monster species ids must be unique
- transitions must target valid map ids
- spawn species ids must exist
- party size must be within supported bounds
- imported saves must match expected shape
- current map id in save must exist in loaded content

## Recommended Implementation Order

1. content loader for JSON files
2. save manager with local save plus JSON export/import
3. map renderer and player movement
4. collisions and map transitions
5. visible spawn system and respawn timers
6. battle state machine
7. party, bank, and registry
8. core modal UI
9. settings persistence
10. developer tools and metadata export
11. responsive and mobile controls polish

## Open Decisions Left for Later

These do not block V1:

- exact damage formula
- exact XP formula
- starter monster roster
- item roster depth
- trainer battle rules
- whether character level affects battle support in V2

## Immediate Next Deliverables

The next implementation documents that would be useful are:

1. a JSON schema pack for content validation
2. a state model for the battle engine
3. a UI wireframe list for each modal
4. a development plan broken into milestones
