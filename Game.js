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
		const rank1 = card1.rank === 1 ? 14 : card1.rank
		const rank2 = card2.rank === 1 ? 14 : card2.rank
		return rank2 - rank1
	}

	_battle() {
		let contender1 = this.player1.playCard()
		let contender2 = this.player2.playCard()
		const result = this._compare(this.player1.battleCard, this.player2.battleCard)
		if (result < 0) {
			console.log(`Round ${this.roundNumber}: P1 Wins!`)
			this.player1.winBattle(this.player2.battleCard, this.pot.cards)
			this.pot.reset()
		} else if (result > 0) {
			console.log(`Round ${this.roundNumber}: P2 Wins!`)
			this.player2.winBattle(this.player1.battleCard, this.pot.cards)
			this.pot.reset()
		} else {
			console.log(`Round ${this.roundNumber}: Tie!`)
			this.player1.tie(this.pot)
			this.player2.tie(this.pot)
		}
		console.log('    p1:', this.player1.cards.length)
		console.log('    p2:', this.player2.cards.length)
		console.log('   pot:', this.pot.cards.length)
		console.log('   SUM:', this.player1.cards.length + this.player2.cards.length + this.pot.cards.length)
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
