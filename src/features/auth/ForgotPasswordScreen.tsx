import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

import './auth.css';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {/* WRAPPER */}
      <div className="w-full max-w-lg">

        {/* LOGO */}
        <div className="auth-logo-container">
          <div className="auth-logo-box">
            📦
          </div>
          <p className="auth-logo-text">STOCKIFY</p>
        </div>

        {/* CARD */}
        <div className="auth-card-container">

          {/* TITLE */}
          <div className="auth-header">
            <h2 className="auth-title">
              Forgot Password
            </h2>
            <p className="auth-subtitle">
              Enter your registered email address below. We'll send you a 6-digit verification code to reset your access.
            </p>
          </div>

          {/* INPUT */} 
          <div className="my-5">
            <label className="auth-label">
              Email Address
            </label>

            <div className="auth-input flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />

              <input
                type="email"
                placeholder="name@company.com"
                className="w-full text-xl outline-none text-gray-700 bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/verifyotp")}
            className="auth-button-primary"
          >
            Send Reset Code
          </button>

          {/* BACK */}
          <div className="auth-back-container">
            <span
              onClick={() => navigate("/signin")}
              className="auth-back-link"
            >
              <ArrowLeft size={16} />
              Back to Login
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordScreen;