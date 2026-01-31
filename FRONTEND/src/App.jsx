import { Outlet, useRouterState } from "@tanstack/react-router"
import { AnimatePresence,motion } from "framer-motion"
import { Toaster } from "react-hot-toast"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const { location } = useRouterState();

  return (
    <div className="flex min-w-[350px] bg-gradient-to-b from-indigo via-primary to-indigo flex-col min-h-screen">
    <NavBar/>
  <Outlet/>
    <Footer/>
    <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      /> 
      </div>
    
  )
}

export default App
