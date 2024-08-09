import './context-menu.css';

const X_AXIS_SHIFT = 10;
const Y_AXIS_SHIFT = 10;

export function ContextMenu(props) {
  const { coords, closeMenu, addItem } = props;

  return (
    <menu
      className='dragger__ctx-menu'
      style={{ top: coords.y - Y_AXIS_SHIFT, left: coords.x - X_AXIS_SHIFT }}
      onMouseLeave={closeMenu}
    >
      <button type='button' onClick={() => addItem('vertical')}>
        ↕️ vertical panel
      </button>
      <button type='button' onClick={() => addItem('horizontal')}>
        ↔️ horizontal panel
      </button>
    </menu>
  );
}
