import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Temp } from "./Temp.tsx";
import { Page404 } from "./components/pages/Page404.tsx";
import { BizCard } from "./components/pages/BizCard.tsx";
import { Home } from "./components/pages/Home.tsx";
import { Login } from "./components/pages/Login.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/home"
            element={<Home />}
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
    </div>
  );
}

export default App;
