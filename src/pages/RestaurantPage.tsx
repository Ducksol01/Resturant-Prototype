
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getMenuByRestaurantId, getRestaurantById } from "@/services/data";
import { MenuCategory } from "@/types";
import MenuItem from "@/components/MenuItem";
import Navbar from "@/components/Navbar";

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(id ? getRestaurantById(id) : null);
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  
  useEffect(() => {
    if (id) {
      const restaurantData = getRestaurantById(id);
      if (restaurantData) {
        setRestaurant(restaurantData);
        setMenu(getMenuByRestaurantId(id));
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden mb-8 bg-white border border-gray-100 shadow-sm"
          >
            <div 
              className="h-56 sm:h-64 md:h-80 bg-cover bg-center" 
              style={{ backgroundImage: `url(${restaurant.image})` }}
            />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                  <p className="text-gray-600 mt-2">{restaurant.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-5 w-5 fill-amber-400 stroke-amber-400" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-5 w-5" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-5 w-5" />
                      <span>{restaurant.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {restaurant.cuisines.map((cuisine) => (
                      <Badge key={cuisine} variant="secondary" className="bg-gray-100">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <Tabs defaultValue={menu.length > 0 ? menu[0].id : undefined} className="mt-8">
            <div className="sticky top-16 z-10 bg-gray-50 pt-2 pb-4">
              <h2 className="text-2xl font-semibold mb-4">Menu</h2>
              <TabsList className="w-full h-auto flex flex-nowrap overflow-x-auto bg-transparent p-0 space-x-4">
                {menu.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="h-10 flex-shrink-0 rounded-full data-[state=active]:bg-gray-900 data-[state=active]:text-white px-4"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="mt-4 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              {menu.map((category) => (
                <TabsContent key={category.id} value={category.id} className="p-0 m-0">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                    <Separator className="mb-4" />
                    <div className="space-y-3">
                      {category.items.map((item, index) => (
                        <MenuItem 
                          key={item.id} 
                          item={item}
                          restaurantName={restaurant.name}
                          restaurantId={restaurant.id}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default RestaurantPage;
