import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { EntrepreneurPage } from "./pages/entrepreneur/Entrepreneur";

function App() {
  return (
    <div className="App">
      <EntrepreneurPage />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
