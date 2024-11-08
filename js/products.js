document.addEventListener('DOMContentLoaded', function() {
    // Sort functionality
    const sortSelect = document.getElementById('sort');
    sortSelect.addEventListener('change', function() {
        // Add your sorting logic here
        console.log('Sorting by:', this.value);
    });

    // Category filter functionality
    const categorySelect = document.getElementById('category');
    categorySelect.addEventListener('change', function() {
        // Add your category filtering logic here
        console.log('Filtering by category:', this.value);
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your cart logic here
            console.log('Added to cart');
        });
    });

    // Add to wishlist functionality
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            // Add your wishlist logic here
            console.log('Added to wishlist');
        });
    });
}); 