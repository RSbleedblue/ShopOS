import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './Slice/productSlice';  

const store = configureStore({
  reducer: {
    product: ProductReducer,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;