import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { toast } from "react-toastify";

// --------------------
// LOAD CART
// --------------------

export const loadCart = createAsyncThunk("cart/loadCart", async () => {
  const res = await api.get("cart/");

  return res.data.map((item) => ({
    id: item.product,
    cartItemId: item.id,
    name: item.product_name,
    price: item.product_price,
    image: item.product_image,
    qty: item.quantity,
    stock: item.product_stock,
  }));
});

// --------------------
// ADD
// --------------------

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { dispatch }) => {
    const product = data.product ?? data;
    const quantity = data.quantity ?? 1;
    const showToast = data.showToast ?? true;
    await api.post("cart/", {
      product: product.id,
      quantity,
    });

    if (showToast) {
      toast.success("Added to cart 🛒");
    }

    dispatch(loadCart());
  },
);

// --------------------
// INCREASE
// --------------------

export const increaseQty = createAsyncThunk(
  "cart/increaseQty",
  async (id, { getState, dispatch }) => {
    const item = getState().cart.items.find((p) => p.id === id);

    if (!item) return;

    if (item.qty >= item.stock) {
      toast.warning(`Only ${item.stock} items available`);
      return;
    }

    await api.post(`cart/${item.cartItemId}/update_qty/`, {
      quantity: item.qty + 1,
    });

    dispatch(loadCart());
  },
);

// --------------------
// DECREASE
// --------------------

export const decreaseQty = createAsyncThunk(
  "cart/decreaseQty",
  async (id, { getState, dispatch }) => {
    const item = getState().cart.items.find((p) => p.id === id);

    if (!item) return;

    if (item.qty === 1) {
      await api.delete(`cart/${item.cartItemId}/`);
    } else {
      await api.post(`cart/${item.cartItemId}/update_qty/`, {
        quantity: item.qty - 1,
      });
    }

    dispatch(loadCart());
  },
);

// --------------------
// REMOVE
// --------------------

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { getState, dispatch }) => {
    const item = getState().cart.items.find((p) => p.id === id);

    if (!item) return;

    await api.delete(`cart/${item.cartItemId}/`);

    toast.success("Item removed");

    dispatch(loadCart());
  },
);

// --------------------
// CLEAR
// --------------------

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { dispatch }) => {
    await api.delete("cart/clear/");

    dispatch(loadCart());
  },
);

// --------------------

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(loadCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
