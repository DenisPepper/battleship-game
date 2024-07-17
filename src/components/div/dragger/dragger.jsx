import {
  DRAGGER_HEIGHT,
  DRAGGER_WIDTH,
  INNER_THICKNESS,
} from '../dragger-config.js';
import { DraggerWrapper } from '../dragger-wrapper/dragger-wrapper.jsx';
import './dragger.css';

export function Dragger() {
  return (
    <DraggerWrapper>
      <div
        className='dragger'
        style={{ width: DRAGGER_WIDTH, height: DRAGGER_HEIGHT }}
      >
        <div
          className='dragger__vertical'
          style={{ width: INNER_THICKNESS, height: '100%' }}
        ></div>
      </div>
    </DraggerWrapper>
  );
}
