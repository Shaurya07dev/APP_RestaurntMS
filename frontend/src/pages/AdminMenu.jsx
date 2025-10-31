import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Power,
  Save,
  X
} from "lucide-react";
import { toast } from "sonner";

const AdminMenu = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Appetizers",
    active: true
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchMenuItems();
  }, [navigate]);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/admin/menu");
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      toast.error("Failed to load menu items");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to create item");

      toast.success("Menu item added successfully");
      setShowAddForm(false);
      setFormData({ name: "", description: "", price: "", category: "Appetizers", active: true });
      fetchMenuItems();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/api/admin/menu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to update item");

      toast.success("Menu item updated successfully");
      setEditingItem(null);
      fetchMenuItems();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`http://localhost:8081/api/admin/menu/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete item");

      toast.success("Menu item deleted successfully");
      fetchMenuItems();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/api/admin/menu/${id}/toggle`, {
        method: "PATCH"
      });

      if (!res.ok) throw new Error("Failed to toggle status");

      toast.success("Status updated");
      fetchMenuItems();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      active: item.active
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({ name: "", description: "", price: "", category: "Appetizers", active: true });
  };

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
          <h1 className="text-3xl font-heading font-bold">Menu Management</h1>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Add Button */}
        <div className="mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)} variant="secondary" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Add New Menu Item</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md border border-input bg-background"
                  >
                    <option>Appetizers</option>
                    <option>Main Courses</option>
                    <option>Desserts</option>
                    <option>Beverages</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <Input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" variant="secondary">
                  <Save className="w-4 h-4 mr-2" />
                  Save Item
                </Button>
                <Button type="button" onClick={() => setShowAddForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Menu Items List */}
        <div className="grid gap-4">
          {menuItems.map((item) => (
            <Card key={item.id} className="p-6">
              {editingItem === item.id ? (
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(item.id); }} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md border border-input bg-background"
                      >
                        <option>Appetizers</option>
                        <option>Main Courses</option>
                        <option>Desserts</option>
                        <option>Beverages</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (₹)</label>
                    <Input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" variant="secondary" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button type="button" onClick={cancelEdit} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <Badge variant={item.active ? "default" : "secondary"}>
                        {item.active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    <p className="text-2xl font-bold text-secondary">₹{item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleToggleStatus(item.id)} variant="outline" size="sm">
                      <Power className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => startEdit(item)} variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDelete(item.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
