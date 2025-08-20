import { Outlet } from "@tanstack/react-router"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
    <Outlet/>
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
