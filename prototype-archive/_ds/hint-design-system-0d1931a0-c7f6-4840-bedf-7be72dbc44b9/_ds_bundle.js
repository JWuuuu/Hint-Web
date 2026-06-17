/* @ds-bundle: {"format":3,"namespace":"HintDesignSystem_0d1931","components":[{"name":"ChatBubble","sourcePath":"components/app/ChatBubble.jsx"},{"name":"ModuleTile","sourcePath":"components/app/ModuleTile.jsx"},{"name":"ThemeToggle","sourcePath":"components/app/ThemeToggle.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"GlassCard","sourcePath":"components/core/GlassCard.jsx"},{"name":"LuckyTile","sourcePath":"components/tarot/LuckyTile.jsx"},{"name":"ScoreMeter","sourcePath":"components/tarot/ScoreMeter.jsx"},{"name":"TarotCard","sourcePath":"components/tarot/TarotCard.jsx"}],"sourceHashes":{"components/app/ChatBubble.jsx":"64969fc04381","components/app/ModuleTile.jsx":"e8e41c9894fc","components/app/ThemeToggle.jsx":"c93242b881c9","components/core/Badge.jsx":"8c76bbc2788a","components/core/Button.jsx":"9bb1327d65bc","components/core/Eyebrow.jsx":"8f989bef8b84","components/core/GlassCard.jsx":"121a9ea5c970","components/tarot/LuckyTile.jsx":"66dc2b2105c8","components/tarot/ScoreMeter.jsx":"a156dcfa3df1","components/tarot/TarotCard.jsx":"c3a2d082caeb","prototypes/nightly-checkin/data.js":"c9b847b9a34b","prototypes/nightly-checkin/flow.jsx":"260b90bd2c3d","ui_kits/hint-app/data.js":"efb81a32ccc2","ui_kits/hint-app/screens/AskScreen.jsx":"192bea96a651","ui_kits/hint-app/screens/HomeScreen.jsx":"b5b1fa40874f","ui_kits/hint-app/screens/MeScreen.jsx":"6514960fad1c","ui_kits/hint-app/screens/RoomsScreen.jsx":"fe523f7641af","ui_kits/hint-app/screens/TarotScreen.jsx":"d32a727207e2","ui_kits/hint-app/shell.jsx":"5f7357fa47c9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HintDesignSystem_0d1931 = window.HintDesignSystem_0d1931 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/app/ChatBubble.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ChatBubble — a message in an Ask Hint thread. The user's words sit in
 * a frosted glass pill on the right; Hint's reply is ambient — Fraunces,
 * left-aligned, no container, as if the room is speaking.
 */
function ChatBubble({
  role = "hint",
  style = {},
  children,
  ...rest
}) {
  if (role === "user") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, rest), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "78%",
        padding: "12px 16px",
        borderRadius: "18px 18px 4px 18px",
        background: "var(--surface-soft)",
        border: "1px solid var(--border)",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        lineHeight: 1.5,
        color: "var(--text)",
        ...style
      }
    }, children));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      maxWidth: "84%",
      fontFamily: "var(--font-serif)",
      fontSize: 16.5,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      textShadow: "var(--halo-soft)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { ChatBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/ChatBubble.jsx", error: String((e && e.message) || e) }); }

// components/app/ModuleTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ModuleTile — a room entry in the home grid: a small gold sigil over a
 * deep navy tile, the room title in Fraunces, a one-line hint below.
 * Locked ("soon") rooms dim and show a Soon marker.
 */
function ModuleTile({
  title,
  hint,
  icon = null,
  locked = false,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: locked ? undefined : onClick,
    "aria-disabled": locked,
    style: {
      position: "relative",
      textAlign: "left",
      cursor: locked ? "default" : "pointer",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: 16,
      minHeight: 132,
      width: "100%",
      borderRadius: "var(--radius-md)",
      background: "var(--grad-tile)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-card)",
      opacity: locked ? 0.62 : 1,
      transition: "transform 0.2s var(--ease-out)",
      ...style
    },
    onMouseEnter: e => {
      if (!locked) e.currentTarget.style.transform = "translateY(-2px)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translateY(0)";
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--accent-gold)",
      background: "rgba(206,178,110,0.10)",
      border: "1px solid rgba(206,178,110,0.24)"
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 19,
      lineHeight: 1.15,
      color: "var(--text)",
      margin: 0
    }
  }, title), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      lineHeight: 1.4,
      color: "var(--text-faint)",
      margin: "6px 0 0"
    }
  }, hint)), locked && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 14,
      right: 14,
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color: "var(--text-faint)",
      border: "1px solid var(--border)",
      borderRadius: 999,
      padding: "3px 9px"
    }
  }, "Soon"));
}
Object.assign(__ds_scope, { ModuleTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/ModuleTile.jsx", error: String((e && e.message) || e) }); }

// components/app/ThemeToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ThemeToggle — the day/night pill from Hint's nav. Two segments (Sun /
 * Moon); the active one fills with the ember gradient. Controlled via
 * `theme` + `onChange`. Icons are passed in (Lucide Sun / Moon) so the
 * component stays dependency-free.
 */
function ThemeToggle({
  theme = "nocturne",
  onChange,
  sunIcon = "☀",
  moonIcon = "☾",
  style = {},
  ...rest
}) {
  const seg = active => ({
    display: "grid",
    placeItems: "center",
    width: 36,
    height: 36,
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    background: active ? "var(--grad-ember)" : "transparent",
    color: active ? "#FFFAF2" : "var(--text-muted)",
    boxShadow: active ? "0 8px 18px rgba(224,146,80,0.2)" : "none",
    transition: "background 0.3s var(--ease-out), color 0.3s var(--ease-out)"
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    "aria-label": "Theme",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: 4,
      borderRadius: 999,
      border: "1px solid var(--border)",
      background: "var(--surface-soft)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Day",
    "aria-pressed": theme === "daybreak",
    onClick: () => onChange && onChange("daybreak"),
    style: seg(theme === "daybreak")
  }, sunIcon), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Night",
    "aria-pressed": theme === "nocturne",
    onClick: () => onChange && onChange("nocturne"),
    style: seg(theme === "nocturne")
  }, moonIcon));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status / category chip. Default is a faint glass pill;
 * tones tint the border and ink. "soon" is the locked-feature style.
 */
function Badge({
  tone = "neutral",
  style = {},
  children,
  ...rest
}) {
  const tones = {
    neutral: {
      color: "var(--text-muted)",
      border: "var(--border)",
      bg: "var(--surface-soft)"
    },
    gold: {
      color: "var(--accent-gold)",
      border: "var(--gold-edge)",
      bg: "rgba(203,168,102,0.10)"
    },
    aqua: {
      color: "var(--accent-aqua)",
      border: "rgba(134,214,199,0.34)",
      bg: "rgba(134,214,199,0.10)"
    },
    rose: {
      color: "var(--hint-rose)",
      border: "rgba(203,166,196,0.34)",
      bg: "rgba(203,166,196,0.10)"
    },
    soon: {
      color: "var(--text-faint)",
      border: "var(--border)",
      bg: "transparent"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 24,
      padding: "0 10px",
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: tone === "soon" ? "0.12em" : "0.02em",
      textTransform: tone === "soon" ? "uppercase" : "none",
      color: t.color,
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Hint's pill-shaped action. The primary variant is the warm
 * "ember" gradient used for app-entry CTAs; secondary is frosted glass;
 * ghost is borderless; gold is the metal fill for ritual confirmations.
 */
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  href = null,
  onClick,
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 36,
      padding: "0 16px",
      font: 13
    },
    md: {
      height: 44,
      padding: "0 22px",
      font: 14
    },
    lg: {
      height: 52,
      padding: "0 30px",
      font: 15
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--grad-ember)",
      color: "var(--text-on-accent)",
      border: "1px solid transparent",
      boxShadow: "0 14px 28px rgba(241,166,107,0.20)"
    },
    gold: {
      background: "var(--grad-gold)",
      color: "#231D2A",
      border: "1px solid transparent",
      boxShadow: "0 18px 30px rgba(219,142,85,0.22)"
    },
    secondary: {
      background: "var(--surface-soft)",
      color: "var(--text)",
      border: "1px solid var(--border-strong)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text)",
      border: "1px solid transparent",
      boxShadow: "none"
    },
    outline: {
      background: "var(--surface-soft)",
      color: "var(--text)",
      border: "1px solid var(--gold-edge)",
      boxShadow: "none"
    }
  };
  const v = variants[variant] || variants.primary;
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: s.height,
    minHeight: s.height,
    padding: s.padding,
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontSize: s.font,
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform 0.18s var(--ease-out), filter 0.18s var(--ease-out), box-shadow 0.18s var(--ease-out)",
    ...v,
    ...style
  };
  const hover = e => {
    if (!disabled) e.currentTarget.style.transform = "translateY(-1px)";
  };
  const leave = e => {
    e.currentTarget.style.transform = "translateY(0)";
  };
  const down = e => {
    if (!disabled) e.currentTarget.style.transform = "translateY(0) scale(0.98)";
  };
  const up = e => {
    if (!disabled) e.currentTarget.style.transform = "translateY(-1px)";
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeft, children, iconRight);
  const handlers = {
    onMouseEnter: hover,
    onMouseLeave: leave,
    onMouseDown: down,
    onMouseUp: up
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: baseStyle,
      onClick: onClick
    }, handlers, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    style: baseStyle,
    disabled: disabled,
    onClick: onClick
  }, handlers, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the brand's signature section marker: uppercase Hanken
 * Grotesk, wide tracking, gold ink. Sits above titles and on cards.
 */
function Eyebrow({
  tone = "gold",
  tracking = "normal",
  style = {},
  children,
  ...rest
}) {
  const color = tone === "muted" ? "var(--text-muted)" : tone === "aqua" ? "var(--accent-aqua)" : "var(--accent-gold)";
  const letterSpacing = tracking === "wide" ? "0.32em" : "0.18em";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: tracking === "wide" ? 10 : 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing,
      color,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GlassCard — the frosted panel that every Hint surface is built from.
 * Three elevations: soft (list rows), card (default), hero (ritual
 * chambers & feature panels with the warm glow wash).
 */
function GlassCard({
  elevation = "card",
  glow = false,
  radius = "lg",
  padding = 20,
  style = {},
  children,
  ...rest
}) {
  const radii = {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-2xl)"
  };
  const surfaces = {
    soft: {
      background: "var(--surface-soft)",
      boxShadow: "var(--shadow-card)"
    },
    card: {
      background: "var(--card-surface)",
      boxShadow: "var(--shadow-card)"
    },
    hero: {
      background: "var(--surface-strong)",
      boxShadow: "var(--shadow-elevated)"
    }
  };
  const s = surfaces[elevation] || surfaces.card;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: radii[radius] || radii.lg,
      border: "1px solid var(--border)",
      padding,
      ...s,
      ...style
    }
  }, rest), glow && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(560px 380px at 18% 28%, rgba(122,226,214,0.16), transparent 68%), radial-gradient(480px 320px at 86% 8%, rgba(239,166,116,0.12), transparent 68%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, children));
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/tarot/LuckyTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LuckyTile — one of the six "lucky" tiles (color, jewelry, number,
 * food, carry, flower). A soft pastel object illustration in a rounded
 * ivory chip, with the value in Fraunces and a small sans label.
 */
function LuckyTile({
  image = null,
  value,
  label,
  swatch = null,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "14px 10px",
      textAlign: "center",
      borderRadius: "var(--radius-md)",
      background: "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: swatch || "#FFFDF8",
      boxShadow: "0 10px 24px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.86)",
      border: "1px solid var(--border)"
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: value,
    style: {
      width: 44,
      height: 44,
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 16,
      lineHeight: 1.1,
      color: "var(--text)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      fontWeight: 600,
      color: "var(--text-faint)"
    }
  }, label));
}
Object.assign(__ds_scope, { LuckyTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tarot/LuckyTile.jsx", error: String((e && e.message) || e) }); }

// components/tarot/ScoreMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  love: "var(--score-love)",
  wealth: "var(--score-wealth)",
  career: "var(--score-career)",
  study: "var(--score-study)",
  people: "var(--score-people)",
  overall: "var(--score-ink)"
};

/**
 * ScoreMeter — a labelled life-area score: the number set in Fraunces
 * in its own tone, over a thin gradient track. Used across the daily
 * report and the signals panel. Layout "row" (label · number · bar) or
 * "stack" (number on top of a vertical-feeling bar).
 */
function ScoreMeter({
  label,
  score = 0,
  area = "overall",
  layout = "row",
  style = {},
  ...rest
}) {
  const tone = TONES[area] || TONES.overall;
  const pct = Math.max(0, Math.min(100, score));
  const bar = /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 999,
      overflow: "hidden",
      background: "color-mix(in srgb, var(--border) 62%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${pct}%`,
      borderRadius: 999,
      background: `linear-gradient(90deg, ${tone}, color-mix(in srgb, ${tone} 30%, transparent))`
    }
  }));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "var(--text)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 23,
      lineHeight: 1,
      fontVariantNumeric: "tabular-nums",
      color: tone,
      textShadow: area === "overall" ? "var(--score-shadow)" : "none"
    }
  }, score)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, bar));
}
Object.assign(__ds_scope, { ScoreMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tarot/ScoreMeter.jsx", error: String((e && e.message) || e) }); }

// components/tarot/TarotCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const BACKS = {
  nocturne: "linear-gradient(155deg, #121012 0%, #0a0709 50%, #0d0a0c 100%)",
  deck: "var(--grad-deck)"
};

/**
 * TarotCard — a flip card in the house aspect ratio. The back shows a
 * gold diamond sigil on obsidian; the front shows a card image (Rider-
 * Waite style) with the card name + whisper. Tap to flip. Controlled
 * (pass `flipped` + `onFlip`) or uncontrolled.
 */
function TarotCard({
  name,
  whisper,
  image = null,
  back = "deck",
  width = 160,
  flipped: controlledFlipped,
  onFlip,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = useState(false);
  const flipped = controlledFlipped !== undefined ? controlledFlipped : internal;
  const toggle = () => {
    if (onFlip) onFlip(!flipped);
    if (controlledFlipped === undefined) setInternal(f => !f);
  };
  const face = {
    position: "absolute",
    inset: 0,
    borderRadius: 12,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    border: "1px solid var(--gold-edge)",
    transition: "opacity 0.18s linear 0.42s"
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: toggle,
    "aria-label": flipped ? `Tarot card: ${name}` : "Reveal card",
    style: {
      width,
      aspectRatio: "46 / 71",
      position: "relative",
      perspective: 1200,
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.5))",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      transformStyle: "preserve-3d",
      transition: "transform var(--dur-slow) var(--ease-flip)",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...face,
      opacity: flipped ? 0 : 1,
      background: BACKS[back] || BACKS.deck
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 6,
      borderRadius: 8,
      border: "0.5px solid var(--gold-edge)",
      boxShadow: "inset 0 0 16px var(--gold-bloom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "56%",
    height: "56%",
    viewBox: "-24 -36 48 72",
    fill: "none",
    stroke: "var(--gold-line)",
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -28 L 18 0 L 0 28 L -18 0 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 -15 L 10 0 L 0 15 L -10 0 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "2.4",
    fill: "var(--gold-line)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...face,
      opacity: flipped ? 1 : 0,
      transform: "rotateY(180deg)",
      background: "var(--grad-deck)",
      display: "flex",
      flexDirection: "column"
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "56%",
    height: "56%",
    viewBox: "-24 -36 48 72",
    fill: "none",
    stroke: "var(--gold-line)",
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -28 L 18 0 L 0 28 L -18 0 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "6",
    fill: "var(--gold-line)"
  }))))));
}
Object.assign(__ds_scope, { TarotCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tarot/TarotCard.jsx", error: String((e && e.message) || e) }); }

// prototypes/nightly-checkin/data.js
try { (() => {
/* Nightly Check-in — flow data. Eight "weathers", each mapping to a
   journal prompt, a drawn card, an ambient reflection, and one small task.
   Voice + card art lifted from the Hint brand. */
window.Nightly = window.Nightly || {};
window.Nightly.weathers = [{
  id: "clear",
  label: "Clear",
  icon: "moon-star",
  hue: "#9FD4E6",
  note: "settled, quiet",
  card: {
    name: "The Sun",
    img: "../../assets/tarot/cards/19-TheSun.jpg"
  },
  prompt: "What made tonight feel lighter than it had to be?",
  reflect: "Clear nights are easy to waste by bracing for the next storm. You don't have to. Let this one be exactly as calm as it is."
}, {
  id: "cloudy",
  label: "Cloudy",
  icon: "cloud",
  hue: "#A9B2C4",
  note: "unsure, in-between",
  card: {
    name: "The Moon",
    img: "../../assets/tarot/cards/18-TheMoon.jpg"
  },
  prompt: "What are you not quite ready to name yet?",
  reflect: "You don't owe yourself a conclusion tonight. Some things only come into focus after you've slept on them. Cloud cover isn't the same as dark."
}, {
  id: "heavy",
  label: "Heavy",
  icon: "cloud-rain",
  hue: "#8C93AE",
  note: "weighed down",
  card: {
    name: "The Star",
    img: "../../assets/tarot/cards/17-TheStar.jpg"
  },
  prompt: "Where did the weight come from — and is any of it yours to put down?",
  reflect: "Heavy isn't a verdict on you. It's a signal you carried more than one person should today. Set one thing down before you sleep. Just one."
}, {
  id: "restless",
  label: "Restless",
  icon: "wind",
  hue: "#B8A6D8",
  note: "can't settle",
  card: {
    name: "Wheel of Fortune",
    img: "../../assets/tarot/cards/10-WheelOfFortune.jpg"
  },
  prompt: "What is your mind circling back to, even now?",
  reflect: "The thought keeps returning because part of you hasn't been heard yet. You don't have to solve it. Just let it finish its sentence."
}, {
  id: "tender",
  label: "Tender",
  icon: "heart",
  hue: "#EAA6C4",
  note: "soft, open",
  card: {
    name: "The Lovers",
    img: "../../assets/tarot/cards/06-TheLovers.jpg"
  },
  prompt: "Who, or what, softened you today?",
  reflect: "Tenderness isn't fragility. It's the part of you that's still willing to be moved. Protect it, but don't apologize for it."
}, {
  id: "foggy",
  label: "Foggy",
  icon: "cloud-fog",
  hue: "#AEB8C0",
  note: "hazy, far away",
  card: {
    name: "The High Priestess",
    img: "../../assets/tarot/cards/02-TheHighPriestess.jpg"
  },
  prompt: "If the fog lifted for one second, what would you see?",
  reflect: "You already know more than the fog is letting you feel. Stop straining to see the whole road. The next step is enough."
}, {
  id: "bright",
  label: "Bright",
  icon: "sparkles",
  hue: "#F0CE83",
  note: "lit up",
  card: {
    name: "The World",
    img: "../../assets/tarot/cards/21-TheWorld.jpg"
  },
  prompt: "What went right that you'd usually rush past?",
  reflect: "Bright nights deserve to be recorded as carefully as the hard ones. Name the good thing out loud so the next dark night has something to borrow."
}, {
  id: "storm",
  label: "Storm",
  icon: "cloud-lightning",
  hue: "#9A93C6",
  note: "turbulent",
  card: {
    name: "The Fool",
    img: "../../assets/tarot/cards/00-TheFool.jpg"
  },
  prompt: "What broke open today — and what might it make room for?",
  reflect: "Storms end. They always end. What feels like everything falling apart is sometimes just everything rearranging. Sleep first. Decide later."
}];
window.Nightly.tasks = {
  clear: "Leave one good thing un-analyzed tonight.",
  cloudy: "Write the question down, then close the notebook.",
  heavy: "Put your phone face-down and breathe out slowly, twice.",
  restless: "Say the looping thought aloud, once, then let it go.",
  tender: "Send the kind message before you talk yourself out of it.",
  foggy: "Pick the single next step. Ignore the rest till morning.",
  bright: "Tell one person about the good thing tomorrow.",
  storm: "Drink a glass of water. Decisions can wait for daylight."
};
window.Nightly.intensity = ["barely there", "a low hum", "noticeable", "loud", "all of me"];
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/nightly-checkin/data.js", error: String((e && e.message) || e) }); }

// prototypes/nightly-checkin/flow.jsx
try { (() => {
/* Nightly Check-in — the full ritual flow.
   Steps: intro → weather → intensity → write → listening → reflection → kept
   Composes the Hint design-system primitives over the shared tokens. */
const {
  useState,
  useEffect,
  useRef
} = React;
const DS = window.HintDesignSystem_0d1931;
const {
  GlassCard,
  Eyebrow,
  Button,
  TarotCard,
  ThemeToggle
} = DS;

/* ── Lucide icon (builds SVG from IconNode data) ───────────────── */
function toPascal(n) {
  return n.split("-").map(p => p[0].toUpperCase() + p.slice(1)).join("");
}
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  style = {}
}) {
  const lib = window.lucide || {};
  const node = lib[toPascal(name)] || lib.icons && lib.icons[toPascal(name)];
  const kids = node && Array.isArray(node[2]) ? node[2] : [];
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "inline-block",
      flexShrink: 0,
      ...style
    }
  }, kids.map(([t, a], i) => React.createElement(t, {
    key: i,
    ...a
  })));
}

/* ── Persistent atmosphere: starfield + glows behind every step ── */
function Atmosphere() {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--bg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.8,
      backgroundImage: "radial-gradient(1.4px 1.4px at 18% 22%, rgba(255,251,236,0.7), transparent), radial-gradient(1.2px 1.2px at 72% 16%, rgba(148,226,219,0.5), transparent), radial-gradient(1px 1px at 40% 60%, rgba(255,251,236,0.5), transparent), radial-gradient(1.3px 1.3px at 84% 54%, rgba(255,251,236,0.45), transparent), radial-gradient(1px 1px at 28% 82%, rgba(148,226,219,0.4), transparent), radial-gradient(1.1px 1.1px at 62% 88%, rgba(255,251,236,0.4), transparent)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -60,
      right: -40,
      width: 220,
      height: 220,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(203,168,102,0.18), transparent 65%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      boxShadow: "inset 0 0 120px rgba(0,0,0,0.55)"
    }
  }));
}

/* ── Thin gold progress rail ────────────────────────────────────── */
function Progress({
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      borderRadius: 999,
      background: "rgba(255,255,255,0.08)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${value * 100}%`,
      background: "linear-gradient(90deg, var(--accent-gold), var(--hint-gold-bright))",
      transition: "width 0.6s var(--ease-out)"
    }
  }));
}

/* Fade-in wrapper — transition-driven (CSS @keyframes are unreliable in some
   preview sandboxes; transitions are not). Always ends fully visible. */
function Fade({
  children,
  style
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(10px)",
      transition: "opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out)",
      ...style
    }
  }, children);
}

/* ════════════════════════ STEP 0 · INTRO ════════════════════════ */
function IntroStep({
  onBegin
}) {
  return /*#__PURE__*/React.createElement(Fade, {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "0 30px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/hint-card-logo.png",
    alt: "Hint",
    style: {
      width: 64,
      height: 64,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "var(--shadow-card)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tracking: "wide"
  }, "Before you sleep")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 38,
      lineHeight: 1.04,
      color: "var(--text-strong)",
      margin: "14px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, "Let's close the day together."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      lineHeight: 1.65,
      color: "var(--text-muted)",
      margin: "16px 0 0",
      maxWidth: 290
    }
  }, "A few quiet minutes. Name how tonight feels, say a little, and let Hint say it back to you."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onBegin,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Begin tonight's check-in")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      color: "var(--text-faint)",
      margin: "18px 0 0"
    }
  }, "Private to you \xB7 about 3 minutes"));
}

/* ════════════════════════ STEP 1 · WEATHER ══════════════════════ */
function WeatherStep({
  value,
  onChange,
  onNext
}) {
  const weathers = window.Nightly.weathers;
  return /*#__PURE__*/React.createElement(Fade, {
    style: {
      padding: "8px 4px 0"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Step one \xB7 the weather inside"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 28,
      lineHeight: 1.08,
      color: "var(--text-strong)",
      margin: "10px 0 4px"
    }
  }, "Name the weather inside you."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 14,
      color: "var(--text-muted)",
      margin: "0 0 18px"
    }
  }, "Not the day's events \u2014 the climate they left behind."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, weathers.map(w => {
    const active = value === w.id;
    return /*#__PURE__*/React.createElement("button", {
      key: w.id,
      onClick: () => onChange(w.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 14px",
        textAlign: "left",
        cursor: "pointer",
        borderRadius: "var(--radius-md)",
        border: active ? "1px solid var(--gold-line)" : "1px solid var(--border)",
        background: active ? "linear-gradient(150deg, rgba(203,168,102,0.16), rgba(10,15,28,0.5))" : "var(--surface-soft)",
        boxShadow: active ? "var(--gold-halo)" : "none",
        transition: "all 0.2s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        width: 38,
        height: 38,
        borderRadius: 11,
        flexShrink: 0,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid var(--border)",
        color: w.hue
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: w.icon,
      size: 20
    })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-serif)",
        fontSize: 17,
        color: "var(--text)"
      }
    }, w.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        color: "var(--text-faint)",
        marginTop: 1
      }
    }, w.note)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    disabled: !value,
    onClick: onNext,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Continue")));
}

/* ════════════════════════ STEP 2 · INTENSITY ════════════════════ */
function IntensityStep({
  weather,
  value,
  onChange,
  onNext
}) {
  const w = window.Nightly.weathers.find(x => x.id === weather);
  const labels = window.Nightly.intensity;
  return /*#__PURE__*/React.createElement(Fade, {
    style: {
      padding: "8px 4px 0",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Step two \xB7 how much"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 28,
      lineHeight: 1.08,
      color: "var(--text-strong)",
      margin: "10px 0 4px"
    }
  }, "How ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: w.hue
    }
  }, w.label.toLowerCase()), ", tonight?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 14,
      color: "var(--text-muted)",
      margin: "0 0 30px"
    }
  }, "There's no wrong amount. Just notice it."), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "hero",
    glow: true,
    padding: 24
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 76,
      height: 76,
      margin: "0 auto",
      borderRadius: 22,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid var(--border)",
      color: w.hue,
      boxShadow: `0 0 ${18 + value * 9}px ${w.hue}55`,
      transition: "box-shadow 0.3s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: w.icon,
    size: 34,
    strokeWidth: 1.6
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 22,
      color: "var(--text)",
      margin: "18px 0 0"
    }
  }, labels[value])), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "4",
    step: "1",
    value: value,
    onChange: e => onChange(Number(e.target.value)),
    className: "nk-range",
    style: {
      width: "100%",
      marginTop: 22,
      accentColor: w.hue
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 10.5,
      color: "var(--text-faint)"
    }
  }, "barely there"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 10.5,
      color: "var(--text-faint)"
    }
  }, "all of me"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    onClick: onNext,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Continue")));
}

/* ════════════════════════ STEP 3 · WRITE ════════════════════════ */
function WriteStep({
  weather,
  value,
  onChange,
  onNext
}) {
  const w = window.Nightly.weathers.find(x => x.id === weather);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);
  return /*#__PURE__*/React.createElement(Fade, {
    style: {
      padding: "8px 4px 0",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Step three \xB7 say it"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 26,
      lineHeight: 1.1,
      color: "var(--text-strong)",
      margin: "10px 0 14px"
    }
  }, w.prompt), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    ref: ref,
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: "Say it, even quietly\u2026",
    style: {
      width: "100%",
      minHeight: 200,
      padding: 18,
      borderRadius: "var(--radius-lg)",
      resize: "none",
      border: "1px solid var(--border-strong)",
      background: "var(--input-bg)",
      color: "var(--text)",
      fontFamily: "var(--font-serif)",
      fontSize: 17,
      lineHeight: 1.6,
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 12,
    color: "var(--text-faint)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      color: "var(--text-faint)"
    }
  }, "Only you will ever read this.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: onNext
  }, "Skip"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onNext,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, value.trim() ? "Let Hint sit with this" : "Continue without words")));
}

/* ════════════════════════ STEP 4 · LISTENING ════════════════════ */
function ListeningStep({
  onDone
}) {
  const [big, setBig] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setBig(b => !b), 750);
    const t = setTimeout(onDone, 2600);
    return () => {
      clearInterval(iv);
      clearTimeout(t);
    };
  }, []);
  return /*#__PURE__*/React.createElement(Fade, {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "0 36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 999,
      background: "var(--hint-gold-bright)",
      boxShadow: "0 0 26px var(--hint-gold-bright)",
      transform: big ? "scale(1.5)" : "scale(1)",
      opacity: big ? 1 : 0.6,
      transition: "transform 0.75s var(--ease-out), opacity 0.75s var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 19,
      color: "var(--text-muted)",
      margin: "30px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, "Hint is sitting with what you brought\u2026"));
}

/* ════════════════════════ STEP 5 · REFLECTION ═══════════════════ */
function ReflectionStep({
  weather,
  intensity,
  onNext
}) {
  const w = window.Nightly.weathers.find(x => x.id === weather);
  const task = window.Nightly.tasks[weather];
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 650);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement(Fade, {
    style: {
      padding: "8px 4px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tonight's card for you"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "16px 0 6px"
    }
  }, /*#__PURE__*/React.createElement(TarotCard, {
    name: w.card.name,
    image: w.card.img,
    width: 140,
    flipped: revealed,
    onFlip: setRevealed
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 22,
      color: "var(--text)",
      margin: "6px 0 0"
    }
  }, w.card.name)), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "hero",
    glow: true,
    padding: 22,
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "aqua"
  }, "What Hint hears"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 18,
      lineHeight: 1.55,
      color: "var(--text-muted)",
      margin: "10px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, w.reflect)), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "card",
    padding: 18,
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 13,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 38,
      height: 38,
      flexShrink: 0,
      borderRadius: 11,
      color: "var(--accent-gold)",
      background: "rgba(206,178,110,0.10)",
      border: "1px solid rgba(206,178,110,0.24)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "feather",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "One small thing"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 16,
      lineHeight: 1.4,
      color: "var(--text)",
      margin: "6px 0 0"
    }
  }, task)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    fullWidth: true,
    size: "lg",
    onClick: onNext,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16,
      strokeWidth: 2.2
    })
  }, "Keep tonight")));
}

/* ════════════════════════ STEP 6 · KEPT ═════════════════════════ */
function KeptStep({
  weather,
  intensity,
  text,
  onRestart
}) {
  const w = window.Nightly.weathers.find(x => x.id === weather);
  const labels = window.Nightly.intensity;
  return /*#__PURE__*/React.createElement(Fade, {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 56,
      height: 56,
      margin: "0 auto 16px",
      borderRadius: 999,
      background: "linear-gradient(135deg, #8ee2d4, #f3cf82)",
      color: "#16231f",
      boxShadow: "0 0 26px rgba(142,226,212,0.4)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 26,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement(Eyebrow, {
    tracking: "wide"
  }, "Kept"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 32,
      lineHeight: 1.05,
      color: "var(--text-strong)",
      margin: "12px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, "Tonight is saved."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: "10px auto 0",
      maxWidth: 280
    }
  }, "It's in your nights now. Hint will remember the weather when you come back.")), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "card",
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 44,
      height: 44,
      borderRadius: 12,
      flexShrink: 0,
      color: w.hue,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: w.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 18,
      color: "var(--text)",
      margin: 0
    }
  }, w.label, " \xB7 ", labels[intensity]), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 11.5,
      color: "var(--text-faint)",
      margin: "2px 0 0"
    }
  }, "Tuesday \xB7 9:42 PM \xB7 ", w.card.name))), text.trim() && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 14,
      lineHeight: 1.55,
      color: "var(--text-muted)",
      margin: "14px 0 0",
      paddingTop: 14,
      borderTop: "1px solid var(--border)"
    }
  }, "\"", text.trim(), "\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "moon",
      size: 16
    })
  }, "Close the room"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    onClick: onRestart
  }, "Start over")));
}

/* ════════════════════════ CONTROLLER ════════════════════════════ */
const STORE = "hint-nightly-v1";
const STEPS = ["intro", "weather", "intensity", "write", "listening", "reflection", "kept"];
function NightlyApp() {
  const [theme, setTheme] = useState("nocturne");
  const [step, setStep] = useState(0);
  const [weather, setWeather] = useState(null);
  const [intensity, setIntensity] = useState(2);
  const [text, setText] = useState("");

  // restore
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE) || "null");
      if (s) {
        setStep(s.step ?? 0);
        setWeather(s.weather ?? null);
        setIntensity(s.intensity ?? 2);
        setText(s.text ?? "");
        setTheme(s.theme ?? "nocturne");
      }
    } catch (e) {}
  }, []);
  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify({
        step,
        weather,
        intensity,
        text,
        theme
      }));
    } catch (e) {}
  }, [step, weather, intensity, text, theme]);
  const go = n => setStep(n);
  const restart = () => {
    setStep(0);
    setWeather(null);
    setIntensity(2);
    setText("");
  };
  const showProgress = step >= 1 && step <= 5;
  const progressVal = (step - 1) / 4;
  return /*#__PURE__*/React.createElement("div", {
    className: "nk-phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nk-screen",
    "data-hint-theme": theme
  }, /*#__PURE__*/React.createElement("div", {
    className: "nk-notch"
  }), /*#__PURE__*/React.createElement(Atmosphere, null), step > 0 && step !== 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 22,
      left: 18,
      right: 18,
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go(Math.max(0, step === 5 ? 3 : step - 1)),
    "aria-label": "Back",
    style: {
      display: "grid",
      placeItems: "center",
      width: 34,
      height: 34,
      flexShrink: 0,
      borderRadius: 999,
      border: "1px solid var(--border)",
      background: "var(--surface-soft)",
      color: "var(--text-muted)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, showProgress && /*#__PURE__*/React.createElement(Progress, {
    value: progressVal
  })), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onChange: setTheme,
    sunIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "sun",
      size: 15
    }),
    moonIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "moon",
      size: 15
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "nk-body",
    key: step,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 20,
      overflowY: "auto",
      padding: step === 0 ? 0 : "72px 18px 26px"
    }
  }, step === 0 && /*#__PURE__*/React.createElement(IntroStep, {
    onBegin: () => go(1)
  }), step === 1 && /*#__PURE__*/React.createElement(WeatherStep, {
    value: weather,
    onChange: setWeather,
    onNext: () => go(2)
  }), step === 2 && /*#__PURE__*/React.createElement(IntensityStep, {
    weather: weather,
    value: intensity,
    onChange: setIntensity,
    onNext: () => go(3)
  }), step === 3 && /*#__PURE__*/React.createElement(WriteStep, {
    weather: weather,
    value: text,
    onChange: setText,
    onNext: () => go(4)
  }), step === 4 && /*#__PURE__*/React.createElement(ListeningStep, {
    onDone: () => go(5)
  }), step === 5 && /*#__PURE__*/React.createElement(ReflectionStep, {
    weather: weather,
    intensity: intensity,
    onNext: () => go(6)
  }), step === 6 && /*#__PURE__*/React.createElement(KeptStep, {
    weather: weather,
    intensity: intensity,
    text: text,
    onRestart: restart
  }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(NightlyApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/nightly-checkin/flow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hint-app/data.js
try { (() => {
/* Hint app — fake but on-brand data for the UI kit recreation.
   Copy and structure lifted from the real product (dailyReport.ts,
   feedCopy.ts, modules.tsx). Attached to window for the babel screens. */
window.HintKit = window.HintKit || {};
window.HintKit.daily = {
  title: "A clear enough day to move gently.",
  summary: "Today is better for noticing patterns than chasing answers. Keep the important things simple, and let the card point at what needs less noise.",
  card: {
    name: "The Moon",
    image: "../../assets/tarot/cards/18-TheMoon.jpg",
    whisper: "What feels like a warning is mostly the dark doing its usual work. Walk slower, not back."
  },
  overall: 78,
  scores: [{
    key: "love",
    label: "Love",
    area: "love",
    score: 84
  }, {
    key: "wealth",
    label: "Wealth",
    area: "wealth",
    score: 71
  }, {
    key: "career",
    label: "Career",
    area: "career",
    score: 69
  }, {
    key: "study",
    label: "Study",
    area: "study",
    score: 88
  }, {
    key: "people",
    label: "People",
    area: "people",
    score: 74
  }],
  suggestion: "Ask the question in one sentence before you pull more cards.",
  avoid: "Reading every silence as an answer.",
  lucky: [{
    key: "color",
    value: "Sky Blue",
    label: "Color",
    swatch: "linear-gradient(180deg,#B7D3E8,#8FB8D8)"
  }, {
    key: "jewelry",
    value: "Moonstone",
    label: "Jewelry",
    image: "../../assets/lucky/jewelry/moonstone.png"
  }, {
    key: "number",
    value: "3 & 7",
    label: "Number",
    swatch: "linear-gradient(180deg,#0E1626,#131D32)"
  }, {
    key: "food",
    value: "Matcha",
    label: "Food",
    image: "../../assets/lucky/food/matcha.png"
  }, {
    key: "carry",
    value: "Crystal",
    label: "Carry",
    image: "../../assets/lucky/carry/crystal-charm.png"
  }, {
    key: "flower",
    value: "Peony",
    label: "Flower",
    image: "../../assets/lucky/flower/peony.png"
  }]
};
window.HintKit.tasks = [{
  text: "Drink a glass of water slowly.",
  reason: "Restore physical balance before you ask for more energy."
}, {
  text: "Send one thoughtful message.",
  reason: "Warm contact can steady the heart without becoming a project."
}, {
  text: "Write today's highlight.",
  reason: "Positive moments become stronger when they are saved."
}];
window.HintKit.starters = ["I can't tell if I'm overthinking this.", "Something happened today and I keep replaying it.", "Help me understand what I'm actually feeling."];

// Canned ambient replies, in Hint's voice.
window.HintKit.replies = ["You're rehearsing it because it matters to you. Say the first true sentence and let the rest find its own way.", "Notice that you reached for certainty before comfort. Tonight, try it the other way around.", "The feeling isn't asking to be solved. It's asking to be named. Start there, and keep it small."];
window.HintKit.threeSpread = [{
  name: "The Star",
  image: "../../assets/tarot/cards/17-TheStar.jpg",
  pos: "Past",
  line: "Hope returned quietly, before you noticed it had."
}, {
  name: "The High Priestess",
  image: "../../assets/tarot/cards/02-TheHighPriestess.jpg",
  pos: "Present",
  line: "You already know. You're waiting for permission you can only give yourself."
}, {
  name: "The Sun",
  image: "../../assets/tarot/cards/19-TheSun.jpg",
  pos: "Near future",
  line: "Warmth that doesn't need to be earned. Let it be simple."
}];
window.HintKit.sections = [{
  key: "reflection",
  label: "Reflection",
  intro: "Say it, or just sit with it. The room is listening either way.",
  rooms: [{
    title: "Ask Hint",
    hint: "Say it out loud, even if quietly.",
    live: true,
    icon: "message-circle"
  }, {
    title: "Emotional Journal",
    hint: "A private page that listens back.",
    live: true,
    icon: "notebook-pen"
  }, {
    title: "Daily Pull",
    hint: "One card, already turned for tonight.",
    live: true,
    icon: "sparkles"
  }, {
    title: "Tonight's Mood",
    hint: "Name the weather inside you.",
    live: false,
    icon: "cloud-moon"
  }]
}, {
  key: "tarot",
  label: "Tarot",
  intro: "Sit with what you brought. Let the cards do the talking.",
  rooms: [{
    title: "Tarot Room",
    hint: "Sit with what you brought.",
    live: true,
    icon: "layers"
  }, {
    title: "One Card",
    hint: "A single card, turned in private.",
    live: false,
    icon: "square"
  }, {
    title: "Relationship Spread",
    hint: "Three cards for two people.",
    live: false,
    icon: "copy"
  }, {
    title: "Card Archive",
    hint: "Every card you've turned, kept.",
    live: false,
    icon: "archive"
  }]
}, {
  key: "astrology",
  label: "Astrology",
  intro: "Your night sky, read from the inside.",
  rooms: [{
    title: "Birth Chart",
    hint: "Your personal sky map.",
    live: true,
    icon: "orbit"
  }, {
    title: "Moon Phase",
    hint: "What the moon is doing to you tonight.",
    live: false,
    icon: "moon"
  }, {
    title: "Zodiac",
    hint: "A quick read for your sign.",
    live: false,
    icon: "star"
  }, {
    title: "Compatibility",
    hint: "Two charts in the same room.",
    live: true,
    icon: "heart"
  }]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hint-app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/hint-app/screens/AskScreen.jsx
try { (() => {
/* Ask Hint — ambient chat. Starters → user bubble → thinking → reply. */
function AskScreen({
  onClose
}) {
  const {
    GlassCard,
    Eyebrow,
    ChatBubble,
    Button
  } = window.HintDesignSystem_0d1931;
  const {
    Icon
  } = window.HintKit.shell;
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);
  const replyIdx = useRef(0);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);
  function send(value) {
    const v = (value ?? text).trim();
    if (!v || thinking) return;
    setText("");
    setMessages(m => [...m, {
      role: "user",
      text: v
    }]);
    setThinking(true);
    setTimeout(() => {
      const reply = window.HintKit.replies[replyIdx.current % window.HintKit.replies.length];
      replyIdx.current += 1;
      setThinking(false);
      setMessages(m => [...m, {
        role: "hint",
        text: reply
      }]);
    }, 1300);
  }
  const empty = messages.length === 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 16px 8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 34,
      padding: "0 12px",
      borderRadius: 8,
      border: "1px solid var(--border)",
      background: "var(--surface-soft)",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), " Home"), /*#__PURE__*/React.createElement(Eyebrow, {
    tracking: "wide"
  }, "Ask Hint"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60
    }
  })), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, empty ? /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "hero",
    padding: 22,
    style: {
      marginTop: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      margin: "0 auto 16px",
      borderRadius: 12,
      display: "grid",
      placeItems: "center",
      color: "var(--accent-gold)",
      background: "rgba(206,178,110,0.10)",
      border: "1px solid rgba(206,178,110,0.24)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 22
  })), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "A space to think out loud"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 32,
      lineHeight: 1.05,
      color: "var(--text-strong)",
      margin: "12px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, "What's sitting with you tonight?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: "12px 0 0"
    }
  }, "No reading, no cards. Just say it \u2014 Hint will sit with you and say it back, gently."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 20
    }
  }, window.HintKit.starters.map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => send(s),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "12px 14px",
      borderRadius: 10,
      border: "1px solid var(--border)",
      background: "var(--surface-soft)",
      color: "var(--text-muted)",
      textAlign: "left",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      lineHeight: 1.4,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", null, s), /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 14,
    color: "var(--accent-gold)"
  }))))) : messages.map((m, i) => /*#__PURE__*/React.createElement(ChatBubble, {
    key: i,
    role: m.role
  }, m.text)), thinking && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "var(--text-strong)",
      boxShadow: "0 0 10px rgba(255,240,210,0.5)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "Hint is listening\u2026"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px 16px",
      background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: 6,
      borderRadius: 16,
      border: "1px solid var(--border-strong)",
      background: "var(--input-bg)",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") send();
    },
    placeholder: "Say it, even quietly\u2026",
    style: {
      flex: 1,
      background: "none",
      border: "none",
      outline: "none",
      color: "var(--text)",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      padding: "0 8px"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => send(),
    "aria-label": "Send",
    style: {
      width: 38,
      height: 38,
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      background: "var(--grad-ember)",
      color: "#231D2A",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up",
    size: 18,
    strokeWidth: 2.2
  })))));
}
window.HintKit.AskScreen = AskScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hint-app/screens/AskScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hint-app/screens/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Home — the signature dashboard. Draw the sky card to reveal scores. */
function HomeScreen({
  theme
}) {
  const {
    Eyebrow,
    GlassCard,
    ScoreMeter,
    LuckyTile,
    TarotCard,
    Button
  } = window.HintDesignSystem_0d1931;
  const {
    Icon
  } = window.HintKit.shell;
  const d = window.HintKit.daily;
  const baseTasks = window.HintKit.tasks;
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState([false, false, false]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "96px 16px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tuesday \xB7 9:42 PM"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 34,
      lineHeight: 1.05,
      color: "var(--text-strong)",
      margin: "8px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, d.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: "10px 0 0"
    }
  }, d.summary)), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "hero",
    glow: true,
    radius: "xl",
    padding: 18,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Today's Tarot Score"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 28,
      lineHeight: 1.05,
      color: "var(--text)",
      margin: "6px 0 16px"
    }
  }, revealed ? d.card.name : "Draw your sky card"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TarotCard, {
    name: d.card.name,
    image: d.card.image,
    width: 146,
    flipped: revealed,
    onFlip: setRevealed
  }), !revealed && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setRevealed(true),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 15
    })
  }, "Draw card")), revealed && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 64,
      lineHeight: 1,
      color: "var(--score-ink)",
      textShadow: "var(--score-shadow)",
      fontVariantNumeric: "tabular-nums"
    }
  }, d.overall), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Overall")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, d.scores.slice(0, 3).map(s => /*#__PURE__*/React.createElement(ScoreMeter, _extends({
    key: s.key
  }, s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--input-bg)",
      border: "1px solid var(--border)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tarot interpretation"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 15,
      lineHeight: 1.55,
      color: "var(--text-muted)",
      margin: "8px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, d.card.whisper)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Detail, {
    label: "Suggestion",
    value: d.suggestion,
    accent: "rgba(150,211,255,0.45)"
  }), /*#__PURE__*/React.createElement(Detail, {
    label: "Avoid",
    value: d.avoid,
    accent: "rgba(255,176,190,0.48)"
  })), /*#__PURE__*/React.createElement(Eyebrow, null, "Lucky for you"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 8,
      marginTop: 10
    }
  }, d.lucky.map(l => /*#__PURE__*/React.createElement(LuckyTile, _extends({
    key: l.key
  }, l)))), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    fullWidth: true,
    style: {
      marginTop: 16
    },
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15
    })
  }, "Ask Hint about this card"))), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "card",
    radius: "xl",
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      color: "var(--text)",
      margin: 0
    }
  }, "Energy tasks"), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, done.filter(Boolean).length, "/3")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 13,
      color: "var(--text-muted)",
      margin: "6px 0 14px"
    }
  }, "three small check-ins to finish tonight's ritual"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, baseTasks.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setDone(p => p.map((v, j) => j === i ? !v : v)),
    style: {
      display: "grid",
      gridTemplateColumns: "30px 1fr",
      alignItems: "center",
      gap: 12,
      padding: "12px 6px",
      border: "none",
      background: "none",
      textAlign: "left",
      cursor: "pointer",
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 26,
      height: 26,
      borderRadius: 8,
      background: done[i] ? "linear-gradient(135deg, #8ee2d4, #f3cf82)" : "rgba(255,255,255,0.08)",
      border: done[i] ? "1px solid rgba(142,226,212,0.72)" : "1px solid var(--border-strong)",
      color: "#172422"
    }
  }, done[i] && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2.6
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 16,
      color: done[i] ? "var(--text-faint)" : "var(--text)",
      textDecoration: done[i] ? "line-through" : "none"
    }
  }, t.text), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-sans)",
      fontSize: 11.5,
      color: "var(--text-faint)",
      marginTop: 3
    }
  }, t.reason)))))));
}
function Detail({
  label,
  value,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-soft)",
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: -4,
      right: -4,
      bottom: -3,
      height: 11,
      borderRadius: 999,
      background: accent,
      transform: "rotate(-8deg)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "var(--font-serif)",
      fontSize: 18,
      fontWeight: 600,
      color: "var(--text)"
    }
  }, label)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      lineHeight: 1.5,
      color: "var(--text-muted)",
      margin: "8px 0 0"
    }
  }, value));
}
window.HintKit.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hint-app/screens/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hint-app/screens/MeScreen.jsx
try { (() => {
/* Me — the personal hub: profile, membership, records. */
function MeScreen() {
  const {
    GlassCard,
    Eyebrow,
    Badge,
    Button
  } = window.HintDesignSystem_0d1931;
  const {
    Icon
  } = window.HintKit.shell;
  const records = [{
    label: "Cards turned",
    value: 142,
    icon: "layers"
  }, {
    label: "Nights kept",
    value: 38,
    icon: "moon"
  }, {
    label: "Questions asked",
    value: 27,
    icon: "message-circle"
  }, {
    label: "Ritual streak",
    value: 6,
    icon: "flame"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "96px 16px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 28,
      color: "var(--text)",
      margin: 0
    }
  }, "Me"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, "Your quiet corner of Hint.")), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Settings",
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      border: "1px solid var(--border)",
      background: "var(--surface-soft)",
      color: "var(--accent-aqua)",
      display: "grid",
      placeItems: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 16
  }))), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "hero",
    padding: 20,
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 62,
      height: 62,
      borderRadius: 999,
      background: "radial-gradient(circle at 50% 35%, rgba(100,156,158,0.35), rgba(10,15,26,0.9))",
      boxShadow: "0 0 22px rgba(100,156,158,0.22)",
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      color: "var(--text)"
    }
  }, "S"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 22,
      color: "var(--text)",
      margin: 0
    }
  }, "Sage"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      color: "var(--text-faint)",
      margin: "3px 0 0"
    }
  }, "Scorpio \xB7 Moon in Pisces")), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "Plus"))), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "card",
    padding: 18,
    style: {
      marginTop: 14,
      background: "linear-gradient(150deg, rgba(196,169,98,0.18) 0%, rgba(120,98,52,0.10) 40%, rgba(10,15,26,0.6) 100%)",
      border: "1px solid rgba(196,169,98,0.32)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Hint Plus"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 19,
      color: "var(--text)",
      margin: "6px 0 12px"
    }
  }, "Unlimited readings, deeper memory."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "sm"
  }, "Manage membership")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Records")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginTop: 10
    }
  }, records.map(r => /*#__PURE__*/React.createElement(GlassCard, {
    key: r.label,
    elevation: "soft",
    padding: 16
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 18,
    color: "var(--accent-gold)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 30,
      color: "var(--text)",
      margin: "10px 0 0",
      fontVariantNumeric: "tabular-nums"
    }
  }, r.value), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 11.5,
      color: "var(--text-faint)",
      margin: "2px 0 0"
    }
  }, r.label)))));
}
window.HintKit.MeScreen = MeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hint-app/screens/MeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hint-app/screens/RoomsScreen.jsx
try { (() => {
/* Rooms — the library of every Hint room, grouped by section. */
function RoomsScreen({
  onOpenRoom
}) {
  const {
    Eyebrow,
    ModuleTile
  } = window.HintDesignSystem_0d1931;
  const {
    Icon
  } = window.HintKit.shell;
  const sections = window.HintKit.sections;
  function handle(room) {
    if (!room.live) return;
    if (room.title === "Ask Hint") onOpenRoom("ask");else if (room.title === "Tarot Room") onOpenRoom("tarot");
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "96px 16px 40px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The rooms"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 34,
      lineHeight: 1.05,
      color: "var(--text-strong)",
      margin: "8px 0 22px",
      textShadow: "var(--halo-soft)"
    }
  }, "Six rooms-of-rooms"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 26
    }
  }, sections.map(sec => /*#__PURE__*/React.createElement("section", {
    key: sec.key
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, sec.label)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 14,
      color: "var(--text-muted)",
      margin: "0 0 14px"
    }
  }, sec.intro), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, sec.rooms.map(r => /*#__PURE__*/React.createElement(ModuleTile, {
    key: r.title,
    title: r.title,
    hint: r.hint,
    locked: !r.live,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: r.icon,
      size: 20
    }),
    onClick: () => handle(r)
  })))))));
}
window.HintKit.RoomsScreen = RoomsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hint-app/screens/RoomsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hint-app/screens/TarotScreen.jsx
try { (() => {
/* Tarot Room — set an intention, draw three, read the spread. */
function TarotScreen({
  onClose
}) {
  const {
    GlassCard,
    Eyebrow,
    TarotCard,
    Button
  } = window.HintDesignSystem_0d1931;
  const {
    Icon
  } = window.HintKit.shell;
  const spread = window.HintKit.threeSpread;
  const [stage, setStage] = useState("intention"); // intention → drawn
  const [intention, setIntention] = useState("");
  const [flipped, setFlipped] = useState([false, false, false]);
  function draw() {
    setStage("drawn");
    spread.forEach((_, i) => setTimeout(() => setFlipped(f => f.map((v, j) => j === i ? true : v)), 500 + i * 650));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      overflowY: "auto",
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 16px 8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 34,
      padding: "0 12px",
      borderRadius: 8,
      border: "1px solid var(--border)",
      background: "var(--surface-soft)",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), " Leave"), /*#__PURE__*/React.createElement(Eyebrow, {
    tracking: "wide"
  }, "Tarot Room"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 40px"
    }
  }, stage === "intention" ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Before you draw"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 34,
      lineHeight: 1.05,
      color: "var(--text-strong)",
      margin: "12px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, "What did you bring tonight?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: "12px auto 0",
      maxWidth: 300
    }
  }, "Name it in one quiet sentence. The cards listen better when the question is small."), /*#__PURE__*/React.createElement("textarea", {
    value: intention,
    onChange: e => setIntention(e.target.value),
    placeholder: "I want to understand\u2026",
    rows: 2,
    className: "hint-tarot-input",
    style: {
      width: "100%",
      marginTop: 22,
      padding: 16,
      borderRadius: 14,
      resize: "none",
      border: "1px solid var(--border-strong)",
      background: "var(--input-bg)",
      color: "var(--text)",
      fontFamily: "var(--font-serif)",
      fontSize: 17,
      lineHeight: 1.4,
      outline: "none",
      textAlign: "center"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    onClick: draw,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 16
    })
  }, "Draw three cards"))) : /*#__PURE__*/React.createElement("div", null, intention && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 15,
      color: "var(--text-muted)",
      margin: "8px 0 22px"
    }
  }, "\"", intention, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 12,
      marginBottom: 26
    }
  }, spread.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(TarotCard, {
    name: c.name,
    image: c.image,
    width: 98,
    flipped: flipped[i],
    onFlip: () => setFlipped(f => f.map((v, j) => j === i ? true : v))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, c.pos))))), /*#__PURE__*/React.createElement(GlassCard, {
    elevation: "hero",
    glow: true,
    padding: 20
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The reading"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      marginTop: 12
    }
  }, spread.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      opacity: flipped[i] ? 1 : 0.3,
      transition: "opacity 0.6s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 18,
      color: "var(--text)",
      margin: 0
    }
  }, c.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 14,
      lineHeight: 1.5,
      color: "var(--text-muted)",
      margin: "4px 0 0",
      textShadow: "var(--halo-soft)"
    }
  }, c.line)))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    style: {
      marginTop: 18
    },
    onClick: () => {
      setStage("intention");
      setFlipped([false, false, false]);
    }
  }, "Draw again")))));
}
window.HintKit.TarotScreen = TarotScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hint-app/screens/TarotScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hint-app/shell.jsx
try { (() => {
/* Shared shell: atmosphere backdrop, Lucide icon helper, top nav, starfield. */
const {
  useState,
  useEffect,
  useRef
} = React;

/* Lucide icon — builds the SVG directly from Lucide's IconNode data so it
   plays cleanly with React reconciliation (no DOM mutation). */
function toPascal(name) {
  return name.split("-").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  style = {}
}) {
  const lib = window.lucide || {};
  const node = lib[toPascal(name)] || lib.icons && lib.icons[toPascal(name)];
  const kids = node && Array.isArray(node[2]) ? node[2] : [];
  const children = kids.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  }));
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "inline-block",
      flexShrink: 0,
      ...style
    }
  }, children);
}
function refreshIcons() {/* no-op — icons render via React now */}

/* A faint starfield + glow wash — the persistent "room" behind every screen. */
function Atmosphere() {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--bg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(1.4px 1.4px at 18% 22%, rgba(255,251,236,0.7), transparent), radial-gradient(1.2px 1.2px at 72% 16%, rgba(148,226,219,0.5), transparent), radial-gradient(1px 1px at 40% 60%, rgba(255,251,236,0.5), transparent), radial-gradient(1.3px 1.3px at 84% 54%, rgba(255,251,236,0.45), transparent), radial-gradient(1px 1px at 28% 82%, rgba(148,226,219,0.4), transparent), radial-gradient(1.1px 1.1px at 62% 88%, rgba(255,251,236,0.4), transparent)",
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -60,
      right: -40,
      width: 220,
      height: 220,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(203,168,102,0.18), transparent 65%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      boxShadow: "inset 0 0 120px rgba(0,0,0,0.55)"
    }
  }));
}

/* Floating top nav pill used inside the phone. */
function TopNav({
  route,
  onNavigate,
  theme,
  onTheme,
  brandLogo
}) {
  const {
    ThemeToggle
  } = window.HintDesignSystem_0d1931;
  const items = [{
    id: "home",
    label: "Today"
  }, {
    id: "rooms",
    label: "Rooms"
  }, {
    id: "me",
    label: "Me"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: 10,
      right: 10,
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: 6,
      borderRadius: 18,
      border: "1px solid rgba(229,205,149,0.26)",
      background: theme === "nocturne" ? "rgba(12,16,28,0.88)" : "rgba(255,249,239,0.90)",
      backdropFilter: "blur(24px) saturate(1.22)",
      WebkitBackdropFilter: "blur(24px) saturate(1.22)",
      boxShadow: "0 16px 42px rgba(0,0,0,0.24)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("home"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "4px 10px 4px 4px",
      border: "none",
      background: "none",
      cursor: "pointer",
      fontFamily: "var(--font-serif)",
      fontSize: 19,
      color: "var(--text)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: brandLogo,
    alt: "",
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      border: "1px solid rgba(255,255,255,0.25)"
    }
  }), "Hint"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2,
      marginLeft: "auto"
    }
  }, items.map(it => {
    const active = route === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNavigate(it.id),
      style: {
        height: 34,
        padding: "0 12px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        color: active ? "#fffaf2" : "var(--text-muted)",
        background: active ? "linear-gradient(135deg, rgba(241,166,107,0.98), rgba(246,194,143,0.94))" : "transparent",
        boxShadow: active ? "0 10px 22px rgba(241,166,107,0.18)" : "none"
      }
    }, it.label);
  })), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onChange: onTheme,
    sunIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "sun",
      size: 16
    }),
    moonIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "moon",
      size: 16
    })
  })));
}
window.HintKit.shell = {
  Icon,
  refreshIcons,
  Atmosphere,
  TopNav
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hint-app/shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ChatBubble = __ds_scope.ChatBubble;

__ds_ns.ModuleTile = __ds_scope.ModuleTile;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.LuckyTile = __ds_scope.LuckyTile;

__ds_ns.ScoreMeter = __ds_scope.ScoreMeter;

__ds_ns.TarotCard = __ds_scope.TarotCard;

})();
