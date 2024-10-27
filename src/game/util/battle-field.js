/**
 * @typedef {Object} Input
 */

import { Ship } from './ship.js';

export class BattleField {
  #maxCount = { oneDeck: 4, twoDeck: 3, threeDeck: 2, fourDeck: 1 };
  #rows = [];
  #ships = [];

  constructor() {
    this.init();
  }

  init = () => {
    const buildRow = (number) => ({
      id: number,
      cells: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, ship: null })),
    });
    this.#rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(buildRow);
  };

  addShip = (length, coords) => {
    if (!length || !coords) return;

    const ship = new Ship(length, coords);
    for (const coord of coords) {
      const cell = this.#rows.find((row) => row.id === coord.row).cells.find((cell) => cell.id === coord.cell);
      cell.ship = ship;
    }

    this.#ships.push(ship);
  };

  getRows = () => [...this.#rows];

  print = (number) => {
    if (!number) console.dir(this.#rows);
    if (number) console.dir(this.#rows.find((row) => row.id === number));
  };

  /**
   * Проверяет вертикальное, неразрывное положение ячеек в массиве.
   * @param {Input[]} input - Массив с данными о ячейках, выбранных пользователем.
   * @returns {boolean}
   */
  isValidVertical = (input) => {
    if (input.length === 0) return false;

    if (input.length === 1) return true;

    input.sort((a, b) => a.row - b.row);
    for (let i = 1; i < input.length; i++) {
      if (input[i - 1].row + 1 !== input[i].row) return false;
      if (input[i - 1].cell !== input[i].cell) return false;
    }

    return true;
  };

  /**
   * Проверяет горизонтальное, неразрывное положение ячеек в массиве.
   * @param {Input[]} input - Массив с данными о ячейках, выбранных пользователем.
   * @returns {boolean}
   */
  isValidHorizontal = (input) => {
    if (input.length === 0) return false;

    if (input.length === 1) return true;

    input.sort((a, b) => a.cell - b.cell);
    for (let i = 1; i < input.length; i++) {
      if (input[i - 1].cell + 1 !== input[i].cell) return false;
      if (input[i - 1].row !== input[i].row) return false;
    }

    return true;
  };
}

/*const field = new BattleField();
field.addShip(4, [
  { row: 1, cell: 1 },
  { row: 1, cell: 2 },
  { row: 1, cell: 3 },
  { row: 1, cell: 4 },
]);
console.log(field.print(1)); */
