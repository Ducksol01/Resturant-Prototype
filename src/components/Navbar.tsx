
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import AdminLogin from "./AdminLogin";
import CartItems from "./CartItems";

const Navbar = () => {
  const { cartItems, cartTotal } = useCart();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-gray-900">Taste Haven</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Restaurants
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={() => setIsAdminModalOpen(true)} 
            aria-label="Admin Login"
          >
            <User className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white" 
                    variant="secondary"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="mb-4">
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cartItems.length === 0 
                    ? "Your cart is empty" 
                    : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
                </SheetDescription>
              </SheetHeader>
              
              <CartItems />
              
              {cartItems.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <AdminLogin 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
