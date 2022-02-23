//Use Url Search Param to see which product was clicked on
//Run Get request based on which product was clicked on
//Insert relevant info into product.html dom

//Getting access to DOM
let item = document.querySelector(".item__img");
let title = document.getElementById("title");
let price = document.getElementById("price");
let description = document.getElementById("description");
let colorList = document.getElementById("colors");
let productID ="";

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
        let productUrl = "http://localhost:3000/api/products/" + productID
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