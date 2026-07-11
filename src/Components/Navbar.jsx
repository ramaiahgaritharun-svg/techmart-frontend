import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../features/search/searchSlice";
import styles from "./Navbar.module.css";
import { logout } from "../features/auth/authSlice";
import { memo } from "react";

function Navbar() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const search = useSelector((state) => state.search.value);
  const navigate = useNavigate();

  const username = useSelector((state) => state.auth.username);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", {
      replace: true,
    });
    window.location.reload();
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${styles.navbar} ${styles.navbarCustom}`}
    >
      <div className="container-fluid">
        {/* BRAND */}
        <Link to="/" className={`navbar-brand ${styles.brand}`}>
          TechMart
        </Link>

        {/* SEARCH DESKTOP */}
        <div className={styles.searchWrapDesktop}>
          <i className={`bi bi-search ${styles.searchIcon}`}></i>

          <input
            type="text"
            className={`form-control ${styles.searchInput}`}
            placeholder="Search products..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>

        {/* RIGHT ICONS ALWAYS VISIBLE */}
        <div className={styles.alwaysVisible}>
          <Link  to="/wishlist" className={styles.iconBtn}>
            <i className="bi bi-heart"></i>
          </Link>

          <Link  to="/cart" className={styles.cartBtn}>
            <i className="bi bi-cart3"></i>

            <span className={styles.cartCount}>{cart.length}</span>
          </Link>
        </div>

        <button
          className={`navbar-toggler ${styles.toggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSE MENU */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* MOBILE SEARCH */}
          <div className={styles.searchWrapMobile}>
            <i className={`bi bi-search ${styles.searchIcon}`}></i>

            <input
              type="text"
              className={`form-control ${styles.searchInput}`}
              placeholder="Search products..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
          </div>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/">
                Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${styles.navLink}`}
                to="/wishlist"
              >
                Wishlist
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${styles.navLink}`}
                 to="/orders"
              >
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${styles.navLink}`}
                 to="/checkout"
              >
                🛒
              </Link>
            </li>
          </ul>

            <div className={styles.userSection}>
              <button className={styles.profileBtn}>
                <i className="bi bi-person-circle"></i>
              </button>

              <span className={styles.userName}>{username}</span>

              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
  
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
