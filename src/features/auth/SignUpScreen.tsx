import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.role
    ) {
      setError("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-600 to-blue-400 text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Stockify</h1>
        <p className="text-lg opacity-90">
          Manage your warehouse smarter with Stockify.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-gray-100">

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6">
            Join Stockify system
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <div className="space-y-4">

            {/* FULL NAME */}
            <input
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl 
              bg-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition duration-200"
              placeholder="Full Name"
              onChange={(e) => handleChange("fullName", e.target.value)}
            />

            {/* EMAIL */}
            <input
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl 
              bg-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition duration-200"
              placeholder="Email"
              onChange={(e) => handleChange("email", e.target.value)}
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl 
                bg-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition duration-200 pr-10"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 
                cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl 
                bg-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition duration-200 pr-10"
                placeholder="Confirm Password"
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 
                cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* SELECT ROLE */}
            <div className="relative">
              <select
                className="w-full px-4 pr-10 py-2.5 border border-gray-200 rounded-xl 
                bg-white text-gray-500
                appearance-none
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition duration-200"
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <option value="" disabled selected hidden>
                  Select Role
                </option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 pointer-events-none"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSignUp}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl 
              hover:bg-blue-700 active:scale-[0.98]
              transition duration-150"
            >
              Create Account
            </button>
          </div>

          {/* BACK TO LOGIN */}
          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;