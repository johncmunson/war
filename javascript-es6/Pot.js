class Pot {
	constructor() {
		this.cards = []
	}

	receiveBattleCard(card) {
		this.cards.push(card)
	}

	receiveBurnCards(burnCards) {
		for (let card of burnCards) {
			this.cards.push(card)
		}
	}

	reset() {
		this.cards = []
	}
}

module.exports = Pot
