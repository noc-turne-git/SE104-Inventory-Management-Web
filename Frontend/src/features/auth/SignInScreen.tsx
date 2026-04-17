import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/stockify.png";
import lgImage from "../../assets/logostockify.png";
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
    console.log(userData?.email);                                                                                                                                                                                                                                                         
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
      <div className="hidden lg:flex w-1/2 sticky top-0 h-screen items-center text-white">
        {/* BACKGROUND */}
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

      {/* RIGHT */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 min-h-screen px-6">

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
              placeholder="john@example.com"
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
                placeholder=""
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
              className="text-md font-semibold text-blue-500 cursor-pointer hover:underline"
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
          <p className="text-center text-sm text-gray-500 mt-1">
            Don’t have an account?{" "}
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