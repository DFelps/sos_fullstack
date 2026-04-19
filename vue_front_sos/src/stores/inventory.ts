import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type {
  Category,
  Customer,
  Movement,
  Product,
  Supplier
} from '@/types';

import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '@/services/customers';

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '@/services/categories';

import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from '@/services/suppliers';

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/services/products';

import {
  fetchMovements,
  createMovement
} from '@/services/movements';

import {
  fetchDashboard
} from '@/services/dashboard';

type DashboardData = {
  totalItems: number;
  inventoryValue: number;
  lowStock: number;
  outOfStock: number;
};

export const useInventoryStore = defineStore('inventory', () => {
  const categories = ref<Category[]>([]);
  const suppliers = ref<Supplier[]>([]);
  const customers = ref<Customer[]>([]);
  const products = ref<Product[]>([]);
  const movements = ref<Movement[]>([]);

  const dashboard = ref<DashboardData>({
    totalItems: 0,
    inventoryValue: 0,
    lowStock: 0,
    outOfStock: 0
  });

  const loading = ref(false);
  const error = ref<string | null>(null);

  const sortedMovements = computed(() =>
    [...movements.value].sort((a, b) =>
      b.date.localeCompare(a.date)
    )
  );

  const loadInitialData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const [
        categoriesData,
        suppliersData,
        customersData,
        productsData,
        movementsData,
        dashboardData
      ] = await Promise.all([
        fetchCategories(),
        fetchSuppliers(),
        fetchCustomers(),
        fetchProducts(),
        fetchMovements(),
        fetchDashboard()
      ]);

      categories.value = categoriesData;
      suppliers.value = suppliersData;
      customers.value = customersData;
      products.value = productsData;
      movements.value = movementsData;
      dashboard.value = dashboardData;

    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Erro ao carregar dados.';
      throw err;

    } finally {
      loading.value = false;
    }
  };

  const refreshDashboard = async () => {
    dashboard.value = await fetchDashboard();
  };

  const loadCustomers = async () => {
    customers.value = await fetchCustomers();
  };

  const addCustomer = async (payload: Omit<Customer, 'id'>) => {
    const created = await createCustomer(payload);
    customers.value.unshift(created);
    return created;
  };

  const editCustomer = async (
    id: number | string,
    payload: Omit<Customer, 'id'>
  ) => {
    const updated = await updateCustomer(id, payload);

    const index = customers.value.findIndex(
      item => item.id === String(id)
    );

    if (index !== -1) {
      customers.value[index] = updated;
    }

    return updated;
  };

  const removeCustomer = async (id: number | string) => {
    await deleteCustomer(id);

    customers.value = customers.value.filter(
      item => item.id !== String(id)
    );
  };

  const loadCategories = async () => {
    categories.value = await fetchCategories();
  };

  const addCategory = async (payload: Omit<Category, 'id'>) => {
    const created = await createCategory(payload);
    categories.value.unshift(created);
    return created;
  };

  const editCategory = async (
    id: number | string,
    payload: Omit<Category, 'id'>
  ) => {
    const updated = await updateCategory(id, payload);

    const index = categories.value.findIndex(
      item => item.id === String(id)
    );

    if (index !== -1) {
      categories.value[index] = updated;
    }

    return updated;
  };

  const removeCategory = async (id: number | string) => {
    await deleteCategory(id);

    categories.value = categories.value.filter(
      item => item.id !== String(id)
    );
  };

  const loadSuppliers = async () => {
    suppliers.value = await fetchSuppliers();
  };

  const addSupplier = async (payload: Omit<Supplier, 'id'>) => {
    const created = await createSupplier(payload);
    suppliers.value.unshift(created);
    return created;
  };

  const editSupplier = async (
    id: number | string,
    payload: Omit<Supplier, 'id'>
  ) => {
    const updated = await updateSupplier(id, payload);

    const index = suppliers.value.findIndex(
      item => item.id === String(id)
    );

    if (index !== -1) {
      suppliers.value[index] = updated;
    }

    return updated;
  };

  const removeSupplier = async (id: number | string) => {
    await deleteSupplier(id);

    suppliers.value = suppliers.value.filter(
      item => item.id !== String(id)
    );
  };

  const loadProducts = async () => {
    products.value = await fetchProducts();
  };

  const addProduct = async (payload: Omit<Product, 'id'>) => {
    const created = await createProduct(payload);
    products.value.unshift(created);

    await refreshDashboard();

    return created;
  };

  const editProduct = async (
    id: number | string,
    payload: Omit<Product, 'id'>
  ) => {
    const updated = await updateProduct(id, payload);

    const index = products.value.findIndex(
      item => item.id === String(id)
    );

    if (index !== -1) {
      products.value[index] = updated;
    }

    await refreshDashboard();

    return updated;
  };

  const removeProduct = async (id: number | string) => {
    await deleteProduct(id);

    products.value = products.value.filter(
      item => item.id !== String(id)
    );

    await refreshDashboard();
  };

  const loadMovements = async () => {
    movements.value = await fetchMovements();
  };

  const addMovement = async (payload: Omit<Movement, 'id'>) => {
    const created = await createMovement(payload);

    movements.value.unshift(created);

    await Promise.all([
      loadProducts(),
      refreshDashboard()
    ]);

    return created;
  };

  return {
    categories,
    suppliers,
    customers,
    products,
    movements: sortedMovements,
    dashboard,
    loading,
    error,

    loadInitialData,
    refreshDashboard,

    loadCustomers,
    addCustomer,
    editCustomer,
    removeCustomer,

    loadCategories,
    addCategory,
    editCategory,
    removeCategory,

    loadSuppliers,
    addSupplier,
    editSupplier,
    removeSupplier,

    loadProducts,
    addProduct,
    editProduct,
    removeProduct,

    loadMovements,
    addMovement
  };
});