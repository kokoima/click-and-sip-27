import { useState } from 'react';
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number, variants?: Record<string, string>) => void;
}

export const ProductCard = ({ product, quantity, onQuantityChange }: ProductCardProps) => {
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const handleQuantityChange = (newQuantity: number) => {
    if (product.variants && newQuantity > quantity) {
      setIsVariantDialogOpen(true);
    } else {
      onQuantityChange(newQuantity);
    }
  };

  const handleVariantSubmit = () => {
    onQuantityChange(quantity + 1, selectedVariants);
    setIsVariantDialogOpen(false);
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
              </>
            )}
            <Button
              variant="default"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {product.variants && (
        <Dialog open={isVariantDialogOpen} onOpenChange={setIsVariantDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Customize your {product.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <label className="text-sm font-medium">{variant.name}</label>
                  <Select
                    onValueChange={(value) =>
                      setSelectedVariants((prev) => ({
                        ...prev,
                        [variant.id]: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${variant.name}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {variant.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button onClick={handleVariantSubmit} className="w-full">
                Add to Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};