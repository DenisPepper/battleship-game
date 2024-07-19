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

  const handleDrag = (evt) => {};

  const handleDragEnd = (evt) => {
    const { clientY, clientX } = evt;
    if (orientation === 'vertical')
      moveWall(id, orientation, clientX - parentLeft);
    if (orientation === 'horizontal')
      moveWall(id, orientation, clientY - parentTop);
  };

  return (
    <div
      className='dragger__wall'
      style={style}
      onDoubleClick={handleDoubleClick}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    ></div>
  );
}
