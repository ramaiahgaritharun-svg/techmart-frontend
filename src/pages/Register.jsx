import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import styles from "./Register.module.css";
import logo from "../assets/brand.png";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    register: "",
  });

  //------------------------------------
  // EMAIL VALIDATION
  //------------------------------------

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) return false;
    const domain = email.split(".").pop().toLowerCase();
    const validTLDs = ["com", "in", "org", "net", "edu", "co", "io", "tech"];
    return validTLDs.includes(domain);
  };

  //------------------------------------
  // REGISTER
  //------------------------------------

  const handleRegister = async () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      register: "",
    };

    let valid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    try {
      setLoading(true);

      const res = await api.post("register/", {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      const data = error.response?.data;

      if (data?.field) {
        setErrors({
          ...newErrors,
          [data.field]: data.message,
        });
      } else {
        setErrors({
          ...newErrors,
          register: "Registration failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  //------------------------------------
  // UI
  //------------------------------------

  return (
    <>
      <div className={styles.registerPage}>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
              <div className={styles.registerCard}>
                {/* LOGO */}

                <div className={styles.logoBox}>
                  <img src={logo} alt="TechMart" className={styles.logo} />
                </div>

                <h1 className={styles.title}>Create Account</h1>

                <p className={styles.subtitle}>
                  Join TechMart and start shopping today.
                </p>

                {/* USERNAME */}

                <div className="mb-1">
                  <label className="form-label">Username</label>

                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    placeholder="Enter Username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <small className={styles.fieldError}>{errors.username}</small>
                </div>

                {/* EMAIL */}

                <div className="mb-1">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className={`form-control ${styles.input}`}
                    placeholder="Enter Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <small className={styles.fieldError}>{errors.email}</small>
                </div>

                {/* PASSWORD */}

                <div className="mb-1">
                  <label className="form-label">Password</label>

                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${styles.input}`}
                      placeholder="Enter Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>

                  <small className={styles.fieldError}>{errors.password}</small>
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="mb-1">
                  <label className="form-label">Confirm Password</label>

                  <div className={styles.passwordWrapper}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control ${styles.input}`}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? "🙈" : "👁"}
                    </button>
                  </div>

                  <small className={styles.fieldError}>
                    {errors.confirmPassword}
                  </small>
                </div>

                {/* SERVER ERROR */}

                {errors.register && (
                  <p className={styles.registerError}>{errors.register}</p>
                )}

                {/* BUTTON */}

                <button
                  className={`btn ${styles.registerBtn}`}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {/* FOOTER */}

                <div className={styles.footerText}>
                  Already have an account?
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
