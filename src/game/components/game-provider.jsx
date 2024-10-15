import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

export function GameProvider(props) {
  const [count, setCount] = useState(0);
  const value = {
    count,
    setCount,
  };
  return <GameContext.Provider value={value} {...props} />;
}

export function useCount() {
  const gameContext = useContext(GameContext);
  if (!gameContext) throw new Error('useCount must be used within the CountProvider');
  return gameContext;
}
