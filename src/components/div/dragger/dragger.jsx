import { useCallback, useRef, useState } from 'react';
import { Area } from '../area/area.jsx';
import { Wall } from '../wall/wall.jsx';
import { ContextMenu } from '../context-menu/context-menu.jsx';
import { DividerManager } from '../dragger-util.js';
import './dragger.css';

const manager = new DividerManager({ innerWidth: 500, panelThickness: 16 });
const config = manager.getInitialConfig();

export function Dragger() {
  const [areas, setAreas] = useState([config.startNiche]);
  const [activeArea, setActiveArea] = useState(null);
  const [nextAreaID, setNextAreaID] = useState(config.id + 1);
  const [verticals, setVerticals] = useState([]);
  const [nextVerticalID, setNextVerticalID] = useState(config.id);
  const [horizontals, setHorizontals] = useState([]);
  const [nextHorisontalID, setNextHorizontalID] = useState(config.id);
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

    setActiveArea(() => {
      const active = areas.find((item) => item.id === area.id);
      active.removeSelection = area.removeSelection;
      return active;
    });
  };

  const handleVerticalSplitting = () => {
    const [leftArea, rightArea, panel] = manager.splitInHalfByPanel({
      niche: activeArea,
      orientation: 'vertical',
      id1: nextAreaID,
      id2: nextAreaID + 1,
      panelId: nextVerticalID,
    });

    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      leftArea,
      rightArea,
    ]);
    setVerticals((items) => [...items, panel]);
    setNextAreaID((id) => id + 2);
    setNextVerticalID((id) => id + 1);
    setActiveArea(null);
  };

  const handleHorizontalSplitting = () => {
    const [upperArea, lowerArea, panel] = manager.splitInHalfByPanel({
      niche: activeArea,
      orientation: 'horizontal',
      id1: nextAreaID,
      id2: nextAreaID + 1,
      panelId: nextHorisontalID,
    });

    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      upperArea,
      lowerArea,
    ]);
    setHorizontals((items) => [...items, panel]);
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
      const [updateVerticals, updateHorizontals, updateAreas] =
        manager.getUpdatersOnHorizontalPanelMoves({
          movingPanel: horizontals.find((item) => item.id === id),
          cursorCoordinate: coord,
        });

      setAreas(updateAreas);
      setHorizontals(updateHorizontals);
      setVerticals(updateVerticals);
    }

    if (orientation === 'vertical') {
      const [updateVerticals, updateHorizontals, updateAreas] =
        manager.getUpdatersOnVerticalPanelMoves({
          movingPanel: verticals.find((item) => item.id === id),
          cursorCoordinate: coord,
        });

      setAreas(updateAreas);
      setVerticals(updateVerticals);
      setHorizontals(updateHorizontals);
    }
  };

  return (
    <section className='dragger-wrapper'>
      <div
        className='dragger'
        style={{ width: config.width, height: config.height }}
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
        {areas.map((item, index) => (
          <Area
            key={item.id}
            id={item.id}
            number={index}
            top={item.top}
            left={item.left}
            width={item.width}
            height={item.height}
            handleMouseEvents={handleAreaMouseEvents}
            minWidth={item.minWidth}
            minHeight={item.minHeight}
          />
        ))}
        {verticals.map((item) => (
          <Wall
            key={item.id}
            id={item.id}
            orientation={item.orientation}
            pShift={config.thickness / 2}
            moveWall={handleMoveWall}
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
            pShift={config.thickness / 2}
            moveWall={handleMoveWall}
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
      <button type='button' style={{ margin: '0 auto' }}>
        export to json
      </button>
    </section>
  );
}
