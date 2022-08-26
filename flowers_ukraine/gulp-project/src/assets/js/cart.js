function to_cart(card){
    let cart = document.getElementById('cart_num');
    cart.textContent = parseInt(cart.textContent) + 1;

    card = card.parentNode;
    let prices = card.querySelectorAll('.prices')[0];
    let price_block = prices.querySelectorAll('.main-price');

    let sum = document.getElementById('cart_sum'); 
    let price = parseInt(price_block[0].childNodes[0].textContent); 
    sum.textContent = parseInt(sum.textContent) + price;

}