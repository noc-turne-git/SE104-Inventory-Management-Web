import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Mail className="text-blue-600" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Forgot Password</h2>

        <p className="text-gray-500 text-sm mb-6">
          Enter your email to receive OTP
        </p>

        <input
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl 
          focus:ring-2 focus:ring-blue-500 outline-none mb-5"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={() => navigate("/verify-otp")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 
          text-white py-2.5 rounded-xl hover:opacity-90 transition"
        >
          Send Reset Code
        </button>

        <p
          className="text-sm mt-4 text-gray-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ← Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;