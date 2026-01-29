import React from "react";
import { useForm } from "react-hook-form";
import Customeinput from "../components/Customeinput";
import CustomeSelect from "../components/CustomeSelect";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const Backend_uri = import.meta.env.VITE_BACKEND_URI;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { department: "", username: "", password: "", org_id: "" },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = { ...data, role: "employee" };
    try {
      const Registration = await axios.post(
        `${Backend_uri}auth/register`,
        userData,
      );
      console.log(Registration);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md bg-[#2F2F2F] p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#ECECEC] mb-6 md:mb-8">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Customeinput
            {...register("username", { required: "Username is required" })}
            label="Username"
            type="text"
            placeholder="Choose a username"
            error={errors.username}
          />

          <Customeinput
            {...register("password", { required: "Password is required" })}
            label="Password"
            type="password"
            placeholder="Choose a password"
            error={errors.password}
          />

          <CustomeSelect
            {...register("department", { required: "Department is required" })}
            label="Department"
            error={errors.department}
            placeholder="Select Department"
            dept={[
              "Select Department",
              "IT",
              "HR",
              "Sales",
              "Design",
              "Marketing",
            ]}
            defaultValue=""
          />

          <Customeinput
            {...register("org_id", { required: "Organization ID is required" })}
            label="Organization ID"
            type="text"
            placeholder="Enter Organization ID"
            error={errors.org_id}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#FFFFFF] hover:bg-gray-200 text-black font-semibold rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#ECECEC] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
