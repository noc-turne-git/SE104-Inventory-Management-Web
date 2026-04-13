import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/stockify.png";
import lgImage from "../../assets/logostockify.png";

const SignupScreen = () => {
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

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSignUp = () => {
    navigate("/signin");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (form.password !== form.confirmPassword) {
      setConfirmError("Passwords do not match");
      hasError = true;
    } else {
      setConfirmError("");
    }

    if (!hasError) {
      handleSignUp();
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
            <h1 className="text-7xl font-bold mb-4">Stockify</h1>
          </div>

          {/* SUBTEXT */}
          <p className="text-lg text-gray-200 max-w-md">
            Elevate your warehouse operations. Manage inventory, staff and logistics efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full lg:w-1/2 lg:ml-auto items-center justify-center bg-gray-50 min-h-screen px-6">

        <form className="w-full max-w-md mt-10" onSubmit={handleSubmit}>

          {/* TITLE */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-500 mt-1 text-md">Join Stockify system</p>
          </div>

          {/* FULL NAME */}
          <div className="my-4">
            <label className="auth-label">Full Name*</label>
            <input
              className="auth-input h-12"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="my-4">
            <label className="auth-label">Email*</label>
            <input
              className="auth-input h-12"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* DOB + PHONE */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <div>
              <label className="auth-label">Date of Birth*</label>
              <input
                type="date"
                className="auth-input h-12"
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>

            <div>
              <label className="auth-label">Phone*</label>
              <input
                className="auth-input h-12"
                placeholder="0123456789"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="my-4">
            <label className="auth-label">Address</label>
            <input
              className="auth-input h-12"
              placeholder="Your address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="my-4">
            <label className="auth-label">Password*</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className={`auth-input h-12 pr-10 ${
                  passwordError ? "border-red-500" : ""
                }`}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* CONFIRM */}
          <div className="my-4">
            <label className="auth-label">Confirm Password*</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className={`auth-input h-12 pr-10 ${
                  confirmError ? "border-red-500" : ""
                }`}
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />

              <div
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {confirmError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmError}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Sign up
          </button>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-1 mb-10">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-md text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignupScreen;