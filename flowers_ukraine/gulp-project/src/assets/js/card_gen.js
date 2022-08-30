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


