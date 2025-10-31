# Admin Dashboard Guide

## Overview

The MoonLight Restaurant Admin Dashboard provides comprehensive management tools for:
- Menu items (Create, Read, Update, Delete)
- Order tracking and status management
- Real-time analytics and statistics

## Access

### Default Credentials
- **URL**: `http://localhost:8080/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

### Security Note
⚠️ **Important**: Change the default password in production! The current implementation uses simple authentication for development purposes. In production, implement:
- BCrypt password hashing
- JWT token authentication
- Session management
- Role-based access control

## Features

### 1. Dashboard (`/admin/dashboard`)

**Statistics Overview:**
- **Total Orders**: Count of all orders in the system
- **Total Revenue**: Sum of all order amounts
- **Active Menu Items**: Number of currently active menu items
- **Pending Orders**: Orders awaiting preparation

**Quick Actions:**
- Navigate to Menu Management
- Navigate to Order Management

### 2. Menu Management (`/admin/menu`)

#### View All Menu Items
- Displays all menu items with:
  - Name, description, price
  - Category badge
  - Active/Inactive status
  - Created timestamp

#### Add New Menu Item
1. Click **"Add New Item"** button
2. Fill in the form:
   - **Name**: Item name (required)
   - **Category**: Select from dropdown (Appetizers, Main Courses, Desserts, Beverages)
   - **Description**: Item description (optional)
   - **Price**: Price in dollars (required, decimal format)
3. Click **"Save Item"**

#### Edit Menu Item
1. Click the **Edit** (pencil) icon on any item
2. Modify the fields
3. Click **"Save"** to update or **"Cancel"** to discard changes

#### Delete Menu Item
1. Click the **Delete** (trash) icon
2. Confirm deletion in the popup
3. Item is permanently removed from database

#### Toggle Active Status
- Click the **Power** icon to toggle item availability
- Inactive items won't appear in customer menu
- Useful for seasonal items or temporary unavailability

### 3. Order Management (`/admin/orders`)

#### View Orders
- All orders displayed in reverse chronological order (newest first)
- Each order shows:
  - Order ID
  - Table number
  - Customer email and phone (if provided)
  - Order items with quantities and prices
  - Total amount
  - Current status
  - Creation timestamp

#### Filter Orders
Filter by status:
- **ALL**: Show all orders
- **PENDING**: New orders awaiting action
- **PREPARING**: Orders being prepared in kitchen
- **READY**: Orders ready to be served
- **SERVED**: Orders delivered to table
- **COMPLETED**: Finished orders

#### Update Order Status
Click the appropriate button to move order through workflow:
1. **PENDING** → Click "Start Preparing" → **PREPARING**
2. **PREPARING** → Click "Mark Ready" → **READY**
3. **READY** → Click "Mark Served" → **SERVED**
4. **SERVED** → Click "Complete Order" → **COMPLETED**

## API Endpoints

### Authentication
```
POST /api/admin/auth/login
Body: { "username": "admin", "password": "admin123" }
Response: { "token": "...", "username": "admin", "fullName": "...", "role": "ADMIN" }
```

### Menu Management
```
GET    /api/admin/menu           - List all menu items
GET    /api/admin/menu/{id}      - Get specific item
POST   /api/admin/menu           - Create new item
PUT    /api/admin/menu/{id}      - Update item
DELETE /api/admin/menu/{id}      - Delete item
PATCH  /api/admin/menu/{id}/toggle - Toggle active status
```

**Create/Update Menu Item Body:**
```json
{
  "name": "Wagyu Ribeye",
  "description": "12oz premium wagyu with seasonal vegetables",
  "price": 89.00,
  "category": "Main Courses",
  "active": true
}
```

### Order Management
```
GET   /api/admin/orders          - List all orders
GET   /api/admin/orders/{id}     - Get specific order
PATCH /api/admin/orders/{id}/status - Update order status
```

**Update Order Status Body:**
```json
{
  "status": "PREPARING"
}
```

**Valid Status Values:**
- PENDING
- PREPARING
- READY
- SERVED
- COMPLETED

## Database Schema

### admins Table
```sql
CREATE TABLE admins (
  id BIGINT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(255) NOT NULL DEFAULT 'ADMIN',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL
);
```

## Workflow Examples

### Daily Operations

**Morning Setup:**
1. Login to admin dashboard
2. Review pending orders from previous day
3. Check menu item availability
4. Disable any out-of-stock items

**During Service:**
1. Monitor new orders in real-time (refresh page)
2. Update order statuses as kitchen prepares items
3. Mark orders as served when delivered

**End of Day:**
1. Review total orders and revenue
2. Complete all served orders
3. Re-enable any temporarily disabled menu items

### Menu Updates

**Adding Seasonal Special:**
1. Go to Menu Management
2. Click "Add New Item"
3. Enter details (e.g., "Pumpkin Soup", "Appetizers", $12)
4. Save item

**Updating Prices:**
1. Find item in menu list
2. Click Edit icon
3. Update price field
4. Save changes

**Removing Discontinued Item:**
1. Find item in menu list
2. Click Delete icon
3. Confirm deletion

## Testing

### Test Menu CRUD Operations

**Create:**
```bash
curl -X POST http://localhost:8081/api/admin/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Dish",
    "description": "Test description",
    "price": 25.00,
    "category": "Main Courses",
    "active": true
  }'
```

**Read All:**
```bash
curl http://localhost:8081/api/admin/menu
```

**Update:**
```bash
curl -X PUT http://localhost:8081/api/admin/menu/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Dish",
    "price": 30.00
  }'
```

**Delete:**
```bash
curl -X DELETE http://localhost:8081/api/admin/menu/1
```

### Test Order Management

**Get All Orders:**
```bash
curl http://localhost:8081/api/admin/orders
```

**Update Order Status:**
```bash
curl -X PATCH http://localhost:8081/api/admin/orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "PREPARING"}'
```

## Troubleshooting

### Cannot Login
- Verify backend is running on port 8081
- Check browser console for errors
- Ensure database has admin user seeded
- Verify credentials: `admin` / `admin123`

### Menu Items Not Updating
- Check browser console for API errors
- Verify CORS is enabled in backend controllers
- Ensure database connection is active

### Orders Not Loading
- Refresh the page (no auto-refresh implemented yet)
- Check backend logs for errors
- Verify order data exists in database

## Future Enhancements

### Planned Features
- [ ] Real-time order updates (WebSocket)
- [ ] Sales analytics and charts
- [ ] Export reports (PDF/CSV)
- [ ] Inventory management
- [ ] Staff user management
- [ ] Email notifications for new orders
- [ ] Kitchen display system
- [ ] Table management
- [ ] Reservation system integration
- [ ] Customer feedback tracking

### Security Improvements
- [ ] Implement BCrypt password hashing
- [ ] Add JWT token authentication
- [ ] Session timeout and refresh
- [ ] Role-based permissions (Admin, Staff, Manager)
- [ ] Audit logging
- [ ] Two-factor authentication
- [ ] IP whitelisting for admin access

## Support

For issues or questions:
1. Check browser console for errors
2. Review backend logs
3. Verify database connectivity
4. Check API endpoint responses

## Quick Reference

| Action | Route | Method |
|--------|-------|--------|
| Login | `/api/admin/auth/login` | POST |
| List Menu | `/api/admin/menu` | GET |
| Add Menu Item | `/api/admin/menu` | POST |
| Update Menu Item | `/api/admin/menu/{id}` | PUT |
| Delete Menu Item | `/api/admin/menu/{id}` | DELETE |
| Toggle Item Status | `/api/admin/menu/{id}/toggle` | PATCH |
| List Orders | `/api/admin/orders` | GET |
| Get Order | `/api/admin/orders/{id}` | GET |
| Update Order Status | `/api/admin/orders/{id}/status` | PATCH |

## Default Admin Account

**Created automatically on first run:**
- Username: `admin`
- Password: `admin123`
- Full Name: `System Administrator`
- Email: `admin@moonlight.com`
- Role: `ADMIN`

**⚠️ SECURITY WARNING**: Change this password immediately in production!
