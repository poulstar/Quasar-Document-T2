import { route } from 'quasar/wrappers';
import { RouteCallback } from '@quasar/app-vite';
import { RouteRecordRaw, RouteRecordRedirectOption } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/auth/AuthLayout.vue'),
    redirect: <RouteRecordRedirectOption> route( <RouteCallback> {name: 'login'} ),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue')
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/dashboard/DashboardLayout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('pages/dashboard/IndexPage.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
