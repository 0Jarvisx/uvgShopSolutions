import { useState } from "react";
import useApiRequest from "../../Hooks/ApiRequest";

export default function AdminOrder({ orders, setOrders, orderStatuses }) {
  console.log(orders)
  const { sendRequest } = useApiRequest();

  const changeStatus = async (orderId, statusId, user_id) => {
    let url = "http://localhost:3000/api/orders/status";
    statusId++;
    const dataToSend = {
      orderId,
      statusId,
      userId: user_id
    };
    const responseData = await sendRequest(url, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
    });
    if (responseData) {
      setOrders(
        orders.map((order) => {
          {console.log(order)}
          if (order.id === orderId) {
            const currentStatusIndex = orderStatuses.findIndex(
              (status) => status.id === order.status_id
            );
            const nextStatusIndex =
              (currentStatusIndex + 1) % orderStatuses.length;
            return { ...order, status_id: orderStatuses[nextStatusIndex].id };
          }
          return order;
        })
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ordenes</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 text-left">ID</th>
            <th className="border border-gray-200 p-2 text-left">Usuario</th>
            <th className="border border-gray-200 p-2 text-left">Total</th>
            <th className="border border-gray-200 p-2 text-left">Estado</th>
            <th className="border border-gray-200 p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-200 p-2">{order.id}</td>
              <td className="border border-gray-200 p-2">
                {order.customerName}
              </td>
              <td className="border border-gray-200 p-2">
                Q {order.total.toFixed(2)}
              </td>

              <td className="border border-gray-200 p-2">
                {orderStatuses[order.status_id - 1].name}
              </td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => changeStatus(order.id, order.status_id, order.user_id)}
                  className={`font-bold py-1 px-2 rounded ${
                    order.status_id === 3
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={order.status_id === 3}
                >
                  Cambiar Estado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
