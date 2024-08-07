export class DividerManager {
  DEFAUL_INNER_WIDTH = 400;
  DEFAULT_INNER_HEIGHT = 600;
  DEFAULT_INNER_THICKNESS = 16;
  innerWidth = null;
  innerHeight = null;
  thickness = null;

  constructor({ innerWidth, innerHeight, panelThickness }) {
    this.innerWidth = innerWidth ?? this.DEFAUL_INNER_WIDTH;
    this.innerHeight = innerHeight ?? this.DEFAULT_INNER_HEIGHT;
    this.thickness = panelThickness ?? this.DEFAULT_INNER_THICKNESS;
  }

  // возвращает начальные настройки divider
  getInitialConfig() {
    const width = this.innerWidth; // DRAGGER_WIDTH
    const height = this.innerHeight; // DRAGGER_HEIGHT
    const thickness = this.thickness; // INNER_THICKNESS
    const id = 1; // INITIAL_ID
    const startNiche = {
      // INITIAL_AREA
      id: 1,
      top: 0,
      left: 0,
      width: width,
      height: height,
      removeSelection: null,
      border: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
    };
    return { width, height, thickness, id, startNiche };
  }

  // возвращает половину ширины/высоты от исходной ниши
  getHalfOf = ({ niche, orientation }) => {
    if (orientation === 'vertical') return (niche.width - this.thickness) / 2;
    if (orientation === 'horizontal')
      return (niche.height - this.thickness) / 2;
  };

  // возвращает результат деления исходной ниши вертикальной перегородкой
  splitByVerticalPanel = ({
    halfSize,
    niche,
    orientation,
    id1,
    id2,
    panelId,
  }) => {
    // создаст новую вертикальную панель
    const panel = {
      id: panelId,
      orientation,
      width: this.thickness,
      height: niche.height,
      top: niche.top,
      left: niche.left + halfSize,
      leftTouches: [],
      rightTouches: [],
    };

    // укажет для соседней панели, которая СНИЗУ от новой вертикальной,
    // что у нее появилось новое касание СВЕРХУ
    const bottomHorizontalPanel = niche.border.bottom;
    if (bottomHorizontalPanel) bottomHorizontalPanel.topTouches.push(panel);

    // укажет для соседней панели, которая СВЕРХУ от новой вертикальной,
    // что у нее появилось новое касание СНИЗУ
    const topHorizontalPanel = niche.border.top;
    if (topHorizontalPanel) topHorizontalPanel.bottomTouches.push(panel);

    const leftNiche = {
      id: id1,
      width: halfSize,
      height: niche.height,
      top: niche.top,
      left: niche.left,
      border: {
        top: niche.border.top,
        right: panel,
        bottom: niche.border.bottom,
        left: niche.border.left,
      },
    };

    const rightNiche = {
      id: id2,
      width: halfSize,
      height: niche.height,
      top: niche.top,
      left: niche.left + halfSize + this.thickness,
      border: {
        top: niche.border.top,
        right: niche.border.right,
        bottom: niche.border.bottom,
        left: panel,
      },
    };

    return [leftNiche, rightNiche, panel];
  };

  // возвращает результат деления исходной ниши горизонтальной перегородкой
  splitByHorizontalPanel = ({
    halfSize,
    niche,
    orientation,
    id1,
    id2,
    panelId,
  }) => {
    // создаст новую горизонтальную панель
    const panel = {
      id: panelId,
      orientation,
      width: niche.width,
      height: this.thickness,
      top: niche.top + halfSize,
      left: niche.left,
      topTouches: [],
      bottomTouches: [],
    };

    // укажет для соседней панели, которая СЛЕВА от новой горизонтальной,
    // что у нее появилось новое касание СПРАВА
    const leftVerticalPanel = niche.border.left;
    if (leftVerticalPanel) leftVerticalPanel.rightTouches.push(panel);

    // укажет для соседней панели, которая СПРАВА от новой горизонтальной,
    // что у нее появилось новое касание СЛЕВА
    const rightVerticalPanel = niche.border.right;
    if (rightVerticalPanel) rightVerticalPanel.leftTouches.push(panel);

    const upperNiche = {
      id: id1,
      width: niche.width,
      height: halfSize,
      top: niche.top,
      left: niche.left,
      border: {
        top: niche.border.top,
        right: niche.border.right,
        bottom: panel,
        left: niche.border.left,
      },
    };

    const lowerNiche = {
      id: id2,
      width: niche.width,
      height: halfSize,
      top: niche.top + halfSize + this.thickness,
      left: niche.left,
      border: {
        top: panel,
        right: niche.border.right,
        bottom: niche.border.bottom,
        left: niche.border.left,
      },
    };

    return [upperNiche, lowerNiche, panel];
  };

  // возвращает результат деления исходной ниши вертикальной/горизонтальной перегородкой
  splitInHalfByPanel = ({ niche, orientation, id1, id2, panelId }) => {
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
  };

  findPanel({ array, id }) {
    return array.find((item) => item.id === id);
  }

  // возвращает функцию- апдейтер при перемещении вертикальной пеергородки
  getUpdatersOnVerticalPanelMoves({ movingPanel, cursorCoordinate: coord }) {
    // функция-апдейтер: обновит левое положение перемещаемой вертикальной панели
    const updateVerticals = (prevItems) =>
      prevItems.map((item) => {
        if (item.id === movingPanel.id) {
          movingPanel = item;
          return { ...item, left: coord };
        }
        return item;
      });

    // функция-апдейтер ширины и левой координаты соседних горизонтальных панелей
    const updateHorizontals = (prevItems) =>
      prevItems.map((item) => {
        // для панелей СЛЕВА от вертикальной (только ширину)
        if (this.findPanel({ array: movingPanel.leftTouches, id: item.id }))
          return { ...item, width: coord - item.left };
        // для панелей СПРАВА от вертикальной (ширину и левую координату)
        if (this.findPanel({ array: movingPanel.rightTouches, id: item.id }))
          return {
            ...item,
            left: coord + movingPanel.width,
            width: item.left - coord - movingPanel.width + item.width,
          };
        return item;
      });

    // функция-апдейтер ширины и левой координаты соседних ниш
    const updateNiches = (prevItems) =>
      prevItems.map((item) => {
        // для ниш СЛЕВА от вертикальной (только ширину)
        if (item.border.right?.id === movingPanel.id)
          return { ...item, width: coord - item.left };
        // для ниш СПРАВА от вертикальной (ширину и левую координату)
        if (item.border.left?.id === movingPanel.id)
          return {
            ...item,
            left: coord + movingPanel.width,
            width: item.left - coord - movingPanel.width + item.width,
          };
        return item;
      });

    return [updateVerticals, updateHorizontals, updateNiches];
  }

  // возвращает функцию- апдейтер при перемещении горизонтальной перегородки
  getUpdatersOnHorizontalPanelMoves({ movingPanel, cursorCoordinate: coord }) {
    const updateHorizontals = (items) =>
      items.map((item) =>
        item.id === movingPanel.id ? { ...item, top: coord } : item
      );

    const updateVerticals = (prevItems) =>
      prevItems.map((item) => {
        // вертикальные панели СВЕРХУ
        if (this.findPanel({ array: movingPanel.topTouches, id: item.id }))
          return { ...item, height: coord - item.top };
        // вертикальные панели СНИЗУ
        if (this.findPanel({ array: movingPanel.bottomTouches, id: item.id }))
          return {
            ...item,
            top: coord + movingPanel.height,
            height: item.top + item.height - coord - movingPanel.height,
          };
        return item;
      });

    const updateNiches = (prevItems) =>
      prevItems.map((item) => {
        // ниши СВЕРХУ
        if (item.border.bottom?.id === movingPanel.id)
          return { ...item, height: coord - item.top };
        // ниши СНИЗУ
        if (item.border.top?.id === movingPanel.id)
          return {
            ...item,
            top: coord + movingPanel.height,
            height: item.top + item.height - coord - movingPanel.height,
          };
        return item;
      });

    return [updateVerticals, updateHorizontals, updateNiches];
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
