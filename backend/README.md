
# Laravel Backend for AI Chat System

This is the Laravel backend API for our AI Chat System. It provides APIs for user management, authentication, chat functionality, AI model configuration, and knowledge base management.

## Requirements

- PHP 8.1+
- Composer
- MySQL 5.7+ or MariaDB 10.2+
- Node.js & NPM (for frontend)

## Setup Instructions

1. **Clone the repository** (if you haven't already)

2. **Navigate to the backend directory**
   ```
   cd backend
   ```

3. **Install PHP dependencies**
   ```
   composer install
   ```

4. **Copy the environment file**
   ```
   cp .env.example .env
   ```

5. **Generate application key**
   ```
   php artisan key:generate
   ```

6. **Configure the database**
   
   Edit the `.env` file and update the database connection settings:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

7. **Run migrations to create database tables**
   ```
   php artisan migrate
   ```

8. **Seed the database with initial data (optional)**
   ```
   php artisan db:seed
   ```

9. **Start the development server**
   ```
   php artisan serve
   ```

   The API will be available at http://localhost:8000

## API Documentation

The API follows RESTful conventions with the following resources:

- `/api/auth` - Authentication endpoints (login, register, logout)
- `/api/users` - User management
- `/api/tenants` - Tenant management
- `/api/ai-models` - AI model configuration
- `/api/knowledge-base` - Knowledge base items
- `/api/chats` - Chat conversations and messages

All requests except login and register require authentication with a bearer token.

## Frontend Integration

Make sure to set the correct API URL in your frontend environment:

```
VITE_API_URL=http://localhost:8000/api
```

## Testing

To run tests:
```
php artisan test
```

## Deployment

For production deployment:

1. Ensure your `.env` file is configured for production
2. Run `composer install --optimize-autoloader --no-dev`
3. Configure your web server (Apache/Nginx) to point to the public directory
4. Set up appropriate SSL certificates for HTTPS
5. Configure CORS settings in `config/cors.php` to allow requests from your frontend domain
