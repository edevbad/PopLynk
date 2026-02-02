import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routes.js";
import DashboardPage from "../pages/DashboardPage.jsx";
import { store } from "../store/store.js";
import axios from "axios";


const dashboardRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  beforeLoad: async() => {
    const { auth } = store.getState();
    if(auth.isAuthenticated) return;
  const res =  await axios.get(import.meta.env.VITE_BACKEND_URL +'/auth/authorize',{withCredentials:true})
  if(res.data.authenticated){
  store.dispatch(authenticate(res.data.user))
  }
    else  {
      throw redirect({ to: "/login" });
    }
  },

});
export {dashboardRoute }

