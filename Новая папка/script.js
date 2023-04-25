// Создадим объект для хранения данных корзины
var cart = {};

// Функция для добавления товара в корзину
function addToCart(id) {
    // Если товар уже есть в корзине, увеличим его количество на 1
    if (cart[id]) {
        cart[id].count++;
    }
    // Иначе добавим товар в корзину со значением количества 1
    else {
        cart[id] = {
            name: $("#name-" + id).text(),
            price: $("#price-" + id).text(),
            count: 1
        };
    }
    // Сохраняем данные корзины в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Функция для отображения данных корзины в модальном окне
function showCart() {
    // Получаем данные корзины из localStorage
    cart = JSON.parse(localStorage.getItem("cart"));
    // Если корзина не пустая, отображаем ее содержимое в модальном окне
    if (cart) {
        var cartContent = "<table class='table'>";
        cartContent += "<thead><tr><th>Наименование</th><th>Цена</th><th>Количество</th></tr></thead><tbody>";
        for (var id in cart) {
            cartContent += "<tr><td>" + cart[id].name + "</td><td>" + cart[id].price + "</td><td>" + cart[id].count + "</td></tr>";
        }
        cartContent += "</tbody></table>";
        $("#cart-modal-body").html(cartContent);
    }
    // Иначе сообщаем, что корзина пустая
    else {
        $("#cart-modal-body").html("<p>Корзина пуста</p>");
    }
    // Открываем модальное окно
    $("#cart-modal").modal("show");
}

// Обработчик события клика на кнопку "Добавить в корзину"
$(".add-to-cart-btn").click(function() {
    // Получаем id товара, который добавляем в корзину
    var id = $(this).attr("data-id");
    
    // Получаем количество товара, которое нужно добавить в корзину
    var quantity = parseInt($("#quantity-input-" + id).val());

    // Получаем информацию о товаре из localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || {};

    // Если товар уже есть в корзине, увеличиваем его количество
    if (cart.hasOwnProperty(id)) {
        cart[id].quantity += quantity;
    } else {
        // Иначе добавляем товар в корзину
        var name = $("#name-" + id).text();
        var price = parseFloat($("#price-" + id).text());
        cart[id] = {name: name, price: price, quantity: quantity};
    }

    // Сохраняем информацию о корзине в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновляем количество товаров в корзине в шапке сайта
    updateCartQuantity();
});


const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

// Добавляем обработчик клика на каждую кнопку
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Находим информацию о товаре
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;

    // Создаем элементы для корзины
    const cartItem = document.createElement('div');
    const cartItemName = document.createElement('h6');
    const cartItemPrice = document.createElement('p');
    const cartItemRemoveButton = document.createElement('button');

    // Добавляем классы и содержимое элементов
    cartItem.classList.add('cart-item');
    cartItemName.classList.add('cart-item-name');
    cartItemPrice.classList.add('cart-item-price');
    cartItemRemoveButton.classList.add('cart-item-remove-button');
    cartItemName.textContent = productName;
    cartItemPrice.textContent = productPrice;
    cartItemRemoveButton.textContent = 'Удалить';

    // Добавляем элементы в корзину
    const cart = document.querySelector('.cart');
    cartItem.appendChild(cartItemName);
    cartItem.appendChild(cartItemPrice);
    cartItem.appendChild(cartItemRemoveButton);
    cart.appendChild(cartItem);

    // Обновляем счетчик товаров в корзине
    const cartItemCount = document.querySelector('.cart-item-count');
    let count = parseInt(cartItemCount.textContent);
    count++;
    cartItemCount.textContent = count;
  });
});

// Добавляем обработчик клика на кнопки удаления товара из корзины
const removeCartItemButtons = document.querySelectorAll('.cart-item-remove-button');
removeCartItemButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();

    // Обновляем счетчик товаров в корзине
    const cartItemCount = document.querySelector('.cart-item-count');
    let count = parseInt(cartItemCount.textContent);
    count--;
    if (count < 0) {
      count = 0;
    }
    cartItemCount.textContent = count;
  });
});

