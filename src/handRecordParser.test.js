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
    { action: 'SMALL_BLIND', amount: 0.25, playerId: 'p3', balanceAfterAction: 58.59 },
    { action: 'BIG_BLIND', amount: 0.5, playerId: 'p4', balanceAfterAction: 58.59 },
    { action: 'FOLD', amount: 0, playerId: 'p5', balanceAfterAction: 58.59 },
    { action: 'RAISE', amount: 1.5, playerId: 'p6', balanceAfterAction: 58.59 },
    { action: 'CALL', amount: 1.5, playerId: 'p1', balanceAfterAction: 58.59 },
    { action: 'RAISE', amount: 4.5, playerId: 'p2', balanceAfterAction: 58.59 },
    { action: 'FOLD', amount: 1.5, playerId: 'p3', balanceAfterAction: 58.59 },
    { action: 'FOLD', amount: 1.5, playerId: 'p4', balanceAfterAction: 58.59 },
    { action: 'CALL', amount: 4.5, playerId: 'p6', balanceAfterAction: 58.59 },
    { action: 'FOLD', amount: 4.5, playerId: 'p1', balanceAfterAction: 58.59 },
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
