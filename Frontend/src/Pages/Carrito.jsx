import { useContext, useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CarritoContext } from "../Context/CarritoContext";
import { AuthContext } from "../Context/AuthContext";
import useApiRequest from "../Hooks/ApiRequest";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const { cartItems, updateCart, clearCart } = useContext(CarritoContext);
  const [totalWithShipping, setTotalWithShipping] = useState(0);
  const { user } = useContext(AuthContext);
  const { sendRequest } = useApiRequest();
  const navigate = useNavigate();

  // Actualiza el total con el envío cuando cambian los items del carrito
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalWithShipping(total * 1.12);
  }, [cartItems]);

  function PaymentForm({ total }) {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);
      if (!user?.id) {
        navigate("/login");
        return;
      }
      const dataToSend = {
        userId: user.id,
        statusId: 1,
        total,
      };
    
      let url = "http://localhost:3000/api/orders/";

      const responseData = await sendRequest(url, {
        method: "POST",
        body: JSON.stringify({ ...dataToSend }),
      });

      if (responseData) {
        setTotalWithShipping(0);
        clearCart();
      }

      setTimeout(() => {
        setProcessing(false);
        alert("Pago procesado exitosamente!");
      }, 2000);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Nombre</label>
          <input id="name" placeholder="John Doe" required />
        </div>
        <div>
          <label htmlFor="card-element">Tarjeta de Crédito o Débito</label>
          <input id="card-number" placeholder="xxxx-xxxx-xxxx-xxxx" required />
          <div className="border rounded-md p-3"></div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={processing || cartItems.length === 0 }
          className="w-full bg-blue-300"
        >
          {processing ? "Procesando..." : `Pagar Q ${total.toFixed(2)}`}
        </button>
      </form>
    );
  }

  function ShoppingCartContent() {
    const updateQuantity = (id, change) => {
      updateCart((items) =>
        items
          .map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(0, item.quantity + change) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    };

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700 pt-16">
            Carrito
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-semibold">Producto</th>
                  <th className="text-left font-semibold">Precio</th>
                  <th className="text-left font-semibold">Cantidad</th>
                  <th className="text-left font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          className="h-16 w-16 mr-4"
                          src={item.image}
                          alt={item.name}
                        />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4">Q {item.price}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="border rounded-md px-2 py-1 mr-2"
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="border rounded-md px-2 py-1 ml-2"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4">
                      Q {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Subtotal:</span>
              <span>Q {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Impuesto:</span>
              <span>Q {(total * 0.12).toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                Q {totalWithShipping.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Detalles de Pago</h2>
            <PaymentForm total={totalWithShipping} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ShoppingCartContent />
      </main>
      <Footer />
    </div>
  );
}
