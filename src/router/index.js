import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';
import CartPage from '@/views/shop/CartPage.vue';
import ProductDetailPage from '@/views/shop/ProductDetailPage.vue';
import ProductsPage from '@/views/shop/ProductsPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import AddProductPage from '@/views/admin/AddProductPage.vue';
import AdminProductsPage from '@/views/admin/ProductsPage.vue';
import EditProduct from '@/views/admin/EditProduct.vue';
import OrdersPage from '@/views/shop/OrdersPage.vue';
import SignUpPage from '@/views/shop/SignUpPage.vue';
import LoginPage from '@/views/shop/LoginPage.vue';
import CategoriesPage from '@/views/shop/CategoriesPage.vue';

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
      component: AdminProductsPage,
    },
    {
      path: '/admin/products/edit-product/:id',
      name: 'EditProduct',
      component: EditProduct,
      //route based navigation guard
      // beforeEnter: () => {
      //   const authStore = useAuthStore();
      //   // reject the navigation if user isn't logged in and redirect to the login page
      //   if (!authStore.isLoggedIn) {
      //     router.push('/login');
      //     return;
      //   }
      // },
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
    {
      path: '/login/',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/signup/',
      name: 'SignUpPage',
      component: SignUpPage,
    },
    {
      path: '/categories/',
      name: 'CategoriesPage',
      component: CategoriesPage,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (
    // make sure the user is authenticated
    !authStore.isLoggedIn &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'LoginPage' &&
    to.name !== 'Products' &&
    to.name !== 'SignUpPage' &&
    to.name !== 'ProductDetail'
  ) {
    // redirect the user to the login page
    next('/login');
  } else {
    next();
  }
});

export default router;
