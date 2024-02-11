import { createRouter, createWebHistory } from 'vue-router';
import CartPage from '@/views/CartPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';
import ProductsPage from '@/views/shop/ProductsPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import AddProductPage from '@/views/admin/AddProductPage.vue';
import AddProductAdminPage from '@/views/admin/ProductsPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Products',
      component: ProductsPage,
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: ProductDetailPage,
    },
    {
      path: '/admin/add-product/',
      name: 'AddProduct',
      component: AddProductPage,
    },
    {
      path: '/admin/admin-products/',
      name: 'AdminProduct',
      component: AddProductAdminPage,
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: CartPage,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
});

export default router;
