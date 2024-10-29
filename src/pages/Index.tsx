import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { CartItem, Product } from '../types';
import { mockEstablishment, mockProducts } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const categories = Array.from(
    new Set(mockProducts.map((p) => p.category))
  );

  const handleQuantityChange = (
    product: Product,
    quantity: number,
    variants?: Record<string, string>
  ) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      );

      if (existingItemIndex >= 0) {
        if (quantity === 0) {
          return prev.filter((_, index) => index !== existingItemIndex);
        }
        return prev.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity } : item
        );
      }

      if (quantity > 0) {
        return [...prev, { product, quantity, selectedVariants: variants }];
      }

      return prev;
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Your drinks will be ready soon. Order code: #123",
    });
    setCartItems([]);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header establishment={mockEstablishment} />
      
      <main className="container mx-auto px-4 mt-6">
        <Tabs defaultValue={categories[0]}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="product-grid">
                {mockProducts
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={
                        cartItems.find(
                          (item) => item.product.id === product.id
                        )?.quantity || 0
                      }
                      onQuantityChange={(quantity, variants) =>
                        handleQuantityChange(product, quantity, variants)
                      }
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Cart items={cartItems} onCheckout={handleCheckout} />
    </div>
  );
};

export default Index;