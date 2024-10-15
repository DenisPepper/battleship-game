export const game = {
  id: 'game id',
  description: 'the test game',
  player1: {
    id: 'player 1 id',
    battleField: {
      a: {
        1: { ship: true, strike: false },
        2: { ship: true, strike: false },
      },
    },
  },
  player2: 'player 2 id',
};

console.log(game.player1.battleField.a[2]);
