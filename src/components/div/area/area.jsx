//import { useRef } from 'react';
import './area.css';

export function Area(props) {
  const { id, top, left, width, height, handleMouseEvents } = props;

  //let wasRightClick = useRef(false);

  const handleMouseClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    evt.target.classList.toggle('dragger__area--active');

    const removeSelection = () =>
      evt.target.classList.remove('dragger__area--active');

    handleMouseEvents({ id, removeSelection });
  };

  /*
  const handleOnContextMenu = (evt) => {
    evt.preventDefault();
    wasRightClick.current = true;
  };

  const handleMouseLeave = (evt) => {
    if (wasRightClick.current) {
      wasRightClick.current = false;
      return;
    }

    evt.target.classList.remove('dragger__area--active');
    handleMouseEvents({ id });
  };
  */

  return (
    <div
      className={`dragger__area`}
      style={{ top, left, width, height }}
      onClick={handleMouseClick}
      //onContextMenu={handleOnContextMenu}
      //onMouseLeave={handleMouseLeave}
    />
  );
}
