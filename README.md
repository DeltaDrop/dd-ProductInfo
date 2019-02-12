# dd-ProductInfo
A MassDrop inspired Product Info component to display information like name, price, product review score, product categories, and time remaining to buy an item.  Built with React, Styled Components, Express.js, and MySQL.

![](https://github.com/DeltaDrop/dd-ProductInfo/blob/master/Product_Info.gif)

## Related Projects
https://github.com/DeltaDrop/dd-Gallery

https://github.com/DeltaDrop/dd-OverviewOfAProduct

https://github.com/DeltaDrop/dd-ReviewsOfAProduct

## Getting Started
This service requires a local MySQL server to be running.

### Running the application locally
In the root directory rename the config.example.js file to config.js
Update the password variable in this file to your password for your local MySQL user.

From the root directory run the following commands
```
# install dependencies
npm install

# seed the database
npm run seed

# run webpack to build client bundle
npm run react-dev

# run the server locally
npm run start

```
Access the application by going to http://localhost:3001/buy/ and one of the following endpoints:
Keyboard, Flashlight, Headphones, Watch, Cats, Dogs, Seki-kit
For example: http://localhost:3001/buy/keyboard

## API
### GET Requests
When the page loads two GET requests are sent to the server to retrieve the product and category information for the item in the url.

```
Example response from GET http://localhost:3001/api/keyboard
{
  "name": "Keyboard",
  "price": 90,
  "sale_price": 81,
  "number_of_reviews": 55,
  "average_score": 3,
  "time": 1550206799,
  "units_sold": 39,
  "shipping_option": "Free Shipping to USA",
  "drop_count": 5
}

Example response from GET to http://localhost:3001/api/categories/keyboard
[{
    "name": "Appliances"
  },
  {
    "name": "Computers"
  },
  {
    "name": "Keyboards"
  }
]
```
### POST Request
When the 'Join Drop' button is clicked, a POST request is sent to http://localhost:3001/api/drop to update the number of people in the drop and potentially the item's price (based off the number of people who have joined).  Upon the database being updated a new GET request will be sent.




