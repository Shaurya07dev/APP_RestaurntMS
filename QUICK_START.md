# Quick Start Guide

## Stop Existing Servers

### Stop Backend (Port 8081)
```powershell
# Stop all Java processes
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Stop Frontend (Port 8080)
```powershell
# Stop Node/npm processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

## Start Servers

### 1. Start Backend
```powershell
cd c:\Users\shaur\OneDrive\Desktop\MoonLight\backend
$env:DB_PASSWORD = "moonlight"
mvn spring-boot:run
```

Wait for: `Started DemoApplication in X seconds`

### 2. Start Frontend (New Terminal)
```powershell
cd c:\Users\shaur\OneDrive\Desktop\MoonLight\frontend
npm run dev
```

Wait for: `Local: http://localhost:8080/`

## Test the Application

### Test Admin Dashboard:
1. Open: `http://localhost:8080/admin/login`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. Explore dashboard statistics
4. Navigate to Menu Management
5. Try adding/editing/deleting menu items
6. Navigate to Order Management
7. View and update order statuses

### Test QR Code Flow:
1. Open: `http://localhost:8080/order?table=5`
2. Add items to cart
3. Click "Proceed to Checkout"
4. Verify table number is pre-filled as "5"
5. Enter email: `test@example.com`
6. Enter phone: `9999999999`
7. Click "Proceed to Payment"
8. Fill mock payment details
9. Click "Complete Payment"
10. Verify success toast with Order ID

### Test Direct Visit:
1. Open: `http://localhost:8080/order`
2. Add items to cart
3. Click "Proceed to Checkout"
4. Enter email and phone
5. **Manually select table number** from dropdown
6. Continue to payment and complete

## Verify Backend API

```powershell
# Get menu
Invoke-RestMethod -Uri http://localhost:8081/api/menu -Method GET

# Create test order
$body = @{
    tableNumber = 3
    email = "test@example.com"
    phone = "9999999999"
    items = @(
        @{ menuItemId = 1; quantity = 2 },
        @{ menuItemId = 2; quantity = 1 }
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8081/api/orders -Method POST -Body $body -ContentType "application/json"
```

## Common Issues

### Port 8081 in use
```powershell
Get-Process -Name java | Stop-Process -Force
```

### Port 8080 in use
```powershell
Get-Process -Name node | Stop-Process -Force
```

### Database connection failed
```powershell
# Verify PostgreSQL is running
Get-Service -Name postgresql*

# Test connection
$env:PGPASSWORD = "moonlight"
psql -U user2 -h localhost -d restaurant_db -P pager=off -c "SELECT 1;"
```

### Frontend not loading menu
- Check backend is running on 8081
- Check browser console for errors
- Verify CORS is enabled in backend controllers

## Generate QR Codes

For production, generate QR codes for each table:

**Table 1**: `https://yourrestaurant.com/order?table=1`  
**Table 2**: `https://yourrestaurant.com/order?table=2`  
...  
**Table 15**: `https://yourrestaurant.com/order?table=15`

Use any QR code generator:
- https://www.qr-code-generator.com/
- https://www.the-qrcode-generator.com/
- Or use a library like `qrcode` in Node.js

## Next Steps

1. ✅ Test QR code flow end-to-end
2. ✅ Verify user details are captured
3. ✅ Confirm orders are created in database
4. ⏳ Integrate Juspay Hyperswitch for real payments
5. ⏳ Add order status tracking
6. ⏳ Build admin dashboard
7. ⏳ Implement email/SMS notifications
