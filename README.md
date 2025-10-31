# MoonLight Restaurant - Full Stack Application

A modern restaurant ordering system with Spring Boot backend and React frontend.

## Tech Stack

- **Backend**: Spring Boot 3.5.6, Java 17+, PostgreSQL 17
- **Frontend**: React 18, Vite 5, TailwindCSS, shadcn/ui, React Query
- **Database**: PostgreSQL 17.6

## Project Structure

```
MoonLight/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/
│   │   └── com/moonlight/moonlightbackend/
│   │       ├── controller/  # REST controllers
│   │       ├── dto/         # Request/Response DTOs
│   │       ├── model/       # JPA entities
│   │       ├── repository/  # Spring Data repositories
│   │       └── service/     # Business logic
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql         # Seed data
│   └── pom.xml
└── moonlight-order-bliss/   # React frontend
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/           # Route pages
    │   └── lib/             # Utilities
    ├── package.json
    └── vite.config.js
```

## Prerequisites

Install the following tools before running the project:

- **Java 17+** (Java 23 works; Java 17 LTS recommended)
- **Maven 3.9+**
- **PostgreSQL 17+** (server running on port 5432)
- **Node.js 18+ and npm** (Node 22 tested)
- **Git** (optional, for version control)

### Installation Quick Links

- Java: [Adoptium Temurin JDK 17](https://adoptium.net)
- Maven: [Apache Maven](https://maven.apache.org/download.cgi) or `choco install maven`
- PostgreSQL: [PostgreSQL Downloads](https://www.postgresql.org/download/)
- Node.js: [Node.js LTS](https://nodejs.org) or `winget install OpenJS.NodeJS.LTS`

---

## Database Setup

### 1. Verify PostgreSQL is Running

**Windows (PowerShell):**
```powershell
# Check if PostgreSQL service is running
Get-Service -Name postgresql*

# Check port 5432 listener
Get-NetTCPConnection -LocalPort 5432 -State Listen
```

**Linux/macOS:**
```bash
# Check service status
sudo systemctl status postgresql

# Or check port
lsof -i :5432
```

### 2. Create Database and User

Open PostgreSQL shell as superuser:

**Windows:**
```powershell
psql -U postgres -h localhost -P pager=off
```

**Linux/macOS:**
```bash
sudo -u postgres psql
```

Run these SQL commands:

```sql
-- Create database
CREATE DATABASE restaurant_db;

-- Create application user
CREATE USER user2 WITH PASSWORD 'moonlight';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE restaurant_db TO user2;

-- Connect to the database
\c restaurant_db

-- Grant schema privileges
GRANT USAGE, CREATE ON SCHEMA public TO user2;

-- Verify
\l restaurant_db
\du user2

-- Exit
\q
```

### 3. Verify Database Connection

**Windows (PowerShell):**
```powershell
# Set password for this session
$env:PGPASSWORD = "moonlight"

# Test connection
psql -U user2 -h localhost -d restaurant_db -P pager=off -c "SELECT current_user, current_database();"

# Clean up
Remove-Item Env:PGPASSWORD
```

**Linux/macOS:**
```bash
PGPASSWORD=moonlight psql -U user2 -h localhost -d restaurant_db -c "SELECT current_user, current_database();"
```

Expected output:
```
 current_user | current_database 
--------------+------------------
 user2        | restaurant_db
(1 row)
```

### 4. Set Environment Variable (Optional)

The backend defaults to `moonlight` if `DB_PASSWORD` is not set. To persist it:

**Windows (PowerShell as Admin):**
```powershell
[Environment]::SetEnvironmentVariable("DB_PASSWORD", "moonlight", "User")
# Open a NEW PowerShell to load it
```

**Linux/macOS (add to ~/.bashrc or ~/.zshrc):**
```bash
export DB_PASSWORD=moonlight
```

---

## Running the Project

### Backend (Spring Boot)

1. **Navigate to backend directory:**
   ```powershell
   cd c:\Users\shaur\OneDrive\Desktop\MoonLight\backend
   ```

2. **Verify Java and Maven:**
   ```powershell
   java -version
   mvn -v
   ```

3. **Build the project:**
   ```powershell
   mvn clean package -DskipTests
   ```

4. **Run the backend:**
   ```powershell
   # Set DB password for this session (if not set globally)
   $env:DB_PASSWORD = "moonlight"
   
   # Start server
   mvn spring-boot:run
   ```

5. **Verify backend is running:**
   - Server starts on: `http://localhost:8081`
   - Check logs for: `Started DemoApplication in X seconds`
   - Tables created: `menu_items`, `orders`, `order_items`
   - Seed data loaded: 20 menu items

6. **Test API endpoints:**
   
   **Windows (PowerShell):**
   ```powershell
   # Get menu
   Invoke-RestMethod -Uri http://localhost:8081/api/menu -Method GET
   
   # Create order
   $body = @{
       tableNumber = 5
       email = ""
       phone = ""
       items = @(
           @{ menuItemId = 1; quantity = 2 },
           @{ menuItemId = 2; quantity = 1 }
       )
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri http://localhost:8081/api/orders -Method POST -Body $body -ContentType "application/json"
   ```
   
   **Linux/macOS:**
   ```bash
   # Get menu
   curl http://localhost:8081/api/menu
   
   # Create order
   curl -X POST http://localhost:8081/api/orders \
     -H "Content-Type: application/json" \
     -d '{
       "tableNumber": 5,
       "email": "",
       "phone": "",
       "items": [
         {"menuItemId": 1, "quantity": 2},
         {"menuItemId": 2, "quantity": 1}
       ]
     }'
   ```

### Frontend (React + Vite)

1. **Navigate to frontend directory:**
   ```powershell
   cd c:\Users\shaur\OneDrive\Desktop\MoonLight\moonlight-order-bliss
   ```

2. **Verify Node.js and npm:**
   ```powershell
   node -v
   npm -v
   ```

3. **Install dependencies:**
   ```powershell
   npm ci
   ```

4. **Start development server:**
   
   **Windows (PowerShell):**
   ```powershell
   npm.cmd run dev
   ```
   
   **Linux/macOS:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:8081`

---

## Using the Application

### QR Code Flow (Recommended)

1. **Scan QR Code**
   - Customer scans table-specific QR code
   - Redirected to: `http://localhost:8080/order?table=5`
   - Table number automatically captured from URL

2. **Browse Menu**
   - View menu items (fetched from backend API)
   - Filter by category: Appetizers, Main Courses, Desserts, Beverages
   - Add items to cart with quantity controls

3. **Proceed to Checkout**
   - Click **"Proceed to Checkout"**
   - Enter email address
   - Enter 10-digit phone number
   - Table number is pre-filled (from QR code)

4. **Complete Payment**
   - Order is created in database
   - Redirected to payment page
   - Fill payment details (mock payment - Hyperswitch integration pending)
   - Click **"Complete Payment"**
   - Toast notification shows: `Order #<id> confirmed! Payment successful.`
   - Redirects to home page

### Direct Visit Flow (No QR Code)

1. **Visit Menu Page**
   - Navigate to `http://localhost:8080/order`
   - Browse menu and add items to cart

2. **Proceed to Checkout**
   - Click **"Proceed to Checkout"**
   - Enter email address
   - Enter phone number
   - **Manually select table number** from dropdown (1-15)

3. **Complete Payment**
   - Same as QR code flow above

---

## API Endpoints

### Menu
- `GET /api/menu` - List all active menu items

### Orders
- `POST /api/orders` - Create a new order
  ```json
  {
    "tableNumber": 5,
    "email": "guest@example.com",
    "phone": "9999999999",
    "items": [
      { "menuItemId": 1, "quantity": 2 },
      { "menuItemId": 2, "quantity": 1 }
    ]
  }
  ```
- `GET /api/orders/{id}` - Get order by ID

---

## Database Schema

### menu_items
| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id          | BIGINT       | Primary key (auto-increment)   |
| name        | VARCHAR(255) | Item name                      |
| description | VARCHAR(1000)| Item description               |
| price       | DECIMAL(12,2)| Price in dollars               |
| category    | VARCHAR(255) | Category (Appetizers, etc.)    |
| active      | BOOLEAN      | Availability flag              |
| created_at  | TIMESTAMP    | Creation timestamp             |

### orders
| Column       | Type         | Description                    |
|--------------|--------------|--------------------------------|
| id           | BIGINT       | Primary key (auto-increment)   |
| table_number | INTEGER      | Table number (1-15)            |
| email        | VARCHAR(255) | Customer email (optional)      |
| phone        | VARCHAR(32)  | Customer phone (optional)      |
| total_amount | DECIMAL(12,2)| Total order amount             |
| status       | VARCHAR(64)  | Order status (PENDING, etc.)   |
| created_at   | TIMESTAMP    | Order creation time            |

### order_items
| Column       | Type         | Description                    |
|--------------|--------------|--------------------------------|
| id           | BIGINT       | Primary key (auto-increment)   |
| order_id     | BIGINT       | Foreign key to orders          |
| menu_item_id | BIGINT       | Reference to menu item         |
| name         | VARCHAR(255) | Item name (snapshot)           |
| unit_price   | DECIMAL(12,2)| Price at order time            |
| quantity     | INTEGER      | Quantity ordered               |

---

## Troubleshooting

### Backend Issues

**Problem: "password authentication failed for user 'user2'"**
- Verify password: `moonlight`
- Reset password:
  ```sql
  psql -U postgres -h localhost
  ALTER USER user2 WITH PASSWORD 'moonlight';
  ```
- Set `DB_PASSWORD` environment variable

**Problem: "Unable to determine Dialect"**
- Already fixed in `application.properties`
- Verify PostgreSQL driver is in `pom.xml`

**Problem: Port 8081 already in use**
```powershell
# Windows: Stop all Java processes
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force

# Or find and kill specific process
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:8081 | xargs kill -9
```

### Frontend Issues

**Problem: "npm is not recognized" or script policy error**
- Use `npm.cmd` on Windows instead of `npm`
- Or set execution policy:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```

**Problem: Menu not loading**
- Verify backend is running on `http://localhost:8081`
- Check browser console for CORS errors
- Verify `MenuController` has `@CrossOrigin(origins = "http://localhost:8080")`

**Problem: Port 8080 already in use**
```powershell
# Windows
Get-NetTCPConnection -LocalPort 8080 | Select-Object OwningProcess
Stop-Process -Id <PID>

# Linux/macOS
lsof -ti:8080 | xargs kill -9
```

### Database Connection Issues

**Problem: "Connection refused" to PostgreSQL**
- Start PostgreSQL service:
  ```powershell
  # Windows
  Start-Service postgresql-x64-17
  
  # Linux
  sudo systemctl start postgresql
  ```

**Problem: "database does not exist"**
- Re-run database setup SQL commands above

---

## Development Notes

### Backend Configuration
- **Port**: 8081 (configurable in `application.properties`)
- **Database**: PostgreSQL on `localhost:5432`
- **User**: `user2` / `moonlight`
- **JPA**: Auto-creates schema on startup (`ddl-auto=update`)
- **Seed**: `data.sql` runs after schema creation

### Frontend Configuration
- **Port**: 8080 (configurable in `vite.config.js`)
- **API Base**: `http://localhost:8081`
- **CORS**: Allowed for `localhost:8080` in backend controllers

### Future Enhancements
- Payment integration (Hyperswitch sandbox)
- User authentication
- Order status tracking
- Admin dashboard
- Real-time notifications

---

## Quick Start (TL;DR)

```powershell
# 1. Setup database
psql -U postgres -h localhost -P pager=off
# Run SQL commands from "Database Setup" section

# 2. Start backend (in backend/)
cd backend
$env:DB_PASSWORD = "moonlight"
mvn spring-boot:run

# 3. Start frontend (in moonlight-order-bliss/)
cd ..\moonlight-order-bliss
npm.cmd ci
npm.cmd run dev

# 4. Open browser
# http://localhost:8080
```

---

## License

This project is for educational purposes.

## Contact

For issues or questions, contact the development team.
