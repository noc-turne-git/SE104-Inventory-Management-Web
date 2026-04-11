import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    navigate("/verify-success");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Lock className="text-blue-600" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-6">
          Reset Password
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl pr-10
            focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShow(!show)}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl pr-10
            focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 
          text-white py-2.5 rounded-xl hover:opacity-90 transition"
        >
          Change Password →
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;