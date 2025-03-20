
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartTotal: 0,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (newItem: CartItem) => {
    // Check if trying to add items from different restaurants
    if (cartItems.length > 0) {
      const currentRestaurant = cartItems[0].restaurantId;
      if (newItem.restaurantId !== currentRestaurant) {
        toast.error("Items from multiple restaurants cannot be added to the same cart", {
          description: "Please complete your current order or clear your cart first."
        });
        return;
      }
    }

    // Check if item already exists, and if so, increase quantity
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.restaurantId === newItem.restaurantId
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }

      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (item: CartItem, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id && cartItem.restaurantId === item.restaurantId
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (cartItem) => 
          !(cartItem.id === item.id && cartItem.restaurantId === item.restaurantId)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
