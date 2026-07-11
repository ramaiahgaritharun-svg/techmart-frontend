import { useEffect, useState, useMemo, useCallback } from "react";
import { api } from "../services/api";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {toggleWishlist,loadWishlist,} from "../features/wishlist/wishlistSlice";
import desktopHero from "../assets/banner.png";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");

  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.product.id === productId);

  useEffect(() => {
    api
      .get("products/")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    dispatch(loadWishlist());
  }, [dispatch]);

  const scrollToProducts = useCallback(() => {
    document.getElementById("productsSection")?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return [...products]
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category === "" ? true : p.category === category))
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, search, category, sortBy]);

  if (loading) {
    return null;
  }

  return (
    <div className={`container-fluid  ${styles.pageWrapper}`}>
      {/* HERO */}

      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${desktopHero})`,
        }}
      >
        <div className={styles.heroOverlay}>
          <span className={styles.heroTag}>Tech Live</span>

          <h1 className={styles.heroTitle}>
            <div>Tech That Fits</div>
            <div>
              <span>Your Wish.</span>
            </div>
          </h1>

          <p className={styles.heroText}>
           TechMart  Smart Tech. Smarter Living.
          </p>

          <button
            className={`btn ${styles.heroBtn}`}
            onClick={scrollToProducts}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* FILTERS */}
      <div className={styles.productsSection}>
        <div className={styles.filterBar}>
          <h3 className={styles.productsHeading}>
            {filteredProducts.length} Products Found
          </h3>

          <div className={styles.filterGroup}>
            <select
              className={`form-select ${styles.filterSelect}`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort Products</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
              <option value="name">Name A → Z</option>
            </select>

            <select
              className={`form-select ${styles.filterSelect}`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Accessory">Accessory</option>
            </select>
          </div>
        </div>
      </div>
      {/* PRODUCTS */}

      <div id="productsSection" className="row g-4">
        {filteredProducts.map((p) => {
          const rating = p.rating ?? 4.2;

          const reviews = p.reviews_count ?? 0;

          const discount = p.discount_percent ?? 0;

          const finalPrice = Math.round(
                  p.price - (p.price * discount) / 100
          );
          return (
            <div key={p.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
              <div
                className={`card h-100 border-0 shadow-sm ${styles.productCard}`}
              >
                <div className={styles.discountBadge}>{discount}% OFF</div>

                <div
                  className={styles.wishlistBtn}
                  onClick={(e) => {
                    e.preventDefault();

                    e.stopPropagation();

                    dispatch(toggleWishlist(p));
                  }}
                >
                  {isInWishlist(p.id) ? "❤️" : "🤍"}
                </div>

                <Link to={`/product/${p.id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className={`card-img-top ${styles.productImage}`}
                  />
                </Link>

                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold text-white mb-2">{p.name}</h6>

                  <div className="mb-2">
                    <span className="badge bg-success">
                      ⭐ {rating.toFixed(1)}
                    </span>

                    <small className="text-secondary ms-2">({reviews})</small>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <h5 className="text-white fw-bold m-0">
                      ₹{finalPrice}
                    </h5>
                      {discount > 0 && (
                      <small className="text-decoration-line-through text-secondary">
                      ₹{p.price}
                      </small>)}
                  </div>

                  <div className="mb-3">
                    {p.stock > 0 ? (
                      <span className="text-success fw-semibold">
                        In Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="text-danger fw-semibold">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="row g-2 mt-auto">
                    <div className="col-6">
                      <button
                        className={`btn btn-primary w-100 ${styles.cartBtn}`}
                        onClick={() => {
                          dispatch(addToCart(p));
                        }}
                      >
                        Cart
                      </button>
                    </div>

                    <div className="col-6">
                      <Link
                        to={`/product/${p.id}`}
                        className={`btn btn-success w-100 ${styles.buyBtn}`}
                      >
                        Buy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
