import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, CreditCard, Check } from "lucide-react";
import { toast } from "sonner";

const TableReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], totalPrice = 0 } = location.state || {};
  
  const [reservationData, setReservationData] = useState({
    tableNumber: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: ""
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const [step, setStep] = useState(1);

  const handleReservationChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleTableSelection = (tableNum) => {
    setReservationData({
      ...reservationData,
      tableNumber: tableNum.toString()
    });
  };

  const proceedToPayment = () => {
    if (!reservationData.tableNumber || !reservationData.date || !reservationData.time) {
      toast.error("Please complete all required reservation details");
      return;
    }
    setStep(2);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!reservationData.tableNumber) {
      toast.error("Please select a table");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    try {
      const payload = {
        tableNumber: parseInt(reservationData.tableNumber, 10),
        email: "",
        phone: "",
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
      toast.success(`Order #${order.id} created. Reservation confirmed.`);
      setTimeout(() => navigate("/"), 1500);
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
            <h1 className="text-5xl font-heading font-bold mb-4">
              {step === 1 ? "Reserve Your Table" : "Complete Payment"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {step === 1 ? "Select your table and provide reservation details" : "Finalize your order and payment"}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 ? (
                <div className="space-y-8">
                  {/* Table Selection */}
                  <Card className="p-8 animate-fade-in">
                    <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                      <Users className="w-6 h-6 text-secondary" />
                      Select Your Table
                    </h2>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleTableSelection(num)}
                          className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                            reservationData.tableNumber === num.toString()
                              ? "border-secondary bg-secondary/10 shadow-glow"
                              : "border-border hover:border-secondary/50"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-heading font-bold mb-1">{num}</div>
                            <div className="text-xs text-muted-foreground">Table</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {reservationData.tableNumber && (
                      <Badge variant="secondary" className="text-sm">
                        <Check className="w-3 h-3 mr-1" />
                        Table {reservationData.tableNumber} selected
                      </Badge>
                    )}
                  </Card>

                  {/* Reservation Details */}
                  <Card className="p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-secondary" />
                      Reservation Details
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Date *
                          </label>
                          <Input
                            type="date"
                            name="date"
                            value={reservationData.date}
                            onChange={handleReservationChange}
                            required
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Time *
                          </label>
                          <Input
                            type="time"
                            name="time"
                            value={reservationData.time}
                            onChange={handleReservationChange}
                            required
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Number of Guests *
                        </label>
                        <select
                          name="guests"
                          value={reservationData.guests}
                          onChange={handleReservationChange}
                          className="w-full p-2 rounded-md border border-input bg-background"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Special Requests or Comments
                        </label>
                        <Textarea
                          name="specialRequests"
                          value={reservationData.specialRequests}
                          onChange={handleReservationChange}
                          placeholder="Allergies, dietary preferences, special occasions..."
                          className="w-full min-h-[120px]"
                        />
                      </div>
                    </div>
                  </Card>

                  <Button 
                    onClick={proceedToPayment}
                    size="lg"
                    className="w-full"
                    variant="secondary"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Payment Form */}
                  <Card className="p-8 animate-fade-in">
                    <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-secondary" />
                      Payment Information
                    </h2>
                    
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

                      <div className="flex gap-4">
                        <Button 
                          type="button"
                          onClick={() => setStep(1)}
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
              )}
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
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm mb-6">No items in cart</p>
                )}

                <div className="space-y-3 mb-6">
                  {reservationData.tableNumber && (
                    <div className="flex justify-between text-sm">
                      <span>Table Number:</span>
                      <span className="font-semibold">Table {reservationData.tableNumber}</span>
                    </div>
                  )}
                  
                  {reservationData.date && (
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span className="font-semibold">{reservationData.date}</span>
                    </div>
                  )}
                  
                  {reservationData.time && (
                    <div className="flex justify-between text-sm">
                      <span>Time:</span>
                      <span className="font-semibold">{reservationData.time}</span>
                    </div>
                  )}
                  
                  {reservationData.guests && (
                    <div className="flex justify-between text-sm">
                      <span>Guests:</span>
                      <span className="font-semibold">{reservationData.guests}</span>
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between text-lg mb-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-secondary text-2xl">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Moon Light Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TableReservation;

