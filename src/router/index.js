import { createRouter, createWebHistory } from 'vue-router';
import CartPage from '@/views/CartPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';
import ProductsPage from '@/views/ProductsPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: ProductsPage,
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: ProductDetailPage,
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: CartPage,
    },
    {
      path: '/',
      redirect: '/products',
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
