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
