import { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaChartLine, FaShieldAlt, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  // inside SignUp component
  const navigate = useNavigate();
  
  // replace handleSignUp
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        uid: user.uid,
      });
  
      navigate("/"); // Redirect after successful signup
    } catch (error) {
      alert("Sign Up Failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // replace handleGoogleSignUp
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName || "",
        email: user.email,
        uid: user.uid,
      });
  
      navigate("/"); // Redirect after Google signup
    } catch (error) {
      alert("Google Sign-Up Failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container-fluid p-0" style={{ minHeight: "100vh", overflow: "hidden", backgroundColor: "#0a192f" }}>
      <div className="row g-0">
        {/* Left Side - Welcome Section */}
        <div className="col-lg-6 d-none d-lg-flex custom-left-panel">
  <div className="position-relative full-height-container">
    <img
      src="https://i.gifer.com/S0LG.gif"
      alt="Finance Login"
      className="background-image"
    />
    <div className="overlay-content">
      <FaMoneyBillWave size={60} className="mb-4 glowing-icon" />
      <h2 className="fw-bold mb-2">Welcome to Ayesha's Expense Tracker</h2>
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

        {/* Right Side - Signup Form */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="container mt-5 p-4 p-md-5" style={{ maxWidth: "500px" }}>
            <h2 className="text-center mb-4" style={{ 
              background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "bold"
            }}>
              Sign Up
            </h2>
            
            <form onSubmit={handleSignUp}>
              <div className="form-group mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary">
                    <FaUser className="text-primary" />
                  </span>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ height: "50px" }}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary">
                    <FaEnvelope className="text-primary" />
                  </span>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ height: "50px" }}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary">
                    <FaLock className="text-primary" />
                  </span>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ height: "50px" }}
                  />
                </div>
                <small className="text-muted">Use 8+ characters with a mix of letters, numbers & symbols</small>
              </div>

              <button 
                className="btn btn-primary w-100 mb-3" 
                type="submit"
                disabled={isLoading}
                style={{
                  height: "50px",
                  background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                  border: "none",
                  fontWeight: "600"
                }}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="text-center my-4 position-relative">
              <hr className="border-light" />
              <span className="position-absolute top-50 start-50 translate-middle px-3 bg-dark text-light">
                OR
              </span>
            </div>

            <button 
              onClick={handleGoogleSignUp} 
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
              disabled={isLoading}
              style={{ height: "50px" }}
            >
              <FaGoogle className="me-2" />
              Sign up with Google
            </button>

            <div className="text-center mt-4">
              <p className="text-light">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none">
                  Log in
                </Link>
              </p>
              <p className="text-light small mt-3">
                &copy; {new Date().getFullYear()} Ayesha Usman's Expense Tracker
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}