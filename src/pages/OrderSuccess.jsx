import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OrderSuccess.module.css";

function OrderSuccess() {
  const navigate = useNavigate();

  const { state } = useLocation();

  const order = state?.order;

  if (!order) {
    return (
      <div className={`container ${styles.emptyPage}`}>
        <div className={styles.emptyCard}>
          <h2>No Order Found</h2>

          <p>It looks like you reached this page directly.</p>

          <button
            className={`btn ${styles.homeBtn}`}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.page}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className={styles.successCard}>
                <div className={styles.successIcon}>✓</div>

                <h1 className={styles.title}>Order Placed Successfully!</h1>

                <p className={styles.subtitle}>
                  Thank you for shopping with TechMart. Your order has been
                  confirmed and a confirmation email has been sent.
                </p>

                <div className={styles.infoCard}>
                  <div className={styles.infoRow}>
                    <span>Order ID</span>

                    <strong>{order.order_id}</strong>
                  </div>

                  <div className={styles.infoRow}>
                    <span>Customer</span>

                    <strong>{order.full_name}</strong>
                  </div>

                  <div className={styles.infoRow}>
                    <span>Email</span>

                    <strong>{order.email}</strong>
                  </div>

                  <div className={styles.infoRow}>
                    <span>Mobile</span>

                    <strong>{order.mobile}</strong>
                  </div>

                  <div className={styles.infoRow}>
                    <span>Total Amount</span>

                    <strong className={styles.price}>₹{order.total}</strong>
                  </div>

                  <div className={styles.infoRow}>
                    <span>Status</span>

                    <span className={styles.status}>{order.status}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Order Date</span>

                    <strong>
                      {new Date(order.created_at).toLocaleDateString()}
                    </strong>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={`btn ${styles.homeBtn}`}
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>

                  <button
                    className={`btn ${styles.ordersBtn}`}
                    onClick={() => navigate("/orders")}
                  >
                    View Orders
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

export default OrderSuccess;
