import { useState, useRef } from "react";
import { useNavigate } from "react-router";

import './auth.css';

const VerifyOtpScreen = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

      <div className="w-full max-w-xl">

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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Verify Code
            </h2>
            <p className="text-gray-500 text-sm">
              Enter the 6-digit code sent to your email
            </p>
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
            onClick={() => navigate("/resetpassword")}
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