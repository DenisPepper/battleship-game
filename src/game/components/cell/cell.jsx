import { useState } from 'react';
import './cell.scss';

export function Cell(props) {
  const { name, isPlacement = true, touchHandler } = props;
  const [touched, setTouched] = useState(false);

  const [row, cell] = name.split('.');

  const handleTouchStart = () => {
    if (isPlacement) {
      const isTouched = !touched;
      setTouched(isTouched);
      touchHandler({ row, cell, action: isTouched ? 'add' : 'remove' });
    }
  };

  return (
    <div className={`cell ${touched ? 'cell--touched' : ''}`} onTouchStart={handleTouchStart}>
      {name}
    </div>
  );
}
