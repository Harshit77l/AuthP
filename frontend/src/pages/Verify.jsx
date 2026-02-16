import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../main";
import Loding from "../Loding";

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();

  const [loading, setLoading] = useState(true);

  async function verifyUser() {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/verify/${params.token}`
      );

      console.log(data);

      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);
  /*
  // ORIGINAL RETURN - COMMENTED OUT FOR SAFETY
  return (
    <>
      {loading ? (
        <Loding />
      ) : (
        <div className="w-[200px] m-auto mt-12">
          {successMessage && (
            <p className="text-green-500 text-2xl">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-2xl">{errorMessage}</p>
          )}
        </div>
      )}
    </>
  );
  */

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      {loading ? (
        <Loding />
      ) : (
        <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 text-center">
          {successMessage ? (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Verified!</h2>
              <p className="text-slate-300">{successMessage}</p>
              <a href="/login" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/30">
                Proceed to Login
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
              <p className="text-red-400">{errorMessage}</p>
              <a href="/register" className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors">
                Try Registering Again
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
