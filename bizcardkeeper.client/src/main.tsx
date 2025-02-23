import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Temp } from "./Temp.tsx";
import { Page404 } from "./components/pages/Page404.tsx";
import { BizCard } from "./components/pages/BizCard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<App />}
          />
          <Route
            path="/temp"
            element={<Temp />}
          />
          <Route
            path="/cards/:id"
            element={<BizCard />}
          />
          <Route
            path="*"
            element={<Page404 />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
