import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { toast } from "sonner";

const fetchMenu = async () => {
  const res = await fetch("http://localhost:8081/api/menu");
  if (!res.ok) throw new Error("Failed to load menu");
  return res.json();
};

const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  // Extract table number from QR code URL parameter
  useEffect(() => {
    const tableParam = searchParams.get("table");
    if (tableParam) {
      setTableNumber(tableParam);
    }
  }, [searchParams]);

  const { data: menuItems = [], isLoading, isError } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((m) => m.category))).filter(Boolean),
  ];

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    toast.success(`${item.name} added to cart`);
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-heading font-bold mb-4">Our Menu</h1>
            <p className="text-muted-foreground text-lg">Discover our exquisite selection</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all hover:scale-105"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Menu Items */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredItems.map((item, idx) => (
                  <Card 
                    key={item.id} 
                    className="p-6 hover:shadow-elegant transition-all group hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-semibold mb-1">{item.name}</h3>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {item.category}
                        </Badge>
                      </div>
                      <span className="text-xl font-semibold text-secondary">₹{item.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <Button 
                      onClick={() => addToCart(item)} 
                      className="w-full"
                      variant="default"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-28 shadow-elegant animate-fade-in">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="w-6 h-6 text-secondary" />
                  <h2 className="text-2xl font-heading font-bold">Your Order</h2>
                  {totalItems > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {totalItems}
                    </Badge>
                  )}
                </div>

                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex flex-col gap-2 pb-4 border-b">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-8 w-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <span className="ml-auto font-semibold">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-secondary text-2xl">
                          ₹{totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link to="/checkout" state={{ cart, totalPrice, tableNumber }}>
                      <Button 
                        className="w-full" 
                        size="lg"
                        variant="secondary"
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

