import { Outlet, useRouterState } from "@tanstack/react-router"
import { AnimatePresence,motion } from "framer-motion"
import { Toaster } from "react-hot-toast"

function App() {
  const { location } = useRouterState();


  return (
    <>
  <Outlet />
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
      </>
    
  )
}

export default App
