import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../../lib/i18n";
import { useProfile } from "../../lib/useProfile";
import { zodiacSign } from "../me/utils";

type AstrologyTab = "chart" | "placements" | "friends" | "composite";

type BirthDetails = {
  name: string;
  birthDate: string;
  birthTime?: string | null;
  birthPlace?: string | null;
};

type Placement = {
  label: string;
  sign: string;
  degree: number;
  symbol: string;
  color: string;
  theme: string;
};

const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

const SIGN_SYMBOLS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"] as const;

const SIGN_ZH: Record<string, string> = {
  Aries: "白羊",
  Taurus: "金牛",
  Gemini: "双子",
  Cancer: "巨蟹",
  Leo: "狮子",
  Virgo: "处女",
  Libra: "天秤",
  Scorpio: "天蝎",
  Sagittarius: "射手",
  Capricorn: "摩羯",
  Aquarius: "水瓶",
  Pisces: "双鱼",
};

const PLACEMENT_ZH: Record<string, string> = {
  Sun: "太阳",
  Moon: "月亮",
  Rising: "上升",
  Mercury: "水星",
  Venus: "金星",
  Mars: "火星",
  "North Node": "北交",
  Midheaven: "天顶",
};

const PLACEMENT_INTRO_ZH: Record<string, string> = {
  Sun: "太阳是你的生命力、核心人格与自由意志。",
  Moon: "月亮是你的情绪、潜意识、本能需求与内在安全感。",
  Rising: "上升星座是你的人格面具、处世方式，以及别人对你的第一印象。",
  Mercury: "水星是你的理性层面，包括头脑、逻辑思维与语言表达。",
  Venus: "金星是你的恋爱、人际关系、价值观与愉悦需求。",
  Mars: "火星是你的能量中心，代表原始欲望、行动力与冲突方式。",
  "North Node": "北交点代表今生灵魂的目标、不熟悉的领域，也是一生努力的方向。",
  Midheaven: "天顶是你的事业目标、公众形象与社会发展方向。",
};

const SIGN_TRAITS_ZH: Record<string, string> = {
  Aries: "行动直接、反应快，遇到重要的事会先动起来再修正。",
  Taurus: "重视稳定、质感与安全感，适合慢慢建立真正可靠的东西。",
  Gemini: "好奇、灵活、需要信息流动，越能交流越容易看清自己。",
  Cancer: "敏感、重感受，也很会照顾关系里的情绪和归属感。",
  Leo: "需要被看见，也有把气氛点亮、把人带起来的能力。",
  Virgo: "擅长分析、整理和处理细节，能把混乱变成可执行的步骤。",
  Libra: "重视关系里的平衡、审美和公平，容易给人舒服的第一印象。",
  Scorpio: "感受很深，看人很准，容易被强烈、真实、有秘密感的东西吸引。",
  Sagittarius: "需要空间和方向感，越能探索，越不容易被小事困住。",
  Capricorn: "现实、能扛事，也适合把长期目标一步一步做出来。",
  Aquarius: "想法独立，不太喜欢被定义，常用不一样的方式解决问题。",
  Pisces: "直觉强、共情深，容易被氛围、灵感和情绪牵动。",
};

const PLACEMENT_LAYER_ZH: Record<string, string> = {
  Sun: "这是你做选择时最核心的底色。",
  Moon: "这会影响你在没安全感时真正需要什么。",
  Rising: "这是别人最先感受到的你，也是你进入世界的方式。",
  Mercury: "这会影响你怎么思考、表达和做判断。",
  Venus: "这会影响你喜欢什么、如何亲近别人，以及你在关系中的标准。",
  Mars: "这会影响你的行动节奏、欲望和面对压力的方式。",
  "North Node": "这是你会反复被推向、但一开始不一定熟悉的人生方向。",
  Midheaven: "这会影响你想被世界怎样看见，以及事业上的发力点。",
};

const PLACEMENT_META: Record<string, Pick<Placement, "symbol" | "color" | "theme">> = {
  Sun: { symbol: "☉", color: "#ff765d", theme: "core personality and life force" },
  Moon: { symbol: "☽", color: "#4f93e8", theme: "emotions, instinct, and inner needs" },
  Rising: { symbol: "Asc", color: "#60c88f", theme: "first impression and life approach" },
  Mercury: { symbol: "☿", color: "#54bfa5", theme: "thinking, language, and decisions" },
  Venus: { symbol: "♀", color: "#d89b54", theme: "love, taste, and social style" },
  Mars: { symbol: "♂", color: "#e1544e", theme: "drive, courage, and conflict style" },
  "North Node": { symbol: "☊", color: "#64bdd8", theme: "growth direction and unfamiliar territory" },
  Midheaven: { symbol: "MC", color: "#79a8f2", theme: "career image and public direction" },
};

const ELEMENT_BY_SIGN: Record<string, string> = {
  Aries: "Fire",
  Leo: "Fire",
  Sagittarius: "Fire",
  Taurus: "Earth",
  Virgo: "Earth",
  Capricorn: "Earth",
  Gemini: "Air",
  Libra: "Air",
  Aquarius: "Air",
  Cancer: "Water",
  Scorpio: "Water",
  Pisces: "Water",
};

const MODE_BY_SIGN: Record<string, string> = {
  Aries: "Cardinal",
  Cancer: "Cardinal",
  Libra: "Cardinal",
  Capricorn: "Cardinal",
  Taurus: "Fixed",
  Leo: "Fixed",
  Scorpio: "Fixed",
  Aquarius: "Fixed",
  Gemini: "Mutable",
  Virgo: "Mutable",
  Sagittarius: "Mutable",
  Pisces: "Mutable",
};

function hash(value: string) {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    total = (total * 31 + value.charCodeAt(index)) >>> 0;
  }
  return total;
}

function friendStorageKey(anonId: string) {
  return `hint_astrology_friend_v1_${anonId}`;
}

function readFriend(anonId: string): BirthDetails | null {
  try {
    const raw = window.localStorage.getItem(friendStorageKey(anonId));
    return raw ? (JSON.parse(raw) as BirthDetails) : null;
  } catch {
    return null;
  }
}

function writeFriend(anonId: string, friend: BirthDetails) {
  try {
    window.localStorage.setItem(friendStorageKey(anonId), JSON.stringify(friend));
  } catch {
    // Keep the in-memory state even when browser storage is blocked.
  }
}

function clearFriend(anonId: string) {
  try {
    window.localStorage.removeItem(friendStorageKey(anonId));
  } catch {
    // Keep the in-memory state even when browser storage is blocked.
  }
}

function signIndex(sign: string) {
  const index = SIGNS.indexOf(sign as (typeof SIGNS)[number]);
  return index >= 0 ? index : 0;
}

function signAt(seed: number, offset: number) {
  return SIGNS[(seed + offset) % SIGNS.length]!;
}

function angularDistance(a: string, b: string) {
  const diff = Math.abs(signIndex(a) - signIndex(b));
  return Math.min(diff, 12 - diff);
}

function scorePair(a: string, b: string) {
  const distance = angularDistance(a, b);
  const elementBonus = ELEMENT_BY_SIGN[a] === ELEMENT_BY_SIGN[b] ? 16 : 0;
  const modeBonus = MODE_BY_SIGN[a] === MODE_BY_SIGN[b] ? 8 : 0;
  const distanceScore = [24, 18, 20, 8, 22, 10, 14][distance] ?? 12;
  return Math.min(96, 44 + distanceScore + elementBonus + modeBonus);
}

function buildPlacements(details: BirthDetails) {
  const seed = hash([details.birthDate, details.birthTime ?? "unknown-time", details.birthPlace ?? "unknown-place"].join("|"));
  const sun = zodiacSign(details.birthDate, "en") ?? "Aries";
  const defs = [
    ["Sun", sun, 1],
    ["Moon", signAt(seed, 3), 2],
    ["Rising", signAt(seed, 5), 3],
    ["Mercury", signAt(seed, 7), 4],
    ["Venus", signAt(seed, 9), 5],
    ["Mars", signAt(seed, 11), 6],
    ["North Node", signAt(seed, 13), 7],
    ["Midheaven", signAt(seed, 15), 8],
  ] as const;

  return defs.map(([label, sign, offset]) => ({
    label,
    sign,
    degree: (seed + offset * 17) % 30,
    ...PLACEMENT_META[label],
  }));
}

function chartDegrees(placement: Placement) {
  return signIndex(placement.sign) * 30 + placement.degree;
}

function placementSentence(placement: Placement) {
  const element = ELEMENT_BY_SIGN[placement.sign] ?? "mixed";
  const mode = MODE_BY_SIGN[placement.sign] ?? "adaptive";
  return `${placement.label} in ${placement.sign} gives this layer a ${element.toLowerCase()} tone with a ${mode.toLowerCase()} rhythm. It points to ${placement.theme}.`;
}

function displaySign(sign: string, language: ReturnType<typeof useLanguage>["language"]) {
  return language === "en" ? sign : SIGN_ZH[sign] ?? sign;
}

function displayPlacementLabel(label: string, language: ReturnType<typeof useLanguage>["language"]) {
  return language === "en" ? label : PLACEMENT_ZH[label] ?? label;
}

function zhPlacementBody(placement: Placement) {
  const label = PLACEMENT_ZH[placement.label] ?? placement.label;
  const sign = SIGN_ZH[placement.sign] ?? placement.sign;
  const trait = SIGN_TRAITS_ZH[placement.sign] ?? "这一层能量比较混合，需要结合整张盘一起看。";
  const layer = PLACEMENT_LAYER_ZH[placement.label] ?? "这会影响你这一部分的表达方式。";
  return `你的${label}落在${sign}座，${trait}${layer}`;
}

function compatibilityScore(a: Placement[], b: Placement[]) {
  if (!a.length || !b.length) return 0;
  const sun = scorePair(a[0]!.sign, b[0]!.sign);
  const moon = scorePair(a[1]!.sign, b[1]!.sign);
  const venus = scorePair(a[4]!.sign, b[4]!.sign);
  return Math.round(sun * 0.35 + moon * 0.35 + venus * 0.3);
}

function AstroWheel({ placements }: { placements: Placement[] }) {
  const points = placements.slice(0, 8).map((placement, index) => {
    const degree = placements.length ? chartDegrees(placement) : index * 45;
    const angle = ((degree - 90) * Math.PI) / 180;
    const radius = index < 4 ? 78 : 58;
    return {
      ...placement,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <svg viewBox="-120 -120 240 240" className="aspect-square w-full max-w-[500px]" role="img" aria-label="Natal chart preview">
      <circle r="113" fill="#05070a" />
      <circle r="98" fill="#0d0f13" />
      <circle r="78" fill="#030406" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" />
      <circle r="58" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.7" />
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = ((index * 30 - 90) * Math.PI) / 180;
        const labelAngle = ((index * 30 - 75) * Math.PI) / 180;
        return (
          <g key={SIGNS[index]}>
            <line
              x1={Math.cos(angle) * 78}
              y1={Math.sin(angle) * 78}
              x2={Math.cos(angle) * 113}
              y2={Math.sin(angle) * 113}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.8"
            />
            <text
              x={Math.cos(labelAngle) * 104}
              y={Math.sin(labelAngle) * 104}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill={index % 2 ? "#6edfc3" : "#78aef7"}
            >
              {SIGN_SYMBOLS[index]}
            </text>
            <text
              x={Math.cos(labelAngle) * 87}
              y={Math.sin(labelAngle) * 87}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fill="rgba(218, 169, 83, 0.82)"
            >
              {index + 1}
            </text>
          </g>
        );
      })}
      {Array.from({ length: 6 }).map((_, index) => {
        const from = points[index];
        const to = points[(index + 2) % points.length];
        if (!from || !to) return null;
        return (
          <line
            key={`${from.label}-${to.label}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={index % 2 ? "#50c9ae" : "#ec5a4f"}
            strokeOpacity="0.72"
            strokeWidth="0.8"
          />
        );
      })}
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="2.4" fill={point.color} />
          <text x={point.x + 6} y={point.y + 2} fontSize="9" fill={point.color}>
            {point.symbol}
          </text>
        </g>
      ))}
      <line x1="-113" y1="0" x2="113" y2="0" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      <line x1="0" y1="-113" x2="0" y2="113" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
    </svg>
  );
}

function BirthDetailsForm({
  title,
  initial,
  submitLabel,
  saving,
  onSubmit,
}: {
  title: string;
  initial?: BirthDetails | null;
  submitLabel: string;
  saving?: boolean;
  onSubmit: (input: BirthDetails) => void | Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [birthDate, setBirthDate] = useState(initial?.birthDate ?? "");
  const [birthTime, setBirthTime] = useState(initial?.birthTime ?? "");
  const [birthPlace, setBirthPlace] = useState(initial?.birthPlace ?? "");
  const complete = name.trim().length > 0 && /^\d{4}-\d{2}-\d{2}$/.test(birthDate);

  useEffect(() => {
    setName(initial?.name ?? "");
    setBirthDate(initial?.birthDate ?? "");
    setBirthTime(initial?.birthTime ?? "");
    setBirthPlace(initial?.birthPlace ?? "");
  }, [initial?.name, initial?.birthDate, initial?.birthTime, initial?.birthPlace]);

  return (
    <form
      className="rounded-[28px] bg-white p-5 shadow-[0_18px_60px_rgba(80,103,156,0.14)]"
      onSubmit={(event) => {
        event.preventDefault();
        if (!complete) return;
        void onSubmit({
          name: name.trim(),
          birthDate,
          birthTime: birthTime || null,
          birthPlace: birthPlace.trim() || null,
        });
      }}
    >
      <h3 className="text-[20px] font-semibold text-[#22335f]">{title}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className="h-12 rounded-[16px] bg-[#f2f6ff] px-4 text-[14px] text-[#22335f] outline-none" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
        <input className="h-12 rounded-[16px] bg-[#f2f6ff] px-4 text-[14px] text-[#22335f] outline-none" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} placeholder="YYYY-MM-DD" inputMode="numeric" />
        <input className="h-12 rounded-[16px] bg-[#f2f6ff] px-4 text-[14px] text-[#22335f] outline-none" type="time" value={birthTime ?? ""} onChange={(event) => setBirthTime(event.target.value)} />
        <input className="h-12 rounded-[16px] bg-[#f2f6ff] px-4 text-[14px] text-[#22335f] outline-none" value={birthPlace ?? ""} onChange={(event) => setBirthPlace(event.target.value)} placeholder="City" />
      </div>
      <button
        type="submit"
        disabled={!complete || saving}
        className="mt-4 h-12 w-full rounded-full bg-gradient-to-r from-[#83dceb] to-[#8aa3ff] text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(87,133,216,0.25)] disabled:opacity-45"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

function TopTabs({ activeTab, onChange }: { activeTab: AstrologyTab; onChange: (tab: AstrologyTab) => void }) {
  const tabs: Array<[AstrologyTab, string]> = [
    ["chart", "沙盘"],
    ["placements", "星座"],
    ["friends", "生辰"],
    ["composite", "星宿"],
  ];

  return (
    <div className="sticky top-0 z-20 border-b border-[#d9e4ff] bg-[#c9d8ff]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <Link href="/rooms" className="text-[30px] leading-none text-[#20335f]">
          ‹
        </Link>
        <div className="text-center text-[22px] font-black tracking-[0.04em] text-[#20335f]">自己</div>
        <Link href="/me" className="rounded-full bg-white/55 px-3 py-1 text-[12px] font-semibold text-[#20335f]">
          编辑
        </Link>
      </div>
      <div className="mx-auto flex max-w-5xl gap-8 overflow-x-auto px-4 pb-3 text-[18px] font-black text-[#20335f]">
        {tabs.map(([tab, label]) => (
          <button key={tab} type="button" onClick={() => onChange(tab)} className="relative shrink-0 pb-2">
            {label}
            {activeTab === tab ? <span className="absolute inset-x-1 bottom-0 h-1 rounded-full bg-[#5dc7df]" /> : null}
          </button>
        ))}
        {["紫微", "政余"].map((label) => (
          <span key={label} aria-disabled="true" className="shrink-0 pb-2 text-[#20335f]/45">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function PlacementCard({ placement, language }: { placement: Placement; language: ReturnType<typeof useLanguage>["language"] }) {
  const title = `${displayPlacementLabel(placement.label, language)} · ${displaySign(placement.sign, language)}`;
  const intro = language === "en" ? `${placement.label} describes ${placement.theme}.` : PLACEMENT_INTRO_ZH[placement.label] ?? placement.theme;
  const body = language === "en" ? placementSentence(placement) : zhPlacementBody(placement);

  return (
    <article className="border-b border-[#edf1f8] bg-white px-5 py-7">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full text-[24px]" style={{ background: `${placement.color}1f`, color: placement.color }}>
          {placement.symbol}
        </span>
        <h3 className="text-[24px] font-bold text-[#2f343d]">
          {title}
        </h3>
      </div>
      <p className="mt-5 rounded-[14px] bg-[#f5f6f8] px-4 py-3 text-[15px] font-semibold leading-relaxed text-[#666b75]">
        {intro}
      </p>
      <p className="mt-4 text-[18px] font-bold leading-relaxed text-[#30343c]">
        {body}
        <span className="text-[#63c5d7]"> ...全文</span>
      </p>
      <div className="mt-5 text-[13px] font-semibold text-[#6e7481]">
        🔥 同类交流地 · {Math.max(1200, hash(placement.label + placement.sign) % 9000)}测友正在讨论 ›
      </div>
    </article>
  );
}

function PasswordGrid({ placements, language }: { placements: Placement[]; language: ReturnType<typeof useLanguage>["language"] }) {
  const nameOf = (placement?: Placement) =>
    placement ? `${displayPlacementLabel(placement.label, language)}${displaySign(placement.sign, language)}` : "补充生日后开启";
  const items = [
    ["表面上的自己", placements[2] ? `${nameOf(placements[2])} · 第一印象` : "补充生日后开启"],
    ["实际的自己", placements[0] ? `${nameOf(placements[0])} · 核心底色` : "补充生日后开启"],
    ["隐藏技能", placements[3] ? `${nameOf(placements[3])} · 思考方式` : "补充生日后开启"],
    ["契合度最高的星座", "天秤座、双子座"],
    ["事业发力点", placements[7] ? `${nameOf(placements[7])} · 公众方向` : "补充生日后开启"],
    ["情绪开关", placements[1] ? `${nameOf(placements[1])} · 安全感` : "补充生日后开启"],
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map(([title, value]) => (
        <div key={title} className="rounded-[22px] bg-white/88 p-4 shadow-[0_10px_34px_rgba(74,101,163,0.10)]">
          <p className="text-[15px] font-black text-[#42629f]">{title}</p>
          <p className="mt-2 text-[17px] font-bold leading-snug text-[#5571a8]">{value}</p>
        </div>
      ))}
    </div>
  );
}

function CompatibilityPanel({
  score,
  friend,
  ready,
}: {
  score: number;
  friend: BirthDetails | null;
  ready: boolean;
}) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_60px_rgba(80,103,156,0.14)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#6c85bd]">Synastry preview</p>
          <p className="mt-1 text-[46px] font-black leading-none text-[#20335f]">{score || "--"}</p>
        </div>
        <p className="max-w-[190px] text-right text-[13px] font-semibold leading-relaxed text-[#68738a]">
          {ready && friend
            ? `You and ${friend.name}, read as a relationship pattern.`
            : "Add your birth details and a friend to compare charts."}
        </p>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e9efff]">
        <div className="h-full rounded-full bg-gradient-to-r from-[#82d9e8] to-[#8fa1ff]" style={{ width: `${ready ? score : 8}%` }} />
      </div>
      <p className="mt-4 text-[15px] font-semibold leading-relaxed text-[#42506f]">
        This is a local compatibility preview. Full professional synastry can connect later, but this version already lets people test a friend or relationship once both birth profiles are saved.
      </p>
    </div>
  );
}

export function AstrologyView() {
  const { language } = useLanguage();
  const { anonId, profile, saveProfile, isSaving } = useProfile();
  const [activeTab, setActiveTab] = useState<AstrologyTab>("placements");
  const [friend, setFriend] = useState<BirthDetails | null>(() => readFriend(anonId));

  const selfDetails = profile?.birthDate
    ? {
        name: profile.name,
        birthDate: profile.birthDate,
        birthTime: profile.birthTime,
        birthPlace: profile.birthPlace,
      }
    : null;

  const selfPlacements = useMemo(
    () => (selfDetails ? buildPlacements(selfDetails) : []),
    [selfDetails?.birthDate, selfDetails?.birthTime, selfDetails?.birthPlace],
  );
  const friendPlacements = useMemo(
    () => (friend ? buildPlacements(friend) : []),
    [friend?.birthDate, friend?.birthTime, friend?.birthPlace],
  );
  const score = compatibilityScore(selfPlacements, friendPlacements);
  const chartTitle = selfPlacements.length
    ? language === "en"
      ? `${selfPlacements[0]!.sign} Sun · ${selfPlacements[1]!.sign} Moon · ${selfPlacements[2]!.sign} Rising`
      : `日${displaySign(selfPlacements[0]!.sign, language)} · 月${displaySign(selfPlacements[1]!.sign, language)} · 升${displaySign(selfPlacements[2]!.sign, language)}的${selfDetails?.name ?? "你"}`
    : "Add birth details to open your chart";
  const displayName = selfDetails?.name || profile?.name || "你";
  const sun = selfPlacements[0];
  const moon = selfPlacements[1];
  const rising = selfPlacements[2];
  const reminder = sun
    ? `${SIGN_TRAITS_ZH[sun.sign] ?? "今天适合先确认自己的节奏。"}今天先做一件能让你更稳定的小事。`
    : "补充生日后，Hint 会给你一条更贴近你的今日提醒。";

  async function handleSelfSubmit(input: BirthDetails) {
    await saveProfile({
      name: input.name,
      birthDate: input.birthDate,
      birthTime: input.birthTime ?? undefined,
      birthPlace: input.birthPlace ?? undefined,
    });
  }

  function handleFriendSubmit(input: BirthDetails) {
    setFriend(input);
    writeFriend(anonId, input);
    setActiveTab("friends");
  }

  function handleClearFriend() {
    setFriend(null);
    clearFriend(anonId);
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-[#eef4ff] pb-20 text-[#20335f]">
      <TopTabs activeTab={activeTab} onChange={setActiveTab} />
      <main className="mx-auto max-w-5xl px-4 py-5">
        <div className="mb-4 rounded-[22px] bg-white/70 px-4 py-3 text-[13px] font-semibold leading-relaxed text-[#7b8292]">
          当前内容为生日资料生成的本地预览，用来娱乐和自我探索，不等于专业判断或现实保证。
        </div>

        {activeTab === "chart" ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="rounded-[32px] bg-white p-5 shadow-[0_24px_70px_rgba(75,99,153,0.16)]">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-[24px] font-black text-[#20335f]">Natal Chart</h1>
                <span className="rounded-full bg-[#f2f6ff] px-4 py-2 text-[13px] font-bold text-[#66759d]">Modern</span>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} className="flex justify-center">
                <AstroWheel placements={selfPlacements} />
              </motion.div>
              <h2 className="mt-3 text-center text-[24px] font-black text-[#20335f]">{chartTitle}</h2>
              <p className="mt-2 text-center text-[16px] font-semibold text-[#5571a8]">
                {selfDetails ? `${selfDetails.name}'s personalized preview` : "Save your birthday, time, and city first."}
              </p>
            </section>

            <aside className="grid gap-4">
              <BirthDetailsForm title="My birth details" initial={selfDetails} submitLabel="Save my chart" saving={isSaving} onSubmit={handleSelfSubmit} />
              <CompatibilityPanel score={score} friend={friend} ready={selfPlacements.length > 0 && friendPlacements.length > 0} />
            </aside>
          </div>
        ) : null}

        {activeTab === "placements" ? (
          <section className="grid gap-5">
            {selfPlacements.length ? (
              <>
                <div className="rounded-[30px] bg-[#c9d8ff] p-5 text-center shadow-[0_18px_60px_rgba(80,103,156,0.13)]">
                  <div className="flex items-center justify-between gap-3 text-[13px] font-bold text-[#4d6297]">
                    <span className="rounded-full bg-white/35 px-3 py-1">简单模式 ⇄</span>
                    <Link href="/me" className="rounded-full bg-white/45 px-3 py-1">
                      查看生日资料 ›
                    </Link>
                  </div>
                  <h1 className="mt-4 text-[26px] font-black leading-tight text-[#20335f] sm:text-[34px]">{chartTitle}</h1>
                  <p className="mt-3 text-[18px] font-black leading-relaxed text-[#294679]">
                    {sun && moon && rising
                      ? `${displaySign(sun.sign, language)}的整理力、${displaySign(moon.sign, language)}的好奇心、${displaySign(rising.sign, language)}的亲和感正在一起工作。`
                      : "保存生日后，这里会出现你的核心星座摘要。"}
                  </p>
                </div>

                <Link
                  href="/ask"
                  className="flex items-center justify-between rounded-[20px] bg-[#e8efff] px-5 py-4 text-[17px] font-black text-[#42629f] shadow-[0_10px_34px_rgba(74,101,163,0.08)]"
                >
                  <span>
                    <span className="text-[#9a7cff]">Ai</span> 我的婚姻对象是怎样的人？
                  </span>
                  <span>›</span>
                </Link>

                <section>
                  <h2 className="mb-3 text-[24px] font-black text-[#20335f]">星座密码</h2>
                  <PasswordGrid placements={selfPlacements} language={language} />
                </section>

                <section className="rounded-[26px] bg-white/86 p-5 shadow-[0_18px_60px_rgba(80,103,156,0.11)]">
                  <h2 className="text-[22px] font-black text-[#20335f]">给{displayName}的今日提醒</h2>
                  <div className="mt-4 rounded-[22px] bg-[#f4f7ff] p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[18px] font-black text-[#42629f]">建议</p>
                        <p className="mt-2 text-[16px] font-bold text-[#6279ad]">按时吃饭、均衡配比</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-black text-[#42629f]">幸运食物</p>
                        <p className="mt-2 text-[16px] font-bold text-[#6279ad]">板栗</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[16px] font-bold leading-relaxed text-[#4c6398]">{reminder}</p>
                  </div>
                </section>

                <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_60px_rgba(80,103,156,0.12)]">
                  <div className="flex gap-8 border-b border-[#eef1f7] px-5 py-5 text-[22px] font-black">
                    <span className="relative text-[#20335f] after:absolute after:inset-x-0 after:-bottom-2 after:h-1 after:rounded-full after:bg-[#5dc7df]">星座</span>
                    <span className="text-[#7a7f88]">宫位</span>
                  </div>
                  {selfPlacements.map((placement) => (
                    <PlacementCard key={placement.label} placement={placement} language={language} />
                  ))}
                </section>
              </>
            ) : (
              <div className="grid gap-4">
                <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_60px_rgba(80,103,156,0.12)]">
                  <h1 className="text-[28px] font-black text-[#20335f]">先保存你的生日</h1>
                  <p className="mt-2 text-[16px] font-semibold leading-relaxed text-[#66759d]">
                    星座、今日提醒和朋友合盘都会基于这里的生日资料生成。不会调用付费 Astrology API。
                  </p>
                </div>
                <BirthDetailsForm title="我的生日资料" initial={selfDetails} submitLabel="打开星座" saving={isSaving} onSubmit={handleSelfSubmit} />
              </div>
            )}
          </section>
        ) : null}

        {activeTab === "friends" ? (
          <section className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="grid gap-4">
              <BirthDetailsForm title="Friend birth details" initial={friend} submitLabel={friend ? "Update friend" : "Save friend"} onSubmit={handleFriendSubmit} />
              {friend ? (
                <button type="button" onClick={handleClearFriend} className="rounded-full bg-white px-4 py-3 text-[13px] font-bold text-[#66759d] shadow-[0_10px_34px_rgba(74,101,163,0.10)]">
                  Remove friend
                </button>
              ) : null}
            </div>
            <div className="grid gap-4">
              <CompatibilityPanel score={score} friend={friend} ready={selfPlacements.length > 0 && friendPlacements.length > 0} />
              <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_60px_rgba(80,103,156,0.12)]">
                <h2 className="text-[24px] font-black text-[#20335f]">Relationship signals</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {["Chemistry", "Feelings", "Communication"].map((label, index) => (
                    <div key={label} className="rounded-[20px] bg-[#f5f7ff] p-4">
                      <p className="text-[16px] font-black text-[#41609a]">{label}</p>
                      <p className="mt-2 text-[13px] font-semibold leading-relaxed text-[#6e7890]">
                        {friend ? "Readable enough for a first look. Full synastry can connect later." : "Add a friend to unlock this part."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activeTab === "composite" ? (
          <section className="grid gap-5">
            <div className="rounded-[28px] bg-[#c9d8ff] p-5 text-center shadow-[0_18px_60px_rgba(80,103,156,0.16)]">
              <p className="text-[15px] font-bold text-[#4f66a0]">Composite preview</p>
              <h1 className="mt-2 text-[28px] font-black text-[#20335f]">
                {friend ? `${profile?.name ?? "You"} + ${friend.name}` : "Add a friend to build the together chart"}
              </h1>
            </div>
            <PasswordGrid placements={selfPlacements} language={language} />
            <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_60px_rgba(80,103,156,0.12)]">
              <h2 className="text-[22px] font-black text-[#20335f]">Professional report layer</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["Natal report", "Synastry report", "White-label PDF"].map((label) => (
                  <div key={label} className="rounded-[18px] bg-[#f5f7ff] p-4 opacity-80">
                    <p className="text-[16px] font-black text-[#41609a]">{label}</p>
                    <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#8b93a5]">Coming soon</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <p className="mt-7 rounded-[20px] bg-white/70 p-4 text-[12px] font-semibold leading-relaxed text-[#7b8292]">
          This astrology room is deterministic local preview logic from saved birth details. It does not call OpenAI, DivineAPI, or a paid astrology API.
        </p>
      </main>
    </div>
  );
}
