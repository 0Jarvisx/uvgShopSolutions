import { useState, useEffect, useContext } from "react";
import AdminUsuario from "../Components/Dashboard/Usuarios";
import AdminProducto from "../Components/Dashboard/Productos";
import AdminOrder from "../Components/Dashboard/Ordenes";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useApiRequest from "../Hooks/ApiRequest";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { sendRequest } = useApiRequest();
  const [categories, setCategories] = useState([]);
  const [orderStatuses, setOrdersStatuses] = useState([]);
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      let url = "http://localhost:3000/api/users/";
      try {
        const responseData = await sendRequest(url, {
          method: "GET",
        });
        if (responseData) {
          setUsers(responseData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    const fetchProducts = async () => {
      let url = "http://localhost:3000/api/products/";
      try {
        const responseData = await sendRequest(url, {
          method: "GET",
        });
        if (responseData) {
          setProducts(responseData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    const fetchOrders = async () => {
      let url = "http://localhost:3000/api/orders/";
      try {
        const responseData = await sendRequest(url, {
          method: "GET",
        });
        if (responseData) {
          setOrders(responseData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    const fetchCategories = async () => {
      let url = "http://localhost:3000/api/categories/";
      try {
        const responseData = await sendRequest(url, {
          method: "GET",
        });
        if (responseData) {
          setCategories(responseData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    const fetchStatus = async () => {
      let url = "http://localhost:3000/api/status/";
      try {
        const responseData = await sendRequest(url, {
          method: "GET",
        });
        if (responseData) {
          setOrdersStatuses(responseData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchCategories();
    fetchStatus();
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mt-16">
        <div className="w-6xl mx-auto wx p-5">
          <h1 className="text-2xl mb-5 text-center">Dashboard</h1>
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
          {activeTab === "users" && (
            <AdminUsuario users={users} setUsers={setUsers} />
          )}
          {activeTab === "products" && (
            <AdminProducto
              products={products}
              setProducts={setProducts}
              categories={categories}
            />
          )}
          {activeTab === "orders" && (
            <AdminOrder
              orders={orders}
              setOrders={setOrders}
              orderStatuses={orderStatuses}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
