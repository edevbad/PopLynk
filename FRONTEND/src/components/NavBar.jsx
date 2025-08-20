import { Link,useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/auth.slice.js";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { useState } from "react";

const NavBar = () => {
  const [isDialogOpen,setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(
      import.meta.env.VITE_BACKEND_URL+"/auth/logout",
      {},
      { withCredentials: true }
    );
    dispatch(logout());
    navigate({to : "/"})
  };

  return (
    <>
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-blue-600">PopLynk</div>
        {authSlice.isAuthenticated ? (<div className="flex gap-6 items-center">
          <Link to="/" activeProps={{className: 'text-blue-600'}}>Home</Link>
          {/* <p className="text-gray-700">Welcome ! {authSlice.user?.payload?.username}</p> */}
          <Link 
                to="/dashboard" 
                className="" activeProps={{className:"text-blue-600"}}
              >
                My Links
              </Link>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={()=>setDialogOpen(true)}>Logout</button></div>) : 
        (
          <div className="flex gap-6 items-center">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        </div>
        ) }
    </nav>
    {/* Global confirm dialog */}
          <ConfirmDialog
            isOpen={isDialogOpen}
            title="Confirm Logout"
            message="Are u Sure u Want to Logout?"
            onConfirm={() => {
              handleLogout()
              setDialogOpen(false);
            }}
            onCancel={() => setDialogOpen(false)}
          />
    </>
  );
};

export default NavBar;
