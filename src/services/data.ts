
import { Restaurant, MenuCategory } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Sakura Japanese",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
    cuisines: ["Japanese", "Sushi", "Asian"],
    rating: 4.8,
    deliveryTime: "25-35 min",
    address: "123 Maple Street, San Francisco",
    description: "Authentic Japanese cuisine with the freshest ingredients. Our expert chefs prepare each dish with traditional techniques and modern presentation."
  },
  {
    id: "2",
    name: "Trattoria Milano",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1000&auto=format&fit=crop",
    cuisines: ["Italian", "Pasta", "Pizza"],
    rating: 4.6,
    deliveryTime: "20-30 min",
    address: "456 Oak Avenue, San Francisco",
    description: "Family-owned Italian restaurant serving homemade pasta, wood-fired pizza, and traditional recipes passed down through generations."
  },
  {
    id: "3",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    cuisines: ["Indian", "Curry", "Vegetarian"],
    rating: 4.7,
    deliveryTime: "30-40 min",
    address: "789 Pine Boulevard, San Francisco",
    description: "Experience the rich flavors of India with our authentic curries, tandoori specialties, and freshly baked naan bread."
  },
  {
    id: "4",
    name: "Burger & Brew",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop",
    cuisines: ["American", "Burgers", "Craft Beer"],
    rating: 4.5,
    deliveryTime: "15-25 min",
    address: "101 Cedar Road, San Francisco",
    description: "Gourmet burgers made with locally-sourced ingredients and paired with craft beers from local breweries."
  },
  {
    id: "5",
    name: "El Mariachi",
    image: "https://images.unsplash.com/photo-1653335908218-9c033fad8427?q=80&w=1000&auto=format&fit=crop",
    cuisines: ["Mexican", "Tacos", "Tequila"],
    rating: 4.4,
    deliveryTime: "20-35 min",
    address: "202 Birch Lane, San Francisco",
    description: "Vibrant Mexican cantina offering street-style tacos, fresh guacamole, and margaritas made with premium tequilas."
  },
  {
    id: "6",
    name: "Golden Dragon",
    image: "https://images.unsplash.com/photo-1552526881-721ce8509abb?q=80&w=1000&auto=format&fit=crop",
    cuisines: ["Chinese", "Dim Sum", "Noodles"],
    rating: 4.3,
    deliveryTime: "25-40 min",
    address: "303 Walnut Street, San Francisco",
    description: "Traditional Chinese restaurant specializing in hand-pulled noodles, dim sum, and wok-fried specialties from various regions of China."
  }
];

export const restaurantMenus: Record<string, MenuCategory[]> = {
  "1": [
    {
      id: "cat1",
      name: "Sushi & Sashimi",
      items: [
        {
          id: "s1",
          name: "Assorted Sashimi",
          description: "Chef's selection of fresh fish slices (salmon, tuna, yellowtail)",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1584583570840-0a3d88497593?q=80&w=500&auto=format&fit=crop",
          category: "Sushi & Sashimi"
        },
        {
          id: "s2",
          name: "Salmon Nigiri (2 pcs)",
          description: "Fresh salmon on hand-pressed rice",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1648146299568-28dbd2cd00ab?q=80&w=500&auto=format&fit=crop",
          category: "Sushi & Sashimi"
        },
        {
          id: "s3",
          name: "Dragon Roll",
          description: "Eel, avocado, cucumber topped with avocado and eel sauce",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1635530043255-eb163c479253?q=80&w=500&auto=format&fit=crop",
          category: "Sushi & Sashimi"
        }
      ]
    },
    {
      id: "cat2",
      name: "Main Dishes",
      items: [
        {
          id: "m1",
          name: "Teriyaki Chicken",
          description: "Grilled chicken with teriyaki sauce, served with rice and vegetables",
          price: 18.99,
          image: "https://images.unsplash.com/photo-1598514983318-2f64f55639e0?q=80&w=500&auto=format&fit=crop",
          category: "Main Dishes"
        },
        {
          id: "m2",
          name: "Beef Sukiyaki",
          description: "Thinly sliced beef with vegetables in a sweet soy broth",
          price: 22.99,
          image: "https://plus.unsplash.com/premium_photo-1664648063589-89da478baa25?q=80&w=500&auto=format&fit=crop",
          category: "Main Dishes"
        },
        {
          id: "m3",
          name: "Vegetable Tempura",
          description: "Assorted vegetables in a light, crispy batter",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1631932793415-2567ff4599a7?q=80&w=500&auto=format&fit=crop",
          category: "Main Dishes"
        }
      ]
    },
    {
      id: "cat3",
      name: "Sides & Appetizers",
      items: [
        {
          id: "a1",
          name: "Miso Soup",
          description: "Traditional Japanese soup with tofu and seaweed",
          price: 3.99,
          image: "https://images.unsplash.com/photo-1530469012268-ef4aeec3da18?q=80&w=500&auto=format&fit=crop",
          category: "Sides & Appetizers"
        },
        {
          id: "a2",
          name: "Edamame",
          description: "Steamed soybeans with sea salt",
          price: 5.99,
          image: "https://images.unsplash.com/photo-1593001867410-ee84e2ccc818?q=80&w=500&auto=format&fit=crop",
          category: "Sides & Appetizers"
        },
        {
          id: "a3",
          name: "Gyoza (6 pcs)",
          description: "Pan-fried dumplings filled with pork and vegetables",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1633478062482-617d2ae11fd4?q=80&w=500&auto=format&fit=crop",
          category: "Sides & Appetizers"
        }
      ]
    }
  ],
  "2": [
    {
      id: "cat1",
      name: "Pasta",
      items: [
        {
          id: "p1",
          name: "Spaghetti Carbonara",
          description: "Classic pasta with pancetta, eggs, pecorino cheese, and black pepper",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500&auto=format&fit=crop",
          category: "Pasta"
        },
        {
          id: "p2",
          name: "Fettuccine Alfredo",
          description: "Fresh pasta with creamy parmesan sauce",
          price: 15.99,
          image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=500&auto=format&fit=crop",
          category: "Pasta"
        },
        {
          id: "p3",
          name: "Lasagna",
          description: "Layered pasta with beef ragù, béchamel, and cheese",
          price: 18.99,
          image: "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=500&auto=format&fit=crop",
          category: "Pasta"
        }
      ]
    },
    {
      id: "cat2",
      name: "Pizza",
      items: [
        {
          id: "pz1",
          name: "Margherita",
          description: "San Marzano tomatoes, mozzarella, fresh basil, and olive oil",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop",
          category: "Pizza"
        },
        {
          id: "pz2",
          name: "Quattro Formaggi",
          description: "Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1595854341625-f33e09b6a29c?q=80&w=500&auto=format&fit=crop",
          category: "Pizza"
        },
        {
          id: "pz3",
          name: "Prosciutto & Arugula",
          description: "Mozzarella, prosciutto di Parma, arugula, and shaved parmesan",
          price: 17.99,
          image: "https://images.unsplash.com/photo-1617343267017-e344bdc7e538?q=80&w=500&auto=format&fit=crop",
          category: "Pizza"
        }
      ]
    },
    {
      id: "cat3",
      name: "Appetizers",
      items: [
        {
          id: "a1",
          name: "Bruschetta",
          description: "Toasted bread topped with tomatoes, garlic, and basil",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=500&auto=format&fit=crop",
          category: "Appetizers"
        },
        {
          id: "a2",
          name: "Caprese Salad",
          description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1608032077018-c9aad9565d29?q=80&w=500&auto=format&fit=crop",
          category: "Appetizers"
        },
        {
          id: "a3",
          name: "Calamari Fritti",
          description: "Crispy fried calamari with marinara sauce and lemon",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1576007473726-204f08359155?q=80&w=500&auto=format&fit=crop",
          category: "Appetizers"
        }
      ]
    }
  ],
  "3": [
    {
      id: "cat1",
      name: "Curries",
      items: [
        {
          id: "c1",
          name: "Butter Chicken",
          description: "Chicken in a rich, creamy tomato sauce with butter and spices",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=500&auto=format&fit=crop",
          category: "Curries"
        },
        {
          id: "c2",
          name: "Palak Paneer",
          description: "Cottage cheese cubes in a spinach gravy with spices",
          price: 15.99,
          image: "https://images.unsplash.com/photo-1668236867770-702f6ddf4539?q=80&w=500&auto=format&fit=crop",
          category: "Curries"
        },
        {
          id: "c3",
          name: "Lamb Vindaloo",
          description: "Spicy curry with tender lamb in a tangy sauce",
          price: 18.99,
          image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=500&auto=format&fit=crop",
          category: "Curries"
        }
      ]
    },
    {
      id: "cat2",
      name: "Tandoori",
      items: [
        {
          id: "t1",
          name: "Tandoori Chicken",
          description: "Chicken marinated in yogurt and spices, cooked in a clay oven",
          price: 17.99,
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=500&auto=format&fit=crop",
          category: "Tandoori"
        },
        {
          id: "t2",
          name: "Seekh Kebab",
          description: "Minced meat skewers with herbs and spices",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1600023722999-e96f729ecd51?q=80&w=500&auto=format&fit=crop",
          category: "Tandoori"
        },
        {
          id: "t3",
          name: "Paneer Tikka",
          description: "Marinated cottage cheese cubes cooked in a tandoor",
          price: 15.99,
          image: "https://images.unsplash.com/photo-1567188040759-fb8a6a73e5d2?q=80&w=500&auto=format&fit=crop",
          category: "Tandoori"
        }
      ]
    },
    {
      id: "cat3",
      name: "Breads & Sides",
      items: [
        {
          id: "b1",
          name: "Garlic Naan",
          description: "Leavened bread with garlic and butter",
          price: 3.99,
          image: "https://images.unsplash.com/photo-1596956470007-2bf6095e7e16?q=80&w=500&auto=format&fit=crop",
          category: "Breads & Sides"
        },
        {
          id: "b2",
          name: "Vegetable Biryani",
          description: "Fragrant rice dish with vegetables and aromatic spices",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500&auto=format&fit=crop",
          category: "Breads & Sides"
        },
        {
          id: "b3",
          name: "Raita",
          description: "Yogurt with cucumbers, mint, and spices",
          price: 4.99,
          image: "https://images.unsplash.com/photo-1589116215257-bd4bf311b31c?q=80&w=500&auto=format&fit=crop",
          category: "Breads & Sides"
        }
      ]
    }
  ],
  "4": [
    {
      id: "cat1",
      name: "Signature Burgers",
      items: [
        {
          id: "b1",
          name: "Classic Cheeseburger",
          description: "Angus beef patty with cheddar, lettuce, tomato, and special sauce",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
          category: "Signature Burgers"
        },
        {
          id: "b2",
          name: "Bacon Avocado Burger",
          description: "Beef patty with bacon, avocado, Swiss cheese, and chipotle mayo",
          price: 15.99,
          image: "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=500&auto=format&fit=crop",
          category: "Signature Burgers"
        },
        {
          id: "b3",
          name: "Mushroom Swiss Burger",
          description: "Beef patty with sautéed mushrooms, Swiss cheese, and truffle aioli",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=500&auto=format&fit=crop",
          category: "Signature Burgers"
        }
      ]
    },
    {
      id: "cat2",
      name: "Sides",
      items: [
        {
          id: "s1",
          name: "Truffle Parmesan Fries",
          description: "Crispy fries with truffle oil and parmesan cheese",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop",
          category: "Sides"
        },
        {
          id: "s2",
          name: "Onion Rings",
          description: "Beer-battered onion rings with sriracha dipping sauce",
          price: 5.99,
          image: "https://images.unsplash.com/photo-1639024471283-03bce9a7ba64?q=80&w=500&auto=format&fit=crop",
          category: "Sides"
        },
        {
          id: "s3",
          name: "Mac & Cheese",
          description: "Creamy three-cheese blend with toasted breadcrumbs",
          price: 7.99,
          image: "https://images.unsplash.com/photo-1543339494-b4cd1c1e4e52?q=80&w=500&auto=format&fit=crop",
          category: "Sides"
        }
      ]
    },
    {
      id: "cat3",
      name: "Craft Beers",
      items: [
        {
          id: "dr1",
          name: "IPA Draft",
          description: "Local hoppy IPA with citrus notes (16oz)",
          price: 7.99,
          image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=500&auto=format&fit=crop",
          category: "Craft Beers"
        },
        {
          id: "dr2",
          name: "Amber Ale",
          description: "Medium-bodied ale with caramel undertones (16oz)",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1523567830207-96731740fa71?q=80&w=500&auto=format&fit=crop",
          category: "Craft Beers"
        },
        {
          id: "dr3",
          name: "Craft Cider",
          description: "Dry apple cider with crisp finish (16oz)",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1620219365994-f443a86565b2?q=80&w=500&auto=format&fit=crop",
          category: "Craft Beers"
        }
      ]
    }
  ],
  "5": [
    {
      id: "cat1",
      name: "Tacos & Burritos",
      items: [
        {
          id: "t1",
          name: "Street Tacos (3)",
          description: "Corn tortillas with carne asada, cilantro, onions, and salsa",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500&auto=format&fit=crop",
          category: "Tacos & Burritos"
        },
        {
          id: "t2",
          name: "Fish Tacos (2)",
          description: "Grilled fish with cabbage slaw and chipotle crema",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1611250188496-e966043a0629?q=80&w=500&auto=format&fit=crop",
          category: "Tacos & Burritos"
        },
        {
          id: "t3",
          name: "Burrito Grande",
          description: "Flour tortilla filled with rice, beans, cheese, and your choice of meat",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=500&auto=format&fit=crop",
          category: "Tacos & Burritos"
        }
      ]
    },
    {
      id: "cat2",
      name: "Appetizers",
      items: [
        {
          id: "a1",
          name: "Nachos Supreme",
          description: "Tortilla chips with cheese, beans, jalapeños, guacamole, and sour cream",
          price: 10.99,
          image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?q=80&w=500&auto=format&fit=crop",
          category: "Appetizers"
        },
        {
          id: "a2",
          name: "Guacamole & Chips",
          description: "Freshly made guacamole with house-fried tortilla chips",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1591299177061-2151e53fcaea?q=80&w=500&auto=format&fit=crop",
          category: "Appetizers"
        },
        {
          id: "a3",
          name: "Queso Fundido",
          description: "Melted cheese with chorizo and flour tortillas",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1550901542-9b3ca5b5e29d?q=80&w=500&auto=format&fit=crop",
          category: "Appetizers"
        }
      ]
    },
    {
      id: "cat3",
      name: "Margaritas & Drinks",
      items: [
        {
          id: "d1",
          name: "Classic Margarita",
          description: "Tequila, triple sec, and lime juice with salt rim",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1578664783293-38ef06ab8455?q=80&w=500&auto=format&fit=crop",
          category: "Margaritas & Drinks"
        },
        {
          id: "d2",
          name: "Mango Margarita",
          description: "Classic margarita with mango puree",
          price: 10.99,
          image: "https://images.unsplash.com/photo-1655269043760-3c606e41e376?q=80&w=500&auto=format&fit=crop",
          category: "Margaritas & Drinks"
        },
        {
          id: "d3",
          name: "Horchata",
          description: "Traditional rice and cinnamon beverage (non-alcoholic)",
          price: 4.99,
          image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=500&auto=format&fit=crop",
          category: "Margaritas & Drinks"
        }
      ]
    }
  ],
  "6": [
    {
      id: "cat1",
      name: "Dim Sum",
      items: [
        {
          id: "d1",
          name: "Steamed Dumplings (6)",
          description: "Shrimp and pork dumplings steamed to perfection",
          price: 10.99,
          image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=500&auto=format&fit=crop",
          category: "Dim Sum"
        },
        {
          id: "d2",
          name: "Pork Buns (3)",
          description: "Fluffy steamed buns filled with BBQ pork",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=500&auto=format&fit=crop",
          category: "Dim Sum"
        },
        {
          id: "d3",
          name: "Spring Rolls (4)",
          description: "Crispy rolls filled with vegetables and served with sweet chili sauce",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?q=80&w=500&auto=format&fit=crop",
          category: "Dim Sum"
        }
      ]
    },
    {
      id: "cat2",
      name: "Noodles & Rice",
      items: [
        {
          id: "n1",
          name: "Beef Chow Fun",
          description: "Wide rice noodles stir-fried with beef and bean sprouts",
          price: 15.99,
          image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=500&auto=format&fit=crop",
          category: "Noodles & Rice"
        },
        {
          id: "n2",
          name: "Singapore Noodles",
          description: "Vermicelli rice noodles with curry powder, vegetables, and proteins",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1645665424835-53e3d5468f23?q=80&w=500&auto=format&fit=crop",
          category: "Noodles & Rice"
        },
        {
          id: "n3",
          name: "Yang Zhou Fried Rice",
          description: "Classic fried rice with BBQ pork, shrimp, and vegetables",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500&auto=format&fit=crop",
          category: "Noodles & Rice"
        }
      ]
    },
    {
      id: "cat3",
      name: "Main Dishes",
      items: [
        {
          id: "m1",
          name: "Kung Pao Chicken",
          description: "Spicy stir-fried chicken with peanuts and vegetables",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=500&auto=format&fit=crop",
          category: "Main Dishes"
        },
        {
          id: "m2",
          name: "Mapo Tofu",
          description: "Soft tofu in a spicy sauce with minced pork",
          price: 14.99,
          image: "https://plus.unsplash.com/premium_photo-1678820303376-fb8246b6fb25?q=80&w=500&auto=format&fit=crop",
          category: "Main Dishes"
        },
        {
          id: "m3",
          name: "Peking Duck",
          description: "Roasted duck served with pancakes, cucumber, and hoisin sauce",
          price: 29.99,
          image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=500&auto=format&fit=crop",
          category: "Main Dishes"
        }
      ]
    }
  ]
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getMenuByRestaurantId = (id: string): MenuCategory[] => {
  return restaurantMenus[id] || [];
};
