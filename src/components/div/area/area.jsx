import './area.css';

export function Area(props) {
  const {
    id,
    number,
    top,
    left,
    width,
    height,
    handleMouseEvents,
    minWidth,
    minHeight,
  } = props;

  const handleMouseClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (width <= minWidth || height <= minHeight) return;

    evt.target.classList.toggle('dragger__area--active');

    const removeSelection = () =>
      evt.target.classList.remove('dragger__area--active');

    handleMouseEvents({ id, removeSelection });
  };

  return (
    <div
      className={`dragger__area`}
      style={{ top, left, width, height }}
      data-number={`${number} (${width} x ${height})`}
      onClick={handleMouseClick}
    />
  );
}
