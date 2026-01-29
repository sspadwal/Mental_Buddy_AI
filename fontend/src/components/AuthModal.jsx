import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const AuthModal = ({ showAuthModal, onClose }) => {
  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-[#2F2F2F] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#424242] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8 flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#ECECEC] mb-2">
            Get started
          </h2>
          <p className="text-gray-400 mb-6 md:mb-8 text-xs md:text-sm leading-relaxed">
            Log in or sign up to save your history and get personalized mental
            health support.
          </p>

          <div className="w-full space-y-3">
            <Link
              to="/login"
              className="block w-full py-2.5 px-4 bg-[#FFFFFF] hover:bg-gray-200 text-black font-semibold rounded-lg transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="block w-full py-2.5 px-4 bg-[#424242] hover:bg-[#525252] text-white font-semibold rounded-lg transition-colors border border-[#525252]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
