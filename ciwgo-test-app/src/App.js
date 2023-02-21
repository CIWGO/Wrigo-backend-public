import { BrowserRouter, Route, Routes } from "react-router-dom";
import EssayInputPage from "./EssayInputPage/EssayInputPage";
import NavigationPage from "./NavigationPage/NavigationPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationPage />} />
        <Route path="/evaluate" element={<EssayInputPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
