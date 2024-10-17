import { useState } from 'react';
import './cell.scss';

export function Cell(props) {
  const { name, isPlacement } = props;
  const [touched, setTouched] = useState(false);

  const handleTouchStart = () => {
    if (isPlacement) setTouched((prev) => !prev);
  };

  return (
    <div className={`cell ${touched ? 'cell--touched' : ''}`} onTouchStart={handleTouchStart}>
      {name}
    </div>
  );
}
