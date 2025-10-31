-- Seed initial menu items for Postgres (Indian Cuisine)
INSERT INTO menu_items (name, description, price, category, active, created_at) VALUES
 ('Paneer Tikka','Grilled cottage cheese marinated in spices',250.00,'Appetizers',true, NOW()),
 ('Samosa Platter','Crispy pastry filled with spiced potatoes and peas',150.00,'Appetizers',true, NOW()),
 ('Chicken 65','Spicy deep-fried chicken with curry leaves',280.00,'Appetizers',true, NOW()),
 ('Tandoori Mushroom','Clay oven roasted mushrooms with Indian spices',220.00,'Appetizers',true, NOW()),
 ('Butter Chicken','Tender chicken in rich tomato and butter gravy',450.00,'Main Courses',true, NOW()),
 ('Biryani Special','Fragrant basmati rice with marinated meat and spices',380.00,'Main Courses',true, NOW()),
 ('Palak Paneer','Cottage cheese in creamy spinach curry',320.00,'Main Courses',true, NOW()),
 ('Dal Makhani','Black lentils slow-cooked with butter and cream',280.00,'Main Courses',true, NOW()),
 ('Rogan Josh','Aromatic lamb curry with Kashmiri spices',480.00,'Main Courses',true, NOW()),
 ('Malai Kofta','Vegetable dumplings in creamy cashew gravy',340.00,'Main Courses',true, NOW()),
 ('Gulab Jamun','Soft milk dumplings in rose-flavored syrup',120.00,'Desserts',true, NOW()),
 ('Rasmalai','Cottage cheese patties in sweetened milk',140.00,'Desserts',true, NOW()),
 ('Gajar Halwa','Carrot pudding with nuts and cardamom',130.00,'Desserts',true, NOW()),
 ('Kulfi Falooda','Traditional Indian ice cream with vermicelli',150.00,'Desserts',true, NOW()),
 ('Jalebi','Crispy sweet spirals soaked in sugar syrup',100.00,'Desserts',true, NOW()),
 ('Masala Chai','Spiced Indian tea with milk',60.00,'Beverages',true, NOW()),
 ('Mango Lassi','Sweet yogurt drink with mango pulp',120.00,'Beverages',true, NOW()),
 ('Fresh Lime Soda','Refreshing lime drink with soda',80.00,'Beverages',true, NOW()),
 ('Filter Coffee','South Indian style filtered coffee',70.00,'Beverages',true, NOW()),
 ('Rose Sharbat','Traditional rose-flavored drink',90.00,'Beverages',true, NOW());

-- Seed default admin account (username: admin, password: admin123)
INSERT INTO admins (username, password, full_name, email, role, active, created_at) VALUES
 ('admin', 'admin123', 'System Administrator', 'admin@moonlight.com', 'ADMIN', true, NOW())
ON CONFLICT (username) DO NOTHING;
