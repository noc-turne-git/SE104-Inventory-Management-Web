import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import bgImage from "../../assets/stockify.png";

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

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSignUp = () => {
    navigate('/signin', {replace : false});
  }

  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center text-white">

        <img
          src={bgImage}
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-blue-900/50 via-blue-700/60 to-transparent"></div>

        <div className="relative z-10 px-16 text-left">
          <h1 className="text-6xl font-bold mb-4">Stockify</h1>
          <p className="text-lg text-gray-200 max-w-md">
            Elevate your warehouse operations. Manage inventory, staff and logistics efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 min-h-screen px-4 pt-10 pb-10">

        <form className="w-full max-w-md px-6">

          {/* TITLE */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-500 mt-1 text-base">
              Join Stockify system
            </p>
          </div>

          {/* FULL NAME */}
          <div className="my-4">
            <label className="modal-label">Full Name*</label>
            <input
              className="modal-input"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="my-4">
            <label className="modal-label">Email*</label>
            <input
              className="modal-input"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* DOB + PHONE */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <div>
              <label className="modal-label">Date of Birth*</label>
              <input
                type="date"
                className="modal-input"
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>

            <div>
              <label className="modal-label">Phone*</label>
              <input
                className="modal-input"
                placeholder="0123456789"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="my-4">
            <label className="modal-label">Address</label>
            <input
              className="modal-input"
              placeholder="Your address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* ROLE */}
          {/* <div className="my-4">
            <label className="modal-label">Role*</label>
            <select
              className="modal-input"
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="">Select role</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div> */}

          {/* PASSWORD */}
          <div className="my-4 relative">
            <label className="modal-label">Password*</label>
            <input
              type={showPass ? "text" : "password"}
              className="modal-input pr-10"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* CONFIRM */}
          <div className="my-4 relative">
            <label className="modal-label">Confirm Password*</label>
            <input
              type={showConfirm ? "text" : "password"}
              className="modal-input pr-10"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            <div
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            onClick={() => handleSignUp()}>
            Sign up
          </button>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate('/signin', {replace : false})}
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