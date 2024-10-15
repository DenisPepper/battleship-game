import './cell.scss';

export function Cell(props) {
  const { name } = props;
  return <div className='cell'>{name}</div>;
}
