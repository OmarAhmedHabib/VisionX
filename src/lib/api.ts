import { Product } from "@/types/product";

const API_BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    
    const products = await response.json();
    
    // Filter and transform products to simulate glasses
    const glassesProducts = products
      .filter((p: Product) => p.category === "men's clothing" || p.category === "women's clothing")
      .slice(0, 12)
      .map((p: Product, index: number) => ({
        ...p,
        category: index % 2 === 0 ? "eyeglasses" : "sunglasses",
        image: index % 2 === 0 
          ? `https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
          : `https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
      }));
    
    return glassesProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    
    const product = await response.json();
    
    // Transform to glasses product
    return {
      ...product,
      category: parseInt(id) % 2 === 0 ? "eyeglasses" : "sunglasses",
      image: parseInt(id) % 2 === 0 
        ? `https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center`
        : `https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center`
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
