import { Mail, ArrowLeft } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import lgImage from "../../assets/logostockify.png";
import "./auth.css";
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await authApi.forgotPassword({ email });
      localStorage.setItem("reset_email", email);
      navigate("/verifyotp", { state: { email } });
    } catch (err: unknown) {
      if (!isAxiosError(err)) {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (!err.response) {
        setError("Unable to connect to the server. Please check your network connection.");
        return;
      }

      switch (err.response.status) {
        case 500:
          setError("Server error. Please try again later.");
          break;
        default:
          setError("Unable to send reset code. Please try again.");
      }
    }
  };

  return (
    <div className="auth-card-page">
      <div className="auth-card-wrapper">
        {/* LOGO */}
        <div className="auth-logo-row">
          <img
            src={lgImage}
            alt="logo"
            className="auth-logo-image"
          />
          <p className="auth-logo-text">STOCKIFY</p>
        </div>

        {/* CARD */}
        <form className="auth-card-container" onSubmit={handleSubmit}>
          {/* TITLE */}
          <div className="auth-header">
            <h2 className="auth-title">
              Forgot password
            </h2>
            <p className="auth-subtitle">
              Enter your registered email address below. We'll send you a 6-digit verification code to reset your access.
            </p>
          </div>

          {/* INPUT */}
          <div className="auth-field-spacious">
            <label className="auth-label">
              Email Address
            </label>

            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" size={20} />

              <input
                type="email"
                placeholder="name@company.com"
                className="auth-input-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button-primary"
          >
            Send reset code
          </button>

          {/* BACK */}
          <div className="auth-back-container">
            <span
              onClick={() => navigate("/signin")}
              className="auth-back-link"
            >
              <ArrowLeft size={16} />
              Back to Sign in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
