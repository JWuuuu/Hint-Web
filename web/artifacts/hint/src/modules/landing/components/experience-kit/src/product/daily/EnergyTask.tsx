import { useMemo, useState } from "react";
import type { EnergyTaskItem } from "../../shared/data/tarot";
import "./energy-task.css";

export interface EnergyTaskProps {
  /** Initial checklist. */
  items: EnergyTaskItem[];
  /** XP awarded when every item is done. Default 20. */
  reward?: number;
  /** Reward illustration (a lucky-object png). */
  rewardImage?: string;
  rewardLabel?: string;
  /** Fires once when the last item gets checked. */
  onComplete?: () => void;
}

/**
 * Energy Task — tonight's small ritual. Check items off; when all are done
 * the reward row lights up and onComplete fires (hook this to XP/streak).
 * Soft, magical, never a hard productivity list.
 */
export function EnergyTask({
  items,
  reward = 20,
  rewardImage = "/lucky/lavender.png",
  rewardLabel = "New moon badge",
  onComplete,
}: EnergyTaskProps) {
  const [state, setState] = useState<EnergyTaskItem[]>(items);

  const allDone = useMemo(() => state.every((i) => i.done), [state]);

  const toggle = (id: string) => {
    setState((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
      if (!prev.every((i) => i.done) && next.every((i) => i.done)) {
        // transitioned into complete
        queueMicrotask(() => onComplete?.());
      }
      return next;
    });
  };

  return (
    <div className={`hint-task${allDone ? " is-complete" : ""}`}>
      <div className="hint-task__head">
        <span className="hint-task__title">Tonight's ritual</span>
        <span className="hint-task__moon" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </span>
      </div>

      <ul className="hint-task__list">
        {state.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`hint-task__item${item.done ? " is-done" : ""}`}
              onClick={() => toggle(item.id)}
              aria-pressed={item.done}
            >
              <span className="hint-task__check" aria-hidden>
                {item.done ? "✓" : ""}
              </span>
              <span className="hint-task__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="hint-task__reward">
        <span className="hint-task__reward-img">
          <img src={rewardImage} alt="" draggable={false} />
        </span>
        <div>
          <p className="hint-task__reward-top">{allDone ? "Earned tonight" : "Finish to earn"}</p>
          <p className="hint-task__reward-amt">
            +{reward} XP · {rewardLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
