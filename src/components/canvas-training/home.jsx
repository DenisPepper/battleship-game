import { useRef, useCallback, useState, useEffect } from 'react';
import './home.css';
import { drawMDNsample } from './util/draw';

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
    drawMDNsample(ctxRef.current);
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
