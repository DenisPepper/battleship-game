import { useCallback, useRef, useState } from 'react';
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
import { DividerManager } from '../dragger-util.js';
import './dragger.css';

const manager = new DividerManager({ panelThickness: INNER_THICKNESS });

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
    const [areaBefore, areaAfter, verticalPanel] =
      manager.splitInHalfByPanel({
        niche: activeArea,
        splitting: 'vertical',
        id1: nextAreaID,
        id2: nextAreaID + 1,
        panelId: nextVerticalID,
      });

    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      areaBefore,
      areaAfter,
    ]);
    setVerticals((items) => [...items, verticalPanel]);
    setNextAreaID((id) => id + 2);
    setNextVerticalID((id) => id + 1);
    setActiveArea(null);
  };

  const handleHorizontalSplitting = () => {
    const [areaAbove, areaUnder, horizontalPanel] =
      manager.splitInHalfByPanel({
        niche: activeArea,
        splitting: 'horizontal',
        id1: nextAreaID,
        id2: nextAreaID + 1,
        panelId: nextHorisontalID,
      });

    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      areaAbove,
      areaUnder,
    ]);
    setHorizontals((items) => [...items, horizontalPanel]);
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

  const handleMoveWall = ({ id, orientation, coordinate: coord }) => {
    if (orientation === 'horizontal') {
      const cb = (items) =>
        items.map((item) => (item.id === id ? { ...item, top: coord } : item));

      setHorizontals(cb);

      let direction = 'no-move';
      if (coord > draggerRef.current.lastTop) direction = 'down';
      if (coord < draggerRef.current.lastTop) direction = 'up';
      if (direction === 'no-move')
        direction = draggerRef.current.lastDirection ?? direction;
      draggerRef.current.lastDirection = direction;
    }

    if (orientation === 'vertical') {
      const cb = (items) =>
        items.map((item) => (item.id === id ? { ...item, left: coord } : item));

      setVerticals(cb);

      let direction = 'no-move';
      if (coord > draggerRef.current.lastLeft) direction = 'right';
      if (coord < draggerRef.current.lastLeft) direction = 'left';
      if (direction === 'no-move')
        direction = draggerRef.current.lastDirection ?? direction;
      draggerRef.current.lastDirection = direction;
    }
  };

  return (
    <section className='dragger-wrapper'>
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
            orientation={item.orientation}
            pShift={INNER_THICKNESS / 2}
            moveWall={handleMoveWall}
            draggerRef={draggerRef.current}
            parentTop={draggerRef.current.rect.top}
            parentLeft={draggerRef.current.rect.left}
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
            orientation={item.orientation}
            pShift={INNER_THICKNESS / 2}
            moveWall={handleMoveWall}
            draggerRef={draggerRef.current}
            parentTop={draggerRef.current.rect.top}
            parentLeft={draggerRef.current.rect.left}
            rect={{
              width: item.width,
              height: item.height,
              top: item.top,
              left: item.left,
            }}
          />
        ))}
      </div>
    </section>
  );
}
