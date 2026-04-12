import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    // validate
    if (!form.password || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate("/signin");
    }, 2000); // đổi thành công chuyển trang sau 2s
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

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
              Reset Password
            </h2>
            <p className="text-gray-500 text-sm">
              Enter your new password below
            </p>
          </div>

          {/* PASSWORD */}
          <div className="my-5">
            <label className="modal-label">New Password</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter new password"
                className="modal-input h-12 pr-10"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* CONFIRM */}
          <div className="my-5">
            <label className="modal-label">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="modal-input h-12 pr-10"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <div
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl text-white font-semibold text-lg
            bg-blue-600 hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
          {success && (
            <p className="text-green-600 text-sm text-center mt-4">
              Password reset successfully! Redirecting...
            </p>
          )}

          {/* BACK */}
          <div className="text-center mt-6">
            <span
              onClick={() => navigate("/signin")}
              className="inline-flex items-center gap-2 text-blue-600 text-sm cursor-pointer hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Sign in
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;