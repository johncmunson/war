class Card {
	constructor(rank, suit) {
		this.rank = rank
		this.suit = suit
	}
	printCard() {
		let topRow = this.rank.value === 10 ?
			'| ' + this.rank.name + '         |' :
			'| ' + this.rank.name + '          |'
		let bottomRow = this.rank.value === 10 ?
			'|         ' + this.rank.name + ' |' :
			'|          ' + this.rank.name + ' |'
		let middleRow = `|     ${this.suit.glyph}     |`
		console.log(
			`
,------------,\n
${topRow}\n
|            |\n
${middleRow}\n
|            |\n
${bottomRow}\n
'------------'
			`
		)
	}
}

module.exports = Card
