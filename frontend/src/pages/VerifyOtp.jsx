import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-toastify";
import { AppData } from "../context/AppContext";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth, setUser } = AppData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post(
        `${server}/api/v1/verify-otp`,
        { email, otp },
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      localStorage.clear("email");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Two-Factor Verification
          </h2>
          <p className="text-sm text-slate-400">
            Enter the OTP sent to your email
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={submitHandler}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="otp" className="text-sm font-medium text-slate-300 block mb-1">
                One-Time Password
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-white placeholder-slate-500 tracking-widest text-center text-lg font-mono"
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val || /^\d+$/.test(val)) setOtp(val);
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="group relative z-20 w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95"
          >
            {btnLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : "Verify OTP"}
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors text-sm">
              Back to Login
            </Link>
          </div>
        </form>

        {/* LOGIC VISUALIZATION BADGE */}
        <div className="mt-8 pt-6 border-t border-white/5 relative z-0">
          <div className="font-mono text-xs text-slate-500 flex justify-between items-center group cursor-help relative">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse"></span>
              Awaiting Verification
            </span>
            <div className="flex gap-3">
              <span title="OTP expires in 5 minutes (Redis TTL)" className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                ⏳ TTL: 5m
              </span>
            </div>
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-black/90 text-slate-300 text-[10px] rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <p>Backend protections are active:</p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>Redis TTL (Auto-Expiration)</li>
                <li>Rate Limited (Brute-Force Safe)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
