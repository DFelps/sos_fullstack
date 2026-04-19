import { apiFetch, type ApiResponse } from './api';
import type { Supplier } from '@/types';

export interface SupplierPayload {
  tradeName: string;
  contactName: string;
  email: string;
  phone: string;
}

type SupplierApiResource = {
  id: number | string;
  tradeName?: string | null;
  trade_name?: string | null;
  contactName?: string | null;
  contact_name?: string | null;
  email: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
};

const normalizeSupplier = (item: SupplierApiResource): Supplier => ({
  id: String(item.id),
  tradeName: item.tradeName ?? item.trade_name ?? '',
  contactName: item.contactName ?? item.contact_name ?? '',
  email: item.email,
  phone: item.phone
});

const serializeSupplier = (payload: SupplierPayload) => ({
  trade_name: payload.tradeName,
  contact_name: payload.contactName,
  email: payload.email,
  phone: payload.phone
});

export async function fetchSuppliers(): Promise<Supplier[]> {
  const response = await apiFetch<ApiResponse<SupplierApiResource[]>>('/suppliers');
  return response.data.map(normalizeSupplier);
}

export async function createSupplier(payload: SupplierPayload): Promise<Supplier> {
  const response = await apiFetch<ApiResponse<SupplierApiResource>>('/suppliers', {
    method: 'POST',
    body: JSON.stringify(serializeSupplier(payload))
  });

  return normalizeSupplier(response.data);
}

export async function updateSupplier(id: number | string, payload: SupplierPayload): Promise<Supplier> {
  const response = await apiFetch<ApiResponse<SupplierApiResource>>(`/suppliers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serializeSupplier(payload))
  });

  return normalizeSupplier(response.data);
}

export async function deleteSupplier(id: number | string): Promise<void> {
  await apiFetch(`/suppliers/${id}`, {
    method: 'DELETE'
  });
}