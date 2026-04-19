export const currency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

export const shortDate = (value?: string) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
};
