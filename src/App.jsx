import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader";
import NotFound from "./pages/NotFound";

function Layout() {
  const location = useLocation();

  const hideLayout = ["/login", "/register", "/forgot-password"].includes(
    location.pathname,
  );

  return (
    <>
      {/* NAVBAR */}
      {!hideLayout && <Navbar />}

      {/* PAGE CONTENT */}
      <div className="app-content layoutContent">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* FOOTER */}
      {!hideLayout && <Footer />}
    </>
  );
}
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
