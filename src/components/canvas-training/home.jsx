import { useRef, useCallback, useState, useEffect } from 'react';

import './home.css';

export function Home() {
  const [isAvailable, setIsAvailable] = useState(true);

  const ctxRef = useRef();

  const canvasRef = useCallback((canvas) => {
    if (canvas === null) return;

    if (canvas.getContext) {
      ctxRef.current = canvas.getContext('2d');
      return;
    }

    setIsAvailable(false);
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;

    ctx.fillStyle = 'rgb(200 0 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgb(0 0 200 / 50%)';
    ctx.fillRect(30, 30, 50, 50);
  }, []);

  if (!isAvailable) return <div>Your browser do not support canvas API!</div>;

  return (
    <canvas
      className='canvas-container'
      width={500}
      height={500}
      ref={canvasRef}
    >
      A visual design tool for the interior filling of the cabinet.
    </canvas>
  );
}
