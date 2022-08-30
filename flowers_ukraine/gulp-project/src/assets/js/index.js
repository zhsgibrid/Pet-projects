let modals = document.getElementsByClassName('modal_window');
let modal_template = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="modal-close" onclick="modal_close(this);">&times;</span>
                            <span class="h2_modal">Список товаров</span>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <div class="order">
                                <p class="h4_bold">Сумма заказа:</p>
                                <p class="main-price">
                                    <span class="order_value"></span>
                                </p>
                            </div>
                        </div>
                    </div>`;

for (let modal of modals){
    modal.innerHTML = modal_template;

    window.onclick = function(event){
        if (event.target == modal){
            modal.querySelector('.modal-close').onclick();
        }
    }
}


const Currency = {
    uah: 'UAH',
    usd: 'USD',
    eur: 'EUR'
}

function get_current_currency(){
    let currency_select = document.getElementById('money').getElementsByTagName('select')[0]; 
    let cur_val = currency_select.options[currency_select.selectedIndex].value;
    return Currency[cur_val];
}


class Card{
    constructor(label, price, sale_percent, image_path, currency=Currency.uah){
        this.label = label;
        this.price = price;
        this.sale_percent = sale_percent;
        this.currency = currency;
        this.image_path = image_path;
    }
    get sale_price(){
        return Math.ceil(this.price - this.price * this.sale_percent / 100)
    }
    get tamplate(){
        let block_template = `
            <div class="sales__card">
                <div class="sales__card-top">
                    <img class="heart" src="./img/heart.svg" alt="img" onclick="like(this);">
                    
                    <img class="top" src="./img/top.svg" alt="img">
                    <img class="img-card" src="${this.image_path}" alt="img">
                </div>
                <div>
                    <div class="rating"></div>
                    <div class="one_info">
                        <div class="name">
                            <p class="text_2">${this.label}</p>
                        </div>
                        <div class="prices">
                        </div>
                    </div>
                    <div class="btn" onclick="to_cart(this);">
                        <img src="./img/button.svg" alt="img">
                        <span class="h4">Заказать</span>
                    </div>
                    <div class="quick_ship">
                        <span class="h4_2" href="" onclick="quick_ship(this);"> Быстрый заказ</span>
                    </div>
                </div>
            </div>`;    
        block_template.trim();
        let tmp = document.createElement('template');
        tmp.innerHTML = block_template;
        return tmp.content.childNodes[1];
    }   
    get_dom_element(){
        let block = this.tamplate
        
        let div_price = block.querySelectorAll('.prices')[0];
        let price_block = document.createElement("p");
        price_block.setAttribute("class", "main-price");
                
        if (this.sale_percent && this.sale_percent !== 0){

            let sale_percent_circle = document.createElement("span");
            sale_percent_circle.setAttribute("class", "circle");
            sale_percent_circle.innerHTML = `<img src="./img/circle.svg" alt="img">
                                            <p class="sale">-${this.sale_percent}%</p>`;
            
            let divd = block.getElementsByClassName('sales__card-top')[0];
            divd.append(sale_percent_circle);
            
            let before_sale_price_block = document.createElement("p");
            before_sale_price_block.setAttribute("class", "before-sale-price");
            before_sale_price_block.innerHTML = `${this.price} <span class="currency">${this.currency}</span>`;
            div_price.append(before_sale_price_block);
            
            price_block.innerHTML = `${this.sale_price} <span class="currency">${this.currency}</span>`;
            div_price.append(price_block);
            
        } else {
            price_block.innerHTML = `${this.price} <span class="currency">${this.currency}</span>`;
            div_price.append(price_block);
        }  
        return block;
    }     
}


class Item_list {
    constructor(){
        this.list = new Array(); // Array[Card]
    }
    
    append(new_item){
        this.list.push(new_item);
    }

    remove(item){
        let idx = this.list.indexOf(item);
        this.list.splice(idx, 1);
    }

    get_dom_item_list(){
        let dom_list = document.createElement('div');
        dom_list.setAttribute("class", "items_list");
        
        for (let item_idx in this.list){
            let item = this.list[item_idx] 
            let item_block = this.template(item_idx, item.image_path, item.label, item.price, item.currency);
            dom_list.append(item_block);
        }
        return dom_list;
    }

    template(idx, image_path, label, price, currency){
        let block_template = `<div class="item_block" id="item_${idx}">
                                <span class="item_del" onclick="item_del(this)">&times;</span>
                                <div class="item">
                                    <img class="item_img_icon" src="${image_path}">
                                    <span class="text_2">${label}</span>
                                    <p class="main-price">${price}
                                        <span class="currency">${currency}</span>
                                    </p>
                                </div>
                                </div>`;
        block_template.trim();
        let tmp = document.createElement('template');
        tmp.innerHTML = block_template;
        return tmp.content.childNodes[0];
    }

    get len(){
        return this.list.length;
    }

    get price_sum(){
        let sum = 0;
        for (let item of this.list){
            sum += parseInt(item.price);
        }
        return sum;
    }
}   


function modal_close(close){
    let modal = close.parentNode.parentNode.parentNode;
    modal.style.display = "none";
    modal.querySelector('.modal-body').innerHTML = "";
}

function modal_open(open){    
    open.style.display = 'block';
}

function item_del(close){
    let item_block = close.parentNode;
    let item_idx = parseInt(item_block.id.split('_')[1]);
    let modal_name = item_block.parentNode.parentNode.parentNode.parentNode.id;
    item_block.remove();
    updater(modal_name, item_idx);
}

function updater(updating_block_name, item_idx){
    let modal_from_list;
    let modal_from_update_funcs = [];

    if (updating_block_name === 'heart_modal'){
        modal_from_list = likes_list;
        modal_from_update_funcs.push(update_like);   

    } else if (updating_block_name === 'cart_modal'){
        modal_from_list = cart_list;
        modal_from_update_funcs.push(update_cart);
        modal_from_update_funcs.push(order_update);
    }

    modal_from_list.remove(item_idx);

    for (let funcs of modal_from_update_funcs){
        funcs();
    }
}

function card_to_Card_obj(card){
    let label = card.querySelector('.text_2').textContent;
    let image_path = card.querySelector('.img-card').src;
    let price = parseFloat(card.querySelector('.main-price').firstChild.textContent.trim());

    let sale_percent = card.querySelector('.before-sale-price')
    
    if (sale_percent !== null){
        sale_percent = (parseFloat(sale_percent.firstChild.textContent.trim()) / price) * 100;
        
    } else {
        sale_percent = 0;
    }

    let currency = card.querySelector('.currency').textContent;
    return new Card(label, price, sale_percent, image_path, currency);
}



