#!/bin/bash

# Start Laravel server in the background
php artisan serve &
PHP_PID=$!

# Wait for the Laravel server to start
sleep 2

# Change to the front-end directory
cd front-end/

# Run npm development server
npm run dev

# Check if npm run dev was successful
if [ $? -eq 0 ]; then
  echo "Frontend development server started successfully."
else
  echo "Failed to start the frontend development server."
  # Optionally kill the PHP server if the npm run dev fails
  kill $PHP_PID
fi

# Wait for background processes to finish before exiting the script
wait $PHP_PID
