import { useState } from 'react';
import { Cell } from '../cell/cell';
import './battle-field.scss';
import { AddForm } from '../add-form/add-form';
import { BattleField as Field } from '/src/game/util/battle-field.js';

const field = new Field();
field.addShip(4, [
  { row: 1, cell: 1 },
  { row: 1, cell: 2 },
  { row: 1, cell: 3 },
  { row: 1, cell: 4 },
]);

export function BattleField(props) {
  const { clss } = props;
  const [shipCoords, setShipCoord] = useState([]);

  const handleCellTouch = (args) => {
    const { row, cell, action } = args;
    if (action === 'add') setShipCoord((coords) => [...coords, { row, cell }]);
    if (action === 'remove')
      setShipCoord((coords) => coords.filter((item) => `${item.row}.${item.cell}` !== `${row}.${cell}`));
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
                    touchHandler={handleCellTouch}
                    shipCoords={shipCoords}
                  />
                );
              })}
            </div>
          );
        })}
        <div className='placement'>
          <AddForm />
        </div>
      </section>
    </main>
  );
}
