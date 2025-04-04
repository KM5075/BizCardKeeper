import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Temp } from "./Temp.tsx";
import { Page404 } from "./components/pages/Page404.tsx";
import { BizCard } from "./components/pages/BizCard.tsx";
import { Home } from "./components/pages/Home.tsx";
import { Login } from "./components/pages/Login.tsx";
import { LoginUserProvider } from "./providers/LoginUserProvider.tsx";
import { PrivateRoute } from "./router/PrivateRoute.tsx";
import { AddBizCard } from "./components/pages/AddBizCard.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <LoginUserProvider>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/temp"
              element={
                <PrivateRoute>
                  <Temp />
                </PrivateRoute>
              }
            />
            <Route
              path="/cards/:id"
              element={
                <PrivateRoute>
                  <BizCard />
                </PrivateRoute>
              }
            />
            <Route
              path="/cards/register"
              element={
                <PrivateRoute>
                  <AddBizCard />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={<Page404 />}
            />
          </Routes>
        </LoginUserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
