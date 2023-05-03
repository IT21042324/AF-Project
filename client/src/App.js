import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BaseRoutes } from "./BaseRoutes";
import { EntrepreneurshipRoutes } from "./EntrepreneurshipRoutes";
import { AddEvent } from "./pages/culturalEvents/addEvent";
import EditInfo from "./pages/culturalEvents/editEvent";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<BaseRoutes />} />
        <Route
          path="/entrepreneurship/*"
          element={<EntrepreneurshipRoutes />}
        />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/editEvent" element={<EditInfo />} />
      </Routes>
    </div>
  );
}

export default App;
