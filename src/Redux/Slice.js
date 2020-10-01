import { createSlice } from "@reduxjs/toolkit";

const initialStateSession = {
  user: {},
  cart: [],
  token: null,
};
const sessionSlice = createSlice({
  name: "session",
  initialState: initialStateSession,
  reducers: {
    setError: (state, { payload }) => ({ ...state, error: payload }),
    setToken: (state, { payload }) => ({ ...state, token: payload }),
    removeToken: (state, { payload }) => ({ ...state, token: null }),
    setUserInfo: (state, { payload }) => ({ ...state, user: payload }),
    loginOut: () => initialStateSession,
    setItemCart: (state, { payload }) => ({ ...state, cart: [...state.cart, { ...payload, count: 1 }] }),
    removeItemCart: (state, { payload }) => ({ ...state, cart: [...state.cart.filter((item) => item.id !== payload)] }),
    addCountCartItem: (state, { payload }) => ({ ...state, cart: [...state.cart.map((item) => (item.id === payload ? { ...item, count: item.count + 1 } : item))] }),
    removeCountCartItem: (state, { payload }) => ({ ...state, cart: [...state.cart.map((item) => (item.id === payload ? { ...item, count: item.count - 1 } : item))] }),
  },
});

const initialStateGlobal = {
  loader: false,
  error: null,
};
const globalSlice = createSlice({
  name: "global",
  initialState: initialStateGlobal,
  reducers: {
    Loader: (state, { payload }) => ({ ...state, loader: payload }),
    setErrorState: (state, { payload }) => ({ ...state, error: payload }),
  },
});

const initialStateData = {
  items: [],
  upDate: 0,
};
const dataSlice = createSlice({
  name: "data",
  initialState: initialStateData,
  reducers: {
    setItemsState: (state, { payload }) => ({ ...state, items: payload }),
    setUpDate: (state, { payload }) => ({ ...state, upDate: payload }),
  },
});

export const session = sessionSlice.reducer;
export const { setError, setToken, setUserInfo, loginOut, setItemCart, removeItemCart, addCountCartItem, removeCountCartItem } = sessionSlice.actions;

export const global = globalSlice.reducer;
export const { Loader, setErrorState } = globalSlice.actions;

export const data = dataSlice.reducer;
export const { setItemsState, setUpDate } = dataSlice.actions;
