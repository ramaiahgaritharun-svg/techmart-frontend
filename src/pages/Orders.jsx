import { useEffect, useState } from "react";
import { api } from "../services/api";
import styles from "./Orders.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("orders/")
      .then((res) => {
  console.log(res.data);
  setOrders(res.data);
})
      .catch((err) => console.log(err));
  }, []);

  const getStatusClass = (status) => {
    if (status === "Delivered") return styles.delivered;
    if (status === "Shipped") return styles.shipped;
    return styles.processing;
  };

  return (
    <div className={styles.page}>
      <div className="container-xxl">
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>📦 My Orders</h1>

          <p className={styles.subtitle}>Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className={styles.emptyBox}>
            <h3>No Orders Yet</h3>
            <p>Place your first order and it will appear here.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderTop}>
                <h4>
                  Order #
                  {order.order_id ? order.order_id : `Order #${order.id}`}
                </h4>

                <span
                  className={`${styles.statusBadge} ${getStatusClass(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {order.items?.map((item) => (
                <div key={item.id} className={styles.itemRow}>
                  <div className={styles.productInfo}>
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className={styles.productImage}
                    />

                    <div>
                      <h5>{item.product_name}</h5>

                      <p>Qty: {item.quantity}</p>

                      <p>
                        Date: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className={styles.totalSection}>₹{item.price}</div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
