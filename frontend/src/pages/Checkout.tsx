import { useState } from "react";
import { createCheckoutSession } from "../api/checkout.api";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { items, totalAmount } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email) return alert("Email is required");

    setLoading(true);

    try {
      const res = await createCheckoutSession({
        email,
        items: items.map((i) => ({
          productId: i._id,
          quantity: i.quantity,
        })),
      });

      window.location.href = res.url;
    } catch {
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow w-full max-w-md">
      <h1 className="text-xl font-bold mb-2">Checkout</h1>
      <p className="mb-4 text-gray-600">Total: ₹{totalAmount}</p>

      <input
        type="email"
        placeholder="Email"
        className="border w-full p-2 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="w-full py-3 bg-indigo-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Pay with Stripe"}
      </button>
    </div>
  );
};

export default Checkout;
