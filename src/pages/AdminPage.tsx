
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Edit, UtensilsCrossed, Plus, PlusCircle } from "lucide-react";
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
  const [isAddRestaurantDialogOpen, setIsAddRestaurantDialogOpen] = useState(false);
  const [newRestaurantData, setNewRestaurantData] = useState<Partial<Restaurant>>({
    name: "",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    cuisines: [],
    rating: 4.5,
    deliveryTime: "30-40 min",
    address: "",
    description: ""
  });
  const [isAddMenuCategoryDialogOpen, setIsAddMenuCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddMenuItemDialogOpen, setIsAddMenuItemDialogOpen] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=962&q=80",
    category: ""
  });
  
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

  const handleNewRestaurantInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRestaurantData({
      ...newRestaurantData,
      [name]: value,
    });
  };

  const handleNewRestaurantCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cuisines = e.target.value.split(',').map(cuisine => cuisine.trim());
    setNewRestaurantData({
      ...newRestaurantData,
      cuisines,
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

  const handleNewMenuItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMenuItem({
      ...newMenuItem,
      [name]: name === "price" ? parseFloat(value) : value,
    });
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

  const handleAddRestaurant = () => {
    if (!newRestaurantData.name || !newRestaurantData.address) {
      toast.error("Restaurant name and address are required");
      return;
    }

    // In a real app, this would add to the database
    // Here we're just showing a success message
    const newRestaurant: Restaurant = {
      id: `restaurant-${Date.now()}`, // Generate a unique ID
      name: newRestaurantData.name || "",
      image: newRestaurantData.image || "",
      cuisines: newRestaurantData.cuisines || [],
      rating: newRestaurantData.rating || 4.5,
      deliveryTime: newRestaurantData.deliveryTime || "30-40 min",
      address: newRestaurantData.address || "",
      description: newRestaurantData.description || ""
    };
    
    // In a real app, this would update the database
    // For now, we could add it to our local array (but it won't persist on reload)
    restaurants.push(newRestaurant);
    
    toast.success(`Restaurant "${newRestaurant.name}" added successfully!`);
    setIsAddRestaurantDialogOpen(false);
    
    // Reset form for next time
    setNewRestaurantData({
      name: "",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      cuisines: [],
      rating: 4.5,
      deliveryTime: "30-40 min",
      address: "",
      description: ""
    });
  };

  const handleSaveMenuItem = () => {
    if (!editingMenuItem) return;
    
    // In a real app, this would update the database
    // Here we're just showing a success message
    toast.success(`Menu item "${editingMenuItem.name}" updated successfully!`);
    setIsItemDialogOpen(false);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim() || !currentRestaurant) {
      toast.error("Category name is required");
      return;
    }
    
    // Create a new category
    const newCategory: MenuCategory = {
      id: `category-${Date.now()}`,
      name: newCategoryName,
      items: []
    };
    
    // Add to current menu (would be saved to database in a real app)
    setCurrentMenu([...currentMenu, newCategory]);
    
    toast.success(`Category "${newCategoryName}" added successfully!`);
    setIsAddMenuCategoryDialogOpen(false);
    setNewCategoryName("");
  };

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.category || !currentRestaurant) {
      toast.error("Item name and category are required");
      return;
    }
    
    // Create a new menu item
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: newMenuItem.name || "",
      description: newMenuItem.description || "",
      price: newMenuItem.price || 0,
      image: newMenuItem.image || "",
      category: newMenuItem.category || ""
    };
    
    // Add to current menu category
    const updatedMenu = currentMenu.map(category => {
      if (category.id === newMenuItem.category) {
        return {
          ...category,
          items: [...category.items, newItem]
        };
      }
      return category;
    });
    
    setCurrentMenu(updatedMenu);
    
    toast.success(`Menu item "${newItem.name}" added successfully!`);
    setIsAddMenuItemDialogOpen(false);
    
    // Reset form for next time
    setNewMenuItem({
      name: "",
      description: "",
      price: 0,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=962&q=80",
      category: ""
    });
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
                  <Button onClick={() => setIsAddRestaurantDialogOpen(true)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Restaurant
                  </Button>
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

      {/* Add Restaurant Dialog */}
      <Dialog open={isAddRestaurantDialogOpen} onOpenChange={setIsAddRestaurantDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Restaurant</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Name *
              </Label>
              <Input
                id="new-name"
                name="name"
                value={newRestaurantData.name || ''}
                onChange={handleNewRestaurantInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-image" className="text-right">
                Image URL
              </Label>
              <Input
                id="new-image"
                name="image"
                value={newRestaurantData.image || ''}
                onChange={handleNewRestaurantInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-cuisines" className="text-right">
                Cuisines
              </Label>
              <Input
                id="new-cuisines"
                name="cuisines"
                value={newRestaurantData.cuisines?.join(', ') || ''}
                onChange={handleNewRestaurantCuisineChange}
                placeholder="Italian, Pizza, etc."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-rating" className="text-right">
                Rating
              </Label>
              <Input
                id="new-rating"
                name="rating"
                type="number"
                value={newRestaurantData.rating || ''}
                onChange={handleNewRestaurantInputChange}
                className="col-span-3"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-deliveryTime" className="text-right">
                Delivery Time
              </Label>
              <Input
                id="new-deliveryTime"
                name="deliveryTime"
                value={newRestaurantData.deliveryTime || ''}
                onChange={handleNewRestaurantInputChange}
                className="col-span-3"
                placeholder="20-30 min"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-address" className="text-right">
                Address *
              </Label>
              <Input
                id="new-address"
                name="address"
                value={newRestaurantData.address || ''}
                onChange={handleNewRestaurantInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-description" className="text-right">
                Description
              </Label>
              <Input
                id="new-description"
                name="description"
                value={newRestaurantData.description || ''}
                onChange={handleNewRestaurantInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddRestaurant}>Add Restaurant</Button>
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Menu Categories</h3>
              <div className="flex space-x-2">
                <Button onClick={() => setIsAddMenuCategoryDialogOpen(true)} size="sm">
                  <Plus className="mr-1 h-3 w-3" />
                  Add Category
                </Button>
                <Button onClick={() => setIsAddMenuItemDialogOpen(true)} size="sm">
                  <PlusCircle className="mr-1 h-3 w-3" />
                  Add Menu Item
                </Button>
              </div>
            </div>
            
            {currentMenu.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No menu categories found. Add a category to get started.</p>
            ) : (
              currentMenu.map((category) => (
                <div key={category.id} className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
                  {category.items.length === 0 ? (
                    <p className="text-gray-500 text-sm">No items in this category.</p>
                  ) : (
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
                  )}
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsMenuDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Menu Category Dialog */}
      <Dialog open={isAddMenuCategoryDialogOpen} onOpenChange={setIsAddMenuCategoryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Menu Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-name" className="text-right">
                Category Name
              </Label>
              <Input
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Appetizers, Main Course, Desserts"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Menu Item Dialog */}
      <Dialog open={isAddMenuItemDialogOpen} onOpenChange={setIsAddMenuItemDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Menu Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                Name *
              </Label>
              <Input
                id="item-name"
                name="name"
                value={newMenuItem.name || ''}
                onChange={handleNewMenuItemInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-description" className="text-right">
                Description
              </Label>
              <Input
                id="item-description"
                name="description"
                value={newMenuItem.description || ''}
                onChange={handleNewMenuItemInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-price" className="text-right">
                Price *
              </Label>
              <Input
                id="item-price"
                name="price"
                type="number"
                value={newMenuItem.price || ''}
                onChange={handleNewMenuItemInputChange}
                className="col-span-3"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-image" className="text-right">
                Image URL
              </Label>
              <Input
                id="item-image"
                name="image"
                value={newMenuItem.image || ''}
                onChange={handleNewMenuItemInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-category" className="text-right">
                Category *
              </Label>
              <select
                id="item-category"
                name="category"
                value={newMenuItem.category || ''}
                onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              >
                <option value="">Select a category</option>
                {currentMenu.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddMenuItem}>Add Menu Item</Button>
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

