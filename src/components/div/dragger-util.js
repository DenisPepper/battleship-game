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
