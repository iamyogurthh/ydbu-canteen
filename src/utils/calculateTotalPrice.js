export default function calculateTotalPrice(items = []) {
  return items.reduce((sum, item) => sum + item.quantity * item.food.price, 0)
}
