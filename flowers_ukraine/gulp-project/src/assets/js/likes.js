function like(heart_img){
    const unlike = './img/heart.svg';
    const like = './img/heart_liked.svg';

    let heart = document.getElementById('heart_num');

    if (heart_img.getAttribute('src') == unlike){
        heart_img.setAttribute('src', like);
        heart.textContent = parseInt(heart.textContent) + 1;
    } else{
        heart_img.setAttribute('src', unlike)
        heart.textContent = parseInt(heart.textContent) - 1;
    }
}