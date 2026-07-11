import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import styles from "./Login.module.css";
import logo from "../assets/brand.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    login: "",
    fpEmail: "",
    fpPassword: "",
  });

  const [showForgot, setShowForgot] = useState(false);

  const [fpEmail, setFpEmail] = useState("");

  const [fpPassword, setFpPassword] = useState("");

  //-----------------------------------
  // LOGIN
  //-----------------------------------

  const handleLogin = async () => {
    const newErrors = {
      username: "",
      password: "",
      login: "",
      fpEmail: "",
      fpPassword: "",
    };

    let valid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/`,
          {
            username,
            password,
          }
      );

      dispatch(
        loginSuccess({
          access: res.data.access,
          refresh: res.data.refresh,
          username,
        }),
      );
      toast.success("Login Successful");

      navigate("/");
    } catch {
      setErrors({
        ...newErrors,
        login: "Invalid username or password",
      });
    } finally {
      setLoading(false);
    }
  };

  //-----------------------------------
  // FORGOT PASSWORD
  //-----------------------------------

  const handleForgotPassword = async () => {
    const newErrors = {
      username: "",
      password: "",
      login: "",
      fpEmail: "",
      fpPassword: "",
    };

    let valid = true;

    if (!fpEmail.trim()) {
      newErrors.fpEmail = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fpEmail)) {
      newErrors.fpEmail = "Enter a valid email address";
      valid = false;
    }

    if (!fpPassword.trim()) {
      newErrors.fpPassword = "New password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password/`,
        {
            email: fpEmail,
            new_password: fpPassword,
        }
      );

      toast.success(res.data.message);

      setShowForgot(false);

      setFpEmail("");
      setFpPassword("");

      setErrors({
        username: "",
        password: "",
        login: "",
        fpEmail: "",
        fpPassword: "",
      });
    } catch (err) {
      setErrors({
        ...newErrors,
        fpEmail: err.response?.data?.message || "Email not found",
      });
    }
  };

  //-----------------------------------
  // UI
  //-----------------------------------

  return (
    <div className={styles.loginPage}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
            <div className={styles.loginCard}>
              {/* LOGO */}

              <div className={styles.logoBox}>
                <img src={logo} alt="TechMart" className={styles.logo} />
              </div>

              <h1 className={styles.title}>
                {showForgot ? "Reset Password" : "Welcome Back"}
              </h1>

              <p className={styles.subtitle}>
                {showForgot
                  ? "Enter your registered email and choose a new password."
                  : "Login to continue shopping with TechMart."}
              </p>

              {/* LOGIN FORM */}

              {!showForgot ? (
                <>
                  <div className="mb-1">
                    <label className="form-label">Username</label>

                    <input
                      type="text"
                      className={`form-control ${styles.input}`}
                      placeholder="Enter Username"
                      value={username}
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <small className={styles.fieldError}>
                      {errors.username}
                    </small>
                  </div>

                  <div>
                    <label className="form-label">Password</label>

                    <div className={styles.passwordWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${styles.input}`}
                        placeholder="Enter Password"
                        value={password}
                        autoComplete="current-password"
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
                    <small className={styles.fieldError}>
                      {errors.password}
                    </small>

                    <small className={styles.fieldError}>{errors.login}</small>
                  </div>

                  <div className={styles.optionsRow}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                      />

                      <label className="form-check-label" htmlFor="remember">
                        Remember Me
                      </label>
                    </div>

                    <button
                      type="button"
                      className={styles.linkBtn}
                      onClick={() => setShowForgot(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    className={`btn ${styles.loginBtn}`}
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Login"}
                  </button>

                  <div className={styles.footerText}>
                    Don't have an account?
                    <Link to="/register">Create Account</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label">Registered Email</label>

                    <input
                      type="email"
                      className={`form-control ${styles.input}`}
                      placeholder="Enter Email"
                      value={fpEmail}
                      onChange={(e) => setFpEmail(e.target.value)}
                    />
                    {errors.fpEmail && (
                      <small className={styles.fieldError}>
                        {errors.fpEmail}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>

                    <input
                      type="password"
                      className={`form-control ${styles.input}`}
                      placeholder="Enter New Password"
                      value={fpPassword}
                      onChange={(e) => setFpPassword(e.target.value)}
                    />
                    {errors.fpPassword && (
                      <small className={styles.fieldError}>
                        {errors.fpPassword}
                      </small>
                    )}
                  </div>

                  <button
                    className={`btn ${styles.loginBtn}`}
                    onClick={handleForgotPassword}
                  >
                    Reset Password
                  </button>

                  <button
                    className={`btn ${styles.backBtn}`}
                    onClick={() => setShowForgot(false)}
                  >
                    ← Back to Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
