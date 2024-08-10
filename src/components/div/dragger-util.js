class Panel {
  id;
  width;
  height;
  top;
  left;

  constructor({ id, width, height, top, left }) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
  }
}

class VerticalPanel extends Panel {
  orientation = 'vertical';
  leftTouches = [];
  rightTouches = [];

  constructor({ id, width, height, top, left }) {
    super({ id, width, height, top, left });
  }

  static copyOf(panel) {
    const copy = new VerticalPanel({ ...panel });
    copy.orientation = panel.orientation;
    copy.leftTouches = panel.leftTouches;
    copy.rightTouches = panel.rightTouches;
    return copy;
  }
}

class HorizontalPanel extends Panel {
  orientation = 'horizontal';
  topTouches = [];
  bottomTouches = [];

  constructor({ id, width, height, top, left }) {
    super({ id, width, height, top, left });
  }

  static copyOf(panel) {
    const copy = new HorizontalPanel({ ...panel });
    copy.orientation = panel.orientation;
    copy.topTouches = panel.topTouches;
    copy.bottomTouches = panel.bottomTouches;
    return copy;
  }
}

class Niche {
  id;
  width;
  height;
  top;
  left;
  border = {
    top: null,
    right: null,
    bottom: null,
    left: null,
  };
  removeSelection;

  constructor({
    id,
    width,
    height,
    top,
    left,
    topPanel,
    rightPanel,
    bottomPanel,
    leftPanel,
  }) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.border = {
      top: topPanel,
      right: rightPanel,
      bottom: bottomPanel,
      left: leftPanel,
    };
  }

  static copyOf(niche) {
    const copy = new Niche({ ...niche });
    copy.border = niche.border;
    return copy;
  }

  getBorderAt(side) {
    return this.border[side];
  }
}

export class DividerManager {
  DEFAUL_INNER_WIDTH = 400;
  DEFAULT_INNER_HEIGHT = 600;
  DEFAULT_INNER_THICKNESS = 16;
  innerWidth;
  innerHeight;
  thickness;

  constructor({ innerWidth, innerHeight, panelThickness }) {
    this.innerWidth = innerWidth ?? this.DEFAUL_INNER_WIDTH;
    this.innerHeight = innerHeight ?? this.DEFAULT_INNER_HEIGHT;
    this.thickness = panelThickness ?? this.DEFAULT_INNER_THICKNESS;
  }

  // возвращает начальные настройки divider
  getInitialConfig() {
    const width = this.innerWidth;
    const height = this.innerHeight;
    const thickness = this.thickness;
    const id = 1;
    const startNiche = new Niche({
      id,
      top: 0,
      left: 0,
      width,
      height,
    });
    return { width, height, thickness, id, startNiche };
  }

  // возвращает половину ширины/высоты от исходной ниши
  getHalfOf = ({ niche, orientation }) => {
    if (orientation === 'vertical') return (niche.width - this.thickness) / 2;
    if (orientation === 'horizontal')
      return (niche.height - this.thickness) / 2;
  };

  // возвращает результат деления исходной ниши вертикальной перегородкой
  splitByVerticalPanel = ({ halfSize, niche, id1, id2, panelId }) => {
    // создаст новую вертикальную панель
    const panel = new VerticalPanel({
      id: panelId,
      width: this.thickness,
      height: niche.height,
      top: niche.top,
      left: niche.left + halfSize,
    });

    // укажет для соседней панели, которая СНИЗУ от новой вертикальной,
    // что у нее появилось новое касание СВЕРХУ
    const bottomHorizontalPanel = niche.getBorderAt('bottom');
    if (bottomHorizontalPanel) bottomHorizontalPanel.topTouches.push(panel);

    // укажет для соседней панели, которая СВЕРХУ от новой вертикальной,
    // что у нее появилось новое касание СНИЗУ
    const topHorizontalPanel = niche.getBorderAt('top');
    if (topHorizontalPanel) topHorizontalPanel.bottomTouches.push(panel);

    const leftNiche = new Niche({
      id: id1,
      width: halfSize,
      height: niche.height,
      top: niche.top,
      left: niche.left,
      topPanel: niche.getBorderAt('top'),
      rightPanel: panel,
      bottomPanel: niche.getBorderAt('bottom'),
      leftPanel: niche.getBorderAt('left'),
      /* border: {
        top: niche.border.top,
        right: panel,
        bottom: niche.border.bottom,
        left: niche.border.left,
      },*/
    });

    const rightNiche = new Niche({
      id: id2,
      width: halfSize,
      height: niche.height,
      top: niche.top,
      left: niche.left + halfSize + this.thickness,
      topPanel: niche.getBorderAt('top'),
      rightPanel: niche.getBorderAt('right'),
      bottomPanel: niche.getBorderAt('bottom'),
      leftPanel: panel,
      /*border: {
        top: niche.border.top,
        right: niche.border.right,
        bottom: niche.border.bottom,
        left: panel,
      },*/
    });

    return [leftNiche, rightNiche, panel];
  };

  // возвращает результат деления исходной ниши горизонтальной перегородкой
  splitByHorizontalPanel = ({ halfSize, niche, id1, id2, panelId }) => {
    // создаст новую горизонтальную панель
    const panel = new HorizontalPanel({
      id: panelId,
      width: niche.width,
      height: this.thickness,
      top: niche.top + halfSize,
      left: niche.left,
    });

    // укажет для соседней панели, которая СЛЕВА от новой горизонтальной,
    // что у нее появилось новое касание СПРАВА
    const leftVerticalPanel = niche.getBorderAt('left');
    if (leftVerticalPanel) leftVerticalPanel.rightTouches.push(panel);

    // укажет для соседней панели, которая СПРАВА от новой горизонтальной,
    // что у нее появилось новое касание СЛЕВА
    const rightVerticalPanel = niche.getBorderAt('right');
    if (rightVerticalPanel) rightVerticalPanel.leftTouches.push(panel);

    const topNiche = new Niche({
      id: id1,
      width: niche.width,
      height: halfSize,
      top: niche.top,
      left: niche.left,
      topPanel: niche.getBorderAt('top'),
      rightPanel: niche.getBorderAt('right'),
      bottomPanel: panel,
      leftPanel: niche.getBorderAt('left'),
      /* 
      border: {
        top: niche.border.top,
        right: niche.border.right,
        bottom: panel,
        left: niche.border.left,
      },*/
    });

    const bottomNiche = new Niche({
      id: id2,
      width: niche.width,
      height: halfSize,
      top: niche.top + halfSize + this.thickness,
      left: niche.left,
      topPanel: panel,
      rightPanel: niche.getBorderAt('right'),
      bottomPanel: niche.getBorderAt('bottom'),
      leftPanel: niche.getBorderAt('left'),
      /*border: {
        top: panel,
        right: niche.border.right,
        bottom: niche.border.bottom,
        left: niche.border.left,
      },*/
    });

    return [topNiche, bottomNiche, panel];
  };

  // возвращает результат деления исходной ниши вертикальной/горизонтальной перегородкой
  splitInHalfByPanel = ({ niche, orientation, id1, id2, panelId }) => {
    const halfSize = this.getHalfOf({ niche, orientation });

    const props = {
      halfSize,
      niche,
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
        const panel = VerticalPanel.copyOf(item);
        if (item.id === movingPanel.id) panel.left = coord;
        return panel;
      });

    // функция-апдейтер ширины и левой координаты соседних горизонтальных панелей
    const updateHorizontals = (prevItems) =>
      prevItems.map((item) => {
        const panel = HorizontalPanel.copyOf(item);
        // для панелей СЛЕВА от вертикальной (только ширину)
        if (this.findPanel({ array: movingPanel.leftTouches, id: item.id }))
          panel.width = coord - item.left;
        // для панелей СПРАВА от вертикальной (ширину и левую координату)
        if (this.findPanel({ array: movingPanel.rightTouches, id: item.id })) {
          panel.left = coord + movingPanel.width;
          panel.width = item.left - coord - movingPanel.width + item.width;
        }
        return panel;
      });

    // функция-апдейтер ширины и левой координаты соседних ниш
    const updateNiches = (prevItems) =>
      prevItems.map((item) => {
        const niche = Niche.copyOf(item);
        // для ниш СЛЕВА от вертикальной (только ширину)
        if (item.border.right?.id === movingPanel.id)
          niche.width = coord - item.left;
        // для ниш СПРАВА от вертикальной (ширину и левую координату)
        if (item.border.left?.id === movingPanel.id) {
          niche.left = coord + movingPanel.width;
          niche.width = item.left - coord - movingPanel.width + item.width;
        }
        return niche;
      });

    return [updateVerticals, updateHorizontals, updateNiches];
  }

  // возвращает функцию- апдейтер при перемещении горизонтальной перегородки
  getUpdatersOnHorizontalPanelMoves({ movingPanel, cursorCoordinate: coord }) {
    const updateHorizontals = (items) =>
      items.map((item) => {
        const panel = HorizontalPanel.copyOf(item);
        if (item.id === movingPanel.id) panel.top = coord;
        return panel;
      });

    const updateVerticals = (prevItems) =>
      prevItems.map((item) => {
        const panel = VerticalPanel.copyOf(item);
        // вертикальные панели СВЕРХУ
        if (this.findPanel({ array: movingPanel.topTouches, id: item.id }))
          panel.height = coord - item.top;
        // вертикальные панели СНИЗУ
        if (this.findPanel({ array: movingPanel.bottomTouches, id: item.id })) {
          panel.top = coord + movingPanel.height;
          panel.height = item.top + item.height - coord - movingPanel.height;
        }
        return panel;
      });

    const updateNiches = (prevItems) =>
      prevItems.map((item) => {
        const niche = Niche.copyOf(item);
        // ниши СВЕРХУ
        if (item.border.bottom?.id === movingPanel.id)
          niche.height = coord - item.top;
        // ниши СНИЗУ
        if (item.border.top?.id === movingPanel.id) {
          niche.top = coord + movingPanel.height;
          niche.height = item.top + item.height - coord - movingPanel.height;
        }
        return niche;
      });

    return [updateVerticals, updateHorizontals, updateNiches];
  }
}
