import { useState, useRef } from "react";
import { useNavigate } from "react-router";

const VerifyOtpScreen = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

      <div className="w-full max-w-xl">

        {/* LOGO */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            📦
          </div>
          <p className="text-sm tracking-widest text-gray-500">STOCKIFY</p>
        </div>

        {/* CARD */}
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">

          {/* TITLE */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Verify Code
            </h2>
            <p className="text-gray-500 text-sm">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* OTP INPUT */}
          <div className="flex justify-between gap-3 my-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-14 h-16 text-center text-xl font-semibold 
                border border-gray-300 rounded-lg 
                focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/resetpassword")}
            className="w-full py-3 rounded-xl text-white font-semibold text-lg
            bg-blue-600 hover:bg-blue-700 transition"
          >
            Verify
          </button>

          {/* RESEND */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Didn’t receive code?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Resend
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerifyOtpScreen;