export type StockStatus = 'ok' | 'low' | 'out';
export type MovementType = 'entry' | 'exit' | 'adjustment';

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Supplier {
  id: string;
  tradeName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: string;
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

export interface Movement {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  date: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  helper: string;
}
