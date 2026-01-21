import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FiCheckSquare, FiUser } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BASE_URL

console.log(BACKEND_URL)

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { refreshAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post(`${BACKEND_URL}/auth/signup`, { email, password, userName });
      await refreshAuth();
      navigate("/dashboard");
    } catch (_err) {
      setError("Registration failed. Try a different email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="h-24 bg-blue-600 w-full absolute top-0 left-0 z-0"></div>

        <div className="relative z-10 px-8 pb-8 pt-12">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-3 rounded-xl shadow-md">
              <FiCheckSquare className="text-blue-600 text-4xl" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account
          </h2>
          <h4 className="text-gray-500 text-center mb-8 font-medium">
            Join Smart Task Manager today
          </h4>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm py-2 px-4 rounded-lg text-center border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Register
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-3">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="inline-block w-full py-2.5 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}