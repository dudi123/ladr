// Composables
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
   {
      path: '/',
      component: () => import('@/layouts/default/Default.vue'),
      children: [
         {
            path: '',
            name: 'home',

            component: () =>
               import(/* webpackChunkName: "home" */ '@/pages/HomePage.vue')
         },
         {
            path: 'components',
            name: 'components',
            component: () =>
               import(
                  /* webpackChunkName: "components" */ '@/pages/ComponentsPage.vue'
               )
         },
         {
            path: 'cycles',
            name: 'cycles',
            component: () =>
               import(
                  /* webpackChunkName: "components" */ '@/pages/CyclesPage.vue'
               )
         },
         {
            path: 'removals',
            name: 'removals',
            component: () =>
               import(
                  /* webpackChunkName: "components" */ '@/pages/RemovalsPage.vue'
               )
         },
         {
            path: 'reports',
            name: 'reports',
            component: () =>
               import(
                  /* webpackChunkName: "components" */ '@/pages/ReportsPage.vue'
               )
         }
      ]
   },
   {
      path: '/examples',
      component: () => import('@/layouts/default/Default.vue'),
      redirect: (to) => {
         return { name: 'data-table' };
      },
      children: [
         {
            path: 'data-table',
            name: 'data-table',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
               import(
                  /* webpackChunkName: "home" */ '@/examples/DataTableExample.vue'
               )
         },
         {
            path: 'list',
            name: 'list',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
               import(
                  /* webpackChunkName: "home" */ '@/examples/ListExample.vue'
               )
         }
      ]
   }
];

const router = createRouter({
   history: createWebHashHistory(process.env.BASE_URL), // you can use without hash as well by using the createWebHistory function
   routes
});

export default router;
