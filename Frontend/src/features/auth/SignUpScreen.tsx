import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import bgImage from "../../assets/stockify.png";
import lgImage from "../../assets/logostockify.png";
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import "./auth.css";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^0\d{9}$/.test(phone);

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";

  const [form, setForm] = useState({
    fullName: "",
    email: initialEmail,
    dob: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (key: keyof typeof form, value: string) => {
    setFormError("");
    if (key === "fullName") setFullNameError("");
    if (key === "email") setEmailError("");
    if (key === "dob") setDobError("");
    if (key === "phone") setPhoneError("");
    if (key === "password") setPasswordError("");
    if (key === "confirmPassword") setConfirmError("");
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFullNameError("");
    setEmailError("");
    setDobError("");
    setPhoneError("");
    setConfirmError("");
    setPasswordError("");
    setFormError("");

    let hasError = false;

    if (!form.fullName.trim()) {
      setFullNameError("Full name is required.");
      hasError = true;
    }

    if (!form.email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!isValidEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!form.dob) {
      setDobError("Date of birth is required.");
      hasError = true;
    }

    if (!form.phone.trim()) {
      setPhoneError("Phone number is required.");
      hasError = true;
    } else if (!isValidPhone(form.phone)) {
      setPhoneError("Phone number must be 10 digits and start with 0.");
      hasError = true;
    }

    if (!form.password) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (!form.confirmPassword) {
      setConfirmError("Please confirm your password.");
      hasError = true;
    } else if (form.password !== form.confirmPassword) {
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
        setFormError("Something went wrong. Please try again.");
        return;
      }

      if (!err.response) {
        setFormError("Unable to connect to the server. Please check your network connection.");
        return;
      }

      const status = err.response.status;

      switch (status) {
        case 409:
          setEmailError("This email is already registered.");
          break;
        case 403:
          setFormError("Your account is locked or you do not have access.");
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
        <form className="w-full max-w-md" onSubmit={handleSignUp} noValidate>
          {/* TITLE */}
          <div className="auth-header auth-header-left">
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Join Stockify system</p>
          </div>

          {/* FULL NAME */}
          <div className="auth-field">
            <label className="auth-label">Full Name*</label>
            <input
              className={`auth-input h-12 ${fullNameError ? "auth-input-error" : ""}`}
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />

            {fullNameError && (
              <p className="auth-error">
                {fullNameError}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="auth-field">
            <label className="auth-label">Email*</label>
            <input
              type="email"
              className={`auth-input h-12 ${emailError ? "auth-input-error" : ""}`}
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            {emailError && (
              <p className="auth-error">
                {emailError}
              </p>
            )}
          </div>

          {/* DOB + PHONE */}
          <div className="grid grid-cols-2 gap-4 auth-field">
            <div>
              <label className="auth-label">Date of Birth*</label>
              <input
                type="date"
                className={`auth-input h-12 ${dobError ? "auth-input-error" : ""}`}
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />

              {dobError && (
                <p className="auth-error">
                  {dobError}
                </p>
              )}
            </div>

            <div>
              <label className="auth-label">Phone*</label>
              <input
                type="tel"
                inputMode="numeric"
                className={`auth-input h-12 ${phoneError ? "auth-input-error" : ""}`}
                placeholder="0123456789"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />

              {phoneError && (
                <p className="auth-error">
                  {phoneError}
                </p>
              )}
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

          {formError && (
            <p className="auth-error">
              {formError}
            </p>
          )}

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
