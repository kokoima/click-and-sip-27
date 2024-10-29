import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onCheckout: () => void;
}

export const Cart = ({ items, onCheckout }: CartProps) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 rounded-full"
        >
          <ShoppingCart className="h-6 w-6" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${JSON.stringify(item.selectedVariants)}`}
              className="flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                {item.selectedVariants && (
                  <p className="text-sm text-gray-500">
                    {Object.values(item.selectedVariants).join(', ')}
                  </p>
                )}
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <p className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            onClick={onCheckout}
            className="w-full"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};