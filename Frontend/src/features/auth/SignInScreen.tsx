import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/stockify.png";
import lgImage from "../../assets/logostockify.png";
import { useAuth } from "../../context/AuthContext";
import authApi from "../../api/AuthAPI";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import "./auth.css";

const SignInScreen = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [showPass, setShowPass] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await authApi.signIn(form);

      signin(response.data.user);
      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);
    } catch (err: unknown) {
      if (!isAxiosError(err)) {
        toast.error("Something went wrong. Please try again.");
        console.error("Sign-in logic error:", err);
        return;
      }

      if (!err.response) {
        toast.error("Unable to connect to the server. Please check your network connection.");
        return;
      }

      const status = err.response.status;

      switch (status) {
        case 401:
          toast.error("Email or password is incorrect.");
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
            <h1 className="text-7xl font-bold mb-4">Stockify</h1>
          </div>

          {/* SUBTEXT */}
          <p className="text-lg text-gray-200 max-w-md">
            Elevate your warehouse operations. Manage inventory, staff and logistics efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full lg:w-1/2 lg:ml-auto items-center justify-center bg-gray-50 min-h-screen px-6 py-10">
        <form className="w-full max-w-md" onSubmit={handleSignIn}>
          {/* TITLE */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-gray-500 text-md mt-1">Welcome back to Stockify</p>
          </div>

          {/* EMAIL */}
          <div className="my-4">
            <label className="auth-label">Email*</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="auth-input h-12"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-4">
            <label className="auth-label">Password*</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                className="auth-input auth-input-with-toggle h-12"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* FORGOT */}
          <div className="text-right mt-2">
            <span
              onClick={() => navigate("/forgotpassword")}
              className="text-sm font-semibold text-blue-500 cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-md text-blue-500 font-semibold cursor-pointer hover:underline"
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
