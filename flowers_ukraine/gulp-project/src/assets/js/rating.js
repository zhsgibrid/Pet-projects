class Rating {
    constructor(dom) {
        dom.innerHTML = '<svg width="74" height="14"></svg>';
        this.svg = dom.querySelector('svg');
        for(var i = 0; i < 5; i++)
            this.svg.innerHTML += `<polygon data-value="${i+1}"
                transform="translate(${i*15},0)" 
                points="7.500 0.000, 9.184 5.182, 14.633 5.182, 10.225 8.385, 11.908 13.568, 7.500 10.365, 3.092 13.568, 4.775 8.385, 0.367 5.182, 5.816 5.182, 7.500 0.000">`;
        this.svg.onclick = e => this.change(e);
        this.render();
    }
    
    change(e) {
        let value = e.target.dataset.value;
        value && (this.svg.parentNode.dataset.value = value); 
        this.render();
    }
    
    render() {
        this.svg.querySelectorAll('polygon').forEach(star => {
            let on = +this.svg.parentNode.dataset.value >= +star.dataset.value;
            star.classList.toggle('active', on);
        });
    }
}

document.querySelectorAll('.rating').forEach(dom => new Rating(dom));
