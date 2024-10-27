const names = ['oneDeck', 'twoDeck', 'threeDeck', 'fourDeck'];

export class Ship {
  #length = '';
  #coords = [];

  static type = (length) => names[length - 1];

  constructor(length, coords) {
    this.#length = names[length - 1];
    this.#coords = coords;

    if (!this.#length) throw new Error('ship not valid: check length!');
    if (this.#coords.length !== length) throw new Error('ship not valid: coords.length !== length!');
  }

  getName = () => this.#length;

  getCoords = () => this.#coords;

  getId = () => this.#coords.reduce((acc, { row, cell }) => `${acc}${row}.${cell} `, '').trim();
}
