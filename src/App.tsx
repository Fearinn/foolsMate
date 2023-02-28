import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultPage from "./pages/DefaultPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
