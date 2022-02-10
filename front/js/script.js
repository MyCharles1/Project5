/* In the JavaScript code, start by asking for all of the products from
the API, collect the response and then take a look at it, inserting
each element (each product) into the homepage (the DOM).
*/

//The response is an array of objects. Objects have properties

//Loop through array get properties from each object. For each property create element to insert in DOM. Lines 52-58 in index.


//Getting access to DOM
let section = document.getElementById('items');

//Adding event listener to execute function as page is loaded
document.addEventListener('DOMContentLoaded', ()=>{

//declaring function for fetch request so it can be called back
function getData() {
fetch('http://localhost:3000/api/products/')
.then(resp => resp.json())
.then(data => insertProducts(data))
}

//Looping through array as a function so it can be called with fetch request to keep the products data
function insertProducts(data){
for (let product of data){

// creating new elements with appropiate attributes and classes
let newArticle = document.createElement('article');

let newImage = document.createElement('img');
newImage.src = product.imageUrl;

let newHeading = document.createElement('h3');
newHeading.textContent = product.name;

let newParagraph = document.createElement('p');
newParagraph.classList.add('productDescription');
newParagraph.textContent = product.description;

//appending image heading and paragraph to article 
newArticle.appendChild(newImage);
newArticle.appendChild(newHeading);
newArticle.appendChild(newParagraph);

//appending article to section
section.appendChild(newArticle);
}
}

//Actually calling the function after everything is put in place.
getData();
})
