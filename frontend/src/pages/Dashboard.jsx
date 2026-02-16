import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../main";
import api from "../apiIntercepter";
import { AppData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logoutUser } = AppData();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function fetchAdminData() {
    try {
      const { data } = await api.get(`/api/v1/admin`, {
        withCredentials: true,
      });

      setContent(data.message);
    } catch (error) {
      // toast.error(error.response.data.message); 
      // specific error handling if not admin, maybe just hide content
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  /*
  // ORIGINAL RETURN - COMMENTED OUT FOR SAFETY  
  return <>{content && <div>{content}</div>}</>;
  */

  return (
    <div className="min-h-screen bg-transparent text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <div>
            <h1 className="text-3xl font-bold">Secure Dashboard</h1>
            <p className="text-slate-400">Welcome back, <span className="text-indigo-400 font-semibold">{user?.name}</span></p>
          </div>
          <button
            onClick={() => logoutUser(navigate)}
            className="px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            Main Logout
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 1. Identity Card */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold">Identity</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">User ID</span>
                <span className="font-mono text-slate-200">{user?._id?.slice(-6) || "..."}***</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Email</span>
                <span className="text-slate-200">{user?.email}</span>
              </div>
              <div className="flex justify-between text-sm pt-1">
                <span className="text-slate-400">Role</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${user?.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-600/30 text-slate-300'}`}>
                  {user?.role?.toUpperCase() || "USER"}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Session Inspector (Logic Demo) */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-4 relative overflow-hidden group">
            {/* Visual flair for 'active' */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-emerald-500/20"></div>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold">Session Inspector</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Type</span>
                <span className="font-mono text-slate-200">Stateful (Redis)</span>
              </div>
              <div className="flex justify-between text-sm pt-1">
                <span className="text-slate-400">Token</span>
                <span className="font-mono text-xs text-slate-500">HttpOnly Cookie (Hidden)</span>
              </div>
            </div>
          </div>

          {/* 3. Security Status */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-black/20 p-2 rounded border border-white/5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider">MFA</div>
                <div className="text-emerald-400 font-bold">Verified</div>
              </div>
              <div className="bg-black/20 p-2 rounded border border-white/5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider">Rate Limit</div>
                <div className="text-indigo-400 font-bold">Standard</div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Section (Only if content exists) */}
        {content && (
          <div className="mt-8 bg-purple-900/10 border border-purple-500/20 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-400 mb-2">Admin Restricted Area</h3>
            <p className="text-purple-200">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
