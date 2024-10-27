import './cell.scss';

export function Cell(props) {
  const { row, cell, ship, touchHandler, shipCoords } = props;

  const isTouched = shipCoords.find((item) => item.row === row && item.cell === cell);

  const handleTouchStart = () => {
    if (ship) return;
    touchHandler({ row, cell, action: isTouched ? 'remove' : 'add' });
  };

  return (
    <div
      className={`
        cell 
        ${ship ? 'cell--with-ship' : ''} 
        ${isTouched ? 'cell--touched' : ''}`}
      onTouchStart={handleTouchStart}
    >
      {`${row}.${cell}`}
    </div>
  );
}
