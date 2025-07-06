import { create } from 'zustand';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../domain/entities';
import { ProductUseCase } from '../../domain/use-cases/product.use-case';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/product.repository';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  createProduct: (product: CreateProductRequest) => Promise<void>;
  updateProduct: (product: UpdateProductRequest) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

const productRepository = new ProductRepositoryImpl();
const productUseCase = new ProductUseCase(productRepository);

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const products = await productUseCase.getAllProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products'
      });
      throw error;
    }
  },

  fetchProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const product = await productUseCase.getProductById(id);
      set({ selectedProduct: product, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product'
      });
      throw error;
    }
  },

  createProduct: async (productData: CreateProductRequest) => {
    set({ isLoading: true, error: null });
    
    try {
      const newProduct = await productUseCase.createProduct(productData);
      const currentProducts = get().products;
      set({ 
        products: [...currentProducts, newProduct],
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create product'
      });
      throw error;
    }
  },

  updateProduct: async (productData: UpdateProductRequest) => {
    set({ isLoading: true, error: null });
    
    try {
      const updatedProduct = await productUseCase.updateProduct(productData);
      const currentProducts = get().products;
      const updatedProducts = currentProducts.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      );
      
      set({ 
        products: updatedProducts,
        selectedProduct: updatedProduct,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update product'
      });
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      await productUseCase.deleteProduct(id);
      const currentProducts = get().products;
      const filteredProducts = currentProducts.filter(p => p.id !== id);
      
      set({ 
        products: filteredProducts,
        selectedProduct: null,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to delete product'
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
