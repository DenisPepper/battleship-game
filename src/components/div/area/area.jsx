//import { useSate, useState } from 'react';

export function Area(props) {
  const { id, top, left, width, height, handleMouseEvents } = props;

  /*
  const handleMouseOver = () => {
    handleMouseEvents('setup', id);
  };
  */
  /*
  const handleMouseLeave = (evt) => {
    handleMouseEvents('drop');
    evt.target.classList.toggle('dragger__area--active')
  };
  */

  const handleMouseClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    handleMouseEvents('setup', id);
    evt.target.classList.toggle('dragger__area--active');
  };

  return (
    <div
      className={`dragger__area`}
      style={{ top, left, width, height }}
      //onMouseOver={handleMouseOver}
      //onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
    />
  );
}
