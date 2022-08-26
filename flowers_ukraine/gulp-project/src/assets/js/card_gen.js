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
                        <a class="h4_2" href=""> Быстрый заказ</a>
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

function add_to_block(block_obj, cards, num_el_in_row=4){

    let cards_block = document.createElement("div");
    cards_block.setAttribute("class", "card");

    let number_of_rows = Math.ceil(cards.length / num_el_in_row);
    for (let row_num=0; row_num < number_of_rows; row_num++){
        let row = document.createElement('div');
        row.setAttribute("class", "row");
        for (let i=0; i < num_el_in_row; i++){
            row.append(cards[i + row_num*num_el_in_row].get_dom_element());
            
        };
        cards_block.append(row);
    };
    block_obj.append(cards_block);
}

const card_sales = [
    new Card('101 красная роза', 2800, 19, './img/card1.png'),
    new Card('25 розовых пионовидных роз', 2800, 40, './img/card2.png'),
    new Card('Влюбленность', 2800, 55, './img/card3.png'),
    new Card('Корзина все для тебе', 2800, 28, './img/card4.png'),
    new Card('101 красная роза', 2800, 19, './img/card1.png'),
    new Card('25 розовых пионовидных роз', 2800, 40, './img/card2.png'),
    new Card('Влюбленность', 2800, 55, './img/card3.png'),
    new Card('Корзина все для тебе', 2800, 28, './img/card4.png'),
];
const card_season = [
    new Card('Мечтательница', 2280, 0, './img/card5.png'),
    new Card('Корзина солнечного настроения', 1680, 0, './img/card6.png'),
    new Card('Цветочная клумба', 1270, 0, './img/card7.png'),
    new Card('Корзина Дюймовочка', 2020, 0, './img/card8.png'),
    new Card('Мечтательница', 2280, 0, './img/card5.png'),
    new Card('Корзина солнечного настроения', 1680, 0, './img/card6.png'),
    new Card('Цветочная клумба', 1270, 0, './img/card7.png'),
    new Card('Корзина Дюймовочка', 2020, 0, './img/card8.png'),    
];
const card_gifts = [
    new Card('Наполеон', 2280, 0, './img/card9.png'),
    new Card('Киевский торт', 1680, 0, './img/card10.png'),
    new Card('Торт Левантинер', 1270, 0, './img/card11.png'),
    new Card('Торт на день рождения', 2020, 0, './img/card12.png'),  
    new Card('Наполеон', 2280, 0, './img/card9.png'),
    new Card('Киевский торт', 1680, 0, './img/card10.png'),
    new Card('Торт Левантинер', 1270, 0, './img/card11.png'),
    new Card('Торт на день рождения', 2020, 0, './img/card12.png'),  
];

let sales = document.getElementById("sales"); 
let season = document.getElementById("season"); 
let gifts = document.getElementById("gifts"); 

add_to_block(sales, card_sales);
add_to_block(season, card_season);
add_to_block(gifts, card_gifts);


