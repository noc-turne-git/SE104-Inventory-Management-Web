import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MOCK_ACCOUNTS } from "../../data/MOCK_ACCOUNT";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // validate
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const user = MOCK_ACCOUNTS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    // clear error
    setError("");

    // điều hướng theo role
    if (user.role === "manager") {
      navigate("/app/products", { replace: true });
    } else {
      navigate("/app/products_view", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-600 to-blue-400 text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Stockify</h1>
        <p className="text-lg opacity-90">
          Elevate your warehouse operations. Manage inventory,
          staff and logistics efficiently.
        </p>

        <div className="mt-10 flex gap-10">
          <div>
            <p className="text-2xl font-bold">2.5k+</p>
            <span className="text-sm opacity-80">Warehouses</span>
          </div>
          <div>
            <p className="text-2xl font-bold">99.9%</p>
            <span className="text-sm opacity-80">Uptime</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-gray-200">

          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-500 mb-6">
            Welcome back to Stockify
          </p>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {/* EMAIL */}
          <input
            className="w-full mb-4 px-4 py-2.5 border border-gray-200 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* ICON */}
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-4">
            <span
              className="text-sm text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl 
            hover:bg-blue-700 transition disabled:opacity-50"
          >
            Sign In
          </button>

          {/* SIGN UP */}
          <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignIn;