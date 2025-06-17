import React, { useState } from "react";
import { useSignupMutation } from "../../redux/features/auth/AuthSlice";
import Input from "../../helpers/Input";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/Profile/ProfileSlice";

export default function Signup() {
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      const res = await signup({
        full_name: fullName,
        email,
        password,
      }).unwrap();

      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("user_email", res.profile_data.user);

      dispatch(setProfile(res.profile_data));

      navigate("/verify-mail", {
        state: { from: "signup" },
      });
    } catch (err) {
      const backendError =
        err?.data?.message || "Signup failed. Please try again later.";
      setFormError(backendError);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbed] flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-64 lg:h-screen">
        <img
          src="/signup.png"
          alt="Sign up"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center">
            <img src="/icons/formLogo.svg" alt="Logo" className="h-24" />
          </div>

          <h2 className="text-center text-2xl font-semibold text-green-800">
            REGISTER NOW!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="@#*%"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="@#*%"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {/* ✅ Error Messages */}
            {(formError || error?.data?.message) && (
              <div className="text-red-600 text-sm">
                {formError || error?.data?.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition hover:cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="flex items-center w-full my-4">
            <hr className="flex-1 border-[#94B316]" />
            <span className="mx-2 text-[#94B316]">OR</span>
            <hr className="flex-1 border-[#94B316]" />
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full py-2 border border-[#94B316] rounded-full hover:bg-[#eaf1cc] transition gap-3 hover:cursor-pointer"
          >
            <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
            <span className="text-[#53640F]">Continue with Google</span>
          </button>

          <p className="text-sm text-center text-[#53640F]">
            Already have an account?{" "}
            <a href="/login" className="text-[#748b15] hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
