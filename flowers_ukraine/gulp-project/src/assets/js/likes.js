function like(heart_img){
    const unlike = './img/heart.svg';
    const like = './img/heart_liked.svg';

    let heart = document.getElementById('heart_num');
    let heart_1 = document.getElementById('heart_num_1');

    if (heart_img.getAttribute('src') == unlike){
        heart_img.setAttribute('src', like);
        heart.textContent = parseInt(heart.textContent) + 1;
        heart_1.textContent = parseInt(heart_1.textContent) + 1;
    } else{
        heart_img.setAttribute('src', unlike)
        heart.textContent = parseInt(heart.textContent) - 1;
        heart_1.textContent = parseInt(heart_1.textContent) - 1;
    }
}