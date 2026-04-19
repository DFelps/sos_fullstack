import { apiFetch, type ApiResponse } from './api';
import type { Category } from '@/types';

export interface CategoryPayload {
  name: string;
  description: string;
  color: string;
}

type CategoryApiResource = {
  id: number | string;
  name: string;
  description?: string | null;
  color?: string | null;
  created_at?: string;
  updated_at?: string;
};

const normalizeCategory = (item: CategoryApiResource): Category => ({
  id: String(item.id),
  name: item.name,
  description: item.description ?? '',
  color: item.color ?? '#0048CA'
});

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiFetch<ApiResponse<CategoryApiResource[]>>('/categories');
  return response.data.map(normalizeCategory);
}

export async function createCategory(payload: CategoryPayload): Promise<Category> {
  const response = await apiFetch<ApiResponse<CategoryApiResource>>('/categories', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return normalizeCategory(response.data);
}

export async function updateCategory(id: number | string, payload: CategoryPayload): Promise<Category> {
  const response = await apiFetch<ApiResponse<CategoryApiResource>>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return normalizeCategory(response.data);
}

export async function deleteCategory(id: number | string): Promise<void> {
  await apiFetch(`/categories/${id}`, {
    method: 'DELETE'
  });
}