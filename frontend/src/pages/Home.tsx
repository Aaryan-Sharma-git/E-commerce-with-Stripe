import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/product.api";
import type { Product } from "../api/product.api";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data); // Set the fetched products
      } catch (err) {
        setError("Failed to load products."); // Set error if fetch fails
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProducts(); // Call the fetch function
  }, []);

  // If loading, show loading message
  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  // If there's an error, show error message
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  // If products is empty, display a message
  if (products.length === 0) {
    return <p className="p-6">No products available</p>;
  }

  // Display products if they exist
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded">
          <h2 className="font-semibold">{product.name}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <Link
            to={`/products/${product._id}`}
            className="text-indigo-600 mt-2 inline-block"
          >
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
