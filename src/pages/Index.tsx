
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { restaurants, restaurantMenus } from "@/services/data";
import RestaurantCard from "@/components/RestaurantCard";
import Navbar from "@/components/Navbar";
import { Restaurant } from "@/types";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter restaurants and menu items based on search query
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Check if restaurant name or cuisines match search query
    const nameMatches = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cuisineMatches = restaurant.cuisines.some(cuisine => 
      cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Check if any menu items match search query
    const menuMatches = searchQuery.length > 0 ? hasMatchingMenuItems(restaurant.id, searchQuery) : false;
    
    return nameMatches || cuisineMatches || menuMatches;
  });

  // Helper function to check if a restaurant has menu items matching the search query
  const hasMatchingMenuItems = (restaurantId: string, query: string): boolean => {
    const menu = restaurantMenus[restaurantId] || [];
    return menu.some(category => 
      category.items.some(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <section className="mb-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4"
            >
              Discover and order from the best restaurants
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              Find your favorite cuisine and enjoy delicious meals delivered to your door
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-full border-gray-200 shadow-sm focus-visible:ring-gray-200"
              />
            </motion.div>
          </div>
        </section>
        
        <section>
          <div className="max-w-6xl mx-auto">
            {searchQuery.length > 0 && (
              <h2 className="text-2xl font-semibold mb-6">
                Search results for "{searchQuery}"
              </h2>
            )}
            {!searchQuery.length && (
              <h2 className="text-2xl font-semibold mb-6">Restaurants</h2>
            )}
            
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No restaurants or dishes found matching your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant, index) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    index={index}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Taste Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
