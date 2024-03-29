import { createRouter, createWebHistory } from 'vue-router';
import CartPage from '@/views/shop/CartPage.vue';
import ProductDetailPage from '@/views/shop/ProductDetailPage.vue';
import ProductsPage from '@/views/shop/ProductsPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import AddProductPage from '@/views/admin/AddProductPage.vue';
import AddProductAdminPage from '@/views/admin/ProductsPage.vue';
import EditProduct from '@/views/admin/EditProduct.vue';
import OrdersPage from '@/views/shop/OrdersPage.vue';

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
      path: '/admin/products/edit-product/:id',
      name: 'EditProduct',
      component: EditProduct,
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: CartPage,
    },
    {
      path: '/orders/',
      name: 'OrdersPage',
      component: OrdersPage,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
});

export default router;
