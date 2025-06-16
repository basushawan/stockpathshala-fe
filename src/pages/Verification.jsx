import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setUser } from "../utils/storage";
import axios from "axios";
import optBg from "../assets/verification_bg.webp";

const Verification = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userName = state?.user_name || "";

  const [otp, setOtp] = React.useState(["", "", "", ""]);
  const [loading, setLoading] = React.useState(false);
  const [timer, setTimer] = React.useState(30);
  const timerRef = React.useRef(30);
  const intervalRef = React.useRef();
  const inputRef = React.useRef([]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    timerRef.current = 30;
    setTimer(30);

    intervalRef.current = setInterval(() => {
      if (timerRef.current <= 1) {
        clearInterval(intervalRef.current);
        timerRef.current = 0;
        setTimer(0);
      } else {
        timerRef.current -= 1;
        setTimer(timerRef.current);
      }
    }, 1000);
  };

  React.useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  React.useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRef.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleVerify = async (code) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://internal.stockpathshala.in/api/v1/verify-login-register",
        {
          user_name: userName,
          otp: code,
        }
      );
      const data = res.data;
      if (data.status) {
        Swal.fire({
          icon: "success",
          iconColor: "green",
          color: "green",
          background: "lime",
          title: data.message,
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            title: "text-violet-700",
            icon: "text-violet-900",
          },
        });
        setUser(userName);
        navigate("/classes");
      } else {
        Swal.fire({
          icon: "error",
          iconColor: "violet",
          color: "violet",
          background: "purple",
          title: data.message,
          toast: true,
          position: "top-end",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
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
        customClass: {
          title: "text-violet-700",
          icon: "text-violet-900",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://internal.stockpathshala.in/api/v1/login-register", //using fetch here to show difference between axios and fetch
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: userName,
            hash_code: "96pYMmXfHNR",
          }),
        }
      );
      const data = await res.json();
      if (data.status) {
        Swal.fire({
          icon: "success",
          iconColor: "green",
          color: "green",
          background: "lime",
          title: "OTP resent successfully",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });

        //Clear OTP & focus first input
        setOtp(["", "", "", ""]);
        setTimeout(() => {
          inputRef.current[0]?.focus();
        }, 100);

        startTimer();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.message || "Resend failed",
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
          src={optBg}
          alt="Verification"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* Right side OTP */}
      <div className="flex flex-col flex-1 justify-center text-center px-6 py-8 md:px-20">
        <p className="text-sm text-violet-700 mb-1">
          Please enter the 4 digits code that you received on your mobile.
        </p>
        <p className="text-violet-900 font-semibold mb-4">+91 {userName}</p>
        <div className="flex gap-4 mb-4 items-center justify-center">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              ref={(el) => (inputRef.current[i] = el)}
              className="w-12 h-12 text-center border border-violet-900 rounded-md text-lg text-violet-900 focus:outline-none"
            />
          ))}
        </div>
        {timer > 0 ? (
          <p className="text-sm text-violet-700 mb-6">
            Resend in {`00:${timer < 10 ? `0${timer}` : timer}`}
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm text-violet-700 cursor-pointer mb-6 uppercase hover:text-violet-900"
          >
            Resend Code
          </button>
        )}
        <button
          onClick={() => handleVerify(otp.join(""))}
          disabled={otp.some((d) => d.trim() === "") || loading}
          className={`w-full rounded-md py-3 font-medium text-white ${
            otp.every((d) => d.trim() !== "") && !loading
              ? "bg-violet-700 hover:bg-violet-900 cursor-pointer"
              : "bg-violet-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Verifying..." : "Verify & Proceed"}
        </button>
      </div>
    </div>
  );
};

export default Verification;
