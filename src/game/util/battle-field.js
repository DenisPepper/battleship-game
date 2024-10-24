/**
 * @typedef {Object} Input
 */

export class BattleField {
  #field = [];
  #ships = {};

  constructor() {
    this.init();
  }

  init = () => {
    const buildRow = (number) => ({
      id: number,
      cells: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, ship: '' })),
    });
    this.#field = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(buildRow);

    this.#ships = {
      1: { count: 0, maxCount: 4 },
      2: { count: 0, maxCount: 3 },
      3: { count: 0, maxCount: 2 },
      4: { count: 0, maxCount: 1 },
    };
  };

  print = (number) => {
    if (!number) console.dir(this.#field);
    if (number) console.dir(this.#field.find((row) => row.id === number));
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

const field = new BattleField();
field.print(1);
