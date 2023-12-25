**# BCards API with Node.js**

**## Overview**

This Node.js project showcasing my API implementing a login system and a business card creation feature. It covers:

- **API Interactions:**

  - Handling API requests
  - Managing API responses
  - Handling potential errors

- **Login System:**
  - User registration
  - User authentication
  - Secure password storage
- **Business Card Creation:**
  - Validating user input
  - Submitting data to the API
  - Storing card information in database
  - Displaying created business cards

**## Technologies Used**

- Node.js
- Express
- morgan
- mongoose
- JWT
- cors
- bcrypt
- calk

**## API Endpoints**

- **Login:** `POST /api/v1/users/login`
- **Register:** `POST /api/v1/users`
- **User details:** `GET /api/v1/users/:id`
- **All users (Admin Only):** `GET /api/v1/users`
- **Edit user (account owner only):** `PUT /api/v1/users/:id`
- **Change business account status(account owner only):** `PATCH /api/v1/users/:id`
- **Delete user (Admin or account owner only):** `DELETE /api/v1/users/:id`
- **Get all business cards:** `GET /api/v1/cards`
- **Create business card(Business status or Admin account only):** `POST /api/v1/cards`
- **Get all cards created by user (card owner only):** `GET /api/v1/cards/my-cards`
- **Get card by card ID:** `GET /api/v1/cards/:id`
- **Edit card(Admin or account owner only):** `PUT /api/v1/cards/:id`
- **Like a card:** `PATCH /api/v1/cards/:id`
- **Delete a card(Admin or account owner only):** `DELETE /api/v1/cards/:id`

**## Usage**

<h4>Admin credentials</h4>
login: admin@admin.com
password: 123456aA!

1. Register a new user or log in with existing credentials.
2. Access the business card creation form.
3. Fill in the required card information.
4. Submit the form to create a new card.
5. View created business cards.
