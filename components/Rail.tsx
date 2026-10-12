'use client';

import { useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, ReactNode } from 'react';

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

// A heading and one row of cards. When the cards do not fit, the row scrolls sideways:
// by swipe or trackpad, by dragging with a mouse, or with the arrow buttons.
// The side that still has more cards beyond it fades out instead of ending in a hard cut.
export default function Rail({ title, children }: { title: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, id: -1 });

  function updateEdges() {
    const row = rail.current;
    if (!row) return;
    const left = row.scrollLeft > 4;
    const right = row.scrollLeft + row.clientWidth < row.scrollWidth - 4;
    setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  }

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, []);

  function nudge(dir: 1 | -1) {
    const row = rail.current;
    if (!row) return;
    // One card plus the 16px gap.
    const first = row.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 16 : 280;
    row.scrollBy({ left: dir * step, behavior: scrollBehavior() });
  }

  // Drag the row sideways with a mouse. Touch screens already scroll it natively.
  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const row = rail.current;
    if (!row || e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: row.scrollLeft, id: e.pointerId };
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const row = rail.current;
    if (!row || !d.active || e.pointerId !== d.id) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 5) return; // a small wobble is still a click
      d.moved = true;
      setDragging(true);
      try {
        row.setPointerCapture(e.pointerId); // keep following the mouse outside the row
      } catch {}
    }
    row.scrollLeft = d.startScroll - dx;
  }

  function endDrag(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.id) return;
    d.active = false;
    if (d.moved) setDragging(false);
  }

  // A drag that ends over a card or link must not also click it.
  function onClickCapture(e: ReactMouseEvent<HTMLDivElement>) {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <div>
      <div className="sec-head">
        <h2>{title}</h2>
        {/* The buttons only appear when there are more cards than fit. */}
        {(edges.left || edges.right) && (
          <div className="rail-btns">
            <button className="rail-btn" type="button" aria-label={`Scroll ${title.toLowerCase()} left`} onClick={() => nudge(-1)}>
              ←
            </button>
            <button className="rail-btn" type="button" aria-label={`Scroll ${title.toLowerCase()} right`} onClick={() => nudge(1)}>
              →
            </button>
          </div>
        )}
      </div>

      <div
        className={`rail${dragging ? ' dragging' : ''}${edges.left ? ' fade-l' : ''}${edges.right ? ' fade-r' : ''}`}
        ref={rail}
        onScroll={updateEdges}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
    </div>
  );
}
