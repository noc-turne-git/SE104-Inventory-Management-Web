import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <ShieldCheck className="text-blue-600" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Verify Identity</h2>

        <p className="text-gray-500 text-sm mb-6">
          Enter the 6-digit code
        </p>

        {/* OTP */}
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((d, i) => (
            <input
              key={i}
              maxLength={1}
              className="w-10 h-12 text-center border border-gray-200 rounded-xl 
              focus:ring-2 focus:ring-blue-500 outline-none"
              value={d}
              onChange={(e) => handleChange(e.target.value, i)}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/reset-password")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 
          text-white py-2.5 rounded-xl"
        >
          Verify Account
        </button>

        <p className="text-sm mt-4 text-gray-500">
          Didn’t receive code?{" "}
          <span className="text-blue-600 cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;