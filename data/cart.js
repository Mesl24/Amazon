export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 0,
    optionId : '1'
  },
  {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    optionId : '2'
  }]; 
};

export function addToCart(productId){
    let matchingItem;

      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      })
      if(matchingItem){
        matchingItem.quantity += 1
      }
      else{
        cart.push({
          productId: productId,
          quantity: 1,
          optionId: '1'
        });
      }
    
    saveToStorage();
    
}


export function removeItem(productId){
  const newCart = [];

  cart.forEach((item) => {
      if(productId !== item.productId){
          newCart.push(item);
      }
  })

  cart = newCart;

  saveToStorage();
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

