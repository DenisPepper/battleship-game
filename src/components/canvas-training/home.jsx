import { useRef, useCallback } from 'react';

import './home.css';

export function Home() {
  const ctxRef = useRef();

  const canvasRef = useCallback((canvas) => {
    if (canvas === null) return;
    ctxRef.current = canvas.getContext('2d');
  }, []);

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
