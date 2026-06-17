import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../_ds/hint-design-system-0d1931a0-c7f6-4840-bedf-7be72dbc44b9/tokens/fonts.css";
import "../../_ds/hint-design-system-0d1931a0-c7f6-4840-bedf-7be72dbc44b9/tokens/colors.css";
import "../../_ds/hint-design-system-0d1931a0-c7f6-4840-bedf-7be72dbc44b9/tokens/typography.css";
import "../../_ds/hint-design-system-0d1931a0-c7f6-4840-bedf-7be72dbc44b9/tokens/spacing.css";
import "../../_ds/hint-design-system-0d1931a0-c7f6-4840-bedf-7be72dbc44b9/tokens/effects.css";
import "../../_ds/hint-design-system-0d1931a0-c7f6-4840-bedf-7be72dbc44b9/tokens/base.css";
import "../../porting-package/src/shared/styles/animations.css";
import "../../porting-package/src/shared/styles/hint-tokens.css";
import { App } from "./App";
import "./app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
