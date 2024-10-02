import { useState, useEffect, useContext } from "react";
import { ShoppingCart, User, Search, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CarritoContext } from "../Context/CarritoContext";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CarritoContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLogOut = () => {
    //NOTIFICAR A NODE

    logout();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-gray-900" : "bg-white"
      } shadow-sm`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className={`${
            isScrolled
              ? "text-2xl font-bold text-white hover:text-white"
              : "text-2xl font-bold hover:text-gray-900"
          }`}
        >
          UVG SHOP SOLUTIONS
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className={`${
                  isScrolled
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/Products"
                className={`${
                  isScrolled
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className={`${
                  isScrolled
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                to="/Contacto"
                className={`${
                  isScrolled
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            to=""
            className={`${
              isScrolled
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Search className="h-6 w-6" />
          </Link>
          {user ? (
            <Link
              to="/"
              onClick={handleLogOut}
              className={`${
                isScrolled
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Cerrar Sesion
            </Link>
          ) : (
            <Link
              to="/login"
              className={`${
                isScrolled
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="h-6 w-6" />
            </Link>
          )}

          <Link
            to={user?.role == "admin" ? "/Dashboard" : "/Carrito"}
            className={`${
              isScrolled
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {totalItems > 0 && (
              <span className="absolute top-0.575 right-0.175 bg-red-600 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}

            {user?.role === "admin" ? (
              <LayoutDashboard className=" h-6 w-6" />
            ) : (
              <ShoppingCart className="h-6 w-6" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
