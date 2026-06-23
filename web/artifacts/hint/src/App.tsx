import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "./AppShell";
import { OnboardingGate } from "./components/web/OnboardingGate";
import { LanguageProvider } from "./lib/i18n";
import { HomeDashboard } from "./modules/home";
import { AboutView, ContactView, DisclaimerView, PrivacyPolicyView, TermsView } from "./modules/legal";
import { AskHint } from "./modules/ask";
import { LoginView } from "./modules/auth/LoginView";
import { AstrologyView, CompatibilityView, DreamView, JournalView } from "./modules/features";
import { MeView, SettingsView } from "./modules/me";
import { ReadingDetailView, ReadingsView } from "./modules/readings/ReadingsView";
import { TarotRoom } from "./modules/tarot";
import {
  AnimalTarotLitePage,
  CollectionPreviewPage,
  PricingPreviewPage,
  RoomsLitePage,
} from "./modules/web-lite/WebLitePages";

const queryClient = new QueryClient();

function LegacyPreviewRedirect() {
  useEffect(() => {
    const hash = window.location.hash || "#hint-preview";
    window.location.replace(`/preview${hash}`);
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center font-sans text-sm" style={{ color: "var(--hint-muted)" }}>
      Opening Hint Online...
    </div>
  );
}

function DailyPreviewRedirect() {
  useEffect(() => {
    window.location.replace("/preview#today");
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center font-sans text-sm" style={{ color: "var(--hint-muted)" }}>
      Opening today&apos;s card...
    </div>
  );
}

function ProfileRedirect() {
  useEffect(() => {
    window.location.replace(`/profile${window.location.search}${window.location.hash}`);
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center font-sans text-sm" style={{ color: "var(--hint-muted)" }}>
      Opening your profile...
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LegacyPreviewRedirect} />
      <Route path="/preview" component={HomeDashboard} />
      <Route path="/app" component={LegacyPreviewRedirect} />
      <Route path="/tarot" component={TarotRoom} />
      <Route path="/ask" component={AskHint} />
      <Route path="/animal-tarot" component={AnimalTarotLitePage} />
      <Route path="/rooms" component={RoomsLitePage} />
      <Route path="/readings/:id" component={ReadingDetailView} />
      <Route path="/readings" component={ReadingsView} />
      <Route path="/login" component={LoginView} />
      <Route path="/profile" component={MeView} />
      <Route path="/me" component={ProfileRedirect} />
      <Route path="/settings" component={SettingsView} />
      <Route path="/astrology" component={AstrologyView} />
      <Route path="/compatibility/invite/:token" component={CompatibilityView} />
      <Route path="/compatibility/:id" component={CompatibilityView} />
      <Route path="/compatibility" component={CompatibilityView} />
      <Route path="/dream" component={DreamView} />
      <Route path="/journal" component={JournalView} />
      <Route path="/collection" component={CollectionPreviewPage} />
      <Route path="/pricing" component={PricingPreviewPage} />
      <Route path="/daily-pull" component={DailyPreviewRedirect} />
      <Route path="*">
        <div className="min-h-full flex items-center justify-center font-serif text-white/20 text-sm">
          -
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppShell>
            <Switch>
              <Route path="/privacy" component={PrivacyPolicyView} />
              <Route path="/terms" component={TermsView} />
              <Route path="/disclaimer" component={DisclaimerView} />
              <Route path="/contact" component={ContactView} />
              <Route path="/about" component={AboutView} />
              <Route path="*">
                <OnboardingGate>
                  <Router />
                </OnboardingGate>
              </Route>
            </Switch>
          </AppShell>
        </WouterRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
