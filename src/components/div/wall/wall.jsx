import { useRef, useEffect, useState } from 'react';
import './wall.css';
import { ContextMenu } from '../context-menu/context-menu';

export function Wall(props) {
  const {
    rect: { width, height, top, left },
    id,
    orientation,
    moveWall,
    parentTop,
    parentLeft,
    pShift,
  } = props;

  const style = {
    width,
    height,
    top,
    left,
  };

  const [isOpenCtxMenu, setIsOpenCtxMenu] = useState(false);
  const [ctxMenuCoords, setCtxMenuCoords] = useState({ x: 0, y: 0 });
  const wallRef = useRef();

  useEffect(() => {
    const wall = wallRef.current;

    const handleMouseMove = (evt) => {
      const { clientY: y, clientX: x } = evt;
      if (orientation === 'vertical')
        moveWall({
          id,
          orientation,
          coordinate: Math.floor(x - parentLeft - pShift),
        });
      if (orientation === 'horizontal')
        moveWall({
          id,
          orientation,
          coordinate: Math.floor(y - parentTop - pShift),
        });
    };

    const handleMouseDown = () => {
      wall.classList.add('dragger__wall--moving');
      wall.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseUp = () => {
      wall.classList.remove('dragger__wall--moving');
      wall.removeEventListener('mousemove', handleMouseMove);
    };

    wall.addEventListener('mousedown', handleMouseDown);
    wall.addEventListener('mouseup', handleMouseUp);

    return () => {
      wall.removeEventListener('mousedown', handleMouseDown);
      wall.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDoubleClick = () => {
    // удаляет перегородку
  };

  const handleOnContextMenu = (evt) => {
    evt.preventDefault();

    const coords = {
      x: evt.clientX - parentLeft,
      y: evt.clientY - parentTop,
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

  return (
    <>
      {isOpenCtxMenu && (
        <ContextMenu
          closeMenu={handleCtxMenuClose}
          //addItem={handleCtxMenuAddItem}
          coords={ctxMenuCoords}
        />
      )}
      <div
        className={`dragger__wall dragger__${orientation}-wall`}
        style={style}
        ref={wallRef}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleOnContextMenu}
      ></div>
    </>
  );
}
