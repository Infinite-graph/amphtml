/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as Preact from '../../../src/preact';
import * as styles from './base-carousel.css';
import {WithAmpContext} from '../../../src/preact/context';
import {debounce} from '../../../src/utils/rate-limit';
import {dict} from '../../../src/utils/object';
import {mod} from '../../../src/utils/math';
import {setStyle} from '../../../src/style';
import {useLayoutEffect, useMemo, useRef} from '../../../src/preact';

/**
 * How long to wait prior to resetting the scrolling position after the last
 * scroll event. Ideally this should be low, so that once the user stops
 * scrolling, things are immediately centered again. Since there can be some
 * delay between scroll events, and we do not want to interrupt a scroll with a
 * render, it cannot be too small. 200ms seems to be around the lower limit for
 * this value on Android / iOS.
 */
const RESET_SCROLL_REFERENCE_POINT_WAIT_MS = 200;

/**
 * @param {!JsonObject} props
 * @return {PreactDef.Renderable}
 */
export function Scroller(props) {
  const {
    'children': children, // Must be an array.
    'ignoreProgrammaticScroll': ignoreProgrammaticScroll,
    'loop': loop,
    'restingIndex': restingIndex,
    'setRestingIndex': setRestingIndex,
    'scrollRef': scrollRef,
  } = props;

  /**
   * The number of slides we want to place before the
   * reference or resting index. Only needed if loop=true.
   */
  const pivotIndex = Math.floor(children.length / 2);

  /**
   * The dynamic position that the slide at the resting index
   * is with respect to its scrolling order. Only needed if loop=true.
   */
  const offsetRef = useRef(restingIndex);
  const containerRef = useRef(null);
  const slides = renderSlides(
    dict({
      'children': children,
      'loop': loop,
      'offsetRef': offsetRef,
      'pivotIndex': pivotIndex,
      'restingIndex': restingIndex,
    })
  );
  const currentIndex = useRef(restingIndex);

  // useLayoutEffect needed to avoid FOUC while scrolling
  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    // TODO: We should use forwardRef to dedup scrollRef and containerRef.
    const container = (scrollRef.current = containerRef.current);
    ignoreProgrammaticScroll.current = true;
    setStyle(container, 'scrollBehavior', 'auto');
    container./* OK */ scrollLeft = loop
      ? container./* OK */ offsetWidth * pivotIndex
      : container./* OK */ offsetWidth * restingIndex;
    setStyle(container, 'scrollBehavior', 'smooth');
  }, [ignoreProgrammaticScroll, loop, restingIndex, pivotIndex, scrollRef]);

  // Trigger render by setting the resting index to the current scroll state.
  const debouncedResetScrollReferencePoint = useMemo(
    () =>
      debounce(
        window,
        () => {
          // Check if the resting index we are centered around is the same as where
          // we stopped scrolling. If so, we do not need to move anything.
          if (currentIndex.current === restingIndex) {
            return;
          }
          setRestingIndex(currentIndex.current);
        },
        RESET_SCROLL_REFERENCE_POINT_WAIT_MS
      ),
    [restingIndex, setRestingIndex]
  );

  // Track current slide without forcing render.
  // This is necessary for smooth scrolling because
  // intermediary renders will interupt scroll and cause jank.
  const updateCurrentIndex = () => {
    const container = containerRef.current;
    const slideOffset = Math.round(
      (container./* OK */ scrollLeft -
        offsetRef.current * container./* OK */ offsetWidth) /
        container./* OK */ offsetWidth
    );
    currentIndex.current = mod(slideOffset, children.length);
  };

  const handleScroll = () => {
    if (ignoreProgrammaticScroll.current) {
      ignoreProgrammaticScroll.current = false;
      return;
    }
    updateCurrentIndex();
    debouncedResetScrollReferencePoint();
  };

  return (
    <>
      <style>{styles.hideScrollbarPseudo}</style>
      <div
        hide-scrollbar
        key="container"
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          ...styles.scrollContainer,
          ...styles.hideScrollbar,
          ...styles.horizontalScroll,
        }}
        tabindex={0}
      >
        {slides}
      </div>
    </>
  );
}

/**
 * How the slides are ordered when looping:
 *
 * We want to make sure that the user can scroll all the way to the opposite
 * end (either forwards or backwards) of the carousel, but no further (no
 * looping back past where you started). We render elements dynamically
 * for a desirable scrolling order to allow the browser to scroll as well as
 * providing targets for the browser to snap on. This is important as these
 * targets need to be present before the scroll starts for things to work
 * correctly.
 *
 * The elements are ordered depending on the reference point, called
 * the restingIndex to allow full movement forwards and backwards. You can
 * imagine the DOM structure looks like the following if you have 5 slides:
 *
 * [1][2][3][4][5]
 *
 * When the restingIndex is the first index, we should translate slides as follows:
 *
 * [4][5][1][2][3]
 *
 * This ensures that if you move left or right, there is a slide to show.
 *
 * When the user stops scrolling, we update the restingIndex and show/hide the
 * appropriate spacers. For example, if the user started at slide '1' and moved
 * left to slide '4', the UI would eventually stop because there is
 * nothing more to the left of slide '4'.
 *
 * [4][5][1][2][3]
 *
 * Once scrolling stops, however, the reference point would be reset and this would
 * update to the following with the next render:
 *
 * [2][3][4][5][1]
 *
 * Ordering slides:
 *
 * Slides are ordered to be before or after the current slide and do not rearrange
 * dynamically as the user scrolls. Only once the scrolling has ended do they rearrange.
 * Currently, half the slides are ordered before and half the slides are ordered after.
 * This could be a bit smarter and only place as many as are necessary on either side of
 * the reference point to have a sufficient amount of buffer.
 *
 * Initial index:
 *
 * The initial index can be specified, which will make the carousel scroll to
 * the desired index when it first renders.
 *
 * @param {!JsonObject} props
 * @return {PreactDef.Renderable}
 */
function renderSlides(props) {
  const {
    'children': children,
    'restingIndex': restingIndex,
    'offsetRef': offsetRef,
    'pivotIndex': pivotIndex,
    'loop': loop,
  } = props;
  const {length} = children;
  const slides = [];

  children.forEach((child, index) => {
    const key = `slide-${child.key || index}`;
    slides.push(
      <WithAmpContext
        key={key}
        renderable={index == restingIndex}
        playable={index == restingIndex}
      >
        <div style={styles.slideElement}>{child}</div>
      </WithAmpContext>
    );
  });

  if (!loop) {
    return slides;
  }

  const before = [];
  const after = [];
  const shift = mod(length - restingIndex + pivotIndex, length);
  if (restingIndex <= pivotIndex) {
    for (let i = 0; i < shift; i++) {
      before.unshift(slides.pop());
    }
  } else {
    for (let i = 0; i < length - shift; i++) {
      after.push(slides.shift());
    }
  }

  offsetRef.current = before.length ? before.length : -after.length;
  return (
    <>
      {before}
      {slides}
      {after}
    </>
  );
}