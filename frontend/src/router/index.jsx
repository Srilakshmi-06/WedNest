import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import AppLayout from '../components/AppLayout.jsx'
import Home from '../pages/Home.jsx'
import Vendors from '../pages/Vendors.jsx'
import VendorDetails from '../pages/VendorDetails.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'

const rootRoute = createRootRoute({
  component: AppLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const vendorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendors',
  component: Vendors,
})

const vendorDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendors/$vendorId',
  component: VendorDetails,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  vendorsRoute,
  vendorDetailsRoute,
  dashboardRoute,
  loginRoute,
  signupRoute,
])

export const router = createRouter({ routeTree })
