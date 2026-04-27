import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import lgImage from "../../assets/logostockify.png";
import './auth.css';
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";

const VerifyOtpScreen = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    let hasError = false;

    try {
      const verifyOtpFormData = {otp: enteredOtp, email: localStorage.getItem("reset_email")};
      const response = await authApi.verifyOtp(verifyOtpFormData);
      localStorage.setItem("reset_token", response.data.resetToken);
    } catch (err: unknown) {
        hasError = true;
        if (!isAxiosError(err)) console.error("Error verifying OTP:", err);
        else {
          if (!err.response) {
            // Trường hợp không có response (mất mạng, server không phản hồi)
            setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!");
          } else {
            // Trường hợp Server có trả về lỗi
            const status = err.response.status;
            const message = err.response.data?.message;

            switch (status) {
              case 403:
                setError("Tài khoản của bạn đã bị khóa hoặc không có quyền truy cập.");
                break;
              case 500:
                setError("Lỗi hệ thống phía Server. Vui lòng thử lại sau!");
                break;
              default:
                setError(message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
          }
        }
      // Handle error (e.g., show error message)
    }
    if (!hasError) {
      localStorage.removeItem("reset_email");
      navigate("/resetpassword");
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

      <div className="w-full max-w-xl">

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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Verify Code
            </h2>
            <p className="text-gray-500 text-sm">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <div className="items-start">
            <span className="text-red-500 text-sm">
              {error}
            </span>
          </div>

          {/* OTP INPUT */}
          <div className="flex justify-between gap-3 my-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-14 h-16 text-center text-xl font-semibold 
                border border-gray-300 rounded-lg 
                focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="auth-button-primary"
          >
            Verify
          </button>

          {/* RESEND */}
          <div className="auth-back-container text-sm text-gray-500">
            Didn’t receive code?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Resend
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerifyOtpScreen;