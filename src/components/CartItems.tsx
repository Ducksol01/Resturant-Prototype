
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types";

const CartItems = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
          <Trash2 className="h-10 w-10 text-gray-400" />
        </div>
        <p className="text-muted-foreground">Your cart is empty</p>
        <Button asChild variant="outline">
          <a href="/">Browse Restaurants</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item: CartItem) => (
        <div key={`${item.id}-${item.restaurantId}`} className="animate-fade-in">
          <div className="flex items-start gap-4">
            <div 
              className="h-16 w-16 rounded-md bg-cover bg-center bg-no-repeat" 
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{item.restaurant}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="font-medium">${item.price}</p>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-5 text-center text-sm">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => removeFromCart(item)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="my-4" />
        </div>
      ))}
    </div>
  );
};

export default CartItems;
