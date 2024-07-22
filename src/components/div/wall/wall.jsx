import { useRef, useEffect } from 'react';
import './wall.css';

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

  const wallRef = useRef();

  useEffect(() => {
    const wall = wallRef.current;

    const handleMouseMove = (evt) => {
      const { clientY: y, clientX: x } = evt;
      if (orientation === 'vertical')
        moveWall(id, orientation, x - parentLeft - pShift);
      if (orientation === 'horizontal')
        moveWall(id, orientation, y - parentTop - pShift);
    };

    const handleMouseDown = () => {
      wall.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseUp = () => {
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

  return (
    <div
      className={`dragger__wall dragger__wall--${orientation}`}
      style={style}
      ref={wallRef}
      onDoubleClick={handleDoubleClick}
    ></div>
  );
}
