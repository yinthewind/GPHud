import { HandRecordParser } from './handRecordParser';

const DEFAULT_INPUT = {
  id: 1572835265533,
  stake: '0.25/0.5',
  timestamp: 123,
  table: 'Marysville',
  seats: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
  button: 1,
  playerId: 'p1',
  hole_cards: ['Ac', '8d'],
  preflop_actions: [
    { type: 'playerAction', action: 'Small Blind', actionAmount: 0.25, player: 'p3', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Big Blind', actionAmount: 0.5, player: 'p4', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Fold', actionAmount: 0, player: 'p5', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Raise', actionAmount: 1.5, player: 'p6', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Call', actionAmount: 1.5, player: 'p1', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Raise', actionAmount: 4.5, player: 'p2', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Fold', actionAmount: 1.5, player: 'p3', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Fold', actionAmount: 1.5, player: 'p4', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Call', actionAmount: 4.5, player: 'p6', seatBalance: 58.59 },
    { type: 'playerAction', action: 'Fold', actionAmount: 4.5, player: 'p1', seatBalance: 58.59 },
  ],
  flop: ['Ad', 'Td', '2d'],
  flop_actions: [],
  turn: [],
  turn_actions: [],
  river: [],
  river_actions: [],
  showdown: [],
  summary: [],
};

const DEFAULT_OUTPUT = {
  'p1': {
    playerId: 'p1',
    handsCount: 1,
    vpip: 1,
    pfr: 0,
    pf3b: 0,
    pf4b: 0
  },
  'p2': {
    playerId: 'p2',
    handsCount: 1,
    vpip: 1,
    pfr: 1,
    pf3b: 1,
    pf4b: 0
  },
  'p3': {
    playerId: 'p3',
    handsCount: 1,
    vpip: 0,
    pfr: 0,
    pf3b: 0,
    pf4b: 0
  },
  'p4': {
    playerId: 'p4',
    handsCount: 1,
    vpip: 0,
    pfr: 0,
    pf3b: 0,
    pf4b: 0
  },
  'p5': {
    playerId: 'p5',
    handsCount: 1,
    vpip: 0,
    pfr: 0,
    pf3b: 0,
    pf4b: 0
  },
  'p6': {
    playerId: 'p6',
    handsCount: 1,
    vpip: 1,
    pfr: 1,
    pf3b: 0,
    pf4b: 0
  }
};

describe('handRecordParser unit test', () => {
  let handRecordParser;
  beforeEach(() => {
    handRecordParser = new HandRecordParser();
  });

  test('parseHandRecord should return correct stats', () => {
    expect(handRecordParser.parseHandRecord(DEFAULT_INPUT)).toEqual(DEFAULT_OUTPUT);
  });

  test('parseAllHandRecords should return correct stats', () => {
    expect(handRecordParser.parseAllHandRecords([DEFAULT_INPUT, DEFAULT_INPUT])).toEqual({
      'p1': {
        playerId: 'p1',
        handsCount: 2,
        vpip: 2,
        pfr: 0,
        pf3b: 0,
        pf4b: 0
      },
      'p2': {
        playerId: 'p2',
        handsCount: 2,
        vpip: 2,
        pfr: 2,
        pf3b: 2,
        pf4b: 0
      },
      'p3': {
        playerId: 'p3',
        handsCount: 2,
        vpip: 0,
        pfr: 0,
        pf3b: 0,
        pf4b: 0
      },
      'p4': {
        playerId: 'p4',
        handsCount: 2,
        vpip: 0,
        pfr: 0,
        pf3b: 0,
        pf4b: 0
      },
      'p5': {
        playerId: 'p5',
        handsCount: 2,
        vpip: 0,
        pfr: 0,
        pf3b: 0,
        pf4b: 0
      },
      'p6': {
        playerId: 'p6',
        handsCount: 2,
        vpip: 2,
        pfr: 2,
        pf3b: 0,
        pf4b: 0
      }
    });
  });
});
