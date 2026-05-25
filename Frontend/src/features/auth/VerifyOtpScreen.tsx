import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import lgImage from "../../assets/logostockify.png";
import "./auth.css";
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

    // Focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      const verifyOtpFormData = {
        otp: enteredOtp,
        email: localStorage.getItem("reset_email")
      };
      const response = await authApi.verifyOtp(verifyOtpFormData);
      localStorage.setItem("reset_token", response.data.resetToken);
      localStorage.removeItem("reset_email");
      navigate("/resetpassword");
    } catch (err: unknown) {
      if (!isAxiosError(err)) {
        console.error("Error verifying OTP:", err);
        setError("Something went wrong. Please try again.");
        return;
      }

      if (!err.response) {
        setError("Unable to connect to the server. Please check your network connection.");
        return;
      }

      switch (err.response.status) {
        case 403:
          setError("Your account is locked or you do not have access.");
          break;
        case 500:
          setError("Server error. Please try again later.");
          break;
        default:
          setError("Invalid or expired verification code.");
      }
    }
  };

  return (
    <div className="auth-card-page">
      <div className="auth-card-wrapper auth-card-wrapper-wide">
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
              Verify code
            </h2>
            <p className="auth-subtitle">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* OTP INPUT */}
          <div className="auth-otp-group">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputMode="numeric"
                maxLength={1}
                className="auth-otp-input"
              />
            ))}
          </div>

          {error && (
            <p className="auth-error auth-error-center">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button-primary"
          >
            Verify
          </button>

          {/* RESEND */}
          <div className="auth-back-container">
            Didn't receive code?{" "}
            <span className="auth-link">
              Resend
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpScreen;
