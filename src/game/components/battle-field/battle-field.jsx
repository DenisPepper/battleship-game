import { useState } from 'react';
import { Cell } from '../cell/cell';
import './battle-field.scss';
import { AddForm } from '../add-form/add-form';
import { BattleField as Field } from '/src/game/util/battle-field.js';

const field = new Field();
const coords = [
  { row: 3, cell: 4 },
  { row: 3, cell: 5 },
  { row: 3, cell: 6 },
  { row: 3, cell: 7 },
];
field.addShip(coords, coords.length);

export function BattleField(props) {
  const { clss } = props;
  const [shipCoords, setShipCoord] = useState([]);

  const handleCellTouch = (args) => {
    const { row, cell, action } = args;
    if (action === 'add') setShipCoord((coords) => [...coords, { row, cell }]);
    if (action === 'remove')
      setShipCoord((coords) => coords.filter((item) => `${item.row}.${item.cell}` !== `${row}.${cell}`));
  };

  const addShip = () => {
    const isVertical = field.isValidVertical(shipCoords);
    const isHorizontal = field.isValidHorizontal(shipCoords);
    if (isVertical || isHorizontal) {
      field.addShip(shipCoords, shipCoords.length);
    }
    setShipCoord([]);
  };

  return (
    <main className={`${clss}`}>
      <section className='ships'>
        {field.getRows().map((row) => {
          return (
            <div className='cell-row' key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <Cell
                    key={`${row.id}.${cell.id}`}
                    row={row.id}
                    cell={cell.id}
                    ship={cell.ship}
                    nearby={cell.nearby}
                    touchHandler={handleCellTouch}
                    shipCoords={shipCoords}
                  />
                );
              })}
            </div>
          );
        })}
        <div className='placement'>
          <AddForm submitHandler={addShip} />
        </div>
      </section>
    </main>
  );
}
