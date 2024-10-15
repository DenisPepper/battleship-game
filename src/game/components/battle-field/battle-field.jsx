import { useCount } from '../game-provider';
import './battle-field.scss';

function CountDisplat() {
  const { count } = useCount();
  return <div>current count is {count}</div>;
}

function Counter() {
  const { setCount } = useCount();
  const increment = () => setCount((prev) => prev + 1);
  return <button onClick={increment}>➕</button>;
}

export function BattleField() {
  return (
    <main>
      <CountDisplat />
      <Counter />
    </main>
  );
}
