import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Check } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order = {}, userDetails = {}, totalPrice = 0 } = location.state || {};
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Mock payment success
    // TODO: Integrate Juspay Hyperswitch payment gateway
    toast.success(`Order #${order.id} confirmed! Payment successful.`);
    
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  };

  if (!order.id) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">No Order Found</h1>
            <p className="text-muted-foreground mb-6">Please start by adding items to your cart.</p>
            <Button onClick={() => navigate("/order")} variant="secondary">
              Go to Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-heading font-bold mb-4">Complete Payment</h1>
            <p className="text-muted-foreground text-lg">
              Secure payment for Order #{order.id}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-secondary" />
                  Payment Information
                </h2>
                
                <div className="mb-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> This is a demo payment form. 
                    Juspay Hyperswitch integration will be added soon for secure payments.
                  </p>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cardholder Name *
                    </label>
                    <Input
                      type="text"
                      name="cardName"
                      value={paymentData.cardName}
                      onChange={handlePaymentChange}
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number *
                    </label>
                    <Input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date *
                      </label>
                      <Input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV *
                      </label>
                      <Input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength="4"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex gap-4">
                    <Button 
                      type="button"
                      onClick={() => navigate("/checkout", { state: location.state })}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      size="lg"
                      variant="secondary"
                      className="flex-1"
                    >
                      Complete Payment
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-28 shadow-elegant animate-fade-in">
                <h2 className="text-2xl font-heading font-bold mb-6">Order Details</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-semibold">#{order.id}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Table:</span>
                    <span className="font-semibold">Table {order.tableNumber}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-semibold text-xs">{userDetails.email}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-semibold">{userDetails.phone}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="font-semibold">{order.items?.length || 0}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg mb-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-secondary text-2xl">
                    ${order.totalAmount?.toFixed(2) || totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-medium">Order Created Successfully</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
