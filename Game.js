const Card = require('./Card.js')
const Deck = require('./Deck.js')
const Player = require('./Player.js')
const Pot = require('./Pot.js')

class Game {
	constructor(player1, player2, rounds) {
		this.player1 = new Player(player1)
		this.player2 = new Player(player2)
		this.rounds = rounds
		this.deck = new Deck()
		this.pot = new Pot()
		this.roundNumber = 0
	}

	_compare(card1, card2) {
		const value1 = card1.rank.value === 1 ? 14 : card1.rank.value
		const value2 = card2.rank.value === 1 ? 14 : card2.rank.value
		return value2 - value1
	}

	_battle() {
		let contender1 = this.player1.playCard()
		let contender2 = this.player2.playCard()
		console.log('ROUND NUMBER: ' + this.roundNumber)
		console.log('..................')
		console.log('')
		console.log('PLAYER 1:')
		this.player1.battleCard.printCard()
		console.log('PLAYER 2:')
		this.player2.battleCard.printCard()
		const result = this._compare(this.player1.battleCard, this.player2.battleCard)
		if (result < 0) {
			console.log('PLAYER 1 WINS!')
			console.log('')
			this.player1.winBattle(this.player2.battleCard, this.pot.cards)
			this.pot.reset()
		} else if (result > 0) {
			console.log('PLAYER 2 WINS!')
			console.log('')
			this.player2.winBattle(this.player1.battleCard, this.pot.cards)
			this.pot.reset()
		} else {
			console.log('TIE!')
			console.log('')
			this.player1.tie(this.pot)
			this.player2.tie(this.pot)
		}
		console.log('SUMMARY:')
		console.log('P1 Cards: ', this.player1.cards.length)
		console.log('P2 Cards: ', this.player2.cards.length)
		console.log('Pot Cards: ', this.pot.cards.length)
		console.log('Sum: ', this.player1.cards.length + this.player2.cards.length + this.pot.cards.length)
		console.log('')
		console.log('')
	}

	_getWinner() {
		if (this.player1.cards.length > this.player2.cards.length) {
			return this.player1.name
		} else if (this.player1.cards.length < this.player2.cards.length) {
			return this.player2.name
		} else {
			return 'Tie!'
		}
	}

	play() {
		this.deck.shuffle()
		this.deck.deal([this.player1, this.player2])
		if (this.rounds) {
			while (this.rounds !== 0 || (this.player1.cards.length && this.player2.cards.length)) {
				this.roundNumber++
				this._battle()
				this.rounds -= 1
			}
		} else {
			while (this.player1.cards.length && this.player2.cards.length) {
				this.roundNumber++
				this._battle()
			}
		}
		return this._getWinner()
	}
}

module.exports = Game
