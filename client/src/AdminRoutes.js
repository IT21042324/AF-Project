import { Routes, Route } from "react-router-dom";
import { ProductListPage } from "./pages/admin/ProductListPage";
import { UseUserContext } from "./hooks/useUserContext";
import { AdminLandingPage } from "./pages/admin/AdminLandingPage";
import { Navigate } from "react-router-dom";
import { AdminSideMenu } from "./components/AdminSideMenu";
import { UserRequestNotification } from "./pages/admin/UserRequestNotification";
import { AddEvent } from "./pages/admin/addEvent";
import EditInfo from "./pages/admin/editEvent";
import { ProductRequestNotification } from "./pages/admin/ProductRequestNotification";
import { AddPlace } from "./pages/place/AddPlace";
import { AllPlaces } from "./pages/place/AllPlaces";
import { AdminMainPage } from "./pages/place/AdminMainPage";
import {EditHotel} from "./pages/admin/HotelsTable";
import {AddHotelForm} from "./pages/admin/AddHotel";
import {NewRoom} from "./pages/admin/NewRoom";
import { EditRoom } from "./pages/admin/RoomsTable";


export function AdminRoutes() {
  const { getUser } = UseUserContext();
  const user = getUser();

  return (
    <div className="App">
      {user?.role === "Admin" ? (
        <>
          <AdminSideMenu />
          <Routes>
            {/* Entrepreneurship related pages */}
            <Route path="/" element={<AdminLandingPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/userRequest" element={<UserRequestNotification />} />
            <Route
              path="/productRequest"
              element={<ProductRequestNotification />}
            />


            {/* Cultural Events related pages */}
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/editEvent" element={<EditInfo />} />
            {/* Place Routes */}
            <Route path="/adminPlace" element={<AdminMainPage />} />
            <Route path="/addPlace" element={<AddPlace />} />
            <Route path="/allPlaces" element={<AllPlaces />} />

            <Route path="/hotels" element={<EditHotel />} />
            <Route path="/addHotel" element={<AddHotelForm />} />
            <Route path="/rooms" element={<EditRoom />} />
            <Route path="/addRoom" element={<NewRoom />} />

          </Routes>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
