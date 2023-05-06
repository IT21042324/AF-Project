import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./pages/entrepreneur/ProductPage";
import { UseUserContext } from "./hooks/useUserContext";
import { AdminLandingPage } from "./pages/admin/AdminLandingPage";
import { Navigate } from "react-router-dom";
import { AdminSideMenu } from "./components/AdminSideMenu";
import { ProductRequestPage } from "./pages/admin/ProductRequestPage";
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
            <Route path="/productRequest" element={<ProductRequestPage />} />S
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/editEvent" element={<EditInfo />} />
          </Routes>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
