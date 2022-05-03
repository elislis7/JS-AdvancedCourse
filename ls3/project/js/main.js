const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url, cb) => { // не fetch
    return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open('GET', url, true);
        xhr.onload = () => resolve(cb(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    })
};

class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];


        this.getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
                console.log(this.getTotalPrice());
            });
    }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    getTotalPrice() {
        return this._productsObjects.reduce((accumulator, good) => accumulator + good.price, 0);
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);

            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`;
    }
}

const list = new ProductList();

function addBasket(id) {
    cart.addToBasket(id);
};

function deleteItem(id) {
    cart.deleteFromBasket(id);
};

function viewCart() {
    cart.render();
};

function loadBut() {
    const element = e.target;
    const src = element.getAttribute('data-load');
    list.fetchGoods(src);
}

class BasketItem {
    constructor(id, title, price, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="basket-item"><img src="${this.img}" alt="${this.title}"><div class="basket-info">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        </div>
        <button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button>
        </div>`;
    }
}

class Basket {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];
    }
    addToBasket(id) {
        let toBasket;
        list.goods.forEach(function(item) {
            if(id == item.id) {
                toBasket = {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    img: item.img
                }
            }
        });
        this.cartGoods.push(toBasket);
        this.basketCount();
    }

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket(id) {
        let getIdElemen;
        this.cartGoods.forEach(function(item, i) {
            let thisId = item.id;
            if(id == thisId) {
                getIdElemen = i;
            }
            
        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
        this.basketCount();
    }

    // Считаем стоимость товаров в корзине
    calcAllGoods() {
        let totalPrice = 0;
        this.cartGoods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Общая сумма товаров в корзине: " + totalPrice;
        document.querySelector('.btn-cart').innerHTML = totalGoodsAnswer;
    }

    // Считаем количество товаров в корзине и выводим на кнопку
    basketCount() {
        let count = this.cartGoods.length;
        document.getElementById('btn-cart').innerHTML = ' (' + count + ')';
    }

    // Рендер динамического содержимого корзины
    render() {
        let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new BasketItem(good.id, good.title, good.price, good.img);
            readHtml += goodItem.render();
        })
        document.querySelector('.products').innerHTML = readHtml;
        this.calcAllGoods();
    }
}

const list1 = new BasketItem();
const cart = new Basket();
