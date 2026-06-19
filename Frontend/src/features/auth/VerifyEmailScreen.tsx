import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { isAxiosError } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import authApi from "../../api/AuthAPI";
import lgImage from "../../assets/logostockify.png";
import "./auth.css";

type VerifyStatus = "loading" | "success" | "error";

const VerifyEmailScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("error");
      setMessage("Verification link is missing required information.");
      return;
    }

    const verifyEmail = async () => {
      try {
        await authApi.verifyEmail({ email, token });
        setStatus("success");
        setMessage("Your account has been verified successfully.");
      } catch (err: unknown) {
        setStatus("error");
        if (isAxiosError(err) && err.response?.status === 400) {
          setMessage("Verification link is invalid or has expired.");
          return;
        }
        setMessage("Unable to verify your account. Please try again later.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <div className="auth-card-page">
      <div className="auth-card-wrapper">
        <div className="auth-card-container">
          <div className="auth-logo-row">
            <img src={lgImage} alt="Stockify logo" className="auth-logo-image" />
            <h1 className="auth-logo-text">Stockify</h1>
          </div>

          <div className="auth-header">
            <div className="flex justify-center mb-4">
              {isLoading && <Loader2 className="h-12 w-12 animate-spin text-blue-600" />}
              {isSuccess && <CheckCircle2 className="h-12 w-12 text-green-600" />}
              {status === "error" && <XCircle className="h-12 w-12 text-red-600" />}
            </div>
            <h2 className="auth-title">
              {isLoading ? "Verifying email" : isSuccess ? "Email verified" : "Verification failed"}
            </h2>
            <p className="auth-subtitle">{message}</p>
          </div>

          <button
            type="button"
            className="auth-button-primary"
            disabled={isLoading}
            onClick={() => navigate(isSuccess ? "/signin" : "/signup")}
          >
            {isSuccess ? "Go to sign in" : "Back to sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailScreen;
