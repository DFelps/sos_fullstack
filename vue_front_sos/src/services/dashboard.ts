import { apiFetch, type ApiResponse } from './api';

export interface DashboardData {
  totalItems: number;
  inventoryValue: number;
  lowStock: number;
  outOfStock: number;
}

type DashboardApiResource = {
  totalItems?: number | string;
  total_items?: number | string;
  inventoryValue?: number | string;
  inventory_value?: number | string;
  lowStock?: number | string;
  low_stock?: number | string;
  outOfStock?: number | string;
  out_of_stock?: number | string;
};

const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const normalizeDashboard = (item: DashboardApiResource): DashboardData => ({
  totalItems: toNumber(item.totalItems ?? item.total_items),
  inventoryValue: toNumber(
    item.inventoryValue ??
    item.inventory_value ??
    (item as any).inventory_cost
  ),
  lowStock: toNumber(
    item.lowStock ??
    item.low_stock ??
    (item as any).low_stock_products
  ),
  outOfStock: toNumber(
    item.outOfStock ??
    item.out_of_stock ??
    (item as any).out_of_stock_products
  )
});

export async function fetchDashboard(): Promise<DashboardData> {
  const response = await apiFetch<ApiResponse<DashboardApiResource>>('/dashboard');
  return normalizeDashboard(response.data);
}