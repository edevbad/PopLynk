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
   beforeLoad: async() => {
    const { auth } = store.getState();
    if(auth.isAuthenticated) throw redirect({to : '/'});
  const res =  await axios.get(import.meta.env.VITE_BACKEND_URL +'/auth/authorize',{withCredentials:true})
  if(res.data.authenticated){
  store.dispatch(authenticate(res.data.user))
  throw redirect({to : '/'})
  }
  },
});

const registerRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
  beforeLoad: async() => {
    const { auth } = store.getState();
    if(auth.isAuthenticated) throw redirect({to : '/'});
  const res =  await axios.get(import.meta.env.VITE_BACKEND_URL +'/auth/authorize',{withCredentials:true})
  if(res.data.authenticated){
  store.dispatch(authenticate(res.data.user))
  throw redirect({to : '/'})
  }
  },
});

const dashboardRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashBoardPage,
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





export {loginRoute,registerRoute,dashboardRoute ,landingRoute}
