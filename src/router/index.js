import { createRouter, createWebHistory } from "vue-router";
import {supabase} from '@/supabase/init.js'
import Home from "../views/Home.vue";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Create from "@/views/Create"
import ViewWorkout from "@/views/ViewWorkout"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
      auth: false,
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
      auth: false,
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    }
  },
  {
    path: "/create",
    name: "create",
    component: Create,
    meta: {
      title: "Create",
      auth: true,
    }
  },
  {
    path: "/view-workout/:id",
    name: "view-workout",
    component: ViewWorkout,
    meta: {
      title: "View Workout",
      auth: false,
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next();
})

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if(to.matched.some((res) => res.meta.auth)) {
    if(user) {
      next();
      return;
    }
    next({name: 'login'});
    return;
  }
  next();
})


export default router;
