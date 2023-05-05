import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./pages/entrepreneur/ProductPage";
import { UseUserContext } from "./hooks/useUserContext";
import { AdminLandingPage } from "./pages/admin/AdminLandingPage";
import { Navigate } from "react-router-dom";
import { AdminSideMenu } from "./components/AdminSideMenu";

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
          </Routes>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
