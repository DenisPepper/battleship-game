/**
 * Функция принимает габарит области и возвращает новое уменьшенное значение габарита области.
 * При делении области перегородкой образуются две новых уменьшеных области.
 * @param {number} space ширина/высота области
 * @param {number} pThickness толщина перегородки (partition thickness)
 * @returns {number}
 */
export const reduceArea = (space, pThickness) => (space - pThickness) / 2;

export const createAreaBefore = (area, id, width) => ({ ...area, id, width });

export const createAreaAfter = (area, id, width, pThickness) => ({
  ...area,
  id,
  left: area.left + width + pThickness,
  width,
});

export const createNewVertical = (area, id, pThickness, width) => ({
  id,
  orientation: 'vertical',
  width: pThickness,
  height: area.height,
  top: area.top,
  left: area.left + width,
});

// TODO: переписать на класс DraggerManager

export class Partition {
  id = null;
  length = null;
  thickness = null;
  top = null;
  left = null;

  constructor(id, length, thickness, top, left) {
    this.id = id;
    this.length = length;
    this.thickness = thickness;
    this.top = top;
    this.left = left;
  }

  /* get some() {
    return this.#field;
  } */
}

export class VerticalPartition extends Partition {
  orientation = 'VERTICAL'; // 'VERTICAL' | 'HORIZONTAL'
  left = [];
  right = [];

  constructor(id, length, thickness, top, left) {
    super(id, length, thickness, top, left);
  }
}

export class HorizontalPartition extends Partition {
  orientation = 'HORIZONTAL'; // 'VERTICAL' | 'HORIZONTAL'
  above = [];
  under = [];

  constructor(id, length, thickness, top, left) {
    super(id, length, thickness, top, left);
  }
}

export class Area {
  id = null;
  top = null;
  left = null;
  width = null;
  height = null;
  removeSelectionCallback = null;

  constructor(id, width, height, top, left) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
  }

  setRemoveSelectionCallback(cb) {
    this.removeSelectionCallback = cb;
  }

  removeSelection() {
    this.removeSelectionCallback();
  }
}

const horizontal = new HorizontalPartition(1, 400, 16, 0, 0);
console.log(horizontal);
