import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {/* WRAPPER */}
      <div className="w-full max-w-lg">

        {/* LOGO */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            📦
          </div>
          <p className="text-xs tracking-widest text-gray-500">STOCKIFY</p>
        </div>

        {/* CARD */}
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">

          {/* TITLE */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Enter your registered email address below. We'll send you a 6-digit verification code to reset your access.
            </p>
          </div>

          {/* INPUT */} 
          <div className="my-5">
            <label className="modal-label">
              Email Address
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />

              <input
                type="email"
                placeholder="name@company.com"
                className="w-full h-12 outline-none text-gray-700 bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/verifyotp")}
            className="w-full py-3 rounded-xl text-white font-semibold text-lg
            bg-blue-600 hover:bg-blue-700 transition"
          >
            Send Reset Code
          </button>

          {/* BACK */}
          <div className="text-center mt-6">
            <span
              onClick={() => navigate("/signin")}
              className="inline-flex items-center gap-2 text-blue-600 text-sm cursor-pointer hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Login
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordScreen;