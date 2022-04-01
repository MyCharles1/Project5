/* Retrieve the products in the cart from local storage
 * Loop through cart
 * Add each product to cart html DOM with relevant classes etc
 * Allow user to remove items and edit quantity
 * 
 * 
 */

//Variables
let cartItemSection = document.getElementById("cart__items");
let theCart;
let itemInfo;

//Adding event listener to execute function as page is loaded
document.addEventListener("DOMContentLoaded", () => {
    //function to get each individual item's info
    /* function getItemInfo() {
        let productUrl = "http://localhost:3000/api/products/" + item.ID;
        fetch(productUrl)
          .then((resp) => resp.json())
          .then(data => itemInfo = data);
      }*/
    //function to get cart items so it can be called back
    function displayCart() {
        theCart = JSON.parse(localStorage.getItem("usersCart"));
        
        for (let item of theCart) {
            //getItemInfo();
            let productUrl = "http://localhost:3000/api/products/" + item.ID;
            fetch(productUrl)
               .then((resp) => resp.json())
               .then((data) =>createProductArticle(data, item));
        }

        function createProductArticle(data, item) {
            let newArticle = document.createElement("article");
            newArticle.classList.add("cart__item");
            newArticle.setAttribute("data-id", data.ID);
            newArticle.setAttribute("data-color", item.productColor);

            let div1 = document.createElement("div");
            div1.classList.add("cart__item__img");

            let newImage = document.createElement("img");
            newImage.src = data.imageUrl;

            div1.appendChild(newImage);

            let div2 = document.createElement("div");
            div2.classList.add("cart__item__content");

            let div2a = document.createElement("div");
            div2a.classList.add("cart__item__description");

            let heading = document.createElement("h2");
            heading.textContent = data.name;

            let paragraphColor = document.createElement("p");
            paragraphColor.textContent = item.productColor;

            let paragraphPrice = document.createElement("p");
            paragraphPrice.textContent = data.price;

            div2a.appendChild(heading);
            div2a.appendChild(paragraphColor);
            div2a.appendChild(paragraphPrice);

            let div2b = document.createElement("div");
            div2b.classList.add("cart__item__content__settings");

            let div2bi = document.createElement("div");
            div2bi.classList.add("cart__item__content__settings__quantity");

            let paragraphQuantity = document.createElement("p");
            paragraphQuantity.textContent = "Qte : " + data.price;

            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.classList.add("itemQuantity");
            input.setAttribute("name", "itemQuantity");
            input.setAttribute("min", "1");
            input.setAttribute("max", "100");
            input.setAttribute("value", item.quantity);

            div2bi.appendChild(paragraphQuantity);
            div2bi.appendChild(input);

            let div2bii = document.createElement("div");
            div2bii.classList.add("cart__item__content__settings__delete");

            let paragraphDelete = document.createElement("p");
            paragraphDelete.classList.add("deleteItem");
            paragraphDelete.textContent = "Delete";

            div2bii.appendChild(paragraphDelete);

            div2b.appendChild(div2bi);
            div2b.appendChild(div2bii);

            div2.appendChild(div2a);
            div2.appendChild(div2b);

            newArticle.appendChild(div1);
            newArticle.appendChild(div2);

            cartItemSection.appendChild(newArticle);
        }
    }
    //calling my function
    displayCart();
});