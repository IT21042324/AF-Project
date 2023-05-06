import { Routes, Route } from "react-router-dom";
import { ProductListPage } from "./pages/admin/ProductListPage";
import { UseUserContext } from "./hooks/useUserContext";
import { AdminLandingPage } from "./pages/admin/AdminLandingPage";
import { Navigate } from "react-router-dom";
import { AdminSideMenu } from "./components/AdminSideMenu";
import { UserRequestNotification } from "./pages/admin/UserRequestNotification";
import { AddEvent } from "./pages/admin/addEvent";
import EditInfo from "./pages/admin/editEvent";

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
          </Routes>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
