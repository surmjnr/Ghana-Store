document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    
    if (quantityInput && minusBtn && plusBtn) {
        // Initialize quantity
        let quantity = 1;
        
        // Minus button click
        minusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
            }
        });
        
        // Plus button click
        plusBtn.addEventListener('click', () => {
            if (quantity < 99) {
                quantity++;
                quantityInput.value = quantity;
            }
        });
        
        // Handle manual input
        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (isNaN(value) || value < 1) {
                value = 1;
            } else if (value > 99) {
                value = 99;
            }
            quantity = value;
            quantityInput.value = quantity;
        });
    }
}); 