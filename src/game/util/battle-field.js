/**
 * @typedef {Object} Input
 */

import { Ship } from './ship.js';

export class BattleField {
  #rows = [];
  #ships = {
    oneDeck: { maxCount: 4, count: 0, items: [] },
    twoDeck: { maxCount: 3, count: 0, items: [] },
    threeDeck: { maxCount: 2, count: 0, items: [] },
    fourDeck: { maxCount: 1, count: 0, items: [] },
  };

  constructor() {
    this.init();
  }

  init = () => {
    const buildRow = (number) => ({
      id: number,
      cells: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, ship: null, nearby: false })),
    });
    this.#rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(buildRow);
  };

  #getCell = (coord) => this.#rows.find((row) => row.id === coord.row).cells.find((cell) => cell.id === coord.cell);

  #placeShipToCell = (ship, coord) => {
    const cell = this.#getCell(coord);
    cell.ship = ship;
    if (cell.nearby) cell.nearby = false;
  };

  #getNearbyCoords = (coord) => {
    const { row, cell } = coord;
    const coords = [];

    // left
    if (cell - 1 >= 1) coords.push({ row, cell: cell - 1 });
    // left-up
    if (row - 1 >= 1 && cell - 1 >= 1) coords.push({ row: row - 1, cell: cell - 1 });
    // up
    if (row - 1 >= 1) coords.push({ row: row - 1, cell });
    // right-up
    if (row - 1 >= 1 && cell + 1 <= 10) coords.push({ row: row - 1, cell: cell + 1 });
    // right
    if (cell + 1 <= 10) coords.push({ row, cell: cell + 1 });
    // right-down
    if (row + 1 <= 10 && cell + 1 <= 10) coords.push({ row: row + 1, cell: cell + 1 });
    // down
    if (row + 1 <= 10) coords.push({ row: row + 1, cell });
    //left-down
    if (row + 1 <= 10 && cell - 1 >= 1) coords.push({ row: row + 1, cell: cell - 1 });

    return coords;
  };

  #setNearby = (coord) => {
    const nearbyCoords = this.#getNearbyCoords(coord);
    for (const nearbyCoord of nearbyCoords) {
      const cell = this.#getCell(nearbyCoord);
      if (!cell.ship) cell.nearby = true;
    }
  };

  addShip = (coords, length) => {
    if (!length || !coords) return;

    const { count, maxCount, items } = this.#ships[Ship.type(length)];
    if (count >= maxCount) return;

    const ship = new Ship(length, coords);
    for (const coord of coords) {
      this.#setNearby(coord);
      this.#placeShipToCell(ship, coord);
    }

    this.#ships[Ship.type(length)].count += 1;
    items.push(ship);
  };

  getRows = () => [...this.#rows];

  print = (number) => {
    if (!number) console.dir(this.#rows);
    if (number) console.dir(this.#rows.find((row) => row.id === number));
  };

  printShips = () => {
    console.dir(this.#ships);
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

/* 
const field = new BattleField();
const coords = [
  { row: 3, cell: 4 },
  { row: 3, cell: 5 },
  { row: 3, cell: 6 },
  { row: 3, cell: 7 },
];
field.addShip(coords, coords.length);

field.printShips();

field.addShip(coords, coords.length);

*/
