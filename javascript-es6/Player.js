class Player {
	constructor(name) {
		this.name = name
		this.cards = []
		this.battleCard = null
	}

	playCard() {
		this.battleCard = this.cards.shift()
	}

	receiveCard(card) {
		this.cards.push(card)
	}

	winBattle(battleCard, potCards) {
		this.cards.push(this.battleCard)
		this.cards.push(battleCard)
		if (potCards.length) {
			for (let card of potCards) {
				this.cards.push(card)
			}
		}
	}

	tie(pot) {
		let burnCards = this.cards.length <= 3 ?
			this.cards.splice(0, this.cards.length) :
			this.cards.splice(0, 3)
		pot.receiveBurnCards(burnCards)
		pot.receiveBattleCard(this.battleCard)
	}
}

module.exports = Player
