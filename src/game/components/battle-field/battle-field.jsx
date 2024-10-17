import { useState } from 'react';
import { Cell } from '../cell/cell';
import './battle-field.scss';

const buildCellsRow = (rowNumber) => ({ rowNumber, numbers: Array.from({ length: 10 }, (_, i) => i + 1) });
const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(buildCellsRow);

export function BattleField(props) {
  const { clss } = props;
  const [isPlacement, setIsPlacement] = useState(false);

  return (
    <main className={`${clss}`}>
      <section className='ships'>
        {cells.map((cell) => {
          return (
            <div className='cell-row' key={cell.rowNumber}>
              {cell.numbers.map((num) => {
                const id = `${cell.rowNumber}.${num}`;
                return <Cell key={id} name={id} isPlacement={isPlacement} />;
              })}
            </div>
          );
        })}
        <div className='placement'>
          <h2 className='placement__header'>Add a ship to the field:</h2>
          <div className='placement__controls'>
            <button className='placement__btn' type='button'>
              4
            </button>
            <button className='placement__btn' type='button'>
              3
            </button>
            <button className='placement__btn' type='button'>
              2
            </button>
            <button className='placement__btn' type='button'>
              1
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
