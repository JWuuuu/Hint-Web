import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { LogIn, LogOut, Moon, Settings, Sparkles, Sun, UserPlus, UserRound } from "lucide-react";
import {
  PointerProvider,
  RoomLight,
  Particles,
  Vignette,
  Grain,
  Haze,
  Moonlight,
} from "./modules/hold/atmosphere";
import { LanguageToggle } from "./components/LanguageToggle";
import { CelestialBackdrop } from "./components/web/CelestialBackdrop";
import { HintLogo } from "./components/web/HintLogo";
import { trackEvent } from "./lib/analytics";
import {
  getInitialHintTheme,
  HINT_THEME_STORAGE_KEY,
  type HintTheme,
} from "./components/web/theme";
import {
  getHintPreferences,
  HINT_PREFERENCES_UPDATED_EVENT,
} from "./lib/preferences";
import { clearLocalAccount, useLocalAccount } from "./lib/auth";
import { useProfile } from "./lib/useProfile";
import { readBirthProfile } from "./lib/astro/userBirthProfile";
import { useLanguage } from "./lib/i18n";
import type { BirthProfile } from "./types/astrology";

/** Immersive room routes own the full screen (their own back link + pinned
 *  inputs), so the global bottom nav is hidden there. */
const IMMERSIVE_ROUTES: string[] = [];

/**
 * AppShell — the persistent room. Atmosphere is mounted once at the app
 * level so routes can crossfade without the particles/moonlight resetting.
 * Children are placed above the atmosphere on z-20.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [theme, setTheme] = useState<HintTheme>(getInitialHintTheme);
  const [reduceMotion, setReduceMotion] = useState(
    () => getHintPreferences().reduceMotion,
  );
  const onLanding = location === "/";
  const effectiveTheme: HintTheme = onLanding ? "dark" : theme;
  const showNav = location !== "/" && !IMMERSIVE_ROUTES.some(
    (r) => location === r || location.startsWith(r + "/"),
  );
  const showImmersiveLanguage = location !== "/" && !(
    location === "/tarot" || location.startsWith("/tarot/")
  );

  useEffect(() => {
    trackEvent("app_opened", {
      route: location,
      theme: effectiveTheme,
    });
    // Track one app open per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.dataset.hintTheme = effectiveTheme;
    document.documentElement.classList.toggle("dark", effectiveTheme === "dark");

    try {
      window.localStorage.setItem(HINT_THEME_STORAGE_KEY, effectiveTheme);
    } catch {
      // Local storage can be unavailable in private browsing.
    }
  }, [effectiveTheme]);

  useEffect(() => {
    if (onLanding && theme !== "dark") {
      setTheme("dark");
    }
  }, [onLanding, theme]);

  useEffect(() => {
    document.documentElement.dataset.hintReduceMotion = reduceMotion ? "true" : "false";
  }, [reduceMotion]);

  useEffect(() => {
    const syncPreferences = () => {
      setTheme(getInitialHintTheme());
      setReduceMotion(getHintPreferences().reduceMotion);
    };

    window.addEventListener(HINT_PREFERENCES_UPDATED_EVENT, syncPreferences);
    window.addEventListener("storage", syncPreferences);
    return () => {
      window.removeEventListener(HINT_PREFERENCES_UPDATED_EVENT, syncPreferences);
      window.removeEventListener("storage", syncPreferences);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    document.querySelectorAll(".overflow-y-auto").forEach((element) => {
      if (element instanceof HTMLElement) {
        element.scrollTo({ top: 0, left: 0 });
      }
    });
  }, [location]);

  return (
    <PointerProvider>
      <div
        data-hint-theme={effectiveTheme}
        className="fixed inset-0 overflow-hidden"
      >
        {/* Atmosphere stack — back to front */}
        <CelestialBackdrop theme={effectiveTheme} />
        <Moonlight />
        <Haze />
        <Particles />
        <RoomLight />
        <Vignette />
        <Grain />

        {/* Route content sits above the atmosphere.
            Pages own their own scroll model — AppShell does not impose
            one, so chat-style pages can pin an input to the bottom while
            scrollable pages (like the home dashboard) handle their own
            overflow. */}
        <div className="absolute inset-0 z-20">
          {children}
        </div>

        {showNav ? (
          <WebsiteHomeNav location={location} theme={theme} onThemeSelect={setTheme} />
        ) : showImmersiveLanguage ? (
          <div className="fixed right-5 top-5 z-50">
            <LanguageToggle menuPlacement="bottom" />
          </div>
        ) : null}
      </div>
    </PointerProvider>
  );
}

function WebsiteHomeNav({
  location,
  theme,
  onThemeSelect,
}: {
  location: string;
  theme: HintTheme;
  onThemeSelect: (theme: HintTheme) => void;
}) {
  const isDark = theme === "dark";
  const { t } = useLanguage();
  const [activeHash, setActiveHash] = useState(() =>
    typeof window === "undefined" ? "#hint-preview" : window.location.hash || "#hint-preview",
  );
  const homeNavItems = [
    { href: "/preview#hint-preview", label: "Preview", section: true },
    { href: "/preview#today", label: t("nav.today"), section: true },
    { href: "/preview#daily-score", label: "Daily Score", section: true },
    { href: "/preview#tarot-trial", label: "Tarot", section: true },
    { href: "/rooms", label: t("nav.rooms"), section: false },
    { href: "/readings", label: t("nav.history"), section: false },
  ];
  const profileActive = location === "/profile" || location.startsWith("/profile/") || location === "/me" || location.startsWith("/me/") || location === "/login" || location === "/settings";
  const sectionHash = (href: string) => {
    const hashIndex = href.indexOf("#");
    return hashIndex >= 0 ? href.slice(hashIndex) : "";
  };
  const isActiveNavItem = (href: string, section: boolean) => {
    if (section) return location === "/preview" && activeHash === (sectionHash(href) || "#hint-preview");
    return location === href || location.startsWith(`${href}/`);
  };

  useEffect(() => {
    const updateActiveHash = () => {
      setActiveHash(window.location.hash || "#hint-preview");
    };

    updateActiveHash();
    window.addEventListener("hashchange", updateActiveHash);
    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 py-3 sm:px-5">
      <nav
        aria-label="Primary"
        className="pointer-events-auto relative mx-auto grid w-full max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[22px] border px-2 py-1.5 lg:flex lg:min-h-[60px] lg:gap-4 lg:rounded-full lg:px-3 lg:py-2"
        style={{
          background: "color-mix(in srgb, var(--hint-surface) 90%, transparent)",
          borderColor: "var(--hint-border)",
          backdropFilter: "blur(24px) saturate(1.22)",
          WebkitBackdropFilter: "blur(24px) saturate(1.22)",
          boxShadow: "var(--hint-nav-shadow, var(--hint-elevated-shadow))",
        }}
      >
        <div className="row-start-1 inline-flex min-w-0 shrink-0 items-center justify-self-start">
          <Link
            href="/preview#hint-preview"
            className="inline-flex w-fit min-w-0 shrink-0 items-center gap-2 rounded-full px-1.5 py-1 pr-3 font-serif text-[19px] font-semibold leading-none lg:gap-3 lg:text-[21px]"
            style={{
              color: "var(--hint-text)",
              background: "transparent",
            }}
            aria-label={t("nav.homeAria")}
          >
            <HintLogo className="size-8 rounded-[10px] border border-white/20 shadow-[0_10px_24px_rgba(0,0,0,0.18)] lg:size-9 lg:rounded-[11px]" />
            Hint
          </Link>
        </div>

        <div
          className="hidden min-w-0 rounded-full border p-1 lg:flex lg:w-auto lg:flex-1 lg:justify-center lg:gap-1.5"
          style={{
            background: "color-mix(in srgb, var(--hint-input-bg) 76%, transparent)",
            borderColor: "var(--hint-border)",
          }}
        >
          {homeNavItems.map((item) => (
            <HomeNavLink
              key={item.href}
              href={item.href}
              active={isActiveNavItem(item.href, item.section)}
              isDark={isDark}
            >
              {item.label}
            </HomeNavLink>
          ))}
        </div>

        <div className="col-start-3 row-start-1 flex shrink-0 items-center justify-self-end gap-1.5 lg:static lg:col-auto lg:row-auto lg:ml-0 lg:gap-2">
          <LanguageToggle compact menuPlacement="bottom" />
          <button
            type="button"
            onClick={() => onThemeSelect(isDark ? "bright" : "dark")}
            aria-pressed={isDark}
            aria-label={isDark ? t("theme.switchToDayFromNight") : t("theme.switchToNightFromDay")}
            className="hidden h-10 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold lg:inline-flex"
            style={{
              background: "color-mix(in srgb, var(--hint-input-bg) 86%, transparent)",
              borderColor: "var(--hint-border)",
              color: "var(--hint-text)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            {isDark ? <Moon aria-hidden="true" className="size-4" /> : <Sun aria-hidden="true" className="size-4" />}
            {isDark ? t("theme.nightActive") : t("theme.dayActive")}
          </button>
          <button
            type="button"
            onClick={() => onThemeSelect(isDark ? "bright" : "dark")}
            aria-label={isDark ? t("theme.switchToDayFromNight") : t("theme.switchToNightFromDay")}
            className="grid size-9 place-items-center rounded-full border lg:hidden"
            style={{ borderColor: "var(--hint-border)", color: "var(--hint-text)", background: "var(--hint-surface-soft)" }}
          >
            {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
          <Link
            href="/profile"
            aria-label="Open profile"
            className="grid size-9 place-items-center rounded-full border transition-[transform,opacity] duration-200 hover:-translate-y-0.5 lg:size-10"
            style={{
              color: profileActive ? "var(--hint-special-action-text)" : "var(--hint-text)",
              background: profileActive ? "var(--hint-special-action-bg)" : "var(--hint-surface-soft)",
              borderColor: profileActive ? "var(--hint-special-action-border, var(--hint-border-strong))" : "var(--hint-border)",
            }}
          >
            <UserRound aria-hidden="true" className="size-4 lg:size-5" />
          </Link>
          <a
            href="/preview#today"
            className="hidden h-10 items-center justify-center gap-2 rounded-full px-5 font-sans text-[13px] font-semibold lg:inline-flex"
            style={{
              color: "var(--hint-special-action-text)",
              background: "var(--hint-special-action-bg)",
              boxShadow: "0 12px 26px rgba(244, 175, 203, 0.22)",
            }}
          >
            Draw Today
            <ArrowMark />
          </a>
        </div>

        <div
          className="col-span-3 row-start-2 flex justify-start gap-1 overflow-x-auto rounded-[16px] border p-1 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden lg:hidden"
          style={{
            background: "color-mix(in srgb, var(--hint-input-bg) 76%, transparent)",
            borderColor: "var(--hint-border)",
          }}
        >
          {homeNavItems.map((item) => (
            <MobileHomeNavLink
              key={item.href}
              href={item.href}
              active={isActiveNavItem(item.href, item.section)}
              isDark={isDark}
            >
              {item.label}
            </MobileHomeNavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

function AccountMenu({ profileActive, isDark }: { profileActive: boolean; isDark: boolean }) {
  const account = useLocalAccount();
  const { profile } = useProfile();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [birthProfile, setBirthProfile] = useState<BirthProfile | null>(() => readBirthProfile());
  const menuRef = useRef<HTMLDivElement | null>(null);
  const guestName = t("account.guest");
  const displayName = account?.name || profile?.name || guestName;
  const accountLabel = account?.email ?? account?.phone ?? account?.identifier ?? t("account.notSignedIn");
  const providerLabel = account ? `${account.provider} ${t("account.verified")}` : t("account.guestSession");
  const birthDate = birthProfile?.birthDate ?? profile?.birthDate;
  const birthPlace = birthProfile?.birthPlace ?? profile?.birthPlace;
  const birthStatus = birthDate
    ? birthPlace
      ? `${birthDate} · ${birthPlace}`
      : birthDate
    : t("account.birthMissing");
  const initials = initialsFromName(displayName, guestName);

  useEffect(() => {
    const updateBirthProfile = () => setBirthProfile(readBirthProfile());
    window.addEventListener("hint.birthProfile.updated", updateBirthProfile);
    window.addEventListener("storage", updateBirthProfile);
    return () => {
      window.removeEventListener("hint.birthProfile.updated", updateBirthProfile);
      window.removeEventListener("storage", updateBirthProfile);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function handleLogout() {
    clearLocalAccount();
    setOpen(false);
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label={t("account.profileMenu")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-current={profileActive ? "page" : undefined}
        onClick={() => setOpen((value) => !value)}
        className="grid size-9 place-items-center rounded-full border transition-[transform,opacity] duration-200 hover:-translate-y-0.5 xl:size-11"
        style={{
          color: profileActive || open ? (isDark ? "#fffaf2" : "#241d18") : "var(--hint-text)",
          background: profileActive || open
            ? isDark
              ? "linear-gradient(135deg, rgba(241,166,107,0.98), rgba(246,194,143,0.94))"
              : "linear-gradient(135deg, rgba(239,162,96,0.96), rgba(246,194,143,0.92))"
            : "var(--hint-surface-soft)",
          borderColor: profileActive || open
            ? isDark
              ? "rgba(241,166,107,0.46)"
              : "rgba(116,89,58,0.18)"
            : "var(--hint-border)",
          boxShadow: profileActive || open
            ? isDark
              ? "0 14px 28px rgba(241,166,107,0.16)"
              : "0 14px 28px rgba(80,54,42,0.10)"
            : "none",
        }}
      >
        <UserRound aria-hidden="true" className="size-4 xl:size-5" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-[90] w-[280px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-[18px] border p-3"
          style={{
            background: isDark ? "rgba(12,16,28,0.96)" : "rgba(255,249,239,0.98)",
            borderColor: "var(--hint-border)",
            boxShadow: isDark
              ? "0 24px 60px rgba(0,0,0,0.34)"
              : "0 24px 60px rgba(80,54,42,0.18)",
            backdropFilter: "blur(22px) saturate(1.18)",
            WebkitBackdropFilter: "blur(22px) saturate(1.18)",
          }}
        >
          <div className="flex items-start gap-3 rounded-[14px] border p-3" style={{ borderColor: "var(--hint-border)", background: "var(--hint-surface-soft)" }}>
            <div
              className="grid size-11 shrink-0 place-items-center rounded-full border font-serif text-[16px]"
              style={{
                borderColor: isDark ? "rgba(241,166,107,0.32)" : "rgba(116,89,58,0.16)",
                background: isDark ? "rgba(241,166,107,0.14)" : "rgba(255,255,255,0.72)",
                color: "var(--hint-text)",
              }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: "var(--hint-gold)" }}>
                {t("account.briefProfile")}
              </p>
              <p className="mt-1 truncate font-serif text-[18px] leading-tight" style={{ color: "var(--hint-text)" }}>
                {displayName}
              </p>
              <p className="mt-1 truncate font-sans text-[12px] font-semibold" style={{ color: "var(--hint-muted)" }}>
                {accountLabel}
              </p>
              <p className="mt-0.5 truncate font-sans text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--hint-faint)" }}>
                {providerLabel}
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-[14px] border px-3 py-2" style={{ borderColor: "var(--hint-border)", background: "rgba(255,255,255,0.035)" }}>
            <p className="font-sans text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "var(--hint-faint)" }}>
              {t("account.birthProfile")}
            </p>
            <p className="mt-1 truncate font-sans text-[12px] font-semibold" style={{ color: "var(--hint-muted)" }}>
              {birthStatus}
            </p>
          </div>

          <div className="mt-3 grid gap-2">
            <AccountMenuLink href="/profile" onNavigate={() => setOpen(false)} icon={<UserRound className="size-4" />}>
              {t("account.viewProfile")}
            </AccountMenuLink>
            <AccountMenuLink href="/settings" onNavigate={() => setOpen(false)} icon={<Settings className="size-4" />}>
              {t("me.settings")}
            </AccountMenuLink>
            <AccountMenuLink href="/astrology?tab=birth" onNavigate={() => setOpen(false)} icon={<Sparkles className="size-4" />}>
              {t("account.editBirthProfile")}
            </AccountMenuLink>

            {account ? (
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex h-10 items-center justify-between rounded-[12px] border px-3 font-sans text-[13px] font-black transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--hint-border)", color: "var(--hint-text)", background: "transparent" }}
              >
                <span className="inline-flex items-center gap-2">
                  <LogOut className="size-4" />
                  {t("account.logout")}
                </span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <AccountMenuLink href="/login?mode=login" onNavigate={() => setOpen(false)} icon={<LogIn className="size-4" />}>
                  {t("account.login")}
                </AccountMenuLink>
                <AccountMenuLink href="/login?mode=signup" onNavigate={() => setOpen(false)} icon={<UserPlus className="size-4" />}>
                  {t("account.signup")}
                </AccountMenuLink>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AccountMenuLink({
  href,
  icon,
  onNavigate,
  children,
}: {
  href: string;
  icon: ReactNode;
  onNavigate: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onNavigate}
      className="flex h-10 items-center justify-center gap-2 rounded-[12px] border px-3 font-sans text-[13px] font-black transition-opacity hover:opacity-80"
      style={{
        borderColor: "var(--hint-border)",
        color: "var(--hint-text)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      {icon}
      {children}
    </Link>
  );
}

function initialsFromName(name: string, guestName: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length || name === guestName) return "H";
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

function HomeNavLink({
  href,
  active,
  isDark,
  children,
}: {
  href: string;
  active: boolean;
  isDark: boolean;
  children: ReactNode;
}) {
  return (
    <HomeNavAnchor href={href} active={active} isDark={isDark}>
      {children}
    </HomeNavAnchor>
  );
}

function MobileHomeNavLink({
  href,
  active,
  isDark,
  children,
}: {
  href: string;
  active: boolean;
  isDark: boolean;
  children: ReactNode;
}) {
  const className =
    "flex h-8 shrink-0 items-center justify-center rounded-[10px] px-3 font-sans text-[12px] font-semibold";
  const style = {
    color: active ? "var(--hint-special-action-text)" : "var(--hint-muted)",
    background: active ? "var(--hint-special-action-bg)" : "transparent",
    boxShadow: active
      ? isDark
        ? "0 10px 24px rgba(244,175,203,0.18), inset 0 0 0 1px rgba(255,250,242,0.18)"
        : "0 10px 22px rgba(214,109,155,0.14), inset 0 0 0 1px rgba(255,255,255,0.46)"
      : "none",
  };

  if (href.startsWith("/#")) {
    return (
      <a href={href} aria-current={active ? "page" : undefined} className={className} style={style}>
        {children}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        data-active={active ? "true" : "false"}
        className={className}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <a href={href} aria-current={active ? "page" : undefined} className={className} style={style}>
      {children}
    </a>
  );
}

function HomeNavAnchor({
  href,
  active,
  isDark,
  children,
}: {
  href: string;
  active: boolean;
  isDark: boolean;
  children: ReactNode;
}) {
  const className =
    "flex h-9 min-w-[88px] shrink-0 items-center justify-center rounded-full px-3 text-center font-sans text-[12px] font-semibold leading-tight transition hover:-translate-y-0.5 active:translate-y-0 sm:min-w-0 sm:px-1 sm:text-[11px] md:h-10 md:min-w-[82px] md:px-3 md:text-[13px] lg:min-w-[88px]";
  const style = {
    color: active ? "var(--hint-special-action-text)" : "var(--hint-muted)",
    background: active ? "var(--hint-special-action-bg)" : "transparent",
    boxShadow: active
      ? isDark
        ? "0 10px 24px rgba(244,175,203,0.18), inset 0 0 0 1px rgba(255,250,242,0.18)"
        : "0 10px 22px rgba(214,109,155,0.14), inset 0 0 0 1px rgba(255,255,255,0.46)"
      : "none",
  };

  if (href.startsWith("/#")) {
    return (
      <a
        href={href}
        aria-current={active ? "page" : undefined}
        data-active={active ? "true" : "false"}
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        data-active={active ? "true" : "false"}
        className={className}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : "false"}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

function ArrowMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}
