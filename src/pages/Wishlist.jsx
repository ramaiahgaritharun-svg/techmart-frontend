import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Wishlist.module.css";

import {loadWishlist,removeFromWishlist,} 
from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  useEffect(() => {
    dispatch(loadWishlist());
  }, [dispatch]);
  if (wishlist.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.emptyCard}>
            <div className={styles.emptyIcon}>❤️</div>

            <h2>Wishlist Empty</h2>

            <p>Save products you love and find them here later.</p>

            <Link to="/" className={styles.shopBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>❤️ My Wishlist</h1>

          <span className={styles.count}>{wishlist.length} Items</span>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            {wishlist.map((p) => (
              <div key={p.id} className={styles.wishlistCard}>
                <div className={styles.productTop}>
                  <Link to={`/product/${p.product.id}`}>
                    <img
                      src={p.product.image}
                      alt={p.product.name}
                      className={styles.productImage}
                    />
                  </Link>

                  <div className={styles.productInfo}>
                    <h4>{p.product.name}</h4>

                    <div className={styles.price}>₹{p.product.price}</div>

                    <div className={styles.badges}>
                      <span>Genuine Product</span>

                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.cartBtn}
                    onClick={async () => {
                      await dispatch(addToCart(p.product));

                      dispatch(removeFromWishlist(p.id));
                    }}
                  >
                    Add To Cart
                  </button>

                  <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeFromWishlist(p.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className={styles.summaryCard}>
              <h4>Wishlist Summary</h4>

              <div className={styles.summaryRow}>
                <span>Total Items</span>
                <span>{wishlist.length}</span>
              </div>

              <Link to="/" className={styles.continueBtn}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
