import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { moneyCents } from "../../data/money.js";
import { option } from "../../data/option.js";

export function renderPaymentSummary(){
    let matchingItem;
    let totalItems = 0;
    cart.forEach((item) => {
        products.forEach((product) => {
            if(item.productId === product.id){
                matchingItem = product;
            }
        }) 
        totalItems += matchingItem.priceCents * item.quantity;
    })
    
    return moneyCents(totalItems);
}
const total = renderPaymentSummary();
console.log(total);