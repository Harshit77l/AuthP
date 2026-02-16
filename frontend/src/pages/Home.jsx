import React from "react";
import { AppData } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();

  /*
  // ORIGINAL RETURN - COMMENTED OUT FOR SAFETY
  return (
    <div className="flex w-[100px] m-auto mt-40">
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={() => logoutUser(navigate)}
      >
        Logout
      </button>

      {user && user.role === "admin" && (
        <Link
          to="/dashboard"
          className="bg-purple-500 text-white p-2 rounded-md"
        >
          Dashboard
        </Link>
      )}
    </div>
  );
  */

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8 text-center">

        <div className="space-y-4">
          <div className="inline-block p-4 rounded-full bg-indigo-500/10 mb-4 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <svg className="w-16 h-16 text-indigo-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.59-4.18M5.55 17.55l-1 -1"></path></svg>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            SecureAuth System
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            You have successfully authenticated into the secure zone. Your session is currently active and monitored by Redis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">

          {/* User Profile Card */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all group text-left">
            <h3 className="text-lg font-semibold text-white mb-2">User Profile</h3>
            <div className="space-y-2 mb-6">
              <p className="text-slate-400 text-sm">Name: <span className="text-slate-200">{user?.name}</span></p>
              <p className="text-slate-400 text-sm">Role: <span className="text-slate-200">{user?.role}</span></p>
            </div>
            {user && user.role === "admin" && (
              <Link to="/dashboard" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                Access Admin Dashboard <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            )}
          </div>

          {/* Session Action Card */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-red-500/50 transition-all group text-left">
            <h3 className="text-lg font-semibold text-white mb-2">Session Control</h3>
            <p className="text-slate-400 text-sm mb-6">
              Securely terminate your session across all devices. This will revoke your refresh token in Redis.
            </p>
            <button
              onClick={() => logoutUser(navigate)}
              className="w-full py-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              Terminate Session
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex justify-center gap-8 text-slate-500 text-xs font-mono">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> System Operational
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Encrypted Connection
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
