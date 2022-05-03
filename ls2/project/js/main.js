class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];

        this._fetchGoods();
        this._render();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);

            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    _calcAllGoods() {
        let totalPrice = 0;
        this._goods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
                console.log(good.price);
            }
        });

        let totalGoodsAnswer = "Все товары на сумму " + totalPrice + '\u20bd';
        console.log(totalGoodsAnswer);
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

// Класс элемента корзины 

class BasketItem extends ProductItem {
    constructor (id, title, price, link) {
        super(id, title, price);
        this.link = link; // возможно потребуется добавить ссылку на сам товар 
    }
}

// Класс корзины 

class Basket extends ProductItem {
    constructor (id, title, price, add) {
        super(id, title, price);
        this.add = product.add; // добавляем массив с добавленными товарами в корзину 
    }

    // привязываем добавление товара к кнопке 
    addToBasket () {}

    //удаляем товар из корзины

    deleteFromBasket () {}

    // общая стоимость и количество товаров в корзине 

    calcBasket() {}

    // открывание корзины - или на сайте, или в новом окне 

    openBasket() {}

    // при добавлении товара (больше 0) активировать кнопку "Заказать"/"Оформить"

    isOrder() {}
}