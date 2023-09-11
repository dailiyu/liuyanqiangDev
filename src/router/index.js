import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/wall?id=0",
    component: () => import("@/views/LiyuIndex.vue"),
    children: [
      {
        path: "wall",
        component: () => import("@/views/WallMessage"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
