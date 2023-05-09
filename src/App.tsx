import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AvatarItemsList } from "./components";
import { Home } from "./pages";
import { DefaultPage } from "./pages/DefaultPage";
import { Items } from "./pages/Items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
          <Route path="items" element={<Items />}>
            <Route path="avatarItems" element={<AvatarItemsList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { App };
