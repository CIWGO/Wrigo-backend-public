import { BrowserRouter, Route, Routes } from "react-router-dom";
import EssayInputPage from "./EssayInputPage/EssayInputPage";
import NavigationPage from "./NavigationPage/NavigationPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import LoginPage from "./LoginPage/LoginPage";
import VerifyEmailPage from "./VerifyEmailPage/VerifyEmailPage";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationPage />} />
        <Route path="/evaluate" element={<EssayInputPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verifyEmail" element={<VerifyEmailPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
