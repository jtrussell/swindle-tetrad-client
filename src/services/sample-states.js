/**
 * Game
 *  - id?: Game id when one has been assigned
 *  - players: Players[] with length 0-2
 *  - decks: hash of all decks referenced by player properties
 *  - isThinking: boolean - loading, working, whatever
 *  - message: string
 *
 * Player:
 *  - name: string
 *  - recoveryKey: key to recover game as this player with a new connection
 *  - ban?: deck id
 *  - safe?: deck id
 *  - steal?: deck id
 *  - deck1?: deck id
 *  - deck2?: deck id
 *  - deck3?: deck id
 *  - decks: array of deck ids with length 4
 */

const EMPTY = {}

const BAN_SAFE_STEAL = {
  id: '73ef23ad-5628-4942-ba47-11fc57907d43',
  players: [
    {
      name: 'jtrussell',
      ban: null,
      safe: null,
      steal: null,
      decks: [
        '4477f8cd-b7f7-40c0-acd5-eb2216a7d100',
        '5763813a-ad47-4d21-a83a-777250d84ba2',
        '02b05327-a93c-4888-ae26-8e6b96a772b2',
        '3af99c32-8e4d-41cc-89be-6f4f621e75cb',
      ],
    },
    {
      name: 'wilki',
      ban: null,
      safe: null,
      steal: null,
      decks: [
        '55f91cd7-b7f5-4374-94ef-672367de8e7b',
        '51d2cd8f-aa74-4a9f-9b33-d4a4da9afb39',
        '7e4794d7-2740-41f6-a66b-cbd95d3b4821',
        '5fd54c25-62b3-4a27-a0b0-ae2da6c86d38',
      ],
    },
  ],
  decks: {
    '4477f8cd-b7f7-40c0-acd5-eb2216a7d100': {
      name: 'Prince Kleptogamer Berardi',
      id: '4477f8cd-b7f7-40c0-acd5-eb2216a7d100',
      expansion: 'Worlds Collide',
      houses: ['logos', 'saurian', 'staralliance'],
    },
    '5763813a-ad47-4d21-a83a-777250d84ba2': {
      name: 'T. Zaiger, the Lighthouse Doc',
      id: '5763813a-ad47-4d21-a83a-777250d84ba2',
      expansion: 'Mass Mutation',
      houses: ['dis', 'logos', 'staralliance'],
    },
    '02b05327-a93c-4888-ae26-8e6b96a772b2': {
      name: "Ms. Dranzed d'Cassel",
      id: '02b05327-a93c-4888-ae26-8e6b96a772b2',
      expansion: 'Worlds Collide',
      houses: ['logos', 'saurian', 'staralliance'],
    },
    '3af99c32-8e4d-41cc-89be-6f4f621e75cb': {
      name: 'Lightstint, the "Nurse" of Protection',
      id: '3af99c32-8e4d-41cc-89be-6f4f621e75cb',
      expansion: 'Worlds Collide',
      houses: ['logos', 'saurian', 'staralliance'],
    },
    '55f91cd7-b7f5-4374-94ef-672367de8e7b': {
      name: 'Jerusza, Szachrajka Poematu',
      id: '55f91cd7-b7f5-4374-94ef-672367de8e7b',
      expansion: 'Call of the Archons',
      houses: ['brobnar', 'dis', 'shadows'],
    },
    '51d2cd8f-aa74-4a9f-9b33-d4a4da9afb39': {
      name: "Brikblade of the Commander's Guildhall",
      id: '51d2cd8f-aa74-4a9f-9b33-d4a4da9afb39',
      expansion: 'Worlds Collide',
      houses: ['saurian', 'staralliance', 'untamed'],
    },
    '7e4794d7-2740-41f6-a66b-cbd95d3b4821': {
      name: 'I. Murphy, the Precinct Shielder',
      id: '7e4794d7-2740-41f6-a66b-cbd95d3b4821',
      expansion: 'Worlds Collide',
      houses: ['logos', 'saurian', 'staralliance'],
    },
    '5fd54c25-62b3-4a27-a0b0-ae2da6c86d38': {
      name: 'Robotyczny Andrzej z Głogowa',
      id: '5fd54c25-62b3-4a27-a0b0-ae2da6c86d38',
      expansion: 'Worlds Collide',
      houses: ['saurian', 'shadows', 'staralliance'],
    },
  },
}

export { EMPTY, BAN_SAFE_STEAL }
