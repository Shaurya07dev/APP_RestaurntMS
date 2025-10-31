import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  LogOut,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeMenuItems: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      toast.error("Please login first");
      navigate("/admin/login");
      return;
    }

    setAdminUser(JSON.parse(user));
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // Fetch orders
      const ordersRes = await fetch("http://localhost:8081/api/admin/orders");
      const orders = await ordersRes.json();
      
      // Fetch menu items
      const menuRes = await fetch("http://localhost:8081/api/admin/menu");
      const menuItems = await menuRes.json();

      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);
      const activeItems = menuItems.filter(item => item.active).length;
      const pending = orders.filter(order => order.status === "PENDING").length;

      setStats({
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        activeMenuItems: activeItems,
        pendingOrders: pending
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-secondary-foreground/80">Welcome back, {adminUser.fullName}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-secondary opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">₹{stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Menu Items</p>
                <p className="text-3xl font-bold">{stats.activeMenuItems}</p>
              </div>
              <UtensilsCrossed className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                <p className="text-3xl font-bold">{stats.pendingOrders}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 hover:shadow-elegant transition-all cursor-pointer" onClick={() => navigate("/admin/menu")}>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-secondary/10 rounded-lg">
                <UtensilsCrossed className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-1">Manage Menu</h3>
                <p className="text-muted-foreground">Add, edit, or remove menu items</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-elegant transition-all cursor-pointer" onClick={() => navigate("/admin/orders")}>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-secondary/10 rounded-lg">
                <ShoppingBag className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-1">View Orders</h3>
                <p className="text-muted-foreground">Track and manage customer orders</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
