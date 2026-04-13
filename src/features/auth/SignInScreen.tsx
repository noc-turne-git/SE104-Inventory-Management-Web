import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import bgImage from "../../assets/stockify.png";
import { useAuth } from "../../context/AuthContext";
import { MOCK_USERS } from "../../data/MOCK_USER";

import './auth.css';

const SignInScreen = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSignIn = (e : any) => {
    if (e) e.preventDefault(); // ngăn refresh lại vì dùng thẻ form 

    const userData = MOCK_USERS.find(u => u.email === form.email);
    if(userData) {
      login(userData);
    } else {
      setError('Invalid password or email. Please try again')
    }
  }

  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 relative items-center text-white">
        <img
          src={bgImage}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-700/60 to-transparent"></div>

        <div className="relative z-10 px-16 text-left">
          <h1 className="text-8xl font-bold mb-4">Stockify</h1>
          <p className="text-xl text-gray-100 max-w-md mb-10">
            Elevate your warehouse operations. Manage inventory, staff and logistics efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100 min-h-screen px-6">

        <form className="w-full max-w-md">

          {/* TITLE */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-gray-500 text-md mt-1">Welcome back to Stockify</p>
          </div>

          <div className="items-start">
            <span className="text-red-500 text-sm">
              {error}
            </span>
          </div>

          {/* EMAIL */}
          <div className="">
            <label className="auth-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="auth-input w-full h-12"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-4 mb-1">
            <label className="authl-label">Password</label>

            <div className="relative ">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="auth-input h-12 pr-10 bg-white"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* FORGOT */}
          <div className="text-right mb-6">
            <span 
              onClick={() => navigate("/forgotpassword")}
              className="text-md font-semibold text-blue-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl hover:bg-blue-700 transition"
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </button>

          {/* SIGNUP */}
          <p className="text-center text-lg text-gray-500 mt-5">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
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