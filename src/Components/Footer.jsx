import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { memo } from "react";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <h5>TechMart</h5>
          <p>Your trusted electronics store.</p>
        </div>

        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>

      <div className={styles.bottom}>© 2026 TechMart. All Rights Reserved.</div>
    </footer>
  );
}

export default memo(Footer);
