import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ACCENT, GLASS } from "../hold/atmosphere";
import { AppScreen, ScreenHeader, GlassPanel, SectionLabel } from "../../components/app/AppChrome";
import { useListReadings } from "@workspace/api-client-react";
import type { ReadingSummary } from "@workspace/api-client-react";
import { getAnonId } from "../../lib/identity";
import { useLanguage, type HintLanguage } from "../../lib/i18n";
import {
  getLocalDailyReading,
  listLocalDailyReadings,
  subscribeToLocalDailyReadings,
} from "./localDailyReadings";
import {
  listLocalQuestionHistory,
  subscribeToLocalQuestionHistory,
  type QuestionHistoryItem,
} from "./localQuestionHistory";
import {
  getLocalTarotReading,
  listLocalTarotReadings,
  subscribeToLocalTarotReadings,
  type LocalTarotReading,
} from "./localTarotReadings";
import type { SpreadType } from "../hold/chat/types";
import { getTarotCardImage } from "../tarot/logic/cardImageMap";

/**
 * ReadingsView — the room's memory. A real archive of every tarot reading the
 * user has sat with, newest first, scoped to their anonymous id.
 */

function fmt(iso: string, todayLabel: string): string {
  const d = new Date(iso);
  const today = new Date();
  if (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  ) {
    return todayLabel;
  }
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const CARD_NAMES_ZH: Record<string, string> = {
  "The Fool": "愚者",
  "The Magician": "魔术师",
  "The High Priestess": "女祭司",
  "The Empress": "皇后",
  "The Emperor": "皇帝",
  "The Hierophant": "教皇",
  "The Lovers": "恋人",
  "The Chariot": "战车",
  Strength: "力量",
  "The Hermit": "隐士",
  "Wheel of Fortune": "命运之轮",
  Justice: "正义",
  "The Hanged Man": "倒吊人",
  Death: "死神",
  Temperance: "节制",
  "The Devil": "恶魔",
  "The Tower": "高塔",
  "The Star": "星星",
  "The Moon": "月亮",
  "The Sun": "太阳",
  Judgement: "审判",
  "The World": "世界",
};

function displayReading(reading: ReadingSummary, language: HintLanguage) {
  if (language !== "zh") {
    return { cardName: reading.cardName, whisper: reading.whisper };
  }

  const cardName = CARD_NAMES_ZH[reading.cardName] ?? reading.cardName;
  return {
    cardName,
    whisper: `这次解读的核心提示来自「${cardName}」。旧记录会保留原始生成内容，但这里先用中文帮你回到这张牌的重点。`,
  };
}

function ReadingCard({
  reading,
  language,
  todayLabel,
  featured = false,
}: {
  reading: ReadingSummary;
  language: HintLanguage;
  todayLabel: string;
  featured?: boolean;
}) {
  const displayed = displayReading(reading, language);

  return (
    <Link
      href={`/readings/${reading.id}`}
      className={`flex gap-4 rounded-[8px] ${featured ? "px-5 py-5" : "px-4 py-4"}`}
      style={{ background: GLASS.panel, border: `1px solid ${GLASS.border}` }}
    >
      <span
        className="shrink-0 font-serif text-[10px] uppercase tracking-[0.22em] w-14 pt-0.5"
        style={{ color: GLASS.faint }}
      >
        {fmt(reading.createdAt, todayLabel)}
      </span>
      <span
        className="shrink-0 w-px self-stretch"
        style={{ background: GLASS.border }}
        aria-hidden
      />
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p
            className={`font-serif ${featured ? "text-[18px]" : "text-[14.5px]"}`}
            style={{ color: GLASS.text }}
          >
            {displayed.cardName}
          </p>
          <p
            className="font-sans text-[10px] uppercase tracking-[0.14em]"
            style={{ color: GLASS.faint }}
          >
            {reading.spreadType}
          </p>
        </div>
        {reading.question && (
          <p className="font-sans text-[12px] leading-snug" style={{ color: GLASS.faint }}>
            {reading.question}
          </p>
        )}
        <p
          className={`font-sans leading-relaxed ${featured ? "text-[13px]" : "text-[12px]"}`}
          style={{ color: GLASS.muted }}
        >
          {displayed.whisper}
        </p>
      </div>
    </Link>
  );
}

function tarotToSummary(reading: LocalTarotReading): ReadingSummary {
  return {
    id: reading.id,
    cardName: reading.spreadLabel,
    whisper: reading.shortAnswer,
    spreadType: reading.spreadType,
    question: reading.question,
    territory: reading.focusLabel ?? "tarot",
    createdAt: reading.createdAt,
  };
}

const SPREAD_LABELS: Record<SpreadType, string> = {
  single: "One card",
  three: "Three cards",
  relationship: "Connection",
  futureLover: "Future Lover",
  peachBlossom: "Peach Blossom",
  reconciliation: "Reconciliation",
  trueHeart: "True Heart",
  loveTree: "Love Tree",
  xRelationship: "X Relationship",
};

function QuestionCard({
  item,
  todayLabel,
}: {
  item: QuestionHistoryItem;
  todayLabel: string;
}) {
  return (
    <div
      className="rounded-[8px] px-4 py-4"
      style={{ background: GLASS.panel, border: `1px solid ${GLASS.border}` }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span
          className="font-serif text-[10px] uppercase tracking-[0.22em]"
          style={{ color: GLASS.faint }}
        >
          {fmt(item.createdAt, todayLabel)}
        </span>
        <span
          className="rounded-full border px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{
            color: ACCENT.gold,
            borderColor: "rgba(206,178,110,0.26)",
            background: "rgba(206,178,110,0.09)",
          }}
        >
          {SPREAD_LABELS[item.spreadType] ?? item.spreadType}
        </span>
      </div>
      <p className="font-serif text-[17px] leading-snug" style={{ color: GLASS.text }}>
        {item.question}
      </p>
      <p className="mt-2 font-sans text-[12px] leading-relaxed" style={{ color: GLASS.faint }}>
        {item.focus}
      </p>
      <Link
        href={`/readings/${item.readingId ?? item.id}`}
        className="mt-4 inline-flex h-9 items-center justify-center rounded-[8px] px-3 font-sans text-[12px] font-semibold"
        style={{
          color: "#08070B",
          background: "rgba(243,212,144,0.9)",
        }}
      >
        Open
      </Link>
    </div>
  );
}

function EmptyPanel({ children }: { children: string }) {
  return (
    <div
      className="rounded-[8px] px-4 py-5 text-center font-sans text-[13px] leading-relaxed"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: `1px dashed ${GLASS.border}`,
        color: GLASS.muted,
      }}
    >
      {children}
    </div>
  );
}

export function ReadingsView() {
  const { language, t } = useLanguage();
  const anonId = getAnonId();
  const { data, isLoading } = useListReadings({ anonId });
  const [activeTab, setActiveTab] = useState<"readings" | "questions">("readings");
  const [localReadings, setLocalReadings] = useState<ReadingSummary[]>(() =>
    listLocalDailyReadings(anonId),
  );
  const [questionHistory, setQuestionHistory] = useState<QuestionHistoryItem[]>(() =>
    listLocalQuestionHistory(anonId),
  );
  const [tarotReadings, setTarotReadings] = useState<LocalTarotReading[]>(() =>
    listLocalTarotReadings(anonId),
  );
  const readings = useMemo(() => {
    const apiReadings = (data ?? []) as ReadingSummary[];
    const byId = new Map<string, ReadingSummary>();
    [...tarotReadings.map(tarotToSummary), ...localReadings, ...apiReadings].forEach((reading) => {
      byId.set(reading.id, reading);
    });
    return [...byId.values()].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [data, localReadings, tarotReadings]);
  const savedReadings = useMemo(
    () =>
      [...tarotReadings.map(tarotToSummary), ...localReadings, ...((data ?? []) as ReadingSummary[])].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [data, localReadings, tarotReadings],
  );
  const lastReading = readings[0];
  const recentHistory = readings.slice(1, 7);

  useEffect(() => {
    return subscribeToLocalDailyReadings(() => {
      setLocalReadings(listLocalDailyReadings(anonId));
    });
  }, [anonId]);

  useEffect(() => {
    return subscribeToLocalQuestionHistory(() => {
      setQuestionHistory(listLocalQuestionHistory(anonId));
    });
  }, [anonId]);

  useEffect(() => {
    return subscribeToLocalTarotReadings(() => {
      setTarotReadings(listLocalTarotReadings(anonId));
    });
  }, [anonId]);

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow={t("readings.eyebrow")}
        title={t("readings.title")}
        subtitle={t("readings.subtitle")}
      />

      <div className="mb-7">
        <Link
          href="/tarot"
          className="inline-flex h-11 items-center justify-center rounded-[999px] px-5 font-sans text-[14px] font-medium"
          style={{
            color: "#08070B",
            background: "linear-gradient(145deg, rgba(243,212,144,0.98), rgba(122,226,214,0.92))",
            boxShadow: "0 14px 30px rgba(0,0,0,0.22)",
          }}
        >
          {t("readings.new")}
        </Link>
      </div>

      <div
        className="mb-7 grid grid-cols-2 rounded-[14px] border p-1"
        style={{
          background: "rgba(255,255,255,0.045)",
          borderColor: GLASS.border,
        }}
      >
        <TabButton active={activeTab === "readings"} onClick={() => setActiveTab("readings")}>
          {t("readings.tab.readings")}
        </TabButton>
        <TabButton active={activeTab === "questions"} onClick={() => setActiveTab("questions")}>
          {t("readings.tab.questions")}
        </TabButton>
      </div>

      {isLoading && readings.length === 0 && questionHistory.length === 0 ? (
        <p className="font-serif italic text-[13px] py-8 text-center" style={{ color: GLASS.muted }}>
          {t("readings.loading")}
        </p>
      ) : activeTab === "questions" ? (
        <section className="mb-10">
          <SectionLabel>{t("readings.questions")}</SectionLabel>
          {questionHistory.length === 0 ? (
            <EmptyPanel>{t("readings.questionsEmpty")}</EmptyPanel>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {questionHistory.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: Math.min(i, 6) * 0.05 }}
                >
                  <QuestionCard item={item} todayLabel={t("readings.today")} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      ) : readings.length === 0 ? (
        <section className="mb-10">
          <SectionLabel>{t("readings.section")}</SectionLabel>
          <GlassPanel hero>
            <p className="font-sans text-[13px] leading-relaxed text-center mb-4" style={{ color: GLASS.muted }}>
              {t("readings.empty")}
            </p>
            <Link
              href="/tarot"
              className="inline-flex items-center justify-center w-full h-11 rounded-[8px] font-serif text-[12px] uppercase tracking-[0.24em]"
              style={{
                background: "rgba(206,178,110,0.12)",
                border: "1px solid rgba(206,178,110,0.3)",
                color: ACCENT.gold,
              }}
            >
              {t("readings.enter")}
            </Link>
          </GlassPanel>
        </section>
      ) : (
        <>
          <section className="mb-9">
            <SectionLabel>{t("readings.last")}</SectionLabel>
            {lastReading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ReadingCard
                  reading={lastReading}
                  language={language}
                  todayLabel={t("readings.today")}
                  featured
                />
              </motion.div>
            )}
          </section>

          <section className="mb-9">
            <SectionLabel>{t("readings.recent")}</SectionLabel>
            {recentHistory.length === 0 ? (
              <EmptyPanel>{t("readings.recentEmpty")}</EmptyPanel>
            ) : (
              <div className="flex flex-col gap-3">
                {recentHistory.map((reading, i) => (
                  <motion.div
                    key={reading.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: Math.min(i, 6) * 0.05 }}
                  >
                    <ReadingCard
                      reading={reading}
                      language={language}
                      todayLabel={t("readings.today")}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          <section className="mb-10">
            <SectionLabel>{t("readings.saved")}</SectionLabel>
            {savedReadings.length === 0 ? (
              <EmptyPanel>{t("readings.savedEmpty")}</EmptyPanel>
            ) : (
              <div className="flex flex-col gap-3">
                {savedReadings.map((reading, i) => (
                  <motion.div
                    key={reading.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: Math.min(i, 6) * 0.05 }}
                  >
                    <ReadingCard
                      reading={reading}
                      language={language}
                      todayLabel={t("readings.today")}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </AppScreen>
  );
}

export function ReadingDetailView() {
  const [, params] = useRoute("/readings/:id");
  const id = params?.id ?? "";
  const anonId = getAnonId();
  const { data } = useListReadings({ anonId });
  const tarotReading = getLocalTarotReading(id, anonId);
  const dailyReading = getLocalDailyReading(id, anonId);
  const question = listLocalQuestionHistory(anonId).find((item) => item.id === id);
  const apiReading = ((data ?? []) as ReadingSummary[]).find((reading) => reading.id === id);
  const fallbackReading = dailyReading ?? apiReading;

  if (tarotReading) {
    return (
      <AppScreen>
        <ScreenHeader
          eyebrow="Reading detail"
          title={tarotReading.spreadLabel}
          subtitle={tarotReading.question ?? "A saved Tarot Room reading."}
          backHref="/readings"
          backLabel="History"
        />
        <ReadingDetailMeta
          spreadType={tarotReading.spreadLabel}
          createdAt={tarotReading.createdAt}
          question={tarotReading.question}
        />
        <section className="mb-6">
          <SectionLabel>Cards drawn</SectionLabel>
          <GlassPanel>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {tarotReading.cards.map((card, index) => {
                const image = getTarotCardImage(card.cardId);
                return (
                  <div key={`${card.cardId}-${index}`} className="min-w-0 text-center">
                    <div
                      className="mx-auto h-[132px] w-[82px] overflow-hidden rounded-[8px] border"
                      style={{
                        borderColor: "rgba(206,178,110,0.42)",
                        background: "rgba(0,0,0,0.22)",
                      }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={card.name}
                          className={`h-full w-full object-cover ${card.orientation === "reversed" ? "rotate-180" : ""}`}
                        />
                      ) : null}
                    </div>
                    <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.16em]" style={{ color: ACCENT.gold }}>
                      {card.positionLabel}
                    </p>
                    <p className="truncate font-serif text-[13px]" style={{ color: GLASS.text }}>
                      {card.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </section>
        <section className="mb-6">
          <SectionLabel>Answer</SectionLabel>
          <GlassPanel>
            <p className="font-serif text-[18px] leading-relaxed" style={{ color: GLASS.text }}>
              {tarotReading.shortAnswer}
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {tarotReading.cardMeanings.map((meaning, index) => (
                <p
                  key={`${tarotReading.id}-meaning-${index}`}
                  className="rounded-[8px] border px-3 py-2.5 font-sans text-[13px] leading-relaxed"
                  style={{ borderColor: GLASS.border, color: GLASS.muted }}
                >
                  {meaning}
                </p>
              ))}
            </div>
            <p className="mt-4 font-sans text-[14px] leading-relaxed" style={{ color: GLASS.muted }}>
              {tarotReading.questionMeaning}
            </p>
          </GlassPanel>
        </section>
      </AppScreen>
    );
  }

  if (fallbackReading) {
    return (
      <AppScreen>
        <ScreenHeader
          eyebrow="Reading detail"
          title={fallbackReading.cardName}
          subtitle={fallbackReading.question ?? "Saved daily reading."}
          backHref="/readings"
          backLabel="History"
        />
        <ReadingDetailMeta
          spreadType={String(fallbackReading.spreadType)}
          createdAt={fallbackReading.createdAt}
          question={fallbackReading.question ?? undefined}
        />
        <GlassPanel hero>
          <p className="font-sans text-[14px] leading-relaxed" style={{ color: GLASS.muted }}>
            {fallbackReading.whisper}
          </p>
        </GlassPanel>
      </AppScreen>
    );
  }

  if (question) {
    return (
      <AppScreen>
        <ScreenHeader
          eyebrow="Question detail"
          title={SPREAD_LABELS[question.spreadType] ?? question.spreadType}
          subtitle={question.question}
          backHref="/readings"
          backLabel="History"
        />
        <ReadingDetailMeta
          spreadType={SPREAD_LABELS[question.spreadType] ?? question.spreadType}
          createdAt={question.createdAt}
          question={question.question}
        />
        <GlassPanel hero>
          <p className="font-sans text-[14px] leading-relaxed" style={{ color: GLASS.muted }}>
            {question.focus}
          </p>
        </GlassPanel>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="History"
        title="Reading not found"
        subtitle="This saved reading is not available in this browser."
        backHref="/readings"
        backLabel="History"
      />
      <EmptyPanel>Try opening History again after completing a reading.</EmptyPanel>
    </AppScreen>
  );
}

function ReadingDetailMeta({
  spreadType,
  createdAt,
  question,
}: {
  spreadType: string;
  createdAt: string;
  question?: string;
}) {
  return (
    <section className="mb-6">
      <SectionLabel>Summary</SectionLabel>
      <GlassPanel>
        <div className="grid gap-3 font-sans text-[13px] sm:grid-cols-3" style={{ color: GLASS.muted }}>
          <p>
            <span className="block text-[10px] uppercase tracking-[0.18em]" style={{ color: GLASS.faint }}>
              Spread
            </span>
            {spreadType}
          </p>
          <p>
            <span className="block text-[10px] uppercase tracking-[0.18em]" style={{ color: GLASS.faint }}>
              Time
            </span>
            {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <span className="block text-[10px] uppercase tracking-[0.18em]" style={{ color: GLASS.faint }}>
              Question
            </span>
            {question || "No question saved."}
          </p>
        </div>
      </GlassPanel>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-[10px] px-3 font-sans text-[13px] font-semibold transition"
      style={{
        color: active ? GLASS.text : GLASS.muted,
        background: active ? "rgba(206,178,110,0.13)" : "transparent",
        boxShadow: active ? "inset 0 0 0 1px rgba(206,178,110,0.18)" : "none",
      }}
    >
      {children}
    </button>
  );
}
