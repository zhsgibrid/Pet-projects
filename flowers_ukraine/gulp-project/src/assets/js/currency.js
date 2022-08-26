let OldCurrency = get_current_currency();

function change_currency(option){
    let currency;

    // let cart_sum = document.getElementsByClassName('cart_sum');
    let cur = document.getElementById('currency');
    
    if (option){
        let sum = document.getElementById('cart_sum');
        currency = Currency[option.value];
        let exchange = get_exchange(OldCurrency, currency);
        let i = 1/0;
        sum.textContent = currency_value(parseInt(sum.textContent), exchange);
        
        // here cahnge value of all page
        let price_divs = document.querySelectorAll('.prices');
        for (let div of price_divs){
            for (let paragraphs_list of div.querySelectorAll('p')){
                let price = paragraphs_list.childNodes[0];
                price.textContent = currency_value(parseInt(price.textContent), exchange);

                let currency_obj = paragraphs_list.childNodes[1];
                currency_obj.textContent = ` ${currency}`;
            }
        }
        
    }else{
        currency = OldCurrency;
    }
    cur.textContent = ` ${currency}`;
    OldCurrency = currency;
}

function get_exchange(from_currency, to_currency){
    let from_url;
    let to_url;
    let exchange;

    console.log(from_currency, to_currency);

    if (from_currency === Currency.uah){
        to_url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${to_currency}&json`;
        exchange = 1 / get_exchange_rate(to_url);
    } else if (to_currency === Currency.uah){
        from_url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${from_currency}&json`;
        exchange = get_exchange_rate(from_url);
    
    } else{
        from_url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${from_currency}&json`;
        to_url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${to_currency}&json`;
        
        exchange = get_exchange_rate(to_url) / get_exchange_rate(from_url);
    }
    console.log(`exch ${exchange}`);
    return exchange;
}
function get_exchange_rate(url){
    let exchange_jsonResponse;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    
    xmlHttp.onload = function(e) {
        console.log(xmlHttp.responseText);
        exchange_jsonResponse = JSON.parse(xmlHttp.responseText)[0]['rate'];
    };
        
    xmlHttp.send();
    return parseFloat(exchange_jsonResponse);
}

function currency_value(value, exchange){
    return (value * exchange).toFixed(2);
}

change_currency();
