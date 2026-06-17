import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export interface CountUpOptions {
  /** ms the count takes. Default 1150. */
  duration?: number;
  /** start the animation only when this is true (e.g. in-view / drawn). */
  active?: boolean;
  /** ms delay before counting. Default 0. */
  delay?: number;
}

/**
 * Eased count from 0 → `target`. Cubic ease-out, cancels cleanly on
 * unmount / target change. Respects prefers-reduced-motion (snaps to
 * the target immediately).
 *
 *   const score = useCountUp(78, { active: drawn });
 */
export function useCountUp(target: number, options: CountUpOptions = {}): number {
  const { duration = 1150, active = true, delay = 0 } = options;
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (reduced) {
      setValue(target);
      return;
    }

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    };

    timer.current = window.setTimeout(run, delay);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    };
  }, [target, duration, active, delay, reduced]);

  return value;
}
