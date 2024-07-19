import './area.css';

let wasRightClick = false;

export function Area(props) {
  const { id, top, left, width, height, handleMouseEvents } = props;

  const handleMouseClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    evt.target.classList.toggle('dragger__area--active');

    const removeSelection = () =>
      evt.target.classList.remove('dragger__area--active');

    handleMouseEvents({ id, removeSelection });
  };

  const handleMouseLeave = (evt) => {
    if (wasRightClick) {
      wasRightClick = false;
      return;
    }

    evt.target.classList.remove('dragger__area--active');
    handleMouseEvents({ id });
  };

  return (
    <div
      className={`dragger__area`}
      style={{ top, left, width, height }}
      onClick={handleMouseClick}
      onContextMenu={() => (wasRightClick = true)}
      onMouseLeave={handleMouseLeave}
    />
  );
}
