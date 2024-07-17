import { useRef, useCallback, useState, useEffect } from 'react';
import './home.css';
import {
  drawMDNSample,
  drawMDNSampleShapes,
  drawMDNSampleTriangle,
  drawMDNSampleSmile,
  drawMDNSampleTriangles,
  drawMDNSamplePackman,
} from './util/draw';

export function Home() {
  const [isAvailable, setIsAvailable] = useState(true);

  const ctxRef = useRef();
  const canvasRef = useRef();

  const canvas = useCallback((canvas) => {
    if (canvas === null) return;

    if (canvas.getContext) {
      canvasRef.current = canvas;
      ctxRef.current = canvas.getContext('2d');
      return;
    }

    setIsAvailable(false);
  }, []);

  useEffect(() => {
    setTimeout(() => drawMDNSample(ctxRef.current, canvasRef.current), 500);

    setTimeout(
      () => drawMDNSampleShapes(ctxRef.current, canvasRef.current),
      1000
    );
    setTimeout(
      () => drawMDNSampleTriangle(ctxRef.current, canvasRef.current),
      1500
    );
    setTimeout(
      () => drawMDNSampleSmile(ctxRef.current, canvasRef.current),
      2000
    );
    setTimeout(
      () => drawMDNSampleTriangles(ctxRef.current, canvasRef.current),
      2500
    );
    setTimeout(
      () => drawMDNSamplePackman(ctxRef.current, canvasRef.current),
      3000
    );
  }, []);

  if (!isAvailable) return <div>Your browser do not support canvas API!</div>;

  return (
    <canvas className='canvas-container' width={500} height={500} ref={canvas}>
      A visual design tool for the interior filling of the cabinet.
    </canvas>
  );
}
