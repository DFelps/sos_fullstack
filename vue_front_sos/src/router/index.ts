import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/auth/LoginView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import ProductsView from '@/views/products/ProductsView.vue';
import CategoriesView from '@/views/categories/CategoriesView.vue';
import SuppliersView from '@/views/suppliers/SuppliersView.vue';
import CustomersView from '@/views/customers/CustomersView.vue';
import MovementsView from '@/views/movements/MovementsView.vue';
import ReportsView from '@/views/reports/ReportsView.vue';
import SettingsView from '@/views/settings/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/produtos', name: 'products', component: ProductsView, meta: { requiresAuth: true } },
    { path: '/categorias', name: 'categories', component: CategoriesView, meta: { requiresAuth: true } },
    { path: '/fornecedores', name: 'suppliers', component: SuppliersView, meta: { requiresAuth: true } },
    { path: '/clientes', name: 'customers', component: CustomersView, meta: { requiresAuth: true } },
    { path: '/movimentacoes', name: 'movements', component: MovementsView, meta: { requiresAuth: true } },
    { path: '/relatorios', name: 'reports', component: ReportsView, meta: { requiresAuth: true } },
    { path: '/configuracoes', name: 'settings', component: SettingsView, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'login' };
  if (to.name === 'login' && auth.isAuthenticated) return { name: 'dashboard' };
  return true;
});

export default router;
