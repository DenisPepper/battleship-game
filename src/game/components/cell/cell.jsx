import './cell.scss';

export function Cell(props) {
  const { row, cell, ship, nearby, touchHandler, shipCoords } = props;

  const isTouched = shipCoords.find((item) => item.row === row && item.cell === cell);

  const handleTouchStart = () => {
    if (ship || nearby) return;
    touchHandler({ row, cell, action: isTouched ? 'remove' : 'add' });
  };

  return (
    <div
      className={`
        cell
        ${nearby ? 'cell--nearby' : ''} 
        ${ship ? 'cell--ship' : ''} 
        ${isTouched ? 'cell--touched' : ''}`}
      onTouchStart={handleTouchStart}
    >
      {`${row}.${cell}`}
    </div>
  );
}
