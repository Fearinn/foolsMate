import { QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AvatarItemsList from "./components/AvatarItemList";
import DefaultPage from "./pages/DefaultPage";
import Items from "./pages/Items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route path="items" element={<Items />}>
            <Route path="avatarItems" element={<AvatarItemsList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
