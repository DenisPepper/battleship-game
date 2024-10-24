import { useState } from 'react';
import { Cell } from '../cell/cell';
import './battle-field.scss';
import { AddForm } from '../add-form/add-form';
import { BattleField as Field } from '/src/game/util/battle-field.js';

const field = new Field();

export function BattleField(props) {
  const { clss } = props;
  const [shipCoords, setShipCoord] = useState([]);

  const handleCellTouch = (args) => {
    const { row, cell, action } = args;
    if (action === 'add') setShipCoord((coords) => [...coords, { row, cell }]);
    if (action === 'remove') setShipCoord((coords) => coords.filter((item) => item.row !== row && item.cell !== cell));
  };

  console.dir(shipCoords);

  return (
    <main className={`${clss}`}>
      <section className='ships'>
        {field.getRows().map((row) => {
          return (
            <div className='cell-row' key={row.id}>
              {row.cells.map((cell) => {
                const id = `${row.id}.${cell.id}`;
                return <Cell key={id} name={id} touchHandler={handleCellTouch} />;
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
