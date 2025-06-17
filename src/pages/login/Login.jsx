import React, { useState } from "react";
import Input from "../../helpers/Input";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/Profile/ProfileSlice";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      // ✅ Store tokens and user email
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("user_email", res.profile_data?.user || email);
      // redux state abdullah profile
      dispatch(setProfile(res.profile_data));
      // ✅ Redirect after login
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const serverError =
        err?.data?.message || "Login failed. Please check your credentials.";
      setErrorMsg(serverError);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center bg-[#f8fbed]">
      <div className="w-full lg:w-1/2 h-64 lg:h-screen">
        <img
          src="/login.png"
          className="w-full h-full object-cover"
          alt="Login"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10 items-center">
        <div className="flex justify-center mb-4">
          <img src="/icons/formLogo.svg" alt="Logo" className="h-20" />
        </div>

        <h2 className="text-2xl text-center font-semibold text-green-800 mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
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

          <div className="w-full flex justify-end">
            <Link className="text-[#94B316] underline" to={`/forgot-password`}>
              Forgot password
            </Link>
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 font-semibold rounded-full transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#94B316] hover:bg-[#94b316e7] text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center w-full my-4">
          <hr className="flex-1 border-[#94B316]" />
          <span className="mx-2 text-[#94B316]">OR</span>
          <hr className="flex-1 border-[#94B316]" />
        </div>

        <button
          type="button"
          onClick={() => console.log("Google login clicked")}
          className="flex items-center justify-center py-2 px-10 hover:cursor-pointer border border-[#94B316] rounded-full hover:bg-[#eaf1cc] transition gap-3"
        >
          <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
          <span className="text-[#53640F]">Continue with Google</span>
        </button>

        <p className="mt-4 text-sm text-center text-[#53640F]">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#748b15] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
