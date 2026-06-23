import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  LogIn,
  Settings,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { ACCENT, GLASS } from "../hold/atmosphere";
import { AppScreen, GlassPanel, ScreenHeader, SectionLabel } from "../../components/web/AppChrome";
import type { UserStats } from "@workspace/api-client-react";
import { useProfile } from "../../lib/useProfile";
import { saveBirthProfileFromAccountProfile } from "../../lib/astro/userBirthProfile";
import { getAnonId } from "../../lib/identity";
import { useLocalAccount } from "../../lib/auth";
import { ProfileForm } from "../../components/web/ProfileForm";
import { ProfileCard } from "./components/ProfileCard";
import { ProfileBanner } from "./components/ProfileBanner";
import { RecordsGrid } from "./components/RecordsGrid";
import { SettingsList } from "./components/SettingsList";
import { useLanguage } from "../../lib/i18n";
import {
  listLocalDailyReadings,
  subscribeToLocalDailyReadings,
} from "../readings/localDailyReadings";
import {
  listLocalQuestionHistory,
  subscribeToLocalQuestionHistory,
} from "../readings/localQuestionHistory";
import {
  listLocalTarotReadings,
  subscribeToLocalTarotReadings,
} from "../readings/localTarotReadings";

/**
 * MeView — the user's personal Hint profile hub. Profile name / birth details
 * and the Records counts are real, scoped to the anonymous browser id.
 */
export function MeView() {
  const anonId = getAnonId();
  const { profile, saveProfile, isSaving } = useProfile();
  const account = useLocalAccount();
  const [editing, setEditing] = useState(false);
  const { t } = useLanguage();
  const [localDailyCount, setLocalDailyCount] = useState(() => listLocalDailyReadings(anonId).length);
  const [localTarotCount, setLocalTarotCount] = useState(() => listLocalTarotReadings(anonId).length);
  const [localQuestionCount, setLocalQuestionCount] = useState(() => listLocalQuestionHistory(anonId).length);
  const localReadingCount = useMemo(
    () => localDailyCount + localTarotCount,
    [localDailyCount, localTarotCount],
  );
  const stats = useMemo<UserStats>(
    () => ({
      nights: localDailyCount,
      readings: localReadingCount,
      journals: 0,
      pulls: localDailyCount,
    }),
    [localDailyCount, localReadingCount],
  );
  const accountDetail = account?.email ?? account?.phone ?? account?.identifier;
  const quickActions = [
    {
      icon: LogIn,
      label: account ? "Account verified" : "Log in / Sign up",
      detail: accountDetail ?? "Save your profile and astrology context on this device.",
      href: "/login?mode=login",
    },
    {
      icon: CalendarDays,
      label: profile?.birthDate ? "Edit birth details" : "Add birth details",
      detail: profile?.birthDate
        ? `${profile.birthDate}${profile.birthPlace ? ` · ${profile.birthPlace}` : ""}`
        : "Unlock sharper daily scores and astrology previews.",
      onClick: () => setEditing(true),
    },
    {
      icon: Sparkles,
      label: "Astrology profile",
      detail: "Open the birth chart and daily sky tools.",
      href: "/astrology?tab=birth",
    },
    {
      icon: BookOpen,
      label: "Reading history",
      detail: `${localReadingCount} saved reading${localReadingCount === 1 ? "" : "s"}.`,
      href: "/readings",
    },
  ];

  useEffect(() => {
    return subscribeToLocalDailyReadings(() => {
      setLocalDailyCount(listLocalDailyReadings(anonId).length);
    });
  }, [anonId]);

  useEffect(() => {
    return subscribeToLocalTarotReadings(() => {
      setLocalTarotCount(listLocalTarotReadings(anonId).length);
    });
  }, [anonId]);

  useEffect(() => {
    return subscribeToLocalQuestionHistory(() => {
      setLocalQuestionCount(listLocalQuestionHistory(anonId).length);
    });
  }, [anonId]);

  async function handleSave(input: Parameters<typeof saveProfile>[0]) {
    const saved = await saveProfile(input);
    saveBirthProfileFromAccountProfile(saved, anonId);
    setEditing(false);
  }

  return (
    <AppScreen>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-7 flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="font-serif text-[28px] leading-none" style={{ color: GLASS.text }}>
            {t("me.title")}
          </h1>
          <p className="mt-2 max-w-md font-sans text-[13px] leading-relaxed" style={{ color: GLASS.muted }}>
            {t("me.subtitle")}
          </p>
        </div>
        <Link
          href="/settings"
          className="w-9 h-9 rounded-[8px] flex items-center justify-center"
          style={{ background: GLASS.panel, border: `1px solid ${GLASS.border}` }}
          aria-label={t("me.settings")}
          data-testid="button-open-settings"
        >
          <Settings size={16} color={ACCENT.aqua} />
        </Link>
      </motion.header>

      {editing ? (
        <section className="mb-8">
          <SectionLabel>{t("me.editProfile")}</SectionLabel>
          <GlassPanel hero>
            <ProfileForm
              initial={profile}
              submitLabel={t("me.saveChanges")}
              onSubmit={handleSave}
              isSaving={isSaving}
              onCancel={() => setEditing(false)}
            />
          </GlassPanel>
        </section>
      ) : (
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start">
          <div className="grid gap-7">
            <ProfileCard profile={profile} stats={stats} onEdit={() => setEditing(true)} />

            <section>
              <SectionLabel>Saved activity</SectionLabel>
              <ProfileBanner />
            </section>

            <RecordsGrid
              stats={stats}
              localReadingCount={localReadingCount}
              localPullCount={localDailyCount}
              localQuestionCount={localQuestionCount}
            />
          </div>

          <div className="grid gap-7">
            <QuickProfileActions actions={quickActions} />
            <SettingsList />
          </div>
        </div>
      )}
    </AppScreen>
  );
}

type QuickProfileAction = {
  icon: LucideIcon;
  label: string;
  detail: string;
  href?: string;
  onClick?: () => void;
};

function QuickProfileActions({ actions }: { actions: QuickProfileAction[] }) {
  return (
    <section>
      <SectionLabel>Profile actions</SectionLabel>
      <GlassPanel padded={false}>
        {actions.map((action, index) => (
          <QuickProfileActionRow
            key={action.label}
            action={action}
            isFirst={index === 0}
          />
        ))}
      </GlassPanel>
    </section>
  );
}

function QuickProfileActionRow({
  action,
  isFirst,
}: {
  action: QuickProfileAction;
  isFirst: boolean;
}) {
  const Icon = action.icon;
  const content = (
    <>
      <span
        className="grid size-10 shrink-0 place-items-center rounded-[8px] border"
        style={{
          background: "rgba(100,156,158,0.10)",
          borderColor: "rgba(100,156,158,0.22)",
        }}
      >
        <Icon size={17} color={ACCENT.aqua} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-[14px] leading-tight" style={{ color: GLASS.text }}>
          {action.label}
        </span>
        <span className="mt-1 block font-sans text-[11.5px] leading-snug" style={{ color: GLASS.faint }}>
          {action.detail}
        </span>
      </span>
      <ArrowRight size={15} color={GLASS.faint} className="shrink-0" />
    </>
  );
  const className =
    "flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.03]";
  const style = { borderTop: isFirst ? "none" : `1px solid ${GLASS.border}` };

  if (action.href) {
    return (
      <Link href={action.href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={action.onClick}
      className={className}
      style={style}
    >
      {content}
    </button>
  );
}

export function SettingsView() {
  const { t } = useLanguage();

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Profile controls"
        title={t("me.settings")}
        subtitle="Manage appearance, language, account access, privacy, and local web history."
        backHref="/profile"
        backLabel={t("nav.me")}
        sigil={Settings}
      />
      <SettingsList />
    </AppScreen>
  );
}
