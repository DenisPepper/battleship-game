import { Cell } from '../cell/cell';
import './battle-field.scss';

const buildCellsRow = (rowNumber) => ({ rowNumber, numbers: Array.from({ length: 10 }, (_, i) => i + 1) });
const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(buildCellsRow);

export function BattleField(props) {
  const { clss } = props;
  return (
    <main className={`${clss}`}>
      {cells.map((cell) => {
        return (
          <div className='cell-row' key={cell.rowNumber}>
            {cell.numbers.map((num) => {
              const id = `${cell.rowNumber}.${num}`;
              return <Cell key={id} name={id} />;
            })}
          </div>
        );
      })}
    </main>
  );
}
