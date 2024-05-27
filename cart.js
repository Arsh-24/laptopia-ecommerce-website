document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");
    const promoCodeInput = document.getElementById("promo-code");
    const applyPromoButton = document.getElementById("apply-promo");
    const checkoutButton = document.getElementById("checkout-button");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let promoDiscount = 0;

    function displayCart() {
        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item", "row", "mb-4");
            cartItem.innerHTML = `
                <div class="col-md-3">
                    <img src="${item.image}" class="img-fluid" alt="${item.name}">
                </div>
                <div class="col-md-6">
                    <h5>${item.name}</h5>
                    <p>${item.description}</p>
                    <p>Price: $<span class="item-price">${parseFloat(item.price.substring(1))}</span></p>
                    <div class="quantity">
                        <button class="btn btn-sm btn-primary decrease-quantity">-</button>
                        <input type="text" class="form-control d-inline-block w-25 quantity-input" value="${item.quantity || 1}">
                        <button class="btn btn-sm btn-primary increase-quantity">+</button>
                    </div>
                    <button class="btn btn-danger btn-sm remove-item">Remove</button>
                </div>
                <div class="col-md-3 text-right">
                    <p>Subtotal: $<span class="item-subtotal">${(parseFloat(item.price.substring(1)) * (item.quantity || 1)).toFixed(2)}</span></p>
                </div>
            `;
            cartContainer.appendChild(cartItem);

            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                removeItem(index);
            });

            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
                changeQuantity(index, -1);
            });

            cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                changeQuantity(index, 1);
            });

            cartItem.querySelector('.quantity-input').addEventListener('change', (event) => {
                updateQuantity(index, event.target.value);
            });
        });

        updateTotalPrice();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function changeQuantity(index, change) {
        cart[index].quantity = Math.max(1, (cart[index].quantity || 1) + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function updateQuantity(index, quantity) {
        const qty = Math.max(1, parseInt(quantity));
        cart[index].quantity = isNaN(qty) ? 1 : qty;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function updateTotalPrice() {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price.substring(1)) * (item.quantity || 1);
        });
        total = total * (1 - promoDiscount);
        totalPriceElement.textContent = total.toFixed(2);
    }

    applyPromoButton.addEventListener('click', () => {
        const promoCode = promoCodeInput.value.trim();
        if (promoCode === 'SAVE10') {
            promoDiscount = 0.10;
            alert('Promo code applied! You saved 10%');
        } else {
            promoDiscount = 0;
            alert('Invalid promo code');
        }
        updateTotalPrice();
    });

    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });

    displayCart();
});
