import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/admin/orders");
      const data = await res.json();
      // Sort by newest first
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8081/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error("Failed to update status");

      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: "default",
      PREPARING: "secondary",
      READY: "outline",
      SERVED: "default",
      COMPLETED: "default"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const filteredOrders = filter === "ALL" 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Button 
            onClick={() => navigate("/admin/dashboard")} 
            variant="ghost" 
            className="mb-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-heading font-bold">Order Management</h1>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["ALL", "PENDING", "PREPARING", "READY", "SERVED", "COMPLETED"].map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              variant={filter === status ? "secondary" : "outline"}
              size="sm"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Orders List */}
        <div className="grid gap-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">Order #{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Table: <strong>{order.tableNumber}</strong></p>
                      {order.email && <p>Email: {order.email}</p>}
                      {order.phone && <p>Phone: {order.phone}</p>}
                      <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-secondary">₹{order.totalAmount}</p>
                  </div>
                </div>

                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>₹{(item.unitPrice * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Update Buttons */}
                <div className="flex flex-wrap gap-2">
                  {order.status === "PENDING" && (
                    <Button 
                      onClick={() => updateOrderStatus(order.id, "PREPARING")}
                      variant="secondary"
                      size="sm"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "PREPARING" && (
                    <Button 
                      onClick={() => updateOrderStatus(order.id, "READY")}
                      variant="secondary"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Ready
                    </Button>
                  )}
                  {order.status === "READY" && (
                    <Button 
                      onClick={() => updateOrderStatus(order.id, "SERVED")}
                      variant="secondary"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Served
                    </Button>
                  )}
                  {order.status === "SERVED" && (
                    <Button 
                      onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                      variant="default"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Order
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
