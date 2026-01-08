import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/product.api";
import type { Product } from "../api/product.api";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p className="text-lg">No products available</p>
        <p className="text-sm mt-2">Please check back later</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col"
          >
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-auto pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-indigo-600">
                ₹{product.price}
              </span>

              <Link
                to={`/products/${product._id}`}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
