# Pastel Trails Current Requirements

## Purpose

This document captures the current functional requirements of the playable game based on the active runtime implementation in [`src/app.js`](/Users/heathersetliff/Documents/Version3/src/app.js), supported data files in `data/`, and the current browser entrypoint in [`index.html`](/Users/heathersetliff/Documents/Version3/index.html).

It is intended to be a practical, grouped requirements baseline for the current game, not a future-state design spec.

## Review Scope

- Reviewed the active browser runtime in [`src/app.js`](/Users/heathersetliff/Documents/Version3/src/app.js)
- Reviewed current content and metadata structure under `data/` and `assets/`
- Reviewed supporting docs in [`docs/feature-status.md`](/Users/heathersetliff/Documents/Version3/docs/feature-status.md) and [`docs/v1-technical-spec.md`](/Users/heathersetliff/Documents/Version3/docs/v1-technical-spec.md)
- Noted that [`src/main.js`](/Users/heathersetliff/Documents/Version3/src/main.js) and [`src/ui/renderApp.js`](/Users/heathersetliff/Documents/Version3/src/ui/renderApp.js) represent an older scaffold path and are not the current runtime loaded by `index.html`

## 1. Platform And Runtime Requirements

### 1.1 Client Runtime

- The game shall run entirely in the browser with no backend dependency.
- The game shall support direct-open local play from `index.html`.
- The game shall load bundled content from `src/local-content.js` by default.
- The game shall optionally support loading a local project folder through the browser File System Access API when available.
- The game shall persist save data locally in browser storage.

### 1.2 Content Model

- The game shall load gameplay content from JSON-backed data sets for monsters, skills, items, towns, arenas, trainers, settings, themes, maps, map metadata, and character sheets.
- The game shall support authored map art and authored map layout data from `assets/Maps/...`.
- The game shall allow gameplay metadata such as transitions, interactions, NPCs, and wild spawn definitions to be maintained separately from map art/layout.

## 2. Title Screen, Save Flow, And New Game Requirements

### 2.1 Title Screen

- The game shall display a title screen on launch.
- The title screen shall provide `New Game`, `Continue Selected`, `Dev Tools`, and `Load Project Folder` actions.
- The title screen shall display existing local save slots, including player/location summary, money, caught count, crest count, and party preview.
- The title screen shall allow save slot selection, direct load, and delete.

### 2.2 New Game Setup

- The game shall allow the player to create a new game from a dedicated setup screen.
- The setup flow shall require or support selection of:
  - player name
  - optional save name
  - starter monster
  - starter monster variant
  - starting town
  - player avatar
- The setup flow shall support random starter selection.
- The setup flow shall support random starting town selection.
- Only towns marked for starter selection shall appear in the starting town list.

### 2.3 Save Creation And Loading

- Starting a new game shall create a save in the next available local save slot, up to the configured maximum.
- Starting a new game shall immediately create the initial save state.
- Continuing a game shall hydrate saved state into the active runtime.
- Deleting a save shall remove it from the local save index and local storage.
- Manual save shall be available from the in-game world header.

## 3. Overworld And Exploration Requirements

### 3.1 Map Presentation

- The game shall render the current map in a canvas-based world view.
- The overworld UI shall display the current location name, local clock, player money, and encounter preview UI.
- The overworld shall include a bottom menu for opening player panels.

### 3.2 Movement And Input

- The player shall be able to move freely in the overworld using keyboard input.
- The game shall support touch controls for directional movement.
- The player shall have facing direction and walk animation state.
- Player movement shall respect collision data.

### 3.3 Map Progression

- Maps shall support transitions between towns and routes.
- Transition use shall respect a cooldown to prevent rapid repeated transitions.
- Entering a town shall update the player’s town progress when applicable.
- Defeat recovery shall return the player to the last recorded town checkpoint.

### 3.4 World Menus

- The overworld menu shall expose panels for `Map`, `Character`, `Inventory`, `Monsters`, `Notebook`, and `Quests`.
- The `Quests` panel may exist as UI even when quest gameplay is not implemented.

## 4. World Interaction Requirements

### 4.1 Interaction Detection

- The game shall show an interaction prompt when the player is within range of an interactable target.
- Interactable targets shall include world interactions, visible wild monsters, and NPCs.
- The player shall be able to trigger interactions through keyboard or on-screen prompt input.

### 4.2 Supported Interaction Types

- The game shall support at least these interaction types:
  - sign or general text interaction
  - healing-center
  - shop
  - arena
  - door
  - NPC dialogue
  - trainer battle NPCs

### 4.3 Healing Centers

- Healing-center interactions shall open a confirmation flow.
- Confirming healing shall fully restore all party monsters.
- Confirming healing shall update the current town as the player’s return point when the map belongs to a town.

### 4.4 Shops

- Shop interactions shall open a shop modal.
- The shop flow shall allow the player to buy supported items when they have enough money.
- Purchased items shall be added to inventory.
- The current implementation treats shops as item-purchase points and does not yet enforce a distinct per-shop inventory model.

### 4.5 Doors And Signs

- Door interactions shall be supported as interactable world objects.
- Doors may currently display placeholder text when they are not linked to a destination.
- General text interactions shall display authored text content.

### 4.6 NPCs And Trainer Encounters

- NPCs shall support dialogue interactions.
- Dialogue shall support multi-page progression.
- Trainer NPCs shall be able to start trainer battles when linked to trainer records.

## 5. Wild Monster And Encounter Requirements

### 5.1 Visible Overworld Spawns

- Wild monsters shall appear as visible entities on the map.
- Wild monsters shall support authored spawn definitions by map.
- Wild monsters shall show identity details in the encounter preview and battle flow, including monster species, level, and variant.

### 5.2 Spawn Authoring

- Wild spawn definitions shall support:
  - spawn chance
  - weighted species selection
  - variant selection
  - respawn timing
  - map placement

### 5.3 Spawn Lifecycle

- Contact with a visible wild monster shall start a battle.
- Defeated, caught, or befriended wild monsters shall be removed from the map and respawn later based on the configured timer.
- Wild monster levels shall respect configurable minimum and maximum level settings, bounded by progression caps.

## 6. Battle System Requirements

### 6.1 Battle Structure

- Battles shall open in a modal overlay rather than replacing the entire world screen.
- The game shall support wild battles and trainer-style battles.
- Trainer-style battles shall be used for arena leaders and trainer NPCs.
- Battle state shall track the active player monster, active enemy monster, battle log, available menu state, and battle outcome.

### 6.2 Core Battle Actions

- The player shall be able to select:
  - fight
  - use item
  - swap monster
  - catch
  - befriend
  - run
- Catch, befriend, and run shall be disabled for trainer battles.

### 6.3 Turn Resolution

- Battles shall use stat-driven turn resolution with speed as a key battle stat.
- Skills shall support accuracy and can miss.
- Skills shall support direct damage, self modifiers, foe modifiers, and status effects.
- Status handling shall include turn-based processing for effects such as confusion and burn.
- The battle system shall support animation queues, battle log sequencing, and trainer send-out presentation.

### 6.4 Trainer And Arena Battles

- Trainer and arena battles shall support multi-monster enemy rosters.
- The enemy shall send out the next monster when a current monster faints.
- Arena battles shall track arena identifier, crest identifier, reward money, and authored reward text.
- Trainer battles shall support trainer-specific victory text.

### 6.5 Battle Outcomes

- Victory in wild battle shall return the player to the overworld and award XP.
- Victory in trainer or arena battle shall return the player to the overworld and award authored rewards.
- Capture or befriend success shall end the battle and add the monster to party or bank.
- Failing to run, catch, or befriend shall allow the enemy to counterattack.
- Defeat shall heal the active monster back to full and return the player to the last town checkpoint.
- If the active monster faints and another party monster is available, the player shall be prompted to select a replacement.

## 7. Monster, Party, Inventory, And Progression Requirements

### 7.1 Player Collections

- The player shall have:
  - a party
  - a bank
  - a registry/notebook for seen and caught tracking
  - an inventory
  - money

### 7.2 Party Management

- The player shall be able to reorder party members.
- The player shall be able to set the lead monster.
- The player shall be able to move monsters from party to bank, subject to keeping at least one party monster.
- The player shall be able to withdraw monsters from bank into party when under the configured party size limit.

### 7.3 Capture And Overflow

- Captured or befriended monsters shall be added to the party when space is available.
- When the party is full, new monsters shall be sent to the bank.

### 7.4 Monster Stats And Growth

- Monsters shall have level, XP, current HP, and combat stats.
- Monsters shall support stat point allocation by stat.
- Monsters shall support elemental affinity assignment and elemental affinity point allocation.
- Monster stats shall be recalculated when stat point allocation changes.
- Monster growth and reward curves shall be configurable through settings data.

### 7.5 Skills And Unlocks

- Monsters shall have learnable skills.
- Monsters shall be limited to a maximum number of learned skills at one time.
- Skills shall have levels and XP progression.
- Player skill progression shall gate whether a monster may learn or use a given skill.
- Skills may have unlock requirements based on arena clears or prerequisite skill levels.

### 7.6 Registry And Crest Tracking

- The registry shall track seen and caught monsters.
- Arena progression shall track cleared arena IDs and earned crest IDs.
- Town progression shall track visited towns.
- Trainer progression shall track defeated trainer IDs and rematch cooldowns.

## 8. Settings And Player-Facing Configuration Requirements

### 8.1 In-Game Settings

- The settings panel shall support player control of:
  - theme
  - map zoom
  - walk speed
  - party size
  - share experience
  - encounter preview enabled state
  - encounter preview mode
  - wild monster min level
  - wild monster max level
  - arena leader min level
  - arena leader max level
  - arena leader party size
  - trainer refight min level
  - trainer refight max level
  - trainer refight party size
  - trainer refight cooldown seconds

### 8.2 Progression-Aware Settings

- Progression-sensitive level settings shall be clamped against current crest-based level caps.
- Wild monster generation shall refresh when wild encounter level range settings change.

## 9. Arena, Trainer, And Progression Content Requirements

### 9.1 Arena Data

- Arena content shall support records with arena identity, leader identity, crest metadata, recommended level, party size, reward values, description text, authored team members, and fallback pool members.
- Arena interactions shall be able to reference arena records from map metadata.

### 9.2 Trainer Data

- Trainer content shall support records with trainer identity, title, reward data, victory text, authored team members, and fallback pool members.
- NPCs shall be able to reference trainer records from map metadata.

### 9.3 Progression Rules

- Crest progression shall influence level caps and configurable battle ranges.
- Arena and trainer rematch structures shall exist in saved progression state, even if the player-facing rematch UX is still limited.

## 10. Developer Tools And Content Authoring Requirements

### 10.1 Dev Tools Access

- The game shall provide a dedicated Dev Tools mode accessible from the title screen.
- Dev Tools shall support loading a project folder for live content editing workflows.

### 10.2 Dev Tools Sections

- Dev Tools shall provide grouped editing workflows for:
  - maps
  - spawn index
  - towns
  - arenas
  - trainers
  - monsters
  - characters
  - progression

### 10.3 Map Editing

- Map tooling shall support previewing authored maps.
- Map tooling shall support editing transitions, wild spawns, interactions, and NPCs.
- Map tooling shall support click placement and drag resizing for map entities.
- Map tooling shall support export of per-map metadata JSON.

### 10.4 Content Editing

- Town tooling shall support editing starter-town participation and town spawn settings.
- Monster tooling shall support species editing, variant editing, skill editing, and related exports.
- Arena tooling shall support arena record editing, team editing, and fallback pool editing.
- Trainer tooling shall support trainer record editing, team editing, and fallback pool editing.
- Character tooling shall support character sheet selection, metadata editing, and folder resync workflows.
- Progression tooling shall support battle model tuning, elemental matchup tuning, and crest level-cap tuning.

### 10.5 Export Requirements

- Dev Tools shall support export of at least:
  - map metadata JSON
  - towns JSON
  - monsters JSON
  - skills JSON
  - arenas JSON
  - trainers JSON
  - settings JSON

## 11. Data Persistence Requirements

- Save data shall persist player state, world state, settings, arena progress, town progress, trainer progress, party, bank, registry, and inventory.
- Save serialization shall omit transient runtime-only fields such as battle temporary state and camera state.
- Loading save data shall restore missing runtime-only fields needed for active play.

## 12. Current Gaps And Placeholder Requirements

These are important for planning because they appear in the UI or data model but are not yet fully realized.

- The `Quests` menu exists, but quest gameplay is not implemented.
- Shops are functional for purchases, but there is not yet a dedicated authored per-shop inventory system.
- Doors are supported as interactions, but door destination flow is still placeholder-based unless authored otherwise.
- The `Character` area exists, but its long-term gameplay depth is still limited compared with monsters and battles.
- Trainer and arena rematch scaffolding exists in progression and settings, but the player-facing rematch experience is still incomplete.
- Older docs describe befriending as out of scope, but the active implementation currently includes a `befriend` battle action.
- Older docs mention save export/import, but the active title flow currently centers on local browser save slots rather than a full import/export UX.

## 13. Recommended Next Documentation Step

If this document becomes the new baseline, the next useful step would be to split it into:

- `current-requirements.md` for implemented behavior
- `target-requirements.md` for intended future scope
- `known-gaps.md` for differences between implemented behavior and planned design
