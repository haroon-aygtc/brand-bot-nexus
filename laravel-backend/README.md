
# Laravel Backend for ChatEmbed

This is the Laravel backend for the ChatEmbed application.

## Setup Instructions

1. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```

2. Generate an application key:
   ```
   php artisan key:generate
   ```

3. Configure your database in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=chatgpt_embed
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. Configure AI service credentials in `.env` file (replace with your actual keys):
   ```
   OPENAI_API_KEY=your-openai-key
   ANTHROPIC_API_KEY=your-anthropic-key
   ```

5. Run migrations:
   ```
   php artisan migrate
   ```

6. Start the development server:
   ```
   php artisan serve
   ```

## Development

You can run both frontend and backend together using:

```
cd laravel-backend
npm run full
```

This will start both the Laravel backend and Vite development server for the frontend.

## Frontend Development Without Backend

During initial development, you can run the frontend independently without the backend. The frontend includes mock data services that simulate backend responses for development purposes.

To run the frontend only:

```
# From the project root directory
npm run dev
```

Once your backend is ready, the frontend will automatically connect to it through the configured proxy.

## Troubleshooting

If you encounter issues with Rollup dependencies, try the following:

1. Clear your node_modules and package-lock.json:
   ```
   rm -rf node_modules package-lock.json
   npm install
   ```

2. If using Vite in a Docker environment, ensure the proper platform-specific dependencies are excluded in vite.config.ts.

