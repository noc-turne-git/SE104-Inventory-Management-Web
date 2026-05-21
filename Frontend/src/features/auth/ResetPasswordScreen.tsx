import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import lgImage from "../../assets/logostockify.png";
import "./auth.css";
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    let hasError = false;
    // validate
    if (!form.password || !form.confirmPassword) {
      hasError = true;
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 8) {
      hasError = true;
      setError("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      hasError = true;
      setError("Passwords do not match");
      return;
    }

    if (!hasError) {
      try {
        const resetPassFormData = {
          newPass: form.password,
          confirmNewPass: form.confirmPassword,
          resetPassToken: localStorage.getItem("reset_token")
        };
        await authApi.resetPassword(resetPassFormData);  
      } catch (err: unknown) {
        hasError = true;
        if (!isAxiosError(err)) {
          console.error("Error resetting password:", err);
          setError("An unexpected error occurred. Please try again.");
        } else {
          setError(err.response?.data?.message || "Failed to reset password. Please try again.");
        }
      }
    }

    if (!hasError) {
      setSuccess(true);
      localStorage.removeItem("reset_token");
      navigate("/signin");
    };
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
              Reset password
            </h2>
            <p className="auth-subtitle">
              Enter your new password below
            </p>
          </div>

          <div className="auth-error">
            <span>
              {error}
            </span>
          </div>

          {/* PASSWORD */}
          <div className="auth-field-spacious">
            <label className="auth-label">New Password</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter new password"
                className="auth-input auth-input-with-toggle h-12"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass(!showPass)}
                className="auth-password-toggle"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* CONFIRM */}
          <div className="auth-field-spacious">
            <label className="auth-label">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="auth-input auth-input-with-toggle h-12"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <button
                type="button"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                onClick={() => setShowConfirm(!showConfirm)}
                className="auth-password-toggle"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button-primary"
          >
            Reset password
          </button>
          {success && (
            <p className="auth-success">
              Password reset successfully! Redirecting...
            </p>
          )}

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

export default ResetPasswordScreen;
