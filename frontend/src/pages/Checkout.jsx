import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], totalPrice = 0, tableNumber: qrTableNumber = "" } = location.state || {};
  
  const [userDetails, setUserDetails] = useState({
    email: "",
    phone: "",
    tableNumber: qrTableNumber || "",
  });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!userDetails.email || !userDetails.phone) {
      toast.error("Please enter both email and phone number");
      return;
    }
    
    if (!userDetails.tableNumber) {
      toast.error("Please select a table number");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userDetails.phone.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      // Create order in backend
      const payload = {
        tableNumber: parseInt(userDetails.tableNumber, 10),
        email: userDetails.email,
        phone: userDetails.phone,
        items: cart.map((it) => ({ menuItemId: it.id, quantity: it.quantity })),
      };

      const res = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create order");
      }

      const order = await res.json();
      
      // Navigate to payment page with order details
      navigate("/payment", { 
        state: { 
          order, 
          userDetails,
          totalPrice 
        } 
      });
      
    } catch (err) {
      toast.error(err.message || "Something went wrong creating your order");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-heading font-bold mb-4">Checkout</h1>
            <p className="text-muted-foreground text-lg">
              Enter your details to complete your order
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* User Details Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-secondary" />
                  Your Details
                </h2>
                
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll send your order confirmation here
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleInputChange}
                      placeholder="9999999999"
                      required
                      className="w-full"
                      maxLength="10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      10-digit mobile number for order updates
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Table Number *
                    </label>
                    {qrTableNumber ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          name="tableNumber"
                          value={userDetails.tableNumber}
                          readOnly
                          className="w-full bg-muted"
                        />
                        <Badge variant="secondary" className="text-sm">
                          From QR Code
                        </Badge>
                      </div>
                    ) : (
                      <select
                        name="tableNumber"
                        value={userDetails.tableNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 rounded-md border border-input bg-background"
                      >
                        <option value="">Select a table</option>
                        {[...Array(15)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Table {i + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="flex gap-4">
                    <Button 
                      type="button"
                      onClick={() => navigate("/order")}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      Back to Menu
                    </Button>
                    <Button 
                      type="submit"
                      size="lg"
                      variant="secondary"
                      className="flex-1"
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-28 shadow-elegant animate-fade-in">
                <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
                
                {cart.length > 0 ? (
                  <>
                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="flex-1">
                            {item.name} <span className="text-muted-foreground">×{item.quantity}</span>
                          </span>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg mb-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-secondary text-2xl">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">No items in cart</p>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
