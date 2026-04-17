import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import lgImage from "../../assets/logostockify.png";
import './auth.css';

const ResetPasswordScreen = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    // validate
    if (!form.password || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate("/signin");
    }, 2000); // đổi thành công chuyển trang sau 2s
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-lg">

        {/* LOGO */}
        <div className="flex items-center justify-center gap-3 mt-8 mb-8">
          <img
            src={lgImage}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
          <p className="auth-logo-text m-0">STOCKIFY</p>
        </div>

        {/* CARD */}
        <div className="auth-card-container mb-8">

          {/* TITLE */}
          <div className="auth-header">
            <h2 className="auth-title">
              Reset Password
            </h2>
            <p className="auth-subtitle">
              Enter your new password below
            </p>
          </div>

          {/* PASSWORD */}
          <div className="my-5">
            <label className="auth-label">New Password</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter new password"
                className="auth-input h-12 pr-10"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* CONFIRM */}
          <div className="my-5">
            <label className="auth-label">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="auth-input h-12 pr-10"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <div
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="auth-button-primary"
          >
            Reset Password
          </button>
          {success && (
            <p className="text-green-600 text-sm text-center mt-4">
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

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;