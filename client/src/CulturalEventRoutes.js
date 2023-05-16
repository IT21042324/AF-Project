import { Route, Routes } from "react-router-dom";
import DisplayEvents from "./pages/culturalEvents/displayEvents";
import BookTicket from "./pages/culturalEvents/BookEvent";
import { NavBar } from "./components/NavBar";

export const CulturalEventsRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/displayEvents" element={<DisplayEvents />} />
        <Route path="/BookEvent/:id" element={<BookTicket />} />
      </Routes>
    </div>
  );
};
