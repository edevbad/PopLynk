import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routes.js";
import LandingPage from "../pages/LandingPage.jsx";
import { store } from "../store/store.js";
import axios from "axios";


const landingRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
  beforeLoad: async() => {
    const { auth } = store.getState();
    if(auth.isAuthenticated) return;
  const res =  await axios.get(import.meta.env.VITE_BACKEND_URL +'/auth/authorize',{withCredentials:true})
  if(res.data.authenticated){
  store.dispatch(authenticate(res.data.user))
  }
  },
});

export {landingRoute}
