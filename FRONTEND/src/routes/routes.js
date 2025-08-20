import { createRootRoute ,Router} from "@tanstack/react-router";
import App from "../App.jsx";
import { dashboardRoute, loginRoute, registerRoute,landingRoute } from "./auth.routes.js";

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

