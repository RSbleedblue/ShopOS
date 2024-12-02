import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  previewUrl: string;
  prompt?: string;
}

interface ProductState {
  products: Product[];
  selectedImageIds: string[];
}

const initialState: ProductState = {
  products: [],
  selectedImageIds: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // Prevent adding duplicate images
      const existingProduct = state.products.find(p => p.id === action.payload.id);
      if (!existingProduct) {
        state.products.push(action.payload);
      }
    },
    addGeneratedImage: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;
      state.products = state.products.filter(product => !idsToDelete.includes(product.id));
      state.selectedImageIds = state.selectedImageIds.filter(id => !idsToDelete.includes(id));
    },
    selectImage: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      const isCurrentlySelected = state.selectedImageIds.includes(imageId);
      
      if (isCurrentlySelected) {
        // If already selected, deselect
        state.selectedImageIds = state.selectedImageIds.filter(id => id !== imageId);
      } else {
        // If not selected, select
        state.selectedImageIds.push(imageId);
      }
    },
    deselectImage: (state, action: PayloadAction<string>) => {
      state.selectedImageIds = state.selectedImageIds.filter(id => id !== action.payload);
    },
  },
});

export const { 
  addProduct, 
  deleteProduct, 
  selectImage, 
  deselectImage,
  addGeneratedImage 
} = productSlice.actions;

export default productSlice.reducer;