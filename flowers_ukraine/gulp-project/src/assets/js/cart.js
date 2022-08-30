let cart = document.getElementById('cart_num');
let cart_sum = document.getElementById('cart_sum');
let cart_modal = document.getElementById('cart_modal');
let cart_list = new Item_list();

let cart_sum_block = document.querySelector('.cart_sum');
let order_value = cart_modal.querySelector('.order_value');


function to_cart(card){
    card = card.parentNode.parentNode;
    append_cart_list(card);
    update_cart();
}

function update_cart(){
    cart.textContent = cart_list.len;
    cart_sum.textContent = cart_list.price_sum;
}


function append_cart_list(card){
    cart_list.append(card_to_Card_obj(card));
}


function open_cart(){
    order_update();
    modal_open(cart_modal);
    cart_modal.querySelector('.modal-body').appendChild(cart_list.get_dom_item_list());
}


function quick_ship(obj){
    let card = obj.parentNode.parentNode.parentNode;
    append_cart_list(card);
    update_cart();
    open_cart();
}


function order_update(){
    order_value.textContent = cart_sum_block.outerText;
}