import './context-menu.css';

export function ContextMenu(props) {
  const {
    rightClickItem,
    positionX,
    positionY,
    isToggled,
    buttons,
    contextMenuRef,
  } = props;

  return (
    <menu
      className={`ctx-menu ${isToggled && 'active'}`}
      ref={contextMenuRef}
      style={{ top: positionY, left: positionX }}
    >
      {buttons.map((button, index) => {
        const handleClick = (evt) => {
          evt.stopPropagation();
          button.onClick(evt, rightClickItem);
        };

        if (button.isSpacer) return <hr key={index} />;

        return (
          <button
            className='ctx-menu__button'
            type='button'
            onClick={handleClick}
            key={button.text}
          >
            <span>{button.text}</span>
            <span className='ctx-munu__icon'>{button.icon}</span>
          </button>
        );
      })}
    </menu>
  );
}
