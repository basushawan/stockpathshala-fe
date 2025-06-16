import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUser } from "../utils/storage";
import axios from "axios";
import loginBg from "../assets/login_bg.webp";

const Login = () => {
  const [userName, setUserName] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = getUser();
    if (user) {
      navigate("/profile");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree || !userName) return;
    setLoading(true);

    try {
      const res = await axios.post(
        "https://internal.stockpathshala.in/api/v1/login-register",
        {
          user_name: userName,
          hash_code: "96pYMmXfHNR",
        }
      );

      const data = res.data;
      if (data?.status) {
        Swal.fire({
          icon: "success",
          iconColor: "green",
          color: "green",
          background: "lime",
          title: data.message || "OTP sent successfully!",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/verify", { state: { user_name: userName } });
      } else {
        Swal.fire({
          icon: "error",
          title: data.message || "Failed to send OTP",
          iconColor: "violet",
          color: "violet",
          background: "purple",
          toast: true,
          position: "top-end",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        iconColor: "violet",
        color: "violet",
        background: "purple",
        title: "Something went wrong.",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col p-5 md:flex-row h-[calc(100vh-64px)] md:h-[calc(100vh-64px)]">
      {/* Left side image  */}
      <div className="flex w-full md:w-1/2">
        <img
          src={loginBg}
          alt="Login Visual"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-5">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
          <h1 className="text-xl font-bold text-center text-violet-700">
            India's No. 1
            <span className="text-violet-900 px-0 md:px-2 block md:inline">
              Stock Market Learning App
            </span>
          </h1>

          {/* brush stroke subtitle */}
          <div className="relative text-center text-gray-700 font-medium">
            <div className="absolute top-1/2 left-0 w-1/4 h-[2px] bg-violet-900 opacity-30 -translate-y-1/2" />
            <span className="relative z-10 text-violet-700">
              Log in or sign up
            </span>
            <div className="absolute top-1/2 right-0 w-1/4 h-[2px] bg-violet-900 opacity-30 -translate-y-1/2" />
          </div>

          {/* Input */}
          <div className="w-full flex items-center border border-violet-900 rounded-md overflow-hidden">
            <span className="px-3 text-violet-900 text-sm select-none bg-gray-100">
              +91
            </span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="user_name"
              maxLength={10}
              autoComplete="off"
              autoCorrect="off"
              autoFocus="true"
              spellCheck="false"
              required
              placeholder="Enter 10-digit mobile number"
              value={userName}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                setUserName(onlyNums);
              }}
              className="w-full px-4 py-3 text-sm text-violet-900 placeholder:text-violet-900 placeholder:text-sm focus:outline-none"
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="form-checkbox accent-violet-700 cursor-pointer"
              required
            />
            <span className="text-violet-700 cursor-pointer">
              By signing in, you accept the
              <a href="/privacy" className="text-violet-900 px-1 font-semibold">
                Privacy Policy
              </a>
              of the app.
            </span>
          </label>

          {/* Continue button */}
          <button
            type="submit"
            disabled={!agree || userName.length !== 10 || loading}
            className={`w-full rounded-md py-3 font-medium text-white ${
              agree && userName.length === 10 && !loading
                ? "bg-violet-700 hover:bg-violet-900 cursor-pointer"
                : "bg-violet-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
