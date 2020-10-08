import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./index.js";

const middleWares = [thunk];

const composeEnhancers = (process.env.NODE_ENV !== "production" && typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: "app",
  storage,
  whitelist: ["session", "data"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const rootMiddleWares = applyMiddleware(...middleWares);

export const store = createStore(persistedReducer, composeEnhancers(rootMiddleWares));
export const persistor = persistStore(store);
