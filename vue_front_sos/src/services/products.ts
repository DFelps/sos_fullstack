import { apiFetch, type ApiResponse } from './api';
import type { Product } from '@/types';

export interface ProductPayload {
  name: string;
  sku: string;
  categoryId: string;
  supplierId: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  salePrice: number;
  expirationDate?: string;
  entryDate: string;
  location: string;
  description: string;
}

type ProductApiResource = {
  id: number | string;
  name: string;
  sku: string;
  category_id?: number | string | null;
  supplier_id?: number | string | null;
  categoryId?: number | string | null;
  supplierId?: number | string | null;
  quantity: number | string;
  min_quantity?: number | string | null;
  minQuantity?: number | string | null;
  cost_price?: number | string | null;
  costPrice?: number | string | null;
  sale_price?: number | string | null;
  salePrice?: number | string | null;
  expiration_date?: string | null;
  expirationDate?: string | null;
  entry_date?: string | null;
  entryDate?: string | null;
  location?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const normalizeProduct = (item: ProductApiResource): Product => ({
  id: String(item.id),
  name: item.name,
  sku: item.sku,
  categoryId: String(item.categoryId ?? item.category_id ?? ''),
  supplierId: String(item.supplierId ?? item.supplier_id ?? ''),
  quantity: toNumber(item.quantity),
  minQuantity: toNumber(item.minQuantity ?? item.min_quantity),
  costPrice: toNumber(item.costPrice ?? item.cost_price),
  salePrice: toNumber(item.salePrice ?? item.sale_price),
  expirationDate: item.expirationDate ?? item.expiration_date ?? undefined,
  entryDate: item.entryDate ?? item.entry_date ?? new Date().toISOString().slice(0, 10),
  location: item.location ?? '',
  description: item.description ?? ''
});

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiFetch<ApiResponse<ProductApiResource[]>>('/products');
  return response.data.map(normalizeProduct);
}

const serializeProduct = (payload: ProductPayload) => ({
  name: payload.name,
  sku: payload.sku,
  category_id: payload.categoryId,
  supplier_id: payload.supplierId,
  quantity: payload.quantity,
  min_quantity: payload.minQuantity,
  cost_price: payload.costPrice,
  sale_price: payload.salePrice,
  expiration_date: payload.expirationDate ?? null,
  entry_date: payload.entryDate,
  location: payload.location,
  description: payload.description
});

export async function createProduct(payload: ProductPayload): Promise<Product> {
  const response = await apiFetch<ApiResponse<ProductApiResource>>('/products', {
    method: 'POST',
    body: JSON.stringify(serializeProduct(payload))
  });

  return normalizeProduct(response.data);
}

export async function updateProduct(id: number | string, payload: ProductPayload): Promise<Product> {
  const response = await apiFetch<ApiResponse<ProductApiResource>>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serializeProduct(payload))
  });

  return normalizeProduct(response.data);
}

export async function deleteProduct(id: number | string): Promise<void> {
  await apiFetch(`/products/${id}`, {
    method: 'DELETE'
  });
}