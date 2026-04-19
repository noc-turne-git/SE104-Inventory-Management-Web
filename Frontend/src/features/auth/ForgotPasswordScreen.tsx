import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import lgImage from "../../assets/logostockify.png";
import './auth.css';
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async ( e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    // Handle forgot password logic here
    try {
      await authApi.forgotPassword({ email });
      localStorage.setItem("reset_email", email);
    } catch (err: unknown) {
      
      hasError = true;
      if (!isAxiosError(err)) setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      else {
        if (!err.response) {
        // Trường hợp không có response (mất mạng, server không phản hồi)
        setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!");
        } else {
          // Trường hợp Server có trả về lỗi
          const status = err.response.status;
          const message = err.response.data?.message;

          switch (status) {
            case 500:
              setError("Lỗi hệ thống phía Server. Vui lòng thử lại sau!");
              break;
            default:
              setError(message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
          }
        }
      }
    }
    if(!hasError) {
      navigate("/verifyotp", { state: { email } });
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {/* WRAPPER */}
      <div className="w-full max-w-lg">

        {/* LOGO */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src={lgImage}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
          <p className="auth-logo-text m-0">STOCKIFY</p>
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

          <div className="items-start">
            <span className="text-red-500 text-sm">
              {error}
            </span>
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
            onClick={handleSubmit}
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