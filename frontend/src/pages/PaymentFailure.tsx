import { Link } from "react-router-dom";

const PaymentFailure = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-red-600">
        Payment Failed ❌
      </h1>

      <p className="mt-4 text-gray-600">
        Something went wrong. Please try again.
      </p>

      <Link
        to="/cart"
        className="inline-block mt-6 text-indigo-600"
      >
        Go back to Cart
      </Link>
    </div>
  );
};

export default PaymentFailure;
