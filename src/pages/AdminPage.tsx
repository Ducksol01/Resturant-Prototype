
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Edit, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { restaurants, getMenuByRestaurantId } from "@/services/data";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Restaurant, MenuItem, MenuCategory } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("restaurants");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Restaurant>>({});
  const [currentMenu, setCurrentMenu] = useState<MenuCategory[]>([]);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  
  const handleEditClick = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    setEditFormData({...restaurant});
    setIsEditDialogOpen(true);
  };

  const handleManageMenuClick = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    setCurrentMenu(getMenuByRestaurantId(restaurant.id));
    setIsMenuDialogOpen(true);
  };

  const handleEditMenuItemClick = (menuItem: MenuItem) => {
    setEditingMenuItem({...menuItem});
    setIsItemDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleMenuItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingMenuItem) {
      setEditingMenuItem({
        ...editingMenuItem,
        [name]: name === "price" ? parseFloat(value) : value,
      });
    }
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cuisines = e.target.value.split(',').map(cuisine => cuisine.trim());
    setEditFormData({
      ...editFormData,
      cuisines,
    });
  };

  const handleSave = () => {
    // In a real app, this would update the database
    // Here we're just showing a success message
    toast.success(`Restaurant "${editFormData.name}" updated successfully!`);
    setIsEditDialogOpen(false);
  };

  const handleSaveMenuItem = () => {
    if (!editingMenuItem) return;
    
    // In a real app, this would update the database
    // Here we're just showing a success message
    toast.success(`Menu item "${editingMenuItem.name}" updated successfully!`);
    setIsItemDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome, Admin</p>
          </div>
          
          <Tabs 
            defaultValue="restaurants" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="restaurants" className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Restaurant Management</h2>
                  <Button>Add Restaurant</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Cuisine</th>
                        <th className="text-left py-3 px-4">Rating</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurants.map((restaurant) => (
                        <tr key={restaurant.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{restaurant.name}</td>
                          <td className="py-3 px-4">{restaurant.cuisines.join(", ")}</td>
                          <td className="py-3 px-4">{restaurant.rating}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditClick(restaurant)}
                              >
                                <Edit className="mr-1 h-4 w-4" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleManageMenuClick(restaurant)}
                              >
                                <UtensilsCrossed className="mr-1 h-4 w-4" />
                                Menu
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-6">Order Management</h2>
                <p className="text-center py-8 text-gray-500">No orders to display</p>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-6">User Management</h2>
                <p className="text-center py-8 text-gray-500">No users to display</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Restaurant Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Restaurant</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editFormData.name || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                value={editFormData.image || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cuisines" className="text-right">
                Cuisines
              </Label>
              <Input
                id="cuisines"
                name="cuisines"
                value={editFormData.cuisines?.join(', ') || ''}
                onChange={handleCuisineChange}
                placeholder="Italian, Pizza, etc."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                value={editFormData.rating || ''}
                onChange={handleInputChange}
                className="col-span-3"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryTime" className="text-right">
                Delivery Time
              </Label>
              <Input
                id="deliveryTime"
                name="deliveryTime"
                value={editFormData.deliveryTime || ''}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="20-30 min"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={editFormData.address || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restaurant Menu Dialog */}
      <Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Menu - {currentRestaurant?.name}</DialogTitle>
            <DialogDescription>
              Edit menu items for this restaurant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {currentMenu.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Name</th>
                        <th className="text-left py-2 px-3">Description</th>
                        <th className="text-left py-2 px-3">Price</th>
                        <th className="text-left py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{item.name}</td>
                          <td className="py-2 px-3 text-sm max-w-xs truncate">{item.description}</td>
                          <td className="py-2 px-3">${item.price.toFixed(2)}</td>
                          <td className="py-2 px-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditMenuItemClick(item)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsMenuDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Menu Item Edit Dialog */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                Name
              </Label>
              <Input
                id="item-name"
                name="name"
                value={editingMenuItem?.name || ''}
                onChange={handleMenuItemInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-description" className="text-right">
                Description
              </Label>
              <Input
                id="item-description"
                name="description"
                value={editingMenuItem?.description || ''}
                onChange={handleMenuItemInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-price" className="text-right">
                Price
              </Label>
              <Input
                id="item-price"
                name="price"
                type="number"
                value={editingMenuItem?.price || ''}
                onChange={handleMenuItemInputChange}
                className="col-span-3"
                min="0"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-image" className="text-right">
                Image URL
              </Label>
              <Input
                id="item-image"
                name="image"
                value={editingMenuItem?.image || ''}
                onChange={handleMenuItemInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-category" className="text-right">
                Category
              </Label>
              <Input
                id="item-category"
                name="category"
                value={editingMenuItem?.category || ''}
                onChange={handleMenuItemInputChange}
                className="col-span-3"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveMenuItem}>Save Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
