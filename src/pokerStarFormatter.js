'use strict';

import { Hand } from './handRecord.js';

class PokerStartFormatter {
	convert(hand) => {
		let texts = [
			getContext(hand),
			getPreflopActions(hand),
			getFlopActions(hand),
			getTurnActions(hand),
			getRiverActions(hand),
			getShowdown(hand),
			getSummary(hand),
		];

		return texts.join('\n');
	}


	getContext(hand) {
		/*
			PokerStars Game #1572222637254:  Hold'em No Limit ($0.25/$0.5 USD) - 2019/10/27 20:30:37 ET
			Table 'Rancho Cucamonga 40-100 bb' 6-max Seat #5 is the button
			Seat 1: YintheWind ($81.6 in chips)
			Seat 2: Player#7253 ($75.67 in chips)
			Seat 3: Player#7718 ($85.01 in chips)
			Seat 4: Player#8214 ($31.05 in chips)
			Seat 5: Player#3879 ($60.63 in chips)
			Seat 6: Player#3286 ($104.3 in chips)
			Player#3286: posts small blind $0.25
			YintheWind: posts big blind $0.5
		*/

		let output = (handId, sb, bb, date, tName, buyIn, tSize, button, seats) => {
			let headline = (handId, sb, bb, date) => {
				return 'PokerStars Game #' + handId + ':  Hold\'em No Limit ($' + sb + '/$' + bb + 'USD) - ' + date;
			}
			let tableInfo = (name, buyIn, size, button) => {
				return 'Table \'' + name + ' ' + buyIn+ ' bb\' ' + size + '-max Seat #' + btn + ' is the button';
			}
			let seatInfo = (id, player, stack) => {
				return 'Seat ' + id + ': ' + player + '($' + stack + ' in chips)';
			}
			let postBlinds = (name, type, size) => {
				return name + ': posts' + type + ' blind $' + size;
			}
			return [
				headline(handId, sb, bb, date),
				tableInfo(name, buyIn, size, button),
			].concat(
				seats.map((seat) => {
					return seatInfo(seat.id, seat.player, seat.stack)
				})
			).concat([
				// recall some cases there'll be missing sb or bb or dead + bb
				postBlinds(seats[0].player, 'small', sb),
				postBlinds(seats[1].player, 'big', bb),
			]).join('\n');
		}
	}

	getPreflopActions(hand) {
		/*
			*** HOLE CARDS ***
			Dealt to YintheWind [4h 3d]
			Player#7253: raises $1.00 to $1.5
			Player#7718: folds
			Player#8214: folds
			Player#3879: calls $1.5
			Player#3286: calls $1.25
			YintheWind: folds
		*/
		let output() => {
			let separator = () => {
				return '*** HOLE CARDS ***';
			}
			let holdCardsInfo = (player, cards) => {
				return 'Dealt to ' + player + ' ' + cards;
			}

			return [
				separator(),
				holdCardsInfo(player, cards),
			}.concat(
				playerActions.map((action) => {
					playerActionInfo(action)
				})
			).join('\n');
		}
	}

	getFlopActions(hand) {
		/*
			*** FLOP *** [5s 2s 5c]
			Player#3286: checks
			Player#7253: bets $2.5
			Player#3879: folds
			Player#3286: calls $2.5
		*/

		let output = () => {
			let separator = (cards) => {
				return '*** FLOP *** ' + cards;
			}
			return [
				separator(flopCards),
			].concat(
				playerActions.map((action) => {
					playerActionInfo(action)
				})
			).join('\n');
		}
	}

	getTurnActions(hand) {
		/*
			*** TURN *** [5s 2s 5c] [7d]
			Player#3286: checks
			Player#7253: checks
		*/

		let output = () => {
			let separator = (flopCards, turnCard) => {
				return '*** TURN *** ' + flopCards + ' ' + turnCard;
			}
			return [
				separator(flopCards, turnCard),
			].concat(
				playerActions.map((action) => {
					playerActionInfo(action)
				})
			).join('\n');
		}
	}

	getRiverActions(hand) {
		/*
			*** RIVER *** [5s 2s 5c] [7d] [4c]
			Player#3286: bets $5
			Player#7253: folds
		*/
		let output = () => {
			let separator = (flopCards, turnCard, riverCard) => {
				return '*** RIVER *** ' + flopCards + ' ' + turnCard + ' ' + riverCard;
			}
			return [
				separator(flopCards, turnCard, riverCard),
			].concat(
				playerActions.map((action) => {
					playerActionInfo(action)
				})
			).join('\n');
		}
	}

	getShowdown(hand) {
		/*
			*** SHOW DOWN ***
			Player#3286 collected $9.5 from pot
		*/
		let output = () => {
			let separator = () => {
				return '*** SHOW DOWN ***'
			}
			let showdownInfo = (winner, amount) => {
				return winner + ' collected $' + amount + ' from pot';
			}
			return [
				separator(),
				// side pot cases
				showdownInfo(winner, amout)
			].join('\n');
		}
	}

	getSummary(hand) {
		/*
			*** SUMMARY ***
			Total pot $10.00. | Rake $0.5
			Board [5s 2s 5c 7d 4c]
			Seat 6: Player#3286 won ($9.5) with a hand
			Seat 5: Player#3879 folded
			Seat 2: Player#7253 folded
			Seat 3: Player#7718 folded
			Seat 4: Player#8214 folded
			Seat 1: YintheWind folded
		*/

		let output = () => {
			let separator = () => {
				return '*** SUMMARY ***';
			}
			let potInfo = (potSize, rake) => {
				return 'Total pot $' + potSize + '. | Rake $' + rake;
			}
			let boardInfo = (flopCards, turnCards, riverCards) => {
				return 'Board ' + flopCards.concat(turnCards, riverCards);
			}
			return [
				separator(),
				potInfo(potSize, rake),
				boardInfo(flopCards, turnCards, riverCards),
			}.concat(
				playerSummary(),
			).join('\n');
		}
	}
}
