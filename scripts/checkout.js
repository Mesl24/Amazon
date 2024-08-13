import { products } from "../data/products.js";
import { cart, removeItem} from "../data/cart.js";
import { moneyCents } from "../data/money.js";
import { option } from "../data/option.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const day = dayjs();
const today = day.format('dddd, MMMM D');

let summaryHTML = '';
cart.forEach((item) => {
     
    let matchingItem;
    products.forEach((product) => {
        if(item.productId === product.id){
            matchingItem = product;
        }
    })

    summaryHTML += `

        <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date js-delivery-date">
                ${today}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingItem.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingItem.name}
                </div>
                <div class="product-price">
                    ${moneyCents(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                </span>
                </div>
            </div>
            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${renderDeliveryOption(matchingItem, item)}
            </div>
            </div>
            </div>
            </div>
        </div>

    `
    document.querySelector('.js-order-summary')
        .innerHTML = summaryHTML;
    
})

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () =>{
            const productId = link.dataset.productId;

            removeItem(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            
        })
    })

function renderDeliveryOption(matchingItem, item){
    
    let optionHTML = '';
    let isChecked;
    option.forEach((delivery) => {
        
        const today = dayjs();
        const delivaryDate = today.add(delivery.optionDate, 'days');
        const displayDate = delivaryDate.format('dddd, MMMM D ');
        
        isChecked = item.productId === delivery.id;
        const priceString = delivery.priceCents === '0'
            ?   'FREE'
            :   `$${moneyCents(delivery.priceCents)} - `

        optionHTML +=
        `<div class="delivery-option js-delivery-option"
            data-option-date="${displayDate}"
            data-option-id=${delivery.id}>
            <input type="radio" ${isChecked} ? 'checked' : ''
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
            <div>
                <div class="delivery-option-date">
                ${displayDate}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
            </div>
        </div>`;
    })
    return optionHTML;
}

document.querySelectorAll('.js-delivery-option')
    .forEach((link) =>{
        link.addEventListener('click', () => {
            
            const deliveryDate = link.dataset.optionDate;
              
                document.querySelectorAll('.js-delivery-date')
                .forEach((inner) => {
                    inner.innerHTML = deliveryDate;
                })            
      
        })
    })
