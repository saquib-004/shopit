# ShopIT🛍️

A FullStack MERN E-commerce web application that offers a seamless shopping experience with features such as user authentication, product browsing, cart management, order processing, and payment integration. Leveraging modern web development practices using Redux-Toolkit, our application provides an intuitive user interface while ensuring robust backend functionality for secure data management. With a focus on scalability and maintainability, our project showcases the integration of frontend and backend technologies to deliver a comprehensive e-commerce solution.

## Live Demo🗺️
https://shopit-ys5l.onrender.com

#

Clone the project

```bash
  git clone https://github.com/saquelain/shopit
```

Go to the project directory

```bash
  cd shopit
```
Install dependencies (Frontend)
```bash
  npm install
```

Install dependencies (Frontend)
```bash
  cd frontend
```
```bash
  npm install
```

# Environment Variables🔑

To run this project, you will need to add the following environment variables to your .env file

PORT=

NODE_ENV=

FRONTEND_URL=

DB_URI=

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

JWT_SECRET=

JWT_EXPIRES_TIME=

COOKIE_EXPIRES_TIME=

SMTP_HOST=

SMTP_PORT=

SMTP_EMAIL=

SMTP_PASSWORD=

SMTP_FROM_EMAIL=

SMTP_FROM_NAME=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

#

Start the server (Development Mode)⏯️

```bash
  npm run dev
```
#

Seed Database

Use the following command to put some dummy products in that database. Run it in the root folder.

```bash
  npm run seeder
```

#


# Features
## User Authentication and Authorization:🔐
- Registration and login functionality.
- Password reset and email verification.
- Role-based access control for users and administrators.
## User Profile Management:🤵
- Ability for users to update their profile information.
- Upload and manage user avatars.
## Product Management:📦
- CRUD operations for products (Create, Read, Update, Delete).
- Image upload and management for product images.
- Product reviews and ratings.
## Order Management:📰
- Creating new orders.
- Viewing and managing user-specific orders.
- Admin dashboard for managing all orders.
## Payment Integration:🤑
- Integration with a payment gateway (Stripe) for checkout and payment processing.
- Handling webhook events for successful order completion.
## Admin Panel:💹
- Access to an administrative dashboard with privileges to manage users, products, and orders.
- CRUD operations for users and products.
- Order status management and updates.
## Search and Filtering:🔍
- Ability to search for products based on keywords or categories.
- Filters for refining search results (e.g., price range, product attributes).
## Reporting and Analytics:📊
- Generating sales reports and analytics.
- Visualizing sales data with charts and graphs.
## Email Notifications:📧
- Sending transactional emails for password resets.
- Integrating with SMTP email services.
## Error Handling and Logging:⚠️
- Handling and logging errors gracefully.
- Providing meaningful error messages to users.

#

## :rocket: Technologies Used ##

<div align="center">
  <a href="https://react.dev/">
    <img width="50" title="React.Js" alt="React.js Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png">
  </a> &#xa0; &#xa0;

  <a href="https://nodejs.org/en">
    <img width="50" title="Node.Js" alt="Node.js Logo" src="https://cdn-clekk.nitrocdn.com/tkvYXMZryjYrSVhxKeFTeXElceKUYHeV/assets/images/optimized/rev-49e2c5e/litslink.com/wp-content/uploads/2020/12/node.js-logo-image.png">
  </a> &#xa0; &#xa0;

  <a href="https://www.mongodb.com/">
    <img width="50" title="MongoDB" alt="MongoDB Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png">
  </a> &#xa0; &#xa0;

  <a href="https://stripe.com/in">
    <img width="50" title="Stripe" alt="Stripe Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png">
  </a> &#xa0; &#xa0;
  
  <a href="#">
    <img width="50" title="Javascript" alt="Javascript Logo" src="https://banner2.cleanpng.com/20180422/hrq/kisspng-javascript-web-development-logo-script-clipart-5adc4c1a932f97.7568863815243868426029.jpg">
  </a> &#xa0; &#xa0;
</div>

**Server:** Node, Express



## Feedback

If you have any feedback, please reach out to us at saquelain1502@gmail.com

