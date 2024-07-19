import './area.css';

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

  return (
    <div
      className={`dragger__area`}
      style={{ top, left, width, height }}
      onClick={handleMouseClick}
    />
  );
}
