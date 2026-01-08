import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600 mt-2">
        Page not found
      </p>

      <Link to="/" className="mt-4 text-indigo-600">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
