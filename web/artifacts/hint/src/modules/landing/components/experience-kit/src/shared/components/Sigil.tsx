import type { CSSProperties } from "react";

export interface SigilProps {
  /** Pixel size of the square sigil. Default 56. */
  size?: number;
  /** Stroke color. Default the gold line token. */
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * Hint's house "diamond / eye / star" gold line sigil — the mark drawn
 * on card backs and module tiles. Decorative; aria-hidden by default.
 */
export function Sigil({
  size = 56,
  color = "var(--gold-line)",
  style,
  className,
}: SigilProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-24 -36 48 72"
      fill="none"
      stroke={color}
      strokeWidth={1.4}
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M 0 -28 L 18 0 L 0 28 L -18 0 Z" />
      <path d="M 0 -15 L 10 0 L 0 15 L -10 0 Z" />
      <circle cx="0" cy="0" r="2.4" fill={color} />
    </svg>
  );
}
