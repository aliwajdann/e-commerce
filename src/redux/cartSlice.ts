import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MediaItem = {
  url: string;
  type: string; // e.g. "image", "video"
};

type CartItem = {
  id: string;
  title: string;
  price: number;
  media: MediaItem[]; // ✅ NEW
  quantity: number;
};

// ✅ Load from localStorage
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

const initialState = {
  items: loadCart(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
  const existing = state.items.find(item => item.id === action.payload.id);
  if (existing) {
    existing.quantity += action.payload.quantity; // ✅ Use the actual quantity from payload
  } else {
    state.items.push(action.payload);
  }
  localStorage.setItem("cart", JSON.stringify(state.items));
},

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
