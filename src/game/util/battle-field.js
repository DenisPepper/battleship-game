/**
 * @typedef {Object} Input
 */

import { Ship } from './ship.js';

const MAX_DECK = 4;

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

  getShips = () => {
    return Object.values(this.#ships).reduce((acc, { items }) => [...acc, ...items], []);
  };

  getRows = () => [...this.#rows];

  #getCell = (coord) => this.#rows.find((row) => row.id === coord.row).cells.find((cell) => cell.id === coord.cell);

  #placeShipToCell = (ship, coord) => {
    const cell = this.#getCell(coord);
    cell.ship = ship;
    if (cell.nearby) cell.nearby = false;
  };

  #removeShipFromCell = (coord) => {
    const cell = this.#getCell(coord);
    cell.ship = null;
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

  #unsetNearby = (coord) => {
    const nearbyCoords = this.#getNearbyCoords(coord);
    for (const nearbyCoord of nearbyCoords) {
      const cell = this.#getCell(nearbyCoord);
      cell.nearby = false;
      const subCoords = this.#getNearbyCoords(nearbyCoord);
      for (const subCoord of subCoords) {
        const subCell = this.#getCell(subCoord);
        if (subCell.ship) {
          cell.nearby = true;
          break;
        }
      }
    }
  };

  addShip = (coords, length) => {
    if (!length || !coords) return;

    const shipsGroup = this.#ships[Ship.type(length)];
    if (!shipsGroup || shipsGroup.count >= shipsGroup.maxCount) return;

    if (!this.isValid(coords)) return;

    const ship = new Ship(length, coords);
    for (const coord of coords) {
      this.#placeShipToCell(ship, coord);
      this.#setNearby(coord);
    }

    shipsGroup.count += 1;
    shipsGroup.items.push(ship);
  };

  removeShip = (ship) => {
    if (!ship) return;

    const shipsGroup = this.#ships[ship.getName()];

    for (const coord of ship.getCoords()) {
      this.#removeShipFromCell(coord);
      this.#unsetNearby(coord);
    }

    shipsGroup.count -= 1;
    shipsGroup.items = shipsGroup.items.filter((item) => item.getId() !== ship.getId());
  };

  print = (number) => {
    if (!number) console.dir(this.#rows);
    if (number) console.dir(this.#rows.find((row) => row.id === number));
  };

  printShips = () => {
    console.dir(this.#ships);
  };

  /**
   * Проверяет вертикальное, неразрывное положение ячеек в массиве.
   * @param {Input[]} coords - Массив с данными о ячейках, выбранных пользователем.
   * @returns {boolean}
   */
  isValidVertical = (coords) => {
    if (coords.length === 0 || coords.length > MAX_DECK) return false;

    if (coords.length === 1) return true;

    coords.sort((a, b) => a.row - b.row);
    for (let i = 1; i < coords.length; i++) {
      if (coords[i - 1].row + 1 !== coords[i].row) return false;
      if (coords[i - 1].cell !== coords[i].cell) return false;
    }

    return true;
  };

  /**
   * Проверяет горизонтальное, неразрывное положение ячеек в массиве.
   * @param {Input[]} coords - Массив с данными о ячейках, выбранных пользователем.
   * @returns {boolean}
   */
  isValidHorizontal = (coords) => {
    if (coords.length === 0 || coords.length > MAX_DECK) return false;

    if (coords.length === 1) return true;

    coords.sort((a, b) => a.cell - b.cell);
    for (let i = 1; i < coords.length; i++) {
      if (coords[i - 1].cell + 1 !== coords[i].cell) return false;
      if (coords[i - 1].row !== coords[i].row) return false;
    }

    return true;
  };

  isValid = (coords) => {
    return this.isValidVertical(coords) || this.isValidHorizontal(coords);
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

//field.printShips();

console.log(field.getShips());

*/
