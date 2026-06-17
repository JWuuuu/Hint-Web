import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "./AppShell";
import { OnboardingGate } from "./components/web/OnboardingGate";
import { LanguageProvider } from "./lib/i18n";
import { LandingPage } from "./modules/landing/LandingPage";
import { HomeDashboard } from "./modules/home";
import { AboutView, ContactView, DisclaimerView, PrivacyPolicyView, TermsView } from "./modules/legal";
import {
  AccountGatePage,
  AnimalTarotLitePage,
  AstrologyLitePage,
  CollectionPreviewPage,
  DailyPullLitePage,
  GenericAppGatePage,
  HistoryGatePage,
  PricingPreviewPage,
  RoomsLitePage,
  TarotLitePage,
} from "./modules/web-lite/WebLitePages";

const queryClient = new QueryClient();

function LegacyPreviewRedirect() {
  useEffect(() => {
    const hash = window.location.hash || "#today";
    window.location.replace(`/preview${hash}`);
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center font-sans text-sm" style={{ color: "var(--hint-muted)" }}>
      Opening web preview...
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/preview" component={HomeDashboard} />
      <Route path="/app" component={LegacyPreviewRedirect} />
      <Route path="/tarot" component={TarotLitePage} />
      <Route path="/ask">
        <GenericAppGatePage title="Ask follow-ups in Hint app." body="The website gives a short preview first. Full AI follow-up, chat history, and saved context live in the app." cta="Ask a Follow-up in App" appPath="/ask" />
      </Route>
      <Route path="/animal-tarot" component={AnimalTarotLitePage} />
      <Route path="/rooms" component={RoomsLitePage} />
      <Route path="/readings/:id" component={HistoryGatePage} />
      <Route path="/readings" component={HistoryGatePage} />
      <Route path="/login" component={AccountGatePage} />
      <Route path="/me" component={AccountGatePage} />
      <Route path="/astrology" component={AstrologyLitePage} />
      <Route path="/compatibility/invite/:token">
        <GenericAppGatePage title="Relationship reports unlock in Hint app." body="The website keeps astrology light. Full compatibility, invite links, and relationship reports live in the app." cta="Open Relationship Report" appPath="/compatibility" />
      </Route>
      <Route path="/compatibility/:id">
        <GenericAppGatePage title="Relationship reports unlock in Hint app." body="The website keeps astrology light. Full compatibility, invite links, and relationship reports live in the app." cta="Open Relationship Report" appPath="/compatibility" />
      </Route>
      <Route path="/compatibility">
        <GenericAppGatePage title="Relationship reports unlock in Hint app." body="The website keeps astrology light. Full compatibility, invite links, and relationship reports live in the app." cta="Open Relationship Report" appPath="/compatibility" />
      </Route>
      <Route path="/dream">
        <GenericAppGatePage title="Dream saving unlocks in Hint app." body="The website can preview small rituals. Dream history and deeper interpretation belong in the app." cta="Open Dream Room" appPath="/dream" />
      </Route>
      <Route path="/journal">
        <GenericAppGatePage title="Journals unlock in Hint app." body="The web preview does not save long-term entries. Open the app for saved notes, history, and patterns." cta="Open Journal" appPath="/journal" />
      </Route>
      <Route path="/collection" component={CollectionPreviewPage} />
      <Route path="/pricing" component={PricingPreviewPage} />
      <Route path="/daily-pull" component={DailyPullLitePage} />
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
