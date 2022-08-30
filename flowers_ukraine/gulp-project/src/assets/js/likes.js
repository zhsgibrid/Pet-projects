let heart = document.getElementById('heart_num');
let heart_1 = document.getElementById('heart_num_1');

let likes_modal = document.getElementById('heart_modal');
let likes_list = new Item_list();



function like(heart_img){
    const unlike = './img/heart.svg';
    const like = './img/heart_liked.svg';


    if (heart_img.getAttribute('src') == unlike){
        heart_img.setAttribute('src', like);
        // heart.textContent = parseInt(heart.textContent) + 1;
        // heart_1.textContent = parseInt(heart_1.textContent) + 1;
    } else{
        heart_img.setAttribute('src', unlike)
        // heart.textContent = parseInt(heart.textContent) - 1;
        // heart_1.textContent = parseInt(heart_1.textContent) - 1;
    }

    append_like_list(heart_img);
    update_like();
}


function update_like(){
    heart.textContent = likes_list.len;
    heart_1.textContent = likes_list.len;
    // cart_sum.textContent = cart_list.price_sum;
}


function append_like_list(heart_img){
    let card = heart_img.parentNode.parentNode;
    likes_list.append(card_to_Card_obj(card));
}

function open_liked(obj){
    // let modal = obj.parentNode.querySelector('#heart_modal');
    modal_open(likes_modal);
    likes_modal.querySelector('.modal-body').appendChild(likes_list.get_dom_item_list());
}
