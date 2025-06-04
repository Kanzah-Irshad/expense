import { useState } from "react";
import { auth, GoogleAuthProvider, signInWithPopup } from "../firebase";
import { FaChartPie, FaBullseye, FaPiggyBank } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  FaGoogle, 
  FaLock,
  FaEnvelope,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";
// import loginImage from "../assets/finance-login.jpg"; // You'll need to add this image to your assets

export default function Login( ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Add in your function component
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/"); // Redirect to dashboard
  } catch (error) {
    alert("Login Failed: " + error.message);
  } finally {
    setIsLoading(false);
  }
};

const handleGoogleLogin = async () => {
  setIsLoading(true);
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/"); // Redirect to dashboard
  } catch (error) {
    alert("Google Sign-In Failed: " + error.message);
  } finally {
    setIsLoading(false);
  }
};

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     onLogin();
  //   } catch (error) {
  //     alert("Login Failed: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     await signInWithPopup(auth, provider);
  //     onLogin();
  //   } catch (error) {
  //     alert("Google Sign-In Failed: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      alert("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a192f",
        overflow: "hidden",
        color: "#ffffff", // Base white text color
      }}
    >
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Image Section - Left Side */}
          <div className="col-lg-6 d-none d-lg-flex custom-left-panel">
  <div className="position-relative full-height-container">
    <img
      src="https://i.gifer.com/S0LG.gif"
      alt="Finance Login"
      className="background-image"
    />
    <div className="overlay-content">
      <FaMoneyBillWave size={60} className="mb-4 glowing-icon" />
      <h2 className="fw-bold mb-2">Welcome to kanzah's Expense Tracker</h2>
      <p className="tagline mb-4">Budget Better. Live Smarter.</p>
      <p className="text-center intro-text mb-4">
        Take control of your finances with our powerful tracking tools.
        Visualize spending, set custom budgets, and stay on top of your goals —
        all in one secure place.
      </p>
      <div className="d-flex justify-content-center">
        <div className="me-4 text-center">
          <FaShieldAlt size={24} className="mb-2 glowing-icon-small" />
          <p>Secure</p>
        </div>
        <div className="me-4 text-center">
          <FaMoneyBillWave size={24} className="mb-2 glowing-icon-small" />
          <p>Smart</p>
        </div>
        <div className="text-center">
          <FaLock size={24} className="mb-2 glowing-icon-small" />
          <p>Private</p>
        </div>
      </div>
    </div>
  </div>
</div>


          {/* Login Form Section - Right Side */}
          <div className="col-lg-6 d-flex align-items-center">
            <div className="p-4 p-md-5 w-100 text-white">
              {" "}
              {/* Added text-white here */}
              <div className="text-center mb-5">
                <h2
                  className="fw-bold text-gradient"
                  style={{
                    background:
                      "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Sign In
                </h2>
                <p className="text-light">
                  Track your expenses like never before 
                </p>
                
                
                {/* Changed from text-muted to text-light */}
              </div>
              <form onSubmit={handleLogin} className="mb-4">
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label text-light">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary">
                      <FaEnvelope className="text-primary" />
                    </span>
                    <input
                      id="email"
                      className="form-control bg-dark text-white border-secondary"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label text-light">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary">
                      <FaLock className="text-primary" />
                    </span>
                    <input
                      id="password"
                      className="form-control bg-dark text-white border-secondary"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="btn btn-link p-0 text-decoration-none"
                    style={{ color: "#4facfe" }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  className="btn btn-primary w-100 py-2 mb-3"
                  type="submit"
                  disabled={isLoading}
                  style={{
                    background:
                      "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                    border: "none",
                    height: "50px",
                    fontWeight: "600",
                  }}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="text-center my-4 position-relative">
                  <hr className="border-light" />
                  <span className="position-absolute top-50 start-50 translate-middle px-3 bg-dark text-light">
                    OR
                  </span>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline-light w-100 py-2 d-flex align-items-center justify-content-center"
                  disabled={isLoading}
                  style={{ height: "50px" }}
                >
                  <FaGoogle className="me-2" />
                  Continue with Google
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="text-light">
                  {" "}
                  {/* Changed from text-muted to text-light */}
                  Don't have an account?{" "}
                  <Link
                        to="/signup"
                        className="text-decoration-none"
                        style={{ color: "#4facfe" }}
                      >
                        Sign up
                  </Link>

                </p>
                <p className="text-light small mt-3">
                  {" "}
                  {/* Changed from text-muted to text-light */}
                  &copy; {new Date().getFullYear()} Ayesha Usman's Expense
                  Tracker. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
