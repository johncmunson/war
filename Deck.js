const Card = require('./Card.js')

class Deck {
	constructor() {
		const suits = [
			{
				name: 'Diamond',
				glyph: '<>'
			},
			{
				name: 'Heart',
				glyph: '<3'
			},
			{
				name: 'Spade',
				glyph: '{>'
			},
			{
				name: 'Club',
				glyph: '-%'
			}
		]
		const ranks = [
			{
				name: 'A',
				value: 1
			},
			{
				name: '2',
				value: 2
			},
			{
				name: '3',
				value: 3
			},
			{
				name: '4',
				value: 4
			},
			{
				name: '5',
				value: 5
			},
			{
				name: '6',
				value: 6
			},
			{
				name: '7',
				value: 7
			},
			{
				name: '8',
				value: 8
			},
			{
				name: '9',
				value: 9
			},
			{
				name: '10',
				value: 10
			},
			{
				name: 'J',
				value: 11
			},
			{
				name: 'Q',
				value: 12
			},
			{
				name: 'K',
				value: 13
			}
		]
		this.cards = ranks.map(
			rank => suits.map(
				suit => new Card(rank, suit)
			)
		).reduce(
			(accum, cur) => accum.concat(cur),
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
