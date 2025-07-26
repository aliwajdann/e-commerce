import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 🧩 Types
type MediaItem = {
  url: string;
  type: string; // "image", "video", etc.
};

type CartItem = {
  id: string;
  title: string;
  price: number;
  media: MediaItem[];
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

// 🧠 Load from localStorage (if available)
const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  return [];
};

// 🧾 Initial State
const initialState = {
  items: loadCart() as CartItem[],
};

// 🛒 Create Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add or update quantity
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        item =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    // 🗑️ Remove item by ID (ignores variant — can customize this too if needed)
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    // 🔄 Update quantity of a specific item
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        selectedColor?: string;
        selectedSize?: string;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        i =>
          i.id === action.payload.id &&
          i.selectedColor === action.payload.selectedColor &&
          i.selectedSize === action.payload.selectedSize
      );

      if (item) {
        item.quantity = action.payload.quantity;
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      }
    },

    // 🧹 Clear everything
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

// 🧾 Exports
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
