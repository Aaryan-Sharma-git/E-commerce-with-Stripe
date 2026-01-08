import { useEffect, useState } from "react";
import { getMyOrders } from "../api/order.api";
import type { Order } from "../api/order.api";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p className="text-lg">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow p-5"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                Status:{" "}
                <span className="capitalize">{order.status}</span>
              </span>
              <span className="font-bold">₹{order.amount}</span>
            </div>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
