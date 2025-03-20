
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { MenuItem as MenuItemType } from "@/types";

interface MenuItemProps {
  item: MenuItemType;
  restaurantName: string;
  restaurantId: string;
  index: number;
}

const MenuItem = ({ item, restaurantName, restaurantId, index }: MenuItemProps) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const isInCart = cartItems.some(
    cartItem => cartItem.id === item.id && cartItem.restaurantId === restaurantId
  );

  const handleAddToCart = () => {
    if (isInCart) return;
    
    setIsAdding(true);
    setTimeout(() => {
      addToCart({
        ...item,
        restaurant: restaurantName,
        restaurantId,
        quantity: 1
      });
      
      setIsAdding(false);
      toast.success(`${item.name} added to cart`, {
        description: `From ${restaurantName}`
      });
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="h-full w-full object-cover" 
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium line-clamp-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-medium">${item.price.toFixed(2)}</span>
            <Button
              size="sm"
              variant={isInCart ? "secondary" : "outline"}
              className={`mt-1 transition-all duration-300 ${isInCart ? 'bg-gray-100 text-gray-900' : ''}`}
              onClick={handleAddToCart}
              disabled={isAdding || isInCart}
            >
              {isInCart ? (
                <><Check className="mr-1 h-4 w-4" /> Added</>
              ) : (
                <><Plus className="mr-1 h-4 w-4" /> Add</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;
