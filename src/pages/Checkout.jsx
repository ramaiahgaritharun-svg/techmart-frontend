import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { api } from "../services/api";
import styles from "./Checkout.module.css";

function Checkout() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const full_name = formData.full_name.trim();
    const email = formData.email.trim().toLowerCase();
    const mobile = formData.mobile.trim();
    const address = formData.address.trim();

    if (!full_name || !email || !mobile || !address) {
      toast.warning("Please fill all details");
      return;
    }

    if (full_name.length < 3) {
      toast.error("Enter a valid name");
      return;
    }

    // Email validation
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org|net|edu|gov|co\.in)$/i;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    // Mobile validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      toast.error("Enter a valid mobile number");
      return;
    }

    try {
      const res = await api.post("orders/", {
        full_name,
        email,
        mobile,
        address,
      });

      await dispatch(clearCart());

      toast.success("Order Placed Successfully");

      navigate("/order-success", {
        state: {
          order: res.data,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Unable to place order");
    }
  };
  if (cart.length === 0) {
    return (
      <div className={`container ${styles.emptyWrapper}`}>
        <div className={styles.emptyCard}>
          <div style={{ fontSize: "55px" }}>🛒</div>

          <h2>Your Cart is Empty</h2>

          <p>Add products before checkout.</p>

          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`container-fluid ${styles.page}`}>
        <div className="container-fluid px-5">
          <div className={styles.pageHeader}>
            <h1>Checkout</h1>

            <p>Complete your order details</p>
          </div>

          <div className="row g-4">
            {/* LEFT */}

            <div className="col-lg-8">
              <div className={styles.formCard}>
                <h3 className={styles.cardTitle}>Customer Information</h3>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label">Full Name</label>

                    <input
                      type="text"
                      className={`form-control ${styles.input}`}
                      placeholder="Enter Full Name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label">Email</label>

                    <input
                      type="email"
                      className={`form-control ${styles.input}`}
                      placeholder="Enter Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label">Mobile Number</label>

                    <input
                      type="text"
                      className={`form-control ${styles.input}`}
                      placeholder="Enter Mobile Number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Delivery Address</label>

                    <textarea
                      rows="5"
                      className={`form-control ${styles.input}`}
                      placeholder="Enter Delivery Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="col-lg-4">
              <div className={styles.summaryCard}>
                <h3 className={styles.cardTitle}>Order Summary</h3>

                <div className={styles.productsList}>
                  {cart.map((item) => (
                    <div key={item.id} className={styles.product}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.productImage}
                      />

                      <div className={styles.productInfo}>
                        <h6>{item.name}</h6>

                        <span>Qty : {item.qty}</span>
                      </div>

                      <strong>₹{item.price * item.qty}</strong>
                    </div>
                  ))}
                </div>

                <hr />

                <div className={styles.summaryRow}>
                  <span>Total Items</span>

                  <span>{cart.length}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Delivery</span>

                  <span className={styles.free}>FREE</span>
                </div>

                <div className={styles.summaryRow}>
                  <strong>Total Amount</strong>

                  <strong className={styles.total}>₹{total}</strong>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={`btn ${styles.cancelBtn}`}
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>

                  <button
                    className={`btn ${styles.orderBtn}`}
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
