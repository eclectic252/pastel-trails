window.PASTEL_TRAILS_LOCAL_CONTENT = {
  "settings": {
    "defaults": {
      "theme": "classic",
      "zoom": 100,
      "partySize": 6,
      "arenaLeaderMinLevel": 1,
      "arenaLeaderMaxLevel": 10,
      "arenaLeaderPartySize": 3,
      "shareExperience": true,
      "mapDetails": true,
      "encounterPreview": false,
      "encounterPreviewMode": "available",
      "devMode": false
    },
    "allowedZoomLevels": [
      100,
      90,
      80,
      70,
      60,
      50
    ],
    "maxSaveSlots": 5
  },
  "themes": {
    "themes": [
      {
        "id": "classic",
        "label": "Classic"
      }
    ]
  },
  "items": {
    "items": [
      {
        "id": "basic-orb",
        "name": "Basic Orb",
        "type": "catch",
        "effect": {
          "catchModifier": 1
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
  },
  "skills": {
    "skills": [
      {
        "id": "basic-attack",
        "name": "Basic Attack",
        "kind": "attack",
        "power": 8,
        "description": "A simple physical strike."
      }
    ]
  },
  "monsters": {
    "species": [
      {
        "id": "equira",
        "name": "Equira",
        "baseStats": {
          "hp": 20,
          "attack": 8,
          "defense": 6,
          "speed": 9
        },
        "growth": "medium",
        "skills": [
          "basic-attack"
        ],
        "variants": [
          {
            "id": "default",
            "sprite": "assets/Monsters/Equira/equira-classic-ready.png"
          },
          {
            "id": "snow",
            "sprite": "assets/Monsters/Equira/equira-snow-ready.png"
          },
          {
            "id": "Glam",
            "sprite": "assets/Monsters/Equira/equira-rose-ready.png"
          }
        ]
      },
      {
        "id": "fluffram",
        "name": "Fluffram",
        "baseStats": {
          "hp": 18,
          "attack": 7,
          "defense": 7,
          "speed": 6
        },
        "growth": "fast",
        "skills": [
          "basic-attack"
        ],
        "variants": [
          {
            "id": "default",
            "sprite": "assets/monsters/Fluffram/highland-cow-classic-ready.png"
          },
          {
            "id": "snow",
            "sprite": "assets/monsters/Fluffram/highland-cow-snow-ready.png"
          },
          {
            "id": "glam",
            "sprite": "assets/monsters/Fluffram/highland-cow-glam-ready.png"
          }
        ]
      },
      {
        "id": "scalyn",
        "name": "Scalyn",
        "baseStats": {
          "hp": 10,
          "attack": 5,
          "defense": 5,
          "speed": 5
        },
        "growth": "medium",
        "skills": [
          "basic-attack"
        ],
        "variants": [
          {
            "id": "default",
            "sprite": "assets/Monsters/Scalyn/frost_dragon_128x128.png"
          }
        ]
      },
      {
        "id": "Pawlit",
        "name": "Pawlit",
        "baseStats": {
          "hp": 10,
          "attack": 5,
          "defense": 5,
          "speed": 5
        },
        "growth": "medium",
        "skills": [
          "basic-attack"
        ],
        "variants": [
          {
            "id": "default",
            "sprite": "assets/monsters/Pawlit/meadowmew-golden-ready.png"
          },
          {
            "id": "Grass",
            "sprite": "assets/monsters/Pawlit/meadowmew-classic-ready.png"
          },
          {
            "id": "Lilac",
            "sprite": "assets/monsters/Pawlit/meadowmew-lilac-ready.png"
          }
        ]
      }
    ]
  },
  "towns": {
    "towns": [
      {
        "id": "lily-harbor",
        "name": "Lily Harbor",
        "mapId": "lily-harbor",
        "spawn": {
          "x": 1856,
          "y": 1344
        },
        "includeInStarterSelection": true
      },
      {
        "id": "bougainvillea-town",
        "name": "Bougainvillea Town",
        "mapId": "bougainvillea-town",
        "spawn": {
          "x": 1856,
          "y": 960
        },
        "includeInStarterSelection": true
      },
      {
        "id": "camelia-ranch",
        "name": "Camelia Ranch",
        "mapId": "camelia-ranch",
        "spawn": {
          "x": 960,
          "y": 1344
        },
        "includeInStarterSelection": true
      },
      {
        "id": "plumeria-shores",
        "name": "Plumeria Shores",
        "mapId": "plumeria-shores",
        "spawn": {
          "x": 1728,
          "y": 832
        },
        "includeInStarterSelection": true
      },
      {
        "id": "jasmine-bay",
        "name": "Jasmine Bay",
        "mapId": "jasmine-bay",
        "spawn": {
          "x": 1472,
          "y": 960
        },
        "includeInStarterSelection": true
      }
    ]
  },
  "arenas": {
    "arenas": [
      {
        "id": "Lily-Harbor-Arena",
        "name": "Lily Harbor Arena",
        "leaderName": "Heather",
        "leaderTitle": "Leader",
        "crestId": "crest-1",
        "crestName": "Lily Crest",
        "recommendedLevel": 5,
        "partySize": 2,
        "rewardMoney": 50,
        "rewardText": "",
        "description": "",
        "mapId": "lily-harbor",
        "team": [
          {
            "speciesId": "Pawlit",
            "variantId": "default",
            "level": 3
          },
          {
            "speciesId": "Pawlit",
            "variantId": "Grass",
            "level": 5
          }
        ],
        "pool": [
          {
            "speciesId": "Pawlit",
            "variantId": "Lilac"
          }
        ]
      }
    ]
  },
  "trainers": {
    "trainers": []
  },
  "maps": {
    "bougainvillea-town": {
      "id": "bougainvillea-town",
      "name": "Bougainvillea Town",
      "kind": "town",
      "safezone": false,
      "tileSize": 128,
      "mapWidth": 30,
      "mapHeight": 10,
      "image": "assets/Maps/Bougainvillea Town/Bougainvillea Town.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 0
            },
            {
              "x": 0,
              "y": 8,
              "id": 0
            },
            {
              "x": 0,
              "y": 9,
              "id": 0
            },
            {
              "x": 1,
              "y": 0,
              "id": 0
            },
            {
              "x": 1,
              "y": 1,
              "id": 0
            },
            {
              "x": 1,
              "y": 2,
              "id": 0
            },
            {
              "x": 1,
              "y": 3,
              "id": 0
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 0
            },
            {
              "x": 1,
              "y": 8,
              "id": 0
            },
            {
              "x": 1,
              "y": 9,
              "id": 0
            },
            {
              "x": 2,
              "y": 0,
              "id": 0
            },
            {
              "x": 2,
              "y": 1,
              "id": 0
            },
            {
              "x": 2,
              "y": 2,
              "id": 0
            },
            {
              "x": 2,
              "y": 3,
              "id": 0
            },
            {
              "x": 2,
              "y": 4,
              "id": 0
            },
            {
              "x": 2,
              "y": 5,
              "id": 0
            },
            {
              "x": 2,
              "y": 6,
              "id": 0
            },
            {
              "x": 2,
              "y": 7,
              "id": 0
            },
            {
              "x": 2,
              "y": 8,
              "id": 0
            },
            {
              "x": 2,
              "y": 9,
              "id": 0
            },
            {
              "x": 3,
              "y": 0,
              "id": 0
            },
            {
              "x": 3,
              "y": 1,
              "id": 0
            },
            {
              "x": 3,
              "y": 2,
              "id": 0
            },
            {
              "x": 3,
              "y": 3,
              "id": 0
            },
            {
              "x": 3,
              "y": 4,
              "id": 0
            },
            {
              "x": 3,
              "y": 5,
              "id": 0
            },
            {
              "x": 3,
              "y": 6,
              "id": 0
            },
            {
              "x": 3,
              "y": 7,
              "id": 0
            },
            {
              "x": 3,
              "y": 8,
              "id": 0
            },
            {
              "x": 3,
              "y": 9,
              "id": 0
            },
            {
              "x": 4,
              "y": 0,
              "id": 0
            },
            {
              "x": 4,
              "y": 1,
              "id": 0
            },
            {
              "x": 4,
              "y": 2,
              "id": 0
            },
            {
              "x": 4,
              "y": 3,
              "id": 0
            },
            {
              "x": 4,
              "y": 4,
              "id": 0
            },
            {
              "x": 4,
              "y": 5,
              "id": 0
            },
            {
              "x": 4,
              "y": 6,
              "id": 0
            },
            {
              "x": 4,
              "y": 7,
              "id": 0
            },
            {
              "x": 4,
              "y": 8,
              "id": 0
            },
            {
              "x": 4,
              "y": 9,
              "id": 0
            },
            {
              "x": 5,
              "y": 0,
              "id": 0
            },
            {
              "x": 5,
              "y": 1,
              "id": 0
            },
            {
              "x": 5,
              "y": 2,
              "id": 0
            },
            {
              "x": 5,
              "y": 3,
              "id": 0
            },
            {
              "x": 5,
              "y": 4,
              "id": 0
            },
            {
              "x": 5,
              "y": 5,
              "id": 0
            },
            {
              "x": 5,
              "y": 6,
              "id": 0
            },
            {
              "x": 5,
              "y": 7,
              "id": 0
            },
            {
              "x": 5,
              "y": 8,
              "id": 0
            },
            {
              "x": 5,
              "y": 9,
              "id": 0
            },
            {
              "x": 6,
              "y": 0,
              "id": 0
            },
            {
              "x": 6,
              "y": 1,
              "id": 0
            },
            {
              "x": 6,
              "y": 2,
              "id": 0
            },
            {
              "x": 6,
              "y": 3,
              "id": 0
            },
            {
              "x": 6,
              "y": 5,
              "id": 1
            },
            {
              "x": 6,
              "y": 6,
              "id": 1
            },
            {
              "x": 6,
              "y": 7,
              "id": 1
            },
            {
              "x": 6,
              "y": 8,
              "id": 0
            },
            {
              "x": 6,
              "y": 9,
              "id": 0
            },
            {
              "x": 7,
              "y": 0,
              "id": 0
            },
            {
              "x": 7,
              "y": 1,
              "id": 0
            },
            {
              "x": 7,
              "y": 2,
              "id": 0
            },
            {
              "x": 7,
              "y": 3,
              "id": 0
            },
            {
              "x": 7,
              "y": 5,
              "id": 1
            },
            {
              "x": 7,
              "y": 6,
              "id": 1
            },
            {
              "x": 7,
              "y": 7,
              "id": 1
            },
            {
              "x": 7,
              "y": 8,
              "id": 0
            },
            {
              "x": 7,
              "y": 9,
              "id": 0
            },
            {
              "x": 8,
              "y": 0,
              "id": 0
            },
            {
              "x": 8,
              "y": 1,
              "id": 0
            },
            {
              "x": 8,
              "y": 2,
              "id": 0
            },
            {
              "x": 8,
              "y": 3,
              "id": 0
            },
            {
              "x": 8,
              "y": 4,
              "id": 0
            },
            {
              "x": 8,
              "y": 5,
              "id": 1
            },
            {
              "x": 8,
              "y": 6,
              "id": 1
            },
            {
              "x": 8,
              "y": 7,
              "id": 1
            },
            {
              "x": 8,
              "y": 8,
              "id": 0
            },
            {
              "x": 8,
              "y": 9,
              "id": 0
            },
            {
              "x": 9,
              "y": 0,
              "id": 0
            },
            {
              "x": 9,
              "y": 1,
              "id": 0
            },
            {
              "x": 9,
              "y": 2,
              "id": 0
            },
            {
              "x": 9,
              "y": 3,
              "id": 0
            },
            {
              "x": 9,
              "y": 4,
              "id": 0
            },
            {
              "x": 9,
              "y": 5,
              "id": 0
            },
            {
              "x": 9,
              "y": 6,
              "id": 1
            },
            {
              "x": 9,
              "y": 7,
              "id": 1
            },
            {
              "x": 9,
              "y": 8,
              "id": 0
            },
            {
              "x": 9,
              "y": 9,
              "id": 0
            },
            {
              "x": 10,
              "y": 0,
              "id": 0
            },
            {
              "x": 10,
              "y": 1,
              "id": 0
            },
            {
              "x": 10,
              "y": 2,
              "id": 0
            },
            {
              "x": 10,
              "y": 3,
              "id": 0
            },
            {
              "x": 10,
              "y": 4,
              "id": 0
            },
            {
              "x": 10,
              "y": 5,
              "id": 0
            },
            {
              "x": 10,
              "y": 6,
              "id": 1
            },
            {
              "x": 10,
              "y": 7,
              "id": 1
            },
            {
              "x": 10,
              "y": 8,
              "id": 0
            },
            {
              "x": 10,
              "y": 9,
              "id": 0
            },
            {
              "x": 11,
              "y": 0,
              "id": 0
            },
            {
              "x": 11,
              "y": 1,
              "id": 0
            },
            {
              "x": 11,
              "y": 2,
              "id": 0
            },
            {
              "x": 11,
              "y": 3,
              "id": 0
            },
            {
              "x": 11,
              "y": 4,
              "id": 0
            },
            {
              "x": 11,
              "y": 5,
              "id": 0
            },
            {
              "x": 11,
              "y": 6,
              "id": 1
            },
            {
              "x": 11,
              "y": 7,
              "id": 1
            },
            {
              "x": 11,
              "y": 8,
              "id": 0
            },
            {
              "x": 11,
              "y": 9,
              "id": 0
            },
            {
              "x": 12,
              "y": 0,
              "id": 0
            },
            {
              "x": 12,
              "y": 1,
              "id": 0
            },
            {
              "x": 12,
              "y": 3,
              "id": 1
            },
            {
              "x": 12,
              "y": 4,
              "id": 1
            },
            {
              "x": 12,
              "y": 5,
              "id": 1
            },
            {
              "x": 12,
              "y": 6,
              "id": 1
            },
            {
              "x": 12,
              "y": 7,
              "id": 1
            },
            {
              "x": 12,
              "y": 8,
              "id": 1
            },
            {
              "x": 12,
              "y": 9,
              "id": 1
            },
            {
              "x": 13,
              "y": 0,
              "id": 0
            },
            {
              "x": 13,
              "y": 1,
              "id": 0
            },
            {
              "x": 13,
              "y": 3,
              "id": 1
            },
            {
              "x": 13,
              "y": 4,
              "id": 1
            },
            {
              "x": 13,
              "y": 5,
              "id": 1
            },
            {
              "x": 13,
              "y": 6,
              "id": 1
            },
            {
              "x": 13,
              "y": 7,
              "id": 1
            },
            {
              "x": 13,
              "y": 8,
              "id": 1
            },
            {
              "x": 13,
              "y": 9,
              "id": 1
            },
            {
              "x": 14,
              "y": 0,
              "id": 0
            },
            {
              "x": 14,
              "y": 1,
              "id": 0
            },
            {
              "x": 14,
              "y": 3,
              "id": 1
            },
            {
              "x": 14,
              "y": 4,
              "id": 1
            },
            {
              "x": 14,
              "y": 5,
              "id": 1
            },
            {
              "x": 14,
              "y": 6,
              "id": 1
            },
            {
              "x": 14,
              "y": 7,
              "id": 1
            },
            {
              "x": 14,
              "y": 8,
              "id": 1
            },
            {
              "x": 14,
              "y": 9,
              "id": 1
            },
            {
              "x": 15,
              "y": 0,
              "id": 0
            },
            {
              "x": 15,
              "y": 1,
              "id": 0
            },
            {
              "x": 15,
              "y": 3,
              "id": 1
            },
            {
              "x": 15,
              "y": 4,
              "id": 1
            },
            {
              "x": 15,
              "y": 5,
              "id": 1
            },
            {
              "x": 15,
              "y": 6,
              "id": 1
            },
            {
              "x": 15,
              "y": 7,
              "id": 1
            },
            {
              "x": 15,
              "y": 8,
              "id": 1
            },
            {
              "x": 15,
              "y": 9,
              "id": 1
            },
            {
              "x": 16,
              "y": 0,
              "id": 0
            },
            {
              "x": 16,
              "y": 1,
              "id": 0
            },
            {
              "x": 16,
              "y": 2,
              "id": 0
            },
            {
              "x": 16,
              "y": 3,
              "id": 0
            },
            {
              "x": 16,
              "y": 4,
              "id": 0
            },
            {
              "x": 16,
              "y": 5,
              "id": 1
            },
            {
              "x": 16,
              "y": 6,
              "id": 1
            },
            {
              "x": 16,
              "y": 7,
              "id": 1
            },
            {
              "x": 16,
              "y": 8,
              "id": 0
            },
            {
              "x": 16,
              "y": 9,
              "id": 0
            },
            {
              "x": 17,
              "y": 0,
              "id": 0
            },
            {
              "x": 17,
              "y": 1,
              "id": 0
            },
            {
              "x": 17,
              "y": 2,
              "id": 0
            },
            {
              "x": 17,
              "y": 3,
              "id": 0
            },
            {
              "x": 17,
              "y": 4,
              "id": 0
            },
            {
              "x": 17,
              "y": 5,
              "id": 1
            },
            {
              "x": 17,
              "y": 6,
              "id": 1
            },
            {
              "x": 17,
              "y": 7,
              "id": 1
            },
            {
              "x": 17,
              "y": 8,
              "id": 0
            },
            {
              "x": 17,
              "y": 9,
              "id": 0
            },
            {
              "x": 18,
              "y": 0,
              "id": 0
            },
            {
              "x": 18,
              "y": 1,
              "id": 0
            },
            {
              "x": 18,
              "y": 2,
              "id": 0
            },
            {
              "x": 18,
              "y": 3,
              "id": 0
            },
            {
              "x": 18,
              "y": 4,
              "id": 0
            },
            {
              "x": 18,
              "y": 5,
              "id": 1
            },
            {
              "x": 18,
              "y": 6,
              "id": 1
            },
            {
              "x": 18,
              "y": 7,
              "id": 1
            },
            {
              "x": 18,
              "y": 8,
              "id": 0
            },
            {
              "x": 18,
              "y": 9,
              "id": 0
            },
            {
              "x": 19,
              "y": 0,
              "id": 0
            },
            {
              "x": 19,
              "y": 1,
              "id": 0
            },
            {
              "x": 19,
              "y": 2,
              "id": 0
            },
            {
              "x": 19,
              "y": 3,
              "id": 0
            },
            {
              "x": 19,
              "y": 4,
              "id": 0
            },
            {
              "x": 19,
              "y": 5,
              "id": 1
            },
            {
              "x": 19,
              "y": 6,
              "id": 1
            },
            {
              "x": 19,
              "y": 7,
              "id": 1
            },
            {
              "x": 19,
              "y": 8,
              "id": 0
            },
            {
              "x": 19,
              "y": 9,
              "id": 0
            },
            {
              "x": 20,
              "y": 0,
              "id": 0
            },
            {
              "x": 20,
              "y": 1,
              "id": 0
            },
            {
              "x": 20,
              "y": 2,
              "id": 0
            },
            {
              "x": 20,
              "y": 3,
              "id": 0
            },
            {
              "x": 20,
              "y": 4,
              "id": 1
            },
            {
              "x": 20,
              "y": 5,
              "id": 1
            },
            {
              "x": 20,
              "y": 6,
              "id": 1
            },
            {
              "x": 20,
              "y": 7,
              "id": 1
            },
            {
              "x": 20,
              "y": 8,
              "id": 0
            },
            {
              "x": 20,
              "y": 9,
              "id": 0
            },
            {
              "x": 21,
              "y": 0,
              "id": 0
            },
            {
              "x": 21,
              "y": 1,
              "id": 0
            },
            {
              "x": 21,
              "y": 2,
              "id": 0
            },
            {
              "x": 21,
              "y": 4,
              "id": 1
            },
            {
              "x": 21,
              "y": 5,
              "id": 1
            },
            {
              "x": 21,
              "y": 6,
              "id": 1
            },
            {
              "x": 21,
              "y": 7,
              "id": 1
            },
            {
              "x": 21,
              "y": 8,
              "id": 0
            },
            {
              "x": 21,
              "y": 9,
              "id": 0
            },
            {
              "x": 22,
              "y": 0,
              "id": 0
            },
            {
              "x": 22,
              "y": 1,
              "id": 0
            },
            {
              "x": 22,
              "y": 2,
              "id": 0
            },
            {
              "x": 22,
              "y": 4,
              "id": 1
            },
            {
              "x": 22,
              "y": 5,
              "id": 1
            },
            {
              "x": 22,
              "y": 6,
              "id": 1
            },
            {
              "x": 22,
              "y": 7,
              "id": 1
            },
            {
              "x": 22,
              "y": 8,
              "id": 0
            },
            {
              "x": 22,
              "y": 9,
              "id": 0
            },
            {
              "x": 23,
              "y": 0,
              "id": 0
            },
            {
              "x": 23,
              "y": 1,
              "id": 0
            },
            {
              "x": 23,
              "y": 2,
              "id": 0
            },
            {
              "x": 23,
              "y": 3,
              "id": 0
            },
            {
              "x": 23,
              "y": 4,
              "id": 0
            },
            {
              "x": 23,
              "y": 5,
              "id": 0
            },
            {
              "x": 23,
              "y": 6,
              "id": 0
            },
            {
              "x": 23,
              "y": 7,
              "id": 0
            },
            {
              "x": 23,
              "y": 8,
              "id": 0
            },
            {
              "x": 23,
              "y": 9,
              "id": 0
            },
            {
              "x": 24,
              "y": 0,
              "id": 0
            },
            {
              "x": 24,
              "y": 1,
              "id": 0
            },
            {
              "x": 24,
              "y": 2,
              "id": 0
            },
            {
              "x": 24,
              "y": 3,
              "id": 0
            },
            {
              "x": 24,
              "y": 4,
              "id": 0
            },
            {
              "x": 24,
              "y": 5,
              "id": 0
            },
            {
              "x": 24,
              "y": 6,
              "id": 0
            },
            {
              "x": 24,
              "y": 7,
              "id": 0
            },
            {
              "x": 24,
              "y": 8,
              "id": 0
            },
            {
              "x": 24,
              "y": 9,
              "id": 0
            },
            {
              "x": 25,
              "y": 0,
              "id": 0
            },
            {
              "x": 25,
              "y": 1,
              "id": 0
            },
            {
              "x": 25,
              "y": 2,
              "id": 0
            },
            {
              "x": 25,
              "y": 3,
              "id": 0
            },
            {
              "x": 25,
              "y": 4,
              "id": 0
            },
            {
              "x": 25,
              "y": 5,
              "id": 0
            },
            {
              "x": 25,
              "y": 6,
              "id": 0
            },
            {
              "x": 25,
              "y": 7,
              "id": 0
            },
            {
              "x": 25,
              "y": 8,
              "id": 0
            },
            {
              "x": 25,
              "y": 9,
              "id": 0
            },
            {
              "x": 26,
              "y": 0,
              "id": 0
            },
            {
              "x": 26,
              "y": 1,
              "id": 0
            },
            {
              "x": 26,
              "y": 2,
              "id": 0
            },
            {
              "x": 26,
              "y": 3,
              "id": 0
            },
            {
              "x": 26,
              "y": 4,
              "id": 0
            },
            {
              "x": 26,
              "y": 5,
              "id": 0
            },
            {
              "x": 26,
              "y": 6,
              "id": 0
            },
            {
              "x": 26,
              "y": 7,
              "id": 0
            },
            {
              "x": 26,
              "y": 8,
              "id": 0
            },
            {
              "x": 26,
              "y": 9,
              "id": 0
            },
            {
              "x": 27,
              "y": 0,
              "id": 0
            },
            {
              "x": 27,
              "y": 1,
              "id": 0
            },
            {
              "x": 27,
              "y": 2,
              "id": 0
            },
            {
              "x": 27,
              "y": 3,
              "id": 0
            },
            {
              "x": 27,
              "y": 4,
              "id": 0
            },
            {
              "x": 27,
              "y": 5,
              "id": 0
            },
            {
              "x": 27,
              "y": 6,
              "id": 0
            },
            {
              "x": 27,
              "y": 7,
              "id": 0
            },
            {
              "x": 27,
              "y": 8,
              "id": 0
            },
            {
              "x": 27,
              "y": 9,
              "id": 0
            },
            {
              "x": 28,
              "y": 0,
              "id": 0
            },
            {
              "x": 28,
              "y": 1,
              "id": 0
            },
            {
              "x": 28,
              "y": 2,
              "id": 0
            },
            {
              "x": 28,
              "y": 3,
              "id": 0
            },
            {
              "x": 28,
              "y": 4,
              "id": 0
            },
            {
              "x": 28,
              "y": 5,
              "id": 0
            },
            {
              "x": 28,
              "y": 6,
              "id": 0
            },
            {
              "x": 28,
              "y": 7,
              "id": 0
            },
            {
              "x": 28,
              "y": 8,
              "id": 0
            },
            {
              "x": 28,
              "y": 9,
              "id": 0
            },
            {
              "x": 29,
              "y": 0,
              "id": 0
            },
            {
              "x": 29,
              "y": 1,
              "id": 0
            },
            {
              "x": 29,
              "y": 2,
              "id": 0
            },
            {
              "x": 29,
              "y": 3,
              "id": 0
            },
            {
              "x": 29,
              "y": 4,
              "id": 0
            },
            {
              "x": 29,
              "y": 5,
              "id": 0
            },
            {
              "x": 29,
              "y": 6,
              "id": 0
            },
            {
              "x": 29,
              "y": 7,
              "id": 0
            },
            {
              "x": 29,
              "y": 8,
              "id": 0
            },
            {
              "x": 29,
              "y": 9,
              "id": 0
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 2
            },
            {
              "x": 0,
              "y": 1,
              "id": 2
            },
            {
              "x": 0,
              "y": 2,
              "id": 2
            },
            {
              "x": 0,
              "y": 7,
              "id": 2
            },
            {
              "x": 0,
              "y": 8,
              "id": 2
            },
            {
              "x": 1,
              "y": 0,
              "id": 2
            },
            {
              "x": 2,
              "y": 0,
              "id": 2
            },
            {
              "x": 2,
              "y": 3,
              "id": 3
            },
            {
              "x": 3,
              "y": 0,
              "id": 2
            },
            {
              "x": 4,
              "y": 0,
              "id": 2
            },
            {
              "x": 4,
              "y": 1,
              "id": 4
            },
            {
              "x": 4,
              "y": 8,
              "id": 5
            },
            {
              "x": 5,
              "y": 0,
              "id": 2
            },
            {
              "x": 5,
              "y": 1,
              "id": 6
            },
            {
              "x": 6,
              "y": 0,
              "id": 2
            },
            {
              "x": 6,
              "y": 5,
              "id": 7
            },
            {
              "x": 6,
              "y": 6,
              "id": 7
            },
            {
              "x": 6,
              "y": 7,
              "id": 8
            },
            {
              "x": 7,
              "y": 0,
              "id": 2
            },
            {
              "x": 7,
              "y": 7,
              "id": 9
            },
            {
              "x": 8,
              "y": 0,
              "id": 2
            },
            {
              "x": 8,
              "y": 1,
              "id": 10
            },
            {
              "x": 8,
              "y": 2,
              "id": 11
            },
            {
              "x": 8,
              "y": 3,
              "id": 3
            },
            {
              "x": 8,
              "y": 5,
              "id": 12
            },
            {
              "x": 8,
              "y": 6,
              "id": 13
            },
            {
              "x": 8,
              "y": 7,
              "id": 9
            },
            {
              "x": 9,
              "y": 0,
              "id": 2
            },
            {
              "x": 9,
              "y": 1,
              "id": 14
            },
            {
              "x": 9,
              "y": 2,
              "id": 15
            },
            {
              "x": 9,
              "y": 6,
              "id": 16
            },
            {
              "x": 9,
              "y": 7,
              "id": 9
            },
            {
              "x": 10,
              "y": 0,
              "id": 2
            },
            {
              "x": 10,
              "y": 6,
              "id": 16
            },
            {
              "x": 10,
              "y": 7,
              "id": 9
            },
            {
              "x": 11,
              "y": 0,
              "id": 2
            },
            {
              "x": 11,
              "y": 5,
              "id": 17
            },
            {
              "x": 11,
              "y": 6,
              "id": 16
            },
            {
              "x": 11,
              "y": 7,
              "id": 9
            },
            {
              "x": 12,
              "y": 0,
              "id": 2
            },
            {
              "x": 12,
              "y": 3,
              "id": 18
            },
            {
              "x": 12,
              "y": 4,
              "id": 18
            },
            {
              "x": 12,
              "y": 5,
              "id": 18
            },
            {
              "x": 12,
              "y": 6,
              "id": 19
            },
            {
              "x": 12,
              "y": 7,
              "id": 20
            },
            {
              "x": 12,
              "y": 8,
              "id": 18
            },
            {
              "x": 12,
              "y": 9,
              "id": 8
            },
            {
              "x": 13,
              "y": 0,
              "id": 2
            },
            {
              "x": 13,
              "y": 9,
              "id": 9
            },
            {
              "x": 14,
              "y": 0,
              "id": 2
            },
            {
              "x": 14,
              "y": 9,
              "id": 9
            },
            {
              "x": 15,
              "y": 0,
              "id": 2
            },
            {
              "x": 15,
              "y": 3,
              "id": 21
            },
            {
              "x": 15,
              "y": 4,
              "id": 21
            },
            {
              "x": 15,
              "y": 5,
              "id": 13
            },
            {
              "x": 15,
              "y": 7,
              "id": 22
            },
            {
              "x": 15,
              "y": 8,
              "id": 12
            },
            {
              "x": 15,
              "y": 9,
              "id": 23
            },
            {
              "x": 16,
              "y": 0,
              "id": 2
            },
            {
              "x": 16,
              "y": 4,
              "id": 17
            },
            {
              "x": 16,
              "y": 5,
              "id": 16
            },
            {
              "x": 16,
              "y": 7,
              "id": 24
            },
            {
              "x": 17,
              "y": 0,
              "id": 2
            },
            {
              "x": 17,
              "y": 5,
              "id": 16
            },
            {
              "x": 17,
              "y": 7,
              "id": 24
            },
            {
              "x": 18,
              "y": 0,
              "id": 2
            },
            {
              "x": 18,
              "y": 2,
              "id": 5
            },
            {
              "x": 18,
              "y": 5,
              "id": 16
            },
            {
              "x": 18,
              "y": 7,
              "id": 24
            },
            {
              "x": 19,
              "y": 0,
              "id": 2
            },
            {
              "x": 19,
              "y": 5,
              "id": 16
            },
            {
              "x": 19,
              "y": 7,
              "id": 24
            },
            {
              "x": 20,
              "y": 0,
              "id": 2
            },
            {
              "x": 20,
              "y": 4,
              "id": 7
            },
            {
              "x": 20,
              "y": 5,
              "id": 19
            },
            {
              "x": 20,
              "y": 7,
              "id": 24
            },
            {
              "x": 21,
              "y": 0,
              "id": 2
            },
            {
              "x": 21,
              "y": 7,
              "id": 24
            },
            {
              "x": 22,
              "y": 0,
              "id": 2
            },
            {
              "x": 22,
              "y": 4,
              "id": 21
            },
            {
              "x": 22,
              "y": 5,
              "id": 21
            },
            {
              "x": 22,
              "y": 6,
              "id": 21
            },
            {
              "x": 22,
              "y": 7,
              "id": 23
            },
            {
              "x": 23,
              "y": 0,
              "id": 2
            },
            {
              "x": 23,
              "y": 8,
              "id": 5
            },
            {
              "x": 24,
              "y": 0,
              "id": 2
            },
            {
              "x": 24,
              "y": 3,
              "id": 3
            },
            {
              "x": 25,
              "y": 0,
              "id": 2
            },
            {
              "x": 25,
              "y": 9,
              "id": 5
            },
            {
              "x": 26,
              "y": 0,
              "id": 2
            },
            {
              "x": 27,
              "y": 0,
              "id": 2
            },
            {
              "x": 27,
              "y": 9,
              "id": 3
            },
            {
              "x": 28,
              "y": 0,
              "id": 2
            },
            {
              "x": 28,
              "y": 2,
              "id": 5
            },
            {
              "x": 28,
              "y": 5,
              "id": 25
            },
            {
              "x": 28,
              "y": 6,
              "id": 26
            },
            {
              "x": 29,
              "y": 0,
              "id": 2
            },
            {
              "x": 29,
              "y": 1,
              "id": 2
            },
            {
              "x": 29,
              "y": 2,
              "id": 2
            },
            {
              "x": 29,
              "y": 3,
              "id": 2
            },
            {
              "x": 29,
              "y": 4,
              "id": 2
            },
            {
              "x": 29,
              "y": 5,
              "id": 2
            },
            {
              "x": 29,
              "y": 6,
              "id": 2
            },
            {
              "x": 29,
              "y": 7,
              "id": 2
            },
            {
              "x": 29,
              "y": 8,
              "id": 2
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 0,
              "y": 1,
              "id": 27
            },
            {
              "x": 0,
              "y": 9,
              "id": 28
            },
            {
              "x": 1,
              "y": 9,
              "id": 29
            },
            {
              "x": 2,
              "y": 9,
              "id": 29
            },
            {
              "x": 3,
              "y": 0,
              "id": 27
            },
            {
              "x": 3,
              "y": 1,
              "id": 30
            },
            {
              "x": 3,
              "y": 9,
              "id": 29
            },
            {
              "x": 4,
              "y": 9,
              "id": 29
            },
            {
              "x": 5,
              "y": 9,
              "id": 29
            },
            {
              "x": 6,
              "y": 1,
              "id": 30
            },
            {
              "x": 6,
              "y": 9,
              "id": 29
            },
            {
              "x": 7,
              "y": 0,
              "id": 27
            },
            {
              "x": 7,
              "y": 9,
              "id": 29
            },
            {
              "x": 8,
              "y": 9,
              "id": 29
            },
            {
              "x": 9,
              "y": 9,
              "id": 29
            },
            {
              "x": 10,
              "y": 5,
              "id": 30
            },
            {
              "x": 10,
              "y": 9,
              "id": 31
            },
            {
              "x": 11,
              "y": 0,
              "id": 27
            },
            {
              "x": 11,
              "y": 9,
              "id": 32
            },
            {
              "x": 15,
              "y": 0,
              "id": 27
            },
            {
              "x": 16,
              "y": 9,
              "id": 28
            },
            {
              "x": 17,
              "y": 9,
              "id": 31
            },
            {
              "x": 18,
              "y": 3,
              "id": 33
            },
            {
              "x": 18,
              "y": 9,
              "id": 31
            },
            {
              "x": 19,
              "y": 0,
              "id": 27
            },
            {
              "x": 19,
              "y": 4,
              "id": 34
            },
            {
              "x": 19,
              "y": 9,
              "id": 31
            },
            {
              "x": 20,
              "y": 9,
              "id": 31
            },
            {
              "x": 21,
              "y": 9,
              "id": 31
            },
            {
              "x": 22,
              "y": 9,
              "id": 31
            },
            {
              "x": 23,
              "y": 0,
              "id": 27
            },
            {
              "x": 23,
              "y": 9,
              "id": 31
            },
            {
              "x": 24,
              "y": 9,
              "id": 31
            },
            {
              "x": 25,
              "y": 9,
              "id": 31
            },
            {
              "x": 26,
              "y": 9,
              "id": 31
            },
            {
              "x": 27,
              "y": 0,
              "id": 27
            },
            {
              "x": 27,
              "y": 9,
              "id": 31
            },
            {
              "x": 28,
              "y": 7,
              "id": 35
            },
            {
              "x": 28,
              "y": 9,
              "id": 31
            },
            {
              "x": 29,
              "y": 2,
              "id": 27
            },
            {
              "x": 29,
              "y": 6,
              "id": 27
            },
            {
              "x": 29,
              "y": 9,
              "id": 32
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 5,
              "y": 5,
              "id": 36
            },
            {
              "x": 6,
              "y": 5,
              "id": 37
            },
            {
              "x": 7,
              "y": 5,
              "id": 38
            },
            {
              "x": 8,
              "y": 5,
              "id": 39
            },
            {
              "x": 11,
              "y": 2,
              "id": 40
            },
            {
              "x": 11,
              "y": 3,
              "id": 41
            },
            {
              "x": 12,
              "y": 2,
              "id": 42
            },
            {
              "x": 12,
              "y": 3,
              "id": 43
            },
            {
              "x": 13,
              "y": 2,
              "id": 44
            },
            {
              "x": 13,
              "y": 3,
              "id": 45
            },
            {
              "x": 14,
              "y": 2,
              "id": 46
            },
            {
              "x": 14,
              "y": 3,
              "id": 47
            },
            {
              "x": 15,
              "y": 2,
              "id": 48
            },
            {
              "x": 15,
              "y": 3,
              "id": 49
            },
            {
              "x": 16,
              "y": 2,
              "id": 50
            },
            {
              "x": 16,
              "y": 3,
              "id": 51
            },
            {
              "x": 16,
              "y": 7,
              "id": 52
            },
            {
              "x": 20,
              "y": 3,
              "id": 53
            },
            {
              "x": 20,
              "y": 4,
              "id": 54
            },
            {
              "x": 21,
              "y": 3,
              "id": 55
            },
            {
              "x": 21,
              "y": 4,
              "id": 56
            },
            {
              "x": 22,
              "y": 3,
              "id": 57
            },
            {
              "x": 22,
              "y": 4,
              "id": 58
            },
            {
              "x": 23,
              "y": 3,
              "id": 59
            },
            {
              "x": 23,
              "y": 4,
              "id": 60
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": []
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": [
            {
              "x": 0,
              "y": 9,
              "id": 61
            },
            {
              "x": 5,
              "y": 3,
              "id": 62
            },
            {
              "x": 5,
              "y": 4,
              "id": 63
            },
            {
              "x": 6,
              "y": 3,
              "id": 64
            },
            {
              "x": 6,
              "y": 4,
              "id": 65
            },
            {
              "x": 7,
              "y": 3,
              "id": 66
            },
            {
              "x": 7,
              "y": 4,
              "id": 67
            },
            {
              "x": 8,
              "y": 3,
              "id": 68
            },
            {
              "x": 8,
              "y": 4,
              "id": 69
            },
            {
              "x": 10,
              "y": 7,
              "id": 70
            },
            {
              "x": 10,
              "y": 8,
              "id": 17
            },
            {
              "x": 10,
              "y": 9,
              "id": 70
            },
            {
              "x": 11,
              "y": 1,
              "id": 71
            },
            {
              "x": 11,
              "y": 4,
              "id": 70
            },
            {
              "x": 12,
              "y": 0,
              "id": 72
            },
            {
              "x": 12,
              "y": 1,
              "id": 73
            },
            {
              "x": 13,
              "y": 0,
              "id": 74
            },
            {
              "x": 13,
              "y": 1,
              "id": 75
            },
            {
              "x": 14,
              "y": 0,
              "id": 76
            },
            {
              "x": 14,
              "y": 1,
              "id": 77
            },
            {
              "x": 15,
              "y": 0,
              "id": 78
            },
            {
              "x": 15,
              "y": 1,
              "id": 79
            },
            {
              "x": 16,
              "y": 1,
              "id": 80
            },
            {
              "x": 16,
              "y": 3,
              "id": 70
            },
            {
              "x": 16,
              "y": 6,
              "id": 81
            },
            {
              "x": 17,
              "y": 7,
              "id": 70
            },
            {
              "x": 17,
              "y": 8,
              "id": 17
            },
            {
              "x": 17,
              "y": 9,
              "id": 70
            },
            {
              "x": 20,
              "y": 2,
              "id": 82
            },
            {
              "x": 21,
              "y": 2,
              "id": 83
            },
            {
              "x": 22,
              "y": 2,
              "id": 84
            },
            {
              "x": 23,
              "y": 2,
              "id": 85
            },
            {
              "x": 29,
              "y": 9,
              "id": 61
            }
          ]
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 86
            },
            {
              "x": 0,
              "y": 1,
              "id": 86
            },
            {
              "x": 0,
              "y": 2,
              "id": 86
            },
            {
              "x": 0,
              "y": 7,
              "id": 86
            },
            {
              "x": 0,
              "y": 8,
              "id": 86
            },
            {
              "x": 0,
              "y": 9,
              "id": 86
            },
            {
              "x": 1,
              "y": 0,
              "id": 86
            },
            {
              "x": 1,
              "y": 9,
              "id": 86
            },
            {
              "x": 2,
              "y": 0,
              "id": 86
            },
            {
              "x": 2,
              "y": 9,
              "id": 86
            },
            {
              "x": 3,
              "y": 0,
              "id": 86
            },
            {
              "x": 3,
              "y": 1,
              "id": 86
            },
            {
              "x": 3,
              "y": 9,
              "id": 86
            },
            {
              "x": 4,
              "y": 0,
              "id": 86
            },
            {
              "x": 4,
              "y": 1,
              "id": 86
            },
            {
              "x": 4,
              "y": 9,
              "id": 86
            },
            {
              "x": 5,
              "y": 0,
              "id": 86
            },
            {
              "x": 5,
              "y": 1,
              "id": 86
            },
            {
              "x": 5,
              "y": 9,
              "id": 86
            },
            {
              "x": 6,
              "y": 0,
              "id": 86
            },
            {
              "x": 6,
              "y": 1,
              "id": 86
            },
            {
              "x": 6,
              "y": 9,
              "id": 86
            },
            {
              "x": 7,
              "y": 0,
              "id": 86
            },
            {
              "x": 7,
              "y": 9,
              "id": 86
            },
            {
              "x": 8,
              "y": 0,
              "id": 86
            },
            {
              "x": 8,
              "y": 2,
              "id": 86
            },
            {
              "x": 8,
              "y": 9,
              "id": 86
            },
            {
              "x": 9,
              "y": 0,
              "id": 86
            },
            {
              "x": 9,
              "y": 2,
              "id": 86
            },
            {
              "x": 9,
              "y": 9,
              "id": 86
            },
            {
              "x": 10,
              "y": 0,
              "id": 86
            },
            {
              "x": 10,
              "y": 5,
              "id": 86
            },
            {
              "x": 10,
              "y": 8,
              "id": 86
            },
            {
              "x": 10,
              "y": 9,
              "id": 86
            },
            {
              "x": 11,
              "y": 0,
              "id": 86
            },
            {
              "x": 11,
              "y": 2,
              "id": 86
            },
            {
              "x": 11,
              "y": 5,
              "id": 86
            },
            {
              "x": 11,
              "y": 9,
              "id": 86
            },
            {
              "x": 12,
              "y": 0,
              "id": 86
            },
            {
              "x": 12,
              "y": 2,
              "id": 86
            },
            {
              "x": 13,
              "y": 0,
              "id": 86
            },
            {
              "x": 13,
              "y": 2,
              "id": 86
            },
            {
              "x": 14,
              "y": 0,
              "id": 86
            },
            {
              "x": 14,
              "y": 2,
              "id": 86
            },
            {
              "x": 15,
              "y": 0,
              "id": 86
            },
            {
              "x": 15,
              "y": 2,
              "id": 86
            },
            {
              "x": 16,
              "y": 0,
              "id": 86
            },
            {
              "x": 16,
              "y": 2,
              "id": 86
            },
            {
              "x": 16,
              "y": 4,
              "id": 86
            },
            {
              "x": 16,
              "y": 7,
              "id": 86
            },
            {
              "x": 16,
              "y": 9,
              "id": 86
            },
            {
              "x": 17,
              "y": 0,
              "id": 86
            },
            {
              "x": 17,
              "y": 8,
              "id": 86
            },
            {
              "x": 17,
              "y": 9,
              "id": 86
            },
            {
              "x": 18,
              "y": 0,
              "id": 86
            },
            {
              "x": 18,
              "y": 3,
              "id": 86
            },
            {
              "x": 18,
              "y": 9,
              "id": 86
            },
            {
              "x": 19,
              "y": 0,
              "id": 86
            },
            {
              "x": 19,
              "y": 4,
              "id": 86
            },
            {
              "x": 19,
              "y": 9,
              "id": 86
            },
            {
              "x": 20,
              "y": 0,
              "id": 86
            },
            {
              "x": 20,
              "y": 3,
              "id": 86
            },
            {
              "x": 20,
              "y": 9,
              "id": 86
            },
            {
              "x": 21,
              "y": 0,
              "id": 86
            },
            {
              "x": 21,
              "y": 3,
              "id": 86
            },
            {
              "x": 21,
              "y": 9,
              "id": 86
            },
            {
              "x": 22,
              "y": 0,
              "id": 86
            },
            {
              "x": 22,
              "y": 3,
              "id": 86
            },
            {
              "x": 22,
              "y": 9,
              "id": 86
            },
            {
              "x": 23,
              "y": 0,
              "id": 86
            },
            {
              "x": 23,
              "y": 3,
              "id": 86
            },
            {
              "x": 23,
              "y": 9,
              "id": 86
            },
            {
              "x": 24,
              "y": 0,
              "id": 86
            },
            {
              "x": 24,
              "y": 9,
              "id": 86
            },
            {
              "x": 25,
              "y": 0,
              "id": 86
            },
            {
              "x": 25,
              "y": 9,
              "id": 86
            },
            {
              "x": 26,
              "y": 0,
              "id": 86
            },
            {
              "x": 26,
              "y": 9,
              "id": 86
            },
            {
              "x": 27,
              "y": 0,
              "id": 86
            },
            {
              "x": 27,
              "y": 9,
              "id": 86
            },
            {
              "x": 28,
              "y": 0,
              "id": 86
            },
            {
              "x": 28,
              "y": 5,
              "id": 86
            },
            {
              "x": 28,
              "y": 6,
              "id": 86
            },
            {
              "x": 28,
              "y": 7,
              "id": 86
            },
            {
              "x": 28,
              "y": 9,
              "id": 86
            },
            {
              "x": 29,
              "y": 0,
              "id": 86
            },
            {
              "x": 29,
              "y": 1,
              "id": 86
            },
            {
              "x": 29,
              "y": 2,
              "id": 86
            },
            {
              "x": 29,
              "y": 3,
              "id": 86
            },
            {
              "x": 29,
              "y": 4,
              "id": 86
            },
            {
              "x": 29,
              "y": 5,
              "id": 86
            },
            {
              "x": 29,
              "y": 6,
              "id": 86
            },
            {
              "x": 29,
              "y": 7,
              "id": 86
            },
            {
              "x": 29,
              "y": 8,
              "id": 86
            },
            {
              "x": 29,
              "y": 9,
              "id": 86
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - top half",
          "positions": [
            {
              "x": 5,
              "y": 5,
              "id": 86
            },
            {
              "x": 6,
              "y": 5,
              "id": 86
            },
            {
              "x": 7,
              "y": 5,
              "id": 86
            },
            {
              "x": 8,
              "y": 5,
              "id": 86
            },
            {
              "x": 12,
              "y": 3,
              "id": 86
            },
            {
              "x": 13,
              "y": 3,
              "id": 86
            },
            {
              "x": 14,
              "y": 3,
              "id": 86
            },
            {
              "x": 15,
              "y": 3,
              "id": 86
            },
            {
              "x": 20,
              "y": 4,
              "id": 86
            },
            {
              "x": 21,
              "y": 4,
              "id": 86
            },
            {
              "x": 22,
              "y": 4,
              "id": 86
            },
            {
              "x": 23,
              "y": 4,
              "id": 86
            }
          ],
          "collision": {
            "type": "top-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    },
    "camelia-ranch": {
      "id": "camelia-ranch",
      "name": "Camelia Ranch",
      "kind": "town",
      "safezone": false,
      "tileSize": 128,
      "mapWidth": 15,
      "mapHeight": 15,
      "image": "assets/Maps/Camelia Ranch/Camelia Ranch.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 0
            },
            {
              "x": 0,
              "y": 8,
              "id": 0
            },
            {
              "x": 0,
              "y": 9,
              "id": 0
            },
            {
              "x": 0,
              "y": 10,
              "id": 0
            },
            {
              "x": 0,
              "y": 11,
              "id": 0
            },
            {
              "x": 0,
              "y": 12,
              "id": 0
            },
            {
              "x": 0,
              "y": 13,
              "id": 0
            },
            {
              "x": 0,
              "y": 14,
              "id": 0
            },
            {
              "x": 1,
              "y": 0,
              "id": 0
            },
            {
              "x": 1,
              "y": 1,
              "id": 0
            },
            {
              "x": 1,
              "y": 2,
              "id": 0
            },
            {
              "x": 1,
              "y": 3,
              "id": 0
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 0
            },
            {
              "x": 1,
              "y": 8,
              "id": 0
            },
            {
              "x": 1,
              "y": 9,
              "id": 0
            },
            {
              "x": 1,
              "y": 10,
              "id": 0
            },
            {
              "x": 1,
              "y": 11,
              "id": 0
            },
            {
              "x": 1,
              "y": 12,
              "id": 0
            },
            {
              "x": 1,
              "y": 13,
              "id": 0
            },
            {
              "x": 1,
              "y": 14,
              "id": 0
            },
            {
              "x": 2,
              "y": 0,
              "id": 0
            },
            {
              "x": 2,
              "y": 1,
              "id": 0
            },
            {
              "x": 2,
              "y": 2,
              "id": 0
            },
            {
              "x": 2,
              "y": 3,
              "id": 0
            },
            {
              "x": 2,
              "y": 4,
              "id": 0
            },
            {
              "x": 2,
              "y": 5,
              "id": 0
            },
            {
              "x": 2,
              "y": 6,
              "id": 0
            },
            {
              "x": 2,
              "y": 7,
              "id": 0
            },
            {
              "x": 2,
              "y": 8,
              "id": 0
            },
            {
              "x": 2,
              "y": 9,
              "id": 0
            },
            {
              "x": 2,
              "y": 10,
              "id": 0
            },
            {
              "x": 2,
              "y": 11,
              "id": 1
            },
            {
              "x": 2,
              "y": 12,
              "id": 1
            },
            {
              "x": 2,
              "y": 13,
              "id": 1
            },
            {
              "x": 2,
              "y": 14,
              "id": 0
            },
            {
              "x": 3,
              "y": 0,
              "id": 0
            },
            {
              "x": 3,
              "y": 1,
              "id": 0
            },
            {
              "x": 3,
              "y": 2,
              "id": 0
            },
            {
              "x": 3,
              "y": 3,
              "id": 0
            },
            {
              "x": 3,
              "y": 4,
              "id": 0
            },
            {
              "x": 3,
              "y": 5,
              "id": 0
            },
            {
              "x": 3,
              "y": 6,
              "id": 0
            },
            {
              "x": 3,
              "y": 7,
              "id": 0
            },
            {
              "x": 3,
              "y": 8,
              "id": 0
            },
            {
              "x": 3,
              "y": 9,
              "id": 0
            },
            {
              "x": 3,
              "y": 10,
              "id": 0
            },
            {
              "x": 3,
              "y": 11,
              "id": 1
            },
            {
              "x": 3,
              "y": 12,
              "id": 1
            },
            {
              "x": 3,
              "y": 13,
              "id": 1
            },
            {
              "x": 3,
              "y": 14,
              "id": 0
            },
            {
              "x": 4,
              "y": 0,
              "id": 0
            },
            {
              "x": 4,
              "y": 1,
              "id": 0
            },
            {
              "x": 4,
              "y": 2,
              "id": 0
            },
            {
              "x": 4,
              "y": 3,
              "id": 0
            },
            {
              "x": 4,
              "y": 4,
              "id": 0
            },
            {
              "x": 4,
              "y": 5,
              "id": 0
            },
            {
              "x": 4,
              "y": 6,
              "id": 0
            },
            {
              "x": 4,
              "y": 7,
              "id": 0
            },
            {
              "x": 4,
              "y": 8,
              "id": 0
            },
            {
              "x": 4,
              "y": 9,
              "id": 0
            },
            {
              "x": 4,
              "y": 10,
              "id": 0
            },
            {
              "x": 4,
              "y": 11,
              "id": 1
            },
            {
              "x": 4,
              "y": 12,
              "id": 1
            },
            {
              "x": 4,
              "y": 13,
              "id": 1
            },
            {
              "x": 4,
              "y": 14,
              "id": 0
            },
            {
              "x": 5,
              "y": 0,
              "id": 0
            },
            {
              "x": 5,
              "y": 1,
              "id": 0
            },
            {
              "x": 5,
              "y": 2,
              "id": 0
            },
            {
              "x": 5,
              "y": 3,
              "id": 0
            },
            {
              "x": 5,
              "y": 4,
              "id": 0
            },
            {
              "x": 5,
              "y": 5,
              "id": 0
            },
            {
              "x": 5,
              "y": 6,
              "id": 0
            },
            {
              "x": 5,
              "y": 7,
              "id": 1
            },
            {
              "x": 5,
              "y": 8,
              "id": 1
            },
            {
              "x": 5,
              "y": 9,
              "id": 1
            },
            {
              "x": 5,
              "y": 10,
              "id": 1
            },
            {
              "x": 5,
              "y": 11,
              "id": 1
            },
            {
              "x": 5,
              "y": 12,
              "id": 1
            },
            {
              "x": 5,
              "y": 13,
              "id": 1
            },
            {
              "x": 5,
              "y": 14,
              "id": 0
            },
            {
              "x": 6,
              "y": 0,
              "id": 0
            },
            {
              "x": 6,
              "y": 1,
              "id": 0
            },
            {
              "x": 6,
              "y": 2,
              "id": 0
            },
            {
              "x": 6,
              "y": 3,
              "id": 0
            },
            {
              "x": 6,
              "y": 4,
              "id": 0
            },
            {
              "x": 6,
              "y": 5,
              "id": 0
            },
            {
              "x": 6,
              "y": 6,
              "id": 0
            },
            {
              "x": 6,
              "y": 7,
              "id": 1
            },
            {
              "x": 6,
              "y": 8,
              "id": 1
            },
            {
              "x": 6,
              "y": 9,
              "id": 1
            },
            {
              "x": 6,
              "y": 10,
              "id": 1
            },
            {
              "x": 6,
              "y": 11,
              "id": 1
            },
            {
              "x": 6,
              "y": 12,
              "id": 1
            },
            {
              "x": 6,
              "y": 13,
              "id": 1
            },
            {
              "x": 6,
              "y": 14,
              "id": 0
            },
            {
              "x": 7,
              "y": 0,
              "id": 0
            },
            {
              "x": 7,
              "y": 1,
              "id": 0
            },
            {
              "x": 7,
              "y": 2,
              "id": 0
            },
            {
              "x": 7,
              "y": 3,
              "id": 0
            },
            {
              "x": 7,
              "y": 4,
              "id": 0
            },
            {
              "x": 7,
              "y": 5,
              "id": 0
            },
            {
              "x": 7,
              "y": 6,
              "id": 0
            },
            {
              "x": 7,
              "y": 7,
              "id": 1
            },
            {
              "x": 7,
              "y": 8,
              "id": 1
            },
            {
              "x": 7,
              "y": 9,
              "id": 1
            },
            {
              "x": 7,
              "y": 10,
              "id": 1
            },
            {
              "x": 7,
              "y": 11,
              "id": 1
            },
            {
              "x": 7,
              "y": 12,
              "id": 1
            },
            {
              "x": 7,
              "y": 13,
              "id": 1
            },
            {
              "x": 7,
              "y": 14,
              "id": 0
            },
            {
              "x": 8,
              "y": 0,
              "id": 0
            },
            {
              "x": 8,
              "y": 1,
              "id": 0
            },
            {
              "x": 8,
              "y": 2,
              "id": 0
            },
            {
              "x": 8,
              "y": 3,
              "id": 0
            },
            {
              "x": 8,
              "y": 4,
              "id": 0
            },
            {
              "x": 8,
              "y": 5,
              "id": 0
            },
            {
              "x": 8,
              "y": 6,
              "id": 0
            },
            {
              "x": 8,
              "y": 7,
              "id": 1
            },
            {
              "x": 8,
              "y": 8,
              "id": 1
            },
            {
              "x": 8,
              "y": 9,
              "id": 1
            },
            {
              "x": 8,
              "y": 10,
              "id": 1
            },
            {
              "x": 8,
              "y": 11,
              "id": 1
            },
            {
              "x": 8,
              "y": 12,
              "id": 1
            },
            {
              "x": 8,
              "y": 13,
              "id": 1
            },
            {
              "x": 8,
              "y": 14,
              "id": 0
            },
            {
              "x": 9,
              "y": 0,
              "id": 0
            },
            {
              "x": 9,
              "y": 1,
              "id": 0
            },
            {
              "x": 9,
              "y": 2,
              "id": 0
            },
            {
              "x": 9,
              "y": 3,
              "id": 0
            },
            {
              "x": 9,
              "y": 4,
              "id": 0
            },
            {
              "x": 9,
              "y": 5,
              "id": 0
            },
            {
              "x": 9,
              "y": 6,
              "id": 0
            },
            {
              "x": 9,
              "y": 7,
              "id": 0
            },
            {
              "x": 9,
              "y": 8,
              "id": 0
            },
            {
              "x": 9,
              "y": 9,
              "id": 0
            },
            {
              "x": 9,
              "y": 10,
              "id": 0
            },
            {
              "x": 9,
              "y": 11,
              "id": 1
            },
            {
              "x": 9,
              "y": 12,
              "id": 1
            },
            {
              "x": 9,
              "y": 13,
              "id": 1
            },
            {
              "x": 9,
              "y": 14,
              "id": 0
            },
            {
              "x": 10,
              "y": 0,
              "id": 0
            },
            {
              "x": 10,
              "y": 1,
              "id": 0
            },
            {
              "x": 10,
              "y": 2,
              "id": 0
            },
            {
              "x": 10,
              "y": 3,
              "id": 0
            },
            {
              "x": 10,
              "y": 4,
              "id": 0
            },
            {
              "x": 10,
              "y": 5,
              "id": 0
            },
            {
              "x": 10,
              "y": 6,
              "id": 0
            },
            {
              "x": 10,
              "y": 7,
              "id": 0
            },
            {
              "x": 10,
              "y": 8,
              "id": 0
            },
            {
              "x": 10,
              "y": 9,
              "id": 0
            },
            {
              "x": 10,
              "y": 10,
              "id": 0
            },
            {
              "x": 10,
              "y": 11,
              "id": 1
            },
            {
              "x": 10,
              "y": 12,
              "id": 1
            },
            {
              "x": 10,
              "y": 13,
              "id": 1
            },
            {
              "x": 10,
              "y": 14,
              "id": 0
            },
            {
              "x": 11,
              "y": 0,
              "id": 0
            },
            {
              "x": 11,
              "y": 1,
              "id": 0
            },
            {
              "x": 11,
              "y": 2,
              "id": 0
            },
            {
              "x": 11,
              "y": 3,
              "id": 0
            },
            {
              "x": 11,
              "y": 4,
              "id": 0
            },
            {
              "x": 11,
              "y": 5,
              "id": 0
            },
            {
              "x": 11,
              "y": 6,
              "id": 0
            },
            {
              "x": 11,
              "y": 7,
              "id": 0
            },
            {
              "x": 11,
              "y": 8,
              "id": 0
            },
            {
              "x": 11,
              "y": 9,
              "id": 0
            },
            {
              "x": 11,
              "y": 10,
              "id": 0
            },
            {
              "x": 11,
              "y": 11,
              "id": 1
            },
            {
              "x": 11,
              "y": 12,
              "id": 1
            },
            {
              "x": 11,
              "y": 13,
              "id": 1
            },
            {
              "x": 11,
              "y": 14,
              "id": 0
            },
            {
              "x": 12,
              "y": 0,
              "id": 0
            },
            {
              "x": 12,
              "y": 1,
              "id": 0
            },
            {
              "x": 12,
              "y": 2,
              "id": 0
            },
            {
              "x": 12,
              "y": 3,
              "id": 0
            },
            {
              "x": 12,
              "y": 4,
              "id": 0
            },
            {
              "x": 12,
              "y": 5,
              "id": 0
            },
            {
              "x": 12,
              "y": 6,
              "id": 0
            },
            {
              "x": 12,
              "y": 7,
              "id": 0
            },
            {
              "x": 12,
              "y": 8,
              "id": 0
            },
            {
              "x": 12,
              "y": 9,
              "id": 0
            },
            {
              "x": 12,
              "y": 10,
              "id": 0
            },
            {
              "x": 12,
              "y": 11,
              "id": 0
            },
            {
              "x": 12,
              "y": 12,
              "id": 0
            },
            {
              "x": 12,
              "y": 13,
              "id": 0
            },
            {
              "x": 12,
              "y": 14,
              "id": 0
            },
            {
              "x": 13,
              "y": 0,
              "id": 0
            },
            {
              "x": 13,
              "y": 1,
              "id": 0
            },
            {
              "x": 13,
              "y": 2,
              "id": 0
            },
            {
              "x": 13,
              "y": 3,
              "id": 0
            },
            {
              "x": 13,
              "y": 4,
              "id": 0
            },
            {
              "x": 13,
              "y": 5,
              "id": 0
            },
            {
              "x": 13,
              "y": 6,
              "id": 0
            },
            {
              "x": 13,
              "y": 7,
              "id": 0
            },
            {
              "x": 13,
              "y": 8,
              "id": 0
            },
            {
              "x": 13,
              "y": 9,
              "id": 0
            },
            {
              "x": 13,
              "y": 10,
              "id": 0
            },
            {
              "x": 13,
              "y": 11,
              "id": 0
            },
            {
              "x": 13,
              "y": 12,
              "id": 0
            },
            {
              "x": 13,
              "y": 13,
              "id": 0
            },
            {
              "x": 13,
              "y": 14,
              "id": 0
            },
            {
              "x": 14,
              "y": 0,
              "id": 0
            },
            {
              "x": 14,
              "y": 1,
              "id": 0
            },
            {
              "x": 14,
              "y": 2,
              "id": 0
            },
            {
              "x": 14,
              "y": 3,
              "id": 0
            },
            {
              "x": 14,
              "y": 4,
              "id": 0
            },
            {
              "x": 14,
              "y": 5,
              "id": 0
            },
            {
              "x": 14,
              "y": 6,
              "id": 0
            },
            {
              "x": 14,
              "y": 7,
              "id": 0
            },
            {
              "x": 14,
              "y": 8,
              "id": 0
            },
            {
              "x": 14,
              "y": 9,
              "id": 0
            },
            {
              "x": 14,
              "y": 10,
              "id": 0
            },
            {
              "x": 14,
              "y": 11,
              "id": 0
            },
            {
              "x": 14,
              "y": 12,
              "id": 0
            },
            {
              "x": 14,
              "y": 13,
              "id": 0
            },
            {
              "x": 14,
              "y": 14,
              "id": 0
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 2
            },
            {
              "x": 0,
              "y": 1,
              "id": 3
            },
            {
              "x": 0,
              "y": 2,
              "id": 2
            },
            {
              "x": 0,
              "y": 3,
              "id": 3
            },
            {
              "x": 0,
              "y": 4,
              "id": 2
            },
            {
              "x": 0,
              "y": 5,
              "id": 3
            },
            {
              "x": 0,
              "y": 6,
              "id": 2
            },
            {
              "x": 0,
              "y": 7,
              "id": 2
            },
            {
              "x": 0,
              "y": 8,
              "id": 2
            },
            {
              "x": 0,
              "y": 9,
              "id": 2
            },
            {
              "x": 0,
              "y": 10,
              "id": 2
            },
            {
              "x": 0,
              "y": 11,
              "id": 2
            },
            {
              "x": 0,
              "y": 12,
              "id": 2
            },
            {
              "x": 0,
              "y": 13,
              "id": 2
            },
            {
              "x": 0,
              "y": 14,
              "id": 2
            },
            {
              "x": 1,
              "y": 0,
              "id": 3
            },
            {
              "x": 1,
              "y": 6,
              "id": 4
            },
            {
              "x": 1,
              "y": 14,
              "id": 2
            },
            {
              "x": 2,
              "y": 0,
              "id": 2
            },
            {
              "x": 2,
              "y": 6,
              "id": 5
            },
            {
              "x": 2,
              "y": 11,
              "id": 6
            },
            {
              "x": 2,
              "y": 12,
              "id": 6
            },
            {
              "x": 2,
              "y": 13,
              "id": 7
            },
            {
              "x": 2,
              "y": 14,
              "id": 2
            },
            {
              "x": 3,
              "y": 0,
              "id": 3
            },
            {
              "x": 3,
              "y": 6,
              "id": 8
            },
            {
              "x": 3,
              "y": 13,
              "id": 9
            },
            {
              "x": 3,
              "y": 14,
              "id": 2
            },
            {
              "x": 4,
              "y": 0,
              "id": 2
            },
            {
              "x": 4,
              "y": 6,
              "id": 4
            },
            {
              "x": 4,
              "y": 11,
              "id": 10
            },
            {
              "x": 4,
              "y": 12,
              "id": 11
            },
            {
              "x": 4,
              "y": 13,
              "id": 9
            },
            {
              "x": 4,
              "y": 14,
              "id": 2
            },
            {
              "x": 5,
              "y": 0,
              "id": 3
            },
            {
              "x": 5,
              "y": 7,
              "id": 6
            },
            {
              "x": 5,
              "y": 8,
              "id": 6
            },
            {
              "x": 5,
              "y": 9,
              "id": 6
            },
            {
              "x": 5,
              "y": 10,
              "id": 6
            },
            {
              "x": 5,
              "y": 11,
              "id": 6
            },
            {
              "x": 5,
              "y": 12,
              "id": 12
            },
            {
              "x": 5,
              "y": 13,
              "id": 9
            },
            {
              "x": 5,
              "y": 14,
              "id": 2
            },
            {
              "x": 6,
              "y": 0,
              "id": 2
            },
            {
              "x": 6,
              "y": 13,
              "id": 9
            },
            {
              "x": 6,
              "y": 14,
              "id": 2
            },
            {
              "x": 7,
              "y": 0,
              "id": 3
            },
            {
              "x": 7,
              "y": 13,
              "id": 9
            },
            {
              "x": 7,
              "y": 14,
              "id": 2
            },
            {
              "x": 8,
              "y": 0,
              "id": 2
            },
            {
              "x": 8,
              "y": 7,
              "id": 13
            },
            {
              "x": 8,
              "y": 8,
              "id": 13
            },
            {
              "x": 8,
              "y": 9,
              "id": 13
            },
            {
              "x": 8,
              "y": 10,
              "id": 13
            },
            {
              "x": 8,
              "y": 11,
              "id": 13
            },
            {
              "x": 8,
              "y": 12,
              "id": 11
            },
            {
              "x": 8,
              "y": 13,
              "id": 9
            },
            {
              "x": 8,
              "y": 14,
              "id": 2
            },
            {
              "x": 9,
              "y": 0,
              "id": 3
            },
            {
              "x": 9,
              "y": 6,
              "id": 5
            },
            {
              "x": 9,
              "y": 11,
              "id": 14
            },
            {
              "x": 9,
              "y": 12,
              "id": 12
            },
            {
              "x": 9,
              "y": 13,
              "id": 9
            },
            {
              "x": 9,
              "y": 14,
              "id": 2
            },
            {
              "x": 10,
              "y": 0,
              "id": 2
            },
            {
              "x": 10,
              "y": 6,
              "id": 8
            },
            {
              "x": 10,
              "y": 13,
              "id": 9
            },
            {
              "x": 10,
              "y": 14,
              "id": 2
            },
            {
              "x": 11,
              "y": 0,
              "id": 3
            },
            {
              "x": 11,
              "y": 6,
              "id": 15
            },
            {
              "x": 11,
              "y": 11,
              "id": 10
            },
            {
              "x": 11,
              "y": 12,
              "id": 10
            },
            {
              "x": 11,
              "y": 13,
              "id": 16
            },
            {
              "x": 11,
              "y": 14,
              "id": 2
            },
            {
              "x": 12,
              "y": 0,
              "id": 2
            },
            {
              "x": 12,
              "y": 6,
              "id": 17
            },
            {
              "x": 12,
              "y": 14,
              "id": 2
            },
            {
              "x": 13,
              "y": 0,
              "id": 3
            },
            {
              "x": 13,
              "y": 6,
              "id": 8
            },
            {
              "x": 13,
              "y": 14,
              "id": 2
            },
            {
              "x": 14,
              "y": 0,
              "id": 2
            },
            {
              "x": 14,
              "y": 1,
              "id": 3
            },
            {
              "x": 14,
              "y": 2,
              "id": 2
            },
            {
              "x": 14,
              "y": 3,
              "id": 3
            },
            {
              "x": 14,
              "y": 4,
              "id": 2
            },
            {
              "x": 14,
              "y": 5,
              "id": 3
            },
            {
              "x": 14,
              "y": 6,
              "id": 2
            },
            {
              "x": 14,
              "y": 7,
              "id": 2
            },
            {
              "x": 14,
              "y": 8,
              "id": 18
            },
            {
              "x": 14,
              "y": 12,
              "id": 18
            },
            {
              "x": 14,
              "y": 13,
              "id": 2
            },
            {
              "x": 14,
              "y": 14,
              "id": 2
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 5
            },
            {
              "x": 0,
              "y": 6,
              "id": 5
            },
            {
              "x": 1,
              "y": 0,
              "id": 8
            },
            {
              "x": 1,
              "y": 2,
              "id": 19
            },
            {
              "x": 1,
              "y": 7,
              "id": 20
            },
            {
              "x": 1,
              "y": 9,
              "id": 21
            },
            {
              "x": 1,
              "y": 10,
              "id": 22
            },
            {
              "x": 1,
              "y": 11,
              "id": 23
            },
            {
              "x": 2,
              "y": 0,
              "id": 4
            },
            {
              "x": 2,
              "y": 4,
              "id": 24
            },
            {
              "x": 2,
              "y": 5,
              "id": 25
            },
            {
              "x": 2,
              "y": 9,
              "id": 26
            },
            {
              "x": 2,
              "y": 10,
              "id": 27
            },
            {
              "x": 2,
              "y": 11,
              "id": 28
            },
            {
              "x": 3,
              "y": 0,
              "id": 5
            },
            {
              "x": 3,
              "y": 2,
              "id": 29
            },
            {
              "x": 3,
              "y": 9,
              "id": 30
            },
            {
              "x": 3,
              "y": 10,
              "id": 31
            },
            {
              "x": 3,
              "y": 11,
              "id": 32
            },
            {
              "x": 3,
              "y": 13,
              "id": 24
            },
            {
              "x": 4,
              "y": 0,
              "id": 5
            },
            {
              "x": 4,
              "y": 6,
              "id": 33
            },
            {
              "x": 4,
              "y": 7,
              "id": 34
            },
            {
              "x": 4,
              "y": 8,
              "id": 35
            },
            {
              "x": 4,
              "y": 9,
              "id": 36
            },
            {
              "x": 4,
              "y": 10,
              "id": 37
            },
            {
              "x": 4,
              "y": 11,
              "id": 38
            },
            {
              "x": 5,
              "y": 0,
              "id": 4
            },
            {
              "x": 5,
              "y": 6,
              "id": 39
            },
            {
              "x": 5,
              "y": 7,
              "id": 40
            },
            {
              "x": 6,
              "y": 0,
              "id": 5
            },
            {
              "x": 6,
              "y": 6,
              "id": 41
            },
            {
              "x": 6,
              "y": 7,
              "id": 42
            },
            {
              "x": 6,
              "y": 9,
              "id": 43
            },
            {
              "x": 7,
              "y": 0,
              "id": 8
            },
            {
              "x": 7,
              "y": 2,
              "id": 44
            },
            {
              "x": 7,
              "y": 6,
              "id": 45
            },
            {
              "x": 7,
              "y": 7,
              "id": 46
            },
            {
              "x": 7,
              "y": 9,
              "id": 47
            },
            {
              "x": 8,
              "y": 0,
              "id": 4
            },
            {
              "x": 8,
              "y": 6,
              "id": 48
            },
            {
              "x": 8,
              "y": 7,
              "id": 49
            },
            {
              "x": 9,
              "y": 0,
              "id": 5
            },
            {
              "x": 9,
              "y": 2,
              "id": 50
            },
            {
              "x": 9,
              "y": 6,
              "id": 51
            },
            {
              "x": 9,
              "y": 7,
              "id": 52
            },
            {
              "x": 9,
              "y": 9,
              "id": 53
            },
            {
              "x": 9,
              "y": 10,
              "id": 54
            },
            {
              "x": 9,
              "y": 11,
              "id": 55
            },
            {
              "x": 10,
              "y": 0,
              "id": 5
            },
            {
              "x": 10,
              "y": 9,
              "id": 56
            },
            {
              "x": 10,
              "y": 10,
              "id": 57
            },
            {
              "x": 10,
              "y": 11,
              "id": 58
            },
            {
              "x": 11,
              "y": 0,
              "id": 4
            },
            {
              "x": 11,
              "y": 2,
              "id": 44
            },
            {
              "x": 11,
              "y": 9,
              "id": 59
            },
            {
              "x": 11,
              "y": 10,
              "id": 60
            },
            {
              "x": 11,
              "y": 11,
              "id": 61
            },
            {
              "x": 12,
              "y": 0,
              "id": 5
            },
            {
              "x": 12,
              "y": 5,
              "id": 25
            },
            {
              "x": 12,
              "y": 9,
              "id": 62
            },
            {
              "x": 12,
              "y": 10,
              "id": 63
            },
            {
              "x": 12,
              "y": 11,
              "id": 64
            },
            {
              "x": 12,
              "y": 13,
              "id": 65
            },
            {
              "x": 13,
              "y": 0,
              "id": 8
            },
            {
              "x": 13,
              "y": 2,
              "id": 66
            },
            {
              "x": 13,
              "y": 8,
              "id": 65
            },
            {
              "x": 14,
              "y": 0,
              "id": 4
            },
            {
              "x": 14,
              "y": 6,
              "id": 4
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 1,
              "y": 3,
              "id": 67
            },
            {
              "x": 1,
              "y": 5,
              "id": 68
            },
            {
              "x": 1,
              "y": 9,
              "id": 68
            },
            {
              "x": 1,
              "y": 12,
              "id": 25
            },
            {
              "x": 2,
              "y": 8,
              "id": 50
            },
            {
              "x": 3,
              "y": 2,
              "id": 68
            },
            {
              "x": 4,
              "y": 4,
              "id": 69
            },
            {
              "x": 4,
              "y": 9,
              "id": 25
            },
            {
              "x": 7,
              "y": 3,
              "id": 69
            },
            {
              "x": 8,
              "y": 1,
              "id": 69
            },
            {
              "x": 9,
              "y": 4,
              "id": 67
            },
            {
              "x": 9,
              "y": 8,
              "id": 68
            },
            {
              "x": 10,
              "y": 3,
              "id": 69
            },
            {
              "x": 10,
              "y": 8,
              "id": 50
            },
            {
              "x": 12,
              "y": 4,
              "id": 67
            },
            {
              "x": 12,
              "y": 12,
              "id": 25
            },
            {
              "x": 13,
              "y": 10,
              "id": 68
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": []
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": [
            {
              "x": 4,
              "y": 4,
              "id": 70
            },
            {
              "x": 4,
              "y": 5,
              "id": 71
            },
            {
              "x": 5,
              "y": 4,
              "id": 72
            },
            {
              "x": 5,
              "y": 5,
              "id": 73
            },
            {
              "x": 6,
              "y": 4,
              "id": 74
            },
            {
              "x": 6,
              "y": 5,
              "id": 75
            },
            {
              "x": 7,
              "y": 4,
              "id": 76
            },
            {
              "x": 7,
              "y": 5,
              "id": 77
            },
            {
              "x": 8,
              "y": 4,
              "id": 78
            },
            {
              "x": 8,
              "y": 5,
              "id": 79
            },
            {
              "x": 9,
              "y": 4,
              "id": 80
            },
            {
              "x": 9,
              "y": 5,
              "id": 81
            }
          ]
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 82
            },
            {
              "x": 0,
              "y": 1,
              "id": 82
            },
            {
              "x": 0,
              "y": 2,
              "id": 82
            },
            {
              "x": 0,
              "y": 3,
              "id": 82
            },
            {
              "x": 0,
              "y": 4,
              "id": 82
            },
            {
              "x": 0,
              "y": 5,
              "id": 82
            },
            {
              "x": 0,
              "y": 6,
              "id": 82
            },
            {
              "x": 0,
              "y": 7,
              "id": 82
            },
            {
              "x": 0,
              "y": 8,
              "id": 82
            },
            {
              "x": 0,
              "y": 9,
              "id": 82
            },
            {
              "x": 0,
              "y": 10,
              "id": 82
            },
            {
              "x": 0,
              "y": 11,
              "id": 82
            },
            {
              "x": 0,
              "y": 12,
              "id": 82
            },
            {
              "x": 0,
              "y": 13,
              "id": 82
            },
            {
              "x": 0,
              "y": 14,
              "id": 82
            },
            {
              "x": 1,
              "y": 0,
              "id": 82
            },
            {
              "x": 1,
              "y": 2,
              "id": 82
            },
            {
              "x": 1,
              "y": 6,
              "id": 82
            },
            {
              "x": 1,
              "y": 7,
              "id": 82
            },
            {
              "x": 1,
              "y": 10,
              "id": 82
            },
            {
              "x": 1,
              "y": 14,
              "id": 82
            },
            {
              "x": 2,
              "y": 0,
              "id": 82
            },
            {
              "x": 2,
              "y": 6,
              "id": 82
            },
            {
              "x": 2,
              "y": 10,
              "id": 82
            },
            {
              "x": 2,
              "y": 14,
              "id": 82
            },
            {
              "x": 3,
              "y": 0,
              "id": 82
            },
            {
              "x": 3,
              "y": 6,
              "id": 82
            },
            {
              "x": 3,
              "y": 10,
              "id": 82
            },
            {
              "x": 3,
              "y": 14,
              "id": 82
            },
            {
              "x": 4,
              "y": 0,
              "id": 82
            },
            {
              "x": 4,
              "y": 6,
              "id": 82
            },
            {
              "x": 4,
              "y": 10,
              "id": 82
            },
            {
              "x": 4,
              "y": 14,
              "id": 82
            },
            {
              "x": 5,
              "y": 0,
              "id": 82
            },
            {
              "x": 5,
              "y": 6,
              "id": 82
            },
            {
              "x": 5,
              "y": 14,
              "id": 82
            },
            {
              "x": 6,
              "y": 0,
              "id": 82
            },
            {
              "x": 6,
              "y": 6,
              "id": 82
            },
            {
              "x": 6,
              "y": 14,
              "id": 82
            },
            {
              "x": 7,
              "y": 0,
              "id": 82
            },
            {
              "x": 7,
              "y": 6,
              "id": 82
            },
            {
              "x": 7,
              "y": 14,
              "id": 82
            },
            {
              "x": 8,
              "y": 0,
              "id": 82
            },
            {
              "x": 8,
              "y": 6,
              "id": 82
            },
            {
              "x": 8,
              "y": 14,
              "id": 82
            },
            {
              "x": 9,
              "y": 0,
              "id": 82
            },
            {
              "x": 9,
              "y": 6,
              "id": 82
            },
            {
              "x": 9,
              "y": 10,
              "id": 82
            },
            {
              "x": 9,
              "y": 14,
              "id": 82
            },
            {
              "x": 10,
              "y": 0,
              "id": 82
            },
            {
              "x": 10,
              "y": 6,
              "id": 82
            },
            {
              "x": 10,
              "y": 10,
              "id": 82
            },
            {
              "x": 10,
              "y": 14,
              "id": 82
            },
            {
              "x": 11,
              "y": 0,
              "id": 82
            },
            {
              "x": 11,
              "y": 10,
              "id": 82
            },
            {
              "x": 11,
              "y": 14,
              "id": 82
            },
            {
              "x": 12,
              "y": 0,
              "id": 82
            },
            {
              "x": 12,
              "y": 10,
              "id": 82
            },
            {
              "x": 12,
              "y": 14,
              "id": 82
            },
            {
              "x": 13,
              "y": 0,
              "id": 82
            },
            {
              "x": 13,
              "y": 2,
              "id": 82
            },
            {
              "x": 13,
              "y": 6,
              "id": 82
            },
            {
              "x": 13,
              "y": 14,
              "id": 82
            },
            {
              "x": 14,
              "y": 0,
              "id": 82
            },
            {
              "x": 14,
              "y": 1,
              "id": 82
            },
            {
              "x": 14,
              "y": 2,
              "id": 82
            },
            {
              "x": 14,
              "y": 3,
              "id": 82
            },
            {
              "x": 14,
              "y": 4,
              "id": 82
            },
            {
              "x": 14,
              "y": 5,
              "id": 82
            },
            {
              "x": 14,
              "y": 6,
              "id": 82
            },
            {
              "x": 14,
              "y": 7,
              "id": 82
            },
            {
              "x": 14,
              "y": 8,
              "id": 82
            },
            {
              "x": 14,
              "y": 12,
              "id": 82
            },
            {
              "x": 14,
              "y": 13,
              "id": 82
            },
            {
              "x": 14,
              "y": 14,
              "id": 82
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - top half",
          "positions": [
            {
              "x": 1,
              "y": 11,
              "id": 82
            },
            {
              "x": 2,
              "y": 11,
              "id": 82
            },
            {
              "x": 3,
              "y": 11,
              "id": 82
            },
            {
              "x": 4,
              "y": 7,
              "id": 82
            },
            {
              "x": 4,
              "y": 11,
              "id": 82
            },
            {
              "x": 5,
              "y": 7,
              "id": 82
            },
            {
              "x": 6,
              "y": 7,
              "id": 82
            },
            {
              "x": 7,
              "y": 7,
              "id": 82
            },
            {
              "x": 8,
              "y": 7,
              "id": 82
            },
            {
              "x": 9,
              "y": 7,
              "id": 82
            },
            {
              "x": 9,
              "y": 11,
              "id": 82
            },
            {
              "x": 10,
              "y": 11,
              "id": 82
            },
            {
              "x": 11,
              "y": 11,
              "id": 82
            },
            {
              "x": 12,
              "y": 11,
              "id": 82
            }
          ],
          "collision": {
            "type": "top-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    },
    "jasmine-bay": {
      "id": "jasmine-bay",
      "name": "Jasmine Bay",
      "kind": "town",
      "safezone": false,
      "tileSize": 128,
      "mapWidth": 18,
      "mapHeight": 17,
      "image": "assets/Maps/Jasmine Bay/Jasmine Bay.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 0
            },
            {
              "x": 0,
              "y": 8,
              "id": 0
            },
            {
              "x": 0,
              "y": 9,
              "id": 0
            },
            {
              "x": 0,
              "y": 10,
              "id": 0
            },
            {
              "x": 0,
              "y": 11,
              "id": 0
            },
            {
              "x": 0,
              "y": 12,
              "id": 0
            },
            {
              "x": 0,
              "y": 13,
              "id": 0
            },
            {
              "x": 0,
              "y": 14,
              "id": 0
            },
            {
              "x": 0,
              "y": 15,
              "id": 0
            },
            {
              "x": 0,
              "y": 16,
              "id": 0
            },
            {
              "x": 1,
              "y": 0,
              "id": 0
            },
            {
              "x": 1,
              "y": 1,
              "id": 0
            },
            {
              "x": 1,
              "y": 2,
              "id": 0
            },
            {
              "x": 1,
              "y": 3,
              "id": 0
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 0
            },
            {
              "x": 1,
              "y": 8,
              "id": 0
            },
            {
              "x": 1,
              "y": 9,
              "id": 0
            },
            {
              "x": 1,
              "y": 10,
              "id": 0
            },
            {
              "x": 1,
              "y": 11,
              "id": 0
            },
            {
              "x": 1,
              "y": 12,
              "id": 0
            },
            {
              "x": 1,
              "y": 13,
              "id": 0
            },
            {
              "x": 1,
              "y": 14,
              "id": 0
            },
            {
              "x": 1,
              "y": 15,
              "id": 0
            },
            {
              "x": 1,
              "y": 16,
              "id": 0
            },
            {
              "x": 2,
              "y": 0,
              "id": 0
            },
            {
              "x": 2,
              "y": 1,
              "id": 0
            },
            {
              "x": 2,
              "y": 2,
              "id": 1
            },
            {
              "x": 2,
              "y": 3,
              "id": 2
            },
            {
              "x": 2,
              "y": 4,
              "id": 2
            },
            {
              "x": 2,
              "y": 5,
              "id": 2
            },
            {
              "x": 2,
              "y": 6,
              "id": 2
            },
            {
              "x": 2,
              "y": 7,
              "id": 2
            },
            {
              "x": 2,
              "y": 8,
              "id": 2
            },
            {
              "x": 2,
              "y": 9,
              "id": 2
            },
            {
              "x": 2,
              "y": 10,
              "id": 2
            },
            {
              "x": 2,
              "y": 11,
              "id": 2
            },
            {
              "x": 2,
              "y": 12,
              "id": 2
            },
            {
              "x": 2,
              "y": 13,
              "id": 2
            },
            {
              "x": 2,
              "y": 14,
              "id": 2
            },
            {
              "x": 2,
              "y": 15,
              "id": 3
            },
            {
              "x": 2,
              "y": 16,
              "id": 0
            },
            {
              "x": 3,
              "y": 0,
              "id": 0
            },
            {
              "x": 3,
              "y": 1,
              "id": 0
            },
            {
              "x": 3,
              "y": 2,
              "id": 4
            },
            {
              "x": 3,
              "y": 3,
              "id": 5
            },
            {
              "x": 3,
              "y": 4,
              "id": 5
            },
            {
              "x": 3,
              "y": 5,
              "id": 5
            },
            {
              "x": 3,
              "y": 6,
              "id": 5
            },
            {
              "x": 3,
              "y": 7,
              "id": 5
            },
            {
              "x": 3,
              "y": 8,
              "id": 5
            },
            {
              "x": 3,
              "y": 9,
              "id": 5
            },
            {
              "x": 3,
              "y": 10,
              "id": 5
            },
            {
              "x": 3,
              "y": 11,
              "id": 5
            },
            {
              "x": 3,
              "y": 12,
              "id": 5
            },
            {
              "x": 3,
              "y": 13,
              "id": 5
            },
            {
              "x": 3,
              "y": 14,
              "id": 5
            },
            {
              "x": 3,
              "y": 15,
              "id": 6
            },
            {
              "x": 3,
              "y": 16,
              "id": 0
            },
            {
              "x": 4,
              "y": 0,
              "id": 0
            },
            {
              "x": 4,
              "y": 1,
              "id": 0
            },
            {
              "x": 4,
              "y": 2,
              "id": 4
            },
            {
              "x": 4,
              "y": 3,
              "id": 5
            },
            {
              "x": 4,
              "y": 4,
              "id": 7
            },
            {
              "x": 4,
              "y": 5,
              "id": 7
            },
            {
              "x": 4,
              "y": 6,
              "id": 7
            },
            {
              "x": 4,
              "y": 7,
              "id": 7
            },
            {
              "x": 4,
              "y": 8,
              "id": 7
            },
            {
              "x": 4,
              "y": 9,
              "id": 7
            },
            {
              "x": 4,
              "y": 10,
              "id": 7
            },
            {
              "x": 4,
              "y": 11,
              "id": 7
            },
            {
              "x": 4,
              "y": 12,
              "id": 7
            },
            {
              "x": 4,
              "y": 13,
              "id": 7
            },
            {
              "x": 4,
              "y": 14,
              "id": 5
            },
            {
              "x": 4,
              "y": 15,
              "id": 6
            },
            {
              "x": 4,
              "y": 16,
              "id": 0
            },
            {
              "x": 5,
              "y": 0,
              "id": 0
            },
            {
              "x": 5,
              "y": 1,
              "id": 0
            },
            {
              "x": 5,
              "y": 2,
              "id": 4
            },
            {
              "x": 5,
              "y": 3,
              "id": 5
            },
            {
              "x": 5,
              "y": 4,
              "id": 7
            },
            {
              "x": 5,
              "y": 5,
              "id": 7
            },
            {
              "x": 5,
              "y": 6,
              "id": 7
            },
            {
              "x": 5,
              "y": 7,
              "id": 7
            },
            {
              "x": 5,
              "y": 8,
              "id": 7
            },
            {
              "x": 5,
              "y": 9,
              "id": 7
            },
            {
              "x": 5,
              "y": 10,
              "id": 7
            },
            {
              "x": 5,
              "y": 11,
              "id": 7
            },
            {
              "x": 5,
              "y": 12,
              "id": 7
            },
            {
              "x": 5,
              "y": 13,
              "id": 7
            },
            {
              "x": 5,
              "y": 14,
              "id": 5
            },
            {
              "x": 5,
              "y": 15,
              "id": 6
            },
            {
              "x": 5,
              "y": 16,
              "id": 0
            },
            {
              "x": 6,
              "y": 0,
              "id": 0
            },
            {
              "x": 6,
              "y": 1,
              "id": 0
            },
            {
              "x": 6,
              "y": 2,
              "id": 4
            },
            {
              "x": 6,
              "y": 3,
              "id": 5
            },
            {
              "x": 6,
              "y": 4,
              "id": 7
            },
            {
              "x": 6,
              "y": 5,
              "id": 7
            },
            {
              "x": 6,
              "y": 6,
              "id": 7
            },
            {
              "x": 6,
              "y": 7,
              "id": 7
            },
            {
              "x": 6,
              "y": 8,
              "id": 7
            },
            {
              "x": 6,
              "y": 9,
              "id": 7
            },
            {
              "x": 6,
              "y": 10,
              "id": 7
            },
            {
              "x": 6,
              "y": 11,
              "id": 7
            },
            {
              "x": 6,
              "y": 12,
              "id": 7
            },
            {
              "x": 6,
              "y": 13,
              "id": 7
            },
            {
              "x": 6,
              "y": 14,
              "id": 5
            },
            {
              "x": 6,
              "y": 15,
              "id": 6
            },
            {
              "x": 6,
              "y": 16,
              "id": 0
            },
            {
              "x": 7,
              "y": 0,
              "id": 0
            },
            {
              "x": 7,
              "y": 1,
              "id": 0
            },
            {
              "x": 7,
              "y": 2,
              "id": 4
            },
            {
              "x": 7,
              "y": 3,
              "id": 5
            },
            {
              "x": 7,
              "y": 4,
              "id": 7
            },
            {
              "x": 7,
              "y": 5,
              "id": 7
            },
            {
              "x": 7,
              "y": 6,
              "id": 7
            },
            {
              "x": 7,
              "y": 7,
              "id": 7
            },
            {
              "x": 7,
              "y": 8,
              "id": 7
            },
            {
              "x": 7,
              "y": 9,
              "id": 7
            },
            {
              "x": 7,
              "y": 10,
              "id": 7
            },
            {
              "x": 7,
              "y": 11,
              "id": 7
            },
            {
              "x": 7,
              "y": 12,
              "id": 7
            },
            {
              "x": 7,
              "y": 13,
              "id": 7
            },
            {
              "x": 7,
              "y": 14,
              "id": 5
            },
            {
              "x": 7,
              "y": 15,
              "id": 6
            },
            {
              "x": 7,
              "y": 16,
              "id": 0
            },
            {
              "x": 8,
              "y": 0,
              "id": 0
            },
            {
              "x": 8,
              "y": 1,
              "id": 0
            },
            {
              "x": 8,
              "y": 2,
              "id": 4
            },
            {
              "x": 8,
              "y": 3,
              "id": 5
            },
            {
              "x": 8,
              "y": 4,
              "id": 7
            },
            {
              "x": 8,
              "y": 5,
              "id": 7
            },
            {
              "x": 8,
              "y": 6,
              "id": 7
            },
            {
              "x": 8,
              "y": 7,
              "id": 7
            },
            {
              "x": 8,
              "y": 8,
              "id": 7
            },
            {
              "x": 8,
              "y": 9,
              "id": 7
            },
            {
              "x": 8,
              "y": 10,
              "id": 7
            },
            {
              "x": 8,
              "y": 11,
              "id": 7
            },
            {
              "x": 8,
              "y": 12,
              "id": 7
            },
            {
              "x": 8,
              "y": 13,
              "id": 7
            },
            {
              "x": 8,
              "y": 14,
              "id": 5
            },
            {
              "x": 8,
              "y": 15,
              "id": 6
            },
            {
              "x": 8,
              "y": 16,
              "id": 0
            },
            {
              "x": 9,
              "y": 0,
              "id": 0
            },
            {
              "x": 9,
              "y": 1,
              "id": 0
            },
            {
              "x": 9,
              "y": 2,
              "id": 4
            },
            {
              "x": 9,
              "y": 3,
              "id": 5
            },
            {
              "x": 9,
              "y": 4,
              "id": 7
            },
            {
              "x": 9,
              "y": 5,
              "id": 7
            },
            {
              "x": 9,
              "y": 6,
              "id": 7
            },
            {
              "x": 9,
              "y": 7,
              "id": 7
            },
            {
              "x": 9,
              "y": 8,
              "id": 7
            },
            {
              "x": 9,
              "y": 9,
              "id": 7
            },
            {
              "x": 9,
              "y": 10,
              "id": 7
            },
            {
              "x": 9,
              "y": 11,
              "id": 7
            },
            {
              "x": 9,
              "y": 12,
              "id": 7
            },
            {
              "x": 9,
              "y": 13,
              "id": 7
            },
            {
              "x": 9,
              "y": 14,
              "id": 5
            },
            {
              "x": 9,
              "y": 15,
              "id": 6
            },
            {
              "x": 9,
              "y": 16,
              "id": 0
            },
            {
              "x": 10,
              "y": 0,
              "id": 0
            },
            {
              "x": 10,
              "y": 1,
              "id": 0
            },
            {
              "x": 10,
              "y": 2,
              "id": 4
            },
            {
              "x": 10,
              "y": 3,
              "id": 5
            },
            {
              "x": 10,
              "y": 4,
              "id": 7
            },
            {
              "x": 10,
              "y": 5,
              "id": 7
            },
            {
              "x": 10,
              "y": 6,
              "id": 7
            },
            {
              "x": 10,
              "y": 7,
              "id": 7
            },
            {
              "x": 10,
              "y": 8,
              "id": 7
            },
            {
              "x": 10,
              "y": 9,
              "id": 7
            },
            {
              "x": 10,
              "y": 10,
              "id": 7
            },
            {
              "x": 10,
              "y": 11,
              "id": 7
            },
            {
              "x": 10,
              "y": 12,
              "id": 7
            },
            {
              "x": 10,
              "y": 13,
              "id": 7
            },
            {
              "x": 10,
              "y": 14,
              "id": 5
            },
            {
              "x": 10,
              "y": 15,
              "id": 6
            },
            {
              "x": 10,
              "y": 16,
              "id": 0
            },
            {
              "x": 11,
              "y": 0,
              "id": 0
            },
            {
              "x": 11,
              "y": 1,
              "id": 0
            },
            {
              "x": 11,
              "y": 2,
              "id": 4
            },
            {
              "x": 11,
              "y": 3,
              "id": 8
            },
            {
              "x": 11,
              "y": 4,
              "id": 9
            },
            {
              "x": 11,
              "y": 5,
              "id": 9
            },
            {
              "x": 11,
              "y": 6,
              "id": 7
            },
            {
              "x": 11,
              "y": 7,
              "id": 7
            },
            {
              "x": 11,
              "y": 8,
              "id": 7
            },
            {
              "x": 11,
              "y": 9,
              "id": 7
            },
            {
              "x": 11,
              "y": 10,
              "id": 7
            },
            {
              "x": 11,
              "y": 11,
              "id": 7
            },
            {
              "x": 11,
              "y": 12,
              "id": 7
            },
            {
              "x": 11,
              "y": 13,
              "id": 7
            },
            {
              "x": 11,
              "y": 14,
              "id": 5
            },
            {
              "x": 11,
              "y": 15,
              "id": 6
            },
            {
              "x": 11,
              "y": 16,
              "id": 0
            },
            {
              "x": 12,
              "y": 0,
              "id": 0
            },
            {
              "x": 12,
              "y": 1,
              "id": 0
            },
            {
              "x": 12,
              "y": 2,
              "id": 4
            },
            {
              "x": 12,
              "y": 3,
              "id": 10
            },
            {
              "x": 12,
              "y": 4,
              "id": 9
            },
            {
              "x": 12,
              "y": 5,
              "id": 9
            },
            {
              "x": 12,
              "y": 6,
              "id": 11
            },
            {
              "x": 12,
              "y": 7,
              "id": 11
            },
            {
              "x": 12,
              "y": 8,
              "id": 11
            },
            {
              "x": 12,
              "y": 9,
              "id": 11
            },
            {
              "x": 12,
              "y": 10,
              "id": 11
            },
            {
              "x": 12,
              "y": 11,
              "id": 11
            },
            {
              "x": 12,
              "y": 12,
              "id": 12
            },
            {
              "x": 12,
              "y": 13,
              "id": 7
            },
            {
              "x": 12,
              "y": 14,
              "id": 5
            },
            {
              "x": 12,
              "y": 15,
              "id": 6
            },
            {
              "x": 12,
              "y": 16,
              "id": 0
            },
            {
              "x": 13,
              "y": 0,
              "id": 0
            },
            {
              "x": 13,
              "y": 1,
              "id": 0
            },
            {
              "x": 13,
              "y": 2,
              "id": 4
            },
            {
              "x": 13,
              "y": 3,
              "id": 13
            },
            {
              "x": 13,
              "y": 4,
              "id": 14
            },
            {
              "x": 13,
              "y": 5,
              "id": 14
            },
            {
              "x": 13,
              "y": 6,
              "id": 14
            },
            {
              "x": 13,
              "y": 7,
              "id": 14
            },
            {
              "x": 13,
              "y": 8,
              "id": 14
            },
            {
              "x": 13,
              "y": 9,
              "id": 14
            },
            {
              "x": 13,
              "y": 10,
              "id": 14
            },
            {
              "x": 13,
              "y": 11,
              "id": 14
            },
            {
              "x": 13,
              "y": 12,
              "id": 15
            },
            {
              "x": 13,
              "y": 13,
              "id": 5
            },
            {
              "x": 13,
              "y": 14,
              "id": 5
            },
            {
              "x": 13,
              "y": 15,
              "id": 6
            },
            {
              "x": 13,
              "y": 16,
              "id": 0
            },
            {
              "x": 14,
              "y": 0,
              "id": 0
            },
            {
              "x": 14,
              "y": 1,
              "id": 0
            },
            {
              "x": 14,
              "y": 2,
              "id": 16
            },
            {
              "x": 14,
              "y": 3,
              "id": 17
            },
            {
              "x": 14,
              "y": 4,
              "id": 17
            },
            {
              "x": 14,
              "y": 5,
              "id": 17
            },
            {
              "x": 14,
              "y": 6,
              "id": 17
            },
            {
              "x": 14,
              "y": 7,
              "id": 17
            },
            {
              "x": 14,
              "y": 8,
              "id": 17
            },
            {
              "x": 14,
              "y": 9,
              "id": 17
            },
            {
              "x": 14,
              "y": 10,
              "id": 17
            },
            {
              "x": 14,
              "y": 11,
              "id": 17
            },
            {
              "x": 14,
              "y": 12,
              "id": 17
            },
            {
              "x": 14,
              "y": 13,
              "id": 17
            },
            {
              "x": 14,
              "y": 14,
              "id": 0
            },
            {
              "x": 14,
              "y": 15,
              "id": 0
            },
            {
              "x": 14,
              "y": 16,
              "id": 0
            },
            {
              "x": 15,
              "y": 0,
              "id": 0
            },
            {
              "x": 15,
              "y": 1,
              "id": 0
            },
            {
              "x": 15,
              "y": 2,
              "id": 0
            },
            {
              "x": 15,
              "y": 3,
              "id": 0
            },
            {
              "x": 15,
              "y": 4,
              "id": 0
            },
            {
              "x": 15,
              "y": 5,
              "id": 0
            },
            {
              "x": 15,
              "y": 6,
              "id": 0
            },
            {
              "x": 15,
              "y": 7,
              "id": 0
            },
            {
              "x": 15,
              "y": 8,
              "id": 0
            },
            {
              "x": 15,
              "y": 9,
              "id": 0
            },
            {
              "x": 15,
              "y": 10,
              "id": 0
            },
            {
              "x": 15,
              "y": 11,
              "id": 0
            },
            {
              "x": 15,
              "y": 12,
              "id": 0
            },
            {
              "x": 15,
              "y": 13,
              "id": 0
            },
            {
              "x": 15,
              "y": 14,
              "id": 0
            },
            {
              "x": 15,
              "y": 15,
              "id": 0
            },
            {
              "x": 15,
              "y": 16,
              "id": 0
            },
            {
              "x": 16,
              "y": 0,
              "id": 0
            },
            {
              "x": 16,
              "y": 1,
              "id": 0
            },
            {
              "x": 16,
              "y": 2,
              "id": 0
            },
            {
              "x": 16,
              "y": 3,
              "id": 0
            },
            {
              "x": 16,
              "y": 4,
              "id": 0
            },
            {
              "x": 16,
              "y": 5,
              "id": 0
            },
            {
              "x": 16,
              "y": 6,
              "id": 0
            },
            {
              "x": 16,
              "y": 7,
              "id": 0
            },
            {
              "x": 16,
              "y": 8,
              "id": 0
            },
            {
              "x": 16,
              "y": 9,
              "id": 0
            },
            {
              "x": 16,
              "y": 10,
              "id": 0
            },
            {
              "x": 16,
              "y": 11,
              "id": 0
            },
            {
              "x": 16,
              "y": 12,
              "id": 0
            },
            {
              "x": 16,
              "y": 13,
              "id": 0
            },
            {
              "x": 16,
              "y": 14,
              "id": 0
            },
            {
              "x": 16,
              "y": 15,
              "id": 0
            },
            {
              "x": 16,
              "y": 16,
              "id": 0
            },
            {
              "x": 17,
              "y": 0,
              "id": 0
            },
            {
              "x": 17,
              "y": 1,
              "id": 0
            },
            {
              "x": 17,
              "y": 2,
              "id": 0
            },
            {
              "x": 17,
              "y": 3,
              "id": 0
            },
            {
              "x": 17,
              "y": 4,
              "id": 0
            },
            {
              "x": 17,
              "y": 5,
              "id": 0
            },
            {
              "x": 17,
              "y": 6,
              "id": 0
            },
            {
              "x": 17,
              "y": 7,
              "id": 0
            },
            {
              "x": 17,
              "y": 8,
              "id": 0
            },
            {
              "x": 17,
              "y": 9,
              "id": 0
            },
            {
              "x": 17,
              "y": 10,
              "id": 0
            },
            {
              "x": 17,
              "y": 11,
              "id": 0
            },
            {
              "x": 17,
              "y": 12,
              "id": 0
            },
            {
              "x": 17,
              "y": 13,
              "id": 0
            },
            {
              "x": 17,
              "y": 14,
              "id": 0
            },
            {
              "x": 17,
              "y": 15,
              "id": 0
            },
            {
              "x": 17,
              "y": 16,
              "id": 0
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 3,
              "y": 3,
              "id": 18
            },
            {
              "x": 3,
              "y": 4,
              "id": 19
            },
            {
              "x": 3,
              "y": 5,
              "id": 19
            },
            {
              "x": 3,
              "y": 6,
              "id": 19
            },
            {
              "x": 3,
              "y": 7,
              "id": 19
            },
            {
              "x": 3,
              "y": 8,
              "id": 19
            },
            {
              "x": 3,
              "y": 9,
              "id": 19
            },
            {
              "x": 3,
              "y": 10,
              "id": 19
            },
            {
              "x": 3,
              "y": 11,
              "id": 19
            },
            {
              "x": 3,
              "y": 12,
              "id": 19
            },
            {
              "x": 3,
              "y": 13,
              "id": 19
            },
            {
              "x": 3,
              "y": 14,
              "id": 20
            },
            {
              "x": 4,
              "y": 3,
              "id": 21
            },
            {
              "x": 4,
              "y": 14,
              "id": 22
            },
            {
              "x": 5,
              "y": 3,
              "id": 23
            },
            {
              "x": 5,
              "y": 9,
              "id": 24
            },
            {
              "x": 5,
              "y": 10,
              "id": 24
            },
            {
              "x": 5,
              "y": 11,
              "id": 24
            },
            {
              "x": 5,
              "y": 12,
              "id": 24
            },
            {
              "x": 5,
              "y": 13,
              "id": 24
            },
            {
              "x": 5,
              "y": 14,
              "id": 25
            },
            {
              "x": 6,
              "y": 3,
              "id": 23
            },
            {
              "x": 6,
              "y": 5,
              "id": 24
            },
            {
              "x": 6,
              "y": 6,
              "id": 24
            },
            {
              "x": 6,
              "y": 7,
              "id": 24
            },
            {
              "x": 6,
              "y": 9,
              "id": 24
            },
            {
              "x": 6,
              "y": 10,
              "id": 24
            },
            {
              "x": 6,
              "y": 11,
              "id": 24
            },
            {
              "x": 6,
              "y": 12,
              "id": 24
            },
            {
              "x": 6,
              "y": 13,
              "id": 24
            },
            {
              "x": 6,
              "y": 14,
              "id": 25
            },
            {
              "x": 7,
              "y": 3,
              "id": 23
            },
            {
              "x": 7,
              "y": 5,
              "id": 24
            },
            {
              "x": 7,
              "y": 6,
              "id": 24
            },
            {
              "x": 7,
              "y": 7,
              "id": 24
            },
            {
              "x": 7,
              "y": 9,
              "id": 24
            },
            {
              "x": 7,
              "y": 10,
              "id": 24
            },
            {
              "x": 7,
              "y": 11,
              "id": 24
            },
            {
              "x": 7,
              "y": 12,
              "id": 24
            },
            {
              "x": 7,
              "y": 13,
              "id": 24
            },
            {
              "x": 7,
              "y": 14,
              "id": 25
            },
            {
              "x": 8,
              "y": 3,
              "id": 23
            },
            {
              "x": 8,
              "y": 6,
              "id": 24
            },
            {
              "x": 8,
              "y": 7,
              "id": 24
            },
            {
              "x": 8,
              "y": 8,
              "id": 24
            },
            {
              "x": 8,
              "y": 9,
              "id": 24
            },
            {
              "x": 8,
              "y": 10,
              "id": 24
            },
            {
              "x": 8,
              "y": 12,
              "id": 24
            },
            {
              "x": 8,
              "y": 13,
              "id": 24
            },
            {
              "x": 8,
              "y": 14,
              "id": 25
            },
            {
              "x": 9,
              "y": 3,
              "id": 23
            },
            {
              "x": 9,
              "y": 6,
              "id": 24
            },
            {
              "x": 9,
              "y": 7,
              "id": 24
            },
            {
              "x": 9,
              "y": 8,
              "id": 24
            },
            {
              "x": 9,
              "y": 9,
              "id": 24
            },
            {
              "x": 9,
              "y": 10,
              "id": 24
            },
            {
              "x": 9,
              "y": 12,
              "id": 24
            },
            {
              "x": 9,
              "y": 13,
              "id": 24
            },
            {
              "x": 9,
              "y": 14,
              "id": 25
            },
            {
              "x": 10,
              "y": 3,
              "id": 23
            },
            {
              "x": 10,
              "y": 6,
              "id": 24
            },
            {
              "x": 10,
              "y": 7,
              "id": 24
            },
            {
              "x": 10,
              "y": 8,
              "id": 24
            },
            {
              "x": 10,
              "y": 9,
              "id": 24
            },
            {
              "x": 10,
              "y": 12,
              "id": 24
            },
            {
              "x": 10,
              "y": 13,
              "id": 24
            },
            {
              "x": 10,
              "y": 14,
              "id": 25
            },
            {
              "x": 11,
              "y": 3,
              "id": 26
            },
            {
              "x": 11,
              "y": 4,
              "id": 27
            },
            {
              "x": 11,
              "y": 5,
              "id": 12
            },
            {
              "x": 11,
              "y": 6,
              "id": 24
            },
            {
              "x": 11,
              "y": 7,
              "id": 24
            },
            {
              "x": 11,
              "y": 8,
              "id": 24
            },
            {
              "x": 11,
              "y": 9,
              "id": 24
            },
            {
              "x": 11,
              "y": 10,
              "id": 24
            },
            {
              "x": 11,
              "y": 14,
              "id": 25
            },
            {
              "x": 12,
              "y": 5,
              "id": 28
            },
            {
              "x": 12,
              "y": 6,
              "id": 29
            },
            {
              "x": 12,
              "y": 7,
              "id": 30
            },
            {
              "x": 12,
              "y": 8,
              "id": 31
            },
            {
              "x": 12,
              "y": 14,
              "id": 25
            },
            {
              "x": 13,
              "y": 12,
              "id": 26
            },
            {
              "x": 13,
              "y": 13,
              "id": 32
            },
            {
              "x": 13,
              "y": 14,
              "id": 33
            },
            {
              "x": 14,
              "y": 14,
              "id": 17
            },
            {
              "x": 14,
              "y": 15,
              "id": 34
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 35
            },
            {
              "x": 0,
              "y": 1,
              "id": 36
            },
            {
              "x": 0,
              "y": 2,
              "id": 37
            },
            {
              "x": 0,
              "y": 3,
              "id": 37
            },
            {
              "x": 0,
              "y": 4,
              "id": 38
            },
            {
              "x": 0,
              "y": 5,
              "id": 37
            },
            {
              "x": 0,
              "y": 6,
              "id": 35
            },
            {
              "x": 0,
              "y": 7,
              "id": 39
            },
            {
              "x": 0,
              "y": 8,
              "id": 37
            },
            {
              "x": 0,
              "y": 9,
              "id": 36
            },
            {
              "x": 0,
              "y": 10,
              "id": 35
            },
            {
              "x": 0,
              "y": 11,
              "id": 39
            },
            {
              "x": 0,
              "y": 12,
              "id": 38
            },
            {
              "x": 0,
              "y": 13,
              "id": 36
            },
            {
              "x": 0,
              "y": 14,
              "id": 39
            },
            {
              "x": 0,
              "y": 15,
              "id": 37
            },
            {
              "x": 0,
              "y": 16,
              "id": 38
            },
            {
              "x": 1,
              "y": 0,
              "id": 37
            },
            {
              "x": 1,
              "y": 16,
              "id": 35
            },
            {
              "x": 2,
              "y": 0,
              "id": 38
            },
            {
              "x": 2,
              "y": 16,
              "id": 38
            },
            {
              "x": 3,
              "y": 0,
              "id": 39
            },
            {
              "x": 3,
              "y": 16,
              "id": 35
            },
            {
              "x": 4,
              "y": 0,
              "id": 38
            },
            {
              "x": 4,
              "y": 6,
              "id": 40
            },
            {
              "x": 4,
              "y": 10,
              "id": 40
            },
            {
              "x": 4,
              "y": 13,
              "id": 41
            },
            {
              "x": 4,
              "y": 16,
              "id": 36
            },
            {
              "x": 5,
              "y": 0,
              "id": 36
            },
            {
              "x": 5,
              "y": 9,
              "id": 42
            },
            {
              "x": 5,
              "y": 10,
              "id": 42
            },
            {
              "x": 5,
              "y": 11,
              "id": 42
            },
            {
              "x": 5,
              "y": 12,
              "id": 42
            },
            {
              "x": 5,
              "y": 13,
              "id": 43
            },
            {
              "x": 5,
              "y": 16,
              "id": 39
            },
            {
              "x": 6,
              "y": 0,
              "id": 37
            },
            {
              "x": 6,
              "y": 5,
              "id": 32
            },
            {
              "x": 6,
              "y": 6,
              "id": 32
            },
            {
              "x": 6,
              "y": 7,
              "id": 32
            },
            {
              "x": 6,
              "y": 13,
              "id": 23
            },
            {
              "x": 6,
              "y": 16,
              "id": 35
            },
            {
              "x": 7,
              "y": 0,
              "id": 35
            },
            {
              "x": 7,
              "y": 7,
              "id": 21
            },
            {
              "x": 7,
              "y": 8,
              "id": 44
            },
            {
              "x": 7,
              "y": 9,
              "id": 20
            },
            {
              "x": 7,
              "y": 10,
              "id": 18
            },
            {
              "x": 7,
              "y": 11,
              "id": 45
            },
            {
              "x": 7,
              "y": 12,
              "id": 20
            },
            {
              "x": 7,
              "y": 13,
              "id": 23
            },
            {
              "x": 7,
              "y": 16,
              "id": 38
            },
            {
              "x": 8,
              "y": 0,
              "id": 36
            },
            {
              "x": 8,
              "y": 5,
              "id": 19
            },
            {
              "x": 8,
              "y": 6,
              "id": 20
            },
            {
              "x": 8,
              "y": 7,
              "id": 26
            },
            {
              "x": 8,
              "y": 8,
              "id": 32
            },
            {
              "x": 8,
              "y": 9,
              "id": 33
            },
            {
              "x": 8,
              "y": 10,
              "id": 21
            },
            {
              "x": 8,
              "y": 12,
              "id": 22
            },
            {
              "x": 8,
              "y": 13,
              "id": 23
            },
            {
              "x": 8,
              "y": 16,
              "id": 36
            },
            {
              "x": 9,
              "y": 0,
              "id": 38
            },
            {
              "x": 9,
              "y": 6,
              "id": 25
            },
            {
              "x": 9,
              "y": 10,
              "id": 21
            },
            {
              "x": 9,
              "y": 13,
              "id": 23
            },
            {
              "x": 9,
              "y": 16,
              "id": 37
            },
            {
              "x": 10,
              "y": 0,
              "id": 35
            },
            {
              "x": 10,
              "y": 3,
              "id": 46
            },
            {
              "x": 10,
              "y": 4,
              "id": 47
            },
            {
              "x": 10,
              "y": 6,
              "id": 25
            },
            {
              "x": 10,
              "y": 12,
              "id": 45
            },
            {
              "x": 10,
              "y": 13,
              "id": 48
            },
            {
              "x": 10,
              "y": 16,
              "id": 39
            },
            {
              "x": 11,
              "y": 6,
              "id": 25
            },
            {
              "x": 11,
              "y": 8,
              "id": 18
            },
            {
              "x": 11,
              "y": 9,
              "id": 19
            },
            {
              "x": 11,
              "y": 10,
              "id": 48
            },
            {
              "x": 11,
              "y": 16,
              "id": 38
            },
            {
              "x": 12,
              "y": 6,
              "id": 33
            },
            {
              "x": 12,
              "y": 8,
              "id": 26
            },
            {
              "x": 12,
              "y": 9,
              "id": 49
            },
            {
              "x": 12,
              "y": 12,
              "id": 44
            },
            {
              "x": 12,
              "y": 13,
              "id": 50
            },
            {
              "x": 12,
              "y": 16,
              "id": 36
            },
            {
              "x": 13,
              "y": 16,
              "id": 37
            },
            {
              "x": 14,
              "y": 16,
              "id": 39
            },
            {
              "x": 15,
              "y": 0,
              "id": 38
            },
            {
              "x": 15,
              "y": 16,
              "id": 35
            },
            {
              "x": 16,
              "y": 0,
              "id": 36
            },
            {
              "x": 16,
              "y": 16,
              "id": 36
            },
            {
              "x": 17,
              "y": 0,
              "id": 38
            },
            {
              "x": 17,
              "y": 1,
              "id": 38
            },
            {
              "x": 17,
              "y": 2,
              "id": 35
            },
            {
              "x": 17,
              "y": 3,
              "id": 37
            },
            {
              "x": 17,
              "y": 8,
              "id": 39
            },
            {
              "x": 17,
              "y": 9,
              "id": 36
            },
            {
              "x": 17,
              "y": 10,
              "id": 35
            },
            {
              "x": 17,
              "y": 11,
              "id": 36
            },
            {
              "x": 17,
              "y": 12,
              "id": 39
            },
            {
              "x": 17,
              "y": 13,
              "id": 37
            },
            {
              "x": 17,
              "y": 14,
              "id": 36
            },
            {
              "x": 17,
              "y": 15,
              "id": 38
            },
            {
              "x": 17,
              "y": 16,
              "id": 38
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 4,
              "y": 4,
              "id": 51
            },
            {
              "x": 4,
              "y": 5,
              "id": 52
            },
            {
              "x": 4,
              "y": 8,
              "id": 53
            },
            {
              "x": 4,
              "y": 9,
              "id": 54
            },
            {
              "x": 4,
              "y": 12,
              "id": 55
            },
            {
              "x": 5,
              "y": 4,
              "id": 56
            },
            {
              "x": 5,
              "y": 5,
              "id": 57
            },
            {
              "x": 5,
              "y": 8,
              "id": 58
            },
            {
              "x": 5,
              "y": 9,
              "id": 59
            },
            {
              "x": 6,
              "y": 4,
              "id": 60
            },
            {
              "x": 6,
              "y": 5,
              "id": 61
            },
            {
              "x": 6,
              "y": 8,
              "id": 62
            },
            {
              "x": 6,
              "y": 9,
              "id": 63
            },
            {
              "x": 7,
              "y": 4,
              "id": 64
            },
            {
              "x": 7,
              "y": 5,
              "id": 65
            },
            {
              "x": 7,
              "y": 8,
              "id": 66
            },
            {
              "x": 7,
              "y": 9,
              "id": 67
            },
            {
              "x": 8,
              "y": 4,
              "id": 68
            },
            {
              "x": 8,
              "y": 5,
              "id": 69
            },
            {
              "x": 8,
              "y": 11,
              "id": 70
            },
            {
              "x": 8,
              "y": 12,
              "id": 71
            },
            {
              "x": 9,
              "y": 4,
              "id": 72
            },
            {
              "x": 9,
              "y": 5,
              "id": 73
            },
            {
              "x": 9,
              "y": 11,
              "id": 74
            },
            {
              "x": 9,
              "y": 12,
              "id": 75
            },
            {
              "x": 10,
              "y": 5,
              "id": 76
            },
            {
              "x": 10,
              "y": 11,
              "id": 77
            },
            {
              "x": 10,
              "y": 12,
              "id": 78
            },
            {
              "x": 11,
              "y": 5,
              "id": 79
            },
            {
              "x": 11,
              "y": 11,
              "id": 80
            },
            {
              "x": 11,
              "y": 12,
              "id": 81
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": []
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": [
            {
              "x": 4,
              "y": 3,
              "id": 82
            },
            {
              "x": 4,
              "y": 6,
              "id": 83
            },
            {
              "x": 4,
              "y": 7,
              "id": 84
            },
            {
              "x": 4,
              "y": 11,
              "id": 85
            },
            {
              "x": 5,
              "y": 2,
              "id": 86
            },
            {
              "x": 5,
              "y": 3,
              "id": 87
            },
            {
              "x": 5,
              "y": 6,
              "id": 88
            },
            {
              "x": 5,
              "y": 7,
              "id": 89
            },
            {
              "x": 5,
              "y": 13,
              "id": 50
            },
            {
              "x": 6,
              "y": 2,
              "id": 90
            },
            {
              "x": 6,
              "y": 3,
              "id": 91
            },
            {
              "x": 6,
              "y": 6,
              "id": 92
            },
            {
              "x": 6,
              "y": 7,
              "id": 93
            },
            {
              "x": 6,
              "y": 13,
              "id": 41
            },
            {
              "x": 7,
              "y": 2,
              "id": 94
            },
            {
              "x": 7,
              "y": 3,
              "id": 95
            },
            {
              "x": 7,
              "y": 6,
              "id": 96
            },
            {
              "x": 7,
              "y": 7,
              "id": 97
            },
            {
              "x": 7,
              "y": 13,
              "id": 50
            },
            {
              "x": 8,
              "y": 2,
              "id": 98
            },
            {
              "x": 8,
              "y": 3,
              "id": 99
            },
            {
              "x": 8,
              "y": 9,
              "id": 100
            },
            {
              "x": 8,
              "y": 10,
              "id": 101
            },
            {
              "x": 8,
              "y": 13,
              "id": 41
            },
            {
              "x": 9,
              "y": 3,
              "id": 102
            },
            {
              "x": 9,
              "y": 9,
              "id": 103
            },
            {
              "x": 9,
              "y": 10,
              "id": 104
            },
            {
              "x": 9,
              "y": 13,
              "id": 50
            },
            {
              "x": 10,
              "y": 9,
              "id": 105
            },
            {
              "x": 10,
              "y": 10,
              "id": 106
            },
            {
              "x": 10,
              "y": 13,
              "id": 41
            },
            {
              "x": 11,
              "y": 9,
              "id": 107
            },
            {
              "x": 11,
              "y": 10,
              "id": 108
            },
            {
              "x": 11,
              "y": 13,
              "id": 50
            }
          ]
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [
            {
              "x": 11,
              "y": 5,
              "id": 109
            },
            {
              "x": 11,
              "y": 11,
              "id": 109
            }
          ],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [
            {
              "x": 8,
              "y": 11,
              "id": 109
            },
            {
              "x": 10,
              "y": 5,
              "id": 109
            }
          ],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 109
            },
            {
              "x": 0,
              "y": 1,
              "id": 109
            },
            {
              "x": 0,
              "y": 2,
              "id": 109
            },
            {
              "x": 0,
              "y": 3,
              "id": 109
            },
            {
              "x": 0,
              "y": 4,
              "id": 109
            },
            {
              "x": 0,
              "y": 5,
              "id": 109
            },
            {
              "x": 0,
              "y": 6,
              "id": 109
            },
            {
              "x": 0,
              "y": 7,
              "id": 109
            },
            {
              "x": 0,
              "y": 8,
              "id": 109
            },
            {
              "x": 0,
              "y": 9,
              "id": 109
            },
            {
              "x": 0,
              "y": 10,
              "id": 109
            },
            {
              "x": 0,
              "y": 11,
              "id": 109
            },
            {
              "x": 0,
              "y": 12,
              "id": 109
            },
            {
              "x": 0,
              "y": 13,
              "id": 109
            },
            {
              "x": 0,
              "y": 14,
              "id": 109
            },
            {
              "x": 0,
              "y": 15,
              "id": 109
            },
            {
              "x": 0,
              "y": 16,
              "id": 109
            },
            {
              "x": 1,
              "y": 0,
              "id": 109
            },
            {
              "x": 1,
              "y": 16,
              "id": 109
            },
            {
              "x": 2,
              "y": 0,
              "id": 109
            },
            {
              "x": 2,
              "y": 16,
              "id": 109
            },
            {
              "x": 3,
              "y": 0,
              "id": 109
            },
            {
              "x": 3,
              "y": 16,
              "id": 109
            },
            {
              "x": 4,
              "y": 0,
              "id": 109
            },
            {
              "x": 4,
              "y": 4,
              "id": 109
            },
            {
              "x": 4,
              "y": 8,
              "id": 109
            },
            {
              "x": 4,
              "y": 12,
              "id": 109
            },
            {
              "x": 4,
              "y": 13,
              "id": 109
            },
            {
              "x": 4,
              "y": 16,
              "id": 109
            },
            {
              "x": 5,
              "y": 0,
              "id": 109
            },
            {
              "x": 5,
              "y": 4,
              "id": 109
            },
            {
              "x": 5,
              "y": 8,
              "id": 109
            },
            {
              "x": 5,
              "y": 16,
              "id": 109
            },
            {
              "x": 6,
              "y": 0,
              "id": 109
            },
            {
              "x": 6,
              "y": 4,
              "id": 109
            },
            {
              "x": 6,
              "y": 8,
              "id": 109
            },
            {
              "x": 6,
              "y": 16,
              "id": 109
            },
            {
              "x": 7,
              "y": 0,
              "id": 109
            },
            {
              "x": 7,
              "y": 4,
              "id": 109
            },
            {
              "x": 7,
              "y": 8,
              "id": 109
            },
            {
              "x": 7,
              "y": 16,
              "id": 109
            },
            {
              "x": 8,
              "y": 0,
              "id": 109
            },
            {
              "x": 8,
              "y": 4,
              "id": 109
            },
            {
              "x": 8,
              "y": 16,
              "id": 109
            },
            {
              "x": 9,
              "y": 0,
              "id": 109
            },
            {
              "x": 9,
              "y": 4,
              "id": 109
            },
            {
              "x": 9,
              "y": 11,
              "id": 109
            },
            {
              "x": 9,
              "y": 16,
              "id": 109
            },
            {
              "x": 10,
              "y": 0,
              "id": 109
            },
            {
              "x": 10,
              "y": 4,
              "id": 109
            },
            {
              "x": 10,
              "y": 11,
              "id": 109
            },
            {
              "x": 10,
              "y": 16,
              "id": 109
            },
            {
              "x": 11,
              "y": 16,
              "id": 109
            },
            {
              "x": 12,
              "y": 16,
              "id": 109
            },
            {
              "x": 13,
              "y": 16,
              "id": 109
            },
            {
              "x": 14,
              "y": 16,
              "id": 109
            },
            {
              "x": 15,
              "y": 0,
              "id": 109
            },
            {
              "x": 15,
              "y": 16,
              "id": 109
            },
            {
              "x": 16,
              "y": 0,
              "id": 109
            },
            {
              "x": 16,
              "y": 16,
              "id": 109
            },
            {
              "x": 17,
              "y": 0,
              "id": 109
            },
            {
              "x": 17,
              "y": 1,
              "id": 109
            },
            {
              "x": 17,
              "y": 2,
              "id": 109
            },
            {
              "x": 17,
              "y": 3,
              "id": 109
            },
            {
              "x": 17,
              "y": 8,
              "id": 109
            },
            {
              "x": 17,
              "y": 9,
              "id": 109
            },
            {
              "x": 17,
              "y": 10,
              "id": 109
            },
            {
              "x": 17,
              "y": 11,
              "id": 109
            },
            {
              "x": 17,
              "y": 12,
              "id": 109
            },
            {
              "x": 17,
              "y": 13,
              "id": 109
            },
            {
              "x": 17,
              "y": 14,
              "id": 109
            },
            {
              "x": 17,
              "y": 15,
              "id": 109
            },
            {
              "x": 17,
              "y": 16,
              "id": 109
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - top half",
          "positions": [
            {
              "x": 4,
              "y": 5,
              "id": 109
            },
            {
              "x": 4,
              "y": 9,
              "id": 109
            },
            {
              "x": 5,
              "y": 5,
              "id": 109
            },
            {
              "x": 5,
              "y": 9,
              "id": 109
            },
            {
              "x": 6,
              "y": 5,
              "id": 109
            },
            {
              "x": 6,
              "y": 9,
              "id": 109
            },
            {
              "x": 7,
              "y": 5,
              "id": 109
            },
            {
              "x": 7,
              "y": 9,
              "id": 109
            },
            {
              "x": 8,
              "y": 5,
              "id": 109
            },
            {
              "x": 8,
              "y": 12,
              "id": 109
            },
            {
              "x": 9,
              "y": 5,
              "id": 109
            },
            {
              "x": 9,
              "y": 12,
              "id": 109
            },
            {
              "x": 10,
              "y": 12,
              "id": 109
            },
            {
              "x": 11,
              "y": 12,
              "id": 109
            }
          ],
          "collision": {
            "type": "top-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    },
    "lily-harbor": {
      "id": "lily-harbor",
      "name": "Lily Harbor",
      "kind": "town",
      "safezone": true,
      "tileSize": 128,
      "mapWidth": 30,
      "mapHeight": 19,
      "image": "assets/Maps/Lily Harbor/Lily Harbor.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 0
            },
            {
              "x": 0,
              "y": 8,
              "id": 0
            },
            {
              "x": 0,
              "y": 9,
              "id": 0
            },
            {
              "x": 0,
              "y": 12,
              "id": 1
            },
            {
              "x": 0,
              "y": 13,
              "id": 1
            },
            {
              "x": 0,
              "y": 14,
              "id": 1
            },
            {
              "x": 0,
              "y": 15,
              "id": 1
            },
            {
              "x": 0,
              "y": 16,
              "id": 1
            },
            {
              "x": 0,
              "y": 17,
              "id": 1
            },
            {
              "x": 0,
              "y": 18,
              "id": 1
            },
            {
              "x": 1,
              "y": 0,
              "id": 0
            },
            {
              "x": 1,
              "y": 1,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 0
            },
            {
              "x": 1,
              "y": 8,
              "id": 0
            },
            {
              "x": 1,
              "y": 9,
              "id": 0
            },
            {
              "x": 1,
              "y": 12,
              "id": 2
            },
            {
              "x": 1,
              "y": 13,
              "id": 2
            },
            {
              "x": 1,
              "y": 14,
              "id": 2
            },
            {
              "x": 1,
              "y": 15,
              "id": 3
            },
            {
              "x": 1,
              "y": 16,
              "id": 1
            },
            {
              "x": 1,
              "y": 17,
              "id": 1
            },
            {
              "x": 1,
              "y": 18,
              "id": 1
            },
            {
              "x": 2,
              "y": 0,
              "id": 0
            },
            {
              "x": 2,
              "y": 1,
              "id": 0
            },
            {
              "x": 2,
              "y": 2,
              "id": 4
            },
            {
              "x": 2,
              "y": 3,
              "id": 4
            },
            {
              "x": 2,
              "y": 4,
              "id": 4
            },
            {
              "x": 2,
              "y": 5,
              "id": 0
            },
            {
              "x": 2,
              "y": 6,
              "id": 0
            },
            {
              "x": 2,
              "y": 7,
              "id": 0
            },
            {
              "x": 2,
              "y": 8,
              "id": 0
            },
            {
              "x": 2,
              "y": 9,
              "id": 0
            },
            {
              "x": 2,
              "y": 12,
              "id": 5
            },
            {
              "x": 2,
              "y": 13,
              "id": 6
            },
            {
              "x": 2,
              "y": 14,
              "id": 7
            },
            {
              "x": 2,
              "y": 15,
              "id": 8
            },
            {
              "x": 2,
              "y": 16,
              "id": 1
            },
            {
              "x": 2,
              "y": 17,
              "id": 1
            },
            {
              "x": 2,
              "y": 18,
              "id": 1
            },
            {
              "x": 3,
              "y": 0,
              "id": 0
            },
            {
              "x": 3,
              "y": 1,
              "id": 0
            },
            {
              "x": 3,
              "y": 2,
              "id": 4
            },
            {
              "x": 3,
              "y": 3,
              "id": 4
            },
            {
              "x": 3,
              "y": 4,
              "id": 4
            },
            {
              "x": 3,
              "y": 5,
              "id": 0
            },
            {
              "x": 3,
              "y": 6,
              "id": 0
            },
            {
              "x": 3,
              "y": 7,
              "id": 0
            },
            {
              "x": 3,
              "y": 8,
              "id": 0
            },
            {
              "x": 3,
              "y": 9,
              "id": 0
            },
            {
              "x": 3,
              "y": 12,
              "id": 9
            },
            {
              "x": 3,
              "y": 13,
              "id": 9
            },
            {
              "x": 3,
              "y": 14,
              "id": 10
            },
            {
              "x": 3,
              "y": 15,
              "id": 8
            },
            {
              "x": 3,
              "y": 16,
              "id": 1
            },
            {
              "x": 3,
              "y": 17,
              "id": 1
            },
            {
              "x": 3,
              "y": 18,
              "id": 1
            },
            {
              "x": 4,
              "y": 0,
              "id": 0
            },
            {
              "x": 4,
              "y": 1,
              "id": 0
            },
            {
              "x": 4,
              "y": 3,
              "id": 4
            },
            {
              "x": 4,
              "y": 4,
              "id": 4
            },
            {
              "x": 4,
              "y": 5,
              "id": 0
            },
            {
              "x": 4,
              "y": 6,
              "id": 0
            },
            {
              "x": 4,
              "y": 7,
              "id": 0
            },
            {
              "x": 4,
              "y": 8,
              "id": 0
            },
            {
              "x": 4,
              "y": 9,
              "id": 0
            },
            {
              "x": 4,
              "y": 12,
              "id": 9
            },
            {
              "x": 4,
              "y": 13,
              "id": 9
            },
            {
              "x": 4,
              "y": 14,
              "id": 11
            },
            {
              "x": 4,
              "y": 15,
              "id": 8
            },
            {
              "x": 4,
              "y": 16,
              "id": 1
            },
            {
              "x": 4,
              "y": 17,
              "id": 1
            },
            {
              "x": 4,
              "y": 18,
              "id": 1
            },
            {
              "x": 5,
              "y": 0,
              "id": 0
            },
            {
              "x": 5,
              "y": 1,
              "id": 0
            },
            {
              "x": 5,
              "y": 3,
              "id": 4
            },
            {
              "x": 5,
              "y": 4,
              "id": 4
            },
            {
              "x": 5,
              "y": 5,
              "id": 0
            },
            {
              "x": 5,
              "y": 9,
              "id": 12
            },
            {
              "x": 5,
              "y": 10,
              "id": 13
            },
            {
              "x": 5,
              "y": 11,
              "id": 14
            },
            {
              "x": 5,
              "y": 12,
              "id": 9
            },
            {
              "x": 5,
              "y": 13,
              "id": 9
            },
            {
              "x": 5,
              "y": 14,
              "id": 10
            },
            {
              "x": 5,
              "y": 15,
              "id": 8
            },
            {
              "x": 5,
              "y": 16,
              "id": 1
            },
            {
              "x": 5,
              "y": 17,
              "id": 1
            },
            {
              "x": 5,
              "y": 18,
              "id": 1
            },
            {
              "x": 6,
              "y": 0,
              "id": 0
            },
            {
              "x": 6,
              "y": 1,
              "id": 0
            },
            {
              "x": 6,
              "y": 3,
              "id": 0
            },
            {
              "x": 6,
              "y": 4,
              "id": 0
            },
            {
              "x": 6,
              "y": 5,
              "id": 0
            },
            {
              "x": 6,
              "y": 10,
              "id": 9
            },
            {
              "x": 6,
              "y": 11,
              "id": 9
            },
            {
              "x": 6,
              "y": 12,
              "id": 9
            },
            {
              "x": 6,
              "y": 13,
              "id": 9
            },
            {
              "x": 6,
              "y": 14,
              "id": 11
            },
            {
              "x": 6,
              "y": 15,
              "id": 8
            },
            {
              "x": 6,
              "y": 16,
              "id": 1
            },
            {
              "x": 6,
              "y": 17,
              "id": 1
            },
            {
              "x": 6,
              "y": 18,
              "id": 1
            },
            {
              "x": 7,
              "y": 0,
              "id": 0
            },
            {
              "x": 7,
              "y": 1,
              "id": 0
            },
            {
              "x": 7,
              "y": 2,
              "id": 0
            },
            {
              "x": 7,
              "y": 3,
              "id": 0
            },
            {
              "x": 7,
              "y": 4,
              "id": 0
            },
            {
              "x": 7,
              "y": 5,
              "id": 0
            },
            {
              "x": 7,
              "y": 10,
              "id": 9
            },
            {
              "x": 7,
              "y": 11,
              "id": 9
            },
            {
              "x": 7,
              "y": 12,
              "id": 9
            },
            {
              "x": 7,
              "y": 13,
              "id": 9
            },
            {
              "x": 7,
              "y": 14,
              "id": 15
            },
            {
              "x": 7,
              "y": 15,
              "id": 8
            },
            {
              "x": 7,
              "y": 16,
              "id": 1
            },
            {
              "x": 7,
              "y": 17,
              "id": 1
            },
            {
              "x": 7,
              "y": 18,
              "id": 1
            },
            {
              "x": 8,
              "y": 0,
              "id": 0
            },
            {
              "x": 8,
              "y": 1,
              "id": 0
            },
            {
              "x": 8,
              "y": 2,
              "id": 0
            },
            {
              "x": 8,
              "y": 3,
              "id": 0
            },
            {
              "x": 8,
              "y": 4,
              "id": 0
            },
            {
              "x": 8,
              "y": 5,
              "id": 0
            },
            {
              "x": 8,
              "y": 10,
              "id": 9
            },
            {
              "x": 8,
              "y": 11,
              "id": 9
            },
            {
              "x": 8,
              "y": 12,
              "id": 9
            },
            {
              "x": 8,
              "y": 13,
              "id": 9
            },
            {
              "x": 8,
              "y": 14,
              "id": 16
            },
            {
              "x": 8,
              "y": 15,
              "id": 8
            },
            {
              "x": 8,
              "y": 16,
              "id": 1
            },
            {
              "x": 8,
              "y": 17,
              "id": 1
            },
            {
              "x": 8,
              "y": 18,
              "id": 1
            },
            {
              "x": 9,
              "y": 0,
              "id": 0
            },
            {
              "x": 9,
              "y": 1,
              "id": 0
            },
            {
              "x": 9,
              "y": 2,
              "id": 0
            },
            {
              "x": 9,
              "y": 3,
              "id": 0
            },
            {
              "x": 9,
              "y": 4,
              "id": 0
            },
            {
              "x": 9,
              "y": 5,
              "id": 0
            },
            {
              "x": 9,
              "y": 10,
              "id": 9
            },
            {
              "x": 9,
              "y": 11,
              "id": 9
            },
            {
              "x": 9,
              "y": 12,
              "id": 9
            },
            {
              "x": 9,
              "y": 13,
              "id": 9
            },
            {
              "x": 9,
              "y": 14,
              "id": 11
            },
            {
              "x": 9,
              "y": 15,
              "id": 8
            },
            {
              "x": 9,
              "y": 16,
              "id": 1
            },
            {
              "x": 9,
              "y": 17,
              "id": 1
            },
            {
              "x": 9,
              "y": 18,
              "id": 1
            },
            {
              "x": 10,
              "y": 0,
              "id": 0
            },
            {
              "x": 10,
              "y": 1,
              "id": 0
            },
            {
              "x": 10,
              "y": 2,
              "id": 0
            },
            {
              "x": 10,
              "y": 3,
              "id": 0
            },
            {
              "x": 10,
              "y": 4,
              "id": 0
            },
            {
              "x": 10,
              "y": 5,
              "id": 0
            },
            {
              "x": 10,
              "y": 10,
              "id": 9
            },
            {
              "x": 10,
              "y": 11,
              "id": 9
            },
            {
              "x": 10,
              "y": 12,
              "id": 9
            },
            {
              "x": 10,
              "y": 13,
              "id": 9
            },
            {
              "x": 10,
              "y": 14,
              "id": 15
            },
            {
              "x": 10,
              "y": 15,
              "id": 8
            },
            {
              "x": 10,
              "y": 16,
              "id": 1
            },
            {
              "x": 10,
              "y": 17,
              "id": 1
            },
            {
              "x": 10,
              "y": 18,
              "id": 1
            },
            {
              "x": 11,
              "y": 0,
              "id": 0
            },
            {
              "x": 11,
              "y": 1,
              "id": 0
            },
            {
              "x": 11,
              "y": 2,
              "id": 0
            },
            {
              "x": 11,
              "y": 3,
              "id": 0
            },
            {
              "x": 11,
              "y": 4,
              "id": 0
            },
            {
              "x": 11,
              "y": 5,
              "id": 0
            },
            {
              "x": 11,
              "y": 10,
              "id": 9
            },
            {
              "x": 11,
              "y": 11,
              "id": 9
            },
            {
              "x": 11,
              "y": 12,
              "id": 9
            },
            {
              "x": 11,
              "y": 13,
              "id": 9
            },
            {
              "x": 11,
              "y": 14,
              "id": 11
            },
            {
              "x": 11,
              "y": 15,
              "id": 8
            },
            {
              "x": 11,
              "y": 16,
              "id": 1
            },
            {
              "x": 11,
              "y": 17,
              "id": 1
            },
            {
              "x": 11,
              "y": 18,
              "id": 1
            },
            {
              "x": 12,
              "y": 0,
              "id": 12
            },
            {
              "x": 12,
              "y": 1,
              "id": 12
            },
            {
              "x": 12,
              "y": 2,
              "id": 0
            },
            {
              "x": 12,
              "y": 3,
              "id": 0
            },
            {
              "x": 12,
              "y": 4,
              "id": 0
            },
            {
              "x": 12,
              "y": 5,
              "id": 0
            },
            {
              "x": 12,
              "y": 6,
              "id": 0
            },
            {
              "x": 12,
              "y": 10,
              "id": 9
            },
            {
              "x": 12,
              "y": 11,
              "id": 9
            },
            {
              "x": 12,
              "y": 12,
              "id": 9
            },
            {
              "x": 12,
              "y": 13,
              "id": 9
            },
            {
              "x": 12,
              "y": 14,
              "id": 10
            },
            {
              "x": 12,
              "y": 15,
              "id": 8
            },
            {
              "x": 12,
              "y": 16,
              "id": 1
            },
            {
              "x": 12,
              "y": 17,
              "id": 1
            },
            {
              "x": 12,
              "y": 18,
              "id": 1
            },
            {
              "x": 13,
              "y": 0,
              "id": 0
            },
            {
              "x": 13,
              "y": 1,
              "id": 12
            },
            {
              "x": 13,
              "y": 2,
              "id": 0
            },
            {
              "x": 13,
              "y": 3,
              "id": 0
            },
            {
              "x": 13,
              "y": 4,
              "id": 0
            },
            {
              "x": 13,
              "y": 5,
              "id": 0
            },
            {
              "x": 13,
              "y": 6,
              "id": 0
            },
            {
              "x": 13,
              "y": 10,
              "id": 9
            },
            {
              "x": 13,
              "y": 11,
              "id": 9
            },
            {
              "x": 13,
              "y": 12,
              "id": 9
            },
            {
              "x": 13,
              "y": 13,
              "id": 9
            },
            {
              "x": 13,
              "y": 14,
              "id": 15
            },
            {
              "x": 13,
              "y": 15,
              "id": 8
            },
            {
              "x": 13,
              "y": 16,
              "id": 1
            },
            {
              "x": 13,
              "y": 17,
              "id": 1
            },
            {
              "x": 13,
              "y": 18,
              "id": 1
            },
            {
              "x": 14,
              "y": 0,
              "id": 0
            },
            {
              "x": 14,
              "y": 2,
              "id": 0
            },
            {
              "x": 14,
              "y": 3,
              "id": 0
            },
            {
              "x": 14,
              "y": 4,
              "id": 0
            },
            {
              "x": 14,
              "y": 5,
              "id": 0
            },
            {
              "x": 14,
              "y": 6,
              "id": 0
            },
            {
              "x": 14,
              "y": 10,
              "id": 9
            },
            {
              "x": 14,
              "y": 11,
              "id": 9
            },
            {
              "x": 14,
              "y": 12,
              "id": 9
            },
            {
              "x": 14,
              "y": 13,
              "id": 9
            },
            {
              "x": 14,
              "y": 14,
              "id": 16
            },
            {
              "x": 14,
              "y": 15,
              "id": 8
            },
            {
              "x": 14,
              "y": 16,
              "id": 1
            },
            {
              "x": 14,
              "y": 17,
              "id": 1
            },
            {
              "x": 14,
              "y": 18,
              "id": 1
            },
            {
              "x": 15,
              "y": 0,
              "id": 12
            },
            {
              "x": 15,
              "y": 1,
              "id": 12
            },
            {
              "x": 15,
              "y": 2,
              "id": 0
            },
            {
              "x": 15,
              "y": 3,
              "id": 0
            },
            {
              "x": 15,
              "y": 4,
              "id": 0
            },
            {
              "x": 15,
              "y": 5,
              "id": 0
            },
            {
              "x": 15,
              "y": 6,
              "id": 0
            },
            {
              "x": 15,
              "y": 10,
              "id": 9
            },
            {
              "x": 15,
              "y": 11,
              "id": 9
            },
            {
              "x": 15,
              "y": 12,
              "id": 9
            },
            {
              "x": 15,
              "y": 13,
              "id": 9
            },
            {
              "x": 15,
              "y": 14,
              "id": 11
            },
            {
              "x": 15,
              "y": 15,
              "id": 8
            },
            {
              "x": 15,
              "y": 16,
              "id": 1
            },
            {
              "x": 15,
              "y": 17,
              "id": 1
            },
            {
              "x": 15,
              "y": 18,
              "id": 1
            },
            {
              "x": 16,
              "y": 0,
              "id": 0
            },
            {
              "x": 16,
              "y": 1,
              "id": 0
            },
            {
              "x": 16,
              "y": 2,
              "id": 0
            },
            {
              "x": 16,
              "y": 3,
              "id": 0
            },
            {
              "x": 16,
              "y": 4,
              "id": 0
            },
            {
              "x": 16,
              "y": 5,
              "id": 0
            },
            {
              "x": 16,
              "y": 6,
              "id": 0
            },
            {
              "x": 16,
              "y": 10,
              "id": 9
            },
            {
              "x": 16,
              "y": 11,
              "id": 9
            },
            {
              "x": 16,
              "y": 12,
              "id": 9
            },
            {
              "x": 16,
              "y": 13,
              "id": 9
            },
            {
              "x": 16,
              "y": 14,
              "id": 15
            },
            {
              "x": 16,
              "y": 15,
              "id": 8
            },
            {
              "x": 16,
              "y": 16,
              "id": 1
            },
            {
              "x": 16,
              "y": 17,
              "id": 1
            },
            {
              "x": 16,
              "y": 18,
              "id": 1
            },
            {
              "x": 17,
              "y": 0,
              "id": 0
            },
            {
              "x": 17,
              "y": 1,
              "id": 0
            },
            {
              "x": 17,
              "y": 2,
              "id": 0
            },
            {
              "x": 17,
              "y": 3,
              "id": 0
            },
            {
              "x": 17,
              "y": 4,
              "id": 0
            },
            {
              "x": 17,
              "y": 5,
              "id": 0
            },
            {
              "x": 17,
              "y": 6,
              "id": 0
            },
            {
              "x": 17,
              "y": 10,
              "id": 9
            },
            {
              "x": 17,
              "y": 11,
              "id": 9
            },
            {
              "x": 17,
              "y": 12,
              "id": 9
            },
            {
              "x": 17,
              "y": 13,
              "id": 9
            },
            {
              "x": 17,
              "y": 14,
              "id": 16
            },
            {
              "x": 17,
              "y": 15,
              "id": 8
            },
            {
              "x": 17,
              "y": 16,
              "id": 1
            },
            {
              "x": 17,
              "y": 17,
              "id": 1
            },
            {
              "x": 17,
              "y": 18,
              "id": 1
            },
            {
              "x": 18,
              "y": 0,
              "id": 0
            },
            {
              "x": 18,
              "y": 1,
              "id": 0
            },
            {
              "x": 18,
              "y": 2,
              "id": 0
            },
            {
              "x": 18,
              "y": 3,
              "id": 0
            },
            {
              "x": 18,
              "y": 4,
              "id": 0
            },
            {
              "x": 18,
              "y": 5,
              "id": 0
            },
            {
              "x": 18,
              "y": 6,
              "id": 0
            },
            {
              "x": 18,
              "y": 10,
              "id": 9
            },
            {
              "x": 18,
              "y": 11,
              "id": 9
            },
            {
              "x": 18,
              "y": 12,
              "id": 9
            },
            {
              "x": 18,
              "y": 13,
              "id": 9
            },
            {
              "x": 18,
              "y": 14,
              "id": 11
            },
            {
              "x": 18,
              "y": 15,
              "id": 8
            },
            {
              "x": 18,
              "y": 16,
              "id": 1
            },
            {
              "x": 18,
              "y": 17,
              "id": 1
            },
            {
              "x": 18,
              "y": 18,
              "id": 1
            },
            {
              "x": 19,
              "y": 0,
              "id": 0
            },
            {
              "x": 19,
              "y": 1,
              "id": 0
            },
            {
              "x": 19,
              "y": 2,
              "id": 0
            },
            {
              "x": 19,
              "y": 3,
              "id": 0
            },
            {
              "x": 19,
              "y": 4,
              "id": 0
            },
            {
              "x": 19,
              "y": 5,
              "id": 0
            },
            {
              "x": 19,
              "y": 6,
              "id": 0
            },
            {
              "x": 19,
              "y": 10,
              "id": 9
            },
            {
              "x": 19,
              "y": 11,
              "id": 9
            },
            {
              "x": 19,
              "y": 12,
              "id": 9
            },
            {
              "x": 19,
              "y": 13,
              "id": 9
            },
            {
              "x": 19,
              "y": 14,
              "id": 10
            },
            {
              "x": 19,
              "y": 15,
              "id": 8
            },
            {
              "x": 19,
              "y": 16,
              "id": 1
            },
            {
              "x": 19,
              "y": 17,
              "id": 1
            },
            {
              "x": 19,
              "y": 18,
              "id": 1
            },
            {
              "x": 20,
              "y": 0,
              "id": 0
            },
            {
              "x": 20,
              "y": 1,
              "id": 0
            },
            {
              "x": 20,
              "y": 2,
              "id": 0
            },
            {
              "x": 20,
              "y": 3,
              "id": 0
            },
            {
              "x": 20,
              "y": 4,
              "id": 0
            },
            {
              "x": 20,
              "y": 5,
              "id": 0
            },
            {
              "x": 20,
              "y": 6,
              "id": 0
            },
            {
              "x": 20,
              "y": 10,
              "id": 9
            },
            {
              "x": 20,
              "y": 11,
              "id": 9
            },
            {
              "x": 20,
              "y": 12,
              "id": 9
            },
            {
              "x": 20,
              "y": 13,
              "id": 9
            },
            {
              "x": 20,
              "y": 14,
              "id": 11
            },
            {
              "x": 20,
              "y": 15,
              "id": 8
            },
            {
              "x": 20,
              "y": 16,
              "id": 1
            },
            {
              "x": 20,
              "y": 17,
              "id": 1
            },
            {
              "x": 20,
              "y": 18,
              "id": 1
            },
            {
              "x": 21,
              "y": 0,
              "id": 0
            },
            {
              "x": 21,
              "y": 1,
              "id": 0
            },
            {
              "x": 21,
              "y": 2,
              "id": 0
            },
            {
              "x": 21,
              "y": 3,
              "id": 0
            },
            {
              "x": 21,
              "y": 4,
              "id": 0
            },
            {
              "x": 21,
              "y": 5,
              "id": 0
            },
            {
              "x": 21,
              "y": 6,
              "id": 0
            },
            {
              "x": 21,
              "y": 10,
              "id": 9
            },
            {
              "x": 21,
              "y": 11,
              "id": 9
            },
            {
              "x": 21,
              "y": 12,
              "id": 9
            },
            {
              "x": 21,
              "y": 13,
              "id": 9
            },
            {
              "x": 21,
              "y": 14,
              "id": 16
            },
            {
              "x": 21,
              "y": 15,
              "id": 8
            },
            {
              "x": 21,
              "y": 16,
              "id": 1
            },
            {
              "x": 21,
              "y": 17,
              "id": 1
            },
            {
              "x": 21,
              "y": 18,
              "id": 1
            },
            {
              "x": 22,
              "y": 0,
              "id": 0
            },
            {
              "x": 22,
              "y": 1,
              "id": 0
            },
            {
              "x": 22,
              "y": 3,
              "id": 0
            },
            {
              "x": 22,
              "y": 4,
              "id": 0
            },
            {
              "x": 22,
              "y": 5,
              "id": 0
            },
            {
              "x": 22,
              "y": 6,
              "id": 0
            },
            {
              "x": 22,
              "y": 9,
              "id": 12
            },
            {
              "x": 22,
              "y": 10,
              "id": 17
            },
            {
              "x": 22,
              "y": 11,
              "id": 18
            },
            {
              "x": 22,
              "y": 12,
              "id": 9
            },
            {
              "x": 22,
              "y": 13,
              "id": 9
            },
            {
              "x": 22,
              "y": 14,
              "id": 15
            },
            {
              "x": 22,
              "y": 15,
              "id": 8
            },
            {
              "x": 22,
              "y": 16,
              "id": 1
            },
            {
              "x": 22,
              "y": 17,
              "id": 1
            },
            {
              "x": 22,
              "y": 18,
              "id": 1
            },
            {
              "x": 23,
              "y": 0,
              "id": 0
            },
            {
              "x": 23,
              "y": 1,
              "id": 0
            },
            {
              "x": 23,
              "y": 3,
              "id": 0
            },
            {
              "x": 23,
              "y": 4,
              "id": 0
            },
            {
              "x": 23,
              "y": 6,
              "id": 0
            },
            {
              "x": 23,
              "y": 7,
              "id": 0
            },
            {
              "x": 23,
              "y": 8,
              "id": 0
            },
            {
              "x": 23,
              "y": 12,
              "id": 9
            },
            {
              "x": 23,
              "y": 13,
              "id": 9
            },
            {
              "x": 23,
              "y": 14,
              "id": 10
            },
            {
              "x": 23,
              "y": 15,
              "id": 8
            },
            {
              "x": 23,
              "y": 16,
              "id": 1
            },
            {
              "x": 23,
              "y": 17,
              "id": 1
            },
            {
              "x": 23,
              "y": 18,
              "id": 1
            },
            {
              "x": 24,
              "y": 0,
              "id": 0
            },
            {
              "x": 24,
              "y": 1,
              "id": 0
            },
            {
              "x": 24,
              "y": 4,
              "id": 0
            },
            {
              "x": 24,
              "y": 6,
              "id": 0
            },
            {
              "x": 24,
              "y": 7,
              "id": 0
            },
            {
              "x": 24,
              "y": 8,
              "id": 0
            },
            {
              "x": 24,
              "y": 12,
              "id": 9
            },
            {
              "x": 24,
              "y": 13,
              "id": 9
            },
            {
              "x": 24,
              "y": 14,
              "id": 16
            },
            {
              "x": 24,
              "y": 15,
              "id": 8
            },
            {
              "x": 24,
              "y": 16,
              "id": 1
            },
            {
              "x": 24,
              "y": 17,
              "id": 1
            },
            {
              "x": 24,
              "y": 18,
              "id": 1
            },
            {
              "x": 25,
              "y": 0,
              "id": 0
            },
            {
              "x": 25,
              "y": 1,
              "id": 0
            },
            {
              "x": 25,
              "y": 4,
              "id": 0
            },
            {
              "x": 25,
              "y": 5,
              "id": 0
            },
            {
              "x": 25,
              "y": 6,
              "id": 0
            },
            {
              "x": 25,
              "y": 7,
              "id": 0
            },
            {
              "x": 25,
              "y": 8,
              "id": 0
            },
            {
              "x": 25,
              "y": 12,
              "id": 9
            },
            {
              "x": 25,
              "y": 13,
              "id": 9
            },
            {
              "x": 25,
              "y": 14,
              "id": 11
            },
            {
              "x": 25,
              "y": 15,
              "id": 8
            },
            {
              "x": 25,
              "y": 16,
              "id": 1
            },
            {
              "x": 25,
              "y": 17,
              "id": 1
            },
            {
              "x": 25,
              "y": 18,
              "id": 1
            },
            {
              "x": 26,
              "y": 0,
              "id": 0
            },
            {
              "x": 26,
              "y": 1,
              "id": 0
            },
            {
              "x": 26,
              "y": 2,
              "id": 0
            },
            {
              "x": 26,
              "y": 4,
              "id": 0
            },
            {
              "x": 26,
              "y": 5,
              "id": 0
            },
            {
              "x": 26,
              "y": 6,
              "id": 0
            },
            {
              "x": 26,
              "y": 7,
              "id": 0
            },
            {
              "x": 26,
              "y": 11,
              "id": 19
            },
            {
              "x": 26,
              "y": 12,
              "id": 20
            },
            {
              "x": 26,
              "y": 13,
              "id": 21
            },
            {
              "x": 26,
              "y": 14,
              "id": 22
            },
            {
              "x": 26,
              "y": 15,
              "id": 8
            },
            {
              "x": 26,
              "y": 16,
              "id": 1
            },
            {
              "x": 26,
              "y": 17,
              "id": 1
            },
            {
              "x": 26,
              "y": 18,
              "id": 1
            },
            {
              "x": 27,
              "y": 0,
              "id": 0
            },
            {
              "x": 27,
              "y": 1,
              "id": 12
            },
            {
              "x": 27,
              "y": 2,
              "id": 12
            },
            {
              "x": 27,
              "y": 3,
              "id": 12
            },
            {
              "x": 27,
              "y": 4,
              "id": 0
            },
            {
              "x": 27,
              "y": 5,
              "id": 0
            },
            {
              "x": 27,
              "y": 6,
              "id": 0
            },
            {
              "x": 27,
              "y": 7,
              "id": 0
            },
            {
              "x": 27,
              "y": 9,
              "id": 23
            },
            {
              "x": 27,
              "y": 11,
              "id": 0
            },
            {
              "x": 27,
              "y": 12,
              "id": 24
            },
            {
              "x": 27,
              "y": 13,
              "id": 24
            },
            {
              "x": 27,
              "y": 14,
              "id": 24
            },
            {
              "x": 27,
              "y": 15,
              "id": 25
            },
            {
              "x": 27,
              "y": 16,
              "id": 1
            },
            {
              "x": 27,
              "y": 17,
              "id": 1
            },
            {
              "x": 27,
              "y": 18,
              "id": 1
            },
            {
              "x": 28,
              "y": 0,
              "id": 0
            },
            {
              "x": 28,
              "y": 1,
              "id": 12
            },
            {
              "x": 28,
              "y": 2,
              "id": 12
            },
            {
              "x": 28,
              "y": 3,
              "id": 12
            },
            {
              "x": 28,
              "y": 5,
              "id": 0
            },
            {
              "x": 28,
              "y": 6,
              "id": 0
            },
            {
              "x": 28,
              "y": 7,
              "id": 0
            },
            {
              "x": 28,
              "y": 8,
              "id": 0
            },
            {
              "x": 28,
              "y": 9,
              "id": 0
            },
            {
              "x": 28,
              "y": 10,
              "id": 0
            },
            {
              "x": 28,
              "y": 11,
              "id": 0
            },
            {
              "x": 28,
              "y": 12,
              "id": 1
            },
            {
              "x": 28,
              "y": 13,
              "id": 1
            },
            {
              "x": 28,
              "y": 14,
              "id": 1
            },
            {
              "x": 28,
              "y": 15,
              "id": 1
            },
            {
              "x": 28,
              "y": 16,
              "id": 1
            },
            {
              "x": 28,
              "y": 17,
              "id": 1
            },
            {
              "x": 28,
              "y": 18,
              "id": 1
            },
            {
              "x": 29,
              "y": 0,
              "id": 0
            },
            {
              "x": 29,
              "y": 1,
              "id": 12
            },
            {
              "x": 29,
              "y": 2,
              "id": 12
            },
            {
              "x": 29,
              "y": 3,
              "id": 12
            },
            {
              "x": 29,
              "y": 5,
              "id": 0
            },
            {
              "x": 29,
              "y": 6,
              "id": 0
            },
            {
              "x": 29,
              "y": 7,
              "id": 0
            },
            {
              "x": 29,
              "y": 8,
              "id": 0
            },
            {
              "x": 29,
              "y": 9,
              "id": 0
            },
            {
              "x": 29,
              "y": 10,
              "id": 0
            },
            {
              "x": 29,
              "y": 11,
              "id": 0
            },
            {
              "x": 29,
              "y": 12,
              "id": 1
            },
            {
              "x": 29,
              "y": 13,
              "id": 1
            },
            {
              "x": 29,
              "y": 14,
              "id": 1
            },
            {
              "x": 29,
              "y": 15,
              "id": 1
            },
            {
              "x": 29,
              "y": 16,
              "id": 1
            },
            {
              "x": 29,
              "y": 17,
              "id": 1
            },
            {
              "x": 29,
              "y": 18,
              "id": 1
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 26
            },
            {
              "x": 0,
              "y": 5,
              "id": 27
            },
            {
              "x": 0,
              "y": 9,
              "id": 28
            },
            {
              "x": 0,
              "y": 10,
              "id": 0
            },
            {
              "x": 0,
              "y": 11,
              "id": 0
            },
            {
              "x": 1,
              "y": 0,
              "id": 29
            },
            {
              "x": 1,
              "y": 5,
              "id": 29
            },
            {
              "x": 1,
              "y": 7,
              "id": 30
            },
            {
              "x": 1,
              "y": 9,
              "id": 31
            },
            {
              "x": 1,
              "y": 11,
              "id": 32
            },
            {
              "x": 2,
              "y": 0,
              "id": 33
            },
            {
              "x": 2,
              "y": 5,
              "id": 33
            },
            {
              "x": 2,
              "y": 7,
              "id": 34
            },
            {
              "x": 2,
              "y": 10,
              "id": 32
            },
            {
              "x": 3,
              "y": 0,
              "id": 29
            },
            {
              "x": 4,
              "y": 0,
              "id": 26
            },
            {
              "x": 5,
              "y": 0,
              "id": 29
            },
            {
              "x": 5,
              "y": 2,
              "id": 35
            },
            {
              "x": 5,
              "y": 7,
              "id": 12
            },
            {
              "x": 5,
              "y": 8,
              "id": 12
            },
            {
              "x": 5,
              "y": 9,
              "id": 36
            },
            {
              "x": 5,
              "y": 10,
              "id": 37
            },
            {
              "x": 5,
              "y": 12,
              "id": 38
            },
            {
              "x": 6,
              "y": 0,
              "id": 39
            },
            {
              "x": 6,
              "y": 2,
              "id": 0
            },
            {
              "x": 6,
              "y": 3,
              "id": 35
            },
            {
              "x": 6,
              "y": 5,
              "id": 33
            },
            {
              "x": 6,
              "y": 6,
              "id": 31
            },
            {
              "x": 6,
              "y": 7,
              "id": 12
            },
            {
              "x": 6,
              "y": 8,
              "id": 12
            },
            {
              "x": 6,
              "y": 9,
              "id": 12
            },
            {
              "x": 6,
              "y": 10,
              "id": 37
            },
            {
              "x": 7,
              "y": 0,
              "id": 29
            },
            {
              "x": 7,
              "y": 5,
              "id": 29
            },
            {
              "x": 7,
              "y": 7,
              "id": 12
            },
            {
              "x": 7,
              "y": 8,
              "id": 12
            },
            {
              "x": 7,
              "y": 9,
              "id": 12
            },
            {
              "x": 7,
              "y": 10,
              "id": 37
            },
            {
              "x": 7,
              "y": 13,
              "id": 40
            },
            {
              "x": 8,
              "y": 0,
              "id": 26
            },
            {
              "x": 8,
              "y": 5,
              "id": 27
            },
            {
              "x": 8,
              "y": 7,
              "id": 12
            },
            {
              "x": 8,
              "y": 8,
              "id": 12
            },
            {
              "x": 8,
              "y": 9,
              "id": 12
            },
            {
              "x": 8,
              "y": 10,
              "id": 37
            },
            {
              "x": 9,
              "y": 0,
              "id": 29
            },
            {
              "x": 9,
              "y": 1,
              "id": 41
            },
            {
              "x": 9,
              "y": 5,
              "id": 27
            },
            {
              "x": 9,
              "y": 7,
              "id": 12
            },
            {
              "x": 9,
              "y": 8,
              "id": 12
            },
            {
              "x": 9,
              "y": 9,
              "id": 12
            },
            {
              "x": 9,
              "y": 10,
              "id": 37
            },
            {
              "x": 10,
              "y": 0,
              "id": 33
            },
            {
              "x": 10,
              "y": 5,
              "id": 29
            },
            {
              "x": 10,
              "y": 7,
              "id": 12
            },
            {
              "x": 10,
              "y": 8,
              "id": 12
            },
            {
              "x": 10,
              "y": 9,
              "id": 12
            },
            {
              "x": 10,
              "y": 10,
              "id": 37
            },
            {
              "x": 11,
              "y": 0,
              "id": 29
            },
            {
              "x": 11,
              "y": 5,
              "id": 33
            },
            {
              "x": 11,
              "y": 7,
              "id": 12
            },
            {
              "x": 11,
              "y": 8,
              "id": 12
            },
            {
              "x": 11,
              "y": 9,
              "id": 12
            },
            {
              "x": 11,
              "y": 10,
              "id": 37
            },
            {
              "x": 12,
              "y": 0,
              "id": 36
            },
            {
              "x": 12,
              "y": 1,
              "id": 42
            },
            {
              "x": 12,
              "y": 5,
              "id": 29
            },
            {
              "x": 12,
              "y": 7,
              "id": 12
            },
            {
              "x": 12,
              "y": 8,
              "id": 12
            },
            {
              "x": 12,
              "y": 9,
              "id": 12
            },
            {
              "x": 12,
              "y": 10,
              "id": 37
            },
            {
              "x": 12,
              "y": 12,
              "id": 43
            },
            {
              "x": 13,
              "y": 0,
              "id": 12
            },
            {
              "x": 13,
              "y": 1,
              "id": 12
            },
            {
              "x": 13,
              "y": 5,
              "id": 27
            },
            {
              "x": 13,
              "y": 7,
              "id": 12
            },
            {
              "x": 13,
              "y": 8,
              "id": 12
            },
            {
              "x": 13,
              "y": 9,
              "id": 12
            },
            {
              "x": 13,
              "y": 10,
              "id": 37
            },
            {
              "x": 14,
              "y": 0,
              "id": 12
            },
            {
              "x": 14,
              "y": 1,
              "id": 12
            },
            {
              "x": 14,
              "y": 5,
              "id": 29
            },
            {
              "x": 14,
              "y": 7,
              "id": 12
            },
            {
              "x": 14,
              "y": 8,
              "id": 12
            },
            {
              "x": 14,
              "y": 9,
              "id": 12
            },
            {
              "x": 14,
              "y": 10,
              "id": 37
            },
            {
              "x": 15,
              "y": 0,
              "id": 44
            },
            {
              "x": 15,
              "y": 1,
              "id": 45
            },
            {
              "x": 15,
              "y": 3,
              "id": 35
            },
            {
              "x": 15,
              "y": 5,
              "id": 33
            },
            {
              "x": 15,
              "y": 7,
              "id": 12
            },
            {
              "x": 15,
              "y": 8,
              "id": 12
            },
            {
              "x": 15,
              "y": 9,
              "id": 12
            },
            {
              "x": 15,
              "y": 10,
              "id": 37
            },
            {
              "x": 16,
              "y": 0,
              "id": 29
            },
            {
              "x": 16,
              "y": 5,
              "id": 29
            },
            {
              "x": 16,
              "y": 7,
              "id": 12
            },
            {
              "x": 16,
              "y": 8,
              "id": 12
            },
            {
              "x": 16,
              "y": 9,
              "id": 12
            },
            {
              "x": 16,
              "y": 10,
              "id": 37
            },
            {
              "x": 17,
              "y": 0,
              "id": 33
            },
            {
              "x": 17,
              "y": 5,
              "id": 27
            },
            {
              "x": 17,
              "y": 7,
              "id": 12
            },
            {
              "x": 17,
              "y": 8,
              "id": 12
            },
            {
              "x": 17,
              "y": 9,
              "id": 12
            },
            {
              "x": 17,
              "y": 10,
              "id": 37
            },
            {
              "x": 18,
              "y": 0,
              "id": 29
            },
            {
              "x": 18,
              "y": 5,
              "id": 29
            },
            {
              "x": 18,
              "y": 7,
              "id": 12
            },
            {
              "x": 18,
              "y": 8,
              "id": 12
            },
            {
              "x": 18,
              "y": 9,
              "id": 12
            },
            {
              "x": 18,
              "y": 10,
              "id": 37
            },
            {
              "x": 18,
              "y": 13,
              "id": 46
            },
            {
              "x": 19,
              "y": 0,
              "id": 26
            },
            {
              "x": 19,
              "y": 1,
              "id": 41
            },
            {
              "x": 19,
              "y": 5,
              "id": 27
            },
            {
              "x": 19,
              "y": 7,
              "id": 12
            },
            {
              "x": 19,
              "y": 8,
              "id": 12
            },
            {
              "x": 19,
              "y": 9,
              "id": 12
            },
            {
              "x": 19,
              "y": 10,
              "id": 37
            },
            {
              "x": 20,
              "y": 0,
              "id": 29
            },
            {
              "x": 20,
              "y": 5,
              "id": 29
            },
            {
              "x": 20,
              "y": 7,
              "id": 12
            },
            {
              "x": 20,
              "y": 8,
              "id": 12
            },
            {
              "x": 20,
              "y": 9,
              "id": 12
            },
            {
              "x": 20,
              "y": 10,
              "id": 37
            },
            {
              "x": 21,
              "y": 0,
              "id": 39
            },
            {
              "x": 21,
              "y": 5,
              "id": 33
            },
            {
              "x": 21,
              "y": 7,
              "id": 12
            },
            {
              "x": 21,
              "y": 8,
              "id": 12
            },
            {
              "x": 21,
              "y": 9,
              "id": 12
            },
            {
              "x": 21,
              "y": 10,
              "id": 37
            },
            {
              "x": 21,
              "y": 12,
              "id": 47
            },
            {
              "x": 22,
              "y": 0,
              "id": 29
            },
            {
              "x": 22,
              "y": 2,
              "id": 0
            },
            {
              "x": 22,
              "y": 7,
              "id": 12
            },
            {
              "x": 22,
              "y": 8,
              "id": 12
            },
            {
              "x": 22,
              "y": 9,
              "id": 44
            },
            {
              "x": 22,
              "y": 10,
              "id": 37
            },
            {
              "x": 23,
              "y": 0,
              "id": 26
            },
            {
              "x": 23,
              "y": 2,
              "id": 0
            },
            {
              "x": 23,
              "y": 3,
              "id": 35
            },
            {
              "x": 23,
              "y": 5,
              "id": 0
            },
            {
              "x": 23,
              "y": 9,
              "id": 0
            },
            {
              "x": 23,
              "y": 12,
              "id": 48
            },
            {
              "x": 24,
              "y": 0,
              "id": 29
            },
            {
              "x": 24,
              "y": 2,
              "id": 0
            },
            {
              "x": 24,
              "y": 3,
              "id": 0
            },
            {
              "x": 24,
              "y": 5,
              "id": 0
            },
            {
              "x": 24,
              "y": 9,
              "id": 49
            },
            {
              "x": 25,
              "y": 0,
              "id": 33
            },
            {
              "x": 25,
              "y": 2,
              "id": 0
            },
            {
              "x": 25,
              "y": 3,
              "id": 0
            },
            {
              "x": 25,
              "y": 13,
              "id": 50
            },
            {
              "x": 26,
              "y": 0,
              "id": 29
            },
            {
              "x": 26,
              "y": 3,
              "id": 0
            },
            {
              "x": 26,
              "y": 5,
              "id": 33
            },
            {
              "x": 27,
              "y": 0,
              "id": 26
            },
            {
              "x": 27,
              "y": 5,
              "id": 29
            },
            {
              "x": 27,
              "y": 9,
              "id": 17
            },
            {
              "x": 28,
              "y": 0,
              "id": 29
            },
            {
              "x": 28,
              "y": 4,
              "id": 0
            },
            {
              "x": 28,
              "y": 5,
              "id": 27
            },
            {
              "x": 29,
              "y": 0,
              "id": 39
            },
            {
              "x": 29,
              "y": 4,
              "id": 0
            },
            {
              "x": 29,
              "y": 5,
              "id": 29
            },
            {
              "x": 29,
              "y": 9,
              "id": 51
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 52
            },
            {
              "x": 0,
              "y": 1,
              "id": 53
            },
            {
              "x": 0,
              "y": 2,
              "id": 53
            },
            {
              "x": 0,
              "y": 3,
              "id": 53
            },
            {
              "x": 0,
              "y": 4,
              "id": 53
            },
            {
              "x": 0,
              "y": 5,
              "id": 54
            },
            {
              "x": 0,
              "y": 6,
              "id": 51
            },
            {
              "x": 0,
              "y": 7,
              "id": 28
            },
            {
              "x": 0,
              "y": 8,
              "id": 51
            },
            {
              "x": 0,
              "y": 9,
              "id": 54
            },
            {
              "x": 0,
              "y": 10,
              "id": 51
            },
            {
              "x": 0,
              "y": 11,
              "id": 28
            },
            {
              "x": 0,
              "y": 12,
              "id": 55
            },
            {
              "x": 1,
              "y": 0,
              "id": 54
            },
            {
              "x": 1,
              "y": 2,
              "id": 0
            },
            {
              "x": 1,
              "y": 3,
              "id": 0
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 52
            },
            {
              "x": 1,
              "y": 7,
              "id": 56
            },
            {
              "x": 1,
              "y": 9,
              "id": 52
            },
            {
              "x": 1,
              "y": 10,
              "id": 0
            },
            {
              "x": 1,
              "y": 11,
              "id": 0
            },
            {
              "x": 1,
              "y": 12,
              "id": 55
            },
            {
              "x": 2,
              "y": 0,
              "id": 52
            },
            {
              "x": 2,
              "y": 2,
              "id": 57
            },
            {
              "x": 2,
              "y": 3,
              "id": 36
            },
            {
              "x": 2,
              "y": 4,
              "id": 42
            },
            {
              "x": 2,
              "y": 5,
              "id": 54
            },
            {
              "x": 2,
              "y": 6,
              "id": 56
            },
            {
              "x": 2,
              "y": 7,
              "id": 58
            },
            {
              "x": 2,
              "y": 9,
              "id": 54
            },
            {
              "x": 2,
              "y": 10,
              "id": 0
            },
            {
              "x": 2,
              "y": 11,
              "id": 49
            },
            {
              "x": 2,
              "y": 12,
              "id": 59
            },
            {
              "x": 3,
              "y": 0,
              "id": 54
            },
            {
              "x": 3,
              "y": 2,
              "id": 60
            },
            {
              "x": 3,
              "y": 3,
              "id": 61
            },
            {
              "x": 3,
              "y": 4,
              "id": 62
            },
            {
              "x": 3,
              "y": 5,
              "id": 63
            },
            {
              "x": 3,
              "y": 9,
              "id": 52
            },
            {
              "x": 3,
              "y": 10,
              "id": 0
            },
            {
              "x": 3,
              "y": 11,
              "id": 64
            },
            {
              "x": 4,
              "y": 0,
              "id": 52
            },
            {
              "x": 4,
              "y": 2,
              "id": 0
            },
            {
              "x": 4,
              "y": 3,
              "id": 60
            },
            {
              "x": 4,
              "y": 4,
              "id": 45
            },
            {
              "x": 4,
              "y": 9,
              "id": 54
            },
            {
              "x": 4,
              "y": 10,
              "id": 0
            },
            {
              "x": 4,
              "y": 11,
              "id": 64
            },
            {
              "x": 4,
              "y": 13,
              "id": 65
            },
            {
              "x": 5,
              "y": 0,
              "id": 54
            },
            {
              "x": 5,
              "y": 2,
              "id": 0
            },
            {
              "x": 5,
              "y": 3,
              "id": 0
            },
            {
              "x": 5,
              "y": 4,
              "id": 0
            },
            {
              "x": 5,
              "y": 5,
              "id": 66
            },
            {
              "x": 5,
              "y": 6,
              "id": 0
            },
            {
              "x": 5,
              "y": 7,
              "id": 57
            },
            {
              "x": 5,
              "y": 8,
              "id": 36
            },
            {
              "x": 5,
              "y": 9,
              "id": 63
            },
            {
              "x": 5,
              "y": 10,
              "id": 36
            },
            {
              "x": 6,
              "y": 0,
              "id": 52
            },
            {
              "x": 6,
              "y": 5,
              "id": 52
            },
            {
              "x": 6,
              "y": 6,
              "id": 0
            },
            {
              "x": 6,
              "y": 7,
              "id": 67
            },
            {
              "x": 7,
              "y": 0,
              "id": 54
            },
            {
              "x": 7,
              "y": 5,
              "id": 54
            },
            {
              "x": 7,
              "y": 6,
              "id": 0
            },
            {
              "x": 7,
              "y": 7,
              "id": 67
            },
            {
              "x": 8,
              "y": 0,
              "id": 52
            },
            {
              "x": 8,
              "y": 6,
              "id": 0
            },
            {
              "x": 8,
              "y": 7,
              "id": 67
            },
            {
              "x": 9,
              "y": 0,
              "id": 54
            },
            {
              "x": 9,
              "y": 5,
              "id": 52
            },
            {
              "x": 9,
              "y": 6,
              "id": 0
            },
            {
              "x": 9,
              "y": 7,
              "id": 67
            },
            {
              "x": 10,
              "y": 0,
              "id": 52
            },
            {
              "x": 10,
              "y": 5,
              "id": 54
            },
            {
              "x": 10,
              "y": 6,
              "id": 0
            },
            {
              "x": 10,
              "y": 7,
              "id": 67
            },
            {
              "x": 11,
              "y": 0,
              "id": 54
            },
            {
              "x": 11,
              "y": 1,
              "id": 68
            },
            {
              "x": 11,
              "y": 5,
              "id": 52
            },
            {
              "x": 11,
              "y": 6,
              "id": 0
            },
            {
              "x": 11,
              "y": 7,
              "id": 67
            },
            {
              "x": 11,
              "y": 13,
              "id": 69
            },
            {
              "x": 12,
              "y": 0,
              "id": 63
            },
            {
              "x": 12,
              "y": 1,
              "id": 70
            },
            {
              "x": 12,
              "y": 5,
              "id": 54
            },
            {
              "x": 12,
              "y": 6,
              "id": 0
            },
            {
              "x": 12,
              "y": 7,
              "id": 67
            },
            {
              "x": 13,
              "y": 1,
              "id": 62
            },
            {
              "x": 13,
              "y": 5,
              "id": 52
            },
            {
              "x": 13,
              "y": 6,
              "id": 0
            },
            {
              "x": 13,
              "y": 7,
              "id": 67
            },
            {
              "x": 14,
              "y": 1,
              "id": 62
            },
            {
              "x": 14,
              "y": 5,
              "id": 54
            },
            {
              "x": 14,
              "y": 6,
              "id": 0
            },
            {
              "x": 14,
              "y": 7,
              "id": 67
            },
            {
              "x": 15,
              "y": 0,
              "id": 66
            },
            {
              "x": 15,
              "y": 1,
              "id": 68
            },
            {
              "x": 15,
              "y": 5,
              "id": 52
            },
            {
              "x": 15,
              "y": 6,
              "id": 0
            },
            {
              "x": 15,
              "y": 7,
              "id": 67
            },
            {
              "x": 16,
              "y": 0,
              "id": 52
            },
            {
              "x": 16,
              "y": 1,
              "id": 70
            },
            {
              "x": 16,
              "y": 5,
              "id": 54
            },
            {
              "x": 16,
              "y": 6,
              "id": 0
            },
            {
              "x": 16,
              "y": 7,
              "id": 67
            },
            {
              "x": 17,
              "y": 0,
              "id": 54
            },
            {
              "x": 17,
              "y": 5,
              "id": 52
            },
            {
              "x": 17,
              "y": 6,
              "id": 0
            },
            {
              "x": 17,
              "y": 7,
              "id": 67
            },
            {
              "x": 18,
              "y": 0,
              "id": 52
            },
            {
              "x": 18,
              "y": 5,
              "id": 54
            },
            {
              "x": 18,
              "y": 6,
              "id": 0
            },
            {
              "x": 18,
              "y": 7,
              "id": 67
            },
            {
              "x": 19,
              "y": 0,
              "id": 54
            },
            {
              "x": 19,
              "y": 5,
              "id": 52
            },
            {
              "x": 19,
              "y": 6,
              "id": 0
            },
            {
              "x": 19,
              "y": 7,
              "id": 67
            },
            {
              "x": 19,
              "y": 11,
              "id": 71
            },
            {
              "x": 20,
              "y": 0,
              "id": 52
            },
            {
              "x": 20,
              "y": 5,
              "id": 52
            },
            {
              "x": 20,
              "y": 6,
              "id": 0
            },
            {
              "x": 20,
              "y": 7,
              "id": 67
            },
            {
              "x": 20,
              "y": 13,
              "id": 65
            },
            {
              "x": 21,
              "y": 0,
              "id": 54
            },
            {
              "x": 21,
              "y": 5,
              "id": 54
            },
            {
              "x": 21,
              "y": 6,
              "id": 0
            },
            {
              "x": 21,
              "y": 7,
              "id": 67
            },
            {
              "x": 22,
              "y": 0,
              "id": 52
            },
            {
              "x": 22,
              "y": 2,
              "id": 72
            },
            {
              "x": 22,
              "y": 5,
              "id": 63
            },
            {
              "x": 22,
              "y": 6,
              "id": 0
            },
            {
              "x": 22,
              "y": 7,
              "id": 60
            },
            {
              "x": 22,
              "y": 8,
              "id": 44
            },
            {
              "x": 22,
              "y": 9,
              "id": 66
            },
            {
              "x": 22,
              "y": 10,
              "id": 44
            },
            {
              "x": 23,
              "y": 0,
              "id": 54
            },
            {
              "x": 23,
              "y": 8,
              "id": 0
            },
            {
              "x": 23,
              "y": 9,
              "id": 54
            },
            {
              "x": 23,
              "y": 10,
              "id": 0
            },
            {
              "x": 23,
              "y": 11,
              "id": 64
            },
            {
              "x": 24,
              "y": 0,
              "id": 52
            },
            {
              "x": 24,
              "y": 8,
              "id": 0
            },
            {
              "x": 24,
              "y": 9,
              "id": 63
            },
            {
              "x": 24,
              "y": 10,
              "id": 13
            },
            {
              "x": 24,
              "y": 11,
              "id": 14
            },
            {
              "x": 25,
              "y": 0,
              "id": 54
            },
            {
              "x": 25,
              "y": 5,
              "id": 66
            },
            {
              "x": 25,
              "y": 8,
              "id": 0
            },
            {
              "x": 25,
              "y": 9,
              "id": 64
            },
            {
              "x": 25,
              "y": 10,
              "id": 73
            },
            {
              "x": 25,
              "y": 11,
              "id": 18
            },
            {
              "x": 26,
              "y": 0,
              "id": 52
            },
            {
              "x": 26,
              "y": 5,
              "id": 52
            },
            {
              "x": 26,
              "y": 8,
              "id": 49
            },
            {
              "x": 26,
              "y": 9,
              "id": 14
            },
            {
              "x": 26,
              "y": 10,
              "id": 74
            },
            {
              "x": 26,
              "y": 11,
              "id": 60
            },
            {
              "x": 26,
              "y": 12,
              "id": 61
            },
            {
              "x": 27,
              "y": 0,
              "id": 54
            },
            {
              "x": 27,
              "y": 1,
              "id": 57
            },
            {
              "x": 27,
              "y": 2,
              "id": 36
            },
            {
              "x": 27,
              "y": 3,
              "id": 42
            },
            {
              "x": 27,
              "y": 5,
              "id": 54
            },
            {
              "x": 27,
              "y": 8,
              "id": 75
            },
            {
              "x": 27,
              "y": 9,
              "id": 66
            },
            {
              "x": 27,
              "y": 10,
              "id": 23
            },
            {
              "x": 27,
              "y": 11,
              "id": 0
            },
            {
              "x": 27,
              "y": 12,
              "id": 55
            },
            {
              "x": 28,
              "y": 0,
              "id": 52
            },
            {
              "x": 28,
              "y": 1,
              "id": 55
            },
            {
              "x": 28,
              "y": 3,
              "id": 62
            },
            {
              "x": 28,
              "y": 5,
              "id": 52
            },
            {
              "x": 28,
              "y": 8,
              "id": 0
            },
            {
              "x": 28,
              "y": 9,
              "id": 52
            },
            {
              "x": 28,
              "y": 11,
              "id": 0
            },
            {
              "x": 28,
              "y": 12,
              "id": 55
            },
            {
              "x": 29,
              "y": 0,
              "id": 54
            },
            {
              "x": 29,
              "y": 1,
              "id": 67
            },
            {
              "x": 29,
              "y": 3,
              "id": 76
            },
            {
              "x": 29,
              "y": 5,
              "id": 54
            },
            {
              "x": 29,
              "y": 6,
              "id": 28
            },
            {
              "x": 29,
              "y": 7,
              "id": 51
            },
            {
              "x": 29,
              "y": 8,
              "id": 28
            },
            {
              "x": 29,
              "y": 9,
              "id": 54
            },
            {
              "x": 29,
              "y": 10,
              "id": 28
            },
            {
              "x": 29,
              "y": 11,
              "id": 51
            },
            {
              "x": 29,
              "y": 12,
              "id": 55
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 77
            },
            {
              "x": 0,
              "y": 1,
              "id": 77
            },
            {
              "x": 0,
              "y": 2,
              "id": 77
            },
            {
              "x": 0,
              "y": 3,
              "id": 77
            },
            {
              "x": 0,
              "y": 12,
              "id": 78
            },
            {
              "x": 0,
              "y": 13,
              "id": 79
            },
            {
              "x": 0,
              "y": 14,
              "id": 80
            },
            {
              "x": 0,
              "y": 15,
              "id": 81
            },
            {
              "x": 0,
              "y": 16,
              "id": 82
            },
            {
              "x": 0,
              "y": 17,
              "id": 78
            },
            {
              "x": 0,
              "y": 18,
              "id": 80
            },
            {
              "x": 1,
              "y": 3,
              "id": 83
            },
            {
              "x": 1,
              "y": 5,
              "id": 84
            },
            {
              "x": 1,
              "y": 6,
              "id": 85
            },
            {
              "x": 1,
              "y": 18,
              "id": 81
            },
            {
              "x": 2,
              "y": 5,
              "id": 86
            },
            {
              "x": 2,
              "y": 6,
              "id": 87
            },
            {
              "x": 2,
              "y": 10,
              "id": 32
            },
            {
              "x": 2,
              "y": 18,
              "id": 79
            },
            {
              "x": 3,
              "y": 10,
              "id": 88
            },
            {
              "x": 3,
              "y": 18,
              "id": 81
            },
            {
              "x": 4,
              "y": 18,
              "id": 78
            },
            {
              "x": 5,
              "y": 2,
              "id": 83
            },
            {
              "x": 5,
              "y": 18,
              "id": 80
            },
            {
              "x": 6,
              "y": 1,
              "id": 89
            },
            {
              "x": 6,
              "y": 18,
              "id": 82
            },
            {
              "x": 7,
              "y": 18,
              "id": 78
            },
            {
              "x": 8,
              "y": 2,
              "id": 88
            },
            {
              "x": 8,
              "y": 18,
              "id": 79
            },
            {
              "x": 9,
              "y": 6,
              "id": 31
            },
            {
              "x": 9,
              "y": 18,
              "id": 80
            },
            {
              "x": 10,
              "y": 18,
              "id": 81
            },
            {
              "x": 11,
              "y": 0,
              "id": 90
            },
            {
              "x": 11,
              "y": 1,
              "id": 91
            },
            {
              "x": 11,
              "y": 3,
              "id": 92
            },
            {
              "x": 11,
              "y": 18,
              "id": 82
            },
            {
              "x": 13,
              "y": 9,
              "id": 93
            },
            {
              "x": 14,
              "y": 9,
              "id": 94
            },
            {
              "x": 16,
              "y": 0,
              "id": 90
            },
            {
              "x": 16,
              "y": 1,
              "id": 91
            },
            {
              "x": 16,
              "y": 18,
              "id": 79
            },
            {
              "x": 17,
              "y": 3,
              "id": 95
            },
            {
              "x": 17,
              "y": 18,
              "id": 78
            },
            {
              "x": 18,
              "y": 18,
              "id": 81
            },
            {
              "x": 19,
              "y": 2,
              "id": 96
            },
            {
              "x": 19,
              "y": 18,
              "id": 78
            },
            {
              "x": 20,
              "y": 18,
              "id": 80
            },
            {
              "x": 21,
              "y": 4,
              "id": 95
            },
            {
              "x": 21,
              "y": 18,
              "id": 82
            },
            {
              "x": 22,
              "y": 18,
              "id": 81
            },
            {
              "x": 23,
              "y": 1,
              "id": 83
            },
            {
              "x": 23,
              "y": 18,
              "id": 79
            },
            {
              "x": 24,
              "y": 6,
              "id": 96
            },
            {
              "x": 24,
              "y": 18,
              "id": 80
            },
            {
              "x": 25,
              "y": 18,
              "id": 78
            },
            {
              "x": 26,
              "y": 2,
              "id": 97
            },
            {
              "x": 26,
              "y": 18,
              "id": 80
            },
            {
              "x": 27,
              "y": 11,
              "id": 88
            },
            {
              "x": 27,
              "y": 18,
              "id": 82
            },
            {
              "x": 28,
              "y": 4,
              "id": 97
            },
            {
              "x": 28,
              "y": 6,
              "id": 83
            },
            {
              "x": 28,
              "y": 18,
              "id": 79
            },
            {
              "x": 29,
              "y": 12,
              "id": 80
            },
            {
              "x": 29,
              "y": 13,
              "id": 78
            },
            {
              "x": 29,
              "y": 14,
              "id": 80
            },
            {
              "x": 29,
              "y": 15,
              "id": 82
            },
            {
              "x": 29,
              "y": 16,
              "id": 79
            },
            {
              "x": 29,
              "y": 17,
              "id": 80
            },
            {
              "x": 29,
              "y": 18,
              "id": 78
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": [
            {
              "x": 1,
              "y": 2,
              "id": 98
            },
            {
              "x": 2,
              "y": 2,
              "id": 99
            },
            {
              "x": 3,
              "y": 2,
              "id": 100
            },
            {
              "x": 4,
              "y": 2,
              "id": 101
            },
            {
              "x": 6,
              "y": 6,
              "id": 102
            },
            {
              "x": 6,
              "y": 7,
              "id": 103
            },
            {
              "x": 7,
              "y": 6,
              "id": 104
            },
            {
              "x": 7,
              "y": 7,
              "id": 105
            },
            {
              "x": 8,
              "y": 6,
              "id": 106
            },
            {
              "x": 8,
              "y": 7,
              "id": 107
            },
            {
              "x": 9,
              "y": 6,
              "id": 108
            },
            {
              "x": 9,
              "y": 7,
              "id": 109
            },
            {
              "x": 11,
              "y": 6,
              "id": 110
            },
            {
              "x": 11,
              "y": 7,
              "id": 111
            },
            {
              "x": 12,
              "y": 6,
              "id": 112
            },
            {
              "x": 12,
              "y": 7,
              "id": 113
            },
            {
              "x": 13,
              "y": 6,
              "id": 114
            },
            {
              "x": 13,
              "y": 7,
              "id": 115
            },
            {
              "x": 14,
              "y": 6,
              "id": 116
            },
            {
              "x": 14,
              "y": 7,
              "id": 117
            },
            {
              "x": 15,
              "y": 6,
              "id": 118
            },
            {
              "x": 15,
              "y": 7,
              "id": 119
            },
            {
              "x": 16,
              "y": 6,
              "id": 120
            },
            {
              "x": 16,
              "y": 7,
              "id": 121
            },
            {
              "x": 18,
              "y": 6,
              "id": 122
            },
            {
              "x": 18,
              "y": 7,
              "id": 123
            },
            {
              "x": 19,
              "y": 6,
              "id": 124
            },
            {
              "x": 19,
              "y": 7,
              "id": 125
            },
            {
              "x": 20,
              "y": 6,
              "id": 126
            },
            {
              "x": 20,
              "y": 7,
              "id": 127
            },
            {
              "x": 21,
              "y": 6,
              "id": 128
            },
            {
              "x": 21,
              "y": 7,
              "id": 129
            },
            {
              "x": 25,
              "y": 8,
              "id": 98
            },
            {
              "x": 26,
              "y": 8,
              "id": 99
            },
            {
              "x": 27,
              "y": 8,
              "id": 100
            },
            {
              "x": 28,
              "y": 8,
              "id": 101
            }
          ]
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": [
            {
              "x": 1,
              "y": 1,
              "id": 130
            },
            {
              "x": 2,
              "y": 1,
              "id": 131
            },
            {
              "x": 3,
              "y": 1,
              "id": 132
            },
            {
              "x": 4,
              "y": 1,
              "id": 133
            },
            {
              "x": 4,
              "y": 9,
              "id": 90
            },
            {
              "x": 4,
              "y": 10,
              "id": 91
            },
            {
              "x": 6,
              "y": 5,
              "id": 134
            },
            {
              "x": 7,
              "y": 4,
              "id": 135
            },
            {
              "x": 7,
              "y": 5,
              "id": 136
            },
            {
              "x": 8,
              "y": 4,
              "id": 137
            },
            {
              "x": 8,
              "y": 5,
              "id": 138
            },
            {
              "x": 9,
              "y": 5,
              "id": 139
            },
            {
              "x": 10,
              "y": 5,
              "id": 90
            },
            {
              "x": 10,
              "y": 6,
              "id": 91
            },
            {
              "x": 11,
              "y": 5,
              "id": 140
            },
            {
              "x": 12,
              "y": 4,
              "id": 141
            },
            {
              "x": 12,
              "y": 5,
              "id": 142
            },
            {
              "x": 13,
              "y": 4,
              "id": 143
            },
            {
              "x": 13,
              "y": 5,
              "id": 144
            },
            {
              "x": 14,
              "y": 4,
              "id": 145
            },
            {
              "x": 14,
              "y": 5,
              "id": 146
            },
            {
              "x": 15,
              "y": 4,
              "id": 147
            },
            {
              "x": 15,
              "y": 5,
              "id": 148
            },
            {
              "x": 16,
              "y": 5,
              "id": 149
            },
            {
              "x": 17,
              "y": 5,
              "id": 90
            },
            {
              "x": 17,
              "y": 6,
              "id": 91
            },
            {
              "x": 18,
              "y": 5,
              "id": 150
            },
            {
              "x": 19,
              "y": 4,
              "id": 151
            },
            {
              "x": 19,
              "y": 5,
              "id": 152
            },
            {
              "x": 20,
              "y": 4,
              "id": 153
            },
            {
              "x": 20,
              "y": 5,
              "id": 154
            },
            {
              "x": 21,
              "y": 5,
              "id": 155
            },
            {
              "x": 22,
              "y": 1,
              "id": 156
            },
            {
              "x": 23,
              "y": 9,
              "id": 90
            },
            {
              "x": 23,
              "y": 10,
              "id": 91
            },
            {
              "x": 25,
              "y": 7,
              "id": 130
            },
            {
              "x": 26,
              "y": 7,
              "id": 131
            },
            {
              "x": 27,
              "y": 7,
              "id": 132
            },
            {
              "x": 28,
              "y": 7,
              "id": 133
            }
          ]
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [
            {
              "x": 13,
              "y": 9,
              "id": 157
            }
          ],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [
            {
              "x": 14,
              "y": 9,
              "id": 157
            }
          ],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 157
            },
            {
              "x": 0,
              "y": 1,
              "id": 157
            },
            {
              "x": 0,
              "y": 2,
              "id": 157
            },
            {
              "x": 0,
              "y": 3,
              "id": 157
            },
            {
              "x": 0,
              "y": 4,
              "id": 157
            },
            {
              "x": 0,
              "y": 5,
              "id": 157
            },
            {
              "x": 0,
              "y": 6,
              "id": 157
            },
            {
              "x": 0,
              "y": 7,
              "id": 157
            },
            {
              "x": 0,
              "y": 8,
              "id": 157
            },
            {
              "x": 0,
              "y": 9,
              "id": 157
            },
            {
              "x": 0,
              "y": 10,
              "id": 157
            },
            {
              "x": 0,
              "y": 11,
              "id": 157
            },
            {
              "x": 0,
              "y": 12,
              "id": 157
            },
            {
              "x": 0,
              "y": 13,
              "id": 157
            },
            {
              "x": 0,
              "y": 14,
              "id": 157
            },
            {
              "x": 0,
              "y": 15,
              "id": 157
            },
            {
              "x": 0,
              "y": 16,
              "id": 157
            },
            {
              "x": 0,
              "y": 17,
              "id": 157
            },
            {
              "x": 0,
              "y": 18,
              "id": 157
            },
            {
              "x": 1,
              "y": 0,
              "id": 157
            },
            {
              "x": 1,
              "y": 5,
              "id": 157
            },
            {
              "x": 1,
              "y": 6,
              "id": 157
            },
            {
              "x": 1,
              "y": 9,
              "id": 157
            },
            {
              "x": 1,
              "y": 18,
              "id": 157
            },
            {
              "x": 2,
              "y": 0,
              "id": 157
            },
            {
              "x": 2,
              "y": 5,
              "id": 157
            },
            {
              "x": 2,
              "y": 6,
              "id": 157
            },
            {
              "x": 2,
              "y": 9,
              "id": 157
            },
            {
              "x": 2,
              "y": 18,
              "id": 157
            },
            {
              "x": 3,
              "y": 0,
              "id": 157
            },
            {
              "x": 3,
              "y": 9,
              "id": 157
            },
            {
              "x": 3,
              "y": 18,
              "id": 157
            },
            {
              "x": 4,
              "y": 0,
              "id": 157
            },
            {
              "x": 4,
              "y": 9,
              "id": 157
            },
            {
              "x": 4,
              "y": 10,
              "id": 157
            },
            {
              "x": 4,
              "y": 18,
              "id": 157
            },
            {
              "x": 5,
              "y": 0,
              "id": 157
            },
            {
              "x": 5,
              "y": 18,
              "id": 157
            },
            {
              "x": 6,
              "y": 0,
              "id": 157
            },
            {
              "x": 6,
              "y": 5,
              "id": 157
            },
            {
              "x": 6,
              "y": 6,
              "id": 157
            },
            {
              "x": 6,
              "y": 18,
              "id": 157
            },
            {
              "x": 7,
              "y": 0,
              "id": 157
            },
            {
              "x": 7,
              "y": 5,
              "id": 157
            },
            {
              "x": 7,
              "y": 6,
              "id": 157
            },
            {
              "x": 7,
              "y": 18,
              "id": 157
            },
            {
              "x": 8,
              "y": 0,
              "id": 157
            },
            {
              "x": 8,
              "y": 5,
              "id": 157
            },
            {
              "x": 8,
              "y": 6,
              "id": 157
            },
            {
              "x": 8,
              "y": 18,
              "id": 157
            },
            {
              "x": 9,
              "y": 0,
              "id": 157
            },
            {
              "x": 9,
              "y": 5,
              "id": 157
            },
            {
              "x": 9,
              "y": 6,
              "id": 157
            },
            {
              "x": 9,
              "y": 18,
              "id": 157
            },
            {
              "x": 10,
              "y": 0,
              "id": 157
            },
            {
              "x": 10,
              "y": 5,
              "id": 157
            },
            {
              "x": 10,
              "y": 6,
              "id": 157
            },
            {
              "x": 10,
              "y": 18,
              "id": 157
            },
            {
              "x": 11,
              "y": 0,
              "id": 157
            },
            {
              "x": 11,
              "y": 1,
              "id": 157
            },
            {
              "x": 11,
              "y": 5,
              "id": 157
            },
            {
              "x": 11,
              "y": 6,
              "id": 157
            },
            {
              "x": 11,
              "y": 18,
              "id": 157
            },
            {
              "x": 12,
              "y": 5,
              "id": 157
            },
            {
              "x": 12,
              "y": 6,
              "id": 157
            },
            {
              "x": 13,
              "y": 5,
              "id": 157
            },
            {
              "x": 13,
              "y": 6,
              "id": 157
            },
            {
              "x": 14,
              "y": 5,
              "id": 157
            },
            {
              "x": 14,
              "y": 6,
              "id": 157
            },
            {
              "x": 15,
              "y": 5,
              "id": 157
            },
            {
              "x": 15,
              "y": 6,
              "id": 157
            },
            {
              "x": 16,
              "y": 0,
              "id": 157
            },
            {
              "x": 16,
              "y": 1,
              "id": 157
            },
            {
              "x": 16,
              "y": 5,
              "id": 157
            },
            {
              "x": 16,
              "y": 6,
              "id": 157
            },
            {
              "x": 16,
              "y": 18,
              "id": 157
            },
            {
              "x": 17,
              "y": 0,
              "id": 157
            },
            {
              "x": 17,
              "y": 5,
              "id": 157
            },
            {
              "x": 17,
              "y": 6,
              "id": 157
            },
            {
              "x": 17,
              "y": 18,
              "id": 157
            },
            {
              "x": 18,
              "y": 0,
              "id": 157
            },
            {
              "x": 18,
              "y": 5,
              "id": 157
            },
            {
              "x": 18,
              "y": 6,
              "id": 157
            },
            {
              "x": 18,
              "y": 18,
              "id": 157
            },
            {
              "x": 19,
              "y": 0,
              "id": 157
            },
            {
              "x": 19,
              "y": 5,
              "id": 157
            },
            {
              "x": 19,
              "y": 6,
              "id": 157
            },
            {
              "x": 19,
              "y": 18,
              "id": 157
            },
            {
              "x": 20,
              "y": 0,
              "id": 157
            },
            {
              "x": 20,
              "y": 5,
              "id": 157
            },
            {
              "x": 20,
              "y": 6,
              "id": 157
            },
            {
              "x": 20,
              "y": 18,
              "id": 157
            },
            {
              "x": 21,
              "y": 0,
              "id": 157
            },
            {
              "x": 21,
              "y": 5,
              "id": 157
            },
            {
              "x": 21,
              "y": 6,
              "id": 157
            },
            {
              "x": 21,
              "y": 18,
              "id": 157
            },
            {
              "x": 22,
              "y": 0,
              "id": 157
            },
            {
              "x": 22,
              "y": 2,
              "id": 157
            },
            {
              "x": 22,
              "y": 18,
              "id": 157
            },
            {
              "x": 23,
              "y": 0,
              "id": 157
            },
            {
              "x": 23,
              "y": 9,
              "id": 157
            },
            {
              "x": 23,
              "y": 10,
              "id": 157
            },
            {
              "x": 23,
              "y": 18,
              "id": 157
            },
            {
              "x": 24,
              "y": 0,
              "id": 157
            },
            {
              "x": 24,
              "y": 18,
              "id": 157
            },
            {
              "x": 25,
              "y": 0,
              "id": 157
            },
            {
              "x": 25,
              "y": 18,
              "id": 157
            },
            {
              "x": 26,
              "y": 0,
              "id": 157
            },
            {
              "x": 26,
              "y": 5,
              "id": 157
            },
            {
              "x": 26,
              "y": 18,
              "id": 157
            },
            {
              "x": 27,
              "y": 0,
              "id": 157
            },
            {
              "x": 27,
              "y": 5,
              "id": 157
            },
            {
              "x": 27,
              "y": 18,
              "id": 157
            },
            {
              "x": 28,
              "y": 0,
              "id": 157
            },
            {
              "x": 28,
              "y": 5,
              "id": 157
            },
            {
              "x": 28,
              "y": 18,
              "id": 157
            },
            {
              "x": 29,
              "y": 0,
              "id": 157
            },
            {
              "x": 29,
              "y": 5,
              "id": 157
            },
            {
              "x": 29,
              "y": 6,
              "id": 157
            },
            {
              "x": 29,
              "y": 7,
              "id": 157
            },
            {
              "x": 29,
              "y": 8,
              "id": 157
            },
            {
              "x": 29,
              "y": 9,
              "id": 157
            },
            {
              "x": 29,
              "y": 10,
              "id": 157
            },
            {
              "x": 29,
              "y": 11,
              "id": 157
            },
            {
              "x": 29,
              "y": 12,
              "id": 157
            },
            {
              "x": 29,
              "y": 13,
              "id": 157
            },
            {
              "x": 29,
              "y": 14,
              "id": 157
            },
            {
              "x": 29,
              "y": 15,
              "id": 157
            },
            {
              "x": 29,
              "y": 16,
              "id": 157
            },
            {
              "x": 29,
              "y": 17,
              "id": 157
            },
            {
              "x": 29,
              "y": 18,
              "id": 157
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    },
    "plumeria-shores": {
      "id": "plumeria-shores",
      "name": "Plumeria Shores",
      "kind": "town",
      "safezone": false,
      "tileSize": 128,
      "mapWidth": 24,
      "mapHeight": 18,
      "image": "assets/Maps/Plumeria Shores/Plumeria Shores.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 0
            },
            {
              "x": 0,
              "y": 8,
              "id": 0
            },
            {
              "x": 0,
              "y": 9,
              "id": 0
            },
            {
              "x": 0,
              "y": 10,
              "id": 0
            },
            {
              "x": 0,
              "y": 11,
              "id": 0
            },
            {
              "x": 0,
              "y": 12,
              "id": 0
            },
            {
              "x": 0,
              "y": 13,
              "id": 0
            },
            {
              "x": 0,
              "y": 14,
              "id": 0
            },
            {
              "x": 0,
              "y": 15,
              "id": 0
            },
            {
              "x": 0,
              "y": 16,
              "id": 0
            },
            {
              "x": 0,
              "y": 17,
              "id": 0
            },
            {
              "x": 1,
              "y": 0,
              "id": 0
            },
            {
              "x": 1,
              "y": 1,
              "id": 0
            },
            {
              "x": 1,
              "y": 2,
              "id": 0
            },
            {
              "x": 1,
              "y": 3,
              "id": 0
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 0
            },
            {
              "x": 1,
              "y": 8,
              "id": 0
            },
            {
              "x": 1,
              "y": 9,
              "id": 0
            },
            {
              "x": 1,
              "y": 10,
              "id": 0
            },
            {
              "x": 1,
              "y": 11,
              "id": 0
            },
            {
              "x": 1,
              "y": 12,
              "id": 0
            },
            {
              "x": 1,
              "y": 13,
              "id": 0
            },
            {
              "x": 1,
              "y": 14,
              "id": 0
            },
            {
              "x": 1,
              "y": 15,
              "id": 0
            },
            {
              "x": 1,
              "y": 16,
              "id": 0
            },
            {
              "x": 1,
              "y": 17,
              "id": 0
            },
            {
              "x": 2,
              "y": 0,
              "id": 0
            },
            {
              "x": 2,
              "y": 1,
              "id": 0
            },
            {
              "x": 2,
              "y": 2,
              "id": 1
            },
            {
              "x": 2,
              "y": 3,
              "id": 2
            },
            {
              "x": 2,
              "y": 4,
              "id": 2
            },
            {
              "x": 2,
              "y": 5,
              "id": 2
            },
            {
              "x": 2,
              "y": 6,
              "id": 2
            },
            {
              "x": 2,
              "y": 7,
              "id": 2
            },
            {
              "x": 2,
              "y": 8,
              "id": 2
            },
            {
              "x": 2,
              "y": 9,
              "id": 2
            },
            {
              "x": 2,
              "y": 10,
              "id": 2
            },
            {
              "x": 2,
              "y": 11,
              "id": 2
            },
            {
              "x": 2,
              "y": 12,
              "id": 2
            },
            {
              "x": 2,
              "y": 13,
              "id": 2
            },
            {
              "x": 2,
              "y": 14,
              "id": 2
            },
            {
              "x": 2,
              "y": 15,
              "id": 3
            },
            {
              "x": 2,
              "y": 16,
              "id": 0
            },
            {
              "x": 2,
              "y": 17,
              "id": 0
            },
            {
              "x": 3,
              "y": 0,
              "id": 0
            },
            {
              "x": 3,
              "y": 1,
              "id": 0
            },
            {
              "x": 3,
              "y": 2,
              "id": 4
            },
            {
              "x": 3,
              "y": 3,
              "id": 5
            },
            {
              "x": 3,
              "y": 4,
              "id": 6
            },
            {
              "x": 3,
              "y": 5,
              "id": 7
            },
            {
              "x": 3,
              "y": 6,
              "id": 8
            },
            {
              "x": 3,
              "y": 7,
              "id": 6
            },
            {
              "x": 3,
              "y": 8,
              "id": 9
            },
            {
              "x": 3,
              "y": 9,
              "id": 8
            },
            {
              "x": 3,
              "y": 10,
              "id": 7
            },
            {
              "x": 3,
              "y": 11,
              "id": 6
            },
            {
              "x": 3,
              "y": 12,
              "id": 9
            },
            {
              "x": 3,
              "y": 13,
              "id": 7
            },
            {
              "x": 3,
              "y": 14,
              "id": 10
            },
            {
              "x": 3,
              "y": 15,
              "id": 11
            },
            {
              "x": 3,
              "y": 16,
              "id": 0
            },
            {
              "x": 3,
              "y": 17,
              "id": 0
            },
            {
              "x": 4,
              "y": 0,
              "id": 0
            },
            {
              "x": 4,
              "y": 1,
              "id": 0
            },
            {
              "x": 4,
              "y": 2,
              "id": 4
            },
            {
              "x": 4,
              "y": 3,
              "id": 12
            },
            {
              "x": 4,
              "y": 4,
              "id": 13
            },
            {
              "x": 4,
              "y": 5,
              "id": 14
            },
            {
              "x": 4,
              "y": 6,
              "id": 15
            },
            {
              "x": 4,
              "y": 7,
              "id": 15
            },
            {
              "x": 4,
              "y": 8,
              "id": 16
            },
            {
              "x": 4,
              "y": 9,
              "id": 13
            },
            {
              "x": 4,
              "y": 10,
              "id": 13
            },
            {
              "x": 4,
              "y": 11,
              "id": 13
            },
            {
              "x": 4,
              "y": 12,
              "id": 13
            },
            {
              "x": 4,
              "y": 13,
              "id": 13
            },
            {
              "x": 4,
              "y": 14,
              "id": 17
            },
            {
              "x": 4,
              "y": 15,
              "id": 11
            },
            {
              "x": 4,
              "y": 16,
              "id": 0
            },
            {
              "x": 4,
              "y": 17,
              "id": 0
            },
            {
              "x": 5,
              "y": 0,
              "id": 0
            },
            {
              "x": 5,
              "y": 1,
              "id": 0
            },
            {
              "x": 5,
              "y": 2,
              "id": 4
            },
            {
              "x": 5,
              "y": 3,
              "id": 18
            },
            {
              "x": 5,
              "y": 4,
              "id": 13
            },
            {
              "x": 5,
              "y": 5,
              "id": 19
            },
            {
              "x": 5,
              "y": 6,
              "id": 20
            },
            {
              "x": 5,
              "y": 7,
              "id": 20
            },
            {
              "x": 5,
              "y": 8,
              "id": 21
            },
            {
              "x": 5,
              "y": 9,
              "id": 13
            },
            {
              "x": 5,
              "y": 10,
              "id": 13
            },
            {
              "x": 5,
              "y": 11,
              "id": 13
            },
            {
              "x": 5,
              "y": 12,
              "id": 13
            },
            {
              "x": 5,
              "y": 13,
              "id": 13
            },
            {
              "x": 5,
              "y": 14,
              "id": 22
            },
            {
              "x": 5,
              "y": 15,
              "id": 11
            },
            {
              "x": 5,
              "y": 16,
              "id": 0
            },
            {
              "x": 5,
              "y": 17,
              "id": 0
            },
            {
              "x": 6,
              "y": 0,
              "id": 0
            },
            {
              "x": 6,
              "y": 1,
              "id": 0
            },
            {
              "x": 6,
              "y": 2,
              "id": 4
            },
            {
              "x": 6,
              "y": 3,
              "id": 23
            },
            {
              "x": 6,
              "y": 4,
              "id": 13
            },
            {
              "x": 6,
              "y": 5,
              "id": 19
            },
            {
              "x": 6,
              "y": 6,
              "id": 20
            },
            {
              "x": 6,
              "y": 7,
              "id": 20
            },
            {
              "x": 6,
              "y": 8,
              "id": 21
            },
            {
              "x": 6,
              "y": 9,
              "id": 13
            },
            {
              "x": 6,
              "y": 10,
              "id": 13
            },
            {
              "x": 6,
              "y": 11,
              "id": 13
            },
            {
              "x": 6,
              "y": 12,
              "id": 13
            },
            {
              "x": 6,
              "y": 13,
              "id": 13
            },
            {
              "x": 6,
              "y": 14,
              "id": 24
            },
            {
              "x": 6,
              "y": 15,
              "id": 11
            },
            {
              "x": 6,
              "y": 16,
              "id": 0
            },
            {
              "x": 6,
              "y": 17,
              "id": 0
            },
            {
              "x": 7,
              "y": 0,
              "id": 0
            },
            {
              "x": 7,
              "y": 1,
              "id": 0
            },
            {
              "x": 7,
              "y": 2,
              "id": 4
            },
            {
              "x": 7,
              "y": 3,
              "id": 23
            },
            {
              "x": 7,
              "y": 4,
              "id": 13
            },
            {
              "x": 7,
              "y": 5,
              "id": 19
            },
            {
              "x": 7,
              "y": 6,
              "id": 20
            },
            {
              "x": 7,
              "y": 7,
              "id": 20
            },
            {
              "x": 7,
              "y": 8,
              "id": 21
            },
            {
              "x": 7,
              "y": 9,
              "id": 13
            },
            {
              "x": 7,
              "y": 10,
              "id": 13
            },
            {
              "x": 7,
              "y": 11,
              "id": 13
            },
            {
              "x": 7,
              "y": 12,
              "id": 13
            },
            {
              "x": 7,
              "y": 13,
              "id": 13
            },
            {
              "x": 7,
              "y": 14,
              "id": 25
            },
            {
              "x": 7,
              "y": 15,
              "id": 11
            },
            {
              "x": 7,
              "y": 16,
              "id": 0
            },
            {
              "x": 7,
              "y": 17,
              "id": 0
            },
            {
              "x": 8,
              "y": 0,
              "id": 0
            },
            {
              "x": 8,
              "y": 1,
              "id": 0
            },
            {
              "x": 8,
              "y": 2,
              "id": 4
            },
            {
              "x": 8,
              "y": 3,
              "id": 23
            },
            {
              "x": 8,
              "y": 4,
              "id": 13
            },
            {
              "x": 8,
              "y": 5,
              "id": 19
            },
            {
              "x": 8,
              "y": 6,
              "id": 20
            },
            {
              "x": 8,
              "y": 7,
              "id": 26
            },
            {
              "x": 8,
              "y": 8,
              "id": 27
            },
            {
              "x": 8,
              "y": 9,
              "id": 13
            },
            {
              "x": 8,
              "y": 10,
              "id": 13
            },
            {
              "x": 8,
              "y": 11,
              "id": 13
            },
            {
              "x": 8,
              "y": 12,
              "id": 13
            },
            {
              "x": 8,
              "y": 13,
              "id": 13
            },
            {
              "x": 8,
              "y": 14,
              "id": 17
            },
            {
              "x": 8,
              "y": 15,
              "id": 11
            },
            {
              "x": 8,
              "y": 16,
              "id": 0
            },
            {
              "x": 8,
              "y": 17,
              "id": 0
            },
            {
              "x": 9,
              "y": 0,
              "id": 0
            },
            {
              "x": 9,
              "y": 1,
              "id": 0
            },
            {
              "x": 9,
              "y": 2,
              "id": 4
            },
            {
              "x": 9,
              "y": 3,
              "id": 12
            },
            {
              "x": 9,
              "y": 4,
              "id": 13
            },
            {
              "x": 9,
              "y": 5,
              "id": 28
            },
            {
              "x": 9,
              "y": 6,
              "id": 29
            },
            {
              "x": 9,
              "y": 7,
              "id": 27
            },
            {
              "x": 9,
              "y": 8,
              "id": 13
            },
            {
              "x": 9,
              "y": 9,
              "id": 13
            },
            {
              "x": 9,
              "y": 10,
              "id": 13
            },
            {
              "x": 9,
              "y": 11,
              "id": 13
            },
            {
              "x": 9,
              "y": 12,
              "id": 13
            },
            {
              "x": 9,
              "y": 13,
              "id": 13
            },
            {
              "x": 9,
              "y": 14,
              "id": 22
            },
            {
              "x": 9,
              "y": 15,
              "id": 11
            },
            {
              "x": 9,
              "y": 16,
              "id": 0
            },
            {
              "x": 9,
              "y": 17,
              "id": 0
            },
            {
              "x": 10,
              "y": 0,
              "id": 0
            },
            {
              "x": 10,
              "y": 1,
              "id": 0
            },
            {
              "x": 10,
              "y": 2,
              "id": 4
            },
            {
              "x": 10,
              "y": 3,
              "id": 18
            },
            {
              "x": 10,
              "y": 4,
              "id": 13
            },
            {
              "x": 10,
              "y": 5,
              "id": 13
            },
            {
              "x": 10,
              "y": 6,
              "id": 13
            },
            {
              "x": 10,
              "y": 7,
              "id": 13
            },
            {
              "x": 10,
              "y": 8,
              "id": 14
            },
            {
              "x": 10,
              "y": 9,
              "id": 30
            },
            {
              "x": 10,
              "y": 10,
              "id": 20
            },
            {
              "x": 10,
              "y": 11,
              "id": 16
            },
            {
              "x": 10,
              "y": 12,
              "id": 13
            },
            {
              "x": 10,
              "y": 13,
              "id": 13
            },
            {
              "x": 10,
              "y": 14,
              "id": 24
            },
            {
              "x": 10,
              "y": 15,
              "id": 11
            },
            {
              "x": 10,
              "y": 16,
              "id": 0
            },
            {
              "x": 10,
              "y": 17,
              "id": 0
            },
            {
              "x": 11,
              "y": 0,
              "id": 0
            },
            {
              "x": 11,
              "y": 1,
              "id": 0
            },
            {
              "x": 11,
              "y": 2,
              "id": 4
            },
            {
              "x": 11,
              "y": 3,
              "id": 12
            },
            {
              "x": 11,
              "y": 4,
              "id": 13
            },
            {
              "x": 11,
              "y": 5,
              "id": 13
            },
            {
              "x": 11,
              "y": 6,
              "id": 13
            },
            {
              "x": 11,
              "y": 7,
              "id": 13
            },
            {
              "x": 11,
              "y": 8,
              "id": 31
            },
            {
              "x": 11,
              "y": 9,
              "id": 20
            },
            {
              "x": 11,
              "y": 10,
              "id": 20
            },
            {
              "x": 11,
              "y": 11,
              "id": 32
            },
            {
              "x": 11,
              "y": 12,
              "id": 13
            },
            {
              "x": 11,
              "y": 13,
              "id": 13
            },
            {
              "x": 11,
              "y": 14,
              "id": 22
            },
            {
              "x": 11,
              "y": 15,
              "id": 11
            },
            {
              "x": 11,
              "y": 16,
              "id": 0
            },
            {
              "x": 11,
              "y": 17,
              "id": 0
            },
            {
              "x": 12,
              "y": 0,
              "id": 0
            },
            {
              "x": 12,
              "y": 1,
              "id": 0
            },
            {
              "x": 12,
              "y": 2,
              "id": 4
            },
            {
              "x": 12,
              "y": 3,
              "id": 23
            },
            {
              "x": 12,
              "y": 4,
              "id": 13
            },
            {
              "x": 12,
              "y": 5,
              "id": 13
            },
            {
              "x": 12,
              "y": 6,
              "id": 13
            },
            {
              "x": 12,
              "y": 7,
              "id": 13
            },
            {
              "x": 12,
              "y": 8,
              "id": 31
            },
            {
              "x": 12,
              "y": 9,
              "id": 20
            },
            {
              "x": 12,
              "y": 10,
              "id": 20
            },
            {
              "x": 12,
              "y": 11,
              "id": 32
            },
            {
              "x": 12,
              "y": 12,
              "id": 13
            },
            {
              "x": 12,
              "y": 13,
              "id": 13
            },
            {
              "x": 12,
              "y": 14,
              "id": 17
            },
            {
              "x": 12,
              "y": 15,
              "id": 11
            },
            {
              "x": 12,
              "y": 16,
              "id": 0
            },
            {
              "x": 12,
              "y": 17,
              "id": 0
            },
            {
              "x": 13,
              "y": 0,
              "id": 0
            },
            {
              "x": 13,
              "y": 1,
              "id": 0
            },
            {
              "x": 13,
              "y": 2,
              "id": 4
            },
            {
              "x": 13,
              "y": 3,
              "id": 18
            },
            {
              "x": 13,
              "y": 4,
              "id": 14
            },
            {
              "x": 13,
              "y": 5,
              "id": 15
            },
            {
              "x": 13,
              "y": 6,
              "id": 16
            },
            {
              "x": 13,
              "y": 7,
              "id": 13
            },
            {
              "x": 13,
              "y": 8,
              "id": 31
            },
            {
              "x": 13,
              "y": 9,
              "id": 20
            },
            {
              "x": 13,
              "y": 10,
              "id": 20
            },
            {
              "x": 13,
              "y": 11,
              "id": 32
            },
            {
              "x": 13,
              "y": 12,
              "id": 13
            },
            {
              "x": 13,
              "y": 13,
              "id": 13
            },
            {
              "x": 13,
              "y": 14,
              "id": 22
            },
            {
              "x": 13,
              "y": 15,
              "id": 11
            },
            {
              "x": 13,
              "y": 16,
              "id": 0
            },
            {
              "x": 13,
              "y": 17,
              "id": 0
            },
            {
              "x": 14,
              "y": 0,
              "id": 0
            },
            {
              "x": 14,
              "y": 1,
              "id": 0
            },
            {
              "x": 14,
              "y": 2,
              "id": 4
            },
            {
              "x": 14,
              "y": 3,
              "id": 12
            },
            {
              "x": 14,
              "y": 4,
              "id": 19
            },
            {
              "x": 14,
              "y": 5,
              "id": 20
            },
            {
              "x": 14,
              "y": 6,
              "id": 32
            },
            {
              "x": 14,
              "y": 7,
              "id": 13
            },
            {
              "x": 14,
              "y": 8,
              "id": 31
            },
            {
              "x": 14,
              "y": 9,
              "id": 20
            },
            {
              "x": 14,
              "y": 10,
              "id": 20
            },
            {
              "x": 14,
              "y": 11,
              "id": 32
            },
            {
              "x": 14,
              "y": 12,
              "id": 13
            },
            {
              "x": 14,
              "y": 13,
              "id": 13
            },
            {
              "x": 14,
              "y": 14,
              "id": 25
            },
            {
              "x": 14,
              "y": 15,
              "id": 11
            },
            {
              "x": 14,
              "y": 16,
              "id": 0
            },
            {
              "x": 14,
              "y": 17,
              "id": 0
            },
            {
              "x": 15,
              "y": 0,
              "id": 0
            },
            {
              "x": 15,
              "y": 1,
              "id": 0
            },
            {
              "x": 15,
              "y": 2,
              "id": 4
            },
            {
              "x": 15,
              "y": 3,
              "id": 23
            },
            {
              "x": 15,
              "y": 4,
              "id": 31
            },
            {
              "x": 15,
              "y": 5,
              "id": 20
            },
            {
              "x": 15,
              "y": 6,
              "id": 32
            },
            {
              "x": 15,
              "y": 7,
              "id": 13
            },
            {
              "x": 15,
              "y": 8,
              "id": 31
            },
            {
              "x": 15,
              "y": 9,
              "id": 20
            },
            {
              "x": 15,
              "y": 10,
              "id": 20
            },
            {
              "x": 15,
              "y": 11,
              "id": 21
            },
            {
              "x": 15,
              "y": 12,
              "id": 13
            },
            {
              "x": 15,
              "y": 13,
              "id": 13
            },
            {
              "x": 15,
              "y": 14,
              "id": 25
            },
            {
              "x": 15,
              "y": 15,
              "id": 11
            },
            {
              "x": 15,
              "y": 16,
              "id": 0
            },
            {
              "x": 15,
              "y": 17,
              "id": 0
            },
            {
              "x": 16,
              "y": 0,
              "id": 0
            },
            {
              "x": 16,
              "y": 1,
              "id": 0
            },
            {
              "x": 16,
              "y": 2,
              "id": 4
            },
            {
              "x": 16,
              "y": 3,
              "id": 18
            },
            {
              "x": 16,
              "y": 4,
              "id": 31
            },
            {
              "x": 16,
              "y": 5,
              "id": 20
            },
            {
              "x": 16,
              "y": 6,
              "id": 32
            },
            {
              "x": 16,
              "y": 7,
              "id": 13
            },
            {
              "x": 16,
              "y": 8,
              "id": 28
            },
            {
              "x": 16,
              "y": 9,
              "id": 33
            },
            {
              "x": 16,
              "y": 10,
              "id": 33
            },
            {
              "x": 16,
              "y": 11,
              "id": 27
            },
            {
              "x": 16,
              "y": 12,
              "id": 13
            },
            {
              "x": 16,
              "y": 13,
              "id": 13
            },
            {
              "x": 16,
              "y": 14,
              "id": 22
            },
            {
              "x": 16,
              "y": 15,
              "id": 11
            },
            {
              "x": 16,
              "y": 16,
              "id": 0
            },
            {
              "x": 16,
              "y": 17,
              "id": 0
            },
            {
              "x": 17,
              "y": 0,
              "id": 0
            },
            {
              "x": 17,
              "y": 1,
              "id": 0
            },
            {
              "x": 17,
              "y": 2,
              "id": 4
            },
            {
              "x": 17,
              "y": 3,
              "id": 23
            },
            {
              "x": 17,
              "y": 4,
              "id": 31
            },
            {
              "x": 17,
              "y": 5,
              "id": 20
            },
            {
              "x": 17,
              "y": 6,
              "id": 32
            },
            {
              "x": 17,
              "y": 7,
              "id": 13
            },
            {
              "x": 17,
              "y": 8,
              "id": 13
            },
            {
              "x": 17,
              "y": 9,
              "id": 13
            },
            {
              "x": 17,
              "y": 10,
              "id": 13
            },
            {
              "x": 17,
              "y": 11,
              "id": 13
            },
            {
              "x": 17,
              "y": 12,
              "id": 13
            },
            {
              "x": 17,
              "y": 13,
              "id": 13
            },
            {
              "x": 17,
              "y": 14,
              "id": 17
            },
            {
              "x": 17,
              "y": 15,
              "id": 11
            },
            {
              "x": 17,
              "y": 16,
              "id": 0
            },
            {
              "x": 17,
              "y": 17,
              "id": 0
            },
            {
              "x": 18,
              "y": 0,
              "id": 0
            },
            {
              "x": 18,
              "y": 1,
              "id": 0
            },
            {
              "x": 18,
              "y": 2,
              "id": 4
            },
            {
              "x": 18,
              "y": 3,
              "id": 23
            },
            {
              "x": 18,
              "y": 4,
              "id": 31
            },
            {
              "x": 18,
              "y": 5,
              "id": 20
            },
            {
              "x": 18,
              "y": 6,
              "id": 32
            },
            {
              "x": 18,
              "y": 7,
              "id": 13
            },
            {
              "x": 18,
              "y": 8,
              "id": 13
            },
            {
              "x": 18,
              "y": 9,
              "id": 13
            },
            {
              "x": 18,
              "y": 10,
              "id": 13
            },
            {
              "x": 18,
              "y": 11,
              "id": 13
            },
            {
              "x": 18,
              "y": 12,
              "id": 13
            },
            {
              "x": 18,
              "y": 13,
              "id": 13
            },
            {
              "x": 18,
              "y": 14,
              "id": 22
            },
            {
              "x": 18,
              "y": 15,
              "id": 11
            },
            {
              "x": 18,
              "y": 16,
              "id": 0
            },
            {
              "x": 18,
              "y": 17,
              "id": 0
            },
            {
              "x": 19,
              "y": 0,
              "id": 0
            },
            {
              "x": 19,
              "y": 1,
              "id": 0
            },
            {
              "x": 19,
              "y": 2,
              "id": 4
            },
            {
              "x": 19,
              "y": 3,
              "id": 23
            },
            {
              "x": 19,
              "y": 4,
              "id": 28
            },
            {
              "x": 19,
              "y": 5,
              "id": 29
            },
            {
              "x": 19,
              "y": 6,
              "id": 27
            },
            {
              "x": 19,
              "y": 7,
              "id": 13
            },
            {
              "x": 19,
              "y": 8,
              "id": 13
            },
            {
              "x": 19,
              "y": 9,
              "id": 13
            },
            {
              "x": 19,
              "y": 10,
              "id": 13
            },
            {
              "x": 19,
              "y": 11,
              "id": 13
            },
            {
              "x": 19,
              "y": 12,
              "id": 13
            },
            {
              "x": 19,
              "y": 13,
              "id": 13
            },
            {
              "x": 19,
              "y": 14,
              "id": 25
            },
            {
              "x": 19,
              "y": 15,
              "id": 11
            },
            {
              "x": 19,
              "y": 16,
              "id": 0
            },
            {
              "x": 19,
              "y": 17,
              "id": 0
            },
            {
              "x": 20,
              "y": 0,
              "id": 0
            },
            {
              "x": 20,
              "y": 1,
              "id": 0
            },
            {
              "x": 20,
              "y": 2,
              "id": 4
            },
            {
              "x": 20,
              "y": 3,
              "id": 34
            },
            {
              "x": 20,
              "y": 4,
              "id": 35
            },
            {
              "x": 20,
              "y": 5,
              "id": 36
            },
            {
              "x": 20,
              "y": 6,
              "id": 37
            },
            {
              "x": 20,
              "y": 7,
              "id": 36
            },
            {
              "x": 20,
              "y": 8,
              "id": 36
            },
            {
              "x": 20,
              "y": 9,
              "id": 35
            },
            {
              "x": 20,
              "y": 10,
              "id": 37
            },
            {
              "x": 20,
              "y": 11,
              "id": 36
            },
            {
              "x": 20,
              "y": 12,
              "id": 35
            },
            {
              "x": 20,
              "y": 13,
              "id": 37
            },
            {
              "x": 20,
              "y": 14,
              "id": 38
            },
            {
              "x": 20,
              "y": 15,
              "id": 11
            },
            {
              "x": 20,
              "y": 16,
              "id": 0
            },
            {
              "x": 20,
              "y": 17,
              "id": 0
            },
            {
              "x": 21,
              "y": 0,
              "id": 0
            },
            {
              "x": 21,
              "y": 1,
              "id": 0
            },
            {
              "x": 21,
              "y": 2,
              "id": 39
            },
            {
              "x": 21,
              "y": 3,
              "id": 40
            },
            {
              "x": 21,
              "y": 4,
              "id": 40
            },
            {
              "x": 21,
              "y": 5,
              "id": 40
            },
            {
              "x": 21,
              "y": 6,
              "id": 40
            },
            {
              "x": 21,
              "y": 7,
              "id": 40
            },
            {
              "x": 21,
              "y": 8,
              "id": 40
            },
            {
              "x": 21,
              "y": 9,
              "id": 40
            },
            {
              "x": 21,
              "y": 10,
              "id": 40
            },
            {
              "x": 21,
              "y": 11,
              "id": 40
            },
            {
              "x": 21,
              "y": 12,
              "id": 40
            },
            {
              "x": 21,
              "y": 13,
              "id": 40
            },
            {
              "x": 21,
              "y": 14,
              "id": 40
            },
            {
              "x": 21,
              "y": 15,
              "id": 41
            },
            {
              "x": 21,
              "y": 16,
              "id": 0
            },
            {
              "x": 21,
              "y": 17,
              "id": 0
            },
            {
              "x": 22,
              "y": 0,
              "id": 0
            },
            {
              "x": 22,
              "y": 1,
              "id": 0
            },
            {
              "x": 22,
              "y": 2,
              "id": 0
            },
            {
              "x": 22,
              "y": 3,
              "id": 0
            },
            {
              "x": 22,
              "y": 4,
              "id": 0
            },
            {
              "x": 22,
              "y": 5,
              "id": 0
            },
            {
              "x": 22,
              "y": 6,
              "id": 0
            },
            {
              "x": 22,
              "y": 7,
              "id": 0
            },
            {
              "x": 22,
              "y": 8,
              "id": 0
            },
            {
              "x": 22,
              "y": 9,
              "id": 0
            },
            {
              "x": 22,
              "y": 10,
              "id": 0
            },
            {
              "x": 22,
              "y": 11,
              "id": 0
            },
            {
              "x": 22,
              "y": 12,
              "id": 0
            },
            {
              "x": 22,
              "y": 13,
              "id": 0
            },
            {
              "x": 22,
              "y": 14,
              "id": 0
            },
            {
              "x": 22,
              "y": 15,
              "id": 0
            },
            {
              "x": 22,
              "y": 16,
              "id": 0
            },
            {
              "x": 22,
              "y": 17,
              "id": 0
            },
            {
              "x": 23,
              "y": 0,
              "id": 0
            },
            {
              "x": 23,
              "y": 1,
              "id": 0
            },
            {
              "x": 23,
              "y": 2,
              "id": 0
            },
            {
              "x": 23,
              "y": 3,
              "id": 0
            },
            {
              "x": 23,
              "y": 4,
              "id": 0
            },
            {
              "x": 23,
              "y": 5,
              "id": 0
            },
            {
              "x": 23,
              "y": 6,
              "id": 0
            },
            {
              "x": 23,
              "y": 7,
              "id": 0
            },
            {
              "x": 23,
              "y": 8,
              "id": 0
            },
            {
              "x": 23,
              "y": 9,
              "id": 0
            },
            {
              "x": 23,
              "y": 10,
              "id": 0
            },
            {
              "x": 23,
              "y": 11,
              "id": 0
            },
            {
              "x": 23,
              "y": 12,
              "id": 0
            },
            {
              "x": 23,
              "y": 13,
              "id": 0
            },
            {
              "x": 23,
              "y": 14,
              "id": 0
            },
            {
              "x": 23,
              "y": 15,
              "id": 0
            },
            {
              "x": 23,
              "y": 16,
              "id": 0
            },
            {
              "x": 23,
              "y": 17,
              "id": 0
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 42
            },
            {
              "x": 0,
              "y": 1,
              "id": 43
            },
            {
              "x": 0,
              "y": 2,
              "id": 43
            },
            {
              "x": 0,
              "y": 3,
              "id": 44
            },
            {
              "x": 0,
              "y": 4,
              "id": 42
            },
            {
              "x": 0,
              "y": 5,
              "id": 44
            },
            {
              "x": 0,
              "y": 6,
              "id": 43
            },
            {
              "x": 0,
              "y": 7,
              "id": 45
            },
            {
              "x": 0,
              "y": 8,
              "id": 46
            },
            {
              "x": 0,
              "y": 9,
              "id": 42
            },
            {
              "x": 0,
              "y": 10,
              "id": 45
            },
            {
              "x": 0,
              "y": 11,
              "id": 44
            },
            {
              "x": 0,
              "y": 12,
              "id": 43
            },
            {
              "x": 0,
              "y": 13,
              "id": 46
            },
            {
              "x": 0,
              "y": 14,
              "id": 45
            },
            {
              "x": 0,
              "y": 15,
              "id": 42
            },
            {
              "x": 0,
              "y": 16,
              "id": 44
            },
            {
              "x": 0,
              "y": 17,
              "id": 45
            },
            {
              "x": 1,
              "y": 0,
              "id": 42
            },
            {
              "x": 1,
              "y": 17,
              "id": 43
            },
            {
              "x": 2,
              "y": 0,
              "id": 44
            },
            {
              "x": 2,
              "y": 17,
              "id": 45
            },
            {
              "x": 3,
              "y": 0,
              "id": 42
            },
            {
              "x": 3,
              "y": 17,
              "id": 42
            },
            {
              "x": 4,
              "y": 0,
              "id": 44
            },
            {
              "x": 4,
              "y": 17,
              "id": 43
            },
            {
              "x": 5,
              "y": 0,
              "id": 46
            },
            {
              "x": 5,
              "y": 17,
              "id": 46
            },
            {
              "x": 6,
              "y": 0,
              "id": 43
            },
            {
              "x": 6,
              "y": 8,
              "id": 47
            },
            {
              "x": 6,
              "y": 9,
              "id": 47
            },
            {
              "x": 6,
              "y": 10,
              "id": 47
            },
            {
              "x": 6,
              "y": 11,
              "id": 47
            },
            {
              "x": 6,
              "y": 12,
              "id": 48
            },
            {
              "x": 6,
              "y": 17,
              "id": 45
            },
            {
              "x": 7,
              "y": 0,
              "id": 44
            },
            {
              "x": 7,
              "y": 8,
              "id": 49
            },
            {
              "x": 7,
              "y": 9,
              "id": 49
            },
            {
              "x": 7,
              "y": 10,
              "id": 49
            },
            {
              "x": 7,
              "y": 11,
              "id": 49
            },
            {
              "x": 7,
              "y": 12,
              "id": 50
            },
            {
              "x": 7,
              "y": 17,
              "id": 42
            },
            {
              "x": 8,
              "y": 0,
              "id": 43
            },
            {
              "x": 8,
              "y": 7,
              "id": 49
            },
            {
              "x": 8,
              "y": 8,
              "id": 49
            },
            {
              "x": 8,
              "y": 9,
              "id": 49
            },
            {
              "x": 8,
              "y": 10,
              "id": 49
            },
            {
              "x": 8,
              "y": 11,
              "id": 49
            },
            {
              "x": 8,
              "y": 12,
              "id": 50
            },
            {
              "x": 8,
              "y": 17,
              "id": 44
            },
            {
              "x": 9,
              "y": 0,
              "id": 46
            },
            {
              "x": 9,
              "y": 5,
              "id": 51
            },
            {
              "x": 9,
              "y": 6,
              "id": 49
            },
            {
              "x": 9,
              "y": 7,
              "id": 49
            },
            {
              "x": 9,
              "y": 8,
              "id": 49
            },
            {
              "x": 9,
              "y": 9,
              "id": 49
            },
            {
              "x": 9,
              "y": 10,
              "id": 49
            },
            {
              "x": 9,
              "y": 11,
              "id": 49
            },
            {
              "x": 9,
              "y": 12,
              "id": 50
            },
            {
              "x": 9,
              "y": 17,
              "id": 43
            },
            {
              "x": 10,
              "y": 0,
              "id": 45
            },
            {
              "x": 10,
              "y": 5,
              "id": 51
            },
            {
              "x": 10,
              "y": 6,
              "id": 49
            },
            {
              "x": 10,
              "y": 7,
              "id": 49
            },
            {
              "x": 10,
              "y": 8,
              "id": 49
            },
            {
              "x": 10,
              "y": 9,
              "id": 49
            },
            {
              "x": 10,
              "y": 11,
              "id": 49
            },
            {
              "x": 10,
              "y": 12,
              "id": 50
            },
            {
              "x": 10,
              "y": 17,
              "id": 45
            },
            {
              "x": 11,
              "y": 5,
              "id": 51
            },
            {
              "x": 11,
              "y": 6,
              "id": 49
            },
            {
              "x": 11,
              "y": 7,
              "id": 49
            },
            {
              "x": 11,
              "y": 8,
              "id": 49
            },
            {
              "x": 11,
              "y": 11,
              "id": 49
            },
            {
              "x": 11,
              "y": 12,
              "id": 50
            },
            {
              "x": 11,
              "y": 17,
              "id": 46
            },
            {
              "x": 12,
              "y": 5,
              "id": 51
            },
            {
              "x": 12,
              "y": 6,
              "id": 49
            },
            {
              "x": 12,
              "y": 7,
              "id": 49
            },
            {
              "x": 12,
              "y": 8,
              "id": 49
            },
            {
              "x": 12,
              "y": 11,
              "id": 49
            },
            {
              "x": 12,
              "y": 12,
              "id": 50
            },
            {
              "x": 12,
              "y": 17,
              "id": 42
            },
            {
              "x": 13,
              "y": 5,
              "id": 51
            },
            {
              "x": 13,
              "y": 6,
              "id": 49
            },
            {
              "x": 13,
              "y": 7,
              "id": 49
            },
            {
              "x": 13,
              "y": 8,
              "id": 49
            },
            {
              "x": 13,
              "y": 11,
              "id": 49
            },
            {
              "x": 13,
              "y": 12,
              "id": 50
            },
            {
              "x": 13,
              "y": 17,
              "id": 43
            },
            {
              "x": 14,
              "y": 6,
              "id": 49
            },
            {
              "x": 14,
              "y": 7,
              "id": 49
            },
            {
              "x": 14,
              "y": 8,
              "id": 49
            },
            {
              "x": 14,
              "y": 11,
              "id": 49
            },
            {
              "x": 14,
              "y": 12,
              "id": 50
            },
            {
              "x": 14,
              "y": 17,
              "id": 42
            },
            {
              "x": 15,
              "y": 6,
              "id": 49
            },
            {
              "x": 15,
              "y": 7,
              "id": 49
            },
            {
              "x": 15,
              "y": 8,
              "id": 49
            },
            {
              "x": 15,
              "y": 11,
              "id": 49
            },
            {
              "x": 15,
              "y": 12,
              "id": 50
            },
            {
              "x": 15,
              "y": 17,
              "id": 44
            },
            {
              "x": 16,
              "y": 0,
              "id": 42
            },
            {
              "x": 16,
              "y": 6,
              "id": 49
            },
            {
              "x": 16,
              "y": 7,
              "id": 49
            },
            {
              "x": 16,
              "y": 8,
              "id": 49
            },
            {
              "x": 16,
              "y": 9,
              "id": 49
            },
            {
              "x": 16,
              "y": 10,
              "id": 49
            },
            {
              "x": 16,
              "y": 11,
              "id": 49
            },
            {
              "x": 16,
              "y": 12,
              "id": 50
            },
            {
              "x": 16,
              "y": 17,
              "id": 45
            },
            {
              "x": 17,
              "y": 0,
              "id": 43
            },
            {
              "x": 17,
              "y": 6,
              "id": 49
            },
            {
              "x": 17,
              "y": 7,
              "id": 49
            },
            {
              "x": 17,
              "y": 8,
              "id": 49
            },
            {
              "x": 17,
              "y": 9,
              "id": 49
            },
            {
              "x": 17,
              "y": 10,
              "id": 49
            },
            {
              "x": 17,
              "y": 11,
              "id": 49
            },
            {
              "x": 17,
              "y": 12,
              "id": 50
            },
            {
              "x": 17,
              "y": 17,
              "id": 46
            },
            {
              "x": 18,
              "y": 0,
              "id": 46
            },
            {
              "x": 18,
              "y": 6,
              "id": 52
            },
            {
              "x": 18,
              "y": 7,
              "id": 52
            },
            {
              "x": 18,
              "y": 8,
              "id": 52
            },
            {
              "x": 18,
              "y": 9,
              "id": 52
            },
            {
              "x": 18,
              "y": 10,
              "id": 52
            },
            {
              "x": 18,
              "y": 11,
              "id": 52
            },
            {
              "x": 18,
              "y": 12,
              "id": 53
            },
            {
              "x": 18,
              "y": 17,
              "id": 43
            },
            {
              "x": 19,
              "y": 0,
              "id": 44
            },
            {
              "x": 19,
              "y": 17,
              "id": 42
            },
            {
              "x": 20,
              "y": 0,
              "id": 42
            },
            {
              "x": 20,
              "y": 17,
              "id": 45
            },
            {
              "x": 21,
              "y": 0,
              "id": 46
            },
            {
              "x": 21,
              "y": 17,
              "id": 44
            },
            {
              "x": 22,
              "y": 0,
              "id": 45
            },
            {
              "x": 22,
              "y": 17,
              "id": 42
            },
            {
              "x": 23,
              "y": 0,
              "id": 42
            },
            {
              "x": 23,
              "y": 1,
              "id": 42
            },
            {
              "x": 23,
              "y": 2,
              "id": 45
            },
            {
              "x": 23,
              "y": 3,
              "id": 43
            },
            {
              "x": 23,
              "y": 4,
              "id": 46
            },
            {
              "x": 23,
              "y": 5,
              "id": 44
            },
            {
              "x": 23,
              "y": 6,
              "id": 42
            },
            {
              "x": 23,
              "y": 7,
              "id": 46
            },
            {
              "x": 23,
              "y": 8,
              "id": 43
            },
            {
              "x": 23,
              "y": 9,
              "id": 45
            },
            {
              "x": 23,
              "y": 10,
              "id": 42
            },
            {
              "x": 23,
              "y": 11,
              "id": 45
            },
            {
              "x": 23,
              "y": 12,
              "id": 44
            },
            {
              "x": 23,
              "y": 13,
              "id": 42
            },
            {
              "x": 23,
              "y": 14,
              "id": 46
            },
            {
              "x": 23,
              "y": 15,
              "id": 43
            },
            {
              "x": 23,
              "y": 16,
              "id": 42
            },
            {
              "x": 23,
              "y": 17,
              "id": 45
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 4,
              "y": 4,
              "id": 54
            },
            {
              "x": 4,
              "y": 9,
              "id": 55
            },
            {
              "x": 4,
              "y": 12,
              "id": 56
            },
            {
              "x": 5,
              "y": 13,
              "id": 57
            },
            {
              "x": 7,
              "y": 13,
              "id": 58
            },
            {
              "x": 8,
              "y": 4,
              "id": 59
            },
            {
              "x": 8,
              "y": 7,
              "id": 60
            },
            {
              "x": 9,
              "y": 5,
              "id": 61
            },
            {
              "x": 9,
              "y": 6,
              "id": 62
            },
            {
              "x": 9,
              "y": 7,
              "id": 63
            },
            {
              "x": 9,
              "y": 9,
              "id": 64
            },
            {
              "x": 9,
              "y": 10,
              "id": 65
            },
            {
              "x": 9,
              "y": 11,
              "id": 66
            },
            {
              "x": 10,
              "y": 8,
              "id": 64
            },
            {
              "x": 10,
              "y": 9,
              "id": 67
            },
            {
              "x": 10,
              "y": 11,
              "id": 68
            },
            {
              "x": 10,
              "y": 13,
              "id": 69
            },
            {
              "x": 11,
              "y": 8,
              "id": 70
            },
            {
              "x": 11,
              "y": 11,
              "id": 71
            },
            {
              "x": 11,
              "y": 13,
              "id": 72
            },
            {
              "x": 12,
              "y": 7,
              "id": 73
            },
            {
              "x": 12,
              "y": 8,
              "id": 70
            },
            {
              "x": 12,
              "y": 11,
              "id": 71
            },
            {
              "x": 13,
              "y": 5,
              "id": 65
            },
            {
              "x": 13,
              "y": 6,
              "id": 66
            },
            {
              "x": 13,
              "y": 7,
              "id": 74
            },
            {
              "x": 13,
              "y": 8,
              "id": 70
            },
            {
              "x": 13,
              "y": 11,
              "id": 71
            },
            {
              "x": 14,
              "y": 6,
              "id": 71
            },
            {
              "x": 14,
              "y": 8,
              "id": 70
            },
            {
              "x": 14,
              "y": 11,
              "id": 71
            },
            {
              "x": 14,
              "y": 13,
              "id": 75
            },
            {
              "x": 15,
              "y": 6,
              "id": 71
            },
            {
              "x": 15,
              "y": 8,
              "id": 70
            },
            {
              "x": 15,
              "y": 11,
              "id": 68
            },
            {
              "x": 16,
              "y": 6,
              "id": 71
            },
            {
              "x": 16,
              "y": 8,
              "id": 61
            },
            {
              "x": 16,
              "y": 9,
              "id": 62
            },
            {
              "x": 16,
              "y": 10,
              "id": 62
            },
            {
              "x": 16,
              "y": 11,
              "id": 63
            },
            {
              "x": 17,
              "y": 6,
              "id": 71
            },
            {
              "x": 17,
              "y": 13,
              "id": 76
            },
            {
              "x": 18,
              "y": 6,
              "id": 71
            },
            {
              "x": 19,
              "y": 10,
              "id": 77
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 5,
              "y": 3,
              "id": 78
            },
            {
              "x": 5,
              "y": 4,
              "id": 79
            },
            {
              "x": 5,
              "y": 5,
              "id": 80
            },
            {
              "x": 5,
              "y": 7,
              "id": 81
            },
            {
              "x": 5,
              "y": 8,
              "id": 82
            },
            {
              "x": 5,
              "y": 10,
              "id": 78
            },
            {
              "x": 5,
              "y": 11,
              "id": 79
            },
            {
              "x": 5,
              "y": 12,
              "id": 80
            },
            {
              "x": 6,
              "y": 7,
              "id": 83
            },
            {
              "x": 6,
              "y": 8,
              "id": 84
            },
            {
              "x": 7,
              "y": 7,
              "id": 85
            },
            {
              "x": 7,
              "y": 8,
              "id": 86
            },
            {
              "x": 8,
              "y": 7,
              "id": 87
            },
            {
              "x": 8,
              "y": 8,
              "id": 88
            },
            {
              "x": 10,
              "y": 10,
              "id": 89
            },
            {
              "x": 10,
              "y": 11,
              "id": 90
            },
            {
              "x": 11,
              "y": 6,
              "id": 78
            },
            {
              "x": 11,
              "y": 7,
              "id": 79
            },
            {
              "x": 11,
              "y": 8,
              "id": 80
            },
            {
              "x": 11,
              "y": 10,
              "id": 91
            },
            {
              "x": 11,
              "y": 11,
              "id": 92
            },
            {
              "x": 12,
              "y": 10,
              "id": 93
            },
            {
              "x": 12,
              "y": 11,
              "id": 94
            },
            {
              "x": 13,
              "y": 10,
              "id": 95
            },
            {
              "x": 13,
              "y": 11,
              "id": 96
            },
            {
              "x": 14,
              "y": 2,
              "id": 97
            },
            {
              "x": 14,
              "y": 3,
              "id": 98
            },
            {
              "x": 14,
              "y": 4,
              "id": 99
            },
            {
              "x": 14,
              "y": 10,
              "id": 100
            },
            {
              "x": 14,
              "y": 11,
              "id": 101
            },
            {
              "x": 15,
              "y": 5,
              "id": 102
            },
            {
              "x": 15,
              "y": 6,
              "id": 103
            },
            {
              "x": 15,
              "y": 8,
              "id": 104
            },
            {
              "x": 15,
              "y": 9,
              "id": 105
            },
            {
              "x": 15,
              "y": 10,
              "id": 106
            },
            {
              "x": 15,
              "y": 11,
              "id": 107
            },
            {
              "x": 16,
              "y": 5,
              "id": 108
            },
            {
              "x": 16,
              "y": 6,
              "id": 109
            },
            {
              "x": 17,
              "y": 5,
              "id": 110
            },
            {
              "x": 17,
              "y": 6,
              "id": 111
            },
            {
              "x": 18,
              "y": 5,
              "id": 112
            },
            {
              "x": 18,
              "y": 6,
              "id": 113
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": []
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": [
            {
              "x": 5,
              "y": 5,
              "id": 114
            },
            {
              "x": 5,
              "y": 6,
              "id": 115
            },
            {
              "x": 6,
              "y": 5,
              "id": 116
            },
            {
              "x": 6,
              "y": 6,
              "id": 117
            },
            {
              "x": 7,
              "y": 5,
              "id": 118
            },
            {
              "x": 7,
              "y": 6,
              "id": 119
            },
            {
              "x": 8,
              "y": 5,
              "id": 120
            },
            {
              "x": 8,
              "y": 6,
              "id": 121
            },
            {
              "x": 10,
              "y": 9,
              "id": 122
            },
            {
              "x": 11,
              "y": 8,
              "id": 123
            },
            {
              "x": 11,
              "y": 9,
              "id": 124
            },
            {
              "x": 12,
              "y": 8,
              "id": 125
            },
            {
              "x": 12,
              "y": 9,
              "id": 126
            },
            {
              "x": 13,
              "y": 8,
              "id": 127
            },
            {
              "x": 13,
              "y": 9,
              "id": 128
            },
            {
              "x": 14,
              "y": 8,
              "id": 129
            },
            {
              "x": 14,
              "y": 9,
              "id": 130
            },
            {
              "x": 15,
              "y": 3,
              "id": 131
            },
            {
              "x": 15,
              "y": 4,
              "id": 132
            },
            {
              "x": 15,
              "y": 9,
              "id": 133
            },
            {
              "x": 16,
              "y": 3,
              "id": 134
            },
            {
              "x": 16,
              "y": 4,
              "id": 135
            },
            {
              "x": 17,
              "y": 3,
              "id": 136
            },
            {
              "x": 17,
              "y": 4,
              "id": 137
            },
            {
              "x": 18,
              "y": 3,
              "id": 138
            },
            {
              "x": 18,
              "y": 4,
              "id": 139
            }
          ]
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [
            {
              "x": 13,
              "y": 7,
              "id": 140
            },
            {
              "x": 15,
              "y": 10,
              "id": 140
            }
          ],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [
            {
              "x": 10,
              "y": 10,
              "id": 140
            },
            {
              "x": 12,
              "y": 7,
              "id": 140
            }
          ],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 140
            },
            {
              "x": 0,
              "y": 1,
              "id": 140
            },
            {
              "x": 0,
              "y": 2,
              "id": 140
            },
            {
              "x": 0,
              "y": 3,
              "id": 140
            },
            {
              "x": 0,
              "y": 4,
              "id": 140
            },
            {
              "x": 0,
              "y": 5,
              "id": 140
            },
            {
              "x": 0,
              "y": 6,
              "id": 140
            },
            {
              "x": 0,
              "y": 7,
              "id": 140
            },
            {
              "x": 0,
              "y": 8,
              "id": 140
            },
            {
              "x": 0,
              "y": 9,
              "id": 140
            },
            {
              "x": 0,
              "y": 10,
              "id": 140
            },
            {
              "x": 0,
              "y": 11,
              "id": 140
            },
            {
              "x": 0,
              "y": 12,
              "id": 140
            },
            {
              "x": 0,
              "y": 13,
              "id": 140
            },
            {
              "x": 0,
              "y": 14,
              "id": 140
            },
            {
              "x": 0,
              "y": 15,
              "id": 140
            },
            {
              "x": 0,
              "y": 16,
              "id": 140
            },
            {
              "x": 0,
              "y": 17,
              "id": 140
            },
            {
              "x": 1,
              "y": 0,
              "id": 140
            },
            {
              "x": 1,
              "y": 17,
              "id": 140
            },
            {
              "x": 2,
              "y": 0,
              "id": 140
            },
            {
              "x": 2,
              "y": 17,
              "id": 140
            },
            {
              "x": 3,
              "y": 0,
              "id": 140
            },
            {
              "x": 3,
              "y": 17,
              "id": 140
            },
            {
              "x": 4,
              "y": 0,
              "id": 140
            },
            {
              "x": 4,
              "y": 17,
              "id": 140
            },
            {
              "x": 5,
              "y": 0,
              "id": 140
            },
            {
              "x": 5,
              "y": 5,
              "id": 140
            },
            {
              "x": 5,
              "y": 7,
              "id": 140
            },
            {
              "x": 5,
              "y": 17,
              "id": 140
            },
            {
              "x": 6,
              "y": 0,
              "id": 140
            },
            {
              "x": 6,
              "y": 7,
              "id": 140
            },
            {
              "x": 6,
              "y": 17,
              "id": 140
            },
            {
              "x": 7,
              "y": 0,
              "id": 140
            },
            {
              "x": 7,
              "y": 7,
              "id": 140
            },
            {
              "x": 7,
              "y": 17,
              "id": 140
            },
            {
              "x": 8,
              "y": 0,
              "id": 140
            },
            {
              "x": 8,
              "y": 7,
              "id": 140
            },
            {
              "x": 8,
              "y": 17,
              "id": 140
            },
            {
              "x": 9,
              "y": 0,
              "id": 140
            },
            {
              "x": 9,
              "y": 17,
              "id": 140
            },
            {
              "x": 10,
              "y": 0,
              "id": 140
            },
            {
              "x": 10,
              "y": 17,
              "id": 140
            },
            {
              "x": 11,
              "y": 8,
              "id": 140
            },
            {
              "x": 11,
              "y": 10,
              "id": 140
            },
            {
              "x": 11,
              "y": 17,
              "id": 140
            },
            {
              "x": 12,
              "y": 10,
              "id": 140
            },
            {
              "x": 12,
              "y": 17,
              "id": 140
            },
            {
              "x": 13,
              "y": 10,
              "id": 140
            },
            {
              "x": 13,
              "y": 17,
              "id": 140
            },
            {
              "x": 14,
              "y": 4,
              "id": 140
            },
            {
              "x": 14,
              "y": 10,
              "id": 140
            },
            {
              "x": 14,
              "y": 17,
              "id": 140
            },
            {
              "x": 15,
              "y": 5,
              "id": 140
            },
            {
              "x": 15,
              "y": 9,
              "id": 140
            },
            {
              "x": 15,
              "y": 17,
              "id": 140
            },
            {
              "x": 16,
              "y": 0,
              "id": 140
            },
            {
              "x": 16,
              "y": 5,
              "id": 140
            },
            {
              "x": 16,
              "y": 17,
              "id": 140
            },
            {
              "x": 17,
              "y": 0,
              "id": 140
            },
            {
              "x": 17,
              "y": 5,
              "id": 140
            },
            {
              "x": 17,
              "y": 17,
              "id": 140
            },
            {
              "x": 18,
              "y": 0,
              "id": 140
            },
            {
              "x": 18,
              "y": 5,
              "id": 140
            },
            {
              "x": 18,
              "y": 17,
              "id": 140
            },
            {
              "x": 19,
              "y": 0,
              "id": 140
            },
            {
              "x": 19,
              "y": 17,
              "id": 140
            },
            {
              "x": 20,
              "y": 0,
              "id": 140
            },
            {
              "x": 20,
              "y": 17,
              "id": 140
            },
            {
              "x": 21,
              "y": 0,
              "id": 140
            },
            {
              "x": 21,
              "y": 17,
              "id": 140
            },
            {
              "x": 22,
              "y": 0,
              "id": 140
            },
            {
              "x": 22,
              "y": 17,
              "id": 140
            },
            {
              "x": 23,
              "y": 0,
              "id": 140
            },
            {
              "x": 23,
              "y": 1,
              "id": 140
            },
            {
              "x": 23,
              "y": 2,
              "id": 140
            },
            {
              "x": 23,
              "y": 3,
              "id": 140
            },
            {
              "x": 23,
              "y": 4,
              "id": 140
            },
            {
              "x": 23,
              "y": 5,
              "id": 140
            },
            {
              "x": 23,
              "y": 6,
              "id": 140
            },
            {
              "x": 23,
              "y": 7,
              "id": 140
            },
            {
              "x": 23,
              "y": 8,
              "id": 140
            },
            {
              "x": 23,
              "y": 9,
              "id": 140
            },
            {
              "x": 23,
              "y": 10,
              "id": 140
            },
            {
              "x": 23,
              "y": 11,
              "id": 140
            },
            {
              "x": 23,
              "y": 12,
              "id": 140
            },
            {
              "x": 23,
              "y": 13,
              "id": 140
            },
            {
              "x": 23,
              "y": 14,
              "id": 140
            },
            {
              "x": 23,
              "y": 15,
              "id": 140
            },
            {
              "x": 23,
              "y": 16,
              "id": 140
            },
            {
              "x": 23,
              "y": 17,
              "id": 140
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - top half",
          "positions": [
            {
              "x": 5,
              "y": 8,
              "id": 140
            },
            {
              "x": 6,
              "y": 8,
              "id": 140
            },
            {
              "x": 7,
              "y": 8,
              "id": 140
            },
            {
              "x": 8,
              "y": 8,
              "id": 140
            },
            {
              "x": 11,
              "y": 11,
              "id": 140
            },
            {
              "x": 12,
              "y": 11,
              "id": 140
            },
            {
              "x": 13,
              "y": 11,
              "id": 140
            },
            {
              "x": 14,
              "y": 11,
              "id": 140
            },
            {
              "x": 15,
              "y": 6,
              "id": 140
            },
            {
              "x": 16,
              "y": 6,
              "id": 140
            },
            {
              "x": 17,
              "y": 6,
              "id": 140
            },
            {
              "x": 18,
              "y": 6,
              "id": 140
            }
          ],
          "collision": {
            "type": "top-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    },
    "route-1": {
      "id": "route-1",
      "name": "Route 1",
      "kind": "town",
      "safezone": false,
      "tileSize": 128,
      "mapWidth": 29,
      "mapHeight": 13,
      "image": "assets/Maps/Route 1/Route 1.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 0
            },
            {
              "x": 0,
              "y": 8,
              "id": 0
            },
            {
              "x": 0,
              "y": 9,
              "id": 0
            },
            {
              "x": 0,
              "y": 10,
              "id": 0
            },
            {
              "x": 0,
              "y": 11,
              "id": 0
            },
            {
              "x": 0,
              "y": 12,
              "id": 0
            },
            {
              "x": 1,
              "y": 0,
              "id": 0
            },
            {
              "x": 1,
              "y": 1,
              "id": 0
            },
            {
              "x": 1,
              "y": 2,
              "id": 0
            },
            {
              "x": 1,
              "y": 3,
              "id": 0
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 0
            },
            {
              "x": 1,
              "y": 8,
              "id": 0
            },
            {
              "x": 1,
              "y": 9,
              "id": 0
            },
            {
              "x": 1,
              "y": 10,
              "id": 0
            },
            {
              "x": 1,
              "y": 11,
              "id": 0
            },
            {
              "x": 1,
              "y": 12,
              "id": 0
            },
            {
              "x": 2,
              "y": 0,
              "id": 0
            },
            {
              "x": 2,
              "y": 1,
              "id": 0
            },
            {
              "x": 2,
              "y": 2,
              "id": 0
            },
            {
              "x": 2,
              "y": 3,
              "id": 0
            },
            {
              "x": 2,
              "y": 4,
              "id": 0
            },
            {
              "x": 2,
              "y": 5,
              "id": 0
            },
            {
              "x": 2,
              "y": 6,
              "id": 0
            },
            {
              "x": 2,
              "y": 7,
              "id": 0
            },
            {
              "x": 2,
              "y": 8,
              "id": 0
            },
            {
              "x": 2,
              "y": 9,
              "id": 0
            },
            {
              "x": 2,
              "y": 10,
              "id": 0
            },
            {
              "x": 2,
              "y": 11,
              "id": 0
            },
            {
              "x": 2,
              "y": 12,
              "id": 0
            },
            {
              "x": 3,
              "y": 0,
              "id": 0
            },
            {
              "x": 3,
              "y": 1,
              "id": 0
            },
            {
              "x": 3,
              "y": 2,
              "id": 0
            },
            {
              "x": 3,
              "y": 3,
              "id": 0
            },
            {
              "x": 3,
              "y": 4,
              "id": 0
            },
            {
              "x": 3,
              "y": 5,
              "id": 0
            },
            {
              "x": 3,
              "y": 6,
              "id": 0
            },
            {
              "x": 3,
              "y": 7,
              "id": 0
            },
            {
              "x": 3,
              "y": 8,
              "id": 0
            },
            {
              "x": 3,
              "y": 9,
              "id": 0
            },
            {
              "x": 3,
              "y": 10,
              "id": 0
            },
            {
              "x": 3,
              "y": 11,
              "id": 0
            },
            {
              "x": 3,
              "y": 12,
              "id": 0
            },
            {
              "x": 4,
              "y": 0,
              "id": 0
            },
            {
              "x": 4,
              "y": 1,
              "id": 0
            },
            {
              "x": 4,
              "y": 2,
              "id": 0
            },
            {
              "x": 4,
              "y": 3,
              "id": 0
            },
            {
              "x": 4,
              "y": 4,
              "id": 0
            },
            {
              "x": 4,
              "y": 5,
              "id": 0
            },
            {
              "x": 4,
              "y": 6,
              "id": 0
            },
            {
              "x": 4,
              "y": 7,
              "id": 0
            },
            {
              "x": 4,
              "y": 8,
              "id": 0
            },
            {
              "x": 4,
              "y": 9,
              "id": 0
            },
            {
              "x": 4,
              "y": 10,
              "id": 0
            },
            {
              "x": 4,
              "y": 11,
              "id": 0
            },
            {
              "x": 4,
              "y": 12,
              "id": 0
            },
            {
              "x": 5,
              "y": 0,
              "id": 0
            },
            {
              "x": 5,
              "y": 1,
              "id": 0
            },
            {
              "x": 5,
              "y": 2,
              "id": 0
            },
            {
              "x": 5,
              "y": 3,
              "id": 0
            },
            {
              "x": 5,
              "y": 4,
              "id": 0
            },
            {
              "x": 5,
              "y": 5,
              "id": 0
            },
            {
              "x": 5,
              "y": 6,
              "id": 0
            },
            {
              "x": 5,
              "y": 7,
              "id": 0
            },
            {
              "x": 5,
              "y": 8,
              "id": 0
            },
            {
              "x": 5,
              "y": 9,
              "id": 0
            },
            {
              "x": 5,
              "y": 10,
              "id": 0
            },
            {
              "x": 5,
              "y": 11,
              "id": 0
            },
            {
              "x": 5,
              "y": 12,
              "id": 0
            },
            {
              "x": 6,
              "y": 0,
              "id": 0
            },
            {
              "x": 6,
              "y": 1,
              "id": 0
            },
            {
              "x": 6,
              "y": 2,
              "id": 0
            },
            {
              "x": 6,
              "y": 3,
              "id": 0
            },
            {
              "x": 6,
              "y": 4,
              "id": 0
            },
            {
              "x": 6,
              "y": 5,
              "id": 0
            },
            {
              "x": 6,
              "y": 6,
              "id": 0
            },
            {
              "x": 6,
              "y": 7,
              "id": 0
            },
            {
              "x": 6,
              "y": 8,
              "id": 0
            },
            {
              "x": 6,
              "y": 9,
              "id": 0
            },
            {
              "x": 6,
              "y": 10,
              "id": 0
            },
            {
              "x": 6,
              "y": 11,
              "id": 0
            },
            {
              "x": 6,
              "y": 12,
              "id": 0
            },
            {
              "x": 7,
              "y": 0,
              "id": 0
            },
            {
              "x": 7,
              "y": 1,
              "id": 0
            },
            {
              "x": 7,
              "y": 2,
              "id": 0
            },
            {
              "x": 7,
              "y": 3,
              "id": 0
            },
            {
              "x": 7,
              "y": 4,
              "id": 0
            },
            {
              "x": 7,
              "y": 5,
              "id": 0
            },
            {
              "x": 7,
              "y": 6,
              "id": 0
            },
            {
              "x": 7,
              "y": 7,
              "id": 0
            },
            {
              "x": 7,
              "y": 8,
              "id": 0
            },
            {
              "x": 7,
              "y": 9,
              "id": 0
            },
            {
              "x": 7,
              "y": 10,
              "id": 0
            },
            {
              "x": 7,
              "y": 11,
              "id": 0
            },
            {
              "x": 7,
              "y": 12,
              "id": 0
            },
            {
              "x": 8,
              "y": 0,
              "id": 0
            },
            {
              "x": 8,
              "y": 1,
              "id": 0
            },
            {
              "x": 8,
              "y": 2,
              "id": 0
            },
            {
              "x": 8,
              "y": 3,
              "id": 0
            },
            {
              "x": 8,
              "y": 4,
              "id": 0
            },
            {
              "x": 8,
              "y": 5,
              "id": 0
            },
            {
              "x": 8,
              "y": 6,
              "id": 0
            },
            {
              "x": 8,
              "y": 7,
              "id": 0
            },
            {
              "x": 8,
              "y": 8,
              "id": 0
            },
            {
              "x": 8,
              "y": 9,
              "id": 0
            },
            {
              "x": 8,
              "y": 10,
              "id": 0
            },
            {
              "x": 8,
              "y": 11,
              "id": 0
            },
            {
              "x": 8,
              "y": 12,
              "id": 0
            },
            {
              "x": 9,
              "y": 0,
              "id": 0
            },
            {
              "x": 9,
              "y": 1,
              "id": 0
            },
            {
              "x": 9,
              "y": 2,
              "id": 0
            },
            {
              "x": 9,
              "y": 3,
              "id": 0
            },
            {
              "x": 9,
              "y": 4,
              "id": 0
            },
            {
              "x": 9,
              "y": 5,
              "id": 0
            },
            {
              "x": 9,
              "y": 6,
              "id": 0
            },
            {
              "x": 9,
              "y": 7,
              "id": 0
            },
            {
              "x": 9,
              "y": 8,
              "id": 0
            },
            {
              "x": 9,
              "y": 9,
              "id": 0
            },
            {
              "x": 9,
              "y": 10,
              "id": 0
            },
            {
              "x": 9,
              "y": 11,
              "id": 0
            },
            {
              "x": 9,
              "y": 12,
              "id": 0
            },
            {
              "x": 10,
              "y": 0,
              "id": 0
            },
            {
              "x": 10,
              "y": 1,
              "id": 0
            },
            {
              "x": 10,
              "y": 2,
              "id": 0
            },
            {
              "x": 10,
              "y": 3,
              "id": 0
            },
            {
              "x": 10,
              "y": 4,
              "id": 0
            },
            {
              "x": 10,
              "y": 5,
              "id": 0
            },
            {
              "x": 10,
              "y": 6,
              "id": 0
            },
            {
              "x": 10,
              "y": 7,
              "id": 0
            },
            {
              "x": 10,
              "y": 8,
              "id": 0
            },
            {
              "x": 10,
              "y": 9,
              "id": 0
            },
            {
              "x": 10,
              "y": 10,
              "id": 0
            },
            {
              "x": 10,
              "y": 11,
              "id": 0
            },
            {
              "x": 10,
              "y": 12,
              "id": 0
            },
            {
              "x": 11,
              "y": 0,
              "id": 0
            },
            {
              "x": 11,
              "y": 1,
              "id": 0
            },
            {
              "x": 11,
              "y": 2,
              "id": 0
            },
            {
              "x": 11,
              "y": 3,
              "id": 0
            },
            {
              "x": 11,
              "y": 4,
              "id": 0
            },
            {
              "x": 11,
              "y": 5,
              "id": 0
            },
            {
              "x": 11,
              "y": 6,
              "id": 0
            },
            {
              "x": 11,
              "y": 7,
              "id": 0
            },
            {
              "x": 11,
              "y": 8,
              "id": 0
            },
            {
              "x": 11,
              "y": 9,
              "id": 0
            },
            {
              "x": 11,
              "y": 10,
              "id": 0
            },
            {
              "x": 11,
              "y": 11,
              "id": 0
            },
            {
              "x": 11,
              "y": 12,
              "id": 0
            },
            {
              "x": 12,
              "y": 0,
              "id": 0
            },
            {
              "x": 12,
              "y": 1,
              "id": 0
            },
            {
              "x": 12,
              "y": 2,
              "id": 0
            },
            {
              "x": 12,
              "y": 3,
              "id": 0
            },
            {
              "x": 12,
              "y": 4,
              "id": 0
            },
            {
              "x": 12,
              "y": 5,
              "id": 0
            },
            {
              "x": 12,
              "y": 6,
              "id": 0
            },
            {
              "x": 12,
              "y": 7,
              "id": 0
            },
            {
              "x": 12,
              "y": 8,
              "id": 0
            },
            {
              "x": 12,
              "y": 9,
              "id": 1
            },
            {
              "x": 12,
              "y": 10,
              "id": 2
            },
            {
              "x": 12,
              "y": 11,
              "id": 0
            },
            {
              "x": 12,
              "y": 12,
              "id": 0
            },
            {
              "x": 13,
              "y": 0,
              "id": 0
            },
            {
              "x": 13,
              "y": 1,
              "id": 0
            },
            {
              "x": 13,
              "y": 2,
              "id": 0
            },
            {
              "x": 13,
              "y": 3,
              "id": 0
            },
            {
              "x": 13,
              "y": 4,
              "id": 0
            },
            {
              "x": 13,
              "y": 5,
              "id": 0
            },
            {
              "x": 13,
              "y": 6,
              "id": 0
            },
            {
              "x": 13,
              "y": 7,
              "id": 0
            },
            {
              "x": 13,
              "y": 8,
              "id": 1
            },
            {
              "x": 13,
              "y": 9,
              "id": 3
            },
            {
              "x": 13,
              "y": 10,
              "id": 4
            },
            {
              "x": 13,
              "y": 11,
              "id": 0
            },
            {
              "x": 13,
              "y": 12,
              "id": 0
            },
            {
              "x": 14,
              "y": 0,
              "id": 0
            },
            {
              "x": 14,
              "y": 1,
              "id": 0
            },
            {
              "x": 14,
              "y": 2,
              "id": 0
            },
            {
              "x": 14,
              "y": 3,
              "id": 1
            },
            {
              "x": 14,
              "y": 4,
              "id": 2
            },
            {
              "x": 14,
              "y": 5,
              "id": 0
            },
            {
              "x": 14,
              "y": 6,
              "id": 0
            },
            {
              "x": 14,
              "y": 7,
              "id": 0
            },
            {
              "x": 14,
              "y": 8,
              "id": 5
            },
            {
              "x": 14,
              "y": 9,
              "id": 6
            },
            {
              "x": 14,
              "y": 10,
              "id": 4
            },
            {
              "x": 14,
              "y": 11,
              "id": 0
            },
            {
              "x": 14,
              "y": 12,
              "id": 0
            },
            {
              "x": 15,
              "y": 0,
              "id": 0
            },
            {
              "x": 15,
              "y": 1,
              "id": 1
            },
            {
              "x": 15,
              "y": 2,
              "id": 7
            },
            {
              "x": 15,
              "y": 3,
              "id": 3
            },
            {
              "x": 15,
              "y": 4,
              "id": 8
            },
            {
              "x": 15,
              "y": 5,
              "id": 0
            },
            {
              "x": 15,
              "y": 6,
              "id": 0
            },
            {
              "x": 15,
              "y": 7,
              "id": 0
            },
            {
              "x": 15,
              "y": 8,
              "id": 5
            },
            {
              "x": 15,
              "y": 9,
              "id": 6
            },
            {
              "x": 15,
              "y": 10,
              "id": 4
            },
            {
              "x": 15,
              "y": 11,
              "id": 0
            },
            {
              "x": 15,
              "y": 12,
              "id": 0
            },
            {
              "x": 16,
              "y": 0,
              "id": 0
            },
            {
              "x": 16,
              "y": 1,
              "id": 9
            },
            {
              "x": 16,
              "y": 2,
              "id": 6
            },
            {
              "x": 16,
              "y": 3,
              "id": 6
            },
            {
              "x": 16,
              "y": 4,
              "id": 8
            },
            {
              "x": 16,
              "y": 5,
              "id": 0
            },
            {
              "x": 16,
              "y": 6,
              "id": 0
            },
            {
              "x": 16,
              "y": 7,
              "id": 0
            },
            {
              "x": 16,
              "y": 8,
              "id": 10
            },
            {
              "x": 16,
              "y": 9,
              "id": 11
            },
            {
              "x": 16,
              "y": 10,
              "id": 12
            },
            {
              "x": 16,
              "y": 11,
              "id": 0
            },
            {
              "x": 16,
              "y": 12,
              "id": 0
            },
            {
              "x": 17,
              "y": 0,
              "id": 0
            },
            {
              "x": 17,
              "y": 1,
              "id": 10
            },
            {
              "x": 17,
              "y": 2,
              "id": 13
            },
            {
              "x": 17,
              "y": 3,
              "id": 6
            },
            {
              "x": 17,
              "y": 4,
              "id": 4
            },
            {
              "x": 17,
              "y": 5,
              "id": 0
            },
            {
              "x": 17,
              "y": 6,
              "id": 0
            },
            {
              "x": 17,
              "y": 7,
              "id": 0
            },
            {
              "x": 17,
              "y": 8,
              "id": 0
            },
            {
              "x": 17,
              "y": 9,
              "id": 0
            },
            {
              "x": 17,
              "y": 10,
              "id": 0
            },
            {
              "x": 17,
              "y": 11,
              "id": 0
            },
            {
              "x": 17,
              "y": 12,
              "id": 0
            },
            {
              "x": 18,
              "y": 0,
              "id": 0
            },
            {
              "x": 18,
              "y": 1,
              "id": 0
            },
            {
              "x": 18,
              "y": 2,
              "id": 10
            },
            {
              "x": 18,
              "y": 3,
              "id": 14
            },
            {
              "x": 18,
              "y": 4,
              "id": 12
            },
            {
              "x": 18,
              "y": 5,
              "id": 0
            },
            {
              "x": 18,
              "y": 6,
              "id": 0
            },
            {
              "x": 18,
              "y": 7,
              "id": 0
            },
            {
              "x": 18,
              "y": 8,
              "id": 0
            },
            {
              "x": 18,
              "y": 9,
              "id": 0
            },
            {
              "x": 18,
              "y": 10,
              "id": 0
            },
            {
              "x": 18,
              "y": 11,
              "id": 0
            },
            {
              "x": 18,
              "y": 12,
              "id": 0
            },
            {
              "x": 19,
              "y": 0,
              "id": 0
            },
            {
              "x": 19,
              "y": 1,
              "id": 0
            },
            {
              "x": 19,
              "y": 2,
              "id": 0
            },
            {
              "x": 19,
              "y": 3,
              "id": 0
            },
            {
              "x": 19,
              "y": 4,
              "id": 0
            },
            {
              "x": 19,
              "y": 5,
              "id": 0
            },
            {
              "x": 19,
              "y": 6,
              "id": 0
            },
            {
              "x": 19,
              "y": 7,
              "id": 0
            },
            {
              "x": 19,
              "y": 8,
              "id": 0
            },
            {
              "x": 19,
              "y": 9,
              "id": 0
            },
            {
              "x": 19,
              "y": 10,
              "id": 0
            },
            {
              "x": 19,
              "y": 11,
              "id": 0
            },
            {
              "x": 19,
              "y": 12,
              "id": 0
            },
            {
              "x": 20,
              "y": 0,
              "id": 0
            },
            {
              "x": 20,
              "y": 1,
              "id": 0
            },
            {
              "x": 20,
              "y": 2,
              "id": 0
            },
            {
              "x": 20,
              "y": 3,
              "id": 0
            },
            {
              "x": 20,
              "y": 4,
              "id": 0
            },
            {
              "x": 20,
              "y": 5,
              "id": 0
            },
            {
              "x": 20,
              "y": 6,
              "id": 0
            },
            {
              "x": 20,
              "y": 7,
              "id": 0
            },
            {
              "x": 20,
              "y": 8,
              "id": 0
            },
            {
              "x": 20,
              "y": 9,
              "id": 0
            },
            {
              "x": 20,
              "y": 10,
              "id": 0
            },
            {
              "x": 20,
              "y": 11,
              "id": 0
            },
            {
              "x": 20,
              "y": 12,
              "id": 0
            },
            {
              "x": 21,
              "y": 0,
              "id": 0
            },
            {
              "x": 21,
              "y": 1,
              "id": 0
            },
            {
              "x": 21,
              "y": 2,
              "id": 0
            },
            {
              "x": 21,
              "y": 3,
              "id": 0
            },
            {
              "x": 21,
              "y": 4,
              "id": 0
            },
            {
              "x": 21,
              "y": 5,
              "id": 0
            },
            {
              "x": 21,
              "y": 6,
              "id": 0
            },
            {
              "x": 21,
              "y": 7,
              "id": 0
            },
            {
              "x": 21,
              "y": 8,
              "id": 0
            },
            {
              "x": 21,
              "y": 9,
              "id": 0
            },
            {
              "x": 21,
              "y": 10,
              "id": 0
            },
            {
              "x": 21,
              "y": 11,
              "id": 0
            },
            {
              "x": 21,
              "y": 12,
              "id": 0
            },
            {
              "x": 22,
              "y": 0,
              "id": 0
            },
            {
              "x": 22,
              "y": 1,
              "id": 0
            },
            {
              "x": 22,
              "y": 2,
              "id": 0
            },
            {
              "x": 22,
              "y": 3,
              "id": 0
            },
            {
              "x": 22,
              "y": 4,
              "id": 0
            },
            {
              "x": 22,
              "y": 5,
              "id": 0
            },
            {
              "x": 22,
              "y": 6,
              "id": 0
            },
            {
              "x": 22,
              "y": 7,
              "id": 0
            },
            {
              "x": 22,
              "y": 8,
              "id": 0
            },
            {
              "x": 22,
              "y": 9,
              "id": 0
            },
            {
              "x": 22,
              "y": 10,
              "id": 0
            },
            {
              "x": 22,
              "y": 11,
              "id": 0
            },
            {
              "x": 22,
              "y": 12,
              "id": 0
            },
            {
              "x": 23,
              "y": 0,
              "id": 0
            },
            {
              "x": 23,
              "y": 1,
              "id": 0
            },
            {
              "x": 23,
              "y": 2,
              "id": 0
            },
            {
              "x": 23,
              "y": 3,
              "id": 0
            },
            {
              "x": 23,
              "y": 4,
              "id": 0
            },
            {
              "x": 23,
              "y": 5,
              "id": 0
            },
            {
              "x": 23,
              "y": 6,
              "id": 0
            },
            {
              "x": 23,
              "y": 7,
              "id": 0
            },
            {
              "x": 23,
              "y": 8,
              "id": 0
            },
            {
              "x": 23,
              "y": 9,
              "id": 0
            },
            {
              "x": 23,
              "y": 10,
              "id": 0
            },
            {
              "x": 23,
              "y": 11,
              "id": 0
            },
            {
              "x": 23,
              "y": 12,
              "id": 0
            },
            {
              "x": 24,
              "y": 0,
              "id": 0
            },
            {
              "x": 24,
              "y": 1,
              "id": 0
            },
            {
              "x": 24,
              "y": 2,
              "id": 0
            },
            {
              "x": 24,
              "y": 3,
              "id": 0
            },
            {
              "x": 24,
              "y": 4,
              "id": 0
            },
            {
              "x": 24,
              "y": 5,
              "id": 0
            },
            {
              "x": 24,
              "y": 6,
              "id": 0
            },
            {
              "x": 24,
              "y": 7,
              "id": 0
            },
            {
              "x": 24,
              "y": 8,
              "id": 0
            },
            {
              "x": 24,
              "y": 9,
              "id": 0
            },
            {
              "x": 24,
              "y": 10,
              "id": 0
            },
            {
              "x": 24,
              "y": 11,
              "id": 0
            },
            {
              "x": 24,
              "y": 12,
              "id": 0
            },
            {
              "x": 25,
              "y": 0,
              "id": 0
            },
            {
              "x": 25,
              "y": 1,
              "id": 0
            },
            {
              "x": 25,
              "y": 2,
              "id": 0
            },
            {
              "x": 25,
              "y": 3,
              "id": 0
            },
            {
              "x": 25,
              "y": 4,
              "id": 0
            },
            {
              "x": 25,
              "y": 5,
              "id": 0
            },
            {
              "x": 25,
              "y": 6,
              "id": 0
            },
            {
              "x": 25,
              "y": 7,
              "id": 0
            },
            {
              "x": 25,
              "y": 8,
              "id": 0
            },
            {
              "x": 25,
              "y": 9,
              "id": 0
            },
            {
              "x": 25,
              "y": 10,
              "id": 0
            },
            {
              "x": 25,
              "y": 11,
              "id": 0
            },
            {
              "x": 25,
              "y": 12,
              "id": 0
            },
            {
              "x": 26,
              "y": 0,
              "id": 0
            },
            {
              "x": 26,
              "y": 1,
              "id": 0
            },
            {
              "x": 26,
              "y": 2,
              "id": 0
            },
            {
              "x": 26,
              "y": 3,
              "id": 0
            },
            {
              "x": 26,
              "y": 4,
              "id": 0
            },
            {
              "x": 26,
              "y": 5,
              "id": 0
            },
            {
              "x": 26,
              "y": 6,
              "id": 0
            },
            {
              "x": 26,
              "y": 7,
              "id": 0
            },
            {
              "x": 26,
              "y": 8,
              "id": 0
            },
            {
              "x": 26,
              "y": 9,
              "id": 0
            },
            {
              "x": 26,
              "y": 10,
              "id": 0
            },
            {
              "x": 26,
              "y": 11,
              "id": 0
            },
            {
              "x": 26,
              "y": 12,
              "id": 0
            },
            {
              "x": 27,
              "y": 0,
              "id": 0
            },
            {
              "x": 27,
              "y": 1,
              "id": 0
            },
            {
              "x": 27,
              "y": 2,
              "id": 0
            },
            {
              "x": 27,
              "y": 3,
              "id": 0
            },
            {
              "x": 27,
              "y": 4,
              "id": 0
            },
            {
              "x": 27,
              "y": 5,
              "id": 0
            },
            {
              "x": 27,
              "y": 6,
              "id": 0
            },
            {
              "x": 27,
              "y": 7,
              "id": 0
            },
            {
              "x": 27,
              "y": 8,
              "id": 0
            },
            {
              "x": 27,
              "y": 9,
              "id": 0
            },
            {
              "x": 27,
              "y": 10,
              "id": 0
            },
            {
              "x": 27,
              "y": 11,
              "id": 0
            },
            {
              "x": 27,
              "y": 12,
              "id": 0
            },
            {
              "x": 28,
              "y": 0,
              "id": 0
            },
            {
              "x": 28,
              "y": 1,
              "id": 0
            },
            {
              "x": 28,
              "y": 2,
              "id": 0
            },
            {
              "x": 28,
              "y": 3,
              "id": 0
            },
            {
              "x": 28,
              "y": 4,
              "id": 0
            },
            {
              "x": 28,
              "y": 5,
              "id": 0
            },
            {
              "x": 28,
              "y": 6,
              "id": 0
            },
            {
              "x": 28,
              "y": 7,
              "id": 0
            },
            {
              "x": 28,
              "y": 8,
              "id": 0
            },
            {
              "x": 28,
              "y": 9,
              "id": 0
            },
            {
              "x": 28,
              "y": 10,
              "id": 0
            },
            {
              "x": 28,
              "y": 11,
              "id": 0
            },
            {
              "x": 28,
              "y": 12,
              "id": 0
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 0,
              "y": 2,
              "id": 15
            },
            {
              "x": 0,
              "y": 3,
              "id": 16
            },
            {
              "x": 0,
              "y": 4,
              "id": 17
            },
            {
              "x": 0,
              "y": 5,
              "id": 18
            },
            {
              "x": 0,
              "y": 10,
              "id": 15
            },
            {
              "x": 0,
              "y": 11,
              "id": 17
            },
            {
              "x": 0,
              "y": 12,
              "id": 15
            },
            {
              "x": 1,
              "y": 12,
              "id": 19
            },
            {
              "x": 2,
              "y": 12,
              "id": 16
            },
            {
              "x": 3,
              "y": 10,
              "id": 16
            },
            {
              "x": 3,
              "y": 12,
              "id": 17
            },
            {
              "x": 4,
              "y": 12,
              "id": 19
            },
            {
              "x": 5,
              "y": 0,
              "id": 16
            },
            {
              "x": 5,
              "y": 3,
              "id": 18
            },
            {
              "x": 5,
              "y": 12,
              "id": 18
            },
            {
              "x": 6,
              "y": 0,
              "id": 18
            },
            {
              "x": 6,
              "y": 12,
              "id": 16
            },
            {
              "x": 7,
              "y": 0,
              "id": 15
            },
            {
              "x": 7,
              "y": 12,
              "id": 17
            },
            {
              "x": 8,
              "y": 12,
              "id": 18
            },
            {
              "x": 9,
              "y": 12,
              "id": 15
            },
            {
              "x": 10,
              "y": 12,
              "id": 15
            },
            {
              "x": 11,
              "y": 12,
              "id": 17
            },
            {
              "x": 12,
              "y": 12,
              "id": 15
            },
            {
              "x": 13,
              "y": 9,
              "id": 20
            },
            {
              "x": 13,
              "y": 12,
              "id": 17
            },
            {
              "x": 14,
              "y": 9,
              "id": 21
            },
            {
              "x": 14,
              "y": 12,
              "id": 18
            },
            {
              "x": 15,
              "y": 3,
              "id": 22
            },
            {
              "x": 15,
              "y": 12,
              "id": 19
            },
            {
              "x": 16,
              "y": 12,
              "id": 17
            },
            {
              "x": 17,
              "y": 12,
              "id": 19
            },
            {
              "x": 18,
              "y": 12,
              "id": 18
            },
            {
              "x": 19,
              "y": 12,
              "id": 16
            },
            {
              "x": 25,
              "y": 8,
              "id": 15
            },
            {
              "x": 25,
              "y": 12,
              "id": 15
            },
            {
              "x": 26,
              "y": 12,
              "id": 19
            },
            {
              "x": 27,
              "y": 12,
              "id": 18
            },
            {
              "x": 28,
              "y": 1,
              "id": 16
            },
            {
              "x": 28,
              "y": 2,
              "id": 19
            },
            {
              "x": 28,
              "y": 3,
              "id": 18
            },
            {
              "x": 28,
              "y": 4,
              "id": 17
            },
            {
              "x": 28,
              "y": 5,
              "id": 19
            },
            {
              "x": 28,
              "y": 6,
              "id": 16
            },
            {
              "x": 28,
              "y": 7,
              "id": 17
            },
            {
              "x": 28,
              "y": 8,
              "id": 19
            },
            {
              "x": 28,
              "y": 9,
              "id": 18
            },
            {
              "x": 28,
              "y": 10,
              "id": 16
            },
            {
              "x": 28,
              "y": 11,
              "id": 18
            },
            {
              "x": 28,
              "y": 12,
              "id": 17
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 8,
              "y": 8,
              "id": 19
            },
            {
              "x": 15,
              "y": 7,
              "id": 23
            },
            {
              "x": 15,
              "y": 8,
              "id": 24
            },
            {
              "x": 16,
              "y": 2,
              "id": 25
            },
            {
              "x": 16,
              "y": 3,
              "id": 26
            },
            {
              "x": 26,
              "y": 3,
              "id": 19
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 8,
              "y": 0,
              "id": 19
            },
            {
              "x": 9,
              "y": 0,
              "id": 16
            },
            {
              "x": 10,
              "y": 0,
              "id": 17
            },
            {
              "x": 11,
              "y": 0,
              "id": 16
            },
            {
              "x": 12,
              "y": 0,
              "id": 18
            },
            {
              "x": 13,
              "y": 0,
              "id": 19
            },
            {
              "x": 14,
              "y": 0,
              "id": 15
            },
            {
              "x": 15,
              "y": 0,
              "id": 18
            },
            {
              "x": 16,
              "y": 0,
              "id": 17
            },
            {
              "x": 17,
              "y": 0,
              "id": 19
            },
            {
              "x": 18,
              "y": 0,
              "id": 16
            },
            {
              "x": 19,
              "y": 0,
              "id": 15
            },
            {
              "x": 24,
              "y": 0,
              "id": 17
            },
            {
              "x": 25,
              "y": 0,
              "id": 18
            },
            {
              "x": 26,
              "y": 0,
              "id": 16
            },
            {
              "x": 27,
              "y": 0,
              "id": 18
            },
            {
              "x": 28,
              "y": 0,
              "id": 19
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": []
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": []
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 2,
              "id": 27
            },
            {
              "x": 0,
              "y": 3,
              "id": 27
            },
            {
              "x": 0,
              "y": 4,
              "id": 27
            },
            {
              "x": 0,
              "y": 5,
              "id": 27
            },
            {
              "x": 0,
              "y": 10,
              "id": 27
            },
            {
              "x": 0,
              "y": 11,
              "id": 27
            },
            {
              "x": 0,
              "y": 12,
              "id": 27
            },
            {
              "x": 1,
              "y": 12,
              "id": 27
            },
            {
              "x": 2,
              "y": 12,
              "id": 27
            },
            {
              "x": 3,
              "y": 10,
              "id": 27
            },
            {
              "x": 3,
              "y": 12,
              "id": 27
            },
            {
              "x": 4,
              "y": 12,
              "id": 27
            },
            {
              "x": 5,
              "y": 0,
              "id": 27
            },
            {
              "x": 5,
              "y": 3,
              "id": 27
            },
            {
              "x": 5,
              "y": 12,
              "id": 27
            },
            {
              "x": 6,
              "y": 0,
              "id": 27
            },
            {
              "x": 6,
              "y": 12,
              "id": 27
            },
            {
              "x": 7,
              "y": 0,
              "id": 27
            },
            {
              "x": 7,
              "y": 12,
              "id": 27
            },
            {
              "x": 8,
              "y": 0,
              "id": 27
            },
            {
              "x": 8,
              "y": 8,
              "id": 27
            },
            {
              "x": 8,
              "y": 12,
              "id": 27
            },
            {
              "x": 9,
              "y": 0,
              "id": 27
            },
            {
              "x": 9,
              "y": 12,
              "id": 27
            },
            {
              "x": 10,
              "y": 0,
              "id": 27
            },
            {
              "x": 10,
              "y": 12,
              "id": 27
            },
            {
              "x": 11,
              "y": 0,
              "id": 27
            },
            {
              "x": 11,
              "y": 12,
              "id": 27
            },
            {
              "x": 12,
              "y": 0,
              "id": 27
            },
            {
              "x": 12,
              "y": 12,
              "id": 27
            },
            {
              "x": 13,
              "y": 0,
              "id": 27
            },
            {
              "x": 13,
              "y": 12,
              "id": 27
            },
            {
              "x": 14,
              "y": 0,
              "id": 27
            },
            {
              "x": 14,
              "y": 12,
              "id": 27
            },
            {
              "x": 15,
              "y": 0,
              "id": 27
            },
            {
              "x": 15,
              "y": 8,
              "id": 27
            },
            {
              "x": 15,
              "y": 12,
              "id": 27
            },
            {
              "x": 16,
              "y": 0,
              "id": 27
            },
            {
              "x": 16,
              "y": 3,
              "id": 27
            },
            {
              "x": 16,
              "y": 12,
              "id": 27
            },
            {
              "x": 17,
              "y": 0,
              "id": 27
            },
            {
              "x": 17,
              "y": 12,
              "id": 27
            },
            {
              "x": 18,
              "y": 0,
              "id": 27
            },
            {
              "x": 18,
              "y": 12,
              "id": 27
            },
            {
              "x": 19,
              "y": 0,
              "id": 27
            },
            {
              "x": 19,
              "y": 12,
              "id": 27
            },
            {
              "x": 24,
              "y": 0,
              "id": 27
            },
            {
              "x": 25,
              "y": 0,
              "id": 27
            },
            {
              "x": 25,
              "y": 8,
              "id": 27
            },
            {
              "x": 25,
              "y": 12,
              "id": 27
            },
            {
              "x": 26,
              "y": 0,
              "id": 27
            },
            {
              "x": 26,
              "y": 3,
              "id": 27
            },
            {
              "x": 26,
              "y": 12,
              "id": 27
            },
            {
              "x": 27,
              "y": 0,
              "id": 27
            },
            {
              "x": 27,
              "y": 12,
              "id": 27
            },
            {
              "x": 28,
              "y": 0,
              "id": 27
            },
            {
              "x": 28,
              "y": 1,
              "id": 27
            },
            {
              "x": 28,
              "y": 2,
              "id": 27
            },
            {
              "x": 28,
              "y": 3,
              "id": 27
            },
            {
              "x": 28,
              "y": 4,
              "id": 27
            },
            {
              "x": 28,
              "y": 5,
              "id": 27
            },
            {
              "x": 28,
              "y": 6,
              "id": 27
            },
            {
              "x": 28,
              "y": 7,
              "id": 27
            },
            {
              "x": 28,
              "y": 8,
              "id": 27
            },
            {
              "x": 28,
              "y": 9,
              "id": 27
            },
            {
              "x": 28,
              "y": 10,
              "id": 27
            },
            {
              "x": 28,
              "y": 11,
              "id": 27
            },
            {
              "x": 28,
              "y": 12,
              "id": 27
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - top half",
          "positions": [],
          "collision": {
            "type": "top-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    },
    "route-2": {
      "id": "route-2",
      "name": "Route 2",
      "kind": "town",
      "safezone": false,
      "tileSize": 128,
      "mapWidth": 30,
      "mapHeight": 14,
      "image": "assets/Maps/Route 2/Route 2.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 0
            },
            {
              "x": 0,
              "y": 8,
              "id": 0
            },
            {
              "x": 0,
              "y": 9,
              "id": 0
            },
            {
              "x": 0,
              "y": 10,
              "id": 0
            },
            {
              "x": 0,
              "y": 11,
              "id": 0
            },
            {
              "x": 0,
              "y": 12,
              "id": 0
            },
            {
              "x": 0,
              "y": 13,
              "id": 0
            },
            {
              "x": 1,
              "y": 0,
              "id": 0
            },
            {
              "x": 1,
              "y": 1,
              "id": 0
            },
            {
              "x": 1,
              "y": 2,
              "id": 0
            },
            {
              "x": 1,
              "y": 3,
              "id": 0
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 0
            },
            {
              "x": 1,
              "y": 8,
              "id": 0
            },
            {
              "x": 1,
              "y": 9,
              "id": 0
            },
            {
              "x": 1,
              "y": 10,
              "id": 0
            },
            {
              "x": 1,
              "y": 11,
              "id": 0
            },
            {
              "x": 1,
              "y": 12,
              "id": 0
            },
            {
              "x": 1,
              "y": 13,
              "id": 0
            },
            {
              "x": 2,
              "y": 0,
              "id": 0
            },
            {
              "x": 2,
              "y": 1,
              "id": 0
            },
            {
              "x": 2,
              "y": 2,
              "id": 0
            },
            {
              "x": 2,
              "y": 3,
              "id": 0
            },
            {
              "x": 2,
              "y": 4,
              "id": 0
            },
            {
              "x": 2,
              "y": 5,
              "id": 0
            },
            {
              "x": 2,
              "y": 6,
              "id": 0
            },
            {
              "x": 2,
              "y": 7,
              "id": 0
            },
            {
              "x": 2,
              "y": 8,
              "id": 0
            },
            {
              "x": 2,
              "y": 9,
              "id": 0
            },
            {
              "x": 2,
              "y": 10,
              "id": 0
            },
            {
              "x": 2,
              "y": 11,
              "id": 0
            },
            {
              "x": 2,
              "y": 12,
              "id": 0
            },
            {
              "x": 2,
              "y": 13,
              "id": 0
            },
            {
              "x": 3,
              "y": 0,
              "id": 0
            },
            {
              "x": 3,
              "y": 1,
              "id": 0
            },
            {
              "x": 3,
              "y": 2,
              "id": 0
            },
            {
              "x": 3,
              "y": 3,
              "id": 0
            },
            {
              "x": 3,
              "y": 4,
              "id": 0
            },
            {
              "x": 3,
              "y": 5,
              "id": 0
            },
            {
              "x": 3,
              "y": 6,
              "id": 0
            },
            {
              "x": 3,
              "y": 7,
              "id": 0
            },
            {
              "x": 3,
              "y": 8,
              "id": 0
            },
            {
              "x": 3,
              "y": 9,
              "id": 0
            },
            {
              "x": 3,
              "y": 10,
              "id": 0
            },
            {
              "x": 3,
              "y": 11,
              "id": 0
            },
            {
              "x": 3,
              "y": 12,
              "id": 0
            },
            {
              "x": 3,
              "y": 13,
              "id": 0
            },
            {
              "x": 4,
              "y": 0,
              "id": 0
            },
            {
              "x": 4,
              "y": 1,
              "id": 0
            },
            {
              "x": 4,
              "y": 2,
              "id": 0
            },
            {
              "x": 4,
              "y": 3,
              "id": 0
            },
            {
              "x": 4,
              "y": 4,
              "id": 0
            },
            {
              "x": 4,
              "y": 5,
              "id": 0
            },
            {
              "x": 4,
              "y": 6,
              "id": 0
            },
            {
              "x": 4,
              "y": 7,
              "id": 0
            },
            {
              "x": 4,
              "y": 8,
              "id": 0
            },
            {
              "x": 4,
              "y": 9,
              "id": 0
            },
            {
              "x": 4,
              "y": 10,
              "id": 0
            },
            {
              "x": 4,
              "y": 11,
              "id": 0
            },
            {
              "x": 4,
              "y": 12,
              "id": 0
            },
            {
              "x": 4,
              "y": 13,
              "id": 0
            },
            {
              "x": 5,
              "y": 0,
              "id": 0
            },
            {
              "x": 5,
              "y": 1,
              "id": 0
            },
            {
              "x": 5,
              "y": 2,
              "id": 0
            },
            {
              "x": 5,
              "y": 3,
              "id": 0
            },
            {
              "x": 5,
              "y": 4,
              "id": 0
            },
            {
              "x": 5,
              "y": 5,
              "id": 0
            },
            {
              "x": 5,
              "y": 6,
              "id": 0
            },
            {
              "x": 5,
              "y": 7,
              "id": 0
            },
            {
              "x": 5,
              "y": 8,
              "id": 0
            },
            {
              "x": 5,
              "y": 9,
              "id": 0
            },
            {
              "x": 5,
              "y": 10,
              "id": 0
            },
            {
              "x": 5,
              "y": 11,
              "id": 0
            },
            {
              "x": 5,
              "y": 12,
              "id": 0
            },
            {
              "x": 5,
              "y": 13,
              "id": 0
            },
            {
              "x": 6,
              "y": 0,
              "id": 0
            },
            {
              "x": 6,
              "y": 1,
              "id": 0
            },
            {
              "x": 6,
              "y": 2,
              "id": 0
            },
            {
              "x": 6,
              "y": 3,
              "id": 0
            },
            {
              "x": 6,
              "y": 4,
              "id": 0
            },
            {
              "x": 6,
              "y": 5,
              "id": 0
            },
            {
              "x": 6,
              "y": 6,
              "id": 0
            },
            {
              "x": 6,
              "y": 7,
              "id": 0
            },
            {
              "x": 6,
              "y": 8,
              "id": 0
            },
            {
              "x": 6,
              "y": 9,
              "id": 0
            },
            {
              "x": 6,
              "y": 10,
              "id": 0
            },
            {
              "x": 6,
              "y": 11,
              "id": 0
            },
            {
              "x": 6,
              "y": 12,
              "id": 0
            },
            {
              "x": 6,
              "y": 13,
              "id": 0
            },
            {
              "x": 7,
              "y": 0,
              "id": 0
            },
            {
              "x": 7,
              "y": 1,
              "id": 0
            },
            {
              "x": 7,
              "y": 2,
              "id": 0
            },
            {
              "x": 7,
              "y": 3,
              "id": 0
            },
            {
              "x": 7,
              "y": 4,
              "id": 0
            },
            {
              "x": 7,
              "y": 5,
              "id": 0
            },
            {
              "x": 7,
              "y": 6,
              "id": 0
            },
            {
              "x": 7,
              "y": 7,
              "id": 0
            },
            {
              "x": 7,
              "y": 8,
              "id": 0
            },
            {
              "x": 7,
              "y": 9,
              "id": 0
            },
            {
              "x": 7,
              "y": 10,
              "id": 0
            },
            {
              "x": 7,
              "y": 11,
              "id": 0
            },
            {
              "x": 7,
              "y": 12,
              "id": 0
            },
            {
              "x": 7,
              "y": 13,
              "id": 0
            },
            {
              "x": 8,
              "y": 0,
              "id": 0
            },
            {
              "x": 8,
              "y": 1,
              "id": 0
            },
            {
              "x": 8,
              "y": 2,
              "id": 0
            },
            {
              "x": 8,
              "y": 3,
              "id": 0
            },
            {
              "x": 8,
              "y": 4,
              "id": 0
            },
            {
              "x": 8,
              "y": 5,
              "id": 0
            },
            {
              "x": 8,
              "y": 6,
              "id": 0
            },
            {
              "x": 8,
              "y": 7,
              "id": 0
            },
            {
              "x": 8,
              "y": 8,
              "id": 0
            },
            {
              "x": 8,
              "y": 9,
              "id": 0
            },
            {
              "x": 8,
              "y": 10,
              "id": 0
            },
            {
              "x": 8,
              "y": 11,
              "id": 0
            },
            {
              "x": 8,
              "y": 12,
              "id": 0
            },
            {
              "x": 8,
              "y": 13,
              "id": 0
            },
            {
              "x": 9,
              "y": 0,
              "id": 0
            },
            {
              "x": 9,
              "y": 1,
              "id": 0
            },
            {
              "x": 9,
              "y": 2,
              "id": 0
            },
            {
              "x": 9,
              "y": 3,
              "id": 0
            },
            {
              "x": 9,
              "y": 4,
              "id": 0
            },
            {
              "x": 9,
              "y": 5,
              "id": 0
            },
            {
              "x": 9,
              "y": 6,
              "id": 0
            },
            {
              "x": 9,
              "y": 7,
              "id": 0
            },
            {
              "x": 9,
              "y": 8,
              "id": 0
            },
            {
              "x": 9,
              "y": 9,
              "id": 0
            },
            {
              "x": 9,
              "y": 10,
              "id": 0
            },
            {
              "x": 9,
              "y": 11,
              "id": 0
            },
            {
              "x": 9,
              "y": 12,
              "id": 0
            },
            {
              "x": 9,
              "y": 13,
              "id": 0
            },
            {
              "x": 10,
              "y": 0,
              "id": 0
            },
            {
              "x": 10,
              "y": 1,
              "id": 0
            },
            {
              "x": 10,
              "y": 2,
              "id": 0
            },
            {
              "x": 10,
              "y": 3,
              "id": 0
            },
            {
              "x": 10,
              "y": 4,
              "id": 0
            },
            {
              "x": 10,
              "y": 5,
              "id": 0
            },
            {
              "x": 10,
              "y": 6,
              "id": 0
            },
            {
              "x": 10,
              "y": 7,
              "id": 0
            },
            {
              "x": 10,
              "y": 8,
              "id": 0
            },
            {
              "x": 10,
              "y": 9,
              "id": 0
            },
            {
              "x": 10,
              "y": 10,
              "id": 0
            },
            {
              "x": 10,
              "y": 11,
              "id": 0
            },
            {
              "x": 10,
              "y": 12,
              "id": 0
            },
            {
              "x": 10,
              "y": 13,
              "id": 0
            },
            {
              "x": 11,
              "y": 0,
              "id": 0
            },
            {
              "x": 11,
              "y": 1,
              "id": 0
            },
            {
              "x": 11,
              "y": 2,
              "id": 0
            },
            {
              "x": 11,
              "y": 3,
              "id": 0
            },
            {
              "x": 11,
              "y": 4,
              "id": 0
            },
            {
              "x": 11,
              "y": 5,
              "id": 0
            },
            {
              "x": 11,
              "y": 6,
              "id": 0
            },
            {
              "x": 11,
              "y": 7,
              "id": 0
            },
            {
              "x": 11,
              "y": 8,
              "id": 0
            },
            {
              "x": 11,
              "y": 9,
              "id": 0
            },
            {
              "x": 11,
              "y": 10,
              "id": 0
            },
            {
              "x": 11,
              "y": 11,
              "id": 0
            },
            {
              "x": 11,
              "y": 12,
              "id": 0
            },
            {
              "x": 11,
              "y": 13,
              "id": 0
            },
            {
              "x": 12,
              "y": 0,
              "id": 1
            },
            {
              "x": 12,
              "y": 1,
              "id": 0
            },
            {
              "x": 12,
              "y": 2,
              "id": 0
            },
            {
              "x": 12,
              "y": 3,
              "id": 0
            },
            {
              "x": 12,
              "y": 4,
              "id": 2
            },
            {
              "x": 12,
              "y": 5,
              "id": 2
            },
            {
              "x": 12,
              "y": 6,
              "id": 2
            },
            {
              "x": 12,
              "y": 7,
              "id": 2
            },
            {
              "x": 12,
              "y": 8,
              "id": 2
            },
            {
              "x": 12,
              "y": 9,
              "id": 2
            },
            {
              "x": 12,
              "y": 10,
              "id": 2
            },
            {
              "x": 12,
              "y": 11,
              "id": 2
            },
            {
              "x": 12,
              "y": 12,
              "id": 2
            },
            {
              "x": 12,
              "y": 13,
              "id": 2
            },
            {
              "x": 13,
              "y": 0,
              "id": 1
            },
            {
              "x": 13,
              "y": 1,
              "id": 0
            },
            {
              "x": 13,
              "y": 2,
              "id": 0
            },
            {
              "x": 13,
              "y": 3,
              "id": 0
            },
            {
              "x": 13,
              "y": 4,
              "id": 2
            },
            {
              "x": 13,
              "y": 5,
              "id": 2
            },
            {
              "x": 13,
              "y": 6,
              "id": 2
            },
            {
              "x": 13,
              "y": 7,
              "id": 2
            },
            {
              "x": 13,
              "y": 8,
              "id": 2
            },
            {
              "x": 13,
              "y": 9,
              "id": 2
            },
            {
              "x": 13,
              "y": 10,
              "id": 2
            },
            {
              "x": 13,
              "y": 11,
              "id": 2
            },
            {
              "x": 13,
              "y": 12,
              "id": 2
            },
            {
              "x": 13,
              "y": 13,
              "id": 2
            },
            {
              "x": 14,
              "y": 0,
              "id": 1
            },
            {
              "x": 14,
              "y": 1,
              "id": 0
            },
            {
              "x": 14,
              "y": 2,
              "id": 0
            },
            {
              "x": 14,
              "y": 3,
              "id": 0
            },
            {
              "x": 14,
              "y": 4,
              "id": 2
            },
            {
              "x": 14,
              "y": 5,
              "id": 2
            },
            {
              "x": 14,
              "y": 6,
              "id": 2
            },
            {
              "x": 14,
              "y": 7,
              "id": 2
            },
            {
              "x": 14,
              "y": 8,
              "id": 2
            },
            {
              "x": 14,
              "y": 9,
              "id": 2
            },
            {
              "x": 14,
              "y": 10,
              "id": 2
            },
            {
              "x": 14,
              "y": 11,
              "id": 2
            },
            {
              "x": 14,
              "y": 12,
              "id": 2
            },
            {
              "x": 14,
              "y": 13,
              "id": 0
            },
            {
              "x": 15,
              "y": 0,
              "id": 1
            },
            {
              "x": 15,
              "y": 1,
              "id": 0
            },
            {
              "x": 15,
              "y": 2,
              "id": 0
            },
            {
              "x": 15,
              "y": 3,
              "id": 0
            },
            {
              "x": 15,
              "y": 4,
              "id": 2
            },
            {
              "x": 15,
              "y": 5,
              "id": 2
            },
            {
              "x": 15,
              "y": 6,
              "id": 2
            },
            {
              "x": 15,
              "y": 7,
              "id": 2
            },
            {
              "x": 15,
              "y": 8,
              "id": 2
            },
            {
              "x": 15,
              "y": 9,
              "id": 2
            },
            {
              "x": 15,
              "y": 10,
              "id": 2
            },
            {
              "x": 15,
              "y": 11,
              "id": 2
            },
            {
              "x": 15,
              "y": 12,
              "id": 2
            },
            {
              "x": 15,
              "y": 13,
              "id": 2
            },
            {
              "x": 16,
              "y": 0,
              "id": 0
            },
            {
              "x": 16,
              "y": 1,
              "id": 0
            },
            {
              "x": 16,
              "y": 2,
              "id": 0
            },
            {
              "x": 16,
              "y": 3,
              "id": 0
            },
            {
              "x": 16,
              "y": 4,
              "id": 0
            },
            {
              "x": 16,
              "y": 5,
              "id": 0
            },
            {
              "x": 16,
              "y": 6,
              "id": 0
            },
            {
              "x": 16,
              "y": 7,
              "id": 0
            },
            {
              "x": 16,
              "y": 8,
              "id": 0
            },
            {
              "x": 16,
              "y": 9,
              "id": 0
            },
            {
              "x": 16,
              "y": 10,
              "id": 0
            },
            {
              "x": 16,
              "y": 11,
              "id": 0
            },
            {
              "x": 16,
              "y": 12,
              "id": 0
            },
            {
              "x": 16,
              "y": 13,
              "id": 0
            },
            {
              "x": 17,
              "y": 0,
              "id": 0
            },
            {
              "x": 17,
              "y": 1,
              "id": 0
            },
            {
              "x": 17,
              "y": 2,
              "id": 0
            },
            {
              "x": 17,
              "y": 3,
              "id": 0
            },
            {
              "x": 17,
              "y": 4,
              "id": 0
            },
            {
              "x": 17,
              "y": 5,
              "id": 0
            },
            {
              "x": 17,
              "y": 6,
              "id": 0
            },
            {
              "x": 17,
              "y": 7,
              "id": 0
            },
            {
              "x": 17,
              "y": 8,
              "id": 0
            },
            {
              "x": 17,
              "y": 9,
              "id": 0
            },
            {
              "x": 17,
              "y": 10,
              "id": 0
            },
            {
              "x": 17,
              "y": 11,
              "id": 0
            },
            {
              "x": 17,
              "y": 12,
              "id": 0
            },
            {
              "x": 17,
              "y": 13,
              "id": 0
            },
            {
              "x": 18,
              "y": 0,
              "id": 0
            },
            {
              "x": 18,
              "y": 1,
              "id": 0
            },
            {
              "x": 18,
              "y": 2,
              "id": 0
            },
            {
              "x": 18,
              "y": 3,
              "id": 0
            },
            {
              "x": 18,
              "y": 4,
              "id": 0
            },
            {
              "x": 18,
              "y": 5,
              "id": 0
            },
            {
              "x": 18,
              "y": 6,
              "id": 0
            },
            {
              "x": 18,
              "y": 7,
              "id": 0
            },
            {
              "x": 18,
              "y": 8,
              "id": 0
            },
            {
              "x": 18,
              "y": 9,
              "id": 0
            },
            {
              "x": 18,
              "y": 10,
              "id": 0
            },
            {
              "x": 18,
              "y": 11,
              "id": 0
            },
            {
              "x": 18,
              "y": 12,
              "id": 0
            },
            {
              "x": 18,
              "y": 13,
              "id": 0
            },
            {
              "x": 19,
              "y": 0,
              "id": 0
            },
            {
              "x": 19,
              "y": 1,
              "id": 0
            },
            {
              "x": 19,
              "y": 2,
              "id": 0
            },
            {
              "x": 19,
              "y": 3,
              "id": 0
            },
            {
              "x": 19,
              "y": 4,
              "id": 0
            },
            {
              "x": 19,
              "y": 5,
              "id": 0
            },
            {
              "x": 19,
              "y": 6,
              "id": 0
            },
            {
              "x": 19,
              "y": 7,
              "id": 0
            },
            {
              "x": 19,
              "y": 8,
              "id": 0
            },
            {
              "x": 19,
              "y": 9,
              "id": 0
            },
            {
              "x": 19,
              "y": 10,
              "id": 0
            },
            {
              "x": 19,
              "y": 11,
              "id": 0
            },
            {
              "x": 19,
              "y": 12,
              "id": 0
            },
            {
              "x": 19,
              "y": 13,
              "id": 0
            },
            {
              "x": 20,
              "y": 0,
              "id": 0
            },
            {
              "x": 20,
              "y": 1,
              "id": 0
            },
            {
              "x": 20,
              "y": 2,
              "id": 0
            },
            {
              "x": 20,
              "y": 3,
              "id": 0
            },
            {
              "x": 20,
              "y": 4,
              "id": 0
            },
            {
              "x": 20,
              "y": 5,
              "id": 0
            },
            {
              "x": 20,
              "y": 6,
              "id": 0
            },
            {
              "x": 20,
              "y": 7,
              "id": 0
            },
            {
              "x": 20,
              "y": 8,
              "id": 0
            },
            {
              "x": 20,
              "y": 9,
              "id": 0
            },
            {
              "x": 20,
              "y": 10,
              "id": 0
            },
            {
              "x": 20,
              "y": 11,
              "id": 0
            },
            {
              "x": 20,
              "y": 12,
              "id": 0
            },
            {
              "x": 20,
              "y": 13,
              "id": 0
            },
            {
              "x": 21,
              "y": 0,
              "id": 0
            },
            {
              "x": 21,
              "y": 1,
              "id": 0
            },
            {
              "x": 21,
              "y": 2,
              "id": 0
            },
            {
              "x": 21,
              "y": 3,
              "id": 0
            },
            {
              "x": 21,
              "y": 4,
              "id": 0
            },
            {
              "x": 21,
              "y": 5,
              "id": 0
            },
            {
              "x": 21,
              "y": 6,
              "id": 0
            },
            {
              "x": 21,
              "y": 7,
              "id": 0
            },
            {
              "x": 21,
              "y": 8,
              "id": 0
            },
            {
              "x": 21,
              "y": 9,
              "id": 0
            },
            {
              "x": 21,
              "y": 10,
              "id": 0
            },
            {
              "x": 21,
              "y": 11,
              "id": 0
            },
            {
              "x": 21,
              "y": 12,
              "id": 0
            },
            {
              "x": 21,
              "y": 13,
              "id": 0
            },
            {
              "x": 22,
              "y": 0,
              "id": 0
            },
            {
              "x": 22,
              "y": 1,
              "id": 0
            },
            {
              "x": 22,
              "y": 2,
              "id": 0
            },
            {
              "x": 22,
              "y": 3,
              "id": 0
            },
            {
              "x": 22,
              "y": 4,
              "id": 0
            },
            {
              "x": 22,
              "y": 5,
              "id": 0
            },
            {
              "x": 22,
              "y": 6,
              "id": 0
            },
            {
              "x": 22,
              "y": 7,
              "id": 0
            },
            {
              "x": 22,
              "y": 8,
              "id": 0
            },
            {
              "x": 22,
              "y": 9,
              "id": 0
            },
            {
              "x": 22,
              "y": 10,
              "id": 0
            },
            {
              "x": 22,
              "y": 11,
              "id": 0
            },
            {
              "x": 22,
              "y": 12,
              "id": 0
            },
            {
              "x": 22,
              "y": 13,
              "id": 0
            },
            {
              "x": 23,
              "y": 0,
              "id": 0
            },
            {
              "x": 23,
              "y": 1,
              "id": 0
            },
            {
              "x": 23,
              "y": 2,
              "id": 0
            },
            {
              "x": 23,
              "y": 3,
              "id": 0
            },
            {
              "x": 23,
              "y": 4,
              "id": 0
            },
            {
              "x": 23,
              "y": 5,
              "id": 0
            },
            {
              "x": 23,
              "y": 6,
              "id": 0
            },
            {
              "x": 23,
              "y": 7,
              "id": 0
            },
            {
              "x": 23,
              "y": 8,
              "id": 0
            },
            {
              "x": 23,
              "y": 9,
              "id": 0
            },
            {
              "x": 23,
              "y": 10,
              "id": 0
            },
            {
              "x": 23,
              "y": 11,
              "id": 0
            },
            {
              "x": 23,
              "y": 12,
              "id": 0
            },
            {
              "x": 23,
              "y": 13,
              "id": 0
            },
            {
              "x": 24,
              "y": 0,
              "id": 0
            },
            {
              "x": 24,
              "y": 1,
              "id": 0
            },
            {
              "x": 24,
              "y": 2,
              "id": 0
            },
            {
              "x": 24,
              "y": 3,
              "id": 0
            },
            {
              "x": 24,
              "y": 4,
              "id": 0
            },
            {
              "x": 24,
              "y": 5,
              "id": 0
            },
            {
              "x": 24,
              "y": 6,
              "id": 0
            },
            {
              "x": 24,
              "y": 7,
              "id": 0
            },
            {
              "x": 24,
              "y": 8,
              "id": 0
            },
            {
              "x": 24,
              "y": 9,
              "id": 0
            },
            {
              "x": 24,
              "y": 10,
              "id": 0
            },
            {
              "x": 24,
              "y": 11,
              "id": 0
            },
            {
              "x": 24,
              "y": 12,
              "id": 0
            },
            {
              "x": 24,
              "y": 13,
              "id": 0
            },
            {
              "x": 25,
              "y": 0,
              "id": 0
            },
            {
              "x": 25,
              "y": 1,
              "id": 0
            },
            {
              "x": 25,
              "y": 2,
              "id": 0
            },
            {
              "x": 25,
              "y": 3,
              "id": 0
            },
            {
              "x": 25,
              "y": 4,
              "id": 0
            },
            {
              "x": 25,
              "y": 5,
              "id": 0
            },
            {
              "x": 25,
              "y": 6,
              "id": 0
            },
            {
              "x": 25,
              "y": 7,
              "id": 0
            },
            {
              "x": 25,
              "y": 8,
              "id": 0
            },
            {
              "x": 25,
              "y": 9,
              "id": 0
            },
            {
              "x": 25,
              "y": 10,
              "id": 0
            },
            {
              "x": 25,
              "y": 11,
              "id": 0
            },
            {
              "x": 25,
              "y": 12,
              "id": 0
            },
            {
              "x": 25,
              "y": 13,
              "id": 0
            },
            {
              "x": 26,
              "y": 0,
              "id": 0
            },
            {
              "x": 26,
              "y": 1,
              "id": 0
            },
            {
              "x": 26,
              "y": 2,
              "id": 0
            },
            {
              "x": 26,
              "y": 3,
              "id": 0
            },
            {
              "x": 26,
              "y": 4,
              "id": 0
            },
            {
              "x": 26,
              "y": 5,
              "id": 0
            },
            {
              "x": 26,
              "y": 6,
              "id": 0
            },
            {
              "x": 26,
              "y": 7,
              "id": 0
            },
            {
              "x": 26,
              "y": 8,
              "id": 0
            },
            {
              "x": 26,
              "y": 9,
              "id": 0
            },
            {
              "x": 26,
              "y": 10,
              "id": 0
            },
            {
              "x": 26,
              "y": 11,
              "id": 0
            },
            {
              "x": 26,
              "y": 12,
              "id": 0
            },
            {
              "x": 26,
              "y": 13,
              "id": 0
            },
            {
              "x": 27,
              "y": 0,
              "id": 0
            },
            {
              "x": 27,
              "y": 1,
              "id": 0
            },
            {
              "x": 27,
              "y": 2,
              "id": 0
            },
            {
              "x": 27,
              "y": 3,
              "id": 0
            },
            {
              "x": 27,
              "y": 4,
              "id": 0
            },
            {
              "x": 27,
              "y": 5,
              "id": 0
            },
            {
              "x": 27,
              "y": 6,
              "id": 0
            },
            {
              "x": 27,
              "y": 7,
              "id": 0
            },
            {
              "x": 27,
              "y": 8,
              "id": 0
            },
            {
              "x": 27,
              "y": 9,
              "id": 0
            },
            {
              "x": 27,
              "y": 10,
              "id": 0
            },
            {
              "x": 27,
              "y": 11,
              "id": 0
            },
            {
              "x": 27,
              "y": 12,
              "id": 0
            },
            {
              "x": 27,
              "y": 13,
              "id": 0
            },
            {
              "x": 28,
              "y": 0,
              "id": 0
            },
            {
              "x": 28,
              "y": 1,
              "id": 0
            },
            {
              "x": 28,
              "y": 2,
              "id": 0
            },
            {
              "x": 28,
              "y": 3,
              "id": 0
            },
            {
              "x": 28,
              "y": 4,
              "id": 0
            },
            {
              "x": 28,
              "y": 5,
              "id": 0
            },
            {
              "x": 28,
              "y": 6,
              "id": 0
            },
            {
              "x": 28,
              "y": 7,
              "id": 0
            },
            {
              "x": 28,
              "y": 8,
              "id": 0
            },
            {
              "x": 28,
              "y": 9,
              "id": 0
            },
            {
              "x": 28,
              "y": 10,
              "id": 0
            },
            {
              "x": 28,
              "y": 11,
              "id": 0
            },
            {
              "x": 28,
              "y": 12,
              "id": 0
            },
            {
              "x": 28,
              "y": 13,
              "id": 0
            },
            {
              "x": 29,
              "y": 0,
              "id": 0
            },
            {
              "x": 29,
              "y": 1,
              "id": 0
            },
            {
              "x": 29,
              "y": 2,
              "id": 0
            },
            {
              "x": 29,
              "y": 3,
              "id": 0
            },
            {
              "x": 29,
              "y": 4,
              "id": 0
            },
            {
              "x": 29,
              "y": 5,
              "id": 0
            },
            {
              "x": 29,
              "y": 6,
              "id": 0
            },
            {
              "x": 29,
              "y": 7,
              "id": 0
            },
            {
              "x": 29,
              "y": 8,
              "id": 0
            },
            {
              "x": 29,
              "y": 9,
              "id": 0
            },
            {
              "x": 29,
              "y": 10,
              "id": 0
            },
            {
              "x": 29,
              "y": 11,
              "id": 0
            },
            {
              "x": 29,
              "y": 12,
              "id": 0
            },
            {
              "x": 29,
              "y": 13,
              "id": 0
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 0,
              "y": 1,
              "id": 3
            },
            {
              "x": 0,
              "y": 2,
              "id": 3
            },
            {
              "x": 0,
              "y": 3,
              "id": 3
            },
            {
              "x": 0,
              "y": 4,
              "id": 3
            },
            {
              "x": 0,
              "y": 5,
              "id": 3
            },
            {
              "x": 0,
              "y": 10,
              "id": 3
            },
            {
              "x": 0,
              "y": 11,
              "id": 3
            },
            {
              "x": 0,
              "y": 12,
              "id": 3
            },
            {
              "x": 0,
              "y": 13,
              "id": 4
            },
            {
              "x": 1,
              "y": 13,
              "id": 5
            },
            {
              "x": 2,
              "y": 13,
              "id": 6
            },
            {
              "x": 3,
              "y": 13,
              "id": 5
            },
            {
              "x": 4,
              "y": 13,
              "id": 4
            },
            {
              "x": 5,
              "y": 13,
              "id": 5
            },
            {
              "x": 6,
              "y": 13,
              "id": 7
            },
            {
              "x": 7,
              "y": 13,
              "id": 5
            },
            {
              "x": 8,
              "y": 13,
              "id": 4
            },
            {
              "x": 9,
              "y": 13,
              "id": 5
            },
            {
              "x": 10,
              "y": 13,
              "id": 6
            },
            {
              "x": 11,
              "y": 13,
              "id": 5
            },
            {
              "x": 12,
              "y": 0,
              "id": 8
            },
            {
              "x": 12,
              "y": 4,
              "id": 9
            },
            {
              "x": 12,
              "y": 5,
              "id": 10
            },
            {
              "x": 12,
              "y": 6,
              "id": 10
            },
            {
              "x": 12,
              "y": 7,
              "id": 11
            },
            {
              "x": 12,
              "y": 8,
              "id": 10
            },
            {
              "x": 12,
              "y": 9,
              "id": 11
            },
            {
              "x": 12,
              "y": 10,
              "id": 11
            },
            {
              "x": 12,
              "y": 11,
              "id": 10
            },
            {
              "x": 12,
              "y": 12,
              "id": 11
            },
            {
              "x": 12,
              "y": 13,
              "id": 10
            },
            {
              "x": 13,
              "y": 0,
              "id": 12
            },
            {
              "x": 13,
              "y": 4,
              "id": 13
            },
            {
              "x": 13,
              "y": 5,
              "id": 2
            },
            {
              "x": 13,
              "y": 6,
              "id": 2
            },
            {
              "x": 13,
              "y": 7,
              "id": 2
            },
            {
              "x": 13,
              "y": 8,
              "id": 2
            },
            {
              "x": 13,
              "y": 9,
              "id": 2
            },
            {
              "x": 13,
              "y": 10,
              "id": 2
            },
            {
              "x": 13,
              "y": 11,
              "id": 2
            },
            {
              "x": 13,
              "y": 12,
              "id": 2
            },
            {
              "x": 13,
              "y": 13,
              "id": 2
            },
            {
              "x": 14,
              "y": 0,
              "id": 12
            },
            {
              "x": 14,
              "y": 4,
              "id": 13
            },
            {
              "x": 14,
              "y": 5,
              "id": 2
            },
            {
              "x": 14,
              "y": 6,
              "id": 2
            },
            {
              "x": 14,
              "y": 7,
              "id": 2
            },
            {
              "x": 14,
              "y": 8,
              "id": 2
            },
            {
              "x": 14,
              "y": 9,
              "id": 2
            },
            {
              "x": 14,
              "y": 10,
              "id": 2
            },
            {
              "x": 14,
              "y": 11,
              "id": 2
            },
            {
              "x": 14,
              "y": 12,
              "id": 2
            },
            {
              "x": 14,
              "y": 13,
              "id": 2
            },
            {
              "x": 15,
              "y": 0,
              "id": 14
            },
            {
              "x": 15,
              "y": 4,
              "id": 15
            },
            {
              "x": 15,
              "y": 5,
              "id": 16
            },
            {
              "x": 15,
              "y": 6,
              "id": 16
            },
            {
              "x": 15,
              "y": 7,
              "id": 16
            },
            {
              "x": 15,
              "y": 8,
              "id": 16
            },
            {
              "x": 15,
              "y": 9,
              "id": 16
            },
            {
              "x": 15,
              "y": 10,
              "id": 16
            },
            {
              "x": 15,
              "y": 11,
              "id": 16
            },
            {
              "x": 15,
              "y": 12,
              "id": 16
            },
            {
              "x": 15,
              "y": 13,
              "id": 17
            },
            {
              "x": 16,
              "y": 13,
              "id": 5
            },
            {
              "x": 17,
              "y": 13,
              "id": 6
            },
            {
              "x": 18,
              "y": 13,
              "id": 5
            },
            {
              "x": 19,
              "y": 13,
              "id": 4
            },
            {
              "x": 20,
              "y": 13,
              "id": 5
            },
            {
              "x": 21,
              "y": 13,
              "id": 7
            },
            {
              "x": 22,
              "y": 13,
              "id": 5
            },
            {
              "x": 23,
              "y": 13,
              "id": 4
            },
            {
              "x": 24,
              "y": 13,
              "id": 5
            },
            {
              "x": 25,
              "y": 0,
              "id": 18
            },
            {
              "x": 25,
              "y": 13,
              "id": 6
            },
            {
              "x": 26,
              "y": 13,
              "id": 5
            },
            {
              "x": 27,
              "y": 0,
              "id": 19
            },
            {
              "x": 27,
              "y": 13,
              "id": 4
            },
            {
              "x": 28,
              "y": 13,
              "id": 5
            },
            {
              "x": 29,
              "y": 1,
              "id": 3
            },
            {
              "x": 29,
              "y": 2,
              "id": 3
            },
            {
              "x": 29,
              "y": 3,
              "id": 3
            },
            {
              "x": 29,
              "y": 4,
              "id": 3
            },
            {
              "x": 29,
              "y": 5,
              "id": 3
            },
            {
              "x": 29,
              "y": 6,
              "id": 3
            },
            {
              "x": 29,
              "y": 7,
              "id": 3
            },
            {
              "x": 29,
              "y": 8,
              "id": 3
            },
            {
              "x": 29,
              "y": 9,
              "id": 3
            },
            {
              "x": 29,
              "y": 10,
              "id": 3
            },
            {
              "x": 29,
              "y": 11,
              "id": 3
            },
            {
              "x": 29,
              "y": 12,
              "id": 3
            },
            {
              "x": 29,
              "y": 13,
              "id": 7
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 20
            },
            {
              "x": 0,
              "y": 1,
              "id": 21
            },
            {
              "x": 0,
              "y": 2,
              "id": 21
            },
            {
              "x": 0,
              "y": 3,
              "id": 21
            },
            {
              "x": 0,
              "y": 4,
              "id": 21
            },
            {
              "x": 0,
              "y": 10,
              "id": 21
            },
            {
              "x": 0,
              "y": 11,
              "id": 21
            },
            {
              "x": 0,
              "y": 13,
              "id": 22
            },
            {
              "x": 1,
              "y": 0,
              "id": 23
            },
            {
              "x": 1,
              "y": 13,
              "id": 24
            },
            {
              "x": 2,
              "y": 0,
              "id": 23
            },
            {
              "x": 2,
              "y": 4,
              "id": 7
            },
            {
              "x": 2,
              "y": 6,
              "id": 25
            },
            {
              "x": 2,
              "y": 10,
              "id": 26
            },
            {
              "x": 2,
              "y": 13,
              "id": 22
            },
            {
              "x": 3,
              "y": 0,
              "id": 23
            },
            {
              "x": 3,
              "y": 2,
              "id": 27
            },
            {
              "x": 3,
              "y": 6,
              "id": 28
            },
            {
              "x": 3,
              "y": 11,
              "id": 29
            },
            {
              "x": 3,
              "y": 13,
              "id": 24
            },
            {
              "x": 4,
              "y": 0,
              "id": 23
            },
            {
              "x": 4,
              "y": 7,
              "id": 26
            },
            {
              "x": 4,
              "y": 13,
              "id": 22
            },
            {
              "x": 5,
              "y": 0,
              "id": 23
            },
            {
              "x": 5,
              "y": 10,
              "id": 30
            },
            {
              "x": 5,
              "y": 13,
              "id": 24
            },
            {
              "x": 6,
              "y": 0,
              "id": 23
            },
            {
              "x": 6,
              "y": 6,
              "id": 29
            },
            {
              "x": 6,
              "y": 8,
              "id": 25
            },
            {
              "x": 6,
              "y": 11,
              "id": 28
            },
            {
              "x": 6,
              "y": 13,
              "id": 22
            },
            {
              "x": 7,
              "y": 0,
              "id": 23
            },
            {
              "x": 7,
              "y": 13,
              "id": 24
            },
            {
              "x": 8,
              "y": 0,
              "id": 23
            },
            {
              "x": 8,
              "y": 6,
              "id": 31
            },
            {
              "x": 8,
              "y": 13,
              "id": 22
            },
            {
              "x": 9,
              "y": 0,
              "id": 23
            },
            {
              "x": 9,
              "y": 2,
              "id": 25
            },
            {
              "x": 9,
              "y": 4,
              "id": 32
            },
            {
              "x": 9,
              "y": 13,
              "id": 24
            },
            {
              "x": 10,
              "y": 0,
              "id": 33
            },
            {
              "x": 10,
              "y": 13,
              "id": 22
            },
            {
              "x": 11,
              "y": 0,
              "id": 34
            },
            {
              "x": 11,
              "y": 13,
              "id": 24
            },
            {
              "x": 12,
              "y": 13,
              "id": 35
            },
            {
              "x": 15,
              "y": 13,
              "id": 36
            },
            {
              "x": 16,
              "y": 0,
              "id": 20
            },
            {
              "x": 16,
              "y": 13,
              "id": 22
            },
            {
              "x": 17,
              "y": 0,
              "id": 33
            },
            {
              "x": 17,
              "y": 13,
              "id": 24
            },
            {
              "x": 18,
              "y": 0,
              "id": 33
            },
            {
              "x": 18,
              "y": 6,
              "id": 37
            },
            {
              "x": 18,
              "y": 12,
              "id": 37
            },
            {
              "x": 18,
              "y": 13,
              "id": 22
            },
            {
              "x": 19,
              "y": 0,
              "id": 33
            },
            {
              "x": 19,
              "y": 4,
              "id": 38
            },
            {
              "x": 19,
              "y": 7,
              "id": 39
            },
            {
              "x": 19,
              "y": 9,
              "id": 40
            },
            {
              "x": 19,
              "y": 13,
              "id": 24
            },
            {
              "x": 20,
              "y": 0,
              "id": 33
            },
            {
              "x": 20,
              "y": 8,
              "id": 28
            },
            {
              "x": 20,
              "y": 13,
              "id": 22
            },
            {
              "x": 21,
              "y": 0,
              "id": 33
            },
            {
              "x": 21,
              "y": 6,
              "id": 38
            },
            {
              "x": 21,
              "y": 10,
              "id": 26
            },
            {
              "x": 21,
              "y": 12,
              "id": 38
            },
            {
              "x": 21,
              "y": 13,
              "id": 24
            },
            {
              "x": 22,
              "y": 0,
              "id": 33
            },
            {
              "x": 22,
              "y": 13,
              "id": 22
            },
            {
              "x": 23,
              "y": 0,
              "id": 33
            },
            {
              "x": 23,
              "y": 3,
              "id": 40
            },
            {
              "x": 23,
              "y": 13,
              "id": 24
            },
            {
              "x": 24,
              "y": 0,
              "id": 33
            },
            {
              "x": 24,
              "y": 5,
              "id": 41
            },
            {
              "x": 24,
              "y": 13,
              "id": 22
            },
            {
              "x": 25,
              "y": 0,
              "id": 33
            },
            {
              "x": 25,
              "y": 3,
              "id": 26
            },
            {
              "x": 25,
              "y": 13,
              "id": 24
            },
            {
              "x": 26,
              "y": 0,
              "id": 33
            },
            {
              "x": 26,
              "y": 6,
              "id": 40
            },
            {
              "x": 26,
              "y": 11,
              "id": 38
            },
            {
              "x": 26,
              "y": 13,
              "id": 22
            },
            {
              "x": 27,
              "y": 0,
              "id": 33
            },
            {
              "x": 27,
              "y": 10,
              "id": 7
            },
            {
              "x": 27,
              "y": 13,
              "id": 24
            },
            {
              "x": 28,
              "y": 0,
              "id": 33
            },
            {
              "x": 28,
              "y": 4,
              "id": 42
            },
            {
              "x": 28,
              "y": 13,
              "id": 22
            },
            {
              "x": 29,
              "y": 0,
              "id": 34
            },
            {
              "x": 29,
              "y": 1,
              "id": 21
            },
            {
              "x": 29,
              "y": 2,
              "id": 21
            },
            {
              "x": 29,
              "y": 3,
              "id": 21
            },
            {
              "x": 29,
              "y": 4,
              "id": 21
            },
            {
              "x": 29,
              "y": 5,
              "id": 21
            },
            {
              "x": 29,
              "y": 6,
              "id": 21
            },
            {
              "x": 29,
              "y": 7,
              "id": 21
            },
            {
              "x": 29,
              "y": 8,
              "id": 21
            },
            {
              "x": 29,
              "y": 9,
              "id": 21
            },
            {
              "x": 29,
              "y": 10,
              "id": 21
            },
            {
              "x": 29,
              "y": 11,
              "id": 21
            },
            {
              "x": 29,
              "y": 13,
              "id": 24
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 0,
              "y": 13,
              "id": 43
            },
            {
              "x": 5,
              "y": 3,
              "id": 44
            },
            {
              "x": 5,
              "y": 4,
              "id": 45
            },
            {
              "x": 6,
              "y": 3,
              "id": 46
            },
            {
              "x": 6,
              "y": 4,
              "id": 47
            },
            {
              "x": 8,
              "y": 10,
              "id": 48
            },
            {
              "x": 11,
              "y": 13,
              "id": 49
            },
            {
              "x": 16,
              "y": 13,
              "id": 49
            },
            {
              "x": 22,
              "y": 4,
              "id": 48
            },
            {
              "x": 23,
              "y": 8,
              "id": 44
            },
            {
              "x": 23,
              "y": 9,
              "id": 45
            },
            {
              "x": 24,
              "y": 8,
              "id": 46
            },
            {
              "x": 24,
              "y": 9,
              "id": 47
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": []
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 21
            },
            {
              "x": 0,
              "y": 9,
              "id": 21
            },
            {
              "x": 5,
              "y": 2,
              "id": 50
            },
            {
              "x": 6,
              "y": 2,
              "id": 51
            },
            {
              "x": 10,
              "y": 0,
              "id": 52
            },
            {
              "x": 10,
              "y": 1,
              "id": 53
            },
            {
              "x": 17,
              "y": 0,
              "id": 52
            },
            {
              "x": 17,
              "y": 1,
              "id": 53
            },
            {
              "x": 23,
              "y": 7,
              "id": 50
            },
            {
              "x": 24,
              "y": 7,
              "id": 51
            },
            {
              "x": 29,
              "y": 0,
              "id": 21
            }
          ]
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 54
            },
            {
              "x": 0,
              "y": 1,
              "id": 54
            },
            {
              "x": 0,
              "y": 2,
              "id": 54
            },
            {
              "x": 0,
              "y": 3,
              "id": 54
            },
            {
              "x": 0,
              "y": 4,
              "id": 54
            },
            {
              "x": 0,
              "y": 5,
              "id": 54
            },
            {
              "x": 0,
              "y": 9,
              "id": 54
            },
            {
              "x": 0,
              "y": 10,
              "id": 54
            },
            {
              "x": 0,
              "y": 11,
              "id": 54
            },
            {
              "x": 0,
              "y": 12,
              "id": 54
            },
            {
              "x": 0,
              "y": 13,
              "id": 54
            },
            {
              "x": 1,
              "y": 0,
              "id": 54
            },
            {
              "x": 1,
              "y": 13,
              "id": 54
            },
            {
              "x": 2,
              "y": 0,
              "id": 54
            },
            {
              "x": 2,
              "y": 13,
              "id": 54
            },
            {
              "x": 3,
              "y": 0,
              "id": 54
            },
            {
              "x": 3,
              "y": 2,
              "id": 54
            },
            {
              "x": 3,
              "y": 13,
              "id": 54
            },
            {
              "x": 4,
              "y": 0,
              "id": 54
            },
            {
              "x": 4,
              "y": 13,
              "id": 54
            },
            {
              "x": 5,
              "y": 0,
              "id": 54
            },
            {
              "x": 5,
              "y": 3,
              "id": 54
            },
            {
              "x": 5,
              "y": 4,
              "id": 54
            },
            {
              "x": 5,
              "y": 13,
              "id": 54
            },
            {
              "x": 6,
              "y": 0,
              "id": 54
            },
            {
              "x": 6,
              "y": 3,
              "id": 54
            },
            {
              "x": 6,
              "y": 4,
              "id": 54
            },
            {
              "x": 6,
              "y": 13,
              "id": 54
            },
            {
              "x": 7,
              "y": 0,
              "id": 54
            },
            {
              "x": 7,
              "y": 13,
              "id": 54
            },
            {
              "x": 8,
              "y": 0,
              "id": 54
            },
            {
              "x": 8,
              "y": 13,
              "id": 54
            },
            {
              "x": 9,
              "y": 0,
              "id": 54
            },
            {
              "x": 9,
              "y": 13,
              "id": 54
            },
            {
              "x": 10,
              "y": 0,
              "id": 54
            },
            {
              "x": 10,
              "y": 1,
              "id": 54
            },
            {
              "x": 10,
              "y": 13,
              "id": 54
            },
            {
              "x": 11,
              "y": 0,
              "id": 54
            },
            {
              "x": 11,
              "y": 13,
              "id": 54
            },
            {
              "x": 16,
              "y": 0,
              "id": 54
            },
            {
              "x": 16,
              "y": 13,
              "id": 54
            },
            {
              "x": 17,
              "y": 0,
              "id": 54
            },
            {
              "x": 17,
              "y": 1,
              "id": 54
            },
            {
              "x": 17,
              "y": 13,
              "id": 54
            },
            {
              "x": 18,
              "y": 0,
              "id": 54
            },
            {
              "x": 18,
              "y": 13,
              "id": 54
            },
            {
              "x": 19,
              "y": 0,
              "id": 54
            },
            {
              "x": 19,
              "y": 13,
              "id": 54
            },
            {
              "x": 20,
              "y": 0,
              "id": 54
            },
            {
              "x": 20,
              "y": 13,
              "id": 54
            },
            {
              "x": 21,
              "y": 0,
              "id": 54
            },
            {
              "x": 21,
              "y": 13,
              "id": 54
            },
            {
              "x": 22,
              "y": 0,
              "id": 54
            },
            {
              "x": 22,
              "y": 13,
              "id": 54
            },
            {
              "x": 23,
              "y": 0,
              "id": 54
            },
            {
              "x": 23,
              "y": 8,
              "id": 54
            },
            {
              "x": 23,
              "y": 9,
              "id": 54
            },
            {
              "x": 23,
              "y": 13,
              "id": 54
            },
            {
              "x": 24,
              "y": 0,
              "id": 54
            },
            {
              "x": 24,
              "y": 8,
              "id": 54
            },
            {
              "x": 24,
              "y": 9,
              "id": 54
            },
            {
              "x": 24,
              "y": 13,
              "id": 54
            },
            {
              "x": 25,
              "y": 0,
              "id": 54
            },
            {
              "x": 25,
              "y": 13,
              "id": 54
            },
            {
              "x": 26,
              "y": 0,
              "id": 54
            },
            {
              "x": 26,
              "y": 13,
              "id": 54
            },
            {
              "x": 27,
              "y": 0,
              "id": 54
            },
            {
              "x": 27,
              "y": 13,
              "id": 54
            },
            {
              "x": 28,
              "y": 0,
              "id": 54
            },
            {
              "x": 28,
              "y": 13,
              "id": 54
            },
            {
              "x": 29,
              "y": 0,
              "id": 54
            },
            {
              "x": 29,
              "y": 1,
              "id": 54
            },
            {
              "x": 29,
              "y": 2,
              "id": 54
            },
            {
              "x": 29,
              "y": 3,
              "id": 54
            },
            {
              "x": 29,
              "y": 4,
              "id": 54
            },
            {
              "x": 29,
              "y": 5,
              "id": 54
            },
            {
              "x": 29,
              "y": 6,
              "id": 54
            },
            {
              "x": 29,
              "y": 7,
              "id": 54
            },
            {
              "x": 29,
              "y": 8,
              "id": 54
            },
            {
              "x": 29,
              "y": 9,
              "id": 54
            },
            {
              "x": 29,
              "y": 10,
              "id": 54
            },
            {
              "x": 29,
              "y": 11,
              "id": 54
            },
            {
              "x": 29,
              "y": 12,
              "id": 54
            },
            {
              "x": 29,
              "y": 13,
              "id": 54
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - top half",
          "positions": [],
          "collision": {
            "type": "top-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    },
    "route-3": {
      "id": "route-3",
      "name": "Route 3",
      "kind": "town",
      "safezone": false,
      "tileSize": 128,
      "mapWidth": 21,
      "mapHeight": 66,
      "image": "assets/Maps/Route 3/Route 3.png",
      "layers": [
        {
          "name": "Ground Layer",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 0
            },
            {
              "x": 0,
              "y": 1,
              "id": 0
            },
            {
              "x": 0,
              "y": 2,
              "id": 0
            },
            {
              "x": 0,
              "y": 3,
              "id": 0
            },
            {
              "x": 0,
              "y": 4,
              "id": 0
            },
            {
              "x": 0,
              "y": 5,
              "id": 0
            },
            {
              "x": 0,
              "y": 6,
              "id": 0
            },
            {
              "x": 0,
              "y": 7,
              "id": 1
            },
            {
              "x": 0,
              "y": 31,
              "id": 1
            },
            {
              "x": 0,
              "y": 32,
              "id": 1
            },
            {
              "x": 0,
              "y": 33,
              "id": 1
            },
            {
              "x": 0,
              "y": 34,
              "id": 1
            },
            {
              "x": 0,
              "y": 35,
              "id": 1
            },
            {
              "x": 0,
              "y": 36,
              "id": 1
            },
            {
              "x": 1,
              "y": 0,
              "id": 1
            },
            {
              "x": 1,
              "y": 1,
              "id": 1
            },
            {
              "x": 1,
              "y": 2,
              "id": 1
            },
            {
              "x": 1,
              "y": 3,
              "id": 1
            },
            {
              "x": 1,
              "y": 4,
              "id": 0
            },
            {
              "x": 1,
              "y": 5,
              "id": 0
            },
            {
              "x": 1,
              "y": 6,
              "id": 0
            },
            {
              "x": 1,
              "y": 7,
              "id": 1
            },
            {
              "x": 1,
              "y": 31,
              "id": 1
            },
            {
              "x": 1,
              "y": 32,
              "id": 1
            },
            {
              "x": 1,
              "y": 33,
              "id": 1
            },
            {
              "x": 1,
              "y": 34,
              "id": 1
            },
            {
              "x": 1,
              "y": 35,
              "id": 1
            },
            {
              "x": 1,
              "y": 36,
              "id": 1
            },
            {
              "x": 2,
              "y": 0,
              "id": 1
            },
            {
              "x": 2,
              "y": 1,
              "id": 1
            },
            {
              "x": 2,
              "y": 2,
              "id": 1
            },
            {
              "x": 2,
              "y": 3,
              "id": 1
            },
            {
              "x": 2,
              "y": 4,
              "id": 0
            },
            {
              "x": 2,
              "y": 5,
              "id": 0
            },
            {
              "x": 2,
              "y": 6,
              "id": 0
            },
            {
              "x": 2,
              "y": 7,
              "id": 1
            },
            {
              "x": 2,
              "y": 31,
              "id": 1
            },
            {
              "x": 2,
              "y": 32,
              "id": 1
            },
            {
              "x": 2,
              "y": 33,
              "id": 0
            },
            {
              "x": 2,
              "y": 34,
              "id": 0
            },
            {
              "x": 2,
              "y": 35,
              "id": 1
            },
            {
              "x": 2,
              "y": 36,
              "id": 1
            },
            {
              "x": 3,
              "y": 0,
              "id": 1
            },
            {
              "x": 3,
              "y": 1,
              "id": 1
            },
            {
              "x": 3,
              "y": 2,
              "id": 1
            },
            {
              "x": 3,
              "y": 3,
              "id": 1
            },
            {
              "x": 3,
              "y": 4,
              "id": 0
            },
            {
              "x": 3,
              "y": 5,
              "id": 0
            },
            {
              "x": 3,
              "y": 6,
              "id": 0
            },
            {
              "x": 3,
              "y": 7,
              "id": 1
            },
            {
              "x": 3,
              "y": 31,
              "id": 1
            },
            {
              "x": 3,
              "y": 32,
              "id": 1
            },
            {
              "x": 3,
              "y": 33,
              "id": 0
            },
            {
              "x": 3,
              "y": 34,
              "id": 0
            },
            {
              "x": 3,
              "y": 35,
              "id": 1
            },
            {
              "x": 3,
              "y": 36,
              "id": 1
            },
            {
              "x": 3,
              "y": 37,
              "id": 1
            },
            {
              "x": 3,
              "y": 38,
              "id": 1
            },
            {
              "x": 3,
              "y": 39,
              "id": 1
            },
            {
              "x": 3,
              "y": 40,
              "id": 1
            },
            {
              "x": 3,
              "y": 41,
              "id": 1
            },
            {
              "x": 3,
              "y": 42,
              "id": 1
            },
            {
              "x": 3,
              "y": 43,
              "id": 1
            },
            {
              "x": 3,
              "y": 44,
              "id": 1
            },
            {
              "x": 3,
              "y": 45,
              "id": 1
            },
            {
              "x": 3,
              "y": 46,
              "id": 1
            },
            {
              "x": 3,
              "y": 47,
              "id": 1
            },
            {
              "x": 3,
              "y": 48,
              "id": 1
            },
            {
              "x": 3,
              "y": 49,
              "id": 1
            },
            {
              "x": 3,
              "y": 50,
              "id": 1
            },
            {
              "x": 3,
              "y": 51,
              "id": 1
            },
            {
              "x": 3,
              "y": 52,
              "id": 1
            },
            {
              "x": 3,
              "y": 53,
              "id": 1
            },
            {
              "x": 3,
              "y": 54,
              "id": 1
            },
            {
              "x": 3,
              "y": 55,
              "id": 1
            },
            {
              "x": 3,
              "y": 56,
              "id": 1
            },
            {
              "x": 3,
              "y": 57,
              "id": 2
            },
            {
              "x": 3,
              "y": 58,
              "id": 3
            },
            {
              "x": 3,
              "y": 59,
              "id": 3
            },
            {
              "x": 3,
              "y": 60,
              "id": 3
            },
            {
              "x": 3,
              "y": 61,
              "id": 3
            },
            {
              "x": 3,
              "y": 62,
              "id": 3
            },
            {
              "x": 3,
              "y": 63,
              "id": 3
            },
            {
              "x": 3,
              "y": 64,
              "id": 3
            },
            {
              "x": 3,
              "y": 65,
              "id": 3
            },
            {
              "x": 4,
              "y": 0,
              "id": 1
            },
            {
              "x": 4,
              "y": 1,
              "id": 1
            },
            {
              "x": 4,
              "y": 2,
              "id": 1
            },
            {
              "x": 4,
              "y": 3,
              "id": 1
            },
            {
              "x": 4,
              "y": 4,
              "id": 1
            },
            {
              "x": 4,
              "y": 5,
              "id": 1
            },
            {
              "x": 4,
              "y": 6,
              "id": 1
            },
            {
              "x": 4,
              "y": 7,
              "id": 1
            },
            {
              "x": 4,
              "y": 31,
              "id": 1
            },
            {
              "x": 4,
              "y": 32,
              "id": 1
            },
            {
              "x": 4,
              "y": 33,
              "id": 0
            },
            {
              "x": 4,
              "y": 34,
              "id": 0
            },
            {
              "x": 4,
              "y": 35,
              "id": 1
            },
            {
              "x": 4,
              "y": 36,
              "id": 1
            },
            {
              "x": 4,
              "y": 37,
              "id": 1
            },
            {
              "x": 4,
              "y": 38,
              "id": 1
            },
            {
              "x": 4,
              "y": 39,
              "id": 1
            },
            {
              "x": 4,
              "y": 40,
              "id": 1
            },
            {
              "x": 4,
              "y": 41,
              "id": 1
            },
            {
              "x": 4,
              "y": 42,
              "id": 1
            },
            {
              "x": 4,
              "y": 43,
              "id": 1
            },
            {
              "x": 4,
              "y": 44,
              "id": 1
            },
            {
              "x": 4,
              "y": 45,
              "id": 1
            },
            {
              "x": 4,
              "y": 46,
              "id": 1
            },
            {
              "x": 4,
              "y": 47,
              "id": 1
            },
            {
              "x": 4,
              "y": 48,
              "id": 1
            },
            {
              "x": 4,
              "y": 49,
              "id": 1
            },
            {
              "x": 4,
              "y": 50,
              "id": 1
            },
            {
              "x": 4,
              "y": 51,
              "id": 1
            },
            {
              "x": 4,
              "y": 52,
              "id": 1
            },
            {
              "x": 4,
              "y": 53,
              "id": 1
            },
            {
              "x": 4,
              "y": 54,
              "id": 1
            },
            {
              "x": 4,
              "y": 55,
              "id": 1
            },
            {
              "x": 4,
              "y": 56,
              "id": 1
            },
            {
              "x": 4,
              "y": 57,
              "id": 4
            },
            {
              "x": 4,
              "y": 58,
              "id": 3
            },
            {
              "x": 4,
              "y": 59,
              "id": 3
            },
            {
              "x": 4,
              "y": 60,
              "id": 3
            },
            {
              "x": 4,
              "y": 61,
              "id": 3
            },
            {
              "x": 4,
              "y": 62,
              "id": 3
            },
            {
              "x": 4,
              "y": 63,
              "id": 3
            },
            {
              "x": 4,
              "y": 64,
              "id": 3
            },
            {
              "x": 4,
              "y": 65,
              "id": 3
            },
            {
              "x": 5,
              "y": 0,
              "id": 1
            },
            {
              "x": 5,
              "y": 1,
              "id": 1
            },
            {
              "x": 5,
              "y": 2,
              "id": 1
            },
            {
              "x": 5,
              "y": 3,
              "id": 1
            },
            {
              "x": 5,
              "y": 4,
              "id": 1
            },
            {
              "x": 5,
              "y": 5,
              "id": 1
            },
            {
              "x": 5,
              "y": 6,
              "id": 1
            },
            {
              "x": 5,
              "y": 7,
              "id": 1
            },
            {
              "x": 5,
              "y": 31,
              "id": 1
            },
            {
              "x": 5,
              "y": 32,
              "id": 1
            },
            {
              "x": 5,
              "y": 33,
              "id": 0
            },
            {
              "x": 5,
              "y": 34,
              "id": 0
            },
            {
              "x": 5,
              "y": 35,
              "id": 1
            },
            {
              "x": 5,
              "y": 36,
              "id": 1
            },
            {
              "x": 5,
              "y": 37,
              "id": 1
            },
            {
              "x": 5,
              "y": 38,
              "id": 1
            },
            {
              "x": 5,
              "y": 39,
              "id": 1
            },
            {
              "x": 5,
              "y": 40,
              "id": 1
            },
            {
              "x": 5,
              "y": 41,
              "id": 1
            },
            {
              "x": 5,
              "y": 42,
              "id": 1
            },
            {
              "x": 5,
              "y": 43,
              "id": 1
            },
            {
              "x": 5,
              "y": 44,
              "id": 1
            },
            {
              "x": 5,
              "y": 45,
              "id": 1
            },
            {
              "x": 5,
              "y": 46,
              "id": 1
            },
            {
              "x": 5,
              "y": 47,
              "id": 1
            },
            {
              "x": 5,
              "y": 48,
              "id": 1
            },
            {
              "x": 5,
              "y": 49,
              "id": 1
            },
            {
              "x": 5,
              "y": 50,
              "id": 1
            },
            {
              "x": 5,
              "y": 51,
              "id": 1
            },
            {
              "x": 5,
              "y": 52,
              "id": 1
            },
            {
              "x": 5,
              "y": 53,
              "id": 1
            },
            {
              "x": 5,
              "y": 54,
              "id": 1
            },
            {
              "x": 5,
              "y": 55,
              "id": 1
            },
            {
              "x": 5,
              "y": 56,
              "id": 1
            },
            {
              "x": 5,
              "y": 57,
              "id": 4
            },
            {
              "x": 5,
              "y": 58,
              "id": 3
            },
            {
              "x": 5,
              "y": 59,
              "id": 3
            },
            {
              "x": 5,
              "y": 60,
              "id": 3
            },
            {
              "x": 5,
              "y": 61,
              "id": 3
            },
            {
              "x": 5,
              "y": 62,
              "id": 3
            },
            {
              "x": 5,
              "y": 63,
              "id": 3
            },
            {
              "x": 5,
              "y": 64,
              "id": 3
            },
            {
              "x": 5,
              "y": 65,
              "id": 3
            },
            {
              "x": 6,
              "y": 0,
              "id": 1
            },
            {
              "x": 6,
              "y": 1,
              "id": 1
            },
            {
              "x": 6,
              "y": 2,
              "id": 1
            },
            {
              "x": 6,
              "y": 3,
              "id": 1
            },
            {
              "x": 6,
              "y": 4,
              "id": 1
            },
            {
              "x": 6,
              "y": 5,
              "id": 1
            },
            {
              "x": 6,
              "y": 6,
              "id": 1
            },
            {
              "x": 6,
              "y": 7,
              "id": 1
            },
            {
              "x": 6,
              "y": 31,
              "id": 1
            },
            {
              "x": 6,
              "y": 32,
              "id": 1
            },
            {
              "x": 6,
              "y": 33,
              "id": 0
            },
            {
              "x": 6,
              "y": 34,
              "id": 0
            },
            {
              "x": 6,
              "y": 35,
              "id": 1
            },
            {
              "x": 6,
              "y": 36,
              "id": 1
            },
            {
              "x": 6,
              "y": 37,
              "id": 1
            },
            {
              "x": 6,
              "y": 38,
              "id": 1
            },
            {
              "x": 6,
              "y": 39,
              "id": 1
            },
            {
              "x": 6,
              "y": 40,
              "id": 1
            },
            {
              "x": 6,
              "y": 41,
              "id": 1
            },
            {
              "x": 6,
              "y": 42,
              "id": 1
            },
            {
              "x": 6,
              "y": 43,
              "id": 1
            },
            {
              "x": 6,
              "y": 44,
              "id": 1
            },
            {
              "x": 6,
              "y": 45,
              "id": 1
            },
            {
              "x": 6,
              "y": 46,
              "id": 1
            },
            {
              "x": 6,
              "y": 47,
              "id": 1
            },
            {
              "x": 6,
              "y": 48,
              "id": 1
            },
            {
              "x": 6,
              "y": 49,
              "id": 1
            },
            {
              "x": 6,
              "y": 50,
              "id": 1
            },
            {
              "x": 6,
              "y": 51,
              "id": 1
            },
            {
              "x": 6,
              "y": 52,
              "id": 1
            },
            {
              "x": 6,
              "y": 53,
              "id": 1
            },
            {
              "x": 6,
              "y": 54,
              "id": 1
            },
            {
              "x": 6,
              "y": 55,
              "id": 1
            },
            {
              "x": 6,
              "y": 56,
              "id": 1
            },
            {
              "x": 6,
              "y": 57,
              "id": 2
            },
            {
              "x": 6,
              "y": 58,
              "id": 3
            },
            {
              "x": 6,
              "y": 59,
              "id": 3
            },
            {
              "x": 6,
              "y": 60,
              "id": 3
            },
            {
              "x": 6,
              "y": 61,
              "id": 3
            },
            {
              "x": 6,
              "y": 62,
              "id": 3
            },
            {
              "x": 6,
              "y": 63,
              "id": 3
            },
            {
              "x": 6,
              "y": 64,
              "id": 3
            },
            {
              "x": 6,
              "y": 65,
              "id": 3
            },
            {
              "x": 7,
              "y": 0,
              "id": 1
            },
            {
              "x": 7,
              "y": 1,
              "id": 1
            },
            {
              "x": 7,
              "y": 2,
              "id": 1
            },
            {
              "x": 7,
              "y": 3,
              "id": 1
            },
            {
              "x": 7,
              "y": 4,
              "id": 1
            },
            {
              "x": 7,
              "y": 5,
              "id": 1
            },
            {
              "x": 7,
              "y": 6,
              "id": 1
            },
            {
              "x": 7,
              "y": 7,
              "id": 1
            },
            {
              "x": 7,
              "y": 8,
              "id": 1
            },
            {
              "x": 7,
              "y": 9,
              "id": 1
            },
            {
              "x": 7,
              "y": 10,
              "id": 1
            },
            {
              "x": 7,
              "y": 11,
              "id": 1
            },
            {
              "x": 7,
              "y": 12,
              "id": 1
            },
            {
              "x": 7,
              "y": 13,
              "id": 1
            },
            {
              "x": 7,
              "y": 14,
              "id": 1
            },
            {
              "x": 7,
              "y": 15,
              "id": 1
            },
            {
              "x": 7,
              "y": 16,
              "id": 1
            },
            {
              "x": 7,
              "y": 17,
              "id": 1
            },
            {
              "x": 7,
              "y": 18,
              "id": 1
            },
            {
              "x": 7,
              "y": 19,
              "id": 1
            },
            {
              "x": 7,
              "y": 20,
              "id": 1
            },
            {
              "x": 7,
              "y": 21,
              "id": 1
            },
            {
              "x": 7,
              "y": 22,
              "id": 1
            },
            {
              "x": 7,
              "y": 23,
              "id": 1
            },
            {
              "x": 7,
              "y": 24,
              "id": 1
            },
            {
              "x": 7,
              "y": 25,
              "id": 1
            },
            {
              "x": 7,
              "y": 26,
              "id": 1
            },
            {
              "x": 7,
              "y": 27,
              "id": 1
            },
            {
              "x": 7,
              "y": 28,
              "id": 1
            },
            {
              "x": 7,
              "y": 29,
              "id": 1
            },
            {
              "x": 7,
              "y": 30,
              "id": 1
            },
            {
              "x": 7,
              "y": 31,
              "id": 1
            },
            {
              "x": 7,
              "y": 32,
              "id": 1
            },
            {
              "x": 7,
              "y": 33,
              "id": 0
            },
            {
              "x": 7,
              "y": 34,
              "id": 0
            },
            {
              "x": 7,
              "y": 35,
              "id": 1
            },
            {
              "x": 7,
              "y": 36,
              "id": 1
            },
            {
              "x": 7,
              "y": 37,
              "id": 1
            },
            {
              "x": 7,
              "y": 38,
              "id": 1
            },
            {
              "x": 7,
              "y": 39,
              "id": 1
            },
            {
              "x": 7,
              "y": 40,
              "id": 1
            },
            {
              "x": 7,
              "y": 41,
              "id": 1
            },
            {
              "x": 7,
              "y": 42,
              "id": 1
            },
            {
              "x": 7,
              "y": 43,
              "id": 1
            },
            {
              "x": 7,
              "y": 44,
              "id": 1
            },
            {
              "x": 7,
              "y": 45,
              "id": 1
            },
            {
              "x": 7,
              "y": 46,
              "id": 1
            },
            {
              "x": 7,
              "y": 47,
              "id": 1
            },
            {
              "x": 7,
              "y": 48,
              "id": 1
            },
            {
              "x": 7,
              "y": 49,
              "id": 1
            },
            {
              "x": 7,
              "y": 50,
              "id": 1
            },
            {
              "x": 7,
              "y": 51,
              "id": 1
            },
            {
              "x": 7,
              "y": 52,
              "id": 1
            },
            {
              "x": 7,
              "y": 53,
              "id": 1
            },
            {
              "x": 7,
              "y": 54,
              "id": 1
            },
            {
              "x": 7,
              "y": 55,
              "id": 1
            },
            {
              "x": 7,
              "y": 56,
              "id": 1
            },
            {
              "x": 7,
              "y": 57,
              "id": 2
            },
            {
              "x": 7,
              "y": 58,
              "id": 3
            },
            {
              "x": 7,
              "y": 59,
              "id": 3
            },
            {
              "x": 7,
              "y": 60,
              "id": 3
            },
            {
              "x": 7,
              "y": 61,
              "id": 3
            },
            {
              "x": 7,
              "y": 62,
              "id": 3
            },
            {
              "x": 7,
              "y": 63,
              "id": 3
            },
            {
              "x": 7,
              "y": 64,
              "id": 3
            },
            {
              "x": 7,
              "y": 65,
              "id": 3
            },
            {
              "x": 8,
              "y": 0,
              "id": 1
            },
            {
              "x": 8,
              "y": 1,
              "id": 1
            },
            {
              "x": 8,
              "y": 2,
              "id": 1
            },
            {
              "x": 8,
              "y": 3,
              "id": 1
            },
            {
              "x": 8,
              "y": 4,
              "id": 1
            },
            {
              "x": 8,
              "y": 5,
              "id": 1
            },
            {
              "x": 8,
              "y": 6,
              "id": 1
            },
            {
              "x": 8,
              "y": 7,
              "id": 1
            },
            {
              "x": 8,
              "y": 8,
              "id": 1
            },
            {
              "x": 8,
              "y": 9,
              "id": 1
            },
            {
              "x": 8,
              "y": 10,
              "id": 1
            },
            {
              "x": 8,
              "y": 11,
              "id": 1
            },
            {
              "x": 8,
              "y": 12,
              "id": 1
            },
            {
              "x": 8,
              "y": 13,
              "id": 1
            },
            {
              "x": 8,
              "y": 14,
              "id": 1
            },
            {
              "x": 8,
              "y": 15,
              "id": 1
            },
            {
              "x": 8,
              "y": 16,
              "id": 1
            },
            {
              "x": 8,
              "y": 17,
              "id": 1
            },
            {
              "x": 8,
              "y": 18,
              "id": 1
            },
            {
              "x": 8,
              "y": 19,
              "id": 1
            },
            {
              "x": 8,
              "y": 20,
              "id": 1
            },
            {
              "x": 8,
              "y": 21,
              "id": 1
            },
            {
              "x": 8,
              "y": 22,
              "id": 1
            },
            {
              "x": 8,
              "y": 23,
              "id": 1
            },
            {
              "x": 8,
              "y": 24,
              "id": 1
            },
            {
              "x": 8,
              "y": 25,
              "id": 1
            },
            {
              "x": 8,
              "y": 26,
              "id": 1
            },
            {
              "x": 8,
              "y": 27,
              "id": 1
            },
            {
              "x": 8,
              "y": 28,
              "id": 1
            },
            {
              "x": 8,
              "y": 29,
              "id": 1
            },
            {
              "x": 8,
              "y": 30,
              "id": 1
            },
            {
              "x": 8,
              "y": 31,
              "id": 1
            },
            {
              "x": 8,
              "y": 32,
              "id": 1
            },
            {
              "x": 8,
              "y": 33,
              "id": 0
            },
            {
              "x": 8,
              "y": 34,
              "id": 0
            },
            {
              "x": 8,
              "y": 35,
              "id": 1
            },
            {
              "x": 8,
              "y": 36,
              "id": 1
            },
            {
              "x": 8,
              "y": 37,
              "id": 1
            },
            {
              "x": 8,
              "y": 38,
              "id": 1
            },
            {
              "x": 8,
              "y": 39,
              "id": 1
            },
            {
              "x": 8,
              "y": 40,
              "id": 1
            },
            {
              "x": 8,
              "y": 41,
              "id": 1
            },
            {
              "x": 8,
              "y": 42,
              "id": 1
            },
            {
              "x": 8,
              "y": 43,
              "id": 1
            },
            {
              "x": 8,
              "y": 44,
              "id": 1
            },
            {
              "x": 8,
              "y": 45,
              "id": 1
            },
            {
              "x": 8,
              "y": 46,
              "id": 1
            },
            {
              "x": 8,
              "y": 47,
              "id": 1
            },
            {
              "x": 8,
              "y": 48,
              "id": 1
            },
            {
              "x": 8,
              "y": 49,
              "id": 1
            },
            {
              "x": 8,
              "y": 50,
              "id": 1
            },
            {
              "x": 8,
              "y": 51,
              "id": 1
            },
            {
              "x": 8,
              "y": 52,
              "id": 1
            },
            {
              "x": 8,
              "y": 53,
              "id": 1
            },
            {
              "x": 8,
              "y": 54,
              "id": 1
            },
            {
              "x": 8,
              "y": 55,
              "id": 1
            },
            {
              "x": 8,
              "y": 56,
              "id": 1
            },
            {
              "x": 8,
              "y": 57,
              "id": 2
            },
            {
              "x": 8,
              "y": 58,
              "id": 3
            },
            {
              "x": 8,
              "y": 59,
              "id": 3
            },
            {
              "x": 8,
              "y": 60,
              "id": 3
            },
            {
              "x": 8,
              "y": 61,
              "id": 3
            },
            {
              "x": 8,
              "y": 62,
              "id": 3
            },
            {
              "x": 8,
              "y": 63,
              "id": 3
            },
            {
              "x": 8,
              "y": 64,
              "id": 3
            },
            {
              "x": 8,
              "y": 65,
              "id": 3
            },
            {
              "x": 9,
              "y": 0,
              "id": 1
            },
            {
              "x": 9,
              "y": 1,
              "id": 1
            },
            {
              "x": 9,
              "y": 2,
              "id": 1
            },
            {
              "x": 9,
              "y": 3,
              "id": 1
            },
            {
              "x": 9,
              "y": 4,
              "id": 1
            },
            {
              "x": 9,
              "y": 5,
              "id": 1
            },
            {
              "x": 9,
              "y": 6,
              "id": 1
            },
            {
              "x": 9,
              "y": 7,
              "id": 1
            },
            {
              "x": 9,
              "y": 8,
              "id": 1
            },
            {
              "x": 9,
              "y": 9,
              "id": 1
            },
            {
              "x": 9,
              "y": 10,
              "id": 1
            },
            {
              "x": 9,
              "y": 11,
              "id": 1
            },
            {
              "x": 9,
              "y": 12,
              "id": 1
            },
            {
              "x": 9,
              "y": 13,
              "id": 1
            },
            {
              "x": 9,
              "y": 14,
              "id": 1
            },
            {
              "x": 9,
              "y": 15,
              "id": 1
            },
            {
              "x": 9,
              "y": 16,
              "id": 1
            },
            {
              "x": 9,
              "y": 17,
              "id": 1
            },
            {
              "x": 9,
              "y": 18,
              "id": 1
            },
            {
              "x": 9,
              "y": 19,
              "id": 1
            },
            {
              "x": 9,
              "y": 20,
              "id": 1
            },
            {
              "x": 9,
              "y": 21,
              "id": 1
            },
            {
              "x": 9,
              "y": 22,
              "id": 1
            },
            {
              "x": 9,
              "y": 23,
              "id": 1
            },
            {
              "x": 9,
              "y": 24,
              "id": 1
            },
            {
              "x": 9,
              "y": 25,
              "id": 1
            },
            {
              "x": 9,
              "y": 26,
              "id": 1
            },
            {
              "x": 9,
              "y": 27,
              "id": 1
            },
            {
              "x": 9,
              "y": 28,
              "id": 1
            },
            {
              "x": 9,
              "y": 29,
              "id": 1
            },
            {
              "x": 9,
              "y": 30,
              "id": 1
            },
            {
              "x": 9,
              "y": 31,
              "id": 1
            },
            {
              "x": 9,
              "y": 32,
              "id": 1
            },
            {
              "x": 9,
              "y": 33,
              "id": 0
            },
            {
              "x": 9,
              "y": 34,
              "id": 0
            },
            {
              "x": 9,
              "y": 35,
              "id": 1
            },
            {
              "x": 9,
              "y": 36,
              "id": 1
            },
            {
              "x": 9,
              "y": 37,
              "id": 1
            },
            {
              "x": 9,
              "y": 38,
              "id": 1
            },
            {
              "x": 9,
              "y": 39,
              "id": 1
            },
            {
              "x": 9,
              "y": 40,
              "id": 1
            },
            {
              "x": 9,
              "y": 41,
              "id": 1
            },
            {
              "x": 9,
              "y": 42,
              "id": 1
            },
            {
              "x": 9,
              "y": 43,
              "id": 1
            },
            {
              "x": 9,
              "y": 44,
              "id": 1
            },
            {
              "x": 9,
              "y": 45,
              "id": 1
            },
            {
              "x": 9,
              "y": 46,
              "id": 1
            },
            {
              "x": 9,
              "y": 47,
              "id": 1
            },
            {
              "x": 9,
              "y": 48,
              "id": 1
            },
            {
              "x": 9,
              "y": 49,
              "id": 1
            },
            {
              "x": 9,
              "y": 50,
              "id": 1
            },
            {
              "x": 9,
              "y": 51,
              "id": 1
            },
            {
              "x": 9,
              "y": 52,
              "id": 1
            },
            {
              "x": 9,
              "y": 53,
              "id": 1
            },
            {
              "x": 9,
              "y": 54,
              "id": 1
            },
            {
              "x": 9,
              "y": 55,
              "id": 1
            },
            {
              "x": 9,
              "y": 56,
              "id": 1
            },
            {
              "x": 9,
              "y": 57,
              "id": 2
            },
            {
              "x": 9,
              "y": 58,
              "id": 3
            },
            {
              "x": 9,
              "y": 59,
              "id": 3
            },
            {
              "x": 9,
              "y": 60,
              "id": 3
            },
            {
              "x": 9,
              "y": 61,
              "id": 3
            },
            {
              "x": 9,
              "y": 62,
              "id": 3
            },
            {
              "x": 9,
              "y": 63,
              "id": 3
            },
            {
              "x": 9,
              "y": 64,
              "id": 3
            },
            {
              "x": 9,
              "y": 65,
              "id": 3
            },
            {
              "x": 10,
              "y": 0,
              "id": 1
            },
            {
              "x": 10,
              "y": 1,
              "id": 1
            },
            {
              "x": 10,
              "y": 2,
              "id": 1
            },
            {
              "x": 10,
              "y": 3,
              "id": 0
            },
            {
              "x": 10,
              "y": 4,
              "id": 0
            },
            {
              "x": 10,
              "y": 5,
              "id": 1
            },
            {
              "x": 10,
              "y": 6,
              "id": 1
            },
            {
              "x": 10,
              "y": 7,
              "id": 1
            },
            {
              "x": 10,
              "y": 8,
              "id": 1
            },
            {
              "x": 10,
              "y": 9,
              "id": 1
            },
            {
              "x": 10,
              "y": 10,
              "id": 1
            },
            {
              "x": 10,
              "y": 11,
              "id": 1
            },
            {
              "x": 10,
              "y": 12,
              "id": 1
            },
            {
              "x": 10,
              "y": 13,
              "id": 1
            },
            {
              "x": 10,
              "y": 14,
              "id": 1
            },
            {
              "x": 10,
              "y": 15,
              "id": 1
            },
            {
              "x": 10,
              "y": 16,
              "id": 1
            },
            {
              "x": 10,
              "y": 17,
              "id": 1
            },
            {
              "x": 10,
              "y": 18,
              "id": 1
            },
            {
              "x": 10,
              "y": 19,
              "id": 1
            },
            {
              "x": 10,
              "y": 20,
              "id": 1
            },
            {
              "x": 10,
              "y": 21,
              "id": 1
            },
            {
              "x": 10,
              "y": 22,
              "id": 1
            },
            {
              "x": 10,
              "y": 23,
              "id": 1
            },
            {
              "x": 10,
              "y": 24,
              "id": 1
            },
            {
              "x": 10,
              "y": 25,
              "id": 1
            },
            {
              "x": 10,
              "y": 26,
              "id": 1
            },
            {
              "x": 10,
              "y": 27,
              "id": 1
            },
            {
              "x": 10,
              "y": 28,
              "id": 1
            },
            {
              "x": 10,
              "y": 29,
              "id": 1
            },
            {
              "x": 10,
              "y": 30,
              "id": 1
            },
            {
              "x": 10,
              "y": 31,
              "id": 1
            },
            {
              "x": 10,
              "y": 32,
              "id": 1
            },
            {
              "x": 10,
              "y": 33,
              "id": 0
            },
            {
              "x": 10,
              "y": 34,
              "id": 0
            },
            {
              "x": 10,
              "y": 35,
              "id": 1
            },
            {
              "x": 10,
              "y": 36,
              "id": 1
            },
            {
              "x": 10,
              "y": 37,
              "id": 1
            },
            {
              "x": 10,
              "y": 38,
              "id": 1
            },
            {
              "x": 10,
              "y": 39,
              "id": 1
            },
            {
              "x": 10,
              "y": 40,
              "id": 1
            },
            {
              "x": 10,
              "y": 41,
              "id": 1
            },
            {
              "x": 10,
              "y": 42,
              "id": 1
            },
            {
              "x": 10,
              "y": 43,
              "id": 1
            },
            {
              "x": 10,
              "y": 44,
              "id": 1
            },
            {
              "x": 10,
              "y": 45,
              "id": 1
            },
            {
              "x": 10,
              "y": 46,
              "id": 1
            },
            {
              "x": 10,
              "y": 47,
              "id": 1
            },
            {
              "x": 10,
              "y": 48,
              "id": 1
            },
            {
              "x": 10,
              "y": 49,
              "id": 1
            },
            {
              "x": 10,
              "y": 50,
              "id": 1
            },
            {
              "x": 10,
              "y": 51,
              "id": 1
            },
            {
              "x": 10,
              "y": 52,
              "id": 1
            },
            {
              "x": 10,
              "y": 53,
              "id": 1
            },
            {
              "x": 10,
              "y": 54,
              "id": 1
            },
            {
              "x": 10,
              "y": 55,
              "id": 1
            },
            {
              "x": 10,
              "y": 56,
              "id": 1
            },
            {
              "x": 10,
              "y": 57,
              "id": 2
            },
            {
              "x": 10,
              "y": 58,
              "id": 3
            },
            {
              "x": 10,
              "y": 59,
              "id": 3
            },
            {
              "x": 10,
              "y": 60,
              "id": 3
            },
            {
              "x": 10,
              "y": 61,
              "id": 3
            },
            {
              "x": 10,
              "y": 62,
              "id": 3
            },
            {
              "x": 10,
              "y": 63,
              "id": 3
            },
            {
              "x": 10,
              "y": 64,
              "id": 3
            },
            {
              "x": 10,
              "y": 65,
              "id": 3
            },
            {
              "x": 11,
              "y": 0,
              "id": 1
            },
            {
              "x": 11,
              "y": 1,
              "id": 1
            },
            {
              "x": 11,
              "y": 2,
              "id": 1
            },
            {
              "x": 11,
              "y": 3,
              "id": 0
            },
            {
              "x": 11,
              "y": 4,
              "id": 0
            },
            {
              "x": 11,
              "y": 5,
              "id": 1
            },
            {
              "x": 11,
              "y": 6,
              "id": 1
            },
            {
              "x": 11,
              "y": 7,
              "id": 1
            },
            {
              "x": 11,
              "y": 8,
              "id": 1
            },
            {
              "x": 11,
              "y": 9,
              "id": 1
            },
            {
              "x": 11,
              "y": 10,
              "id": 1
            },
            {
              "x": 11,
              "y": 11,
              "id": 1
            },
            {
              "x": 11,
              "y": 12,
              "id": 1
            },
            {
              "x": 11,
              "y": 13,
              "id": 1
            },
            {
              "x": 11,
              "y": 14,
              "id": 1
            },
            {
              "x": 11,
              "y": 15,
              "id": 1
            },
            {
              "x": 11,
              "y": 16,
              "id": 1
            },
            {
              "x": 11,
              "y": 17,
              "id": 1
            },
            {
              "x": 11,
              "y": 18,
              "id": 1
            },
            {
              "x": 11,
              "y": 19,
              "id": 1
            },
            {
              "x": 11,
              "y": 20,
              "id": 1
            },
            {
              "x": 11,
              "y": 21,
              "id": 1
            },
            {
              "x": 11,
              "y": 22,
              "id": 1
            },
            {
              "x": 11,
              "y": 23,
              "id": 1
            },
            {
              "x": 11,
              "y": 24,
              "id": 1
            },
            {
              "x": 11,
              "y": 25,
              "id": 1
            },
            {
              "x": 11,
              "y": 26,
              "id": 1
            },
            {
              "x": 11,
              "y": 27,
              "id": 1
            },
            {
              "x": 11,
              "y": 28,
              "id": 1
            },
            {
              "x": 11,
              "y": 29,
              "id": 1
            },
            {
              "x": 11,
              "y": 30,
              "id": 1
            },
            {
              "x": 11,
              "y": 31,
              "id": 1
            },
            {
              "x": 11,
              "y": 32,
              "id": 1
            },
            {
              "x": 11,
              "y": 33,
              "id": 0
            },
            {
              "x": 11,
              "y": 34,
              "id": 0
            },
            {
              "x": 11,
              "y": 35,
              "id": 1
            },
            {
              "x": 11,
              "y": 36,
              "id": 1
            },
            {
              "x": 11,
              "y": 37,
              "id": 1
            },
            {
              "x": 11,
              "y": 38,
              "id": 1
            },
            {
              "x": 11,
              "y": 39,
              "id": 1
            },
            {
              "x": 11,
              "y": 40,
              "id": 1
            },
            {
              "x": 11,
              "y": 41,
              "id": 1
            },
            {
              "x": 11,
              "y": 42,
              "id": 1
            },
            {
              "x": 11,
              "y": 43,
              "id": 1
            },
            {
              "x": 11,
              "y": 44,
              "id": 1
            },
            {
              "x": 11,
              "y": 45,
              "id": 1
            },
            {
              "x": 11,
              "y": 46,
              "id": 1
            },
            {
              "x": 11,
              "y": 47,
              "id": 1
            },
            {
              "x": 11,
              "y": 48,
              "id": 1
            },
            {
              "x": 11,
              "y": 49,
              "id": 1
            },
            {
              "x": 11,
              "y": 50,
              "id": 1
            },
            {
              "x": 11,
              "y": 51,
              "id": 1
            },
            {
              "x": 11,
              "y": 52,
              "id": 1
            },
            {
              "x": 11,
              "y": 53,
              "id": 1
            },
            {
              "x": 11,
              "y": 54,
              "id": 1
            },
            {
              "x": 11,
              "y": 55,
              "id": 1
            },
            {
              "x": 11,
              "y": 56,
              "id": 1
            },
            {
              "x": 11,
              "y": 57,
              "id": 2
            },
            {
              "x": 11,
              "y": 58,
              "id": 3
            },
            {
              "x": 11,
              "y": 59,
              "id": 3
            },
            {
              "x": 11,
              "y": 60,
              "id": 3
            },
            {
              "x": 11,
              "y": 61,
              "id": 3
            },
            {
              "x": 11,
              "y": 62,
              "id": 3
            },
            {
              "x": 11,
              "y": 63,
              "id": 3
            },
            {
              "x": 11,
              "y": 64,
              "id": 3
            },
            {
              "x": 11,
              "y": 65,
              "id": 3
            },
            {
              "x": 12,
              "y": 0,
              "id": 1
            },
            {
              "x": 12,
              "y": 1,
              "id": 1
            },
            {
              "x": 12,
              "y": 2,
              "id": 1
            },
            {
              "x": 12,
              "y": 3,
              "id": 0
            },
            {
              "x": 12,
              "y": 4,
              "id": 0
            },
            {
              "x": 12,
              "y": 5,
              "id": 1
            },
            {
              "x": 12,
              "y": 6,
              "id": 1
            },
            {
              "x": 12,
              "y": 7,
              "id": 1
            },
            {
              "x": 12,
              "y": 8,
              "id": 1
            },
            {
              "x": 12,
              "y": 9,
              "id": 1
            },
            {
              "x": 12,
              "y": 10,
              "id": 1
            },
            {
              "x": 12,
              "y": 11,
              "id": 1
            },
            {
              "x": 12,
              "y": 12,
              "id": 1
            },
            {
              "x": 12,
              "y": 13,
              "id": 1
            },
            {
              "x": 12,
              "y": 14,
              "id": 1
            },
            {
              "x": 12,
              "y": 15,
              "id": 1
            },
            {
              "x": 12,
              "y": 16,
              "id": 1
            },
            {
              "x": 12,
              "y": 17,
              "id": 1
            },
            {
              "x": 12,
              "y": 18,
              "id": 1
            },
            {
              "x": 12,
              "y": 19,
              "id": 1
            },
            {
              "x": 12,
              "y": 20,
              "id": 1
            },
            {
              "x": 12,
              "y": 21,
              "id": 1
            },
            {
              "x": 12,
              "y": 22,
              "id": 0
            },
            {
              "x": 12,
              "y": 23,
              "id": 0
            },
            {
              "x": 12,
              "y": 24,
              "id": 0
            },
            {
              "x": 12,
              "y": 25,
              "id": 0
            },
            {
              "x": 12,
              "y": 26,
              "id": 0
            },
            {
              "x": 12,
              "y": 27,
              "id": 0
            },
            {
              "x": 12,
              "y": 28,
              "id": 0
            },
            {
              "x": 12,
              "y": 29,
              "id": 0
            },
            {
              "x": 12,
              "y": 30,
              "id": 0
            },
            {
              "x": 12,
              "y": 31,
              "id": 0
            },
            {
              "x": 12,
              "y": 32,
              "id": 0
            },
            {
              "x": 12,
              "y": 33,
              "id": 0
            },
            {
              "x": 12,
              "y": 34,
              "id": 0
            },
            {
              "x": 12,
              "y": 35,
              "id": 0
            },
            {
              "x": 12,
              "y": 36,
              "id": 0
            },
            {
              "x": 12,
              "y": 37,
              "id": 0
            },
            {
              "x": 12,
              "y": 38,
              "id": 0
            },
            {
              "x": 12,
              "y": 39,
              "id": 0
            },
            {
              "x": 12,
              "y": 40,
              "id": 0
            },
            {
              "x": 12,
              "y": 41,
              "id": 1
            },
            {
              "x": 12,
              "y": 42,
              "id": 1
            },
            {
              "x": 12,
              "y": 43,
              "id": 1
            },
            {
              "x": 12,
              "y": 44,
              "id": 1
            },
            {
              "x": 12,
              "y": 45,
              "id": 1
            },
            {
              "x": 12,
              "y": 46,
              "id": 1
            },
            {
              "x": 12,
              "y": 47,
              "id": 1
            },
            {
              "x": 12,
              "y": 48,
              "id": 1
            },
            {
              "x": 12,
              "y": 49,
              "id": 1
            },
            {
              "x": 12,
              "y": 50,
              "id": 1
            },
            {
              "x": 12,
              "y": 51,
              "id": 1
            },
            {
              "x": 12,
              "y": 52,
              "id": 1
            },
            {
              "x": 12,
              "y": 53,
              "id": 1
            },
            {
              "x": 12,
              "y": 54,
              "id": 1
            },
            {
              "x": 12,
              "y": 55,
              "id": 1
            },
            {
              "x": 12,
              "y": 56,
              "id": 1
            },
            {
              "x": 12,
              "y": 57,
              "id": 2
            },
            {
              "x": 12,
              "y": 58,
              "id": 3
            },
            {
              "x": 12,
              "y": 59,
              "id": 3
            },
            {
              "x": 12,
              "y": 60,
              "id": 3
            },
            {
              "x": 12,
              "y": 61,
              "id": 3
            },
            {
              "x": 12,
              "y": 62,
              "id": 3
            },
            {
              "x": 12,
              "y": 63,
              "id": 3
            },
            {
              "x": 12,
              "y": 64,
              "id": 3
            },
            {
              "x": 12,
              "y": 65,
              "id": 3
            },
            {
              "x": 13,
              "y": 0,
              "id": 1
            },
            {
              "x": 13,
              "y": 1,
              "id": 1
            },
            {
              "x": 13,
              "y": 2,
              "id": 1
            },
            {
              "x": 13,
              "y": 3,
              "id": 0
            },
            {
              "x": 13,
              "y": 4,
              "id": 0
            },
            {
              "x": 13,
              "y": 5,
              "id": 0
            },
            {
              "x": 13,
              "y": 6,
              "id": 0
            },
            {
              "x": 13,
              "y": 7,
              "id": 0
            },
            {
              "x": 13,
              "y": 8,
              "id": 0
            },
            {
              "x": 13,
              "y": 9,
              "id": 1
            },
            {
              "x": 13,
              "y": 10,
              "id": 1
            },
            {
              "x": 13,
              "y": 11,
              "id": 1
            },
            {
              "x": 13,
              "y": 12,
              "id": 1
            },
            {
              "x": 13,
              "y": 13,
              "id": 1
            },
            {
              "x": 13,
              "y": 14,
              "id": 1
            },
            {
              "x": 13,
              "y": 15,
              "id": 1
            },
            {
              "x": 13,
              "y": 16,
              "id": 1
            },
            {
              "x": 13,
              "y": 17,
              "id": 1
            },
            {
              "x": 13,
              "y": 18,
              "id": 1
            },
            {
              "x": 13,
              "y": 19,
              "id": 1
            },
            {
              "x": 13,
              "y": 20,
              "id": 1
            },
            {
              "x": 13,
              "y": 21,
              "id": 1
            },
            {
              "x": 13,
              "y": 22,
              "id": 0
            },
            {
              "x": 13,
              "y": 23,
              "id": 0
            },
            {
              "x": 13,
              "y": 24,
              "id": 0
            },
            {
              "x": 13,
              "y": 25,
              "id": 0
            },
            {
              "x": 13,
              "y": 26,
              "id": 0
            },
            {
              "x": 13,
              "y": 27,
              "id": 0
            },
            {
              "x": 13,
              "y": 28,
              "id": 0
            },
            {
              "x": 13,
              "y": 29,
              "id": 0
            },
            {
              "x": 13,
              "y": 30,
              "id": 0
            },
            {
              "x": 13,
              "y": 31,
              "id": 0
            },
            {
              "x": 13,
              "y": 32,
              "id": 0
            },
            {
              "x": 13,
              "y": 33,
              "id": 0
            },
            {
              "x": 13,
              "y": 34,
              "id": 0
            },
            {
              "x": 13,
              "y": 35,
              "id": 0
            },
            {
              "x": 13,
              "y": 36,
              "id": 0
            },
            {
              "x": 13,
              "y": 37,
              "id": 0
            },
            {
              "x": 13,
              "y": 38,
              "id": 0
            },
            {
              "x": 13,
              "y": 39,
              "id": 0
            },
            {
              "x": 13,
              "y": 40,
              "id": 0
            },
            {
              "x": 13,
              "y": 41,
              "id": 1
            },
            {
              "x": 13,
              "y": 42,
              "id": 1
            },
            {
              "x": 13,
              "y": 43,
              "id": 1
            },
            {
              "x": 13,
              "y": 44,
              "id": 1
            },
            {
              "x": 13,
              "y": 45,
              "id": 1
            },
            {
              "x": 13,
              "y": 46,
              "id": 1
            },
            {
              "x": 13,
              "y": 47,
              "id": 1
            },
            {
              "x": 13,
              "y": 48,
              "id": 1
            },
            {
              "x": 13,
              "y": 49,
              "id": 1
            },
            {
              "x": 13,
              "y": 50,
              "id": 1
            },
            {
              "x": 13,
              "y": 51,
              "id": 1
            },
            {
              "x": 13,
              "y": 52,
              "id": 1
            },
            {
              "x": 13,
              "y": 53,
              "id": 1
            },
            {
              "x": 13,
              "y": 54,
              "id": 1
            },
            {
              "x": 13,
              "y": 55,
              "id": 1
            },
            {
              "x": 13,
              "y": 56,
              "id": 1
            },
            {
              "x": 13,
              "y": 57,
              "id": 2
            },
            {
              "x": 13,
              "y": 58,
              "id": 3
            },
            {
              "x": 13,
              "y": 59,
              "id": 3
            },
            {
              "x": 13,
              "y": 60,
              "id": 3
            },
            {
              "x": 13,
              "y": 61,
              "id": 3
            },
            {
              "x": 13,
              "y": 62,
              "id": 3
            },
            {
              "x": 13,
              "y": 63,
              "id": 3
            },
            {
              "x": 13,
              "y": 64,
              "id": 3
            },
            {
              "x": 13,
              "y": 65,
              "id": 3
            },
            {
              "x": 14,
              "y": 0,
              "id": 1
            },
            {
              "x": 14,
              "y": 1,
              "id": 1
            },
            {
              "x": 14,
              "y": 2,
              "id": 1
            },
            {
              "x": 14,
              "y": 3,
              "id": 0
            },
            {
              "x": 14,
              "y": 4,
              "id": 0
            },
            {
              "x": 14,
              "y": 5,
              "id": 0
            },
            {
              "x": 14,
              "y": 6,
              "id": 0
            },
            {
              "x": 14,
              "y": 7,
              "id": 0
            },
            {
              "x": 14,
              "y": 8,
              "id": 0
            },
            {
              "x": 14,
              "y": 9,
              "id": 1
            },
            {
              "x": 14,
              "y": 10,
              "id": 1
            },
            {
              "x": 14,
              "y": 11,
              "id": 1
            },
            {
              "x": 14,
              "y": 12,
              "id": 1
            },
            {
              "x": 14,
              "y": 13,
              "id": 1
            },
            {
              "x": 14,
              "y": 14,
              "id": 1
            },
            {
              "x": 14,
              "y": 15,
              "id": 1
            },
            {
              "x": 14,
              "y": 16,
              "id": 1
            },
            {
              "x": 14,
              "y": 17,
              "id": 1
            },
            {
              "x": 14,
              "y": 18,
              "id": 1
            },
            {
              "x": 14,
              "y": 19,
              "id": 1
            },
            {
              "x": 14,
              "y": 20,
              "id": 1
            },
            {
              "x": 14,
              "y": 21,
              "id": 1
            },
            {
              "x": 14,
              "y": 22,
              "id": 1
            },
            {
              "x": 14,
              "y": 23,
              "id": 1
            },
            {
              "x": 14,
              "y": 24,
              "id": 1
            },
            {
              "x": 14,
              "y": 25,
              "id": 1
            },
            {
              "x": 14,
              "y": 26,
              "id": 1
            },
            {
              "x": 14,
              "y": 27,
              "id": 1
            },
            {
              "x": 14,
              "y": 28,
              "id": 0
            },
            {
              "x": 14,
              "y": 29,
              "id": 0
            },
            {
              "x": 14,
              "y": 30,
              "id": 1
            },
            {
              "x": 14,
              "y": 31,
              "id": 1
            },
            {
              "x": 14,
              "y": 32,
              "id": 1
            },
            {
              "x": 14,
              "y": 33,
              "id": 1
            },
            {
              "x": 14,
              "y": 34,
              "id": 1
            },
            {
              "x": 14,
              "y": 35,
              "id": 1
            },
            {
              "x": 14,
              "y": 36,
              "id": 1
            },
            {
              "x": 14,
              "y": 37,
              "id": 1
            },
            {
              "x": 14,
              "y": 38,
              "id": 1
            },
            {
              "x": 14,
              "y": 39,
              "id": 0
            },
            {
              "x": 14,
              "y": 40,
              "id": 0
            },
            {
              "x": 14,
              "y": 41,
              "id": 1
            },
            {
              "x": 14,
              "y": 42,
              "id": 1
            },
            {
              "x": 14,
              "y": 43,
              "id": 1
            },
            {
              "x": 14,
              "y": 44,
              "id": 1
            },
            {
              "x": 14,
              "y": 45,
              "id": 1
            },
            {
              "x": 14,
              "y": 46,
              "id": 1
            },
            {
              "x": 14,
              "y": 47,
              "id": 1
            },
            {
              "x": 14,
              "y": 48,
              "id": 1
            },
            {
              "x": 14,
              "y": 49,
              "id": 1
            },
            {
              "x": 14,
              "y": 50,
              "id": 1
            },
            {
              "x": 14,
              "y": 51,
              "id": 1
            },
            {
              "x": 14,
              "y": 52,
              "id": 1
            },
            {
              "x": 14,
              "y": 53,
              "id": 1
            },
            {
              "x": 14,
              "y": 54,
              "id": 1
            },
            {
              "x": 14,
              "y": 55,
              "id": 1
            },
            {
              "x": 14,
              "y": 56,
              "id": 1
            },
            {
              "x": 14,
              "y": 57,
              "id": 2
            },
            {
              "x": 14,
              "y": 58,
              "id": 3
            },
            {
              "x": 14,
              "y": 59,
              "id": 3
            },
            {
              "x": 14,
              "y": 60,
              "id": 3
            },
            {
              "x": 14,
              "y": 61,
              "id": 3
            },
            {
              "x": 14,
              "y": 62,
              "id": 3
            },
            {
              "x": 14,
              "y": 63,
              "id": 3
            },
            {
              "x": 14,
              "y": 64,
              "id": 3
            },
            {
              "x": 14,
              "y": 65,
              "id": 3
            },
            {
              "x": 15,
              "y": 0,
              "id": 1
            },
            {
              "x": 15,
              "y": 1,
              "id": 1
            },
            {
              "x": 15,
              "y": 2,
              "id": 1
            },
            {
              "x": 15,
              "y": 3,
              "id": 1
            },
            {
              "x": 15,
              "y": 4,
              "id": 1
            },
            {
              "x": 15,
              "y": 5,
              "id": 1
            },
            {
              "x": 15,
              "y": 6,
              "id": 1
            },
            {
              "x": 15,
              "y": 7,
              "id": 1
            },
            {
              "x": 15,
              "y": 8,
              "id": 1
            },
            {
              "x": 15,
              "y": 9,
              "id": 1
            },
            {
              "x": 15,
              "y": 10,
              "id": 1
            },
            {
              "x": 15,
              "y": 11,
              "id": 1
            },
            {
              "x": 15,
              "y": 12,
              "id": 1
            },
            {
              "x": 15,
              "y": 13,
              "id": 1
            },
            {
              "x": 15,
              "y": 14,
              "id": 1
            },
            {
              "x": 15,
              "y": 15,
              "id": 1
            },
            {
              "x": 15,
              "y": 16,
              "id": 1
            },
            {
              "x": 15,
              "y": 17,
              "id": 1
            },
            {
              "x": 15,
              "y": 18,
              "id": 1
            },
            {
              "x": 15,
              "y": 19,
              "id": 1
            },
            {
              "x": 15,
              "y": 20,
              "id": 1
            },
            {
              "x": 15,
              "y": 21,
              "id": 1
            },
            {
              "x": 15,
              "y": 22,
              "id": 1
            },
            {
              "x": 15,
              "y": 23,
              "id": 1
            },
            {
              "x": 15,
              "y": 24,
              "id": 1
            },
            {
              "x": 15,
              "y": 25,
              "id": 1
            },
            {
              "x": 15,
              "y": 26,
              "id": 1
            },
            {
              "x": 15,
              "y": 27,
              "id": 1
            },
            {
              "x": 15,
              "y": 28,
              "id": 0
            },
            {
              "x": 15,
              "y": 29,
              "id": 0
            },
            {
              "x": 15,
              "y": 30,
              "id": 1
            },
            {
              "x": 15,
              "y": 31,
              "id": 1
            },
            {
              "x": 15,
              "y": 32,
              "id": 1
            },
            {
              "x": 15,
              "y": 33,
              "id": 1
            },
            {
              "x": 15,
              "y": 34,
              "id": 1
            },
            {
              "x": 15,
              "y": 35,
              "id": 1
            },
            {
              "x": 15,
              "y": 36,
              "id": 1
            },
            {
              "x": 15,
              "y": 37,
              "id": 1
            },
            {
              "x": 15,
              "y": 38,
              "id": 1
            },
            {
              "x": 15,
              "y": 39,
              "id": 0
            },
            {
              "x": 15,
              "y": 40,
              "id": 0
            },
            {
              "x": 15,
              "y": 41,
              "id": 1
            },
            {
              "x": 15,
              "y": 42,
              "id": 1
            },
            {
              "x": 15,
              "y": 43,
              "id": 1
            },
            {
              "x": 15,
              "y": 44,
              "id": 1
            },
            {
              "x": 15,
              "y": 45,
              "id": 1
            },
            {
              "x": 15,
              "y": 46,
              "id": 1
            },
            {
              "x": 15,
              "y": 47,
              "id": 1
            },
            {
              "x": 15,
              "y": 48,
              "id": 1
            },
            {
              "x": 15,
              "y": 49,
              "id": 1
            },
            {
              "x": 15,
              "y": 50,
              "id": 1
            },
            {
              "x": 15,
              "y": 51,
              "id": 1
            },
            {
              "x": 15,
              "y": 52,
              "id": 1
            },
            {
              "x": 15,
              "y": 53,
              "id": 1
            },
            {
              "x": 15,
              "y": 54,
              "id": 1
            },
            {
              "x": 15,
              "y": 55,
              "id": 1
            },
            {
              "x": 15,
              "y": 56,
              "id": 1
            },
            {
              "x": 15,
              "y": 57,
              "id": 5
            },
            {
              "x": 15,
              "y": 58,
              "id": 6
            },
            {
              "x": 15,
              "y": 59,
              "id": 3
            },
            {
              "x": 15,
              "y": 60,
              "id": 3
            },
            {
              "x": 15,
              "y": 61,
              "id": 3
            },
            {
              "x": 15,
              "y": 62,
              "id": 3
            },
            {
              "x": 15,
              "y": 63,
              "id": 3
            },
            {
              "x": 15,
              "y": 64,
              "id": 3
            },
            {
              "x": 15,
              "y": 65,
              "id": 3
            },
            {
              "x": 16,
              "y": 0,
              "id": 1
            },
            {
              "x": 16,
              "y": 1,
              "id": 1
            },
            {
              "x": 16,
              "y": 2,
              "id": 1
            },
            {
              "x": 16,
              "y": 3,
              "id": 1
            },
            {
              "x": 16,
              "y": 4,
              "id": 1
            },
            {
              "x": 16,
              "y": 5,
              "id": 1
            },
            {
              "x": 16,
              "y": 6,
              "id": 1
            },
            {
              "x": 16,
              "y": 7,
              "id": 1
            },
            {
              "x": 16,
              "y": 8,
              "id": 1
            },
            {
              "x": 16,
              "y": 9,
              "id": 1
            },
            {
              "x": 16,
              "y": 10,
              "id": 1
            },
            {
              "x": 16,
              "y": 11,
              "id": 1
            },
            {
              "x": 16,
              "y": 12,
              "id": 1
            },
            {
              "x": 16,
              "y": 13,
              "id": 1
            },
            {
              "x": 16,
              "y": 14,
              "id": 1
            },
            {
              "x": 16,
              "y": 15,
              "id": 1
            },
            {
              "x": 16,
              "y": 16,
              "id": 1
            },
            {
              "x": 16,
              "y": 17,
              "id": 1
            },
            {
              "x": 16,
              "y": 18,
              "id": 1
            },
            {
              "x": 16,
              "y": 19,
              "id": 1
            },
            {
              "x": 16,
              "y": 20,
              "id": 1
            },
            {
              "x": 16,
              "y": 21,
              "id": 1
            },
            {
              "x": 16,
              "y": 22,
              "id": 1
            },
            {
              "x": 16,
              "y": 23,
              "id": 1
            },
            {
              "x": 16,
              "y": 24,
              "id": 1
            },
            {
              "x": 16,
              "y": 25,
              "id": 1
            },
            {
              "x": 16,
              "y": 26,
              "id": 1
            },
            {
              "x": 16,
              "y": 27,
              "id": 1
            },
            {
              "x": 16,
              "y": 28,
              "id": 1
            },
            {
              "x": 16,
              "y": 29,
              "id": 1
            },
            {
              "x": 16,
              "y": 30,
              "id": 1
            },
            {
              "x": 16,
              "y": 31,
              "id": 1
            },
            {
              "x": 16,
              "y": 32,
              "id": 1
            },
            {
              "x": 16,
              "y": 33,
              "id": 1
            },
            {
              "x": 16,
              "y": 34,
              "id": 1
            },
            {
              "x": 16,
              "y": 35,
              "id": 1
            },
            {
              "x": 16,
              "y": 36,
              "id": 1
            },
            {
              "x": 16,
              "y": 37,
              "id": 1
            },
            {
              "x": 16,
              "y": 38,
              "id": 1
            },
            {
              "x": 16,
              "y": 39,
              "id": 1
            },
            {
              "x": 16,
              "y": 40,
              "id": 1
            },
            {
              "x": 16,
              "y": 41,
              "id": 1
            },
            {
              "x": 16,
              "y": 42,
              "id": 1
            },
            {
              "x": 16,
              "y": 43,
              "id": 1
            },
            {
              "x": 16,
              "y": 44,
              "id": 1
            },
            {
              "x": 16,
              "y": 45,
              "id": 1
            },
            {
              "x": 16,
              "y": 46,
              "id": 1
            },
            {
              "x": 16,
              "y": 47,
              "id": 1
            },
            {
              "x": 16,
              "y": 48,
              "id": 1
            },
            {
              "x": 16,
              "y": 49,
              "id": 1
            },
            {
              "x": 16,
              "y": 50,
              "id": 1
            },
            {
              "x": 16,
              "y": 51,
              "id": 1
            },
            {
              "x": 16,
              "y": 52,
              "id": 1
            },
            {
              "x": 16,
              "y": 53,
              "id": 1
            },
            {
              "x": 16,
              "y": 54,
              "id": 1
            },
            {
              "x": 16,
              "y": 55,
              "id": 1
            },
            {
              "x": 16,
              "y": 56,
              "id": 1
            },
            {
              "x": 16,
              "y": 57,
              "id": 1
            },
            {
              "x": 16,
              "y": 58,
              "id": 2
            },
            {
              "x": 16,
              "y": 59,
              "id": 3
            },
            {
              "x": 16,
              "y": 60,
              "id": 3
            },
            {
              "x": 16,
              "y": 61,
              "id": 3
            },
            {
              "x": 16,
              "y": 62,
              "id": 3
            },
            {
              "x": 16,
              "y": 63,
              "id": 3
            },
            {
              "x": 16,
              "y": 64,
              "id": 3
            },
            {
              "x": 16,
              "y": 65,
              "id": 3
            },
            {
              "x": 17,
              "y": 0,
              "id": 1
            },
            {
              "x": 17,
              "y": 1,
              "id": 1
            },
            {
              "x": 17,
              "y": 2,
              "id": 1
            },
            {
              "x": 17,
              "y": 3,
              "id": 1
            },
            {
              "x": 17,
              "y": 4,
              "id": 1
            },
            {
              "x": 17,
              "y": 5,
              "id": 1
            },
            {
              "x": 17,
              "y": 6,
              "id": 1
            },
            {
              "x": 17,
              "y": 7,
              "id": 1
            },
            {
              "x": 17,
              "y": 8,
              "id": 1
            },
            {
              "x": 17,
              "y": 9,
              "id": 1
            },
            {
              "x": 17,
              "y": 10,
              "id": 1
            },
            {
              "x": 17,
              "y": 11,
              "id": 1
            },
            {
              "x": 17,
              "y": 12,
              "id": 1
            },
            {
              "x": 17,
              "y": 13,
              "id": 1
            },
            {
              "x": 17,
              "y": 14,
              "id": 1
            },
            {
              "x": 17,
              "y": 15,
              "id": 1
            },
            {
              "x": 17,
              "y": 16,
              "id": 1
            },
            {
              "x": 17,
              "y": 17,
              "id": 1
            },
            {
              "x": 17,
              "y": 18,
              "id": 1
            },
            {
              "x": 17,
              "y": 19,
              "id": 1
            },
            {
              "x": 17,
              "y": 20,
              "id": 1
            },
            {
              "x": 17,
              "y": 21,
              "id": 1
            },
            {
              "x": 17,
              "y": 22,
              "id": 1
            },
            {
              "x": 17,
              "y": 23,
              "id": 1
            },
            {
              "x": 17,
              "y": 24,
              "id": 1
            },
            {
              "x": 17,
              "y": 25,
              "id": 1
            },
            {
              "x": 17,
              "y": 26,
              "id": 1
            },
            {
              "x": 17,
              "y": 27,
              "id": 1
            },
            {
              "x": 17,
              "y": 28,
              "id": 1
            },
            {
              "x": 17,
              "y": 29,
              "id": 1
            },
            {
              "x": 17,
              "y": 30,
              "id": 1
            },
            {
              "x": 17,
              "y": 31,
              "id": 1
            },
            {
              "x": 17,
              "y": 32,
              "id": 1
            },
            {
              "x": 17,
              "y": 33,
              "id": 1
            },
            {
              "x": 17,
              "y": 34,
              "id": 1
            },
            {
              "x": 17,
              "y": 35,
              "id": 1
            },
            {
              "x": 17,
              "y": 36,
              "id": 1
            },
            {
              "x": 17,
              "y": 37,
              "id": 1
            },
            {
              "x": 17,
              "y": 38,
              "id": 1
            },
            {
              "x": 17,
              "y": 39,
              "id": 1
            },
            {
              "x": 17,
              "y": 40,
              "id": 1
            },
            {
              "x": 17,
              "y": 41,
              "id": 1
            },
            {
              "x": 17,
              "y": 42,
              "id": 1
            },
            {
              "x": 17,
              "y": 43,
              "id": 1
            },
            {
              "x": 17,
              "y": 44,
              "id": 1
            },
            {
              "x": 17,
              "y": 45,
              "id": 1
            },
            {
              "x": 17,
              "y": 46,
              "id": 1
            },
            {
              "x": 17,
              "y": 47,
              "id": 1
            },
            {
              "x": 17,
              "y": 48,
              "id": 1
            },
            {
              "x": 17,
              "y": 49,
              "id": 1
            },
            {
              "x": 17,
              "y": 50,
              "id": 1
            },
            {
              "x": 17,
              "y": 51,
              "id": 1
            },
            {
              "x": 17,
              "y": 52,
              "id": 1
            },
            {
              "x": 17,
              "y": 53,
              "id": 1
            },
            {
              "x": 17,
              "y": 54,
              "id": 1
            },
            {
              "x": 17,
              "y": 55,
              "id": 1
            },
            {
              "x": 17,
              "y": 56,
              "id": 1
            },
            {
              "x": 17,
              "y": 57,
              "id": 1
            },
            {
              "x": 17,
              "y": 58,
              "id": 2
            },
            {
              "x": 17,
              "y": 59,
              "id": 3
            },
            {
              "x": 17,
              "y": 60,
              "id": 3
            },
            {
              "x": 17,
              "y": 61,
              "id": 3
            },
            {
              "x": 17,
              "y": 62,
              "id": 3
            },
            {
              "x": 17,
              "y": 63,
              "id": 3
            },
            {
              "x": 17,
              "y": 64,
              "id": 3
            },
            {
              "x": 17,
              "y": 65,
              "id": 3
            },
            {
              "x": 18,
              "y": 0,
              "id": 1
            },
            {
              "x": 18,
              "y": 1,
              "id": 1
            },
            {
              "x": 18,
              "y": 2,
              "id": 1
            },
            {
              "x": 18,
              "y": 3,
              "id": 1
            },
            {
              "x": 18,
              "y": 4,
              "id": 1
            },
            {
              "x": 18,
              "y": 5,
              "id": 1
            },
            {
              "x": 18,
              "y": 6,
              "id": 1
            },
            {
              "x": 18,
              "y": 7,
              "id": 1
            },
            {
              "x": 18,
              "y": 8,
              "id": 1
            },
            {
              "x": 18,
              "y": 9,
              "id": 1
            },
            {
              "x": 18,
              "y": 10,
              "id": 1
            },
            {
              "x": 18,
              "y": 11,
              "id": 1
            },
            {
              "x": 18,
              "y": 12,
              "id": 1
            },
            {
              "x": 18,
              "y": 13,
              "id": 1
            },
            {
              "x": 18,
              "y": 14,
              "id": 1
            },
            {
              "x": 18,
              "y": 15,
              "id": 1
            },
            {
              "x": 18,
              "y": 16,
              "id": 1
            },
            {
              "x": 18,
              "y": 17,
              "id": 1
            },
            {
              "x": 18,
              "y": 18,
              "id": 1
            },
            {
              "x": 18,
              "y": 19,
              "id": 1
            },
            {
              "x": 18,
              "y": 20,
              "id": 1
            },
            {
              "x": 18,
              "y": 21,
              "id": 1
            },
            {
              "x": 18,
              "y": 22,
              "id": 1
            },
            {
              "x": 18,
              "y": 23,
              "id": 1
            },
            {
              "x": 18,
              "y": 24,
              "id": 1
            },
            {
              "x": 18,
              "y": 25,
              "id": 1
            },
            {
              "x": 18,
              "y": 26,
              "id": 1
            },
            {
              "x": 18,
              "y": 27,
              "id": 1
            },
            {
              "x": 18,
              "y": 28,
              "id": 1
            },
            {
              "x": 18,
              "y": 29,
              "id": 1
            },
            {
              "x": 18,
              "y": 30,
              "id": 1
            },
            {
              "x": 18,
              "y": 31,
              "id": 1
            },
            {
              "x": 18,
              "y": 32,
              "id": 1
            },
            {
              "x": 18,
              "y": 33,
              "id": 1
            },
            {
              "x": 18,
              "y": 34,
              "id": 1
            },
            {
              "x": 18,
              "y": 35,
              "id": 1
            },
            {
              "x": 18,
              "y": 36,
              "id": 1
            },
            {
              "x": 18,
              "y": 37,
              "id": 1
            },
            {
              "x": 18,
              "y": 38,
              "id": 1
            },
            {
              "x": 18,
              "y": 39,
              "id": 1
            },
            {
              "x": 18,
              "y": 40,
              "id": 1
            },
            {
              "x": 18,
              "y": 41,
              "id": 1
            },
            {
              "x": 18,
              "y": 42,
              "id": 1
            },
            {
              "x": 18,
              "y": 43,
              "id": 1
            },
            {
              "x": 18,
              "y": 44,
              "id": 1
            },
            {
              "x": 18,
              "y": 45,
              "id": 1
            },
            {
              "x": 18,
              "y": 46,
              "id": 1
            },
            {
              "x": 18,
              "y": 47,
              "id": 1
            },
            {
              "x": 18,
              "y": 48,
              "id": 1
            },
            {
              "x": 18,
              "y": 49,
              "id": 1
            },
            {
              "x": 18,
              "y": 50,
              "id": 1
            },
            {
              "x": 18,
              "y": 51,
              "id": 1
            },
            {
              "x": 18,
              "y": 52,
              "id": 1
            },
            {
              "x": 18,
              "y": 53,
              "id": 1
            },
            {
              "x": 18,
              "y": 54,
              "id": 1
            },
            {
              "x": 18,
              "y": 55,
              "id": 1
            },
            {
              "x": 18,
              "y": 56,
              "id": 1
            },
            {
              "x": 18,
              "y": 57,
              "id": 1
            },
            {
              "x": 18,
              "y": 58,
              "id": 2
            },
            {
              "x": 18,
              "y": 59,
              "id": 3
            },
            {
              "x": 18,
              "y": 60,
              "id": 3
            },
            {
              "x": 18,
              "y": 61,
              "id": 3
            },
            {
              "x": 18,
              "y": 62,
              "id": 3
            },
            {
              "x": 18,
              "y": 63,
              "id": 3
            },
            {
              "x": 18,
              "y": 64,
              "id": 3
            },
            {
              "x": 18,
              "y": 65,
              "id": 3
            },
            {
              "x": 19,
              "y": 0,
              "id": 1
            },
            {
              "x": 19,
              "y": 1,
              "id": 1
            },
            {
              "x": 19,
              "y": 2,
              "id": 1
            },
            {
              "x": 19,
              "y": 3,
              "id": 1
            },
            {
              "x": 19,
              "y": 4,
              "id": 1
            },
            {
              "x": 19,
              "y": 5,
              "id": 1
            },
            {
              "x": 19,
              "y": 6,
              "id": 1
            },
            {
              "x": 19,
              "y": 7,
              "id": 1
            },
            {
              "x": 19,
              "y": 8,
              "id": 1
            },
            {
              "x": 19,
              "y": 9,
              "id": 1
            },
            {
              "x": 19,
              "y": 10,
              "id": 1
            },
            {
              "x": 19,
              "y": 11,
              "id": 1
            },
            {
              "x": 19,
              "y": 12,
              "id": 1
            },
            {
              "x": 19,
              "y": 13,
              "id": 1
            },
            {
              "x": 19,
              "y": 14,
              "id": 1
            },
            {
              "x": 19,
              "y": 15,
              "id": 1
            },
            {
              "x": 19,
              "y": 16,
              "id": 1
            },
            {
              "x": 19,
              "y": 17,
              "id": 1
            },
            {
              "x": 19,
              "y": 18,
              "id": 1
            },
            {
              "x": 19,
              "y": 19,
              "id": 1
            },
            {
              "x": 19,
              "y": 20,
              "id": 1
            },
            {
              "x": 19,
              "y": 21,
              "id": 1
            },
            {
              "x": 19,
              "y": 22,
              "id": 1
            },
            {
              "x": 19,
              "y": 23,
              "id": 1
            },
            {
              "x": 19,
              "y": 24,
              "id": 1
            },
            {
              "x": 19,
              "y": 25,
              "id": 1
            },
            {
              "x": 19,
              "y": 26,
              "id": 1
            },
            {
              "x": 19,
              "y": 27,
              "id": 1
            },
            {
              "x": 19,
              "y": 28,
              "id": 1
            },
            {
              "x": 19,
              "y": 29,
              "id": 1
            },
            {
              "x": 19,
              "y": 30,
              "id": 1
            },
            {
              "x": 19,
              "y": 31,
              "id": 1
            },
            {
              "x": 19,
              "y": 32,
              "id": 1
            },
            {
              "x": 19,
              "y": 33,
              "id": 1
            },
            {
              "x": 19,
              "y": 34,
              "id": 1
            },
            {
              "x": 19,
              "y": 35,
              "id": 1
            },
            {
              "x": 19,
              "y": 36,
              "id": 1
            },
            {
              "x": 19,
              "y": 37,
              "id": 1
            },
            {
              "x": 19,
              "y": 38,
              "id": 1
            },
            {
              "x": 19,
              "y": 39,
              "id": 1
            },
            {
              "x": 19,
              "y": 40,
              "id": 1
            },
            {
              "x": 19,
              "y": 41,
              "id": 1
            },
            {
              "x": 19,
              "y": 42,
              "id": 1
            },
            {
              "x": 19,
              "y": 43,
              "id": 1
            },
            {
              "x": 19,
              "y": 44,
              "id": 1
            },
            {
              "x": 19,
              "y": 45,
              "id": 1
            },
            {
              "x": 19,
              "y": 46,
              "id": 1
            },
            {
              "x": 19,
              "y": 64,
              "id": 3
            },
            {
              "x": 19,
              "y": 65,
              "id": 3
            },
            {
              "x": 20,
              "y": 0,
              "id": 1
            },
            {
              "x": 20,
              "y": 1,
              "id": 1
            },
            {
              "x": 20,
              "y": 2,
              "id": 1
            },
            {
              "x": 20,
              "y": 3,
              "id": 1
            },
            {
              "x": 20,
              "y": 4,
              "id": 1
            },
            {
              "x": 20,
              "y": 5,
              "id": 1
            },
            {
              "x": 20,
              "y": 6,
              "id": 1
            },
            {
              "x": 20,
              "y": 7,
              "id": 1
            },
            {
              "x": 20,
              "y": 8,
              "id": 1
            },
            {
              "x": 20,
              "y": 9,
              "id": 1
            },
            {
              "x": 20,
              "y": 10,
              "id": 1
            },
            {
              "x": 20,
              "y": 11,
              "id": 1
            },
            {
              "x": 20,
              "y": 12,
              "id": 1
            },
            {
              "x": 20,
              "y": 13,
              "id": 1
            },
            {
              "x": 20,
              "y": 14,
              "id": 1
            },
            {
              "x": 20,
              "y": 15,
              "id": 1
            },
            {
              "x": 20,
              "y": 16,
              "id": 1
            },
            {
              "x": 20,
              "y": 17,
              "id": 1
            },
            {
              "x": 20,
              "y": 18,
              "id": 1
            },
            {
              "x": 20,
              "y": 19,
              "id": 1
            },
            {
              "x": 20,
              "y": 20,
              "id": 1
            },
            {
              "x": 20,
              "y": 21,
              "id": 1
            },
            {
              "x": 20,
              "y": 22,
              "id": 1
            },
            {
              "x": 20,
              "y": 23,
              "id": 1
            },
            {
              "x": 20,
              "y": 24,
              "id": 1
            },
            {
              "x": 20,
              "y": 25,
              "id": 1
            },
            {
              "x": 20,
              "y": 26,
              "id": 1
            },
            {
              "x": 20,
              "y": 27,
              "id": 1
            },
            {
              "x": 20,
              "y": 28,
              "id": 1
            },
            {
              "x": 20,
              "y": 29,
              "id": 1
            },
            {
              "x": 20,
              "y": 30,
              "id": 1
            },
            {
              "x": 20,
              "y": 31,
              "id": 1
            },
            {
              "x": 20,
              "y": 32,
              "id": 1
            },
            {
              "x": 20,
              "y": 33,
              "id": 1
            },
            {
              "x": 20,
              "y": 34,
              "id": 1
            },
            {
              "x": 20,
              "y": 35,
              "id": 1
            },
            {
              "x": 20,
              "y": 36,
              "id": 1
            },
            {
              "x": 20,
              "y": 37,
              "id": 1
            },
            {
              "x": 20,
              "y": 38,
              "id": 1
            },
            {
              "x": 20,
              "y": 39,
              "id": 1
            },
            {
              "x": 20,
              "y": 40,
              "id": 1
            },
            {
              "x": 20,
              "y": 41,
              "id": 1
            },
            {
              "x": 20,
              "y": 42,
              "id": 1
            },
            {
              "x": 20,
              "y": 43,
              "id": 1
            },
            {
              "x": 20,
              "y": 44,
              "id": 1
            },
            {
              "x": 20,
              "y": 45,
              "id": 1
            },
            {
              "x": 20,
              "y": 46,
              "id": 1
            },
            {
              "x": 20,
              "y": 47,
              "id": 1
            },
            {
              "x": 20,
              "y": 48,
              "id": 1
            },
            {
              "x": 20,
              "y": 49,
              "id": 1
            },
            {
              "x": 20,
              "y": 50,
              "id": 1
            },
            {
              "x": 20,
              "y": 51,
              "id": 1
            },
            {
              "x": 20,
              "y": 52,
              "id": 1
            },
            {
              "x": 20,
              "y": 53,
              "id": 1
            },
            {
              "x": 20,
              "y": 54,
              "id": 1
            },
            {
              "x": 20,
              "y": 55,
              "id": 1
            },
            {
              "x": 20,
              "y": 58,
              "id": 3
            },
            {
              "x": 20,
              "y": 59,
              "id": 3
            },
            {
              "x": 20,
              "y": 60,
              "id": 3
            },
            {
              "x": 20,
              "y": 61,
              "id": 3
            },
            {
              "x": 20,
              "y": 62,
              "id": 3
            },
            {
              "x": 20,
              "y": 63,
              "id": 3
            },
            {
              "x": 20,
              "y": 64,
              "id": 3
            },
            {
              "x": 20,
              "y": 65,
              "id": 3
            }
          ]
        },
        {
          "name": "Ground Layer 2",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 7
            },
            {
              "x": 0,
              "y": 1,
              "id": 7
            },
            {
              "x": 0,
              "y": 2,
              "id": 7
            },
            {
              "x": 0,
              "y": 3,
              "id": 7
            },
            {
              "x": 0,
              "y": 4,
              "id": 7
            },
            {
              "x": 0,
              "y": 5,
              "id": 8
            },
            {
              "x": 0,
              "y": 6,
              "id": 9
            },
            {
              "x": 0,
              "y": 7,
              "id": 10
            },
            {
              "x": 1,
              "y": 4,
              "id": 11
            },
            {
              "x": 1,
              "y": 5,
              "id": 12
            },
            {
              "x": 1,
              "y": 6,
              "id": 9
            },
            {
              "x": 1,
              "y": 7,
              "id": 10
            },
            {
              "x": 2,
              "y": 6,
              "id": 9
            },
            {
              "x": 2,
              "y": 7,
              "id": 10
            },
            {
              "x": 2,
              "y": 33,
              "id": 13
            },
            {
              "x": 2,
              "y": 34,
              "id": 14
            },
            {
              "x": 3,
              "y": 4,
              "id": 15
            },
            {
              "x": 3,
              "y": 5,
              "id": 15
            },
            {
              "x": 3,
              "y": 6,
              "id": 16
            },
            {
              "x": 3,
              "y": 7,
              "id": 10
            },
            {
              "x": 3,
              "y": 33,
              "id": 17
            },
            {
              "x": 3,
              "y": 34,
              "id": 18
            },
            {
              "x": 4,
              "y": 7,
              "id": 10
            },
            {
              "x": 4,
              "y": 33,
              "id": 17
            },
            {
              "x": 4,
              "y": 34,
              "id": 18
            },
            {
              "x": 5,
              "y": 7,
              "id": 10
            },
            {
              "x": 5,
              "y": 33,
              "id": 17
            },
            {
              "x": 5,
              "y": 34,
              "id": 18
            },
            {
              "x": 6,
              "y": 0,
              "id": 10
            },
            {
              "x": 6,
              "y": 7,
              "id": 10
            },
            {
              "x": 6,
              "y": 33,
              "id": 17
            },
            {
              "x": 6,
              "y": 34,
              "id": 18
            },
            {
              "x": 6,
              "y": 47,
              "id": 19
            },
            {
              "x": 6,
              "y": 48,
              "id": 20
            },
            {
              "x": 6,
              "y": 49,
              "id": 21
            },
            {
              "x": 7,
              "y": 0,
              "id": 22
            },
            {
              "x": 7,
              "y": 7,
              "id": 22
            },
            {
              "x": 7,
              "y": 8,
              "id": 22
            },
            {
              "x": 7,
              "y": 9,
              "id": 22
            },
            {
              "x": 7,
              "y": 10,
              "id": 22
            },
            {
              "x": 7,
              "y": 11,
              "id": 22
            },
            {
              "x": 7,
              "y": 12,
              "id": 22
            },
            {
              "x": 7,
              "y": 13,
              "id": 22
            },
            {
              "x": 7,
              "y": 14,
              "id": 22
            },
            {
              "x": 7,
              "y": 15,
              "id": 22
            },
            {
              "x": 7,
              "y": 16,
              "id": 22
            },
            {
              "x": 7,
              "y": 17,
              "id": 22
            },
            {
              "x": 7,
              "y": 18,
              "id": 22
            },
            {
              "x": 7,
              "y": 19,
              "id": 22
            },
            {
              "x": 7,
              "y": 20,
              "id": 22
            },
            {
              "x": 7,
              "y": 21,
              "id": 22
            },
            {
              "x": 7,
              "y": 22,
              "id": 22
            },
            {
              "x": 7,
              "y": 23,
              "id": 22
            },
            {
              "x": 7,
              "y": 24,
              "id": 22
            },
            {
              "x": 7,
              "y": 25,
              "id": 22
            },
            {
              "x": 7,
              "y": 26,
              "id": 22
            },
            {
              "x": 7,
              "y": 27,
              "id": 22
            },
            {
              "x": 7,
              "y": 28,
              "id": 22
            },
            {
              "x": 7,
              "y": 29,
              "id": 22
            },
            {
              "x": 7,
              "y": 30,
              "id": 22
            },
            {
              "x": 7,
              "y": 33,
              "id": 17
            },
            {
              "x": 7,
              "y": 34,
              "id": 18
            },
            {
              "x": 7,
              "y": 46,
              "id": 19
            },
            {
              "x": 7,
              "y": 47,
              "id": 23
            },
            {
              "x": 7,
              "y": 48,
              "id": 3
            },
            {
              "x": 7,
              "y": 49,
              "id": 24
            },
            {
              "x": 8,
              "y": 0,
              "id": 22
            },
            {
              "x": 8,
              "y": 8,
              "id": 25
            },
            {
              "x": 8,
              "y": 23,
              "id": 26
            },
            {
              "x": 8,
              "y": 24,
              "id": 27
            },
            {
              "x": 8,
              "y": 25,
              "id": 28
            },
            {
              "x": 8,
              "y": 33,
              "id": 17
            },
            {
              "x": 8,
              "y": 34,
              "id": 18
            },
            {
              "x": 8,
              "y": 40,
              "id": 29
            },
            {
              "x": 8,
              "y": 46,
              "id": 2
            },
            {
              "x": 8,
              "y": 47,
              "id": 3
            },
            {
              "x": 8,
              "y": 48,
              "id": 3
            },
            {
              "x": 8,
              "y": 49,
              "id": 24
            },
            {
              "x": 9,
              "y": 0,
              "id": 22
            },
            {
              "x": 9,
              "y": 8,
              "id": 30
            },
            {
              "x": 9,
              "y": 9,
              "id": 28
            },
            {
              "x": 9,
              "y": 13,
              "id": 31
            },
            {
              "x": 9,
              "y": 14,
              "id": 32
            },
            {
              "x": 9,
              "y": 19,
              "id": 33
            },
            {
              "x": 9,
              "y": 21,
              "id": 34
            },
            {
              "x": 9,
              "y": 23,
              "id": 27
            },
            {
              "x": 9,
              "y": 24,
              "id": 28
            },
            {
              "x": 9,
              "y": 25,
              "id": 27
            },
            {
              "x": 9,
              "y": 30,
              "id": 35
            },
            {
              "x": 9,
              "y": 33,
              "id": 17
            },
            {
              "x": 9,
              "y": 34,
              "id": 18
            },
            {
              "x": 9,
              "y": 35,
              "id": 36
            },
            {
              "x": 9,
              "y": 38,
              "id": 37
            },
            {
              "x": 9,
              "y": 46,
              "id": 5
            },
            {
              "x": 9,
              "y": 47,
              "id": 38
            },
            {
              "x": 9,
              "y": 48,
              "id": 38
            },
            {
              "x": 9,
              "y": 49,
              "id": 39
            },
            {
              "x": 10,
              "y": 0,
              "id": 22
            },
            {
              "x": 10,
              "y": 3,
              "id": 13
            },
            {
              "x": 10,
              "y": 4,
              "id": 14
            },
            {
              "x": 10,
              "y": 8,
              "id": 25
            },
            {
              "x": 10,
              "y": 33,
              "id": 17
            },
            {
              "x": 10,
              "y": 34,
              "id": 18
            },
            {
              "x": 10,
              "y": 37,
              "id": 40
            },
            {
              "x": 11,
              "y": 0,
              "id": 22
            },
            {
              "x": 11,
              "y": 3,
              "id": 17
            },
            {
              "x": 11,
              "y": 4,
              "id": 9
            },
            {
              "x": 11,
              "y": 8,
              "id": 30
            },
            {
              "x": 11,
              "y": 33,
              "id": 17
            },
            {
              "x": 11,
              "y": 34,
              "id": 9
            },
            {
              "x": 12,
              "y": 0,
              "id": 22
            },
            {
              "x": 12,
              "y": 3,
              "id": 17
            },
            {
              "x": 12,
              "y": 4,
              "id": 9
            },
            {
              "x": 12,
              "y": 22,
              "id": 13
            },
            {
              "x": 12,
              "y": 23,
              "id": 41
            },
            {
              "x": 12,
              "y": 24,
              "id": 41
            },
            {
              "x": 12,
              "y": 25,
              "id": 41
            },
            {
              "x": 12,
              "y": 26,
              "id": 41
            },
            {
              "x": 12,
              "y": 27,
              "id": 41
            },
            {
              "x": 12,
              "y": 28,
              "id": 41
            },
            {
              "x": 12,
              "y": 29,
              "id": 41
            },
            {
              "x": 12,
              "y": 30,
              "id": 41
            },
            {
              "x": 12,
              "y": 31,
              "id": 41
            },
            {
              "x": 12,
              "y": 32,
              "id": 41
            },
            {
              "x": 12,
              "y": 33,
              "id": 12
            },
            {
              "x": 12,
              "y": 34,
              "id": 42
            },
            {
              "x": 12,
              "y": 35,
              "id": 41
            },
            {
              "x": 12,
              "y": 36,
              "id": 41
            },
            {
              "x": 12,
              "y": 37,
              "id": 41
            },
            {
              "x": 12,
              "y": 38,
              "id": 41
            },
            {
              "x": 12,
              "y": 39,
              "id": 41
            },
            {
              "x": 12,
              "y": 40,
              "id": 14
            },
            {
              "x": 12,
              "y": 43,
              "id": 27
            },
            {
              "x": 13,
              "y": 0,
              "id": 22
            },
            {
              "x": 13,
              "y": 3,
              "id": 17
            },
            {
              "x": 13,
              "y": 4,
              "id": 42
            },
            {
              "x": 13,
              "y": 5,
              "id": 41
            },
            {
              "x": 13,
              "y": 6,
              "id": 41
            },
            {
              "x": 13,
              "y": 7,
              "id": 41
            },
            {
              "x": 13,
              "y": 8,
              "id": 14
            },
            {
              "x": 13,
              "y": 22,
              "id": 43
            },
            {
              "x": 13,
              "y": 23,
              "id": 7
            },
            {
              "x": 13,
              "y": 24,
              "id": 7
            },
            {
              "x": 13,
              "y": 25,
              "id": 7
            },
            {
              "x": 13,
              "y": 26,
              "id": 7
            },
            {
              "x": 13,
              "y": 27,
              "id": 7
            },
            {
              "x": 13,
              "y": 28,
              "id": 8
            },
            {
              "x": 13,
              "y": 29,
              "id": 44
            },
            {
              "x": 13,
              "y": 30,
              "id": 7
            },
            {
              "x": 13,
              "y": 31,
              "id": 7
            },
            {
              "x": 13,
              "y": 32,
              "id": 7
            },
            {
              "x": 13,
              "y": 33,
              "id": 7
            },
            {
              "x": 13,
              "y": 34,
              "id": 7
            },
            {
              "x": 13,
              "y": 35,
              "id": 7
            },
            {
              "x": 13,
              "y": 36,
              "id": 7
            },
            {
              "x": 13,
              "y": 37,
              "id": 7
            },
            {
              "x": 13,
              "y": 38,
              "id": 7
            },
            {
              "x": 13,
              "y": 39,
              "id": 8
            },
            {
              "x": 13,
              "y": 40,
              "id": 9
            },
            {
              "x": 14,
              "y": 0,
              "id": 22
            },
            {
              "x": 14,
              "y": 3,
              "id": 43
            },
            {
              "x": 14,
              "y": 4,
              "id": 15
            },
            {
              "x": 14,
              "y": 5,
              "id": 15
            },
            {
              "x": 14,
              "y": 6,
              "id": 15
            },
            {
              "x": 14,
              "y": 7,
              "id": 15
            },
            {
              "x": 14,
              "y": 8,
              "id": 16
            },
            {
              "x": 14,
              "y": 28,
              "id": 17
            },
            {
              "x": 14,
              "y": 29,
              "id": 9
            },
            {
              "x": 14,
              "y": 39,
              "id": 17
            },
            {
              "x": 14,
              "y": 40,
              "id": 9
            },
            {
              "x": 15,
              "y": 0,
              "id": 22
            },
            {
              "x": 15,
              "y": 12,
              "id": 45
            },
            {
              "x": 15,
              "y": 19,
              "id": 45
            },
            {
              "x": 15,
              "y": 28,
              "id": 43
            },
            {
              "x": 15,
              "y": 29,
              "id": 16
            },
            {
              "x": 15,
              "y": 32,
              "id": 34
            },
            {
              "x": 15,
              "y": 39,
              "id": 43
            },
            {
              "x": 15,
              "y": 40,
              "id": 16
            },
            {
              "x": 16,
              "y": 0,
              "id": 22
            },
            {
              "x": 16,
              "y": 3,
              "id": 28
            },
            {
              "x": 16,
              "y": 8,
              "id": 30
            },
            {
              "x": 16,
              "y": 10,
              "id": 46
            },
            {
              "x": 16,
              "y": 11,
              "id": 47
            },
            {
              "x": 16,
              "y": 22,
              "id": 29
            },
            {
              "x": 16,
              "y": 25,
              "id": 27
            },
            {
              "x": 16,
              "y": 43,
              "id": 25
            },
            {
              "x": 17,
              "y": 0,
              "id": 22
            },
            {
              "x": 17,
              "y": 8,
              "id": 25
            },
            {
              "x": 17,
              "y": 16,
              "id": 48
            },
            {
              "x": 17,
              "y": 33,
              "id": 40
            },
            {
              "x": 17,
              "y": 37,
              "id": 27
            },
            {
              "x": 17,
              "y": 64,
              "id": 49
            },
            {
              "x": 18,
              "y": 0,
              "id": 22
            },
            {
              "x": 18,
              "y": 5,
              "id": 27
            },
            {
              "x": 18,
              "y": 8,
              "id": 30
            },
            {
              "x": 18,
              "y": 10,
              "id": 28
            },
            {
              "x": 18,
              "y": 14,
              "id": 25
            },
            {
              "x": 18,
              "y": 23,
              "id": 37
            },
            {
              "x": 18,
              "y": 24,
              "id": 30
            },
            {
              "x": 18,
              "y": 34,
              "id": 30
            },
            {
              "x": 18,
              "y": 45,
              "id": 22
            },
            {
              "x": 18,
              "y": 64,
              "id": 50
            },
            {
              "x": 19,
              "y": 0,
              "id": 22
            },
            {
              "x": 19,
              "y": 8,
              "id": 25
            },
            {
              "x": 19,
              "y": 21,
              "id": 51
            },
            {
              "x": 19,
              "y": 23,
              "id": 22
            },
            {
              "x": 19,
              "y": 24,
              "id": 22
            },
            {
              "x": 19,
              "y": 25,
              "id": 22
            },
            {
              "x": 19,
              "y": 26,
              "id": 22
            },
            {
              "x": 19,
              "y": 33,
              "id": 22
            },
            {
              "x": 19,
              "y": 34,
              "id": 22
            },
            {
              "x": 19,
              "y": 35,
              "id": 22
            },
            {
              "x": 19,
              "y": 36,
              "id": 22
            },
            {
              "x": 19,
              "y": 37,
              "id": 22
            },
            {
              "x": 19,
              "y": 38,
              "id": 22
            },
            {
              "x": 19,
              "y": 43,
              "id": 22
            },
            {
              "x": 19,
              "y": 44,
              "id": 22
            },
            {
              "x": 19,
              "y": 45,
              "id": 22
            },
            {
              "x": 19,
              "y": 64,
              "id": 52
            },
            {
              "x": 20,
              "y": 0,
              "id": 22
            },
            {
              "x": 20,
              "y": 1,
              "id": 53
            },
            {
              "x": 20,
              "y": 2,
              "id": 22
            },
            {
              "x": 20,
              "y": 3,
              "id": 22
            },
            {
              "x": 20,
              "y": 4,
              "id": 22
            },
            {
              "x": 20,
              "y": 5,
              "id": 22
            },
            {
              "x": 20,
              "y": 6,
              "id": 22
            },
            {
              "x": 20,
              "y": 7,
              "id": 22
            },
            {
              "x": 20,
              "y": 8,
              "id": 22
            },
            {
              "x": 20,
              "y": 9,
              "id": 22
            },
            {
              "x": 20,
              "y": 10,
              "id": 22
            },
            {
              "x": 20,
              "y": 11,
              "id": 22
            },
            {
              "x": 20,
              "y": 12,
              "id": 22
            },
            {
              "x": 20,
              "y": 13,
              "id": 22
            },
            {
              "x": 20,
              "y": 14,
              "id": 22
            },
            {
              "x": 20,
              "y": 15,
              "id": 22
            },
            {
              "x": 20,
              "y": 16,
              "id": 22
            },
            {
              "x": 20,
              "y": 17,
              "id": 22
            },
            {
              "x": 20,
              "y": 18,
              "id": 22
            },
            {
              "x": 20,
              "y": 19,
              "id": 22
            },
            {
              "x": 20,
              "y": 20,
              "id": 22
            },
            {
              "x": 20,
              "y": 21,
              "id": 22
            },
            {
              "x": 20,
              "y": 22,
              "id": 22
            },
            {
              "x": 20,
              "y": 23,
              "id": 22
            },
            {
              "x": 20,
              "y": 24,
              "id": 30
            },
            {
              "x": 20,
              "y": 25,
              "id": 30
            },
            {
              "x": 20,
              "y": 26,
              "id": 30
            },
            {
              "x": 20,
              "y": 31,
              "id": 30
            },
            {
              "x": 20,
              "y": 32,
              "id": 30
            },
            {
              "x": 20,
              "y": 34,
              "id": 22
            },
            {
              "x": 20,
              "y": 35,
              "id": 22
            },
            {
              "x": 20,
              "y": 36,
              "id": 22
            },
            {
              "x": 20,
              "y": 37,
              "id": 22
            },
            {
              "x": 20,
              "y": 38,
              "id": 22
            },
            {
              "x": 20,
              "y": 43,
              "id": 22
            },
            {
              "x": 20,
              "y": 44,
              "id": 22
            },
            {
              "x": 20,
              "y": 45,
              "id": 22
            },
            {
              "x": 20,
              "y": 46,
              "id": 54
            },
            {
              "x": 20,
              "y": 51,
              "id": 26
            },
            {
              "x": 20,
              "y": 55,
              "id": 55
            },
            {
              "x": 20,
              "y": 56,
              "id": 1
            },
            {
              "x": 20,
              "y": 57,
              "id": 1
            }
          ]
        },
        {
          "name": "Ground Layer 3",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 56
            },
            {
              "x": 0,
              "y": 31,
              "id": 22
            },
            {
              "x": 0,
              "y": 36,
              "id": 22
            },
            {
              "x": 1,
              "y": 0,
              "id": 57
            },
            {
              "x": 1,
              "y": 2,
              "id": 58
            },
            {
              "x": 1,
              "y": 3,
              "id": 59
            },
            {
              "x": 1,
              "y": 4,
              "id": 60
            },
            {
              "x": 1,
              "y": 31,
              "id": 22
            },
            {
              "x": 1,
              "y": 36,
              "id": 22
            },
            {
              "x": 2,
              "y": 2,
              "id": 61
            },
            {
              "x": 2,
              "y": 3,
              "id": 62
            },
            {
              "x": 2,
              "y": 4,
              "id": 63
            },
            {
              "x": 2,
              "y": 31,
              "id": 22
            },
            {
              "x": 2,
              "y": 36,
              "id": 22
            },
            {
              "x": 3,
              "y": 2,
              "id": 64
            },
            {
              "x": 3,
              "y": 3,
              "id": 65
            },
            {
              "x": 3,
              "y": 4,
              "id": 66
            },
            {
              "x": 3,
              "y": 31,
              "id": 22
            },
            {
              "x": 3,
              "y": 36,
              "id": 22
            },
            {
              "x": 3,
              "y": 37,
              "id": 22
            },
            {
              "x": 3,
              "y": 38,
              "id": 22
            },
            {
              "x": 3,
              "y": 39,
              "id": 22
            },
            {
              "x": 3,
              "y": 40,
              "id": 22
            },
            {
              "x": 3,
              "y": 41,
              "id": 22
            },
            {
              "x": 3,
              "y": 42,
              "id": 22
            },
            {
              "x": 3,
              "y": 43,
              "id": 22
            },
            {
              "x": 3,
              "y": 44,
              "id": 22
            },
            {
              "x": 3,
              "y": 45,
              "id": 22
            },
            {
              "x": 3,
              "y": 46,
              "id": 22
            },
            {
              "x": 3,
              "y": 47,
              "id": 22
            },
            {
              "x": 3,
              "y": 48,
              "id": 22
            },
            {
              "x": 3,
              "y": 49,
              "id": 22
            },
            {
              "x": 3,
              "y": 50,
              "id": 22
            },
            {
              "x": 3,
              "y": 51,
              "id": 22
            },
            {
              "x": 3,
              "y": 52,
              "id": 22
            },
            {
              "x": 3,
              "y": 53,
              "id": 22
            },
            {
              "x": 3,
              "y": 54,
              "id": 22
            },
            {
              "x": 3,
              "y": 55,
              "id": 22
            },
            {
              "x": 3,
              "y": 56,
              "id": 22
            },
            {
              "x": 3,
              "y": 57,
              "id": 67
            },
            {
              "x": 3,
              "y": 58,
              "id": 52
            },
            {
              "x": 3,
              "y": 59,
              "id": 52
            },
            {
              "x": 3,
              "y": 60,
              "id": 52
            },
            {
              "x": 3,
              "y": 61,
              "id": 52
            },
            {
              "x": 3,
              "y": 62,
              "id": 52
            },
            {
              "x": 3,
              "y": 63,
              "id": 52
            },
            {
              "x": 3,
              "y": 64,
              "id": 52
            },
            {
              "x": 3,
              "y": 65,
              "id": 52
            },
            {
              "x": 4,
              "y": 2,
              "id": 68
            },
            {
              "x": 4,
              "y": 3,
              "id": 69
            },
            {
              "x": 4,
              "y": 4,
              "id": 70
            },
            {
              "x": 4,
              "y": 6,
              "id": 71
            },
            {
              "x": 4,
              "y": 31,
              "id": 22
            },
            {
              "x": 4,
              "y": 37,
              "id": 34
            },
            {
              "x": 4,
              "y": 44,
              "id": 34
            },
            {
              "x": 4,
              "y": 51,
              "id": 72
            },
            {
              "x": 5,
              "y": 1,
              "id": 71
            },
            {
              "x": 5,
              "y": 31,
              "id": 22
            },
            {
              "x": 5,
              "y": 40,
              "id": 27
            },
            {
              "x": 5,
              "y": 41,
              "id": 29
            },
            {
              "x": 5,
              "y": 43,
              "id": 73
            },
            {
              "x": 5,
              "y": 47,
              "id": 22
            },
            {
              "x": 5,
              "y": 49,
              "id": 28
            },
            {
              "x": 5,
              "y": 50,
              "id": 74
            },
            {
              "x": 5,
              "y": 52,
              "id": 75
            },
            {
              "x": 5,
              "y": 54,
              "id": 76
            },
            {
              "x": 6,
              "y": 0,
              "id": 46
            },
            {
              "x": 6,
              "y": 1,
              "id": 47
            },
            {
              "x": 6,
              "y": 5,
              "id": 46
            },
            {
              "x": 6,
              "y": 6,
              "id": 47
            },
            {
              "x": 6,
              "y": 31,
              "id": 22
            },
            {
              "x": 6,
              "y": 38,
              "id": 27
            },
            {
              "x": 6,
              "y": 45,
              "id": 27
            },
            {
              "x": 6,
              "y": 52,
              "id": 26
            },
            {
              "x": 6,
              "y": 54,
              "id": 28
            },
            {
              "x": 6,
              "y": 56,
              "id": 76
            },
            {
              "x": 7,
              "y": 8,
              "id": 77
            },
            {
              "x": 7,
              "y": 31,
              "id": 22
            },
            {
              "x": 7,
              "y": 42,
              "id": 73
            },
            {
              "x": 8,
              "y": 2,
              "id": 78
            },
            {
              "x": 8,
              "y": 8,
              "id": 79
            },
            {
              "x": 8,
              "y": 51,
              "id": 22
            },
            {
              "x": 9,
              "y": 8,
              "id": 79
            },
            {
              "x": 9,
              "y": 11,
              "id": 80
            },
            {
              "x": 9,
              "y": 12,
              "id": 81
            },
            {
              "x": 9,
              "y": 13,
              "id": 82
            },
            {
              "x": 9,
              "y": 16,
              "id": 76
            },
            {
              "x": 9,
              "y": 28,
              "id": 78
            },
            {
              "x": 9,
              "y": 40,
              "id": 78
            },
            {
              "x": 9,
              "y": 43,
              "id": 78
            },
            {
              "x": 9,
              "y": 54,
              "id": 33
            },
            {
              "x": 10,
              "y": 8,
              "id": 79
            },
            {
              "x": 10,
              "y": 11,
              "id": 83
            },
            {
              "x": 10,
              "y": 12,
              "id": 84
            },
            {
              "x": 10,
              "y": 13,
              "id": 85
            },
            {
              "x": 10,
              "y": 27,
              "id": 74
            },
            {
              "x": 10,
              "y": 39,
              "id": 86
            },
            {
              "x": 10,
              "y": 40,
              "id": 87
            },
            {
              "x": 10,
              "y": 41,
              "id": 88
            },
            {
              "x": 10,
              "y": 44,
              "id": 74
            },
            {
              "x": 10,
              "y": 52,
              "id": 74
            },
            {
              "x": 10,
              "y": 56,
              "id": 76
            },
            {
              "x": 11,
              "y": 2,
              "id": 78
            },
            {
              "x": 11,
              "y": 6,
              "id": 89
            },
            {
              "x": 11,
              "y": 8,
              "id": 90
            },
            {
              "x": 11,
              "y": 23,
              "id": 76
            },
            {
              "x": 11,
              "y": 38,
              "id": 31
            },
            {
              "x": 11,
              "y": 39,
              "id": 91
            },
            {
              "x": 11,
              "y": 40,
              "id": 92
            },
            {
              "x": 11,
              "y": 41,
              "id": 93
            },
            {
              "x": 12,
              "y": 8,
              "id": 94
            },
            {
              "x": 12,
              "y": 20,
              "id": 78
            },
            {
              "x": 12,
              "y": 46,
              "id": 22
            },
            {
              "x": 13,
              "y": 1,
              "id": 95
            },
            {
              "x": 13,
              "y": 45,
              "id": 22
            },
            {
              "x": 13,
              "y": 48,
              "id": 73
            },
            {
              "x": 13,
              "y": 50,
              "id": 73
            },
            {
              "x": 13,
              "y": 52,
              "id": 27
            },
            {
              "x": 14,
              "y": 1,
              "id": 96
            },
            {
              "x": 14,
              "y": 14,
              "id": 78
            },
            {
              "x": 14,
              "y": 35,
              "id": 78
            },
            {
              "x": 14,
              "y": 53,
              "id": 35
            },
            {
              "x": 14,
              "y": 56,
              "id": 74
            },
            {
              "x": 15,
              "y": 1,
              "id": 97
            },
            {
              "x": 15,
              "y": 8,
              "id": 77
            },
            {
              "x": 15,
              "y": 24,
              "id": 75
            },
            {
              "x": 15,
              "y": 43,
              "id": 29
            },
            {
              "x": 15,
              "y": 45,
              "id": 73
            },
            {
              "x": 15,
              "y": 47,
              "id": 27
            },
            {
              "x": 15,
              "y": 50,
              "id": 22
            },
            {
              "x": 16,
              "y": 5,
              "id": 89
            },
            {
              "x": 16,
              "y": 8,
              "id": 90
            },
            {
              "x": 16,
              "y": 35,
              "id": 31
            },
            {
              "x": 16,
              "y": 46,
              "id": 27
            },
            {
              "x": 16,
              "y": 47,
              "id": 36
            },
            {
              "x": 16,
              "y": 48,
              "id": 28
            },
            {
              "x": 16,
              "y": 53,
              "id": 27
            },
            {
              "x": 16,
              "y": 56,
              "id": 76
            },
            {
              "x": 17,
              "y": 2,
              "id": 78
            },
            {
              "x": 17,
              "y": 8,
              "id": 98
            },
            {
              "x": 17,
              "y": 13,
              "id": 89
            },
            {
              "x": 17,
              "y": 19,
              "id": 86
            },
            {
              "x": 17,
              "y": 20,
              "id": 87
            },
            {
              "x": 17,
              "y": 21,
              "id": 88
            },
            {
              "x": 17,
              "y": 26,
              "id": 51
            },
            {
              "x": 17,
              "y": 35,
              "id": 74
            },
            {
              "x": 17,
              "y": 42,
              "id": 78
            },
            {
              "x": 18,
              "y": 8,
              "id": 79
            },
            {
              "x": 18,
              "y": 19,
              "id": 91
            },
            {
              "x": 18,
              "y": 20,
              "id": 92
            },
            {
              "x": 18,
              "y": 21,
              "id": 93
            },
            {
              "x": 18,
              "y": 46,
              "id": 22
            },
            {
              "x": 18,
              "y": 47,
              "id": 22
            },
            {
              "x": 18,
              "y": 48,
              "id": 22
            },
            {
              "x": 18,
              "y": 49,
              "id": 22
            },
            {
              "x": 18,
              "y": 50,
              "id": 22
            },
            {
              "x": 18,
              "y": 51,
              "id": 22
            },
            {
              "x": 18,
              "y": 52,
              "id": 22
            },
            {
              "x": 18,
              "y": 53,
              "id": 22
            },
            {
              "x": 18,
              "y": 54,
              "id": 22
            },
            {
              "x": 18,
              "y": 55,
              "id": 22
            },
            {
              "x": 18,
              "y": 56,
              "id": 22
            },
            {
              "x": 18,
              "y": 57,
              "id": 22
            },
            {
              "x": 18,
              "y": 58,
              "id": 52
            },
            {
              "x": 18,
              "y": 59,
              "id": 52
            },
            {
              "x": 18,
              "y": 60,
              "id": 52
            },
            {
              "x": 18,
              "y": 61,
              "id": 52
            },
            {
              "x": 18,
              "y": 62,
              "id": 52
            },
            {
              "x": 18,
              "y": 63,
              "id": 52
            },
            {
              "x": 19,
              "y": 0,
              "id": 80
            },
            {
              "x": 19,
              "y": 1,
              "id": 81
            },
            {
              "x": 19,
              "y": 2,
              "id": 82
            },
            {
              "x": 19,
              "y": 8,
              "id": 79
            },
            {
              "x": 20,
              "y": 0,
              "id": 83
            },
            {
              "x": 20,
              "y": 1,
              "id": 84
            },
            {
              "x": 20,
              "y": 2,
              "id": 85
            },
            {
              "x": 20,
              "y": 3,
              "id": 53
            },
            {
              "x": 20,
              "y": 8,
              "id": 94
            },
            {
              "x": 20,
              "y": 25,
              "id": 99
            },
            {
              "x": 20,
              "y": 33,
              "id": 100
            },
            {
              "x": 20,
              "y": 34,
              "id": 53
            },
            {
              "x": 20,
              "y": 35,
              "id": 53
            },
            {
              "x": 20,
              "y": 36,
              "id": 53
            },
            {
              "x": 20,
              "y": 37,
              "id": 53
            },
            {
              "x": 20,
              "y": 43,
              "id": 53
            },
            {
              "x": 20,
              "y": 44,
              "id": 53
            },
            {
              "x": 20,
              "y": 46,
              "id": 101
            },
            {
              "x": 20,
              "y": 47,
              "id": 102
            },
            {
              "x": 20,
              "y": 48,
              "id": 102
            },
            {
              "x": 20,
              "y": 49,
              "id": 102
            },
            {
              "x": 20,
              "y": 50,
              "id": 102
            },
            {
              "x": 20,
              "y": 51,
              "id": 103
            },
            {
              "x": 20,
              "y": 52,
              "id": 10
            },
            {
              "x": 20,
              "y": 53,
              "id": 55
            },
            {
              "x": 20,
              "y": 54,
              "id": 10
            },
            {
              "x": 20,
              "y": 55,
              "id": 103
            },
            {
              "x": 20,
              "y": 56,
              "id": 10
            },
            {
              "x": 20,
              "y": 57,
              "id": 55
            },
            {
              "x": 20,
              "y": 58,
              "id": 104
            }
          ]
        },
        {
          "name": "Ground Layer 4",
          "positions": [
            {
              "x": 1,
              "y": 1,
              "id": 75
            },
            {
              "x": 2,
              "y": 1,
              "id": 78
            },
            {
              "x": 4,
              "y": 5,
              "id": 105
            },
            {
              "x": 5,
              "y": 3,
              "id": 75
            },
            {
              "x": 11,
              "y": 10,
              "id": 106
            },
            {
              "x": 11,
              "y": 11,
              "id": 107
            },
            {
              "x": 20,
              "y": 46,
              "id": 108
            },
            {
              "x": 20,
              "y": 47,
              "id": 108
            },
            {
              "x": 20,
              "y": 48,
              "id": 108
            },
            {
              "x": 20,
              "y": 49,
              "id": 108
            },
            {
              "x": 20,
              "y": 58,
              "id": 50
            },
            {
              "x": 20,
              "y": 59,
              "id": 67
            },
            {
              "x": 20,
              "y": 60,
              "id": 109
            },
            {
              "x": 20,
              "y": 61,
              "id": 49
            },
            {
              "x": 20,
              "y": 62,
              "id": 52
            },
            {
              "x": 20,
              "y": 63,
              "id": 50
            },
            {
              "x": 20,
              "y": 64,
              "id": 109
            }
          ]
        },
        {
          "name": "Lower Decor - behind player",
          "positions": []
        },
        {
          "name": "Higher Decor - in front of player",
          "positions": [
            {
              "x": 0,
              "y": 30,
              "id": 53
            },
            {
              "x": 0,
              "y": 35,
              "id": 53
            },
            {
              "x": 1,
              "y": 30,
              "id": 53
            },
            {
              "x": 1,
              "y": 35,
              "id": 53
            },
            {
              "x": 2,
              "y": 30,
              "id": 53
            },
            {
              "x": 2,
              "y": 35,
              "id": 53
            },
            {
              "x": 3,
              "y": 30,
              "id": 53
            },
            {
              "x": 3,
              "y": 35,
              "id": 53
            },
            {
              "x": 3,
              "y": 36,
              "id": 53
            },
            {
              "x": 3,
              "y": 37,
              "id": 53
            },
            {
              "x": 3,
              "y": 38,
              "id": 53
            },
            {
              "x": 3,
              "y": 39,
              "id": 53
            },
            {
              "x": 3,
              "y": 40,
              "id": 53
            },
            {
              "x": 3,
              "y": 41,
              "id": 53
            },
            {
              "x": 3,
              "y": 42,
              "id": 53
            },
            {
              "x": 3,
              "y": 43,
              "id": 53
            },
            {
              "x": 3,
              "y": 44,
              "id": 53
            },
            {
              "x": 3,
              "y": 45,
              "id": 53
            },
            {
              "x": 3,
              "y": 46,
              "id": 53
            },
            {
              "x": 3,
              "y": 47,
              "id": 53
            },
            {
              "x": 3,
              "y": 48,
              "id": 53
            },
            {
              "x": 3,
              "y": 49,
              "id": 53
            },
            {
              "x": 3,
              "y": 50,
              "id": 53
            },
            {
              "x": 3,
              "y": 51,
              "id": 53
            },
            {
              "x": 3,
              "y": 52,
              "id": 53
            },
            {
              "x": 3,
              "y": 53,
              "id": 53
            },
            {
              "x": 3,
              "y": 54,
              "id": 53
            },
            {
              "x": 3,
              "y": 55,
              "id": 53
            },
            {
              "x": 4,
              "y": 30,
              "id": 53
            },
            {
              "x": 5,
              "y": 30,
              "id": 53
            },
            {
              "x": 5,
              "y": 46,
              "id": 53
            },
            {
              "x": 6,
              "y": 30,
              "id": 53
            },
            {
              "x": 7,
              "y": 6,
              "id": 53
            },
            {
              "x": 7,
              "y": 7,
              "id": 53
            },
            {
              "x": 7,
              "y": 8,
              "id": 53
            },
            {
              "x": 7,
              "y": 9,
              "id": 53
            },
            {
              "x": 7,
              "y": 10,
              "id": 53
            },
            {
              "x": 7,
              "y": 11,
              "id": 53
            },
            {
              "x": 7,
              "y": 12,
              "id": 53
            },
            {
              "x": 7,
              "y": 13,
              "id": 53
            },
            {
              "x": 7,
              "y": 14,
              "id": 53
            },
            {
              "x": 7,
              "y": 15,
              "id": 53
            },
            {
              "x": 7,
              "y": 16,
              "id": 53
            },
            {
              "x": 7,
              "y": 17,
              "id": 53
            },
            {
              "x": 7,
              "y": 18,
              "id": 53
            },
            {
              "x": 7,
              "y": 19,
              "id": 53
            },
            {
              "x": 7,
              "y": 20,
              "id": 53
            },
            {
              "x": 7,
              "y": 21,
              "id": 53
            },
            {
              "x": 7,
              "y": 22,
              "id": 53
            },
            {
              "x": 7,
              "y": 23,
              "id": 53
            },
            {
              "x": 7,
              "y": 24,
              "id": 53
            },
            {
              "x": 7,
              "y": 25,
              "id": 53
            },
            {
              "x": 7,
              "y": 26,
              "id": 53
            },
            {
              "x": 7,
              "y": 27,
              "id": 53
            },
            {
              "x": 7,
              "y": 28,
              "id": 53
            },
            {
              "x": 7,
              "y": 29,
              "id": 53
            },
            {
              "x": 7,
              "y": 30,
              "id": 53
            },
            {
              "x": 8,
              "y": 50,
              "id": 53
            },
            {
              "x": 12,
              "y": 45,
              "id": 53
            },
            {
              "x": 13,
              "y": 44,
              "id": 53
            },
            {
              "x": 15,
              "y": 49,
              "id": 53
            },
            {
              "x": 18,
              "y": 44,
              "id": 53
            },
            {
              "x": 18,
              "y": 45,
              "id": 53
            },
            {
              "x": 18,
              "y": 46,
              "id": 53
            },
            {
              "x": 18,
              "y": 47,
              "id": 53
            },
            {
              "x": 18,
              "y": 48,
              "id": 53
            },
            {
              "x": 18,
              "y": 49,
              "id": 53
            },
            {
              "x": 18,
              "y": 50,
              "id": 53
            },
            {
              "x": 18,
              "y": 51,
              "id": 53
            },
            {
              "x": 18,
              "y": 52,
              "id": 53
            },
            {
              "x": 18,
              "y": 53,
              "id": 53
            },
            {
              "x": 18,
              "y": 54,
              "id": 53
            },
            {
              "x": 18,
              "y": 55,
              "id": 53
            },
            {
              "x": 18,
              "y": 56,
              "id": 53
            },
            {
              "x": 19,
              "y": 22,
              "id": 53
            },
            {
              "x": 19,
              "y": 23,
              "id": 53
            },
            {
              "x": 19,
              "y": 24,
              "id": 53
            },
            {
              "x": 19,
              "y": 25,
              "id": 53
            },
            {
              "x": 19,
              "y": 32,
              "id": 53
            },
            {
              "x": 19,
              "y": 33,
              "id": 53
            },
            {
              "x": 19,
              "y": 34,
              "id": 53
            },
            {
              "x": 19,
              "y": 35,
              "id": 53
            },
            {
              "x": 19,
              "y": 36,
              "id": 53
            },
            {
              "x": 19,
              "y": 37,
              "id": 53
            },
            {
              "x": 19,
              "y": 42,
              "id": 53
            },
            {
              "x": 19,
              "y": 43,
              "id": 53
            },
            {
              "x": 19,
              "y": 44,
              "id": 53
            },
            {
              "x": 20,
              "y": 2,
              "id": 53
            },
            {
              "x": 20,
              "y": 3,
              "id": 53
            },
            {
              "x": 20,
              "y": 4,
              "id": 53
            },
            {
              "x": 20,
              "y": 5,
              "id": 53
            },
            {
              "x": 20,
              "y": 6,
              "id": 53
            },
            {
              "x": 20,
              "y": 7,
              "id": 53
            },
            {
              "x": 20,
              "y": 8,
              "id": 53
            },
            {
              "x": 20,
              "y": 9,
              "id": 53
            },
            {
              "x": 20,
              "y": 10,
              "id": 53
            },
            {
              "x": 20,
              "y": 11,
              "id": 53
            },
            {
              "x": 20,
              "y": 12,
              "id": 53
            },
            {
              "x": 20,
              "y": 13,
              "id": 53
            },
            {
              "x": 20,
              "y": 14,
              "id": 53
            },
            {
              "x": 20,
              "y": 15,
              "id": 53
            },
            {
              "x": 20,
              "y": 16,
              "id": 53
            },
            {
              "x": 20,
              "y": 17,
              "id": 53
            },
            {
              "x": 20,
              "y": 18,
              "id": 53
            },
            {
              "x": 20,
              "y": 19,
              "id": 53
            },
            {
              "x": 20,
              "y": 20,
              "id": 53
            },
            {
              "x": 20,
              "y": 21,
              "id": 53
            },
            {
              "x": 20,
              "y": 22,
              "id": 53
            },
            {
              "x": 20,
              "y": 33,
              "id": 53
            },
            {
              "x": 20,
              "y": 42,
              "id": 53
            }
          ]
        }
      ],
      "collisionLayers": [
        {
          "name": "Collision - bottom half",
          "positions": [],
          "collision": {
            "type": "bottom-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 64
          }
        },
        {
          "name": "Collision - Left Half",
          "positions": [],
          "collision": {
            "type": "left-half",
            "width": 64,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Right Half",
          "positions": [],
          "collision": {
            "type": "right-half",
            "width": 64,
            "height": 128,
            "offsetX": 64,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - Full",
          "positions": [
            {
              "x": 0,
              "y": 7,
              "id": 110
            },
            {
              "x": 0,
              "y": 31,
              "id": 110
            },
            {
              "x": 0,
              "y": 36,
              "id": 110
            },
            {
              "x": 1,
              "y": 3,
              "id": 110
            },
            {
              "x": 1,
              "y": 7,
              "id": 110
            },
            {
              "x": 1,
              "y": 31,
              "id": 110
            },
            {
              "x": 1,
              "y": 36,
              "id": 110
            },
            {
              "x": 2,
              "y": 3,
              "id": 110
            },
            {
              "x": 2,
              "y": 7,
              "id": 110
            },
            {
              "x": 2,
              "y": 31,
              "id": 110
            },
            {
              "x": 2,
              "y": 36,
              "id": 110
            },
            {
              "x": 3,
              "y": 3,
              "id": 110
            },
            {
              "x": 3,
              "y": 7,
              "id": 110
            },
            {
              "x": 3,
              "y": 31,
              "id": 110
            },
            {
              "x": 3,
              "y": 36,
              "id": 110
            },
            {
              "x": 3,
              "y": 37,
              "id": 110
            },
            {
              "x": 3,
              "y": 38,
              "id": 110
            },
            {
              "x": 3,
              "y": 39,
              "id": 110
            },
            {
              "x": 3,
              "y": 40,
              "id": 110
            },
            {
              "x": 3,
              "y": 41,
              "id": 110
            },
            {
              "x": 3,
              "y": 42,
              "id": 110
            },
            {
              "x": 3,
              "y": 43,
              "id": 110
            },
            {
              "x": 3,
              "y": 44,
              "id": 110
            },
            {
              "x": 3,
              "y": 45,
              "id": 110
            },
            {
              "x": 3,
              "y": 46,
              "id": 110
            },
            {
              "x": 3,
              "y": 47,
              "id": 110
            },
            {
              "x": 3,
              "y": 48,
              "id": 110
            },
            {
              "x": 3,
              "y": 49,
              "id": 110
            },
            {
              "x": 3,
              "y": 50,
              "id": 110
            },
            {
              "x": 3,
              "y": 51,
              "id": 110
            },
            {
              "x": 3,
              "y": 52,
              "id": 110
            },
            {
              "x": 3,
              "y": 53,
              "id": 110
            },
            {
              "x": 3,
              "y": 54,
              "id": 110
            },
            {
              "x": 3,
              "y": 55,
              "id": 110
            },
            {
              "x": 3,
              "y": 56,
              "id": 110
            },
            {
              "x": 3,
              "y": 57,
              "id": 110
            },
            {
              "x": 3,
              "y": 58,
              "id": 110
            },
            {
              "x": 3,
              "y": 59,
              "id": 110
            },
            {
              "x": 3,
              "y": 60,
              "id": 110
            },
            {
              "x": 3,
              "y": 61,
              "id": 110
            },
            {
              "x": 3,
              "y": 62,
              "id": 110
            },
            {
              "x": 3,
              "y": 63,
              "id": 110
            },
            {
              "x": 3,
              "y": 64,
              "id": 110
            },
            {
              "x": 3,
              "y": 65,
              "id": 110
            },
            {
              "x": 4,
              "y": 3,
              "id": 110
            },
            {
              "x": 4,
              "y": 7,
              "id": 110
            },
            {
              "x": 4,
              "y": 31,
              "id": 110
            },
            {
              "x": 4,
              "y": 51,
              "id": 110
            },
            {
              "x": 5,
              "y": 7,
              "id": 110
            },
            {
              "x": 5,
              "y": 31,
              "id": 110
            },
            {
              "x": 5,
              "y": 47,
              "id": 110
            },
            {
              "x": 6,
              "y": 0,
              "id": 110
            },
            {
              "x": 6,
              "y": 1,
              "id": 110
            },
            {
              "x": 6,
              "y": 5,
              "id": 110
            },
            {
              "x": 6,
              "y": 6,
              "id": 110
            },
            {
              "x": 6,
              "y": 7,
              "id": 110
            },
            {
              "x": 6,
              "y": 31,
              "id": 110
            },
            {
              "x": 7,
              "y": 0,
              "id": 110
            },
            {
              "x": 7,
              "y": 6,
              "id": 110
            },
            {
              "x": 7,
              "y": 7,
              "id": 110
            },
            {
              "x": 7,
              "y": 8,
              "id": 110
            },
            {
              "x": 7,
              "y": 9,
              "id": 110
            },
            {
              "x": 7,
              "y": 10,
              "id": 110
            },
            {
              "x": 7,
              "y": 11,
              "id": 110
            },
            {
              "x": 7,
              "y": 12,
              "id": 110
            },
            {
              "x": 7,
              "y": 13,
              "id": 110
            },
            {
              "x": 7,
              "y": 14,
              "id": 110
            },
            {
              "x": 7,
              "y": 15,
              "id": 110
            },
            {
              "x": 7,
              "y": 16,
              "id": 110
            },
            {
              "x": 7,
              "y": 17,
              "id": 110
            },
            {
              "x": 7,
              "y": 18,
              "id": 110
            },
            {
              "x": 7,
              "y": 19,
              "id": 110
            },
            {
              "x": 7,
              "y": 20,
              "id": 110
            },
            {
              "x": 7,
              "y": 21,
              "id": 110
            },
            {
              "x": 7,
              "y": 22,
              "id": 110
            },
            {
              "x": 7,
              "y": 23,
              "id": 110
            },
            {
              "x": 7,
              "y": 24,
              "id": 110
            },
            {
              "x": 7,
              "y": 25,
              "id": 110
            },
            {
              "x": 7,
              "y": 26,
              "id": 110
            },
            {
              "x": 7,
              "y": 27,
              "id": 110
            },
            {
              "x": 7,
              "y": 28,
              "id": 110
            },
            {
              "x": 7,
              "y": 29,
              "id": 110
            },
            {
              "x": 7,
              "y": 30,
              "id": 110
            },
            {
              "x": 7,
              "y": 31,
              "id": 110
            },
            {
              "x": 8,
              "y": 0,
              "id": 110
            },
            {
              "x": 8,
              "y": 8,
              "id": 110
            },
            {
              "x": 8,
              "y": 51,
              "id": 110
            },
            {
              "x": 9,
              "y": 0,
              "id": 110
            },
            {
              "x": 9,
              "y": 8,
              "id": 110
            },
            {
              "x": 9,
              "y": 12,
              "id": 110
            },
            {
              "x": 9,
              "y": 13,
              "id": 110
            },
            {
              "x": 9,
              "y": 35,
              "id": 110
            },
            {
              "x": 10,
              "y": 0,
              "id": 110
            },
            {
              "x": 10,
              "y": 8,
              "id": 110
            },
            {
              "x": 10,
              "y": 12,
              "id": 110
            },
            {
              "x": 10,
              "y": 13,
              "id": 110
            },
            {
              "x": 10,
              "y": 40,
              "id": 110
            },
            {
              "x": 10,
              "y": 41,
              "id": 110
            },
            {
              "x": 11,
              "y": 0,
              "id": 110
            },
            {
              "x": 11,
              "y": 8,
              "id": 110
            },
            {
              "x": 11,
              "y": 40,
              "id": 110
            },
            {
              "x": 11,
              "y": 41,
              "id": 110
            },
            {
              "x": 12,
              "y": 0,
              "id": 110
            },
            {
              "x": 12,
              "y": 46,
              "id": 110
            },
            {
              "x": 13,
              "y": 0,
              "id": 110
            },
            {
              "x": 13,
              "y": 1,
              "id": 110
            },
            {
              "x": 13,
              "y": 45,
              "id": 110
            },
            {
              "x": 14,
              "y": 0,
              "id": 110
            },
            {
              "x": 14,
              "y": 1,
              "id": 110
            },
            {
              "x": 15,
              "y": 0,
              "id": 110
            },
            {
              "x": 15,
              "y": 1,
              "id": 110
            },
            {
              "x": 15,
              "y": 50,
              "id": 110
            },
            {
              "x": 16,
              "y": 0,
              "id": 110
            },
            {
              "x": 16,
              "y": 8,
              "id": 110
            },
            {
              "x": 16,
              "y": 47,
              "id": 110
            },
            {
              "x": 17,
              "y": 0,
              "id": 110
            },
            {
              "x": 17,
              "y": 8,
              "id": 110
            },
            {
              "x": 17,
              "y": 16,
              "id": 110
            },
            {
              "x": 17,
              "y": 20,
              "id": 110
            },
            {
              "x": 17,
              "y": 21,
              "id": 110
            },
            {
              "x": 17,
              "y": 64,
              "id": 110
            },
            {
              "x": 18,
              "y": 0,
              "id": 110
            },
            {
              "x": 18,
              "y": 8,
              "id": 110
            },
            {
              "x": 18,
              "y": 20,
              "id": 110
            },
            {
              "x": 18,
              "y": 21,
              "id": 110
            },
            {
              "x": 18,
              "y": 24,
              "id": 110
            },
            {
              "x": 18,
              "y": 34,
              "id": 110
            },
            {
              "x": 18,
              "y": 44,
              "id": 110
            },
            {
              "x": 18,
              "y": 45,
              "id": 110
            },
            {
              "x": 18,
              "y": 46,
              "id": 110
            },
            {
              "x": 18,
              "y": 47,
              "id": 110
            },
            {
              "x": 18,
              "y": 48,
              "id": 110
            },
            {
              "x": 18,
              "y": 49,
              "id": 110
            },
            {
              "x": 18,
              "y": 50,
              "id": 110
            },
            {
              "x": 18,
              "y": 51,
              "id": 110
            },
            {
              "x": 18,
              "y": 52,
              "id": 110
            },
            {
              "x": 18,
              "y": 53,
              "id": 110
            },
            {
              "x": 18,
              "y": 54,
              "id": 110
            },
            {
              "x": 18,
              "y": 55,
              "id": 110
            },
            {
              "x": 18,
              "y": 56,
              "id": 110
            },
            {
              "x": 18,
              "y": 57,
              "id": 110
            },
            {
              "x": 18,
              "y": 58,
              "id": 110
            },
            {
              "x": 18,
              "y": 59,
              "id": 110
            },
            {
              "x": 18,
              "y": 60,
              "id": 110
            },
            {
              "x": 18,
              "y": 61,
              "id": 110
            },
            {
              "x": 18,
              "y": 62,
              "id": 110
            },
            {
              "x": 18,
              "y": 63,
              "id": 110
            },
            {
              "x": 18,
              "y": 64,
              "id": 110
            },
            {
              "x": 19,
              "y": 0,
              "id": 110
            },
            {
              "x": 19,
              "y": 1,
              "id": 110
            },
            {
              "x": 19,
              "y": 2,
              "id": 110
            },
            {
              "x": 19,
              "y": 8,
              "id": 110
            },
            {
              "x": 19,
              "y": 22,
              "id": 110
            },
            {
              "x": 19,
              "y": 23,
              "id": 110
            },
            {
              "x": 19,
              "y": 24,
              "id": 110
            },
            {
              "x": 19,
              "y": 25,
              "id": 110
            },
            {
              "x": 19,
              "y": 26,
              "id": 110
            },
            {
              "x": 19,
              "y": 33,
              "id": 110
            },
            {
              "x": 19,
              "y": 34,
              "id": 110
            },
            {
              "x": 19,
              "y": 35,
              "id": 110
            },
            {
              "x": 19,
              "y": 36,
              "id": 110
            },
            {
              "x": 19,
              "y": 37,
              "id": 110
            },
            {
              "x": 19,
              "y": 38,
              "id": 110
            },
            {
              "x": 19,
              "y": 42,
              "id": 110
            },
            {
              "x": 19,
              "y": 43,
              "id": 110
            },
            {
              "x": 19,
              "y": 44,
              "id": 110
            },
            {
              "x": 19,
              "y": 45,
              "id": 110
            },
            {
              "x": 19,
              "y": 61,
              "id": 110
            },
            {
              "x": 19,
              "y": 62,
              "id": 110
            },
            {
              "x": 19,
              "y": 64,
              "id": 110
            },
            {
              "x": 20,
              "y": 0,
              "id": 110
            },
            {
              "x": 20,
              "y": 1,
              "id": 110
            },
            {
              "x": 20,
              "y": 2,
              "id": 110
            },
            {
              "x": 20,
              "y": 3,
              "id": 110
            },
            {
              "x": 20,
              "y": 4,
              "id": 110
            },
            {
              "x": 20,
              "y": 5,
              "id": 110
            },
            {
              "x": 20,
              "y": 6,
              "id": 110
            },
            {
              "x": 20,
              "y": 7,
              "id": 110
            },
            {
              "x": 20,
              "y": 8,
              "id": 110
            },
            {
              "x": 20,
              "y": 9,
              "id": 110
            },
            {
              "x": 20,
              "y": 10,
              "id": 110
            },
            {
              "x": 20,
              "y": 11,
              "id": 110
            },
            {
              "x": 20,
              "y": 12,
              "id": 110
            },
            {
              "x": 20,
              "y": 13,
              "id": 110
            },
            {
              "x": 20,
              "y": 14,
              "id": 110
            },
            {
              "x": 20,
              "y": 15,
              "id": 110
            },
            {
              "x": 20,
              "y": 16,
              "id": 110
            },
            {
              "x": 20,
              "y": 17,
              "id": 110
            },
            {
              "x": 20,
              "y": 18,
              "id": 110
            },
            {
              "x": 20,
              "y": 19,
              "id": 110
            },
            {
              "x": 20,
              "y": 20,
              "id": 110
            },
            {
              "x": 20,
              "y": 21,
              "id": 110
            },
            {
              "x": 20,
              "y": 22,
              "id": 110
            },
            {
              "x": 20,
              "y": 23,
              "id": 110
            },
            {
              "x": 20,
              "y": 24,
              "id": 110
            },
            {
              "x": 20,
              "y": 25,
              "id": 110
            },
            {
              "x": 20,
              "y": 26,
              "id": 110
            },
            {
              "x": 20,
              "y": 31,
              "id": 110
            },
            {
              "x": 20,
              "y": 32,
              "id": 110
            },
            {
              "x": 20,
              "y": 33,
              "id": 110
            },
            {
              "x": 20,
              "y": 34,
              "id": 110
            },
            {
              "x": 20,
              "y": 35,
              "id": 110
            },
            {
              "x": 20,
              "y": 36,
              "id": 110
            },
            {
              "x": 20,
              "y": 37,
              "id": 110
            },
            {
              "x": 20,
              "y": 38,
              "id": 110
            },
            {
              "x": 20,
              "y": 42,
              "id": 110
            },
            {
              "x": 20,
              "y": 43,
              "id": 110
            },
            {
              "x": 20,
              "y": 44,
              "id": 110
            },
            {
              "x": 20,
              "y": 45,
              "id": 110
            },
            {
              "x": 20,
              "y": 46,
              "id": 110
            },
            {
              "x": 20,
              "y": 47,
              "id": 110
            },
            {
              "x": 20,
              "y": 48,
              "id": 110
            },
            {
              "x": 20,
              "y": 49,
              "id": 110
            },
            {
              "x": 20,
              "y": 50,
              "id": 110
            },
            {
              "x": 20,
              "y": 51,
              "id": 110
            },
            {
              "x": 20,
              "y": 52,
              "id": 110
            },
            {
              "x": 20,
              "y": 53,
              "id": 110
            },
            {
              "x": 20,
              "y": 54,
              "id": 110
            },
            {
              "x": 20,
              "y": 55,
              "id": 110
            },
            {
              "x": 20,
              "y": 56,
              "id": 110
            },
            {
              "x": 20,
              "y": 57,
              "id": 110
            },
            {
              "x": 20,
              "y": 58,
              "id": 110
            },
            {
              "x": 20,
              "y": 59,
              "id": 110
            },
            {
              "x": 20,
              "y": 60,
              "id": 110
            },
            {
              "x": 20,
              "y": 61,
              "id": 110
            },
            {
              "x": 20,
              "y": 62,
              "id": 110
            },
            {
              "x": 20,
              "y": 63,
              "id": 110
            },
            {
              "x": 20,
              "y": 64,
              "id": 110
            }
          ],
          "collision": {
            "type": "full",
            "width": 128,
            "height": 128,
            "offsetX": 0,
            "offsetY": 0
          }
        },
        {
          "name": "Collision - top half",
          "positions": [
            {
              "x": 0,
              "y": 0,
              "id": 110
            },
            {
              "x": 1,
              "y": 0,
              "id": 110
            },
            {
              "x": 1,
              "y": 4,
              "id": 110
            },
            {
              "x": 2,
              "y": 4,
              "id": 110
            },
            {
              "x": 3,
              "y": 4,
              "id": 110
            },
            {
              "x": 4,
              "y": 4,
              "id": 110
            }
          ],
          "collision": {
            "type": "top-half",
            "width": 128,
            "height": 64,
            "offsetX": 0,
            "offsetY": 0
          }
        }
      ],
      "transitions": [],
      "interactions": [],
      "wildSpawns": []
    }
  },
  "mapMetadata": {
    "bougainvillea-town": {
      "mapId": "bougainvillea-town",
      "displayName": "Bougainvillea Town",
      "isTown": true,
      "safezone": true,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "bougainvillea-to-lily-south",
          "x": 1536,
          "y": 1152,
          "width": 512,
          "height": 128,
          "targetMapId": "route-2",
          "targetSpawn": {
            "x": 1856,
            "y": 192
          }
        },
        {
          "id": "bougainvillea-to-route2-west",
          "x": 0,
          "y": 384,
          "width": 128,
          "height": 512,
          "targetMapId": "route-3",
          "targetSpawn": {
            "x": 2624,
            "y": 3776
          }
        }
      ],
      "interactions": [],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    },
    "camelia-ranch": {
      "mapId": "camelia-ranch",
      "displayName": "Camelia Ranch",
      "isTown": true,
      "safezone": true,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "camelia-to-route2-east",
          "x": 1792,
          "y": 1152,
          "width": 128,
          "height": 384,
          "targetMapId": "route-3",
          "targetSpawn": {
            "x": 960,
            "y": 448
          }
        }
      ],
      "interactions": [],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    },
    "jasmine-bay": {
      "mapId": "jasmine-bay",
      "displayName": "Jasmine Bay",
      "isTown": true,
      "safezone": true,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "transition-1",
          "x": 2176,
          "y": 512,
          "width": 128,
          "height": 512,
          "targetMapId": "route-1",
          "targetSpawn": {
            "x": 64,
            "y": 960
          }
        },
        {
          "id": "jasmine-to-route3",
          "x": 1408,
          "y": 0,
          "width": 512,
          "height": 128,
          "targetMapId": "route-3",
          "targetSpawn": {
            "x": 1088,
            "y": 8384
          }
        }
      ],
      "interactions": [],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    },
    "lily-harbor": {
      "mapId": "lily-harbor",
      "displayName": "Lily Harbor",
      "isTown": true,
      "safezone": true,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "lily-to-route2-south",
          "x": 1536,
          "y": 0,
          "width": 512,
          "height": 128,
          "targetMapId": "route-2",
          "targetSpawn": {
            "x": 1856,
            "y": 1600
          }
        },
        {
          "id": "lily-to-route1",
          "x": 1536,
          "y": 2304,
          "width": 512,
          "height": 128,
          "targetMapId": "route-1",
          "targetSpawn": {
            "x": 2752,
            "y": 64
          }
        }
      ],
      "interactions": [
        {
          "id": "interaction-1",
          "type": "healing-center",
          "x": 2432,
          "y": 896,
          "width": 256,
          "height": 128,
          "label": "New Interaction",
          "text": "Heal your party. ",
          "data": {
            "shopId": "",
            "arenaId": "",
            "crestId": ""
          }
        },
        {
          "id": "Lily-Harbor-Arena",
          "type": "arena",
          "x": 1664,
          "y": 896,
          "width": 256,
          "height": 128,
          "label": "Lily Harbor Arena",
          "text": "Add interaction text here.",
          "data": {
            "shopId": "",
            "arenaId": "Lily-Harbor-Arena",
            "crestId": ""
          }
        }
      ],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    },
    "plumeria-shores": {
      "mapId": "plumeria-shores",
      "displayName": "Plumeria Shores",
      "isTown": true,
      "safezone": true,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "Plumeria-to-route1",
          "x": 1408,
          "y": 0,
          "width": 640,
          "height": 128,
          "targetMapId": "route-1",
          "targetSpawn": {
            "x": 2880,
            "y": 1600
          }
        }
      ],
      "interactions": [],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    },
    "route-1": {
      "mapId": "route-1",
      "displayName": "Route 1",
      "isTown": false,
      "safezone": false,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "route1-lilyharbor",
          "x": 2560,
          "y": 0,
          "width": 512,
          "height": 128,
          "targetMapId": "lily-harbor",
          "targetSpawn": {
            "x": 1856,
            "y": 2368
          }
        },
        {
          "id": "route1-to-plumeria",
          "x": 2560,
          "y": 1536,
          "width": 640,
          "height": 128,
          "targetMapId": "plumeria-shores",
          "targetSpawn": {
            "x": 1728,
            "y": 64
          }
        },
        {
          "id": "route1-to-jasmine",
          "x": 0,
          "y": 768,
          "width": 128,
          "height": 512,
          "targetMapId": "jasmine-bay",
          "targetSpawn": {
            "x": 2112,
            "y": 832
          }
        },
        {
          "id": "route1-to-route3",
          "x": 0,
          "y": 0,
          "width": 128,
          "height": 128,
          "targetMapId": "route-3",
          "targetSpawn": {
            "x": 1856,
            "y": 8128
          }
        }
      ],
      "interactions": [],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    },
    "route-2": {
      "mapId": "route-2",
      "displayName": "Route 2",
      "isTown": false,
      "safezone": false,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "route2-to-bougainvillea",
          "x": 1536,
          "y": 0,
          "width": 512,
          "height": 128,
          "targetMapId": "bougainvillea-town",
          "targetSpawn": {
            "x": 1856,
            "y": 1088
          }
        },
        {
          "id": "route2-to-lilyharbor",
          "x": 1536,
          "y": 1664,
          "width": 512,
          "height": 128,
          "targetMapId": "lily-harbor",
          "targetSpawn": {
            "x": 1856,
            "y": 192
          }
        },
        {
          "id": "route2-to-route3",
          "x": 0,
          "y": 768,
          "width": 128,
          "height": 384,
          "targetMapId": "route-3",
          "targetSpawn": {
            "x": 2496,
            "y": 5184
          }
        }
      ],
      "interactions": [],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [
            {
              "id": "spawn-1",
              "speciesId": "Pawlit",
              "spawnChance": 100,
              "x": 1216,
              "y": 1216,
              "levelMin": 2,
              "levelMax": 4,
              "respawnSeconds": 120,
              "monsterOptions": [
                {
                  "speciesId": "Pawlit",
                  "weight": 50,
                  "variantId": "default"
                },
                {
                  "speciesId": "Pawlit",
                  "weight": 50,
                  "variantId": "Grass"
                }
              ]
            },
            {
              "id": "spawn-2",
              "speciesId": "Pawlit",
              "spawnChance": 100,
              "x": 2368,
              "y": 704,
              "levelMin": 2,
              "levelMax": 4,
              "respawnSeconds": 120,
              "monsterOptions": [
                {
                  "speciesId": "Pawlit",
                  "weight": 50,
                  "variantId": "default"
                },
                {
                  "speciesId": "Pawlit",
                  "weight": 60,
                  "variantId": "Lilac"
                }
              ]
            }
          ],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    },
    "route-3": {
      "mapId": "route-3",
      "displayName": "Route 3",
      "isTown": false,
      "safezone": false,
      "collisionGrid": 64,
      "transitions": [
        {
          "id": "route3-to-camelia",
          "x": 896,
          "y": 256,
          "width": 128,
          "height": 384,
          "targetMapId": "camelia-ranch",
          "targetSpawn": {
            "x": 1728,
            "y": 1344
          }
        },
        {
          "id": "route3-to-roue1",
          "x": 1536,
          "y": 8320,
          "width": 640,
          "height": 128,
          "targetMapId": "route-1",
          "targetSpawn": {
            "x": 320,
            "y": 192
          }
        },
        {
          "id": "route3-to-jasminebay",
          "x": 896,
          "y": 8320,
          "width": 512,
          "height": 128,
          "targetMapId": "jasmine-bay",
          "targetSpawn": {
            "x": 1728,
            "y": 192
          }
        },
        {
          "id": "route3-route2",
          "x": 2432,
          "y": 4992,
          "width": 128,
          "height": 384,
          "targetMapId": "route-2",
          "targetSpawn": {
            "x": 192,
            "y": 960
          }
        }
      ],
      "interactions": [],
      "spawnZones": [
        {
          "id": "default-zone",
          "label": "Default Zone",
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
          },
          "visibleSpawns": [
            {
              "id": "spawn-1",
              "speciesId": "equira",
              "spawnChance": 100,
              "x": 1600,
              "y": 1856,
              "levelMin": 2,
              "levelMax": 4,
              "respawnSeconds": 120,
              "monsterOptions": [
                {
                  "speciesId": "equira",
                  "weight": 60
                },
                {
                  "speciesId": "equira",
                  "weight": 40,
                  "variantId": "snow"
                }
              ]
            },
            {
              "id": "spawn-2",
              "speciesId": "equira",
              "spawnChance": 100,
              "x": 2112,
              "y": 3520,
              "levelMin": 2,
              "levelMax": 4,
              "respawnSeconds": 120,
              "monsterOptions": [
                {
                  "speciesId": "equira",
                  "weight": 29,
                  "variantId": "Glam"
                },
                {
                  "speciesId": "fluffram",
                  "weight": 30,
                  "variantId": "glam"
                },
                {
                  "speciesId": "fluffram",
                  "weight": 30,
                  "variantId": "default"
                }
              ]
            }
          ],
          "spawnTable": []
        }
      ],
      "trainers": [],
      "mapMonstersPanel": []
    }
  }
};
