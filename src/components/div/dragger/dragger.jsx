import { useCallback, useRef, useState } from 'react';
import { DraggerWrapper } from '../dragger-wrapper/dragger-wrapper.jsx';
import { Area } from '../area/area.jsx';
import { Wall } from '../wall/wall.jsx';
import { ContextMenu } from '../context-menu/context-menu.jsx';
import {
  DRAGGER_HEIGHT,
  DRAGGER_WIDTH,
  INNER_THICKNESS,
  INITIAL_AREA,
  INITIAL_ID,
  INITIAL_NEXT_AREA_ID,
} from '../dragger-config.js';
import {
  reduceArea,
  createAreaBefore,
  createAreaAfter,
  createNewVertical,
} from '../dragger-util.js';
import './dragger.css';

export function Dragger() {
  const [areas, setAreas] = useState([INITIAL_AREA]);
  const [activeArea, setActiveArea] = useState(null);
  const [nextAreaID, setNextAreaID] = useState(INITIAL_NEXT_AREA_ID);
  const [verticals, setVerticals] = useState([]);
  const [nextVerticalID, setNextVerticalID] = useState(INITIAL_ID);
  const [horizontals, setHorizontals] = useState([]);
  const [nextHorisontalID, setNextHorizontalID] = useState(INITIAL_ID);
  const [isOpenCtxMenu, setIsOpenCtxMenu] = useState(false);
  const [ctxMenuCoords, setCtxMenuCoords] = useState({ x: 0, y: 0 });
  const draggerRef = useRef(null);

  const handleRefSetup = useCallback((dragger) => {
    draggerRef.current = {
      rect: dragger.getBoundingClientRect(),
    };
  }, []);

  const handleAreaMouseEvents = (area) => {
    /* если драгер содержит активную область, и идентификатор активной области совпадает
    с идентификатором области, которая поймала клик, то это значит, что пользователь повторно кликнул на активную область,
    обработчик удалит эту область из драгера */
    if (activeArea && activeArea.id === area.id) {
      setActiveArea(null);
      setIsOpenCtxMenu(false);
      return;
    }

    /* если драгер содержит активную область, и идентификатор активной области НЕ совпадает
    с идентификатором области, которая поймала клик, то это значит, что пользователь выбрал другую активную область,
    обработчик удалит стили выделения старой области */
    if (activeArea && activeArea.id !== area.id) {
      activeArea.removeSelection();
      setIsOpenCtxMenu(false);
    }

    setActiveArea({
      ...areas.filter((item) => item.id === area.id).at(0),
      removeSelection: area.removeSelection,
    });
  };

  const handleVerticalSplitting = () => {
    const width = reduceArea(activeArea.width, INNER_THICKNESS);
    const newAreaBefore = createAreaBefore(activeArea, nextAreaID, width);
    const newAreaAfter = createAreaAfter(
      activeArea,
      nextAreaID + 1,
      width,
      INNER_THICKNESS
    );
    const newVertical = createNewVertical(
      activeArea,
      nextVerticalID,
      INNER_THICKNESS,
      width
    );
    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      newAreaBefore,
      newAreaAfter,
    ]);
    setVerticals((items) => [...items, newVertical]);
    setNextAreaID((id) => id + 2);
    setNextVerticalID((id) => id + 1);
    setActiveArea(null);
  };

  const handleHorizontalSplitting = () => {
    const height = reduceArea(activeArea.height, INNER_THICKNESS);
    const newAreaOver = {
      ...activeArea,
      id: nextAreaID,
      height,
    };
    const newAreaUnder = {
      ...activeArea,
      id: nextAreaID + 1,
      top: activeArea.top + height + INNER_THICKNESS,
      height,
    };
    const newHorisontal = {
      id: nextHorisontalID,
      width: activeArea.width,
      height: INNER_THICKNESS,
      top: activeArea.top + height,
      left: activeArea.left,
    };
    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      newAreaOver,
      newAreaUnder,
    ]);
    setHorizontals((items) => [...items, newHorisontal]);
    setNextAreaID((id) => id + 2);
    setNextHorizontalID((id) => id + 1);
    setActiveArea(null);
  };

  const handleOnContextMenu = (evt) => {
    evt.preventDefault();

    if (!activeArea) return;

    const { x: parentX, y: parentY } = draggerRef.current.rect;
    const coords = {
      x: evt.clientX - parentX,
      y: evt.clientY - parentY,
    };

    if (isOpenCtxMenu) {
      setCtxMenuCoords(coords);
      return;
    }

    setCtxMenuCoords(coords);
    setIsOpenCtxMenu(true);
  };

  const handleCtxMenuClose = () => {
    setIsOpenCtxMenu(false);
  };

  const handleCtxMenuAddItem = (key) => {
    handleCtxMenuClose();
    if (key === 'vertical') handleVerticalSplitting();
    if (key === 'horizontal') handleHorizontalSplitting();
  };

  const handleMouseLeave = () => {
    if (activeArea) activeArea.removeSelection();
    setActiveArea(null);
    setIsOpenCtxMenu(false);
  };

  return (
    <DraggerWrapper>
      <div
        className='dragger'
        style={{ width: DRAGGER_WIDTH, height: DRAGGER_HEIGHT }}
        onContextMenu={handleOnContextMenu}
        onMouseLeave={handleMouseLeave}
        ref={handleRefSetup}
      >
        {isOpenCtxMenu && (
          <ContextMenu
            closeMenu={handleCtxMenuClose}
            addItem={handleCtxMenuAddItem}
            coords={ctxMenuCoords}
          />
        )}
        {areas.map((item) => (
          <Area
            key={item.id}
            id={item.id}
            top={item.top}
            left={item.left}
            width={item.width}
            height={item.height}
            handleMouseEvents={handleAreaMouseEvents}
          />
        ))}
        {verticals.map((item) => (
          <Wall
            key={item.id}
            id={item.id}
            rect={{
              width: item.width,
              height: item.height,
              top: item.top,
              left: item.left,
            }}
          />
        ))}
        {horizontals.map((item) => (
          <Wall
            key={item.id}
            id={item.id}
            rect={{
              width: item.width,
              height: item.height,
              top: item.top,
              left: item.left,
            }}
          />
        ))}
      </div>
    </DraggerWrapper>
  );
}
