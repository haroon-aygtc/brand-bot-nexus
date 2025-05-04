
#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up AI Chat System (React Frontend + Laravel Backend)${NC}"

# Frontend setup
echo -e "\n${GREEN}Setting up Frontend...${NC}"
npm install
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Backend setup
echo -e "\n${GREEN}Setting up Backend...${NC}"
cd backend

# Check if Docker is installed
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}Docker and Docker Compose are installed. Setting up with Docker...${NC}"
    
    # Copy environment file
    cp .env.example .env
    
    # Update database settings for Docker
    sed -i 's/DB_HOST=127.0.0.1/DB_HOST=db/g' .env
    sed -i 's/DB_DATABASE=laravel/DB_DATABASE=laravel/g' .env
    sed -i 's/DB_USERNAME=root/DB_USERNAME=laravel/g' .env
    sed -i 's/DB_PASSWORD=/DB_PASSWORD=secret/g' .env
    
    # Start Docker services
    docker-compose up -d
    
    # Wait for containers to be ready
    echo -e "${YELLOW}Waiting for containers to start...${NC}"
    sleep 10
    
    # Run migrations inside Docker container
    docker-compose exec app php artisan key:generate
    docker-compose exec app php artisan migrate
    
    echo -e "${GREEN}Backend is running at http://localhost:8000${NC}"
else
    echo -e "${YELLOW}Docker not found. Setting up for local development...${NC}"
    
    # Check if Composer is installed
    if command -v composer &> /dev/null; then
        # Copy environment file
        cp .env.example .env
        
        # Install dependencies
        composer install
        
        # Generate application key
        php artisan key:generate
        
        echo -e "${YELLOW}Please update your .env file with your database credentials${NC}"
        echo -e "${YELLOW}Then run: php artisan migrate${NC}"
        echo -e "${YELLOW}To start the server: php artisan serve${NC}"
    else
        echo -e "${YELLOW}Composer not found. Please install Composer and follow the setup instructions in the README.${NC}"
    fi
fi

cd ..

echo -e "\n${GREEN}Setup completed!${NC}"
echo -e "${YELLOW}To start the frontend: npm run dev${NC}"
echo -e "${YELLOW}The backend should be running at: http://localhost:8000${NC}"
echo -e "${YELLOW}The frontend should be accessible at: http://localhost:5173${NC}"
