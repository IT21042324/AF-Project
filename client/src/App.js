import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { NavBar } from "./components/NavBar";
import { ProductMapper } from "./components/ProductMapper";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entrepreneurship" element={<ProductMapper />} />
      </Routes>
    </div>
  );
}

export default App;
