import { useState } from 'react';
import './cell.scss';

export function Cell(props) {
  const { name } = props;
  const [touched, setTouched] = useState(false);

  const handleTouchStart = () => setTouched(true);

  return (
    <div className={`cell ${touched && 'cell--touched'}`} onTouchStart={handleTouchStart}>
      {name}
    </div>
  );
}
