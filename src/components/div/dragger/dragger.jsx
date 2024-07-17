import { useRef, useState } from 'react';
import { DraggerWrapper } from '../dragger-wrapper/dragger-wrapper.jsx';
import { Area } from '../area/area.jsx';
import { ContextMenu } from '../context-menu/context-menu.jsx';
import {
  DRAGGER_HEIGHT,
  DRAGGER_WIDTH,
  INNER_THICKNESS,
} from '../dragger-config.js';
import {
  reduceArea,
  createAreaBefore,
  createAreaAfter,
} from '../dragger-util.js';
import './dragger.css';

const INITIAL_ID = 1;

const INITIAL_NEXT_AREA_ID = 2;

const INITIAL_AREA = {
  id: INITIAL_ID,
  top: 0,
  left: 0,
  width: DRAGGER_WIDTH,
  height: DRAGGER_HEIGHT,
};

const INITIAL_CTX_MENU = {
  positionX: 0,
  positionY: 0,
  isToggled: false,
  buttons: [
    {
      text: 'add vertical splitting',
      icon: '🔝',
      onClick: () => alert(this.text),
      isSpacer: false,
    },
    { text: '', icon: '', onClick: null, isSpacer: true },
    {
      text: 'add horizontal splitting',
      icon: '😡',
      onClick: () => alert(this.text),
      isSpacer: false,
    },
  ],
};

export function Dragger() {
  const [areas, setAreas] = useState([INITIAL_AREA]);
  const [activeArea, setActiveArea] = useState(null);
  const [nextAreaID, setNextAreaID] = useState(INITIAL_NEXT_AREA_ID);
  const [verticals, setVerticals] = useState([]);
  const [nextVerticalID, setNextVerticalID] = useState(INITIAL_ID);
  const [horizontals, setHorizontals] = useState([]);
  const [nextHorisontalID, setNextHorizontalID] = useState(INITIAL_ID);
  const [contextMenu, setContextMenu] = useState(INITIAL_CTX_MENU);
  const ctxRef = useRef(null);

  const handleAreaMouseEvents = (key, id) => {
    if (key === 'setup')
      setActiveArea(areas.filter((item) => item.id === id).at(0));

    if (key === 'drop') setActiveArea(null);
  };
  /*
  const handleVerticalSplitting = (evt) => {
    evt.preventDefault();
    //evt.target.classList.toggle('dragger__area--used');

    const width = reduceArea(activeArea.width, INNER_THICKNESS);
    const newAreaBefore = createAreaBefore(activeArea, nextAreaID, width);
    const newAreaAfter = createAreaAfter(
      activeArea,
      nextAreaID + 1,
      width,
      INNER_THICKNESS
    );
    const newVertical = {
      id: nextVerticalID,
      width: INNER_THICKNESS,
      height: activeArea.height,
      top: activeArea.top,
      left: activeArea.left + width,
    };
    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      newAreaBefore,
      newAreaAfter,
    ]);
    setVerticals((items) => [...items, newVertical]);
    setNextAreaID((id) => id + 2);
    setNextVerticalID((id) => id + 1);
    setActiveArea(null);
  };

  const handleHorizontalSplitting = (evt) => {
    console.log('click on devider!');
    evt.preventDefault();
    return;
    
    const height = reduceArea(activeArea.height, INNER_THICKNESS);
    const newAreaOver = {
      ...activeArea,
      height,
    };
    const newAreaUnder = {
      ...activeArea,
      id: nextAreaID,
      top: activeArea.top + height + INNER_THICKNESS,
      height,
    };
    const newHorisontal = {
      id: nextHorisontalID,
      width: activeArea.width,
      height: INNER_THICKNESS,
      top: activeArea.top + height,
      left: activeArea.left,
    };
    setAreas((areas) => [
      ...areas.filter((area) => area.id !== activeArea.id),
      newAreaOver,
      newAreaUnder,
    ]);
    setHorizontals((items) => [...items, newHorisontal]);
    setNextAreaID((id) => id + 1);
    setNextHorizontalID((id) => id + 1);
    setActiveArea(null);
   
  };
 */

  const handleOnContextMenu = (evt) => {
    evt.preventDefault();

    const ctxMenuRect = ctxRef.current.getBoundingClientRect();
  };

  return (
    <DraggerWrapper>
      <ContextMenu contextMenuRef={ctxRef} {...INITIAL_CTX_MENU} />
      <div
        className='dragger'
        style={{ width: DRAGGER_WIDTH, height: DRAGGER_HEIGHT }}
        onContextMenu={handleOnContextMenu}
      >
        {areas.map((item) => (
          <Area
            key={item.id}
            id={item.id}
            top={item.top}
            left={item.left}
            width={item.width}
            height={item.height}
            handleMouseEvents={handleAreaMouseEvents}
          />
        ))}
        {verticals.map((item) => (
          <div
            className='dragger__vertical'
            key={item.id}
            style={{
              width: item.width,
              height: item.height,
              top: item.top,
              left: item.left,
            }}
          />
        ))}
        {horizontals.map((item) => (
          <div
            className='dragger__horizontal'
            key={item.id}
            style={{
              width: item.width,
              height: item.height,
              top: item.top,
              left: item.left,
            }}
          />
        ))}
      </div>
    </DraggerWrapper>
  );
}
