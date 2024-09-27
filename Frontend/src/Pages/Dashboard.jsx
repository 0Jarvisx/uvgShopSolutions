import { useState } from "react";
import AdminUsuario from "../Components/Dashboard/Usuarios";
import AdminProducto from "../Components/Dashboard/Productos";
import AdminOrder from "../Components/Dashboard/Ordenes";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="max-w-6xl mx-auto p-5">
        <h1 className="text-2xl mb-5">Dashboard</h1>
        <div className="mb-5">
          <button
            className={`px-4 py-2 mr-2 cursor-pointer border border-gray-300 rounded ${
              activeTab === "users" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
          </button>
          <button
            className={`px-4 py-2 mr-2 cursor-pointer border border-gray-300 rounded ${
              activeTab === "products" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            Productos
          </button>
          <button
            className={`px-4 py-2 mr-2 cursor-pointer border border-gray-300 rounded ${
              activeTab === "orders" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Ordenes
          </button>
        </div>
        {activeTab === "users" && <AdminUsuario />}
        {activeTab === "products" && <AdminProducto />}
        {activeTab === "orders" && <AdminOrder />}
      </div>
      <Footer />
    </div>
  );
}
