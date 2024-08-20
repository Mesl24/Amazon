import { getProductId } from "../../data/products.js";
import { cart, removeItem, updateOptionId} from "../../data/cart.js";
import { moneyCents } from "../../data/money.js";
import { option, getDeliveryOption } from "../../data/option.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function renderOrderSummary(){

    let summaryHTML = '';
    cart.forEach((item) => {
        
        const productId = item.productId;
        const matchingItem = getProductId(productId);
        const deliveryOptionId = item.optionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.optionDate, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        summaryHTML += `

            <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                    ${dateString}
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
                renderPaymentSummary()
            })
        })

    function renderDeliveryOption(matchingItem, item){
        
        let optionHTML = '';
        let isChecked;
        option.forEach((delivery) => {
            
            const today = dayjs();
            const delivaryDate = today.add(delivery.optionDate, 'days');
            const displayDate = delivaryDate.format('dddd, MMMM D ');
            
            isChecked = item.optionId === delivery.id;
            const priceString = delivery.priceCents === '0'
                ?   'FREE'
                :   `$${moneyCents(delivery.priceCents)} - `

            optionHTML +=
            `<div class="delivery-option js-delivery-option"
                data-product-id="${matchingItem.id}"
                data-option-id="${delivery.id}">
                <input type="radio" ${isChecked ? 'checked' : ''}
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
                const {productId, optionId} = link.dataset;
                updateOptionId(productId, optionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        })
}

