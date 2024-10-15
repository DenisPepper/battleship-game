import './App.scss';
import { BattleField } from './game/components/battle-field/battle-field';


export function App() {
  return (
    <div className={'app'}>
      <h1>Battleship</h1>
      <BattleField />
    </div>
  );
}
