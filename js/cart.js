document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart');
    const cartContainer = document.querySelector('.cart-container');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-amount');
    const shippingElement = document.querySelector('.shipping');

    const SHIPPING_COST = 10.00;

    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cartItems.length === 0) {
            cartContainer.style.display = 'none';
            emptyCartMessage.style.display = 'block';
            return;
        }

        cartContainer.style.display = 'grid';
        emptyCartMessage.style.display = 'none';
        renderCartItems(cartItems);
        updateCartTotals();
    }

    function renderCartItems(items) {
        cartItemsContainer.innerHTML = '';
        const template = document.getElementById('cart-item-template');
        
        items.forEach(item => {
            const cartItem = template.content.cloneNode(true);
            const cartItemDiv = cartItem.querySelector('.cart-item');
            
            cartItemDiv.dataset.id = item.id;
            
            // Fix the image setting
            const itemImage = cartItemDiv.querySelector('.item-image img');
            itemImage.src = item.image;
            itemImage.alt = item.name;
            
            cartItemDiv.querySelector('.item-name').textContent = item.name;
            cartItemDiv.querySelector('.item-size').textContent = `Size: ${item.size}`;
            cartItemDiv.querySelector('.item-price').textContent = `GHC ${parseFloat(item.price).toFixed(2)}`;
            cartItemDiv.querySelector('.qty-input').value = item.quantity;

            // Add event listeners
            const qtyInput = cartItemDiv.querySelector('.qty-input');
            const minusBtn = cartItemDiv.querySelector('.minus');
            const plusBtn = cartItemDiv.querySelector('.plus');
            const removeBtn = cartItemDiv.querySelector('.remove-item');

            qtyInput.addEventListener('change', () => updateQuantity(item.id, parseInt(qtyInput.value)));
            minusBtn.addEventListener('click', () => updateQuantity(item.id, item.quantity - 1));
            plusBtn.addEventListener('click', () => updateQuantity(item.id, item.quantity + 1));
            removeBtn.addEventListener('click', () => removeItem(item.id));

            cartItemsContainer.appendChild(cartItem);
        });
    }

    function updateQuantity(itemId, newQuantity) {
        if (newQuantity < 1) newQuantity = 1;
        if (newQuantity > 99) newQuantity = 99;

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex > -1) {
            cartItems[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            loadCart();
            updateCartCount();
        }
    }

    function removeItem(itemId) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        loadCart();
        updateCartCount();
    }

    function updateCartTotals() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        const subtotal = cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);

        const shipping = cartItems.length > 0 ? SHIPPING_COST : 0;
        const total = subtotal + shipping;

        subtotalElement.textContent = `GHC ${subtotal.toFixed(2)}`;
        shippingElement.textContent = `GHC ${shipping.toFixed(2)}`;
        totalElement.textContent = `GHC ${total.toFixed(2)}`;
    }

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    // Promo Code Handling
    const promoCodeInput = document.getElementById('promoCode');
    const applyPromoButton = document.getElementById('applyPromo');
    const discountRow = document.querySelector('.discount-row');
    const discountElement = document.querySelector('.discount');

    applyPromoButton.addEventListener('click', function() {
        const promoCode = promoCodeInput.value.trim().toUpperCase();
        const promoCodes = {
            'WELCOME10': 10,
            'SAVE20': 20,
            'SPECIAL50': 50
        };

        if (promoCodes[promoCode]) {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const subtotal = cartItems.reduce((total, item) => 
                total + (parseFloat(item.price) * item.quantity), 0);
            
            const discount = (subtotal * promoCodes[promoCode]) / 100;
            discountElement.textContent = `-GHC ${discount.toFixed(2)}`;
            discountRow.style.display = 'flex';
            
            const total = subtotal + SHIPPING_COST - discount;
            totalElement.textContent = `GHC ${total.toFixed(2)}`;
            
            alert('Promo code applied successfully!');
        } else {
            alert('Invalid promo code');
        }
    });

    // Checkout Button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', function() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Add your checkout logic here
        alert('Proceeding to checkout...');
        // window.location.href = 'checkout.html';
    });

    // Initialize cart
    loadCart();
    updateCartCount();
}); 