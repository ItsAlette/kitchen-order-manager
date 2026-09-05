import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Planning from "./pages/Planning"
import Menus from "./pages/Menus"
import Products from "./pages/Products"
import Suppliers from "./pages/Suppliers"
import Statistics from "./pages/Statistics"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/commandes"
            element={<Orders />}
          />

          <Route
            path="/planning"
            element={<Planning />}
          />

          <Route
            path="/menus"
            element={<Menus />}
          />

          <Route
            path="/produits"
            element={<Products />}
          />

          <Route
            path="/fournisseurs"
            element={<Suppliers />}
          />

          <Route
            path="/statistiques"
            element={<Statistics />}
          />

          <Route
            path="/profil"
            element={<Profile />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App