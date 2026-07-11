import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { toast } from "react-toastify";

// --------------------
// LOAD WISHLIST
// --------------------

export const loadWishlist = createAsyncThunk(
  "wishlist/loadWishlist",
  async () => {
    const res = await api.get("wishlist/");
    return res.data;
  },
);

// --------------------
// TOGGLE WISHLIST
// --------------------

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (product, { getState, dispatch }) => {
    const wishlist = getState().wishlist.items;

    const existing = wishlist.find((item) => item.product.id === product.id);

    if (existing) {
      await api.delete(`wishlist/${existing.id}/`);
      toast.info("Removed from wishlist");
    } else {
      await api.post("wishlist/", {
        product_id: product.id,
      });
      toast.success("Added to wishlist");
    }

    dispatch(loadWishlist());
  },
);

// --------------------
// REMOVE
// --------------------

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (id, { dispatch }) => {
    await api.delete(`wishlist/${id}/`);
    dispatch(loadWishlist());
  },
);

// --------------------

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(loadWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(loadWishlist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default wishlistSlice.reducer;
