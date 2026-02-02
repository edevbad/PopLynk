import { createRootRoute ,Router} from "@tanstack/react-router";
import App from "../App.jsx";
import { registerRoute,loginRoute } from "./auth.route.js";
import {dashboardRoute} from './dashboard.route.js'
import {landingRoute} from './home.route.js'

// Root route
const rootRoute = new createRootRoute({
  component: App,
});
// Router instance
const routeTree = rootRoute.addChildren([
    loginRoute,
    registerRoute,
    landingRoute,
    dashboardRoute,
]);


const router = new Router({
  routeTree,
});

export {rootRoute,router}

