import './wall.css';

export function Wall(props) {
  const {
    rect: { width, height, top, left },
    id,
    orientation,
    moveWall,
    parentTop,
    parentLeft,
  } = props;

  const style = {
    width,
    height,
    top,
    left,
  };

  const handleDoubleClick = () => {
    // удаляет перегородку
  };

  const handleDragEnd = (evt) => {
    const { clientY, clientX } = evt;
    if (orientation === 'vertical')
      moveWall(id, orientation, clientX - parentLeft);
    if (orientation === 'horizontal')
      moveWall(id, orientation, clientY - parentTop);
  };

  return (
    <div
      className={`dragger__wall dragger__wall--${orientation}`}
      style={style}
      onDoubleClick={handleDoubleClick}
      onDragEnd={handleDragEnd}
    ></div>
  );
}
