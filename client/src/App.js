import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BaseRoutes } from "./BaseRoutes";
import { EntrepreneurshipRoutes } from "./EntrepreneurshipRoutes";
import { AddEvent } from "./pages/culturalEvents/addEvent";
import EditInfo from "./pages/culturalEvents/editEvent";
import DisplayEvents from "./pages/culturalEvents/displayEvents";
import BookTicket from "./pages/culturalEvents/BookEvent";
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
        <Route path="/displayEvents" element={<DisplayEvents />} />
        <Route path="/BookEvent" element={<BookTicket />} />
      </Routes>
    </div>
  );
}

export default App;
