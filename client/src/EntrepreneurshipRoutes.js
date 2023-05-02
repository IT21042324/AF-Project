import { Routes, Route } from "react-router-dom";
import { SideNavigation } from "./pages/entrepreneur/SideNavigation";
import { ProductMapper } from "./components/ProductMapper";

export function EntrepreneurshipRoutes() {
  return (
    <div className="App">
      {/* <SideNavigation /> */}

      <Routes>
        <Route path="/" element={<ProductMapper />} />
      </Routes>
    </div>
  );
}
