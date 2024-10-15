import './App.scss';
import { BattleField } from './game/components/battle-field/battle-field';

export function App() {
  return (
    <div className={'app'}>
      <header className='app__header'>
        <h1>Battleship</h1>
      </header>
      <BattleField clss='app__game-field' />
    </div>
  );
}
