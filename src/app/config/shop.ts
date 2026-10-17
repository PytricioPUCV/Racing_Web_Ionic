// Debe coincidir con SHIPPING_COST del backend (orderController), que es quien calcula el total real.
export const SHIPPING_COST = 5000;

export const PAYMENT_METHODS = [
  { value: 'debito', label: 'Tarjeta de débito' },
  { value: 'credito', label: 'Tarjeta de crédito' },
  { value: 'transferencia', label: 'Transferencia bancaria' }
];
