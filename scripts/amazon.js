import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyCents } from '../data/money.js';
let elementHTML = '';
products.forEach((value) => {
    const html = `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${value.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${moneyCents(value.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${value.id}">
            Add to Cart
          </button>
    </div>`
    
    elementHTML += html;
    document.querySelector('.js-product-container')
    .innerHTML = elementHTML;
   
})


function addedItem(){
    const cartQuantity = document.querySelector('.js-cart-quantity');

    let quantityItem = 0;
    let qty;
    cart.forEach((item) => {
        qty = item.quantity;
        quantityItem += qty;
        cartQuantity.innerHTML = quantityItem;
        
    })
    
}

  
document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
        const productId = button.dataset.productId;
    
        addToCart(productId);
        addedItem();
        console.log(cart);
    })

    localStorage.setItem('cart', JSON.stringify(cart));
    
})
  


  
  