import { apiFetch, type ApiResponse } from './api';
import type { Customer } from '@/types';

export interface CustomerPayload {
  name: string;
  email: string;
  phone: string;
}

type CustomerApiResource = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
};

const normalizeCustomer = (item: CustomerApiResource): Customer => ({
  id: String(item.id),
  name: item.name,
  email: item.email,
  phone: item.phone
});

export async function fetchCustomers(): Promise<Customer[]> {
  const response = await apiFetch<ApiResponse<CustomerApiResource[]>>('/customers');
  return response.data.map(normalizeCustomer);
}

export async function createCustomer(payload: CustomerPayload): Promise<Customer> {
  const response = await apiFetch<ApiResponse<CustomerApiResource>>('/customers', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return normalizeCustomer(response.data);
}

export async function updateCustomer(id: number | string, payload: CustomerPayload): Promise<Customer> {
  const response = await apiFetch<ApiResponse<CustomerApiResource>>(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return normalizeCustomer(response.data);
}

export async function deleteCustomer(id: number | string): Promise<void> {
  await apiFetch(`/customers/${id}`, {
    method: 'DELETE'
  });
}