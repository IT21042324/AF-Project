import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { AdminSideMenu } from "./components/AdminSideMenu";
import {AccLandingPage} from "./pages/accommodations/HotelLandingPage";
import {HotelList} from "./pages/accommodations/HotelList"
import { Hotel } from "./pages/accommodations/Hotel"

export function AccommodationRoutes() {
  return (
    <div className="App">
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<AccLandingPage />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/:id" element={<Hotel />} />
        </Routes>
      </>
    </div>
  );
}
