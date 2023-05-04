import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { SideMenu } from "./components/SideMenu";
import {AccLandingPage} from "./pages/accommodations/HotelLandingPage"

export function AccommodationRoutes() {

  return (
    <div className="App">
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<AccLandingPage/>} />
          </Routes>
        </>
    </div>
  );
}
