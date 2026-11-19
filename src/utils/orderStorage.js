
const ORDER_HISTORY_KEY = "nexamart-demo-orders";

export const getDemoOrders = () => {
  try {
    const stored = localStorage.getItem(ORDER_HISTORY_KEY);
    const orders = stored ? JSON.parse(stored) : [];

    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
};

export const saveDemoOrder = (order) => {
  const orders = getDemoOrders();

  // Store only the information needed for demo history.
  const historyOrder = {
    id: order.id,
    date: order.date,
    status: order.status,
    paymentMethod: order.paymentMethod,
    total: order.total,
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  localStorage.setItem(
    ORDER_HISTORY_KEY,
    JSON.stringify([historyOrder, ...orders])
  );

  return historyOrder;
};
