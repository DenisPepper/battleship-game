import { useState } from 'react';
import { Cell } from '../cell/cell';
import './battle-field.scss';
import { AddForm } from '../add-form/add-form';

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
          <AddForm />
        </div>
      </section>
    </main>
  );
}
