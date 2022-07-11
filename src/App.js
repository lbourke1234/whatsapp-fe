import "bootstrap/dist/css/bootstrap.min.css";
import "./style/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import DashboardPage from "./components/DashboardPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />;
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
