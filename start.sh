#!/bin/bash

check_mongo_uri() {
    if [ -z "$MONGO_URI" ]; then
        echo "MONGO_URI is not provided."
        exit 1
    fi
    if [[ $MONGO_URI != mongodb+srv://* ]]; then
        echo "Invalid MONGO_URI. It should start with 'mongodb+srv://'."
        exit 1
    fi
}

check_jwt_key() {
    if [ -z "$JWT_KEY" ]; then
        echo "JWT_KEY is not provided."
        exit 1
    fi
}

read -p "Enter MONGO_URI: " MONGO_URI
read -p "Enter JWT_KEY: " JWT_KEY

check_mongo_uri
check_jwt_key

echo "MONGO_URI='$MONGO_URI'" > .env
echo "JWT_KEY='$JWT_KEY'" >> .env

echo ".env file created successfully."
npm install
npm start
