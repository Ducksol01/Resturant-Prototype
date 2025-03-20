
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Restaurant } from "@/types";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, index }: RestaurantCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <motion.img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-semibold line-clamp-1">{restaurant.name}</h3>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          <div className="mb-2 flex items-center gap-1 text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs">{restaurant.address}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {restaurant.cuisines.map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
