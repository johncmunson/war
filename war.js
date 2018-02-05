const Game = require('./Game.js')

const war = new Game('George', 'Abe')

console.log('GAME OVER. THE WINNER IS ' + war.play().toUpperCase() + '!')
