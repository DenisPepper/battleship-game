import './context-menu.css';

export function ContextMenu(props) {
  const { coords, closeMenu, addItem } = props;

  return (
    <menu
      className='dragger__ctx-menu'
      style={{ top: coords.y, left: coords.x }}
    >
      <button type='button' onClick={() => addItem('vertical')}>
        Вертикальная перегородка
      </button>
      <button type='button' onClick={() => addItem('horizontal')}>
        Горизонтальная перегородка
      </button>
      <button type='button' onClick={closeMenu}>
        ❌
      </button>
    </menu>
  );
}
