// redux/drawerSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'toggle',
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = drawerSlice.actions;
export default drawerSlice.reducer;
