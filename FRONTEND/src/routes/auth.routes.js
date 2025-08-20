import { createRoute,redirect } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { rootRoute } from "./routes.js";
import {store} from "../store/store.js"
import LandingPage from "../pages/LandingPage.jsx";
import DashBoardPage from "../pages/DashboardPage.jsx";
import axios from "axios";
import { authenticate } from "../store/auth/auth.slice.js";


// Child routes
const loginRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
const dashboardRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashBoardPage,
  beforeLoad: async() => {
    const { auth } = store.getState();
  const res =  await axios.get(import.meta.env.VITE_BACKEND_URL +'/auth/authorize',{withCredentials:true})
 if( res.data.authenticated){
  store.dispatch(authenticate())
  }
    else  {
      throw redirect({ to: "/login" });
    }
  },

});
const landingRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
beforeLoad: async() => {
    const { auth } = store.getState();
  const res =  await axios.get(import.meta.env.VITE_BACKEND_URL +'/auth/authorize',{withCredentials:true})  
  console.log(res.data.authenticated);
  
  if(res.data.authenticated === true){
    store.dispatch(authenticate())
    console.log(auth.isAuthenticated);
  }
}
});





export {loginRoute,registerRoute,dashboardRoute ,landingRoute}
