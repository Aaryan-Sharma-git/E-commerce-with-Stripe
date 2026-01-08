import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, type Product } from "../api/product.api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);

    // small UX feedback reset
    setTimeout(() => setAdded(false), 1500);
  };

  /* ---------- States ---------- */
  if (loading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error || "Product not found"}</p>
        <Link to="/" className="text-indigo-600 mt-4 inline-block">
          ← Back to products
        </Link>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link to="/" className="text-sm text-gray-500">
        ← Back to products
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image placeholder */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center h-80">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-contain h-full"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          <p className="mt-6 text-2xl font-semibold">
            ₹{product.price}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

          <div className="mt-4">
            <Link
              to="/cart"
              className="text-indigo-600 text-sm"
            >
              Go to Cart →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
