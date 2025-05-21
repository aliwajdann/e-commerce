import { RootState } from "@/lib/store"; // Update the path if needed

export const selectCartCount = (state: RootState) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};
