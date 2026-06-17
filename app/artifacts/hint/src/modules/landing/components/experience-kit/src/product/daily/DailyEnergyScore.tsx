import type { ScoreArea } from "../../shared/data/tarot";
import { useCountUp } from "../../shared/hooks/useCountUp";
import "./daily-energy-score.css";

export interface DailyEnergyScoreProps {
  /** Five life-area scores (love / career / emotion / luck / energy). */
  areas: ScoreArea[];
  /** Start the count-up + ring fill. Default true. Flip to true on draw/in-view. */
  active?: boolean;
  /** Optional overall headline number; omit to hide the center summary. */
  overall?: number;
  className?: string;
}

/** One ring — its own count-up so the number and arc rise together. */
function Ring({ area, active }: { area: ScoreArea; active: boolean }) {
  const value = useCountUp(area.value, { active, duration: 1300 });
  const deg = (value / 100) * 360;
  return (
    <div className="hint-des__ring-wrap">
      <div
        className="hint-des__ring"
        style={{
          // tone + live angle drive the conic gradient
          ["--tone" as string]: `var(${area.toneVar})`,
          ["--hint-ang" as string]: `${deg}deg`,
        }}
      >
        <div className="hint-des__hole">
          <span className="hint-des__num" style={{ color: `var(${area.toneVar})` }}>
            {value}
          </span>
        </div>
      </div>
      <span className="hint-des__label">{area.label}</span>
    </div>
  );
}

/**
 * Daily Energy Score — five astrology-scored rings that fill and count up
 * together. Pass `active` from an in-view observer or a "draw" action to
 * trigger the reveal. Numbers are Fraunces tabular in each area's tone.
 */
export function DailyEnergyScore({
  areas,
  active = true,
  overall,
  className,
}: DailyEnergyScoreProps) {
  const overallValue = useCountUp(overall ?? 0, { active: active && overall != null });

  return (
    <div className={`hint-des${className ? ` ${className}` : ""}`}>
      {overall != null && (
        <div className="hint-des__overall">
          <span className="hint-des__overall-num">{overallValue}</span>
          <span className="hint-des__overall-label">Overall tonight</span>
        </div>
      )}
      <div className="hint-des__rings">
        {areas.map((area) => (
          <Ring key={area.key} area={area} active={active} />
        ))}
      </div>
    </div>
  );
}
