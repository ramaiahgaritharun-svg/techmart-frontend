import { useEffect, useState } from "react";
import { api } from "../services/api";
import styles from "./ProductDetails.module.css";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("products/").then((res) => {
      const found = res.data.find((p) => p.id === parseInt(id));
      setProduct(found);
    });
  }, [id]);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("access")) {
      toast.error("Please login first");
      return;
    }

    if (product.stock === 0) {
      toast.error("Out of Stock");
      return;
    }

    await dispatch(
      addToCart({
        product,
        quantity: qty,
      }),
    );
  };

  const handleBuyNow = async () => {
    if (!localStorage.getItem("access")) {
      toast.error("Please login first");
      return;
    }

    if (product.stock === 0) {
      toast.error("Out Of Stock");
      return;
    }

    await dispatch(
      addToCart({
        product,
        quantity: qty,
        showToast: false,
      }),
    );

    toast.success("Proceeding to Checkout");

    navigate("/checkout");
  };

  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className={styles.page}>
      <div className="container-fluid">
        {/* TOP SECTION */}

        <div className="row g-4 mb-4">
          {/* IMAGE */}

          <div className="col-12 col-lg-5">
            <div className={styles.imageCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
            </div>
          </div>

          {/* DETAILS */}

          <div className="col-12 col-lg-7">
            <div className={styles.detailsCard}>
              <span className={styles.category}>{product.category}</span>

              <h1 className={styles.productName}>{product.name}</h1>

              <div className={styles.ratingRow}>
                <span className={styles.stars}>★★★★★</span>

                <span className={styles.reviewCount}>
                  {product.rating || 4.5} Rating · {product.reviews_count || 0}{" "}
                  Reviews
                </span>
              </div>

              <div className={styles.priceRow}>
                <h2 className={styles.price}>₹{product.price}</h2>

                <span className={styles.oldPrice}>
                  ₹{Math.floor(product.price * 1.2)}
                </span>
              </div>

              <div
                className={`${styles.stockBadge}
                ${product.stock > 0 ? styles.inStock : styles.outStock}`}
              >
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out Of Stock"}
              </div>

              <p className={styles.shortDesc}>{product.description}</p>

              {/* QUANTITY */}

              <div className={styles.qtySection}>
                <span className={styles.qtyLabel}>Quantity</span>

                <div className={styles.qtyBox}>
                  <button
                    disabled={product.stock === 0}
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    −
                  </button>

                  <span>{qty}</span>

                  <button
                    disabled={product.stock === 0}
                    onClick={() => {
                      const stock = Number(product.stock);

                      if (qty < stock) {
                        setQty((prev) => prev + 1);
                      } else {
                        toast.warning(`Only ${stock} items available`);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <button
                    className={styles.cartBtn}
                    disabled={product.stock === 0}
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>

                <div className="col-6">
                  <button
                    className={styles.buyBtn}
                    disabled={product.stock === 0}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
              {/* DELIVERY FEATURES */}

              <div className="row g-3">
                <div className="col-4">
                  <div className={styles.featureCard}>
                    <div>🚚</div>
                    <span>{product.delivery_info || "Free Delivery"}</span>
                  </div>
                </div>

                <div className="col-4">
                  <div className={styles.featureCard}>
                    <div>🔄</div>
                    <span>{product.return_policy || "7 Day Return"}</span>
                  </div>
                </div>

                <div className="col-4">
                  <div className={styles.featureCard}>
                    <div>🛡️</div>
                    <span>{product.warranty || "1 Year Warranty"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS */}

        <div className={styles.highlightsSection}>
          <h2 className={styles.sectionTitle}>Why Buy From Us</h2>

          <div className="row g-4">
            <div className="col-md-6 col-xl-3">
              <div className={styles.highlightCard}>
                <span>🛡️</span>

                <div>
                  <h4>Genuine Product</h4>
                  <p>100% Original Products</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className={styles.highlightCard}>
                <span>🚚</span>

                <div>
                  <h4>Fast Delivery</h4>
                  <p>Quick Shipping</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className={styles.highlightCard}>
                <span>↩️</span>

                <div>
                  <h4>Easy Returns</h4>
                  <p>Hassle Free Returns</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className={styles.highlightCard}>
                <span>🔒</span>

                <div>
                  <h4>Secure Checkout</h4>
                  <p>100% Safe Payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className={styles.descriptionSection}>
          <h2 className={styles.sectionTitle}>Product Description</h2>

          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
