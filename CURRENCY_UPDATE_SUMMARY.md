# Currency and Menu Update Summary

## Changes Made

### 1. Currency Changed: $ → ₹ (Indian Rupees)

All prices throughout the application have been updated from USD ($) to INR (₹).

### 2. Menu Items Changed: Western → Indian Cuisine

The entire menu has been replaced with authentic Indian dishes.

## Updated Menu Items

### Appetizers
| Item | Description | Price (₹) |
|------|-------------|-----------|
| Paneer Tikka | Grilled cottage cheese marinated in spices | 250 |
| Samosa Platter | Crispy pastry filled with spiced potatoes and peas | 150 |
| Chicken 65 | Spicy deep-fried chicken with curry leaves | 280 |
| Tandoori Mushroom | Clay oven roasted mushrooms with Indian spices | 220 |

### Main Courses
| Item | Description | Price (₹) |
|------|-------------|-----------|
| Butter Chicken | Tender chicken in rich tomato and butter gravy | 450 |
| Biryani Special | Fragrant basmati rice with marinated meat and spices | 380 |
| Palak Paneer | Cottage cheese in creamy spinach curry | 320 |
| Dal Makhani | Black lentils slow-cooked with butter and cream | 280 |
| Rogan Josh | Aromatic lamb curry with Kashmiri spices | 480 |
| Malai Kofta | Vegetable dumplings in creamy cashew gravy | 340 |

### Desserts
| Item | Description | Price (₹) |
|------|-------------|-----------|
| Gulab Jamun | Soft milk dumplings in rose-flavored syrup | 120 |
| Rasmalai | Cottage cheese patties in sweetened milk | 140 |
| Gajar Halwa | Carrot pudding with nuts and cardamom | 130 |
| Kulfi Falooda | Traditional Indian ice cream with vermicelli | 150 |
| Jalebi | Crispy sweet spirals soaked in sugar syrup | 100 |

### Beverages
| Item | Description | Price (₹) |
|------|-------------|-----------|
| Masala Chai | Spiced Indian tea with milk | 60 |
| Mango Lassi | Sweet yogurt drink with mango pulp | 120 |
| Fresh Lime Soda | Refreshing lime drink with soda | 80 |
| Filter Coffee | South Indian style filtered coffee | 70 |
| Rose Sharbat | Traditional rose-flavored drink | 90 |

## Files Updated

### Backend
- `backend/src/main/resources/data.sql` - Replaced menu seed data with Indian dishes

### Frontend
- `frontend/src/pages/PlaceOrder.jsx` - Updated $ to ₹ (4 locations)
- `frontend/src/pages/Checkout.jsx` - Updated $ to ₹ (2 locations)
- `frontend/src/pages/Payment.jsx` - Updated $ to ₹ (1 location)
- `frontend/src/pages/AdminMenu.jsx` - Updated $ to ₹ (3 locations)
- `frontend/src/pages/AdminOrders.jsx` - Updated $ to ₹ (2 locations)
- `frontend/src/pages/AdminDashboard.jsx` - Updated $ to ₹ (1 location)

## Database Update Required

To apply the new menu items, you need to:

### Option 1: Fresh Database (Recommended)
```sql
-- Drop and recreate tables to reload seed data
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Restart the backend - tables will be recreated with new data
```

### Option 2: Manual Update
```sql
-- Delete existing menu items
DELETE FROM menu_items;

-- Insert new Indian menu items
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
```

## Testing

After updating the database:

1. **Start Backend**:
   ```powershell
   cd backend
   $env:DB_PASSWORD = "moonlight"
   mvn spring-boot:run
   ```

2. **Start Frontend**:
   ```powershell
   cd frontend
   npm run dev
   ```

3. **Test Customer Flow**:
   - Visit: `http://localhost:8080/order`
   - Verify all prices show ₹ symbol
   - Verify Indian menu items are displayed
   - Add items to cart and check totals

4. **Test Admin Dashboard**:
   - Visit: `http://localhost:8080/admin/login`
   - Login with: `admin` / `admin123`
   - Check revenue shows ₹ symbol
   - View menu items - all should be Indian dishes
   - Try adding a new item - price label should show ₹

## Price Ranges

- **Appetizers**: ₹150 - ₹280
- **Main Courses**: ₹280 - ₹480
- **Desserts**: ₹100 - ₹150
- **Beverages**: ₹60 - ₹120

**Average Order Value**: ₹600 - ₹800 (2-3 items)

## Notes

- All prices are in Indian Rupees (₹)
- Prices include GST/taxes
- Menu reflects authentic Indian cuisine
- Categories remain the same: Appetizers, Main Courses, Desserts, Beverages
- Admin functionality unchanged - only display currency updated
- Payment gateway (Juspay Hyperswitch) already configured for INR

## Alignment with Project Plan

This update aligns with the project plan (`plan.txt`) which mentions:
- Juspay HyperSwitch payment gateway (Indian payment processor)
- Default currency INR mentioned in system memory
- Restaurant management system for Indian market

The application is now fully localized for the Indian market with:
- ✅ Indian currency (₹)
- ✅ Indian cuisine menu
- ✅ Indian payment gateway (Juspay - pending integration)
- ✅ Prices appropriate for Indian market
