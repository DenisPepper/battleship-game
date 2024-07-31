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

  splitByVerticalPanel({ halfSize, niche, orientation, id1, id2, panelId }) {
    const nicheBefore = {
      id: id1,
      width: halfSize,
      height: niche.height,
      top: niche.top,
      left: niche.left,
    };

    const nicheAfter = {
      id: id2,
      width: halfSize,
      height: niche.height,
      top: niche.top,
      left: niche.left + halfSize + this.thickness,
    };

    const panel = {
      id: panelId,
      orientation,
      width: this.thickness,
      height: niche.height,
      top: niche.top,
      left: niche.left + halfSize,
    };

    return [nicheBefore, nicheAfter, panel];
  }

  splitByHorizontalPanel({ halfSize, niche, orientation, id1, id2, panelId }) {
    const nicheAbove = {
      id: id1,
      width: niche.width,
      height: halfSize,
      top: niche.top,
      left: niche.left,
    };

    const nicheUnder = {
      id: id2,
      width: niche.width,
      height: halfSize,
      top: niche.top + halfSize + this.thickness,
      left: niche.left,
    };

    const panel = {
      id: panelId,
      orientation,
      width: niche.width,
      height: this.thickness,
      top: niche.top + halfSize,
      left: niche.left,
    };

    return [nicheAbove, nicheUnder, panel];
  }

  splitInHalfByPanel({ niche, orientation, id1, id2, panelId }) {
    const halfSize = this.getHalfOf({ niche, orientation });

    const props = {
      halfSize,
      niche,
      orientation,
      id1,
      id2,
      panelId,
    };

    if (orientation === 'vertical') {
      return this.splitByVerticalPanel(props);
    }

    if (orientation === 'horizontal') {
      return this.splitByHorizontalPanel(props);
    }
  }
}

/*
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
*/
