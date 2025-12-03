import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/cart');
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch cart');
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
        await api.post('/cart', { productId, quantity });
        dispatch(fetchCart());
        return;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to add to cart');
    }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }, { dispatch, rejectWithValue }) => {
    try {
        await api.put(`/cart/${itemId}`, { quantity });
        dispatch(fetchCart());
        return;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to update cart');
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, { dispatch, rejectWithValue }) => {
    try {
        await api.delete(`/cart/${itemId}`);
        dispatch(fetchCart());
        return;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to remove item');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        subtotal: 0,
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.subtotal = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.subtotal = action.payload.subtotal;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
