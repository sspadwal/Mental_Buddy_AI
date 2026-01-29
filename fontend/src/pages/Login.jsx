import React, { useState } from "react"; // Added useState
import { useForm } from "react-hook-form";
import axios from "axios";
import Customeinput from "../components/Customeinput";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { Login: authLogin } = useAuth();
  const [apiError, setApiError] = useState(""); // State to store backend errors
  const Backend_uri = import.meta.env.VITE_BACKEND_URI;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setApiError(""); // Clear previous errors on new attempt
      const userLoginResponse = await axios.post(
        `${Backend_uri}auth/login`,
        data,
      );
      console.log(userLoginResponse);
      authLogin(userLoginResponse.data.message, userLoginResponse.data.user);

      const role = userLoginResponse.data.user.role;
      if (role === "employee") {
        navigate("/");
      } else {
        navigate("/manager/dashboard");
      }
    } catch (error) {
      // Extract the message "Invalid Credentials!" from the backend response
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setApiError(errorMessage);
      console.log("Login Error:", errorMessage);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md bg-[#2F2F2F] p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#ECECEC] mb-6 md:mb-8">
          Welcome back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Display API Error Message */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center animate-in fade-in zoom-in duration-300">
              {apiError}
            </div>
          )}

          <Customeinput
            {...register("username", { required: "Username is required" })}
            label="Username"
            type="text"
            placeholder="Enter your username"
            error={errors.username}
          />

          <Customeinput
            {...register("password", { required: "Password is required" })}
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#FFFFFF] hover:bg-gray-200 text-black font-semibold rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#ECECEC] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
