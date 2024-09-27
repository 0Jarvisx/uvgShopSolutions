import { Route, Routes } from "react-router-dom";
import AuthForms from "./Pages/Login";
import Tienda from "./Pages/Tienda";
import Product from "./Pages/Products";
import ERROR from "./Pages/404";
import Carrito from "./Pages/Carrito";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Tienda />} />
      <Route path="/Login" element={<AuthForms />} />
      <Route path="/Products" element={<Product />} />
      <Route path="/Carrito" element={<Carrito />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="*" element={<ERROR />} />
    </Routes>
  );
}
