import { useState } from 'react';

const orderStatuses = [
  { id: 1, name: 'Pendiente' },
  { id: 2, name: 'En camino' },
  { id: 3, name: 'Entregado' }
];

export default function AdminOrder() {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'John Doe', total: 29.99, status: orderStatuses[0] },
    { id: 2, customerName: 'Jane Smith', total: 49.99, status: orderStatuses[1] },
  ]);

  const changeStatus = (orderId) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const currentStatusIndex = orderStatuses.findIndex(status => status.id === order.status.id);
        const nextStatusIndex = (currentStatusIndex + 1) % orderStatuses.length;
        return { ...order, status: orderStatuses[nextStatusIndex] };
      }
      return order;
    }));
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
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border border-gray-200 p-2">{order.id}</td>
              <td className="border border-gray-200 p-2">{order.customerName}</td>
              <td className="border border-gray-200 p-2">Q {order.total.toFixed(2)}</td>
              <td className="border border-gray-200 p-2">{order.status.name}</td>
              <td className="border border-gray-200 p-2">
                <button 
                  onClick={() => changeStatus(order.id)} 
                  className={`font-bold py-1 px-2 rounded ${
                    order.status.name === 'Entregado'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  disabled={order.status.name === 'Entregado'}
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