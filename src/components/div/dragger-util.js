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

export class DividerManager {
  thickness = null;

  constructor({ panelThickness }) {
    this.thickness = panelThickness;
  }

  getHalfOf({ niche, splitting }) {
    if (splitting === 'vertical') return (niche.width - this.thickness) / 2;
    if (splitting === 'horizontal') return (niche.height - this.thickness) / 2;
  }

  splitInHalfByVerticalPartition({
    niche,
    idBefor,
    idAfter,
    idPartition,
    splitting,
  }) {
    const halfWidth = this.getHalfOf({ niche, splitting });

    const nicheBeforePartition = {
      id: idBefor,
      width: halfWidth,
      height: niche.height,
      top: niche.top,
      left: niche.left,
    };

    const nicheAfterPartition = {
      id: idAfter,
      width: halfWidth,
      height: niche.height,
      top: niche.top,
      left: halfWidth + this.thickness,
    };

    const partition = {
      id: idPartition,
      orientation: 'vertical',
      width: this.thickness,
      height: niche.height,
      top: niche.top,
      left: niche.left + halfWidth,
    };

    return [nicheBeforePartition, nicheAfterPartition, partition];
  }
}

class Partition {
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
}

export class VerticalPartition extends Partition {
  orientation = 'vertical'; // 'VERTICAL' | 'HORIZONTAL'
  left = [];
  right = [];

  constructor({ id, length, thickness, top, left }) {
    super(id, length, thickness, top, left);
  }
}

export class HorizontalPartition extends Partition {
  orientation = 'horizontal'; // 'VERTICAL' | 'HORIZONTAL'
  above = [];
  under = [];

  constructor({ id, length, thickness, top, left }) {
    super(id, length, thickness, top, left);
  }
}

export class Niche {
  id = null;
  top = null;
  left = null;
  width = null;
  height = null;
  removeSelectionCallback = null;

  constructor({ id, width, height, top, left }) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
  }

  static splitInHalfByVerticalPartition({
    niche,
    thickness,
    idBefor,
    idAfter,
  }) {
    const halfWidth = (niche.width - thickness) / 2;

    const nicheBeforePartition = new Niche(
      idBefor,
      halfWidth,
      niche.height,
      niche.top,
      niche.left
    );

    const nicheAfterPartition = new Niche(
      idAfter,
      halfWidth,
      niche.height,
      niche.top,
      niche.width + thickness
    );

    return [nicheBeforePartition, nicheAfterPartition];
  }

  splitInHalfByPartition(thickness) {
    return (this.width - thickness) / 2;
  }

  setRemoveSelectionCallback(cb) {
    this.removeSelectionCallback = cb;
  }

  removeSelection() {
    this.removeSelectionCallback();
  }
}
