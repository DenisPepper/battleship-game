export class DividerManager {
  thickness = null;

  constructor({ panelThickness }) {
    this.thickness = panelThickness;
  }

  getHalfOf({ niche, orientation }) {
    if (orientation === 'vertical') return (niche.width - this.thickness) / 2;
    if (orientation === 'horizontal')
      return (niche.height - this.thickness) / 2;
  }

  splitByVerticalPanel({ halfSize, niche, orientation, id1, id2, panelId }) {
    const leftNiche = {
      id: id1,
      width: halfSize,
      height: niche.height,
      top: niche.top,
      left: niche.left,
    };

    const rightNiche = {
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

    return [leftNiche, rightNiche, panel];
  }

  splitByHorizontalPanel({ halfSize, niche, orientation, id1, id2, panelId }) {
    const upperNiche = {
      id: id1,
      width: niche.width,
      height: halfSize,
      top: niche.top,
      left: niche.left,
    };

    const lowerNiche = {
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

    return [upperNiche, lowerNiche, panel];
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
