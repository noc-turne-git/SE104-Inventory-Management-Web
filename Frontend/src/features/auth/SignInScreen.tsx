import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/stockify.png";
import lgImage from "../../assets/logostockify.png";
import { useAuth } from "../../context/AuthContext";
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";
import "./auth.css";
import { type User } from "../../types/user";

const toDateInputValue = (value: unknown): string => {
  if (!value) return "";
  const text = String(value);
  return text.includes("T") ? text.split("T")[0] : text;
};

const normalizeUserFromApi = (raw: any): User => ({
  id: String(raw?.id ?? raw?.userId ?? ""),
  fullName: raw?.fullName ?? raw?.userName ?? "",
  email: raw?.email ?? "",
  dob: toDateInputValue(raw?.dob ?? raw?.dateOfBirth),
  phone: raw?.phone ?? "",
  address: raw?.address ?? "",
});

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SignInScreen = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setFormError("");

    let hasError = false;

    if (!form.email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!isValidEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!form.password) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await authApi.signIn(form);

      signin(normalizeUserFromApi(response.data.user));
      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);
    } catch (err: unknown) {
      if (!isAxiosError(err)) {
        setFormError("Something went wrong. Please try again.");
        console.error("Sign-in logic error:", err);
        return;
      }

      if (!err.response) {
        setFormError("Unable to connect to the server. Please check your network connection.");
        return;
      }

      const status = err.response.status;

      switch (status) {
        case 401:
          setFormError("Email or password is incorrect.");
          break;
        case 403:
          setFormError(
            err.response.data?.requiresEmailVerification
              ? "Please verify your email before signing in."
              : "Your account is locked or you do not have access."
          );
          break;
        case 500:
          setFormError("Server error. Please try again later.");
          break;
        default:
          setFormError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 sticky top-0 h-screen items-center text-white">
        <img
          src={bgImage}
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 px-16 text-left">
          {/* LOGO + TEXT */}
          <div className="flex items-center gap-4 mb-4">
            {/* LOGO BOX */}
            <div className="bg-white p-3 rounded-xl shadow-md">
              <img
                src={lgImage}
                alt="logo"
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* TEXT */}
            <h1 className="auth-brand-title">Stockify</h1>
          </div>

          {/* SUBTEXT */}
          <p className="text-lg text-gray-50 max-w-md">
            Elevate your warehouse operations. Manage inventory, staff and logistics efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full lg:w-1/2 lg:ml-auto items-center justify-center bg-gray-50 min-h-screen px-6 py-10">
        <form className="w-full max-w-md" onSubmit={handleSignIn} noValidate>
          {/* TITLE */}
          <div className="auth-header auth-header-left">
            <h2 className="auth-title">Sign in</h2>
            <p className="auth-subtitle">Welcome back to Stockify</p>
          </div>

          {/* EMAIL */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`auth-input h-12 ${emailError || formError ? "auth-input-error" : ""}`}
              value={form.email}
              onChange={(e) => {
                setEmailError("");
                setFormError("");
                setForm({ ...form, email: e.target.value });
              }}
            />

            {emailError && (
              <p className="auth-error">
                {emailError}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="auth-field">
            <label className="auth-label">Password</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className={`auth-input auth-input-with-toggle h-12 ${
                  passwordError || formError ? "auth-input-error" : ""
                }`}
                value={form.password}
                onChange={(e) => {
                  setPasswordError("");
                  setFormError("");
                  setForm({ ...form, password: e.target.value });
                }}
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

            {(passwordError || formError) && (
              <p className="auth-error">
                {passwordError || formError}
              </p>
            )}
          </div>

          {/* FORGOT */}
          <div className="text-right mt-2">
            <span
              onClick={() => navigate("/forgotpassword")}
              className="auth-link"
            >
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button-primary"
          >
            Sign in
          </button>

          {/* SIGNUP */}
          <p className="auth-footer-text">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="auth-link"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;
