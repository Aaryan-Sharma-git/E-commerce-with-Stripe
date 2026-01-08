import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-4 text-gray-600">
        Thank you for your purchase.
      </p>

      <Link
        to="/orders"
        className="inline-block mt-6 text-indigo-600"
      >
        View Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
