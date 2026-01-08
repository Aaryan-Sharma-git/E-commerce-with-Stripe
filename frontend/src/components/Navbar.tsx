import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { items } = useCart();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link to="/" className="text-xl font-bold">
        StripeShop
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/orders">Orders</Link>

        <Link to="/cart" className="relative">
          Cart
          {items.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {items.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
