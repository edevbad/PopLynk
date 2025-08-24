import { forwardRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import ConfirmDialog from "./ConfirmDialog";

const Menu = forwardRef(({ open, setOpen,setLogoutDialogOpen }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Drawer */}
      <div
        className={`absolute top-0 left-0 w-full bg-white shadow-xl rounded-b-2xl transform transition-transform duration-500 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-10 text-xl font-semibold">
          <li>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="hover:text-indigo-600 transition-colors"
            >
              Analytics
            </Link>
          </li>
          <li>
            <button
                className="px-4 py-2 text-black rounded-xl font-medium  hover:text-red-600 transition-all"
                onClick={() => {
                  setOpen(false)
                  setLogoutDialogOpen(true)
                }}
              >
                Logout
              </button>
          </li>
        </ul>
      </div>
      
    </div>
  );
});

export default Menu;
