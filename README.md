# Welcome to Bluemart! ✨

 **Project Link** - ***https://bluemart-app.herokuapp.com/***
 
 ## Features and Functionalities 😃

**User features**

- Full featured shopping cart
- Product reviews and ratings
- Filtering (rating, category, & price range)
- Password Reset (Forget Password using Email)
- Token based authentication
- Product search feature
- User profile with orders
- Save Cart
- Delete Cart
- Choose quantity (No of items to be order)
- Checkout process (shipping)
- Order summary
- Stripe For payment

**Admin features**

- Product management
- User management
- Order management
- Order details page
- Mark orders as delivered option
- View Reviews of product
- chart of items stock and amount of money recieved

## Tech Stack 💻

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Material UI](https://material-ui.com/)
- [React Alert](https://www.npmjs.com/package/react-alert)
- [Redux](https://redux.js.org/)
- [Node Mailer](https://nodemailer.com/)

## API :woman_technologist:

- [Stripe API](https://stripe.com/)
- [Cloudinary API](https://cloudinary.com/)

## Installation :zap:

**1. Clone this repo by running the following command :-**

```bash
 git clone https://github.com/Neha-520/Ecommerce-app
 cd Ecommerce-app
```

**2. Now install all the required packages(frontend & backend) by running the following commands :-**

```
yarn add
cd client
yarn add
```

**2. Create a config.env file in config folder and add the following**

```
PORT=5000
FRONTEND_URL="http://localhost:3000"

MONGO_URL =your mongodb uri

STRIPE_API_KEY = your stripe key
STRIPE_SECRET_KEY = your seret key

JWT_SECRET=your key
JWT_EXPIREIN=30d

COOKIE_EXPIRE=5

CLOUD_NAME=your cloudinary name
API_KEY=your cloudinary api key
API_SECRET=your cloudinary api secret key

SMPT_SERVICE = gmail
SMPT_MAIL =  sender mail
SMPT_PASSWORD = sender mail password
SMPT_HOST=smtp.gmail.com
SMPT_PORT = 465

```
**3. Now start the react and node server by running the following command :-**
```
#Start the server
yarn run dev

#Start the client side app
cd client

yarn start
```

**4.** **🎉 Open your browser and go to `https://localhost:3000`**

## 🤩 Don't forget to give this repo a ⭐ if you like this repo and want to appreciate our efforts
