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
import { AddPlace } from './pages/place/AddPlace'
import { AllPlaces } from "./pages/place/AllPlaces";
import { AdminMainPage } from "./pages/place/AdminMainPage";

export function AdminRoutes() {
  const { getUser } = UseUserContext();
  const user = getUser();

  return (
    <div className="App">
      {user?.role === "Admin" ? (
        <>
          <AdminSideMenu />
          <Routes>
            <Route path="/" element={<AdminLandingPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/editEvent" element={<EditInfo />} />
            <Route path="/userRequest" element={<UserRequestNotification />} />
            <Route
              path="/productRequest"
              element={<ProductRequestNotification />}
            />
            {/* Place Routes */}
            <Route path="/adminPlace" element={<AdminMainPage />} />
            <Route path="/addPlace" element={<AddPlace />} />
            <Route path="/allPlaces" element={<AllPlaces />} />
          </Routes>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
