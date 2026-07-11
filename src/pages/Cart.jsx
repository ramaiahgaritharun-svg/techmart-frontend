import { useDispatch, useSelector } from "react-redux";
import {increaseQty,decreaseQty,removeFromCart,} 
from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={styles.page}>
      <div className="container">
        <h2 className={styles.cartTitle}>🛒 Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <h3>Your Cart Is Empty</h3>

            <p>Looks like you haven't added anything yet.</p>

            <Link to="/" className={styles.shopBtn}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {cart.map((item) => (
                <div key={item.id} className={styles.cartCard}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.productImage}
                  />

                  <div className={styles.productContent}>
                    <h5 className={styles.productName}>{item.name}</h5>

                    <div className={styles.price}>₹{item.price}</div>

                    <div className={styles.qtySection}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => dispatch(decreaseQty(item.id))}
                      >
                        −
                      </button>

                      <span className={styles.qty}>{item.qty}</span>

                      <button
                        className={styles.qtyBtn}
                        onClick={() => dispatch(increaseQty(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.rightSection}>
                    <div className={styles.subTotal}>
                      ₹{item.price * item.qty}
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className={styles.summaryCard}>
                <h4>Order Summary</h4>

                <div className={styles.summaryRow}>
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span className="text-success">FREE</span>
                </div>

                <hr />

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <Link to="/checkout" className={styles.checkoutBtn}>
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
