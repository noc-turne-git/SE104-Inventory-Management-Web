import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  success?: boolean;
}

const VerifyResult = ({ success = true }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">

        {/* ICON */}
        <div className="mb-4 flex justify-center">
          {success ? (
            <CheckCircle className="text-green-500" size={40} />
          ) : (
            <XCircle className="text-red-500" size={40} />
          )}
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-2">
          {success ? "Verified successfully" : "Verification failed"}
        </h2>

        {/* DESC */}
        <p className="text-gray-500 text-sm mb-6">
          {success
            ? "Your account has been authenticated successfully."
            : "We couldn't verify your request. Please try again."}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 
          text-white py-2.5 rounded-xl hover:opacity-90 transition"
        >
          {success ? "Go to Dashboard →" : "Try Again"}
        </button>

        {!success && (
          <p className="text-sm mt-4 text-blue-600 cursor-pointer">
            Contact Support
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyResult;