const Card = require('./Card.js')
const Deck = require('./Deck.js')
const Player = require('./Player.js')
const Pot = require('./Pot.js')

class Game {
	constructor(player1, player2, numberRounds) {
		this.player1 = new Player(player1)
		this.player2 = new Player(player2)
		this.rounds = numberRounds
		this.deck = new Deck()
		this.pot = new Pot()
	}

	_compare(card1, card2) {
		const rank1 = card1.rank === 1 ? 14 : card1.rank
		const rank2 = card2.rank === 1 ? 14 : card2.rank
		return rank2 - rank1
	}

	_battle() {
		this.player1.playCard()
		this.player2.playCard()
		const result = this._compare(this.player1.battleCard, this.player2.battleCard)
		if (result < 0) {
			this.player1.winBattle(this.player2.battleCard, this.pot.cards)
			this.pot.reset()
		} else if (result > 0) {
			this.player2.winBattle(this.player1.battleCard, this.pot.cards)
			this.pot.reset()
		} else {
			this.player1.tie(this.pot)
			this.player2.tie(this.pot)
		}
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
			while (this.rounds !== 0) {
				this._battle()
				this.rounds -= 1
				console.log('Number of Cards: ', this.pot.cards.length + this.player1.cards.length + this.player2.cards.length)
			}
		} else {
			while (this.player1.cards.length && this.player2.cards.length) {
				this._battle()
				console.log('Number of Cards: ', this.pot.cards.length + this.player1.cards.length + this.player2.cards.length)
			}
		}
		return this._getWinner()
	}
}

module.exports = Game
