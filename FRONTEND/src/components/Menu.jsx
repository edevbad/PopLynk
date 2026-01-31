import { forwardRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import ConfirmDialog from "./ConfirmDialog";

const Menu = forwardRef(({ open, setOpen,setLogoutDialogOpen }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed h-full inset-0 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Drawer */}
     
        <ul className="flex flex-col bg-primary/90 text-secondary items-center gap-6 py-10 text-xl font-semibold">
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
                className="px-4 py-2 text-secondary rounded-xl font-medium  hover:text-red-600 transition-all"
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
      
  );
});

export default Menu;
