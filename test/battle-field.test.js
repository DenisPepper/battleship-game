import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BattleField } from '../src/game/util/battle-field.js';

const field = new BattleField();

describe('проверка элементов на вертикальное размещение', () => {
  it('вернет true для 4 элементов с одинаковым номером колонки', async () => {
    const input = [
      { row: 2, cell: 2 },
      { row: 1, cell: 2 },
      { row: 4, cell: 2 },
      { row: 3, cell: 2 },
    ];

    assert.strictEqual(field.isValidVertical(input), true);
  });

  it('вернет false для 4 элементов с одинаковым номером колонки', async () => {
    const input = [
      { row: 5, cell: 2 },
      { row: 1, cell: 2 },
      { row: 3, cell: 2 },
      { row: 4, cell: 2 },
    ];

    assert.strictEqual(field.isValidVertical(input), false);
  });

  it('вернет false для 0 элементов', async () => {
    const input = [];

    assert.strictEqual(field.isValidVertical(input), false);
  });

  it('вернет true для 1 элемента', async () => {
    const input = [{ row: 4, cell: 2 }];

    assert.strictEqual(field.isValidVertical(input), true);
  });

  it('вернет false для 4 элементов с разным номером колонки', async () => {
    const input = [
      { row: 1, cell: 1 },
      { row: 2, cell: 2 },
      { row: 3, cell: 3 },
      { row: 4, cell: 4 },
    ];

    assert.strictEqual(field.isValidVertical(input), false);
  });
});

describe('проверка элементов на горизонтальное размещение', () => {
  it('вернет true для 4 элементов в одной строке', async () => {
    const input = [
      { row: 2, cell: 1 },
      { row: 2, cell: 4 },
      { row: 2, cell: 3 },
      { row: 2, cell: 2 },
    ];

    assert.strictEqual(field.isValidHorizontal(input), true);
  });

  it('вернет false для 4 элементов в одной строке', async () => {
    const input = [
      { row: 2, cell: 8 },
      { row: 2, cell: 4 },
      { row: 2, cell: 5 },
      { row: 2, cell: 3 },
    ];

    assert.strictEqual(field.isValidHorizontal(input), false);
  });

  it('вернет false для 0 элементов', async () => {
    const input = [];

    assert.strictEqual(field.isValidHorizontal(input), false);
  });

  it('вернет true для 1 элемента', async () => {
    const input = [{ row: 4, cell: 2 }];

    assert.strictEqual(field.isValidHorizontal(input), true);
  });

  it('вернет false для 4 элементов с разными номерами строк', async () => {
    const input = [
      { row: 1, cell: 1 },
      { row: 1, cell: 2 },
      { row: 1, cell: 3 },
      { row: 4, cell: 4 },
    ];

    assert.strictEqual(field.isValidHorizontal(input), false);
  });
});
