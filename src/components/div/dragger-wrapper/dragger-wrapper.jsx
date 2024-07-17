import './dragger-wrapper.css';

export function DraggerWrapper({ children }) {
  return (
    <div className='dragger-wrapper'>
      {children}
      <div className='dragger-wrapper__controls'>
        <button type='button' className='button--vertical'>
          Добавить вертикаль
        </button>
        <button type='button' className='button--horizontal'>
          Добавить горизонталь
        </button>
      </div>
    </div>
  );
}
