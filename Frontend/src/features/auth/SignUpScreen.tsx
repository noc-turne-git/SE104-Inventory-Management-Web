import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/stockify.png";
import lgImage from "../../assets/logostockify.png";
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import "./auth.css";

const SignUpScreen = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmError("");
    setPasswordError("");

    let hasError = false;

    if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (form.password !== form.confirmPassword) {
      setConfirmError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    try {
      await authApi.signUp(form);
      toast.success("Account created successfully.");
      navigate("/signin");
    } catch (err: unknown) {
      if (!isAxiosError(err)) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (!err.response) {
        toast.error("Unable to connect to the server. Please check your network connection.");
        return;
      }

      const status = err.response.status;

      switch (status) {
        case 409:
          toast.error("This email is already registered.");
          break;
        case 403:
          toast.error("Your account is locked or you do not have access.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("Something went wrong. Please try again.");
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
        <form className="w-full max-w-md" onSubmit={handleSignUp}>
          {/* TITLE */}
          <div className="auth-header auth-header-left">
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Join Stockify system</p>
          </div>

          {/* FULL NAME */}
          <div className="auth-field">
            <label className="auth-label">Full Name*</label>
            <input
              required
              className="auth-input h-12"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="auth-field">
            <label className="auth-label">Email*</label>
            <input
              type="email"
              required
              className="auth-input h-12"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* DOB + PHONE */}
          <div className="grid grid-cols-2 gap-4 auth-field">
            <div>
              <label className="auth-label">Date of Birth*</label>
              <input
                type="date"
                required
                className="auth-input h-12"
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>

            <div>
              <label className="auth-label">Phone*</label>
              <input
                type="tel"
                required
                className="auth-input h-12"
                placeholder="0123456789"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="auth-field">
            <label className="auth-label">Address</label>
            <input
              className="auth-input h-12"
              placeholder="Your address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="auth-field">
            <label className="auth-label">Password*</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                className={`auth-input auth-input-with-toggle h-12 ${
                  passwordError ? "auth-input-error" : ""
                }`}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
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

            {passwordError && (
              <p className="auth-error">
                {passwordError}
              </p>
            )}
          </div>

          {/* CONFIRM */}
          <div className="auth-field">
            <label className="auth-label">Confirm Password*</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                className={`auth-input auth-input-with-toggle h-12 ${
                  confirmError ? "auth-input-error" : ""
                }`}
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
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

            {confirmError && (
              <p className="auth-error">
                {confirmError}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button-primary"
          >
            Sign up
          </button>

          {/* LOGIN */}
          <p className="auth-footer-text">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="auth-link"
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;
