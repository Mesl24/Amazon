import { cart } from "../../data/cart.js";
import { getProductId } from "../../data/products.js";
import { moneyCents } from "../../data/money.js";
import { getDeliveryOption } from "../../data/option.js";

export function renderPaymentSummary(){
    let totalCents = 0;
    let totalShipping = 0;
    let totalBeforeTax = 0;
    let totalAfterTax = 0;
    let total = 0;
    let html = '';
    cart.forEach((item) => {

        const productId = item.productId;
        const matchingItem = getProductId(productId);
        totalCents += item.quantity * matchingItem.priceCents;

        const optionId = item.optionId;
        const deliveryOption = getDeliveryOption(optionId);
        totalShipping += Number(deliveryOption.priceCents);
        
        totalBeforeTax = totalCents + totalShipping;
        totalAfterTax = totalBeforeTax * 0.1;

        total = totalBeforeTax + totalAfterTax;
        
    })
    html += `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${moneyCents(totalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${moneyCents(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneyCents(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${moneyCents(totalAfterTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${moneyCents(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `
    document.querySelector('.js-payment-summary')
        .innerHTML = html;
}
