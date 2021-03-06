//Use Url Search Param to see which product was clicked on
//Run Get request based on which product was clicked on
//Insert relevant info into product.html dom

//Getting access to DOM
let item = document.querySelector(".item__img");
let title = document.getElementById("title");
let price = document.getElementById("price");
let description = document.getElementById("description");
let colorList = document.getElementById("colors");
let cartButton = document.getElementById("addToCart");
let productID = "";
let cartItems = [];
let userColor;
let itemQuantity = document.getElementById("quantity");
let userQuantity;

//Adding event listener to execute function as page is loaded
document.addEventListener("DOMContentLoaded", () => {
  //Using a function to get url search param without the "?"
  function getProductID() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    productID = urlParams.get("id");
  }

  //Use the urlParam in fetch request function
  function getProductInfo() {
    let productUrl = "http://localhost:3000/api/products/" + productID;
    fetch(productUrl)
      .then((resp) => resp.json())
      .then((data) => insertProductInfo(data));
  }

  //Manipulation the DOM using info from get request
  function insertProductInfo(data) {
    let newImage = document.createElement("img");
    newImage.src = data.imageUrl;
    newImage.alt = data.altTxt;
    item.appendChild(newImage);

    title.textContent = data.name;

    price.textContent = data.price;

    description.textContent = data.description;

    //Loop through array of colors and insert color option for each one on color list
    for (let color of data.colors) {
      let newOption = document.createElement("option");
      newOption.value = color;
      newOption.textContent = color;
      colorList.appendChild(newOption);
    }
  }

  //Calling functions now that everything is in place
  getProductID();
  getProductInfo();
});

/*
 * The user chooses the color and quantity of the product
 * The user's choices are saved. Add event listeners to input for color and quantity to save it
 * The user clicks add to cart button id = addToCart and the product info, color and quantity are added to a cart array
 * The cart array is saved in local storage
 */

// Saving color input from the color menu
colorList.addEventListener("change", ($event) => {
  userColor = $event.target.value;
});

//Saving quantity input
itemQuantity.addEventListener("change", ($event) => {
  userQuantity = $event.target.value;
});

//Adding event listener to button. Single product should be on one line.
cartButton.addEventListener("click", () => {
  let newCustomerInput = {
    /*product id, color, quantity*/
    productColor: userColor,
    quantity: userQuantity,
    ID: productID,
  };
  cartItems.push(newCustomerInput);

  /*Before I can add a cartItem to the userCart, I need to see if:
   *there is a userCart in local storage already
   *the new cartItem I am trying to add is already in the cart (same product and color)
   *if yes to above then I just increase quantity of that cartItem in storage
   *if no then add new item
   */

  //checking to see if there is already a userCart in local storage and if not set the item
  let cartIsEmpty = localStorage.getItem("usersCart") === null;
  if (cartIsEmpty) {
    localStorage.setItem("usersCart", JSON.stringify(cartItems));
  }
  //if userCart already exists, retrieve the info and add new info
  //Loop through the currentCart, if ID and productColor are the same then add new quantity to current quantity
  //ONLY add newCustomerInput to cart AFTER verifying that NONE of the items in the cart have the same ID and color
  else {
    let noneOfTheProductsAreTheSame = true; 
    let currentCart = JSON.parse(localStorage.getItem("usersCart"));
    for (let item of currentCart) {
      //this loop is executed for each item that is in the cart
      if (
        item.ID == newCustomerInput.ID &&
        item.productColor == newCustomerInput.productColor
      ) {
        //checking if both the color and item ID for the item already in the cart matches what the customer is trying to add
        //TODO we need to make sure item.quantity is being updated/used somewhere before saving the cart???
        updateItemQuantity(item);
        noneOfTheProductsAreTheSame = false;
      }
    }
    if (noneOfTheProductsAreTheSame) { //find out where to set this to false!!
        pushNewItemToCart();
      }
  

  function pushNewItemToCart() {
    currentCart.push(newCustomerInput);
    localStorage.setItem("usersCart", JSON.stringify(currentCart));
  }

  function updateItemQuantity(item) {
    item.quantity =
      parseInt(item.quantity) + parseInt(newCustomerInput.quantity); //adding the quantity of the item that is in the cart to the quantity that the customer is adding now
    localStorage.setItem("usersCart", JSON.stringify(currentCart)); //after changing the item's quantity, the cart is saved in local storage
  }}
});
