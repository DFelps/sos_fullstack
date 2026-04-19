import { apiFetch, type ApiResponse } from './api';
import type { Movement, MovementType } from '@/types';

export interface MovementPayload {
  productId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  date: string;
}

type MovementApiResource = {
  id: number | string;
  product_id?: number | string | null;
  productId?: number | string | null;
  type: MovementType;
  quantity: number | string;
  reason: string;
  date?: string | null;
  movement_date?: string | null;
  created_at?: string;
  updated_at?: string;
};

const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const normalizeMovement = (item: MovementApiResource): Movement => ({
  id: String(item.id),
  productId: String(item.productId ?? item.product_id ?? ''),
  type: item.type,
  quantity: toNumber(item.quantity),
  reason: item.reason,
  date: item.date ?? item.movement_date ?? new Date().toISOString().slice(0, 10)
});

export async function fetchMovements(): Promise<Movement[]> {
  const response = await apiFetch<ApiResponse<MovementApiResource[]>>('/movements');
  return response.data.map(normalizeMovement);
}

export async function createMovement(payload: MovementPayload): Promise<Movement> {
  const response = await apiFetch<ApiResponse<MovementApiResource>>('/movements', {
    method: 'POST',
    body: JSON.stringify({
      product_id: payload.productId,
      type: payload.type,
      quantity: payload.quantity,
      reason: payload.reason,
      movement_date: payload.date
    })
  });

  return normalizeMovement(response.data);
}