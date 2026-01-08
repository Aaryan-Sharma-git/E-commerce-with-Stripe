import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "../components/AuthWrapper";

/* layouts */
import MainLayout from "../layouts/MainLayout";
import CheckoutLayout from "../layouts/CheckoutLayout";

/* pages */
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailure from "../pages/PaymentFailure";
import Orders from "../pages/Orders";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  /* ---------- Public Routes ---------- */
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  /* ---------- Protected Routes with Navbar ---------- */
  {
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },

  /* ---------- Protected Routes without Navbar ---------- */
  {
    element: (
      <RequireAuth>
        <CheckoutLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/failure",
        element: <PaymentFailure />,
      },
    ],
  },

  /* ---------- Fallback ---------- */
  {
    path: "*",
    element: <NotFound />,
  },
]);
