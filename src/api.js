export const fetchOrders = async () => {
    try {
      const response = await fetch('/orders.json');  // Fetch from the orders.json file
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };
  