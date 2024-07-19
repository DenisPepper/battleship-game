import './wall.css';

export function Wall(props) {
  const {
    rect: { width, height, top, left },
    id,
  } = props;

  return (
    <div
      className='dragger__wall'
      style={{
        width,
        height,
        top,
        left,
      }}
    ></div>
  );
}
