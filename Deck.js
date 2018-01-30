const Card = require('./Card.js')

class Deck {
	constructor() {
		const suits = [1, 2, 3, 4]
		const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
		this.cards = ranks.map(
			rank => suits.map(
				suit => new Card(rank, suit)
			)
		).reduce(
			(cum, cur) => cum.concat(cur),
			[]
		)
	}

	shuffle() {
		let currentIndex = this.cards.length
		let tempValue, randomIndex
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			tempValue = this.cards[currentIndex]
			this.cards[currentIndex] = this.cards[randomIndex]
			this.cards[randomIndex] = tempValue
		}
	}

	deal(players) {
		let currentIndex = 0
		while (this.cards.length) {
			let dealtCard = this.cards.pop()
			players[currentIndex].receiveCard(dealtCard)
			if (currentIndex === players.length - 1) {
				currentIndex = 0
			} else {
				currentIndex += 1
			}
		}
	}
}

module.exports = Deck
