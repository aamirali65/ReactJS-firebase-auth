import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../service/firebase";
import { toast } from "react-toastify";
import {setDoc,doc} from "firebase/firestore"

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confpassword, setConfpassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password === Confpassword) {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        toast.success("User created successfully", {
          position: "top-center",
        });
        if (user) {
            await setDoc(doc(db,"Users",user.uid),{
                Username: username,
                Email:user.email
            })
          navigate("/login");
        }
      } else {
        console.log("match");
        toast.error("Password and confirm password doesn't match", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="antialiased bg-gray-200 text-gray-900">
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Register
          </span>
          <form className="mb-4" onSubmit={handleRegister}>
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">Username</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="text"
                id="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">Email</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 md:w-full">
              <label className="block text-xs mb-1">Password</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6 md:w-full">
              <label className="block text-xs mb-1">Confirm Password</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="Confpassword"
                placeholder="Confirm Password"
                value={Confpassword}
                onChange={(e) => setConfpassword(e.target.value)}
              />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
              Register
            </button>
          </form>
          <span className="text-blue-700 text-center text-sm">
            <Link to={"/login"}>already have an account?</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
