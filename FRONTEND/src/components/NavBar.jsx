import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/auth.slice.js";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { useState,useRef,useEffect } from "react";
import { FiUser } from "react-icons/fi";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react"

const NavBar = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profilePanel, setProfilePanel] = useState(false)
  const profilePanelRef = useRef(null)

  const handleLogout = async () => {
    await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/auth/logout",
      {},
      { withCredentials: true }
    );
    dispatch(logout());
    navigate({ to: "/" });
  };

  

 useGSAP(() => {
  if (profilePanel) {
    // Slide in
    gsap.to(profilePanelRef.current, {
      right: "0%",
      duration: 0.3,
      ease: "power2.out",
    });
  } else {
    // Slide out
    gsap.to(profilePanelRef.current, {
      right: "-100%",
      duration: 0.3,
      ease: "power2.in",
    });
  }
}, [profilePanel]);

  

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            PopLynk
          </div>

          {/* Navigation */}
          {authSlice.isAuthenticated ? (
            <div className="flex gap-6 items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
                activeProps={{ className: "text-indigo-600 font-medium" }}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
                activeProps={{ className: "text-indigo-600 font-medium" }}
              >
                Analytics
              </Link>
            <button onClick={()=>setProfilePanel(!profilePanel)} className="px-4 py-2 bg-gray-200 text-black rounded-xl font-medium shadow hover:bg-gray-300 transition-all relative">
              <FiUser/>
            </button>
            <div ref={profilePanelRef} className="absolute  rounded-b-2xl flex flex-col gap-4 top-14 p-5 right-[-100%] bg-white">
              <button
                className="px-4 py-2 text-black rounded-xl font-medium  hover:text-red-600 transition-all"
              >
                Edit Profile
              </button>
              <button
                className="px-4 py-2 text-black rounded-xl font-medium  hover:text-red-600 transition-all"
                onClick={() => setDialogOpen(true)}
              >
                Logout
              </button>
              </div> 
              
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow hover:bg-indigo-700 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Global confirm dialog */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={() => {
          handleLogout();
          setDialogOpen(false);
        }}
        onCancel={() => setDialogOpen(false)}
      />
    </>
  );
};

export default NavBar;
