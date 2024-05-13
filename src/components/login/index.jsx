import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin =async (e) =>{
    e.preventDefault();
    try {
    await signInWithEmailAndPassword(auth,email,password);
      navigate('/home');
    } catch (error) {
        console.error("Registration Error:", error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  }

  return (
    <div className="antialiased bg-gray-200 text-gray-900">
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Login
          </span>
          <form className="mb-4" onSubmit={handleLogin}>
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">
                Email
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 md:w-full">
              <label className="block text-xs mb-1">
                Password
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
              Login
            </button>
          </form>
          <span className="text-blue-700 text-center text-sm">
            <Link to={"/register"}>If you don't have an account?</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
