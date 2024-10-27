import './cell.scss';

export function Cell(props) {
  const { row, cell, ship, nearby, touchHandler, removeHandler, shipCoords, shipsSouldRemove } = props;

  const isTouched = shipCoords.find((item) => item.row === row && item.cell === cell);

  const shouldRemove = shipsSouldRemove.find((item) => item === ship);

  const handleTouchStart = () => {
    if (nearby) return;
    if (!ship) touchHandler({ row, cell, action: isTouched ? 'remove' : 'add' });
    if (ship) removeHandler({ ship, cancel: shouldRemove });
  };

  return (
    <div
      className={`
        cell ${nearby ? 'cell--nearby' : ''} ${ship ? 'cell--ship' : ''} ${isTouched ? 'cell--touched' : ''} ${
        shouldRemove ? 'cell--remove' : ''
      }`}
      onTouchStart={handleTouchStart}
    >
      {`${row}.${cell}`}
    </div>
  );
}
